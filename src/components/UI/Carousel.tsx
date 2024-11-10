import { Image } from "antd";
import PdfContainer from "./PdfContainer";
import { IBase64Slide, IFileSlide } from "../../helpers/types";
import { pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DialogComponent from "./DialogComponent";
import { convertSlides } from "../../helpers/fnHelpers";
import Loader from "./Loader";


if (typeof window !== 'undefined' && 'pdfjsLib' in window) {
  pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;
}
function Carousel({
  slides,
  currentIndex,
}: {
  slides: IFileSlide[];
  currentIndex: number;
}) {
  const formats = ['jpg', 'png', 'jpeg'];
  const [loading ,setLoading] = useState(true);
  const [blobSlides, setBlobSlides] = useState<IBase64Slide[]>([]);
  const [previewPdf, setPreviewPdf] = useState('');
  useEffect(() => {
    async function convertor() {
      try {
        const blobs = await convertSlides(slides);
        setBlobSlides(blobs);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(prev => !prev);
      }
    }
    convertor()
  }, [slides])
  return (
    <>
      <div className="w-[380px] overflow-hidden">
        <ul
          className={`relative flex justify-start transition-all delay-300`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {blobSlides.map((item) => (
            <li key={item.fileId}>
              {!formats.includes(item.fileUrl.slice(item.fileUrl.lastIndexOf('.') + 1)) ? 
              <div className="w-[380px] max-h-[250px] p-2 bg-lombard-bg-inactive-grey rounded-lg">
                <a onClick={(e) => {e.preventDefault(); setPreviewPdf(item.fileData)}}>
                  <PdfContainer fileUrl={item.fileData} contained/>
                </a>
              </div> :
              <Image
                src={item.fileData}
                alt="upload_preview"
                width={380}
                className="max-h-[240px] object-contain"
              />
              }
            </li>
          ))}
        </ul>
      </div>
      {previewPdf &&
        createPortal(
          <DialogComponent closeHandler={() => setPreviewPdf('')}>
            <PdfContainer fileUrl={previewPdf}/>
          </DialogComponent>,
          document.body
        )}
        {loading &&
        createPortal(
          <div className="absolute w-full h-full flex justify-center items-center bg-lombard-bg-inactive-grey"><Loader/></div>,
          document.body
        )}
    </>
  );
}

export default Carousel;

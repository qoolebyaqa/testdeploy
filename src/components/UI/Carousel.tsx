import { Image } from "antd";
import { IFileSlide } from "./DragNDrop";
import SVGComponent from "./SVGComponent";
import { Link } from "react-router-dom";

function Carousel({
  slides,
  currentIndex,
}: {
  slides: IFileSlide[];
  currentIndex: number;
}) {
  const formats = ['jpg', 'png', 'jpeg'];
  console.log(slides)
  return (
    <>
      <div className="w-[320px] overflow-hidden ml-8">
        <ul
          className={`relative flex justify-start transition-all delay-300`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((item) => (
            <li key={item.fileId}>
              {!formats.includes(item.fileUrl.slice(item.fileUrl.lastIndexOf('.') + 1)) ? 
              <div className="w-[320px] max-h-[180px] p-2 bg-lombard-bg-inactive-grey rounded-lg">
                <Link to={item.fileUrl} className="flex justify-between">
                <p>{item.fileId}</p>
                <SVGComponent title="uploadedDocument"/>
                </Link>
              </div> :
              <Image
                src={item.fileUrl}
                alt="upload_preview"
                width={320}
                className="max-h-[180px] object-contain"
              />
              }
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Carousel;

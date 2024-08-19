import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import SVGComponent from "./SVGComponent";
import Carousel from "./Carousel";

export interface IFileSlide {fileUid: string, convertedSTR: string}

function DragNDrop({ multiple }: { multiple?: boolean }) {
  const [previewImage, setPreviewImage] = useState<IFileSlide[]>([]);
  const { Dragger } = Upload;
  const [currentIndex, setCurrentIndex] = useState(0);

  function carouselHandlerLeft() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? previewImage.length - 1 : prevIndex - 1
    );
  }

  function carouselHandlerRight() {
    setCurrentIndex((prevIndex) =>
      prevIndex === previewImage.length - 1 ? 0 : prevIndex + 1
    );
  }

  async function readImage(originFile: RcFile, deleteAction?: Boolean) {
    if(!/\b(.jpg|.jpeg|.png)\b/.test(originFile.name)) {
      setPreviewImage((prev) => [{fileUid: originFile.uid, convertedSTR: '/dafaultDoc.jpg'}, ...prev])
    } else {
    const reader = new FileReader();
    reader.readAsDataURL(originFile);
    reader.onload = async () => {
      if(deleteAction) {
        console.log(previewImage)
        const updatedFileList = previewImage.filter(file => file.fileUid !== originFile.uid);
        setPreviewImage([...updatedFileList]);
        return;
      }
      if (multiple) {
        setCurrentIndex(0);
        setPreviewImage((prev) => [{fileUid: originFile.uid, convertedSTR: reader.result as string}, ...prev]);
      } else {
        setPreviewImage([{fileUid: originFile.uid, convertedSTR: reader.result as string}]);
      }
    };
    reader.onerror = (error) => console.log(error);
    }
  }
  const props: UploadProps = {
    name: "file",
    multiple: !!multiple,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    showUploadList: !!multiple,
    async onRemove(e) {   
      if (e.originFileObj) {await readImage(e.originFileObj, true)}
    },
    async onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        /* console.log(info.file, info.fileList); */
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        if (info.file.originFileObj) await readImage(info.file.originFileObj); //TODO must be transferred to success case
      }
    },
    onDrop(_e) {
      /* console.log("Dropped files", e.dataTransfer.files); */
    },
  };
  return (
    <>
      {multiple && (
        <div className="flex items-center justify-between">
          <p className="text-lombard-text-black font-bold">Копия документов</p>
          <div className="flex">
            <button
              className="p-1"
              id="arrowLeft"
              onClick={carouselHandlerLeft}
            >
              <i>
                <SVGComponent title="arrowLeft" />
              </i>
            </button>
            <button
              className="p-1"
              id="arrowRight"
              onClick={carouselHandlerRight}
            >
              <i>
                <SVGComponent title="arrowRight" />
              </i>
            </button>
          </div>
        </div>
      )}
      <Dragger {...props} className="customDragger">
        {previewImage.length > 0 ? (
          <>
            <p className="text-[14px] font-bold">Добавленные документы:</p>
            <img
                src="/dragIdCard.png"
                alt="idcard_uploader"
                className="w-[51px] h-[30px] mx-auto"
              />
            <p className="text-[10px] font mb-4">Загрузите файл или перетащите файл</p>
            <div
              onClick={(e) => e.stopPropagation()}
              className={`${
                multiple ? "flex justify-start ml-2" : "flex justify-center"
              }`}
            >
              <Carousel slides={previewImage} currentIndex={currentIndex} />
              {/* {!multiple && <button className="h-8 hover:bg-lombard-btn-grey" onClick={() => setPreviewImage([])}>
                <SVGComponent title="cart"/>
              </button>} */}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-6 justify-center">
              <img
                src="/dragPassport.png"
                alt="passport_uploader"
                className="w-[74px] h-[95px]"
              />
              <p>или</p>
              <img
                src="/dragIdCard.png"
                alt="idcard_uploader"
                className="w-[91px] h-[52px]"
              />
            </div>
            <p className="font-bold">Загрузите файл или перетащите файл</p>
            <p className="ant-upload-hint">
              Загрузите только удостоверение личности или фотографию
              биометрического паспорта
            </p>
          </>
        )}
      </Dragger>
    </>
  );
}

export default DragNDrop;

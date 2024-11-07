import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useRef, useState } from "react";
import SVGComponent from "./SVGComponent";
import Carousel from "./Carousel";
import { FileData } from "../../helpers/types";
import { ApiService } from "../../helpers/API/ApiSerivce";
import { createPortal } from "react-dom";
import Confirmation from "./Confirmation";

export interface IFileSlide {fileId: string, fileUrl: string}
export type UploadedFile = {document_id: string, document_url: string}

function DragNDrop({ multiple, uploadFile, isValid, docList, clientId }: { multiple?: boolean, uploadFile?: (arg:FileData) => Promise<any>, isValid?: () => any, docList?: any[], clientId?:string }) {
  const reFormat = docList && docList.reduce((acc, cur) => {
    const item = {fileId: cur.document_id, fileUrl: cur.document_url}
      return [...acc, item]
  },[])
  const [previewImage, setPreviewImage] = useState<IFileSlide[]>(reFormat || []);
  const [showDialog, setShowDialog] = useState(false);
  const { Dragger } = Upload;
  const [currentIndex, setCurrentIndex] = useState(docList && docList.length - 1 || 0);
  const dragger = useRef<HTMLDivElement | null>(null);

  const handleRemoveFile = async () => {
    const fileToRemove = previewImage[currentIndex];
    try {
      if(clientId) await ApiService.deleteDocument(clientId, fileToRemove.fileId);
      const newFiles = [...previewImage];
      newFiles.splice(currentIndex, 1);
      setPreviewImage(newFiles);
      if (currentIndex >= newFiles.length) {
        setCurrentIndex(newFiles.length - 1);
      }
    } catch (error) {
      console.error('Ошибка при удалении файла:', error);
    } finally {
      setShowDialog(false)
    }
  };

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

  async function readImage(_originFile: RcFile, uploadedFile: UploadedFile, deleteAction?: Boolean) {
    /* console.log(uploadedFile)
    const reader = new FileReader();
    reader.readAsDataURL(originFile);
    reader.onload = async () => { */
      if(deleteAction) {
        console.log(previewImage)
        return;
      }
      if (multiple) {
        setPreviewImage((prev) => [{fileId: uploadedFile.document_id, fileUrl: uploadedFile.document_url}, ...prev]);
        setCurrentIndex(0);
      } else {
        setPreviewImage([{fileId: uploadedFile.document_id, fileUrl: uploadedFile.document_url}]);
      }
   /*  };
    reader.onerror = (error) => console.log(error); */
  }
  
  const props: UploadProps = {
    name: "file",
    multiple: !!multiple,
    showUploadList: false, 
    beforeUpload: async () => {
      const valid = isValid && await isValid();
      if (!valid) {
        message.error('Сначала заполните обязательные поля');
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    customRequest: async (options) => {
      const { file, onSuccess, onError } = options;      
      try {
        const uploadedFile = uploadFile && await uploadFile({ file });
        console.log(uploadedFile)
        if (file) await readImage(file as any, uploadedFile);
        if(onSuccess) onSuccess(null, file as any)
        message.success(`${(file as File).name} has been uploaded successfully.`);
        return Upload.LIST_IGNORE;
      } catch (error) {
        if(onError) onError(new Error('Ошибка загрузки файла'))
        message.error(`${(file as File).name} upload failed.`);
        console.error(error);
        return Upload.LIST_IGNORE;
      }
    },
    
    async onRemove(_e) {   
      /* if (e.originFileObj) {await readImage(e.originFileObj, true)} */
    },
    /* async onChange(info) {
      const valid = await isValid();
      if (!valid) {
        return;
      }
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`); 
      }
    }, */
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
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
              type="button"
            >
              <i>
                <SVGComponent title="arrowLeft" />
              </i>
            </button>
            <button
              className="p-1"
              id="arrowRight"
              onClick={carouselHandlerRight}
              type="button"
            >
              <i>
                <SVGComponent title="arrowRight" />
              </i>
            </button>
            <button
              className="p-1"
              id="cart"
              onClick={() => {setShowDialog(true)}}
              type="button"
            >
              <i>
                <SVGComponent title="cart" />
              </i>
            </button>
            <button
              className="p-1"
              id="cart"
              onClick={()=> dragger.current?.click()}
              type="button"
            >
              <i>
                <SVGComponent title="addButton" />
              </i>
            </button>
          </div>
        </div>
      )}
      <Dragger {...props} className="customDragger">
        {previewImage.length > 0 ? (
          <div ref={dragger}>
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
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-6 justify-center"  ref={dragger}>
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
      {showDialog && createPortal(<Confirmation title="Удалить?" textMsg="Вы уверены, что хотите удалить документ?" handleSave={handleRemoveFile} handleClose={() => {setShowDialog(false)}} colorReverse/>, document.body)}
    </>
  );
}

export default DragNDrop;

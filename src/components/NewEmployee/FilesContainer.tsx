import DragNDrop from "../UI/DragNDrop";

function FilesContainer() {
  return (
    <div className="flex flex-col gap-y-[14px] pt-[10px] pl-2">
      <p className="w-[600px]">
        <label htmlFor="file" className="font-bold text-black">
          Копия документов
        </label>
      </p>
      <div className="flex flex-col gap-3 pb-3">
        <div>
          <DragNDrop />
        </div>
      </div>
    </div>
  );
}

export default FilesContainer;

import DragNDrop from "../UI/DragNDrop";

function FilesContainer() {
  return (
    <div className="flex flex-col gap-y-[14px] pt-[10px] bg-white rounded-2xl px-2">
      <div className="flex flex-col gap-3 mb-3">
        <div>
          <DragNDrop multiple />
        </div>
      </div>
    </div>
  );
}

export default FilesContainer;

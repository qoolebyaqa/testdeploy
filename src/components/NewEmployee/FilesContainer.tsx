import DragNDrop from "../UI/DragNDrop";

function FilesContainer() {
  return (
    <div className="flex flex-col gap-y-[14px] pt-[10px] pl-2">
      <div className="flex flex-col gap-3 pb-3">
        <div>
          <DragNDrop multiple />
        </div>
      </div>
    </div>
  );
}

export default FilesContainer;

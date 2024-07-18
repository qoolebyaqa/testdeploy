interface IbuttonProps  {
  titleBtn: string;
  color: string;
  className?: string;
  clickHandler?: () => void;
}

function ButtonComponent({
  titleBtn,
  color,
  clickHandler,
  className,
}: IbuttonProps ) {
  return (
    <button
      onClick={clickHandler}
      className={`flex items-center justify-center rounded-xl ${color} ${
        className ? className : ""
      }`}
    >
      {titleBtn}
    </button>
  );
}

export default ButtonComponent;

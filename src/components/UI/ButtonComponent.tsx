interface IbuttonProps  {
  titleBtn: string;
  color: string;
  disabled?: boolean;
  submit?: boolean;
  form?: string;
  className?: string;
  clickHandler?: () => void;
}

function ButtonComponent({
  titleBtn,
  color,
  submit,
  form,
  disabled,
  clickHandler,
  className,
}: IbuttonProps ) {
  return (
    <button
      onClick={clickHandler}
      className={`flex items-center justify-center rounded-lg ${color} ${
        className ? className : ""
      }`}
      type={submit ? 'submit' : 'button'}
      form={form}
      disabled={disabled}
    >
      {titleBtn}
    </button>
  );
}

export default ButtonComponent;

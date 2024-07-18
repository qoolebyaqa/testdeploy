import ButtonComponent from "../UI/ButtonComponent";

function NewEmployeeBtns() {
  const buttons = [
    { title: "Сохранить", color: "bg-lombard-btn-green" },
    { title: "Отменить", color: "bg-lombard-btn-grey", className: "text-lombard-text-black" },
    { title: "Удалить", color: "bg-lombard-btn-red" },
    { title: "Печать", color: "bg-lombard-btn-yellow", handler: () => {} },
  ];

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 h-[60px]">
        <h3 className="text-black font-extrabold text-[18px]">Регистрация сотрудника</h3>
        <div className="flex gap-1 items-center">
          {buttons.map((btn) => (
            <ButtonComponent
              key={btn.title}
              titleBtn={btn.title}
              color={btn.color}
              clickHandler={btn.handler}
              className={btn.className}
            />
          ))}
        </div>
      </div> 
    </>
  );
}

export default NewEmployeeBtns;

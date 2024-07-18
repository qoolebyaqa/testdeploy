import ButtonComponent from "../UI/ButtonComponent";

function NewClientBtns() {
  const buttons = [
    { title: "Сохранить", color: "bg-lombard-btn-green" },
    { title: "Продлить", color: "bg-lombard-main-blue" },
    { title: "Пересмотр", color: "bg-lombard-main-blue" },
    { title: "Закрыть договор", color: "bg-lombard-btn-red" },
    { title: "СМС", color: "bg-lombard-btn-yellow"},
    { title: "Печать", color: "bg-lombard-btn-yellow", handler: () => {} },
  ];

  return (
    <>
      <div className="bg-[#EFF2F4] flex justify-between items-center px-3 text-[18px] h-[60px]">
        <h3 className="text-black font-extrabold">Создание клиента</h3>
        <div className="flex gap-1 items-center">
          {buttons.map((btn) => (
            <ButtonComponent
              key={btn.title}
              titleBtn={btn.title}
              color={btn.color}
              clickHandler={btn.handler}
            />
          ))}
        </div>
      </div> 
    </>
  );
}

export default NewClientBtns;

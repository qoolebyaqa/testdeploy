import { createPortal } from "react-dom";
import ButtonComponent from "../UI/ButtonComponent";
import Delete from "../UI/Delete";
import { useState } from "react";

function NewEmployeeBtns() {
  const [showDialog, setShowDialog] = useState(false);
  const buttons = [
    { title: "Сохранить", color: "bg-lombard-btn-green", form: "userForm", submit: true, shouldBeDisabled: false},
    /* { title: "Удалить", color: "bg-lombard-btn-red", handler: () => {setShowDialog(true)} },
    { title: "Печать", color: "bg-lombard-btn-yellow", handler: () => {} }, */
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
              /* clickHandler={btn.handler} */
              form={btn.form}
              submit={btn.submit}
              disabled={btn.shouldBeDisabled}
            />
          ))}
        </div>
        {showDialog && createPortal(<Delete clickHandler={() => setShowDialog(false)}/>, document.body)}
      </div> 
    </>
  );
}

export default NewEmployeeBtns;

import { Outlet } from "react-router";
import HeaderCashMainNav from "../../components/HeaderMainNav/HeaderCashMainNav";
import DropDown from "../../components/UI/DropDown";
import ButtonComponent from "../../components/UI/ButtonComponent";
import CustomInput from "../../components/UI/CustomInput";

function Cash() {
  return (
    <>
      <HeaderCashMainNav />
      <main className="w-[99vw]">
        <div className="flex justify-end items-center px-3 h-[60px]">
          <div className="flex gap-2 items-center justify-center">
            <CustomInput name="filterDate" type="date" />
            <DropDown
              title="Статус"
              name="status"
              listOfItems={[
                { label: "Заключен", key: 1 },
                { label: "Не заключен", key: 2 },
              ]}
            />
            <ButtonComponent
              titleBtn="Создать"
              color="bg-lombard-btn-green"
              clickHandler={() => {}}
            />
          </div>
        </div>
        <Outlet />
      </main>
    </>
  );
}

export default Cash;

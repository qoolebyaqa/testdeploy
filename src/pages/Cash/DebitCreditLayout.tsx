import { Outlet } from "react-router";
import HeaderNavItem from "../../components/HeaderMainNav/HeaderNavItem";

function DebitCreditLayout() {
  const navList = [
    {
      path: "/accountant/operations/debet",
      svgCase: "contracts",
      titleBtn: "Приход",
    },
    {
      path: "/accountant/operations/credit",
      svgCase: "contracts",
      titleBtn: "Расход",
    },
    {
      path: "/accountant/operations/general",
      svgCase: "contracts",
      titleBtn: "Основные средства",
    },
    {
      path: "/accountant/operations/received",
      svgCase: "contracts",
      titleBtn: "Полученные кредиты",
    },
    {
      path: "/accountant/operations/lowcost",
      svgCase: "contracts",
      titleBtn: "Малоценные средства",
    },
  ];
  return (
    <div className="flex gap-10">
      <div className="flex justify-between w-1/6 border-[1px] border-lombard-main-blue/40 rounded-xl">
        <ul className="flex flex-col w-full gap-1">
          {navList.map((navItem) => (
            <HeaderNavItem
              titleBtn={navItem.titleBtn}
              svgCase={navItem.svgCase}
              path={navItem.path}
              key={navItem.path}
            />
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default DebitCreditLayout;

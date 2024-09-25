import { NavLink } from "react-router-dom";
import HeaderNavItem from "./HeaderNavItem";
import HeaderUserBlock from "./HeaderUserBlock";
import SVGComponent from "../UI/SVGComponent";
function HeaderCashMainNav() {
  const navList = [
      { path: "/accountant/operations/debet", svgCase: "filials", titleBtn: "Операции", cashRoot: 'operation' },
      { path: "/accountant/bills", svgCase: "filials", titleBtn: "Счета" },
      { path: "/accountant/deals", svgCase: "filials", titleBtn: "Сделки" },
      { path: "/accountant/proccess", svgCase: "filials", titleBtn: "Процессы" },
      { path: "/accountant/reports", svgCase: "filials", titleBtn: "Отчёты" },
      { path: "/accountant/monitoring", svgCase: "filials", titleBtn: "Управления" },
    ];
  return (
    <header className="flex pt-2 px-4 justify-between items-center">
      <div className="flex py-[12px]">
        <NavLink to={"/"} className='mr-2'>
          <div className="bg-black w-[50px] h-[40px] rounded-xl flex justify-center items-center overflow-hidden">
            <div className="flex flex-col gap-4 w-full items-center translate-y-[17px] hover:translate-y-[-17px] transition-all duration-300">
            <SVGComponent title="home" />
            <SVGComponent title="hoverLogo" className="w-[32px]"/>
            </div>
          </div>
        </NavLink>
        
          <>
            <div className="flex relative">
              <input
                type="search"
                placeholder="Поиск"
                className="text-black px-2 placeholder:text-lombard-text-black bg-lombard-bg-inactive-grey h-[40px]  rounded-md"
              />
              <i>
                <SVGComponent title="search" className="w-[57px] h-[40px]"/>
              </i>
            </div>
            <nav>
              <ul className="flex mx-1">
                {navList.map((navItem) => (
                  <HeaderNavItem
                    titleBtn={navItem.titleBtn}
                    svgCase={navItem.svgCase}
                    path={navItem.path}
                    key={navItem.path}
                    cashRoot={navItem.cashRoot}
                  />
                ))}
              </ul>
            </nav>
          </>
      </div>
      <HeaderUserBlock />
    </header>
  );
}

export default HeaderCashMainNav;

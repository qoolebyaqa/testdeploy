import { NavLink, useLocation } from "react-router-dom";
import HeaderNavItem from "./HeaderNavItem";
import HeaderUserBlock from "./HeaderUserBlock";
import SVGComponent from "../UI/SVGComponent";

function HeaderMainNav() {
  const {pathname} = useLocation();
  const navList = [
    { titleBtn: "Договоры", svgCase: "employees", path: "/contracts" },
    { titleBtn: "Сотрудники", svgCase: "employees", path: "/employees" },
    { titleBtn: "КАТМ", svgCase: "KATM", path: "/katm" },
    { titleBtn: "Касса", svgCase: "cash", path: "/cash" },
    { titleBtn: "СМС", svgCase: "sms", path: "/sms" },
    { titleBtn: "Филиалы", svgCase: "filials", path: "/filials" },
    { titleBtn: "Другие", svgCase: "others", path: "/others" },
  ];

  return (
    <header className="flex pt-2 px-4 justify-between items-center">
      <div className="flex py-[12px]">
        <NavLink to={"/"}>
          <SVGComponent title="home" />
        </NavLink>
        {(pathname.toString() !== "/new-employee" && pathname.toString() !==  "/new-client") ? (
          <>
            <div className="flex relative">
              <input
                type="search"
                placeholder="Поиск"
                className="text-black px-2 placeholder:text-lombard-text-black bg-lombard-bg-inactive-grey h-[40px]"
              />
              <i>
                <SVGComponent title="search" />
              </i>
            </div>
            <nav>
              <ul className="flex">
                {navList.map((navItem) => (
                  <HeaderNavItem
                    titleBtn={navItem.titleBtn}
                    svgCase={navItem.svgCase}
                    path={navItem.path}
                    key={navItem.path}
                  />
                ))}
              </ul>
            </nav>
          </>
        ) : (
          <div className="flex items-center ml-2 text-black">
            <NavLink to={pathname.toString().includes("employee") ? "/employees" : "/"} className="text-black hover:border-b-2 hover:text-black"> Главное меню</NavLink>
            <p className="font-bold">{pathname.toString().includes("employee") ? "/ Регистрация сотрудника" : "/ Регистрация клиента"}</p>
          </div>
        )}
      </div>
      <HeaderUserBlock />
    </header>
  );
}

export default HeaderMainNav;

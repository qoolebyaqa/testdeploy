import { NavLink, useLocation } from "react-router-dom";
import HeaderNavItem from "./HeaderNavItem";
import HeaderUserBlock from "./HeaderUserBlock";
import SVGComponent from "../UI/SVGComponent";
import { dataFilials, dataKATM } from "../../helpers/fnHelpers";
import { IDataFilialType, IDataKatmType } from "../../helpers/types";
function HeaderMainNav() {
  const {pathname} = useLocation();
  const allFilials: IDataFilialType[] = [...dataFilials];
  const allKATM: IDataKatmType[] = [...dataKATM];
  const currentID = pathname.slice(
    pathname.lastIndexOf("=") + 1
  );
  const activeFilial = allFilials.find(
    (filial) => currentID && filial.index === Number(currentID)
  );
  const activeKATM = allKATM.find(
    (katm) => currentID && katm.index === Number(currentID)
  );
  const navList = [
    { titleBtn: "Договоры", svgCase: "contracts", path: "/contracts" },
    { titleBtn: "Сотрудники", svgCase: "employees", path: "/employees" },
    { titleBtn: "КАТМ", svgCase: "KATM", path: "/katm" },
    { titleBtn: "Касса", svgCase: "cash", path: "/cash" },
    { titleBtn: "Уведомления", svgCase: "sms", path: "/sms" },
    { titleBtn: "Филиалы", svgCase: "filials", path: "/filials" },
  ];
  const specialLayouts = [
    {path: "/new-employee", navTo: '/employees', breadCrumb: '/ Регистрация сотрудника', linkWording: 'Сотрудники'},
    {path: "/new-client", navTo: '/', breadCrumb: '/ Регистрация клиента', linkWording: 'Клиенты'},
    {path: "/filials/browse", navTo: '/filials', breadCrumb: `/ ${activeFilial?.filial}`, linkWording: 'Филиалы'},
    {path: "/katm/browse", navTo: '/katm', breadCrumb: `/ ${activeKATM?.name}`, linkWording: 'КАТМ Запросы'},
  ]

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
        {(!specialLayouts.map(layout => layout.path).includes(pathname) && !pathname.includes('=')) ? (
          <>
            <div className="flex relative">
              <input
                type="search"
                placeholder="Поиск"
                className="text-black px-2 placeholder:text-lombard-text-black bg-lombard-bg-inactive-grey h-[40px]  rounded-md"
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
          <div >
            {specialLayouts.filter(layout => pathname.toString().includes(layout.path)).map(layout => 
              (<div key={layout.path} className="flex items-center ml-2 text-black">
                <NavLink to={layout.navTo} className="text-black hover:border-b-2 hover:text-black">{layout.linkWording}</NavLink>
                <p className="font-bold">{layout.breadCrumb}</p>
              </div>)
            )}
          </div>
        )}
      </div>
      <HeaderUserBlock />
    </header>
  );
}

export default HeaderMainNav;

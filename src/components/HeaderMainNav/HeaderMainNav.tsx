import { NavLink, useLocation } from "react-router-dom";
import HeaderNavItem from "./HeaderNavItem";
import HeaderUserBlock from "./HeaderUserBlock";
import SVGComponent from "../UI/SVGComponent";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import { getUserNav } from "../../helpers/fnHelpers";
function HeaderMainNav() {
  const {pathname} = useLocation();
  const currentFilial = useAppSelector(state => state.filialStore.filialChoosenOne)
  const currentContract = useAppSelector(state => state.contractStore.contractChoosenOne)
  const currentKATM = useAppSelector(state => state.katmStore.katmChoosenOne)
  const currentClient = useAppSelector(state => state.clientStore.clientChoosenOne)  
  const currentUser = useAppSelector(state => state.employeeStore.employeeChoosenOne)
  const userCreds = useAppSelector(state => state.auth.currentUser)
  const navList = getUserNav(userCreds.role_id)
  const specialLayouts = [
    {path: "/new-employee", navTo: '/employees', breadCrumb: '/ Регистрация сотрудника', linkWording: 'Сотрудники'},
    {path: "/new-client", navTo: '/clients', breadCrumb: '/ Регистрация клиента', linkWording: 'Клиенты'},
    {path: "/filials/browse", navTo: '/filials', breadCrumb: `/ ${currentFilial?.filial}`, linkWording: 'Филиалы'},    
    {path: "/contracts/browse", navTo: '/contracts', breadCrumb: `/ ${currentContract?.name}`, linkWording: 'Договоры'},
    {path: "/katm/browse", navTo: '/katm', breadCrumb: `/ ${currentKATM?.name}`, linkWording: 'КАТМ Запросы'},
    {path: "/clients/browse", navTo: '/clients', breadCrumb: `/ ${currentClient?.name}`, linkWording: 'Клиенты'},
    {path: "/employees/browse", navTo: '/employees', breadCrumb: `/ ${currentUser?.name}`, linkWording: 'Сотрудники'},
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
                <SVGComponent title="search" className="w-[57px] h-[40px]"/>
              </i>
            </div>
            <nav>
              <ul className="flex mx-1">
                {navList.map((navItem) => (
                  navItem &&
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

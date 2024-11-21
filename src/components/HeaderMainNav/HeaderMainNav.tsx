import { NavLink, useLocation } from "react-router-dom";
import HeaderNavItem from "./HeaderNavItem";
import HeaderUserBlock from "./HeaderUserBlock";
import SVGComponent from "../UI/SVGComponent";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import {
  generateBreads,
  getUserNav,
  nonSpacedNonSymbols,
} from "../../helpers/fnHelpers";
import { useTranslation } from "react-i18next";
import { ChangeEvent } from "react";
import useActions from "../../helpers/hooks/useActions";
function HeaderMainNav() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const currentContract = useAppSelector(
    (state) => state.contractStore.contractChoosenOne
  );
  const currentKATM = useAppSelector((state) => state.katmStore.katmChoosenOne);
  const currentUser = useAppSelector(
    (state) => state.employeeStore.employeeChoosenOne
  );
  const userCreds = useAppSelector((state) => state.auth.currentUser);
  const navList = getUserNav(userCreds.role_id);
  const step = useAppSelector((state) => state.clientStore.stepState);
  const globalSearchValue = useAppSelector(
    (state) => state.globalStore.globalSearchValue
  );
  const dispatch = useActions();

  const specialLayouts = [
    {
      path: "/new-employee",
      navTo: "/employees",
      breadCrumb: "/ Регистрация сотрудника",
      linkWording: "Сотрудники",
    },
    {
      path: "/new-client",
      navTo: "/clients",
      breadCrumb: "/ Регистрация клиента",
      linkWording: "Клиенты",
    },
    {
      path: "/contracts/",
      navTo: "/contracts",
      breadCrumb: `/ ${currentContract?.name}`,
      linkWording: "Договоры",
    },
    {
      path: "/katm/",
      navTo: "/katm",
      breadCrumb: `/ ${currentKATM?.name}`,
      linkWording: "КАТМ Запросы",
    },
    {
      path: "/clients/",
      navTo: "/clients",
      breadCrumb: generateBreads(step.step, step.maxStep),
      linkWording: "Клиенты",
    },
    {
      path: "/employees/",
      navTo: "/employees",
      breadCrumb: `/ ${currentUser?.first_name} ${currentUser?.last_name} ${
        currentUser?.middle_name ? currentUser?.middle_name : ""
      }`,
      linkWording: "Сотрудники",
    },
  ];

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch.setGlobalSearchValue(e.target.value);
    if (e.target.value === "") {
      dispatch.setIsSearchApplied(false);
      dispatch.setTriggerUpdate();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch.setIsSearchApplied(true);
      dispatch.setTriggerUpdate();
    }
  };

  return (
    <header className="flex pt-2 px-4 justify-between items-center">
      <div className="flex py-[12px]">
        <NavLink to={"/"} className="mr-2">
          <div className="bg-black w-[50px] h-[40px] rounded-xl flex justify-center items-center overflow-hidden">
            <div className="flex flex-col gap-4 w-full items-center translate-y-[17px] hover:translate-y-[-17px] transition-all duration-300">
              <SVGComponent title="home" />
              <SVGComponent title="hoverLogo" className="w-[32px]" />
            </div>
          </div>
        </NavLink>
        {!specialLayouts.map((layout) => layout.path).includes(pathname) &&
        !pathname.match(/[0-9]/) ? (
          <>
            <div className="flex relative">
              <input
                type="search"
                placeholder="Поиск"
                className="text-black px-2 placeholder:text-lombard-text-black bg-lombard-bg-inactive-grey h-[40px]  rounded-md"
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                value={nonSpacedNonSymbols(globalSearchValue, true)}
              />
              <button
                className="p-0 m-0 mr-2"
                onClick={() => {
                  dispatch.setIsSearchApplied(true);
                  dispatch.setTriggerUpdate();
                }}
              >
                <i>
                  <SVGComponent title="search" className="w-[57px] h-[40px]" />
                </i>
              </button>
            </div>
            <nav>
              <ul className="flex mx-1">
                {navList.map(
                  (navItem) =>
                    navItem && (
                      <HeaderNavItem
                        titleBtn={t(navItem.titleBtn)}
                        svgCase={navItem.svgCase}
                        path={navItem.path}
                        key={navItem.path}
                        cashRoot={navItem.cashRoot}
                      />
                    )
                )}
              </ul>
            </nav>
          </>
        ) : (
          <div>
            {specialLayouts
              .filter((layout) => pathname.toString().includes(layout.path))
              .map((layout) => (
                <div
                  key={layout.path}
                  className="flex items-center ml-2 text-black"
                >
                  <NavLink
                    to={layout.navTo}
                    className="text-black hover:border-b-2 hover:text-black"
                  >
                    {layout.linkWording}
                  </NavLink>
                  <p className="font-bold">{layout.breadCrumb}</p>
                </div>
              ))}
          </div>
        )}
      </div>
      <HeaderUserBlock />
    </header>
  );
}

export default HeaderMainNav;

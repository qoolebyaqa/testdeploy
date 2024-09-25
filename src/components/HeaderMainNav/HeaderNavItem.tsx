import { NavLink, useLocation } from "react-router-dom";
import SVGComponent from "../UI/SVGComponent";

function HeaderNavItem({titleBtn, svgCase, path, cashRoot}: {titleBtn:string, svgCase: string, path:string, cashRoot?: string}) {
  const { pathname } = useLocation();
  return ( 
    <NavLink to={path}>
      <button className={`flex w-full rounded-lg ${(pathname.includes(path) || (cashRoot && pathname.includes(cashRoot))) ? "activeNav" : ''}`}>
        <i><SVGComponent title={svgCase}/></i>
        <p className={`${(pathname.includes(path) || (cashRoot && pathname.includes(cashRoot)))? 'text-white' : 'text-black'} ml-[4px]`}>{titleBtn}</p>
      </button>
    </NavLink> );
}

export default HeaderNavItem;
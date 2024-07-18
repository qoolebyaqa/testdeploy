import { NavLink, useLocation } from "react-router-dom";
import SVGComponent from "../UI/SVGComponent";

function HeaderNavItem({titleBtn, svgCase, path}: {titleBtn:string, svgCase: string, path:string}) {
  const { pathname } = useLocation();
  return ( 
    <NavLink to={path}>
      <button className="flex rounded-lg mx-1" style={pathname === path ? {backgroundColor: "#EFF2F4"}: {}}>
        <i><SVGComponent title={svgCase}/></i>
        <p className="text-black ml-[4px]">{titleBtn}</p>
      </button>
    </NavLink> );
}

export default HeaderNavItem;
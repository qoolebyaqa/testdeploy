import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import { ROLE_ENUM } from "../../helpers/types";
import SVGComponent from "../UI/SVGComponent";


function HeaderUserBlock() {
  const userCreds = useAppSelector(state => state.auth.currentUser)
  return ( <div className="flex gap-2">
    <div>
      <h3 className="text-right font-bold text-[16px]">{userCreds.name}</h3>
      <p className="text-right text-red-600 font-bold text-[12px]">{ROLE_ENUM[userCreds.role_id as 'ADMIN' | 'OPERATOR' | 'ACCOUNTANT']}</p>
    </div>
    <i><SVGComponent title="userIcon"/></i>
    <i><SVGComponent title="notifications"/></i>
  </div> );
}

export default HeaderUserBlock;
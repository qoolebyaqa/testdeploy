import { useState } from "react";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import { ROLE_ENUM } from "../../helpers/types";
import SVGComponent from "../UI/SVGComponent";
import ButtonComponent from "../UI/ButtonComponent";
import { ApiService } from "../../helpers/API/ApiSerivce";
import { useNavigate } from "react-router";
import ConfirmatioModal from "../Modals/Confirmation";
import { createPortal } from "react-dom";


function HeaderUserBlock() {
  const userCreds = useAppSelector(state => state.auth.currentUser)
  const [showLogout, setShowLogout] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const rt = localStorage.getItem('rt')
      rt && ApiService.logout(rt);
      localStorage.removeItem('rt');
    } catch (err) {
      console.log(err);
    } finally {      
      navigate('/auth')
    }
  }

  return ( <div className="flex gap-2" onMouseLeave={() => setShowLogout(false)}>
    <div>
      <h3 className="text-right font-bold text-[16px]">{userCreds.login}</h3>
      <p className="text-right text-red-600 font-bold text-[12px]">{ROLE_ENUM[userCreds.role_id as 'ADMIN' | 'OPERATOR' | 'ACCOUNTANT']}</p>
    </div>
    <i onMouseEnter={() => setShowLogout(true)}><SVGComponent title="userIcon"/></i>
    {showLogout && <ButtonComponent titleBtn='Выйти' color="bg-lombard-btn-red" clickHandler={() => {setShowConfirmation(true)}}/>}
    <i><SVGComponent title="notifications"/></i>
    {showConfirmation && createPortal(
    <ConfirmatioModal handleSave={logout} handleClose={() => {setShowConfirmation(false)}} title="Подтвердите" textMsg="Вы действительно хотите выйти?" colorReverse={true}/>, document.body)}
  </div> );
}

export default HeaderUserBlock;
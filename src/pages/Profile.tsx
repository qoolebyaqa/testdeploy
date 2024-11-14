import { useNavigate } from "react-router";
import useActions from "../helpers/hooks/useActions";
import { ApiService } from "../helpers/API/ApiSerivce";
import { useState } from "react";
import { createPortal } from "react-dom";
import Confirmation from "../components/UI/Confirmation";
import { useAppSelector } from "../helpers/hooks/useAppSelector";
import { ROLE_ENUM } from "../helpers/types";
import ButtonComponent from "../components/UI/ButtonComponent";
import { useTranslation } from "react-i18next";

function Profile() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { t, i18n } = useTranslation()
  const userCreds = useAppSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useActions();

  const logout = async () => {
    try {
      const rt = localStorage.getItem("rt");
      rt && ApiService.logout(rt);
      localStorage.removeItem("rt");
    } catch (err) {
      console.log(err);
    } finally {
      dispatch.setCurrentUser({ role_id: "", login: "" });
      dispatch.setAuthLoading(false);
      navigate("/auth");
    }
  };

  const changeLang = (lang:string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang)
  }


  return (
    <>
      <div className="flex justify-between">
        <div className="font-bold text-xl flex gap-4">
          <p className="text-lombard-btn-red">
            {
              t(ROLE_ENUM[
                userCreds.role_id as "ADMIN" | "OPERATOR" | "ACCOUNTANT"
              ])
            }
          </p>
          <p>{userCreds.login}</p>
        </div>
        <div className="flex gap-2">
          <ButtonComponent
            titleBtn={t("allbtns.save")}
            className="bg-lombard-btn-green"
          />
          <ButtonComponent
            titleBtn={t("allbtns.changePass")}
            className="bg-lombard-main-blue"
          />
          <ButtonComponent
            titleBtn={t("allbtns.logout")}
            className="bg-lombard-btn-red"
            clickHandler={() => setShowConfirmation(true)}
          />
        </div>
      </div>
      <div className=" w-2/12">
      <div className="flex justify-between items-center border-b-2 pb-2 border-lombard-borders-grey">
        <h4 className="text-black font-semibold">{t("profile.language")}</h4>
      </div>
        <div className="flex flex-col rounded-md border-2 mt-4">
          <button
            onClick={() => changeLang("uz")}
            className={`${i18n.language === 'uz' ? 'text-white bg-lombard-main-blue': 'text-black bg-white'} `}
          >
            {t("locales.uz")}
          </button>
          <button
            onClick={() => changeLang("ru")}
            className={`${i18n.language === 'ru' ? 'text-white bg-lombard-main-blue': 'text-black bg-white'} `}
          >
            {t("locales.ru")}
          </button>
        </div>
        </div>

      {showConfirmation &&
        createPortal(
          <Confirmation
            handleSave={logout}
            handleClose={() => {
              setShowConfirmation(false);
            }}
            title={t("profile.logoutmsgTitle")}
            textMsg={t("profile.logoutMsg")}
            colorReverse={true}
          />,
          document.body
        )}
    </>
  );
}

export default Profile;

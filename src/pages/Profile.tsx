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
import CustomInput from "../components/UI/CustomInput";
import { useForm } from "react-hook-form";
import SVGComponent from "../components/UI/SVGComponent";

function Profile() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { t, i18n } = useTranslation();
  const userCreds = useAppSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useActions();

  const {
    control,
    formState: {},
  } = useForm({ mode: "onChange" });

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

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className=" bg-[#EFF2F4] p-2">
      <div className="flex justify-between">
        <div className="font-bold text-xl flex gap-4">
          <p className="text-lombard-btn-red">
            {t(
              ROLE_ENUM[
                userCreds.role_id as "ADMIN" | "OPERATOR" | "ACCOUNTANT"
              ]
            )}
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
      <div className="bg-white rounded-2xl p-2 mb-4">
        <div className="relative ">
          <img src="/defaultAvatarMale.png" alt="avatar" className="w-full" />
          <SVGComponent title="editPhoto" />
        </div>
        <form className="flex flex-col gap-2 my-4" onSubmit={() => {}}>
          <CustomInput
            type="text"
            name="last_name"
            placeholder="Фамилия"
            label="ФИО"
            control={control}
          />
          <CustomInput
            type="text"
            name="first_name"
            control={control}
            placeholder="Имя"
          />
          <CustomInput
            type="text"
            name="middle_name"
            placeholder="Отчество"
            control={control}
          />
        </form>
        </div>
        <div className="bg-white rounded-2xl p-2">
        <div className="flex justify-between items-center border-b-2 pb-2 border-lombard-borders-grey">
          <h4 className="text-black font-semibold">{t("profile.language")}</h4>
        </div>
        <div className="flex flex-col rounded-md border-2 mt-4">
          <button
            onClick={() => changeLang("uz")}
            className={`${
              i18n.language === "uz"
                ? "text-white bg-lombard-main-blue"
                : "text-black bg-white"
            } `}
          >
            {t("locales.uz")}
          </button>
          <button
            onClick={() => changeLang("ru")}
            className={`${
              i18n.language === "ru"
                ? "text-white bg-lombard-main-blue"
                : "text-black bg-white"
            } `}
          >
            {t("locales.ru")}
          </button>
        </div>
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
    </div>
  );
}

export default Profile;

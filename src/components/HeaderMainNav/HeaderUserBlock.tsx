import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../helpers/hooks/useAppSelector";
import { ROLE_ENUM } from "../../helpers/types";
import SVGComponent from "../UI/SVGComponent";
import { NavLink } from "react-router-dom";

function HeaderUserBlock() {
  const userCreds = useAppSelector((state) => state.auth.currentUser);
  const { t } = useTranslation()

  return (
    <div className="flex gap-2">
      <div>
        <h3 className="text-right font-bold text-[16px]">{userCreds.login}</h3>
        <p className="text-right text-red-600 font-bold text-[12px]">
          {t(ROLE_ENUM[userCreds.role_id as "ADMIN" | "OPERATOR" | "ACCOUNTANT"])}
        </p>
      </div>
      <NavLink to='/profile'>
      <i>
        <SVGComponent title="userIcon" />
      </i>
      </NavLink>
      <i>
        <SVGComponent title="notifications" />
      </i>
    </div>
  );
}

export default HeaderUserBlock;

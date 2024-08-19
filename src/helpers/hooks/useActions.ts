import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { clientActions } from "../../store/client";
import { filialActions } from "../../store/filial";
import { authActions } from "../../store/auth";
import { employeelActions } from "../../store/employee";
import { smsActions } from "../../store/sms";
import { katmActions } from "../../store/katm";

const actions = {
  ...clientActions,
  ...filialActions,
  ...authActions,
  ...employeelActions,
  ...smsActions,
  ...katmActions
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

export default useActions;

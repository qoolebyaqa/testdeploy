import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { clientActions } from "../../store/client";
import { filialActions } from "../../store/filial";
import { authActions } from "../../store/auth";
import { employeeActions } from "../../store/employee";
import { smsActions } from "../../store/sms";
import { katmActions } from "../../store/katm";
import { contractsActions } from "../../store/contracts";
import { fingerPrintStoreActions } from "../../store/fingerPrint";

const actions = {
  ...clientActions,
  ...contractsActions,
  ...filialActions,
  ...authActions,
  ...employeeActions,
  ...smsActions,
  ...katmActions,
  ...fingerPrintStoreActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

export default useActions;

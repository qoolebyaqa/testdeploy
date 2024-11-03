import { createSlice } from "@reduxjs/toolkit";

const fingerPrintStore = createSlice({
  name:"fingerPrint",
  initialState:{
    rightHandFingers:[],
    leftHandFingers:[],
    agentId:null,
  } as {
    rightHandFingers: React.Key[];
    leftHandFingers: React.Key[];
    agentId:null|string,
  },
  reducers:{
    setRightHandFingerTemplates(state,items){
      state.rightHandFingers=JSON.parse(JSON.stringify(items.payload))
      
    },
    setLeftHandFingerTemplates(state,items){
      state.leftHandFingers=JSON.parse(JSON.stringify(items.payload))
    },
    setAgentId(state,value){
      state.agentId=value.payload
    }
  }

})

export const fingerPrintStoreActions = fingerPrintStore.actions;

export default fingerPrintStore.reducer;
import {
   USER_DATA,
   LOGIN_STATUS,
   EMPTY_LOADER,
   LOCATION_DATA,
   SELECTED_BRANCH,
   SELECTED_HOME_APP_ITEM,
   SELECTED_HOME_WORK_ITEM,
   SELECTED_HOME_DELIVERY_ITEM,
   SELECTED_HOME_READY_DELIVERY_ITEM,
   JOBCARD_DATASHEET_REFRESH,
   HOME_SELECT_DATA,
   PREJOBCARD_REFRESH,
   HOME_REFRESH,
   BOOKING_DETAIL,
   VEHICLE_DETAIL_FROM_CHASSIS_NUMBER
} from './types';

export const loginStatus = payload =>{
  return{
    type:LOGIN_STATUS,
    payload:payload
  }
}
export const userData_Action = payload => {
  console.log("userAction"+JSON.stringify(payload))
  return {
    type: USER_DATA,
    payload: payload,
  };
};
export const emptyLoader_Action = payload => {
  console.log("userAction"+JSON.stringify(payload))
  return {
    type: EMPTY_LOADER,
    payload: payload,
  };
};

export const location_Data_Action = payload => {
  console.log("userAction"+JSON.stringify(payload))
  return {
    type: LOCATION_DATA,
    payload: payload,
  };
};

export const selectedBranch_Action = payload => {
  console.log("userAction"+JSON.stringify(payload))
  return {
    type: SELECTED_BRANCH,
    payload: payload,
  };
};
export const selectedHomeAppointmentItem_Action = payload => {
  console.log("userAction"+JSON.stringify(payload))
  return {
    type: SELECTED_HOME_APP_ITEM,
    payload: payload,
  };
};
export const selectedHomeWorkInProgItem_Action = payload => {
  console.log("userAction"+JSON.stringify(payload))
  return {
    type: SELECTED_HOME_WORK_ITEM,
    payload: payload,
  };
};
export const selectedHomeDeliveryItem_Action = payload => {
  console.log("userAction"+JSON.stringify(payload))
  return {
    type: SELECTED_HOME_DELIVERY_ITEM,
    payload: payload,
  };
};
export const selectedHomeReadyForDeliveryItem_Action = payload => {
  console.log("userAction"+JSON.stringify(payload))
  return {
    type: SELECTED_HOME_READY_DELIVERY_ITEM,
    payload: payload,
  };
}

  export const jobcardDateSheetRefresh_Action = payload => {
    console.log("userAction1123"+JSON.stringify(payload))
    return {
      type: JOBCARD_DATASHEET_REFRESH,
      payload: payload,
    };
};

export const homeSelect_Data_Action = payload => {
  return {
    type: HOME_SELECT_DATA,
    payload: payload,
  };
};

export const preJobCard_Refresh_Action = payload => {
  return {
    type: PREJOBCARD_REFRESH,
    payload: payload,
  };
};

export const home_Refresh_Action = payload => {
  return {
    type: HOME_REFRESH,
    payload: payload,
  };
};

export const booking_Detail_Action = payload => {
  return {
    type: BOOKING_DETAIL,
    payload: payload,
  };
};

export const Vehicle_Detail_From_Chassis_Number_Action = payload => {
  return {
    type: VEHICLE_DETAIL_FROM_CHASSIS_NUMBER,
    payload: payload,
  };
};
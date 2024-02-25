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
} from '../actions/types';

const initialState = {
  userData: {},
  token: '',
  outlets:[],
  isLogin: false, 
  emptyLoader:false,
  locationData:[],
  selectedBranch: {},
  selectedHomeAppointmentItem: {},
  selectedHomeWorkInProgItem: {},
  selectedHomeDeliveryItem: {},
  selectedHomeReadyForDeliveryItem: {},
  jobCardDateSheetRefresh:false,
  homeSelectData:{},
  preJobCardRefresh:false,
  homeRefresh : false,
  bookingDetail:{},
  vehicleDetailFromChassisNumber:{}
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STATUS:
      return {
        ...state,
        isLogin: action.payload
      }

    case USER_DATA:
      console.log("userAction1"+JSON.stringify(action))
      return {
        ...state,
        userData: action.payload.data,
        token: action.payload.token,
        isLogin: action.payload.loginStatus,
        outlets : action.payload.outlets,
      };
      case EMPTY_LOADER:
        console.log("userAction1"+JSON.stringify(action))
        return {
          ...state,
          emptyLoader: action.payload,
        };
        case LOCATION_DATA:
        console.log("userAction1"+JSON.stringify(action))
        return {
          ...state,
          locationData: action.payload,
        };
        case SELECTED_BRANCH:
        console.log("userAction1"+JSON.stringify(action))
        return {
          ...state,
          selectedBranch: action.payload,
        };
        case SELECTED_HOME_APP_ITEM:
        console.log("aaaauserAction1=="+JSON.stringify(action))
        return {
          ...state,
          selectedHomeAppointmentItem: action.payload,
        };
        case SELECTED_HOME_WORK_ITEM:
        console.log("aaaauserAction1=="+JSON.stringify(action))
        return {
          ...state,
          selectedHomeWorkInProgItem: action.payload,
        };
        case SELECTED_HOME_DELIVERY_ITEM:
        console.log("aaaauserAction1=="+JSON.stringify(action))
        return {
          ...state,
          selectedHomeDeliveryItem: action.payload,
        };
        case SELECTED_HOME_READY_DELIVERY_ITEM:
        console.log("aaaauserAction1=="+JSON.stringify(action))
        return {
          ...state,
          selectedHomeReadyForDeliveryItem: action.payload,
        };
        case JOBCARD_DATASHEET_REFRESH:
          console.log("aaaauserAction1=="+JSON.stringify(action))
          return {
            ...state,
           jobCardDateSheetRefresh: action.payload,
          };

          case HOME_SELECT_DATA:
            console.log("homeSelectAction1=="+JSON.stringify(action))
            return {
              ...state,
             homeSelectData: action.payload,
            };

            case PREJOBCARD_REFRESH:
              console.log("homeSelectAction1=="+JSON.stringify(action))
              return {
                ...state,
                preJobCardRefresh: action.payload,
              };

              case HOME_REFRESH:
                console.log("homeSelectAction1=="+JSON.stringify(action))
                return {
                  ...state,
                  homeRefresh : action.payload,
                };

                case BOOKING_DETAIL:
                  console.log("bookingdetail1=="+JSON.stringify(action))
                  return {
                    ...state,
                    bookingDetail : action.payload,
                  };

                  case VEHICLE_DETAIL_FROM_CHASSIS_NUMBER:
                    console.log("vehicleDetailbychassisnol1=="+JSON.stringify(action))
                    return {
                      ...state,
                      vehicleDetailFromChassisNumber : action.payload,
                    };
              
            
    default:
      return state;
  }
};
export default AuthReducer;

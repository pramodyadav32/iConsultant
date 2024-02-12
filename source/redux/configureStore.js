import AuthReducer from './reducers/AuthReducer';
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = configureStore({
  reducer:{
    AuthReducer : AuthReducer,
  }
});

export default rootReducer;

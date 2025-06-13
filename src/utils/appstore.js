import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./userslice";
const appstore=configureStore({reducer:{
    user: userreducer,
}});
export default appstore;
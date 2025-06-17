import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./userslice";
import feedreducer from "./feedslice";
import connectionreducer from "./coonectionslice";
import requestsreducer from "./requestslice";
const appstore=configureStore({reducer:{
    user: userreducer,
    feed:feedreducer,
    connections:connectionreducer,
    requests:requestsreducer,
}});
export default appstore;
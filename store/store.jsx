import { configureStore } from "@reduxjs/toolkit";
import Productreducer from '../Slice/ProductSlice';
export const store = configureStore({


   reducer:{

            product:Productreducer
   }
});


import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  dataShopingCart: any;
 
}
const initialState: InitialState = {
  dataShopingCart:[
  
  ]
 
};
const  idExists=(value:any,array:Array<[]>) => {
  return array.some((item:any)=> {
    return item.id === value;
  }); 
};
export const authSlice = createSlice({
  name: "shopingCart",
  initialState,
  reducers: {
    getShopingCart: (state,action) => {//
      let temp = action.payload;
      if(idExists(temp.id, state.dataShopingCart)){
        return;
      }else{
        state.dataShopingCart.push(temp);
      }
    },
    deleteShopingCart: (state,action) => {// 
      let temp = action.payload;
      if(idExists(temp.id, state.dataShopingCart)){
        state.dataShopingCart.pop(temp);
        return;
      }
    },
    restart: (state, action) =>{
      state.dataShopingCart=[];
    },
  },
});
export const { getShopingCart  } = authSlice.actions;
export const { deleteShopingCart  } = authSlice.actions;
export const { restart  } = authSlice.actions;




export default authSlice.reducer;

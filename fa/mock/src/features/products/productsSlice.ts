import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
  dataProducts: any;
 
}
const initialState: InitialState = {
  dataProducts:[{
    category: [],
    price: '',
    id: '',
    image: '',
    productName:'',
    description:'',
   
  }],
 
};

export const authSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action) => {// 
      state.dataProducts = action.payload;
    },
    
  },
});
export const { getProducts  } = authSlice.actions;




export default authSlice.reducer;

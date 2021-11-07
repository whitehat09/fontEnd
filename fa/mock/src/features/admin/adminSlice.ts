import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  admin: any;
  errorMessage:string;
  isLoginAdmin:Boolean;
}
const initialState: InitialState = {
  admin:{
    email: "admin",
    password: "123123"
  },
  errorMessage:'',
  isLoginAdmin:false,

 
};

export const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
   
    signInAdmin: (state, action) => {// 
      if(state.admin.email === action.payload.email &&state.admin.password === action.payload.password){
        state.isLoginAdmin=true;
      }
      else{
        state.errorMessage='tài khoản hoặc mật khẩu sai !';
      }
    },
    loginAdmin: (state) => {// 
      state.isLoginAdmin=false;
    },
    
  },
});
export const { signInAdmin  } = authSlice.actions;
export const {  loginAdmin } = authSlice.actions;




export default authSlice.reducer;

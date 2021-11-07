import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";


interface InitialState {
  dataUser: any;
  isLogin:boolean;
  isLoading:boolean;
  showHeader:boolean;

}
const initialState: InitialState = {
  dataUser:{ displayName: '',
    email:'',
    photoURL:'',
    uid: '',
    providerId: '',},
  isLogin:  false,
  isLoading:  false,
  showHeader:  false,// false user true admin
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {// lưu data khi đăng nhập
      state.dataUser = action.payload;
      state.isLogin=true;
    },
    logOut:(state,action)=>{// đăng xuất
      auth.signOut();
      state.isLogin=false;
    },
    showHeaderUser:(state,action)=>{// showHeaderUser
      auth.signOut();
      state.showHeader=false;
    },
    showHeaderAdmin:(state,action)=>{// showHeaderAdmin
      auth.signOut();
      state.showHeader=true;
    },
  },
});
export const { logIn  } = authSlice.actions;
export const { logOut  } = authSlice.actions;
export const { showHeaderUser, showHeaderAdmin } = authSlice.actions;



export default authSlice.reducer;

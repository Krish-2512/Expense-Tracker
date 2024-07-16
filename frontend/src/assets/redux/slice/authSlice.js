import { createSlice }  from "@reduxjs/toolkit"
// const initialState={
//     posts:[],
//     comment:[],
//     user: null                          

// }
const authSlice = createSlice({
    name:"Auth",
    initialState:{
         user:JSON.parse(localStorage.getItem('userInfo'))||null                 //passing value  from local storage to redux devtool
    },

reducers:{
    loginAction(state,action){
        state.user = action.payload
    },
    logoutAction(state,action){
        state.user =null
    }
}

});

export const {loginAction,logoutAction} = authSlice.actions
console.log(authSlice)
export default authSlice.reducer;
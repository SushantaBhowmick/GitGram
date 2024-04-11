import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../service/service";

interface User {
    emailOrUsername:string;
    password:string;
    message:string;
}

interface UserState{
    user:User|null;
    loading:boolean;
    isAuthenticated:boolean;
    message: string|null;
    error:string|null;
}

const initialState:UserState={
    user:null,
    loading:true,
    isAuthenticated:false,
    message:null,
    error:null,
}

export const loginUser=createAsyncThunk<User,{emailOrUsername:string;password:string}>(
    'user/loginUser',async({emailOrUsername,password})=>{
        const response = await axios.post<User>(`${baseUrl}/user/login`,{emailOrUsername,password},{withCredentials:true});
        return response.data;
    }
)


export const loadUser=createAsyncThunk<User>(
    'user/loadUser',async()=>{
        const response = await axios.get<User>(`${baseUrl}/user/me`,{withCredentials:true});
        return response.data;
    }
    )
    
export const registerUser=createAsyncThunk<User,FormData>(
        'user/registerUser',async(formData)=>{
            const config = {
                headers: { "Content-Type": "multipart/form-data" }
              }
            const response = await axios.post<User>(`${baseUrl}/user/register`,formData,config);
            return response.data;
        }
    )

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        clearError(state){
            state.error=null;
        },
        clearMessage(state){
            state.message=null;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(loginUser.pending,(state)=>{  //for login
            state.loading=true;
            state.error = null;
            state.message=null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.isAuthenticated=true;
            state.message= action.payload.message ||"Login successfully"
        })
        .addCase(loginUser.rejected,(state)=>{
            state.loading = false;
            state.isAuthenticated=false;
            state.error = "Invalid credentials";
        })
        .addCase(loadUser.pending,(state)=>{ //load user
            state.loading=true;
            state.error = null;
            state.message=null;
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.isAuthenticated=true;
        })
        .addCase(loadUser.rejected,(state)=>{
            state.loading = false;
            state.isAuthenticated=false;
            state.error = "Please login to access this resource";
        })
        .addCase(registerUser.pending,(state)=>{ //register user
            state.loading=true;
            state.error = null;
            state.message=null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.message= action.payload.message ||"Check your Email"
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message || "an error occurd";
        })
    },
})

export const {clearError,clearMessage} =userSlice.actions;

export default userSlice.reducer;
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../service/service";

interface User {
    emailOrUsername:string;
    avatar:string;
    username:string;
    name:string;
}

interface UserState{
    isAuthenticated: boolean;
    loading: boolean;
    user?: User | null; // Update this with your user type
    error?: string | null;
    message?: string | null;
}

interface UserCredentials {
    id:string;
    emailOrUsername: string;
    password: string;
}

const initialState:UserState={
    loading:false,
    isAuthenticated:false,
}

export const loginUser = createAsyncThunk("user/loginUser",
    async({emailOrUsername,password}:UserCredentials,{rejectWithValue})=>{
        try {
            const {data}=await axios.post(`${baseUrl}/user/login`,{emailOrUsername,password},{withCredentials:true});
            console.log(data)
            return data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
              }
              return rejectWithValue("An unknown error occurred");
            }
            // Handle non-Axios errors here
            return rejectWithValue("An unknown error occurred");
          }
        }
      );

// load user thunk
export const loadUser = createAsyncThunk("user/loadUser",
    async(_,{rejectWithValue})=>{
        try {
            const {data}=await axios.get(`${baseUrl}/user/me`,{withCredentials:true});
            return data;
        }catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
              }
              return rejectWithValue("An unknown error occurred");
            }
            // Handle non-Axios errors here
            return rejectWithValue("An unknown error occurred");
          }
        }
      );

    // another way
// export const registerUser=createAsyncThunk(
//         'user/registerUser',async(formData)=>{
//             const config = {
//                 headers: { "Content-Type": "multipart/form-data" }
//               }
//             const response = await axios.post<User>(`${baseUrl}/user/register`,formData,config);
//             return response.data;
//         }
//     )

    
export const registerUser=createAsyncThunk(
        'user/registerUser',async(formData:FormData,{rejectWithValue})=>{
          try {
            const config = {
                headers: { "Content-Type": "multipart/form-data" }
              }
            const {data} = await axios.post(`${baseUrl}/user/register`,formData,config);
            return data;
          } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
              }
              return rejectWithValue("An unknown error occurred");
            }
            // Handle non-Axios errors here
            return rejectWithValue("An unknown error occurred");
          }
        }
      );

  
//get single User
export const singleUser = createAsyncThunk("user/singleUser",
async({id}:UserCredentials,{rejectWithValue})=>{
    try {
        const {data}=await axios.get(`${baseUrl}/user/${id}`,{withCredentials:true});
        return data;
    }catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.data && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          }
          return rejectWithValue("An unknown error occurred");
        }
        // Handle non-Axios errors here
        return rejectWithValue("An unknown error occurred");
      }
    }
  );

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
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.user;
            state.isAuthenticated=true;
            state.message= action.payload.message ||"Login successfully"
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.isAuthenticated=false;
            state.error = action.payload as string;
        })
        .addCase(loadUser.pending,(state)=>{ //load user
            state.loading=true;
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.user;
            state.isAuthenticated=true;
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.loading = false;
            state.isAuthenticated=false;
            state.error = action.payload as string;
        })
        .addCase(registerUser.pending,(state)=>{ //register user
            state.loading=true;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.message= action.payload.message ||"Check your Email"
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload as string || "an error occurd";
        })
        .addCase(singleUser.pending,(state)=>{ //register user
            state.loading=true;
        })
        .addCase(singleUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(singleUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload as string || "an error occurd";
        })
    },
})

export const {clearError,clearMessage} =userSlice.actions;

export default userSlice.reducer;
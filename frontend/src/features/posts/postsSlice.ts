import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../service/service";
import { Post } from "../../types/posts";


interface PostState{
    loading: boolean;
    error?: string | null;
    message?: string | null;
    posts?:Post[];
    singlePost?:Post;
    post?:Post | null;
}

// interface PostCredentials {
//     caption: string;
//     file: string;
// }

const initialState:PostState={
    loading:false,
}

    
export const newPost=createAsyncThunk(
        'post/newPost',async(formData:FormData,{rejectWithValue})=>{
          try {
            const config = {
                withCredentials:true,
                headers: { "Content-Type": "multipart/form-data" }
              }
            const {data} = await axios.post(`${baseUrl}/post/create`,formData,config);
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
    
export const getAllPost=createAsyncThunk(
        'post/allPost',async(_,{rejectWithValue})=>{
          try {
            // const config = {
            //     headers: { "Content-Type": "application/json" }
            //   }
            const {data} = await axios.get(`${baseUrl}/post/all`,{
              withCredentials:true});
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
    
export const getAPost=createAsyncThunk(
        'post/getAPost',async(id:string,{rejectWithValue})=>{
          try {
            const {data} = await axios.get(`${baseUrl}/post/${id}`,{
              withCredentials:true});
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

const postSlice = createSlice({
    name:'post',
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
        .addCase(newPost.pending,(state)=>{  //create post
            state.loading=true;
        })
        .addCase(newPost.fulfilled,(state,action)=>{
            state.loading=false;
            state.message= action.payload.message ||"Post Created successfully!"
            state.post=action.payload.post;
        })
        .addCase(newPost.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })
        
        .addCase(getAllPost.pending,(state)=>{  //get all posts
            state.loading=true;
        })
        .addCase(getAllPost.fulfilled,(state,action)=>{
            state.loading=false;
            state.posts=action.payload.posts;
        })
        .addCase(getAllPost.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })
        
        .addCase(getAPost.pending,(state)=>{  // getAPost
            state.loading=true;
        })
        .addCase(getAPost.fulfilled,(state,action)=>{
            state.loading=false;
            state.singlePost=action.payload.singlePost;
        })
        .addCase(getAPost.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })
        
    },
})

export const {clearError,clearMessage} =postSlice.actions;

export default postSlice.reducer;
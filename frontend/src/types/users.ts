import { Post } from "./posts";

export interface User {
  _id:string;
  emailOrUsername: string;
  avatar: string;
  username: string;
  name: string;
  myPosts?: Post[];
  posts?:Post[]
  following:[];
  followers:[];
}
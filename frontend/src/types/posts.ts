interface User {
  _id:string;
  avatar:string;
  name:string;
  username:string;
}
export interface Comment {
  _id:string;
  user:User;
  text:string;
  replies:Comment;
  parentComment:string;
  createdAt:string;
}

export interface Post {
    _id: string;
    user?: User;
    caption: string;
    image?: string;
    video?: string;
    comments?:Comment[],
    likes?: []; // Define the type of likes array as needed
    createdAt: string;
    updatedAt: string;
  }
  
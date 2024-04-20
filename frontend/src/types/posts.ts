interface User {
  avatar:string;
  name:string;
  username:string;
}

export interface Post {
    _id: string;
    user?: User;
    caption: string;
    image?: string;
    video?: string;
    comments?:[],
    likes?: []; // Define the type of likes array as needed
    createdAt: string;
    updatedAt: string;
  }
  
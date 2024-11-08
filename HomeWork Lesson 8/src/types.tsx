export interface Exhibit {
    id: string;
    imageUrl: string;
    description: string;
    user: { id: string; username: string };
    createdAt: string;
  }
  
  export interface Comment {
    id: string;
    text: string;
    user: { id: string; username: string };
  }

  export interface User {
    id: string;
    username: string;
  }

export interface ExhibitI {
  id: number;
  imageUrl: string; 
  description: string;
  user: UserI;
  commentCount: number;
  createdAt: string;
}

export interface Comment {
  id: number;
  text: string;
  user: { id: number; username: string };
}

export interface CommentStripeProps {
  exhibitId: number;
  expanded: boolean;
}

export interface UserI {
  id: number;
  username: string;
}

export interface ExhibitCardProps {
  exhibit: ExhibitI;
  user: UserI | null;
  onRemove: (id: number) => void;
  onAddComment: (exhibitId: number, comment: string) => void;
  onDeleteComment: (exhibitId: number, commentId: number) => void;
  commentsMap: Record<string, Comment[]>;
}

export interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export interface PostProps {
  id: number;
  imageUrl: string;
  description: string;
  username: string;
  userid: number;
  commentCount: number;
}

export interface ProtectedRouteProps {
  children: JSX.Element;
  requiresAuth: boolean;
}

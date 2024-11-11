export interface ExhibitI {
  id: number;
  imageUrl: string;
  description: string;
  user: { id: number; username: string };
  createdAt: string;
}

export interface Comment {
  id: string;
  text: string;
  user: { id: string; username: string };
}

export interface CommentStripeProps {
  exhibitId: number;
}

export interface User {
  id: number;
  username: string;
}

export interface ExhibitCardProps {
  exhibit: ExhibitI;
  user: User | null;
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

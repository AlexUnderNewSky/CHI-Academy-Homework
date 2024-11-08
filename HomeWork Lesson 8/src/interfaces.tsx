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

export interface CommentStripeProps {
  exhibitId: string;
}

export interface User {
  id: string;
  username: string;
}

export interface ExhibitCardProps {
  exhibit: Exhibit;
  user: User | null;
  onRemove: (id: string) => void;
  onAddComment: (exhibitId: string, comment: string) => void;
  onDeleteComment: (exhibitId: string, commentId: string) => void;
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

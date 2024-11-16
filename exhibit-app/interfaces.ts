// ExhibitI остается без изменений, так как мы все равно используем информацию о выставке

export interface ExhibitI {
  id: number;
  imageUrl: string;
  description: string;
  user: UserI;
  commentCount: number;
  createdAt: string;
}

// Изменим интерфейс для комментариев (оставим только нужные поля)
export interface Comment {
  id: number;
  text: string;
  user: UserI;
}

// Обновляем интерфейс для CommentStripeProps
export interface CommentStripeProps {
  exhibitId: number;
  expanded: boolean;
  userId: number;
}

// Убираем ненужный интерфейс UserProfileResponse, так как мы теперь получаем только данные о пользователе в формате UserI
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

// И другие интерфейсы без изменений
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

// API response types
export interface AddCommentResponse {
  id: number;
  text: string;
  user: UserI;
}

export interface FetchCommentsResponse {
  comments: Comment[];
}

export interface AuthResponse {
  access_token: string;
}

export interface UserProfileResponse {
  user: UserI;
}

export interface ExhibitsResponse {
  data: ExhibitI[];
  lastPage: number;
}

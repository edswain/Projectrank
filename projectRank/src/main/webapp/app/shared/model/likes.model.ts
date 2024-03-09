import { IPost } from 'app/shared/model/post.model';
import { IUser } from 'app/shared/model/user.model';

export interface ILikes {
  id?: number;
  postliked?: IPost | null;
  likedby?: IUser | null;
}

export const defaultValue: Readonly<ILikes> = {};

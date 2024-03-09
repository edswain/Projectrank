import { IUser } from 'app/shared/model/user.model';
import { ILikes } from 'app/shared/model/likes.model';

export interface IPost {
  id?: number;
  postTitle?: string | null;
  postLikes?: number | null;
  eloRating?: number | null;
  image1ContentType?: string | null;
  image1?: string | null;
  image2ContentType?: string | null;
  image2?: string | null;
  postDesc?: string | null;
  createdby?: IUser | null;
  likes?: ILikes[] | null;
}

export const defaultValue: Readonly<IPost> = {};

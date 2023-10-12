import { IShortUser } from './IUser';

export interface IAddCommentRequest {
  recipeId: number;
  authorId: number;
  description: string;
}

export interface IComment {
  id: number;
  creationDate: Date;
  description: string;
  author: IShortUser;
}

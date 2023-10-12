import { UserRoles } from '../utils/constants';

export interface IUser {
  id: number;
  username: string;
  role: UserRoles;
  mail: string;
  creationDate: Date;
  avatarURL: string;
  //   comments: string[];
  favouritesRecipesId: number[];
}

export interface IShortUser {
  id: number;
  username: string;
  avatarUrl: string;
}

export interface IRequestAuthenticateUser {
  username: string;
  password: string;
}

export interface ErrorObject {
  error: string;
}

export type AuthenticationResponseType =
  | number
  // | ErrorObject
  | string
  | undefined;

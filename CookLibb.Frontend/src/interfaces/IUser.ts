export interface IUser {
  username: string;
  role: string;
  mail: string;
  creationDate: Date;
  //   comments: string[];
  // favourites: string[];
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
  | ErrorObject
  | string
  | undefined;

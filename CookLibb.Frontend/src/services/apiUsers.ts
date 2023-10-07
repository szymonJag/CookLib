import { ErrorObject, IRequestAuthenticateUser } from '../interfaces/IUser';
import { API_URL } from '../utils/constants';

const API_URL_USERS = `${API_URL}/Users`;

export async function registerUser(user: IRequestAuthenticateUser) {
  try {
    const url = `${API_URL_USERS}/register`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await handleResponse(response);

    return data.data.id;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      const errObj: ErrorObject = { error: err.message };
      console.log(errObj);
      return errObj;
    } else {
      // Handle other types of errors if necessary
      console.error('An unknown error occurred');
      return { error: 'An unknown error occurred' };
    }
  }
}

export async function loginUser(user: IRequestAuthenticateUser) {
  try {
    const url = `${API_URL_USERS}/authenticate`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await handleResponse(response);

    return data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      const errObj: ErrorObject = { error: err.message };
      console.log(errObj);
      return errObj;
    } else {
      // Handle other types of errors if necessary
      console.error('An unknown error occurred');
      return { error: 'An unknown error occurred' };
    }
  }
}

export async function getUserById(id: number) {
  try {
    const url = `${API_URL_USERS}/getById/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await handleResponse(response);

    return data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      const errObj: ErrorObject = { error: err.message };
      console.log(errObj);
      return errObj;
    } else {
      console.error('An unknown error occurred');
      return { error: 'An unknown error occurred' };
    }
  }
}

async function handleResponse(response: Response) {
  const data = await response.json();

  if (response.status !== 200) {
    let errorMessage = 'An error occurred';

    if (Array.isArray(data) && data[0]?.property) {
      errorMessage = data[0].errors[0].errorMessage;
    } else if (data.error) {
      errorMessage = data.error;
    }

    throw new Error(errorMessage);
  }

  return data;
}

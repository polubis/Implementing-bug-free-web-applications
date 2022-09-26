import { Signal } from "libs/development-kit";

interface ResponseObject {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface AuthorizedUser {
  id: string;
  name: string;
  email: string;
}

export const AuthService = {
  authorize: async (signal: Signal) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
      {
        signal,
      }
    );

    if (response.status < 200 || response.status >= 400) {
      return Promise.reject(new Error("Error"));
    }

    const user = (await response.json()) as ResponseObject;

    return {
      id: user.id.toString(),
      name: user.username,
      email: user.email,
    } as AuthorizedUser;
  },
};

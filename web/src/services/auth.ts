interface Response {
  token: string;
  user: {
    email: string;
    password: string;
  };
}

/* export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'proffy',
        user: {
          email: 'thiago.fidelis@gmail.com',
          password: '123456',
        },
      });
    }, 2000);
  });
} */

export function signIn(email: string, password: string): Response {
  return {
    token: password + email, // that will be change ofc
    user: {
      email,
      password,
    },
  };
}

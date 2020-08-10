export function signIn(email: string, password:string,){

  return ({
              token: password+email,
              user: {
                  email: email,
                  password: password,
              },
          });
}

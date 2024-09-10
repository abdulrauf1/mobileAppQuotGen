import { setItem, getItem, removeItem } from "./AsyncStorage";

// Sign In
export async function signIn(email:any, password:any) {
    try {
      if(email === 'ali@gmail.com' && password === '1234')
      {
        let userData = {email: email, password: password};
        try {
          const session = await setItem('user', userData);
          return session;
        } catch (error:any) {
          throw new Error(error);
        } 
        
      }
        
    } catch (error:any) {
      throw new Error(error);
    }
}

  // Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getItem('user');
    if (!currentAccount) throw Error;


    return currentAccount.email;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
      const session = await removeItem('user');
      return true;
    } catch (error:any) {
      throw new Error(error);
    } 
}


import { signInWithEmailAndPassword,getAuth, updateProfile, signInWithPopup,signOut, GoogleAuthProvider,onAuthStateChanged,createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import initializeAunthtication from "../../Pages/Login/Firebase/Firebaseinit";



initializeAunthtication();

const useFirebase = () =>{
    const [user,setuser] = useState({});
    const [error,seteror] = useState({});
     const [isLoading,setisLoading] = useState(true);

    
    const auth = getAuth();
   
     const signInUsingGoogle = () =>{
         setisLoading(true);
        const googleprovider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleprovider);

    
     }
     //observe user state change
     useEffect(()=>{
       const unsubscribed = onAuthStateChanged(auth, user =>{
        if (user) {
            setuser(user);
          }else{
              setuser({});
          }
          setisLoading(false);
       });
       return () => unsubscribed;
     },[]);

     const logout = () =>{
      setisLoading(true);
        signOut(auth)
        .then( () => {
            
          })
          .finally(() => setisLoading(false));
     }

     const newAccount = (email, password, name) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          setuser(user);
          setUserName(name);
          seteror('');
          console.log(user)
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage)
        });
    };

    const setUserName = (name) => {
      updateProfile(auth.currentUser, { displayName: name })
      .then(() => {})
      .catch(() => {});
    }

    const newUserLogin = (email, password) => {
      console.log('this is form newUserLogin');
       return signInWithEmailAndPassword(auth, email, password)
      
    }

    return{
        user, 
        signInUsingGoogle,
        logout,
        isLoading,
        setisLoading,
        newAccount,
        newUserLogin,
        setuser
    }
}

export default useFirebase;
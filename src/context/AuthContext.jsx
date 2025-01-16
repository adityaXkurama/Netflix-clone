import {useContext,createContext,useState,useEffect} from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth,db } from '../firebase'
import { setDoc,doc } from 'firebase/firestore'

const AuthContext = createContext()

export function AuthContextProvider({children}){

    const [user,setUser] = useState({})

    async function signUp(email,password){
        await createUserWithEmailAndPassword(auth,email,password);
         setDoc(doc(db, 'users', email), {
            savedShows: []
         })
    }

    async function logOut(){
        return await signOut(auth);
    }

    async function logIn(email,password){
        return await signInWithEmailAndPassword(auth,email,password);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
        })
        return ()=>{
            unsubscribe();
        }
    })

    return (
        <AuthContext.Provider value={{signUp,logIn,logOut,user}}>
            {children}
        </AuthContext.Provider>
    );
}

 export function UserAuth(){
    return useContext(AuthContext);
}
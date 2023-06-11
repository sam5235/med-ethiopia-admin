import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

const AuthContext = createContext({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (email, pass) => signInWithEmailAndPassword(auth, email, pass);

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscrive = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef)
          .then((snap) => {
            const data = snap.data();
            console.log({ data });
            if (data.role === "admin") {
              console.log("success");
              setUser(user);
            } else {
              console.log("error");
              logout();
            }
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      } else {
        setIsLoading(false);
        setUser(null);
      }
    });

    return () => unsubscrive();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

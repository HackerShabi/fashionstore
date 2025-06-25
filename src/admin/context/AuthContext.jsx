import React, { createContext, useState, useContext, useEffect } from 'react';
import app from '../../firebase';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Initialize Firebase Auth
const auth = getAuth(app);
const db = getFirestore(app);

// Create auth context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get additional user details from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
          } else {
            // If user document doesn't exist, create one
            const userData = {
              email: user.email,
              name: user.displayName || 'User',
              role: 'customer', // Default role
              createdAt: new Date().toISOString()
            };
            await setDoc(doc(db, 'users', user.uid), userData);
            setUserDetails(userData);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        setUserDetails(null);
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError('');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if the user is an admin
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        return userCredential.user;
      } else {
        // If not admin, sign out and reject
        await signOut(auth);
        setError('Access denied. Admin privileges required.');
        throw new Error('Access denied. Admin privileges required.');
      }
    } catch (error) {
      let errorMessage = 'Failed to login';
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed login attempts. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Register function (for creating admin users)
  const register = async (email, password, name) => {
    try {
      setError('');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      // Create user document in Firestore with admin role
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        name,
        role: 'admin',
        createdAt: new Date().toISOString()
      });
      
      return userCredential.user;
    } catch (error) {
      let errorMessage = 'Failed to register';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Logout function
  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    userDetails,
    login,
    logout,
    register,
    error,
    setError,
    isAdmin: userDetails?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Check for token in localStorage on initial render
    const token = localStorage.getItem('accessToken');
    return token ? { token } : null;
  });

  useEffect(() => {
    // Listen for changes in localStorage (e.g., if logged out from a different tab)
    const handleStorageChange = () => {
      const token = localStorage.getItem('accessToken');
      setCurrentUser(token ? { token } : null);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    setCurrentUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import React from 'react';
const AuthContext = React.createContext({
    isLoggedIn : false,
});
//It creates context object.
export default AuthContext;
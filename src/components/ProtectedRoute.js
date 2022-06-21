import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// =====>
function ProtectedRoute({ children, ...props }) {
    return(
        <Route {...props}>
            {
                props.loggedIn
                ? children
                : <Navigate to='/signin' />
            }
        </Route>
    )
}
// <=====

export default ProtectedRoute;
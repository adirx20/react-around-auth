import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

// =====>
function ProtectedRoute({ children, loggedIn, ...props }) {
    return(
        <Route {...props}>
            {
                loggedIn
                ? <Outlet />
                : <Navigate to='/signin' />
            }
        </Route>
    )
}
// <=====

export default ProtectedRoute;
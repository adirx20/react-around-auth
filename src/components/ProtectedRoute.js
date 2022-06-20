import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// =====>
function ProtectedRoute({ children, ...props }) {
    return(
        <Route {...props}>
            {
                props.loggedIn
                ? children
                : <Redirect to='/signin' />
            }
        </Route>
    )
}
// <=====

export default ProtectedRoute;
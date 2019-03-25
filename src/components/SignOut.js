import React from 'react';
import {withRouter} from 'react-router-dom';
import {auth} from '../firebase/index';

const SignOutButton = (props) => {
    var roles = props.role;
    console.log('role in sign out is ',roles)
    if (roles) {
        Object.keys(roles).map(key => {
                console.log('value is .', roles[key])
            }
        );
        return (
            <div>
                <h2>  {props.email}</h2>
                {Object.keys(roles).map(key =>
                    <div key={key}>
                        <h3>{key} : {roles[key].toString()}</h3>
                    </div>
                )}


                <button
                    type="button"
                    onClick={auth.doSignOut}
                >
                    Sign Out
                </button>
            </div>

        )
    }else{
        return(
            <div>
                <h2>No roles</h2>


                <button
                    type="button"
                    onClick={auth.doSignOut}
                >
                    Sign Out
                </button></div>
        )
    }


}

export default withRouter(SignOutButton);
// export default SignOutButton;
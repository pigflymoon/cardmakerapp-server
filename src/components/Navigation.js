import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = (props, {authUser}) => {//默认第一个参数是props
    console.log('Navigation auth user userrole is?????????, ', authUser)
    if (authUser) {

        return (//这里的传的props会在一个大的对象里 role and email
            <div>
                { authUser.user
                    ? <NavigationAuth role={authUser.role} email={authUser.user.email}/>
                    : <NavigationNonAuth />
                }
            </div>
        )
    }

}


Navigation.contextTypes = {
    authUser: PropTypes.object,
};

const NavigationAuth = (userAndrole) => {
    return (
        <ul>
            <li><Link to={routes.UPLOADHOLIDAYINVITATIONSTEMPLATES}>Upload Templates for invitations</Link></li>

            <li><Link to={routes.UPLOADHOLIDAYCARDS}>Upload images for Cards</Link></li>
            <li><Link to={routes.UPLOADHOLIDAYINVITATIONS}>Upload images for Invitations</Link></li>
            <li><Link to={routes.UPLOADGALLERY}>Upload images for Sample Gallery</Link></li>

            <li><Link to={routes.DELETEHOLIDAYCARDS}>Delete images from Cards list</Link></li>
            <li><Link to={routes.DELETEHOLIDAYINVITATIONS}>Delete images from Invitations list</Link></li>


            <li><Link to={routes.ACCOUNT}>Account</Link></li>
            <li><SignOutButton email={userAndrole.email} role={userAndrole.role}/></li>
        </ul>
    )
    console.log('userAndrole is ', userAndrole, 'userAndrole.email', userAndrole.email)
}


const NavigationNonAuth = () => {
    console.log('Non Auth called')
    return (
        <ul>
            <li><Link to={routes.LANDING}>Welcome</Link></li>
            <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
        </ul>
    )
}


export default Navigation;
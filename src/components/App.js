import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from './Navigation';

import UploadHolidayInvitationsTemplatesPage from '../screens/upload/invitationsTemplates/UploadHolidayInvitationsTemplatesPage';

import UploadHolidayCardsPage from '../screens/upload/cards/UploadHolidayCardsPage';
import UploadBirthdayCardsPage from '../screens/upload/cards/UploadBirthdayCardsPage';
import UploadThankYouCardsPage from '../screens/upload/cards/UploadThankYouCardsPage';

//Occasions
import UploadOccasionsCardsPage from '../screens/upload/cards/UploadOccasionsCardsPage';

//Congratulations
import UploadCongratulationsCardsPage from '../screens/upload/cards/UploadCongratulationsCardsPage';
//Thoughts and Feelings
import UploadThoughtsFeelingsCardsPage from '../screens/upload/cards/UploadThoughtsFeelingsCardsPage';

import UploadHolidayInvitationsPage from '../screens/upload/invitations/UploadHolidayInvitationsPage';
import UploadBirthdayInvitationsPage from '../screens/upload/invitations/UploadBirthdayInvitationsPage';
import UploadWeddingInvitationsPage from '../screens/upload/invitations/UploadWeddingInvitationsPage';
//Party invitations
import UploadPartyInvitationsPage from '../screens/upload/invitations/UploadPartyInvitationsPage';
import UploadAnnouncementInvitationsPage from '../screens/upload/invitations/UploadAnnouncementInvitationsPage';
//Sample for Gallery
import UploadGalleryPage from '../screens/upload/gallery/UploadGalleryPage';
//Delete cards
import DeleteHolidayCardsPage from '../screens/delete/cards/DeleteHolidayCardsPage';
import DeleteBirthdayCardsPage from '../screens/delete/cards/DeleteBirthdayCardsPage';
import DeleteThankYouCardsPage from '../screens/delete/cards/DeleteThankYouCardsPage';
import DeleteOccasionsCardsPage from '../screens/delete/cards/DeleteOccasionsCardsPage';
import DeleteCongratulationsCardsPage from '../screens/delete/cards/DeleteCongratulationsCardsPage';
import DeleteThoughtsFeelingsCardsPage from '../screens/delete/cards/DeleteThoughtsFeelingsCardsPage';
//Delete invitations
import DeleteHolidayInvitationsPage from '../screens/delete/invitations/DeleteHolidayInvitationsPage';
import DeleteBirthdayInvitationsPage from '../screens/delete/invitations/DeleteBirthdayInvitationsPage';
import DeleteWeddingInvitationsPage from '../screens/delete/invitations/DeleteWeddingInvitationsPage';
import DeleteAnnouncementInvitationsPage from '../screens/delete/invitations/DeleteAnnouncementInvitationsPage';
import DeletePartyInvitationsPage from '../screens/delete/invitations/DeletePartyInvitationsPage';

import SignUpPage from '../screens/SignUp';
import SignInPage from '../screens/SignIn';
import PasswordForgetPage from '../components/PasswordForget';
import AccountPage from '../screens/Account';
// import ImagesListPage from '../screens/DeleteImages';

// import AllImagesPage from '../screens/AllImagesPage';
import withAuthentication from './withAuthentication';
import * as routes from '../constants/routes';

const App = () =>
    <Router>
        <div>
            <Navigation />

            <hr/>

            <Route exact path={routes.UPLOADHOLIDAYINVITATIONSTEMPLATES} component={() => <UploadHolidayInvitationsTemplatesPage/>}/>

            <Route exact path={routes.UPLOADHOLIDAYCARDS} component={() => <UploadHolidayCardsPage />}/>
            <Route exact path={routes.UPLOADBIRTHDAYCARDS} component={() => <UploadBirthdayCardsPage />}/>
            <Route exact path={routes.UPLOADTHANKYOUCARDS} component={() => <UploadThankYouCardsPage/>}/>

            <Route exact path={routes.UPLOADOCCASIONSCARDS} component={() => <UploadOccasionsCardsPage/>}/>

            <Route exact path={routes.UPLOADCONGRATULATIONSCARDS} component={() => <UploadCongratulationsCardsPage/>}/>

            <Route exact path={routes.UPLOADTHOUGHTSFEELINGS} component={() => <UploadThoughtsFeelingsCardsPage/>}/>


            <Route exact path={routes.UPLOADHOLIDAYINVITATIONS} component={() => <UploadHolidayInvitationsPage/>}/>
            <Route exact path={routes.UPLOADBIRTHDAYINVITATIONS} component={() => <UploadBirthdayInvitationsPage/>}/>
            <Route exact path={routes.UPLOADWEDDINGINVITATIONS} component={() => <UploadWeddingInvitationsPage/>}/>
            <Route exact path={routes.UPLOADPARTYINVITATIONS} component={() => <UploadPartyInvitationsPage/>}/>
            <Route exact path={routes.UPLOADANNOUNCEMENTINVITATIONS}
                   component={() => <UploadAnnouncementInvitationsPage/>}/>
            <Route exact path={routes.UPLOADGALLERY}
                   component={() => <UploadGalleryPage/>}/>


            <Route exact path={routes.DELETEHOLIDAYCARDS} component={() => <DeleteHolidayCardsPage />}/>
            <Route exact path={routes.DELETEBIRTHDAYCARDS} component={() => <DeleteBirthdayCardsPage />}/>
            <Route exact path={routes.DELETETHANKYOUCARDS} component={() => <DeleteThankYouCardsPage />}/>
            <Route exact path={routes.DELETEOCCASIONSCARDS} component={() => <DeleteOccasionsCardsPage />}/>
            <Route exact path={routes.DELETECONGRATULATIONSCARDS} component={() => <DeleteCongratulationsCardsPage />}/>
            <Route exact path={routes.DELETETHOUGHTSFEELINGS} component={() => <DeleteThoughtsFeelingsCardsPage />}/>

            <Route exact path={routes.DELETEHOLIDAYINVITATIONS} component={() => <DeleteHolidayInvitationsPage />}/>
            <Route exact path={routes.DELETEBIRTHDAYINVITATIONS} component={() => <DeleteBirthdayInvitationsPage />}/>
            <Route exact path={routes.DELETEWEDDINGINVITATIONS} component={() => <DeleteWeddingInvitationsPage />}/>
            <Route exact path={routes.DELETEANNOUNCEMENTINVITATIONS} component={() => <DeleteAnnouncementInvitationsPage />}/>
            <Route exact path={routes.DELETEPARTYINVITATIONS} component={() => <DeletePartyInvitationsPage />}/>


            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />}/>
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />}/>
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />}/>
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage />}/>
        </div>
    </Router>

export default withAuthentication(App);
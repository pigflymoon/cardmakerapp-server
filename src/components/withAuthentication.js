import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firebase} from '../firebase';


const withAuthentication = (AuthComponent) => {
    class WithAuthentication extends Component {
        constructor(props) {
            super(props);
            this.state = {
                user: null,
                role: null,
            }
        }

        getChildContext() {
            console.log('get child context,', this.state)
            return {//authUser相当于全局的state
                authUser: {
                    user: this.state.user,
                    role: this.state.role,
                }

            }
        }

        componentDidMount() {
            console.log('Sign out called???')
            var self = this;
            firebase.auth.onAuthStateChanged(authUser => {
                console.log('auth user in authentication is :', authUser)
                if (authUser) {
                    var userId = firebase.auth.currentUser.uid;
                    console.log('current userid,', userId);
                    if (userId) {
                        firebase.db.ref('/users/' + userId).once('value').then(function (snapshot) {
                            var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
                            var userrole = (snapshot.val() && snapshot.val().role) || 'free_user';
                            console.log('username is: ', username, 'role is: ', userrole)
                            // self.setState(() => ({authUser, userrole: userrole}));
                            console.log('auth user in authentication user id exist is :', authUser)
                            authUser
                                ? self.setState(() => ({user: authUser, role: userrole}))
                                : self.setState(() => ({
                                    authUser: {
                                        user: null,
                                        role: null

                                    }
                                }));

                        });
                    }
                } else {
                    console.log('****************authUser is:', authUser);
                    self.setState(() => ({user: authUser, role: null}));
                    // self.setState(() => ({authUser, userrole: null}));//
                }


            })
        }

        render() {
            return (
                <AuthComponent/>
            )
        }
    }

    WithAuthentication.childContextTypes = {
        authUser: PropTypes.object,
        role: PropTypes.object,
    };

    return WithAuthentication;
}

export default withAuthentication;
import React, {Component} from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';

import Hidden from '@material-ui/core/Hidden';

import withAuthorization from '../../../components/withAuthorization';
import withRoot from '../../../components/withRoot';

import SimpleSnackbar from '../../../widgets/snackBar';
import AlertDialog from '../../../widgets/alert'
import {uploadInvitationsListItems} from '../../../components/UploadSidebar';
import {uploadStyles} from '../../../styles/uploadPage';
import UploadPanel from '../../../components/UploadPanel';


class UploadWeddingInvitationsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploading: false,
            open: false,
            activeTabIndex: 0,
            imageCategory: 'invitations',
            activeTab: 'invitation',
            mobileOpen: false,
        };
    }

    handleChange = (event, value) => {
        this.setState({open: false});

        let tabs = ["invitation", "saveTheDate", "rsvp"];
        for (let tab of tabs) {
            let tabValue = tabs[value];
            if (tab == tabValue) {
                console.log('tab is ', tab)
                this.setState({activeTabIndex: value, activeTab: tab})
            }

        }
        // this.setState({activeTabIndex: value});
    };

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };
    handleUploadStatus = (status) => {
        this.setState({open: status.open, uploading: status.uploading, error: status.error});
    }

    render() {
        const {classes} = this.props;
        // const {anchor} = this.state;
        console.log('props is ', this.props)
        const drawer = (
            <div>
                <div className={classes.toolbar}/>
                <Divider />
                <List>{uploadInvitationsListItems}</List>
            </div>
        );


        return (
            <div className={classes.root}>

                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, classes[`appBar-left`])}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" noWrap>
                                Upload images of Wedding Invitations for {this.state.activeTab}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Hidden mdUp>
                        <Drawer
                            variant="temporary"
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            variant="permanent"
                            open
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <main className={classes.content}>
                        <SimpleSnackbar show={this.state.uploading}/>
                        <AlertDialog open={this.state.open} error={this.state.error}/>
                        <Paper>
                            <Tabs
                                value={this.state.activeTabIndex}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={this.handleChange}
                            >
                                <Tab label="Invitations"/>
                                <Tab label="Save The Date"/>
                                <Tab label="RSVP"/>
                            </Tabs>

                        </Paper>
                        <UploadPanel classes={classes} imageCategory={this.state.imageCategory}
                                     activeTabIndex={this.state.activeTabIndex} activeTab={this.state.activeTab}

                                     onHandleUploadStatus={this.handleUploadStatus}
                        />
                    </main>
                </div>
            </div>
        );


    }
}


const authCondition = (authUser) => !!authUser;


UploadWeddingInvitationsPage = withRoot(withStyles(uploadStyles)(UploadWeddingInvitationsPage));
export default withAuthorization(authCondition)(UploadWeddingInvitationsPage);

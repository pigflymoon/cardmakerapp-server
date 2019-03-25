import React, {Component} from 'react';
// import {db, storage} from '../firebase';
import {db} from '../firebase/firebase';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';


import ImagesList from '../components/ImageList';

export default class DeletePanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploading: false,

            // showUpload: false,
            open: false,
            activeTabIndex: this.props.activeTabIndex,
            imageCategory: this.props.imageCategory,
            activeTab: this.props.activeTab,
            // mobileOpen: false,
            choseFiles: null,
            uploadStatus: 'Please choose file to delete',
        };

    }

    componentWillReceiveProps(nextProps) {
        var self = this;
        if (this.state.activeTab !== nextProps.activeTab) {
            this.setState({
                cardsData: [],
                uploadStatus: 'Please choose file to delete',
            });
        }
        console.log('###########next props###########,', nextProps.imageCategory, nextProps.activeTab)

        this.setState({
            imageCategory: nextProps.imageCategory,
            activeTab: nextProps.activeTab,
            activeTabIndex: nextProps.activeTabIndex
        }, () => {
            self.fetchImages(this.state.imageCategory, this.state.activeTab).then(function (results) {
                self.setState({
                    cardsData: results
                });
            }).catch(function (error) {
                console.log('error')
            });
        });

    }

    getImages = (category = 'cards', imageType = 'christmas') => {
        var self = this;
        return new Promise(function (resolve, reject) {
            // some async operation here
            setTimeout(function () {
                // resolve the promise with some value
                return db.ref().child(`${category}/${imageType}`).once("value", function (snapshot) {
                    console.log('snap shot is ', snapshot)
                    resolve(snapshot.val())

                });


            }, 500);
        });
    }
    fetchImages = (category, cardType) => {
        console.log('fetch is called!!!!!!!')
        var self = this;
        return new Promise(function (resolve, reject) {
            // some async operation here
            setTimeout(function () {
                // resolve the promise with some value
                self.getImages(category, cardType).then(function (images) {
                    console.log('images is called!!!!!!!', images)
                    resolve(images)
                    // self.setState({[cardType]: images});

                });


            }, 500);
        });
    }

    componentDidMount() {
        console.log('Home is mounted!!!!!!!!!!')
        var self = this;
        //
        this.fetchImages(this.state.imageCategory, this.state.activeTab).then(function (results) {
            self.setState({
                cardsData: results
            });
        }).catch(function (error) {
            console.log('error')
        });


    }

    render() {
        const {classes} = this.props;
        console.log('props is ', this.props)
        const {cardsData} = this.state;

        return (
            <Paper className={classes.paperContainer}>
                <div className="content">
                    Content for the tab: {this.state.activeTabIndex}
                    --{this.state.activeTab}
                </div>
                {cardsData ?

                    <ImagesList category={this.state.imageCategory} type={this.state.activeTab} images={cardsData}
                                classes={classes}/> : <h2>No Images:</h2>}


                {this.state.uploading ? <CircularProgress className={classes.progress}/>
                    : <Typography>{this.state.uploadStatus}</Typography>}

            </Paper>
        );


    }
}





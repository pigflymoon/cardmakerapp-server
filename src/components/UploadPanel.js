import React, {Component} from 'react';
import {db, storage} from '../firebase';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FileUpload from '@material-ui/icons/AttachFile';
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

import {saveImage} from '../utils/firebaseImageApi';


export default class UploadPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploading: false,
            imagePreviewUrls: [],
            open: false,
            activeTabIndex: this.props.activeTabIndex,
            imageCategory: this.props.imageCategory,
            activeTab: this.props.activeTab,
            choseFiles: null,
            uploadStatus: 'Please choose file to upload',
        };

    }

    componentWillReceiveProps(nextProps) {
        if (this.state.activeTab !== nextProps.activeTab) {
            this.setState({
                imagePreviewUrls: [],
                uploadStatus: 'Please choose file to upload',
            });
        }
        this.setState({
            // imagePreviewUrls: [],
            // uploadStatus: 'Please choose file to upload',
            imageCategory: nextProps.imageCategory,
            activeTab: nextProps.activeTab,
            activeTabIndex: nextProps.activeTabIndex
        });

    }

    handleAddImage = (e, imageType) => {
        e.preventDefault();
        var uploadImageType = imageType;
        console.log('imageType is for ', uploadImageType);
        var choseFiles = e.target.files;

        var files = [], imagePreviewUrls = [];
        for (var file of choseFiles) {
            files.push(file);
            let reader = new FileReader();
            reader.onloadend = () => {
                imagePreviewUrls.push(reader.result)
                this.setState({
                    file: file,
                });
            }
            reader.readAsDataURL(file)
        }

        this.setState({choseFiles: files, imagePreviewUrls: imagePreviewUrls});
        e.target.value = '';
    }

    handleUnChoose = data => () => {
        const filesData = [...this.state.choseFiles];
        const imagesData = [...this.state.imagePreviewUrls];

        const fileToDelete = filesData.indexOf(data);

        filesData.splice(fileToDelete, 1);
        imagesData.splice(fileToDelete, 1);
        this.setState({choseFiles: filesData, imagePreviewUrls: imagesData});
    }

    handleUpload = (e, category, imageType) => {
        console.log('category is :',category);
        console.log('imageType is :',imageType);

        e.preventDefault();
        console.log('choseFiles length', this.state.choseFiles)
        if (!(this.state.choseFiles) || this.state.choseFiles.length < 1) {
            this.setState({uploading: false, choseFiles: []});
            // this.props.onHandleDialog(true);
            this.props.onHandleUploadStatus({open: true, uploading: false, error: 'Please choose file'});

        } else {
            this.setState({uploading: true});
            this.props.onHandleUploadStatus({open: false, uploading: true, error: false});

            this.filesUpload(this.state.choseFiles, category, imageType);
        }


    }

    getDownloadUrl = (uploadImagesRef, dbUpdatedImagesRef, snapshot) => {//db,
        if (snapshot.downloadURL !== null) {
            var downloadUrl = snapshot.downloadURL;
            var newImageKey = uploadImagesRef.push().key;
            var saveFilename = snapshot.metadata.name;

            dbUpdatedImagesRef.once('value').then((snapshot) => {
                var updatedChildrenTotal = snapshot.numChildren();
                console.log('upcated children are :', updatedChildrenTotal);
                if (updatedChildrenTotal <= 9) {
                    uploadImagesRef.child(newImageKey + '_image').set({
                        downloadUrl: downloadUrl,
                        name: saveFilename
                    });
                    dbUpdatedImagesRef.child(newImageKey + '_image').set({
                        downloadUrl: downloadUrl,
                        name: saveFilename
                    });
                } else {
                    uploadImagesRef.child(newImageKey + '_image').set({
                        downloadUrl: downloadUrl,
                        name: saveFilename
                    });
                    var query = dbUpdatedImagesRef.orderByKey().limitToFirst(1);
                    query.once("value")
                        .then(function (snapshot) {
                            if (snapshot.val()) {
                                var key = Object.keys(snapshot.val())[0];
                                console.log('key is :', key,'saved in database');

                                dbUpdatedImagesRef.child(key).remove().then(function () {
                                    dbUpdatedImagesRef.child(newImageKey + '_image').set({
                                        downloadUrl: downloadUrl,
                                        name: saveFilename
                                    });
                                }).catch(function (error) {
                                    console.log("Remove failed: " + error.message)
                                });
                            }
                        });
                }

            });



        } else {
            this.setState({uploading: false, uploadStatus: 'Download url is not ready!'});
        }
    }

    fileUpload = (file, imagesRef, uploadImagesRef, dbUpdatedImagesRef) => {//file,storage,db
        var filename = (file.name).match(/^.*?([^\\/.]*)[^\\/]*$/)[1];

        var task = saveImage(file, filename, imagesRef)
        var self = this;

        console.log('dbUpdatedImagesRef is :',dbUpdatedImagesRef);
        task.then(function (snapshot) {
            console.log('snapshot is ', snapshot)
            self.getDownloadUrl(uploadImagesRef, dbUpdatedImagesRef, snapshot);//category-type-db, updated-db

        })
            .then(function () {
                self.setState({
                    uploading: false,
                    uploadStatus: 'Upload is Finished! And save to the database ',
                    choseFiles: []
                });
                self.props.onHandleUploadStatus({open: true, uploading: false, error: false});

            })
            .catch(function (error) {
                console.error('error is', error);
                self.setState({uploading: false, choseFiles: []});
                self.props.onHandleUploadStatus({open: true, uploading: false, error: 'error'});


            });
    }

    filesUpload = (files, category, imageType) => {
        var imagesRef = storage.getImagesByCategoryAndType(category, imageType);
        var uploadImagesRef = db.getImagesRefByTCategoryAndType(category, imageType);
        var dbUpdatedImagesRef = db.getUpdatedImagesRefByTCategoryAndType(category);


        if (files) {
            for (let file of files) {
                this.fileUpload(file, imagesRef, uploadImagesRef, dbUpdatedImagesRef);//every file
            }
        } else {
            console.log('no file')
        }
    }


    render() {
        const {classes} = this.props;
        const {
            activeTabIndex,
            activeTab,
            imageCategory,
            choseFiles,
            imagePreviewUrls,
            uploading,
            uploadStatus
        } = this.state;
        console.log('imageCategory is :',imageCategory,'activeTab is :',activeTab);
        let tabButtonName = activeTab.replace(/([a-z])([A-Z])/g, '$1 $2');

        return (
            <Paper className={classes.paperContainer}>
                <div className="content">
                    Content for the tab: {activeTabIndex}
                    --{activeTab}
                </div>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={(e) => this.handleAddImage(e, activeTab)}
                />
                <label htmlFor="raised-button-file">
                    <Button component="span" className={classes.button} color="default">
                        Choose Image for {tabButtonName}
                        <AddToPhotos className={classes.rightIcon}/>
                    </Button>
                </label>
                <label htmlFor="raised-button-file">
                    <Button type="submit"
                            onClick={(e) => this.handleUpload(e, imageCategory, activeTab)}
                            className={classes.button}
                            color="default">
                        Upload for {tabButtonName}
                        <FileUpload className={classes.rightIcon}/>
                    </Button>
                </label>
                <div className={classes.filesWrapper}>
                    {choseFiles ? choseFiles.map((file, index) => {
                            return (
                                <Chip
                                    label={file.name}
                                    className={classes.file}
                                    key={index}
                                    onDelete={ this.handleUnChoose(file)}

                                />
                            )
                        }) : null}
                </div>

                <div className="imgPreview">

                    {imagePreviewUrls ? imagePreviewUrls.map((image, index) => {
                            return (
                                <div key={index}><img src={image} width={50}/></div>
                            )
                        }) : null}
                </div>


                {uploading ? <CircularProgress className={classes.progress}/>
                    : <Typography>{uploadStatus}</Typography>}

            </Paper>
        );


    }
}





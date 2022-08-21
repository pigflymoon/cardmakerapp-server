import React, {Component} from 'react';
import classNames from 'classnames';

import {db, storage} from '../firebase';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FileUpload from '@material-ui/icons/AttachFile';
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {saveImage} from '../utils/firebaseImageApi';

const defaultText = [
    {
        value: 'Invite you to celebrate the marriage of their children ',
        label: 'Invite you to celebrate the marriage of their children',
    },
    {
        value: 'invite you to share in their joy',
        label: 'invite you to share in their joy',
    },
    {
        value: 'Request the pleasure of your company',
        label: 'Request the pleasure of your company',
    },
];
const xRanges = [
    {
        value: '100',
        label: '100',
    },
    {
        value: '200',
        label: '200',
    },
    {
        value: '300',
        label: '300',
    },
];
const yRanges = [
    {
        value: '100',
        label: '100',
    },
    {
        value: '200',
        label: '200',
    },
    {
        value: '300',
        label: '300',
    },
];

export default class UploadTemplatePanel extends Component {
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
            positionX: "",
            positionY: "",
            defaultText1:"Invite you to ...",
            //
            amount: '',
            password: '',
            weight: '',
            weightRange: '',
            showPassword: false,

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

    handleChange = prop => event => {
        console.log('props is ', prop, 'event.target.value  is ', event.target.value)
        this.setState({[prop]: event.target.value});
    };
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
        console.log('category is :', category);
        console.log('imageType is :', imageType);

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
                                console.log('key is :', key, 'saved in database');

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

        console.log('dbUpdatedImagesRef is :', dbUpdatedImagesRef);
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
        var imagesRef = storage.getStorageImagesRefByCategoryAndType(category, imageType);
        var uploadImagesRef = db.getDbImagesRefByTCategoryAndType(category, imageType);
        var dbUpdatedImagesRef = db.getDbUpdatedImagesRefByCategoryAndType(category);


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
        console.log('imageCategory is :', imageCategory, 'activeTab is :', activeTab);
        let tabButtonName = activeTab.replace(/([a-z])([A-Z])/g, '$1 $2');

        return (
            <Paper className={classes.paperContainer}>
                <div className="content">
                    Content for the tab: {activeTabIndex}
                    --{activeTab}
                </div>

                <div className={classes.container}>
                    <Chip label=" Editor Text styles" className={classes.margin} />
                    <TextField
                        id="outlined-simple-start-adornment"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Text Color"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">#</InputAdornment>,
                        }}
                    />

                    <TextField
                        select
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Background Color"
                        value={this.state.backgroundColor}
                        onChange={this.handleChange('BackgroundColor')}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">#</InputAdornment>,
                        }}
                    >
                        {xRanges.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-adornment-amount"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Font Name"
                        value={this.state.fontName}
                        onChange={this.handleChange('fontName')}
                    />

                    <TextField
                        id="outlined-adornment-weight"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Font Size"
                        value={this.state.fontSize}
                        onChange={this.handleChange('fontSize')}
                        helperText="Weight"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">px</InputAdornment>,
                        }}
                    />

                    <TextField
                        id="outlined-adornment-password"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Text Align"
                        value={this.state.textAlign}
                        onChange={this.handleChange('textAlign')}
                    />
                </div>
                <div className={classes.container}>
                    <Chip label=" Text Positions" className={classes.margin} />
                    <TextField
                        select
                        id="outlined-simple-start-adornment"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        label="position X"
                        value={this.state.positionX}
                        onChange={this.handleChange('positionX')}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">px</InputAdornment>,
                        }}
                    >
                        {xRanges.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        id="outlined-simple-start-adornment"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        label="position Y"
                        value={this.state.positionX}
                        onChange={this.handleChange('positionY')}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">px</InputAdornment>,
                        }}
                    >
                        {yRanges.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div className={classes.container}>
                    <Chip label="Text Content" className={classes.margin} />
                    <TextField
                        select
                        id="outlined-simple-start-adornment"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Text Content"
                        value={this.state.positionX}
                        onChange={this.handleChange('Text1')}
                    >
                        {defaultText.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                </div>
                <div className={classes.container}>
                    <Chip label="Image Size" className={classes.margin} />
                    <TextField
                        id="outlined-adornment-size"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Image Height"
                        value={this.state.height}
                        onChange={this.handleChange('Height')}
                        helperText="Height"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">px</InputAdornment>,
                        }}
                    />
                    <TextField
                        id="outlined-adornment-size"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Image Width"
                        value={this.state.width}
                        onChange={this.handleChange('Width')}
                        helperText="Width"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">px</InputAdornment>,
                        }}
                    />
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





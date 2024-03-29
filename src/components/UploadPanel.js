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
import {uploadForAll} from "../firebase/storage";
import {latestUpdatedIndex, setLatestUpdatedIndex} from "../firebase/db";
import * as getLastUpdatedIndexRef from "prop-types";


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
    console.log('imageType is for==> ', uploadImageType); //allCards
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

  handleUpload = (e, category, imageType) => { // cards, allCards
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

  getDownloadUrl = (uploadImagesRef, dbVersion1UpdatedImagesRef, dbLatestImagesRef, downloadUrl, imageMetaData, uploadToCategoryApiVersion) => {
    if (downloadUrl) {
      /**
       * upload to
       * version 1:  category + type
       * version 2: category: 1. allCards 2. allInvitations
       * version 1. add new image key and value
       * version 2. just need to append to the array
       *
       */
      var newImageKey = uploadImagesRef.push().key; //
      var saveFilename = imageMetaData;
      console.log('downloadUrl is：', downloadUrl);
      if (uploadToCategoryApiVersion === 1) {
        /** Upload to update directory for app version 1 */
        dbVersion1UpdatedImagesRef.once('value').then((snapshot) => {
          console.log("snap shot from db updated directory ===>", snapshot);
          var updatedChildrenTotal = snapshot.numChildren();
          console.log('update children number is :', updatedChildrenTotal);
          console.log('newImageKey is：', newImageKey);
          if (updatedChildrenTotal <= 9) {
            /**  add image to db category directory */
            uploadImagesRef.child(newImageKey + '_image').set({
              downloadUrl: downloadUrl,
              name: saveFilename
            });
          } else {
            console.log('already have 10 children');
            /**  add image to db category directory */
            uploadImagesRef.child(newImageKey + '_image').set({
              downloadUrl: downloadUrl,
              name: saveFilename
            });
            /** Also need to update the updated directory by remove the last one and append new image.*/
            var query = dbVersion1UpdatedImagesRef.orderByKey().limitToFirst(1);
            query.once("value")
                .then(function (snapshot) {
                  if (snapshot.val()) {
                    var key = Object.keys(snapshot.val())[0];
                    console.log('key is :', key, 'saved in database');

                    dbVersion1UpdatedImagesRef.child(key).remove().then(function () {
                      dbVersion1UpdatedImagesRef.child(newImageKey + '_image').set({
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
      }
      /** Upload to update directory for app version 2 */
      if (uploadToCategoryApiVersion === 2) {
        uploadImagesRef.once('value').then((snapshot) => {
          var updatedChildrenTotal = snapshot.numChildren();
          uploadImagesRef.child(updatedChildrenTotal).set({
            downloadUrl: downloadUrl,
            name: saveFilename
          });

        });
      }
      /** Also upload the image to database latest directory */
      dbLatestImagesRef.once('value').then((snapshot) => {
        var updatedChildrenTotal = snapshot.numChildren();
        if (updatedChildrenTotal < 6) { // show 6 of latest uploaded images
          /**  add image to db latest category directory */
          dbLatestImagesRef.child(updatedChildrenTotal).set({
            downloadUrl: downloadUrl,
            name: saveFilename
          });
        } else {
          console.log('already have 6 children');
          /** Also need to update the latestArtList directory by remove the first one-old one and append new image.*/
          db.getLastUpdatedIndexRef().once('value').then((snapshot) => {
            let lastIndex = snapshot.val()
            const query = dbLatestImagesRef.orderByKey().limitToFirst(lastIndex);
            query.once("value")
                .then(function (snapshot) {
                  if (snapshot.val()) {
                    var key = Object.keys(snapshot.val())[lastIndex-1];

                    dbLatestImagesRef.child(key).remove().then(function () {
                      dbLatestImagesRef.child(key).set({
                        downloadUrl: downloadUrl,
                        name: saveFilename
                      });
                      setLatestUpdatedIndex(lastIndex)
                    }).catch(function (error) {
                      console.log("Remove failed: " + error.message)
                    });
                  }
                });
          })

        }

      });
      //


    } else {
      this.setState({uploading: false, uploadStatus: 'Download url is not ready!'});
    }


  }

  fileUpload = (file, storageImagesRef, uploadImagesRef, dbVersion1UpdatedImagesRef, dbLatestImagesRef, uploadToCategoryApiVersion) => {//file,storage,db
    var filename = (file.name).match(/^.*?([^\\/.]*)[^\\/]*$/)[1];

    var task = saveImage(file, filename, storageImagesRef) // handle v2 allCards and allInvitations and v1
    var self = this;

    console.log('dbLatestImagesRef is :', dbLatestImagesRef);
    task.then(function (snapshot) {
      console.log('snapshot is ', snapshot)
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log('File metadata name :', snapshot.metadata.name);
      var imageMetaData = snapshot.metadata.name;
      //
      snapshot.ref.getDownloadURL().then(function (downloadUrl) {
        console.log('File available at', downloadUrl);
        /** category-type-db, updated-db, latest-db
         * Need to identify category+type for version 1 or just category for version 2
         *
         * */

        self.getDownloadUrl(uploadImagesRef, dbVersion1UpdatedImagesRef, dbLatestImagesRef, downloadUrl, imageMetaData, uploadToCategoryApiVersion);

      }).catch(function (error) {
        console.error(' could not get download url, error is', error);
        self.setState({uploading: false, choseFiles: []});
        self.props.onHandleUploadStatus({open: true, uploading: false, error: 'error'});
      });
    }).then(function () {
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

  filesUpload = (files, category, imageType) => { // cards, allCards
    var storageImagesRef = storage.getStorageImagesRefByCategoryAndType(category, imageType);
    var dbUploadImagesToTypeRef = db.getDbImagesRefByTCategoryAndType(category, imageType);
    var dbVersion1UpdatedImagesRef = db.getVersion1DbUpdatedFolderImagesRefByCategory(category);
    var dbLatestImagesRef = db.getLatestImagesRefByCategoryAndType(category)
    var uploadToCategoryApiVersion = 1
    if (uploadForAll(category, imageType)) {
      uploadToCategoryApiVersion = 2
    }

    if (files) {
      for (let file of files) {
        this.fileUpload(file, storageImagesRef, dbUploadImagesToTypeRef, dbVersion1UpdatedImagesRef, dbLatestImagesRef, uploadToCategoryApiVersion);//every file
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
                      onDelete={this.handleUnChoose(file)}

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





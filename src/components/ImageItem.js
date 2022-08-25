import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import {db, storage} from '../firebase';

export default class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: '',
        };
    }

    handleDelete = (category, type, imageId, fileName, url) => {
        console.log('You clicked the delete icon.', imageId, 'fileName is ,', fileName, 'url is ', url); // eslint-disable-line no-alert

        var uploadCardsImagesRef = db.getDbImagesRefByTCategoryAndType(category, type);
        var self = this;
        uploadCardsImagesRef.child(imageId).remove().then(function () {//delete image node from database
            alert('The picture of ' + fileName + ', id is ' + imageId + ' is deleted!');
            // Create a reference to the file to delete
            var desertRef = storage.getStorageImagesRefByCategoryAndType(category, type).child(fileName);//delete image from storage as well.
            // Delete the file
            desertRef.delete().then(function () {
                // File deleted successfully
                self.setState({isDeleted: ' is Deleted'})
            }).catch(function (error) {
                // Uh-oh, an error occurred!
            });

        });
        //delete images from updated db

        var updatedCardsImagesRef = db.getVersion1DbUpdatedFolderImagesRefByCategory(category);
        // var self = this;
        updatedCardsImagesRef.child(imageId).remove().then(function (res) {//delete image node from database
            if (!res) {
                alert('The Updated images of ' + fileName + ', id is ' + imageId + ' is deleted!'+res);

            }
             // Create a reference to the file to delete
            // var desertRef = storage.getImagesByCategoryAndType(category, type).child(fileName);//delete image from storage as well.
            // // Delete the file
            // desertRef.delete().then(function () {
            //     // File deleted successfully
            //     self.setState({isDeleted: ' is Deleted'})
            // }).catch(function (error) {
            //     // Uh-oh, an error occurred!
            // });

        }).catch(function (error) {
                // Uh-oh, an error occurred!
            console.log('Not exist!!')
            });
    }

    render() {
        let {category, type, pic, fileName, imageId} = this.props;
        var showName = fileName + this.state.isDeleted
        return (
            <Chip
                avatar={<Avatar src={pic}/>}
                label={showName}
                onDelete={() => this.handleDelete(category, type, imageId, fileName, pic)}

            />
        )
    }
}

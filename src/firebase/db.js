import {db} from './firebase';

//User API

export const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
        role: {free_user: true, paid_user: false, admin: false}
    });

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const getPaidUploadImages = () =>
    db.ref().child("paidUploadImages");

export const onceGetPaidImages = () =>
    db.ref('paidUploadImages').once('value');


export const getFreeUploadImages = () =>
    db.ref().child("freeUploadImages");

export const onceGetFreeImages = () =>
    db.ref('freeUploadImages').once('value');


export const getUploadImages = () =>
    db.ref().child("uploadImages");

export const onceGetImages = () =>
    db.ref('uploadImages').once('value');
// category
// birthday
export const getBirthdayImages = () =>
    db.ref().child("birthdayImages");

export const onceGetBirthdayImages = () =>
    db.ref('birthdayImages').once('value');
// holiday

export const getHolidayImages = () =>
    db.ref().child("holidayImages");

export const onceGetHolidaydayImages = () =>
    db.ref('holidayImages').once('value');

// wedding
export const getWeddingImages = () =>
    db.ref().child("weddingImages");

export const onceGetWeddingImages = () =>
    db.ref('weddingImages').once('value');

// others
export const getOtherImages = () =>
    db.ref().child("otherImages");

export const onceGetOtherImages = () =>
    db.ref('otherImages').once('value');

//get image by category and type

export const getImagesRefByTCategoryAndType = (category, imageType) => {
    console.log('db imageType is ', imageType)
    return db.ref().child(`${category}/${imageType}`);
}

export const getUpdatedImagesRefByTCategoryAndType = (category) => {
    console.log('db imageType is ', category)
    return db.ref().child(`updated${category}`);
}


export const getImagesDataByTCategoryAndType = (category, imageType) => {
    console.log('db imageType is ', category, imageType)
    return db.ref().child(`${category}/${imageType}`).once('value');
}

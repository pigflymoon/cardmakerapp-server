import {storage} from './firebase';

//User API

export const getPaidImages = () =>
    storage.ref().child('paidImages');

export const getDefaultImages = () =>
    storage.ref().child('freeImages');

export const getImages = () =>
    storage.ref().child('uploadImages');

// category
// birthday
export const getBirthdayImages = () =>
    storage.ref().child('birthdayImages');
// holiday
export const getHolidayImages = () =>
    storage.ref().child('holidayImages');
// wedding
export const getWeddingImages = () =>
    storage.ref().child('weddingImages');
// others
export const getOtherImages = () =>
    storage.ref().child('otherImages');

//image by type

export const getCardsImagesByType = (imageType)=>{
    console.log('imageType',imageType)
    return storage.ref().child('cards/'+imageType)
}

export function uploadForAll(category, imageType) {
    return (category === "cards" && imageType === "allCards") || (category === "invitations" && imageType === "allInvitations");
}

export const getStorageImagesRefByCategoryAndType = (category, imageType) => {
    console.log('imageType', imageType, 'category', category)
    if (uploadForAll(category, imageType)) {
        return storage.ref().child(`${imageType}`)
    }
    return storage.ref().child(`${category}/${imageType}`)
}

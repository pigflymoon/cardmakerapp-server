import React, {Component} from 'react';

import ImageItem from '../components/ImageItem';
export default class ImageList extends Component {
    render(){
        const {images,category,type} = this.props;

        if (images) {
            return (
                <div>
                      {Object.keys(images).map(key =>
                        <div key={key}>

                            <ul>
                                <li>
                                    <ImageItem category={category} type={type} pic={images[key].downloadUrl}
                                               fileName={images[key].name}
                                               imageId={key}/>

                                </li>

                            </ul>

                        </div>
                    )}
                </div>
            )
        } else {
            return (
                <div><h2>NO IMAGES</h2></div>
            )
        }
    }
}
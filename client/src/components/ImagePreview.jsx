/* eslint-disable react/prop-types */
import userImg from '../Data/user.png';

const ImagePreview = ({ image, name }) => {
    return (
        <div className="w-32 h-32 mt-2 p-4 border border-border rounded">
            <img src={image ? image : userImg} alt={name} className="w-full h-full object-cover rounded" />
        </div>
    );
};

export default ImagePreview;

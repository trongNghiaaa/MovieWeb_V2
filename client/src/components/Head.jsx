/* eslint-disable react/prop-types */
import image from '../Data/head.png';

function Head({ title }) {
    return (
        <div className="w-full relative bg-dryGray overflow-hidden rounded-md lg:h-64 h-40">
            <img src={image} alt="About Us" className="w-full h-full object-cover" />
            <div className="absolute top-16 lg:top-24 left-0 w-full flex-cols ">
                <h1 className="text-2xl lg:text-h1 text-white text-center font-bold">{title && title}</h1>
            </div>
        </div>
    );
}

export default Head;

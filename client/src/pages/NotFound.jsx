import image404 from '../Data/404.jpg';
import { Link } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';

function NotFound() {
    return (
        <div className="flex-cols w-full gap-6 min-h-screen text-white bg-main lg:py-20  py-10 px-6">
            <img src={image404} alt="notfound" className="w-full xl:h-96 object-contain" />
            <h1 className="lg:text-4xl font-bold italic ">Opps!!!</h1>
            <p className="font-medium text-border leading-6 italic">
                The page are you looking for does not exist . You may have mistyped the URL
            </p>
            <Link
                to={`/`}
                className="bg-subMain transitions hover:text-main flex-rows gap-4 text-white font-medium py-2 px-4 rounded-md"
            >
                <BiHomeAlt /> Go back home
            </Link>
        </div>
    );
}

export default NotFound;

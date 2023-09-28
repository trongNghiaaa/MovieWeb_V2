import { PuffLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="flex-cols w-full py-4 px-2">
            <PuffLoader color="#F20000" />
        </div>
    );
};

export default Loader;

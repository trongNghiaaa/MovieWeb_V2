import { FiUser } from 'react-icons/fi';
import image from '../../Data/mobile.png';

function Promos() {
    return (
        <div className="bg-dry my-20 py-10 px-8 md:px-20">
            <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
                <div className="flex gap-6 lg:gap-10 flex-col">
                    <h1 className="xl:text-xl text-xl capitalize font-sans font-medium leading-loose">
                        Download Your Movies Watch Offline. <br /> Enjoy On Your Mobile
                    </h1>
                    <p className="text-text text-xs xl:text-sm leading-4 xl:leading-6">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived not only five centuries..
                    </p>
                    <div className="flex gap-4 md:text-lg text-sm">
                        <div className="flex-cols bg-black text-subMain px-6 py-3 rounded font-bold ">HD 4K</div>
                        <div className="flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded font-bold ">
                            <FiUser /> 2K
                        </div>
                    </div>
                </div>
                <div>
                    <img src={image} alt="Mobile App" className="w-full object-cover" />
                </div>
            </div>
        </div>
    );
}

export default Promos;

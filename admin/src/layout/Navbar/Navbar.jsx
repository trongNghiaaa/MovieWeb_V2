import imgAdmin from '../../data/admin1.png';

function Navbar() {
    return (
        <>
            <div className="bg-main text-white shadow-md sticky top-0 z-20 ">
                <div className="container mx-auto py-6 px-2 flex justify-center md:justify-between items-center">
                    {/* Logo */}
                    <div className="block ">
                        <h1 className="text-2xl text-subMain  font-bold">Admin Dashboard</h1>
                    </div>

                    {/* role */}
                    <div className="hidden md:block  ">
                        <div className="flex-rows gap-6">
                            <img src={imgAdmin} alt="admin" className="w-12 h-12 object-cover rounded-full overflow-hidden" />
                            <p className="font-bold text-lg">Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;

/* eslint-disable react/prop-types */
import Navbar from './Navbar/Navbar';

function Layout({ children }) {
    return (
        <>
            <div className="bg-main text-white overflow-hidden">
                <Navbar />
                {children}
            </div>
        </>
    );
}

export default Layout;

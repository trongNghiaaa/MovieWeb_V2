import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Aos from 'aos';

import './App.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Movies from './pages/Movies';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';
import SingleMovies from './pages/SingleMovies';
import WatchPage from './pages/WatchPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Password from './pages/Password';
import Favorite from './pages/Favorite';
import ToastContainer from './notfications/toastContainer';
import { ProtectRouter } from '../ProtectRouter';
import { loaderMovies } from './pages/Movies';
import LoginSuccess from './pages/LoginSuccess';

function App() {
    Aos.init();
    const router = createBrowserRouter([
        { path: '/', element: <Home />, errorElement: <NotFound /> },
        { path: '/movies', element: <Movies />, loader: loaderMovies },
        { path: '/movies/:search', element: <Movies /> },
        { path: '/contact-us', element: <ContactUs /> },
        { path: '/about-us', element: <AboutUs /> },
        { path: '/movies/watch/:id', element: <SingleMovies /> },
        { path: '/watchs/:id', element: <WatchPage /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/login-success/:id', element: <LoginSuccess /> },
        {
            path: '/user',
            element: <ProtectRouter />,
            children: [
                { path: 'profile', element: <Profile /> },
                { path: 'password', element: <Password /> },
                { path: 'favorite', element: <Favorite /> },
            ],
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    );
}

export default App;

/* eslint-disable react/prop-types */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Aos from 'aos';

import './App.css';
import Dashboard from './pages/Dashboard';
import MovieList from './pages/MovieList';
import Category from './pages/Category';
import User from './pages/User';
import ToastContainer from './notfications/toastContainer';
import Login from './pages/Login';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';

function App() {
    Aos.init();
    const router = createBrowserRouter([
        { path: '/', element: <Dashboard /> },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/movielist', element: <MovieList /> },
        { path: '/add-movie', element: <AddMovie /> },
        { path: '/edit-movie/:id', element: <EditMovie /> },
        { path: '/category', element: <Category /> },
        { path: '/user', element: <User /> },
        { path: '/login', element: <Login /> },
    ]);

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./pages/home";
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import "@fontsource/montserrat";
import './styles/style.css';
import About from "./pages/about";
import NotFound from "./pages/404";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const basepath = `${process.env.REACT_APP_BASE_ROUTE}`
const router = createBrowserRouter([
    {
        path: basepath,
        element: <Home/>
    } ,
    {
        path: `${basepath}:id`,
        element: <About/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
]);


root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);

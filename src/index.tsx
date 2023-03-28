import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from "./pages/home";
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "@fontsource/montserrat";
import './styles/style.css';
import About from "./pages/about";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    } ,
    {
        path: '/:id',
        element: <About/>
    }
]);


root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);

import './App.css'
import * as React from "react";
import Home from './pages/home';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import useTheme from './hooks/useTheme';

export default function Root() {

 const { theme } = useTheme()


  return (
    <div >
      <Outlet />
      <ToastContainer
        position='bottom-center'
        theme={theme}
        autoClose={5000}
      />
    </div>
  )
}
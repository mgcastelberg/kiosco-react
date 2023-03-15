import React from 'react'
import Modal from "react-modal"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Resumen from '../components/Resumen';

import useKiosco from '../hooks/useKiosco';
import ModalProducto from '../components/ModalProducto';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
  },
};

Modal.setAppElement('#root')

export default function Layout() {

  const { modal, handleClickModal } = useKiosco();
  // console.log(modal);

  return (
    <>
      <div className='md:flex'>
          <Sidebar/>
          <main className='flex-1 h-screen overflow-y-scroll bg-slate-100 px-3'>
              <Outlet/>
          </main>
          <Resumen/>
      </div>

      <Modal isOpen={modal} style={customStyles}>
        <ModalProducto/>
      </Modal>

      <ToastContainer autoClose={2000} />

    </>
  )
}

import React from 'react'
import { Outlet } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

import AdminSidebar from '../components/AdminSidebar';

export default function Layout() {

  useAuth({middleware: 'admin'});

  return (
    <>
      <div className='md:flex'>
          <AdminSidebar/>
          <main className='flex-1 h-screen overflow-y-scroll bg-slate-100 px-3'>
              <Outlet/>
          </main>
      </div>

    </>
  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { KioscoProvider  } from "./context/KioscoProvider";

import { RouterProvider } from "react-router-dom";
import router from "./router";
// import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <KioscoProvider>
      <RouterProvider router={router} />
    </KioscoProvider>
  </React.StrictMode>,
)

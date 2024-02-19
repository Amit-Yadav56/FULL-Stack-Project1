import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom' 
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/react-toastify.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer 
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        closeButton={true}
        theme='colored'
        icon={false}

      />
    </BrowserRouter>
  </React.StrictMode>
);


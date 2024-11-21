import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'

import App from './App';
import TopBar from './components/UI/navigation/TopBar.jsx'
import BottomBar from './components/UI/navigation/BottomBar.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <div
        className='mainContainer'
      >
        <BrowserRouter>
        <TopBar/>
          <App/>
        <BottomBar/>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

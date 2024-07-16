import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {Provider} from "react-redux";
import store from './assets/redux/store/store.js'
import { QueryClientProvider ,QueryClient} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';


const client = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
      <App/>
     <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
   
    </Provider>
  
  </React.StrictMode>,
)

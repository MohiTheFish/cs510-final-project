import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from 'store';
import { gotPosts } from 'redux/memSlice'

import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));


fetch("http://192.168.10.90:5000/allposts").then(res => res.json())
  .then((res) => {
    store.dispatch(gotPosts(res));
  })

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

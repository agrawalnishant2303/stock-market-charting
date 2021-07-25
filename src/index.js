import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import LoginPage from './Login';
import UserLanding from './UserLanding';
import FusionChartsExample from './fusioncharts';
import FusionChartsPractice from './fusionchartpractice';
import CompareTwoCompany from './components/Comparetwocompany';
ReactDOM.render(
  <BrowserRouter>
    <LoginPage />
    <UserLanding />
    <App />
    <FusionChartsExample />
    <FusionChartsPractice />
    <CompareTwoCompany />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

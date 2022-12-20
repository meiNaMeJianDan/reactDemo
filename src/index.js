import React, { Suspense, lazy } from 'react';
import { HashRouter } from "react-router-dom"
import ReactDOM from 'react-dom/client';
import './index.css';

const App = lazy(() => import("./App"))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Suspense fallback={<div>加载中。。。</div>}>
        <App />
      </Suspense>
    </HashRouter>
  </React.StrictMode>
);

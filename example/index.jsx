import React from 'react';
import ReactDOM from 'react-dom';
import Picker from '../lib/Picker';
import './index.css';

ReactDOM.render(
  <div className="container">
    <h1>React google map picker</h1>
    <Picker
      lat={35.009992}
      lng={135.759609}
    />
  </div>,
  document.getElementById('root')
);

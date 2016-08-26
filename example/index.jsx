import React from 'react';
import ReactDOM from 'react-dom';
import Picker from '../src/Picker';
import './index.css';

ReactDOM.render(
  <div className="container">
    <Picker
      lat={35.009992}
      lng={135.759609}
      onChange={value => console.log(value)}
    />
  </div>,
  document.getElementById('root')
);

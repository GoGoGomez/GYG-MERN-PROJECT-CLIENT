import React from 'react';

const Item = (props) => (
  <div>
    <img src={props.imagePath} alt={props.title}/>
    <h3>{props.title}</h3>
  </div>
);

export default Item;
import React from 'react';

const Item = (props) => (
  <div>
    <img src={props.imagePath} alt={props.title}/>
    <p>{props.title}</p>
  </div>
);

export default Item;
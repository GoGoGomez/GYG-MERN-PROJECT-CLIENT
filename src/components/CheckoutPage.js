import React from 'react';
import store from '../store'
import styled from "styled-components";
import UserInfo from './forms/UserInfo'

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #f8d315;
  float: left;
  font-family: HelveticaNeueLT-BoldCond;
  margin-left: 10px;
  display: block;
`;

const Table = styled.table`
  table-layout: fixed;
  width: 90%;
  border: 3px solid black;
  margin: auto;
  text-align-center;
  border-collapse: collapse;


  & > thead {
    & > tr {
      & > th {
        padding: 20px;
        border-bottom: 2px solid white;
        width: 100%;
        font-size: 1.5em;
      }
    }
  }


  & > tbody {  
    & > tr {
      & > td {
        padding: 25px;
        border-bottom: 0.1px solid white;
        border-collapse: collapse

      }
    }
  }
`;
const Button = styled.button`
  border: 0;
  background: #f8d315;
  padding: 1rem;
  color: black;
  margin: 1rem 0;
  width: auto;
  float: right;
  margin-right: 30px;
  text-transform: uppercase;
  &:hover {
    transform: scale(1.1);
  }
`;


const updateQuantity = (event) => {
  event.persist()
  // console.log(id)
  const id = event.target.id
  const quantity = parseInt(event.target.value)
  const order = store.getState().order
  order.map(item => {
    if(item.id == id) {
      item.quantity = quantity
      item.totalPrice = item.price * quantity
    }
  })
  console.log(order)
  store.dispatch({
    type: 'update_item_quantity',
    update: [...order]
  })
}

const handleDeleteItem = (event) => {
  const order = store.getState().order
  const id = event.target.id
  order.map(item => {
    if(item.id == id) {
      order.splice(item, 1)
    }
  })

  store.dispatch({
    type: 'delete_item',
    delete: [...order]
  })
}


const getOrderTotal = () => {
  let orderTotal = 0
  store.getState().order.map(order => (
    orderTotal += order.totalPrice
  ))
  return orderTotal.toFixed(2)
}

const handleClearOrder = () => {
  localStorage.removeItem("state")
  window.history.go(0)
}

const CheckoutPage = () => (
  <div className="CheckoutPage">
    <Title>YOUR ORDER</Title>
    <Button onClick={handleClearOrder}>Clear Order</Button>
    <Table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Total</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        store.getState().order.map(order => (
          <tr key={order.id}>
              <td>{order.item}</td>
              <td><input type="number" min="1" defaultValue={order.quantity} id={order.id} onChange={updateQuantity}/></td>  
              <td>${order.price && order.price.toFixed(2)}</td>
              <td>${order.totalPrice && order.totalPrice.toFixed(2)}</td>
              <td><button id={order.id} onClick={handleDeleteItem}>Delete</button></td>
          </tr>
          ))
        }
      <tr>
        <td colSpan="3">Order Total</td>
        <td>${getOrderTotal()}</td>
      </tr>
    </tbody>
    </Table>

    <UserInfo />
  </div>
);

export default CheckoutPage;

// Enchiladas(Mild) 15

// {
//   // console.log(store.getState().order, 'this is working')
//   <ol>
//     {store.getState().order.map(order => (
//       <li>
//         {order.item}({order.heat}) {order.price}{" "}
//       </li>
//     ))}
//   </ol>
// }
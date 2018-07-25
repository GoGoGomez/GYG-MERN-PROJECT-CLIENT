import React, { Component } from 'react';
import store from '../store'
import styled from "styled-components";
import UserInfo from './forms/UserInfo'
import api from '../api/init'

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


class CheckoutPage extends Component {

  handleSubmit(event) {
    event.preventDefault()
    

    const config = {
      headers: {
      'Content-Type': 'application/json',
      }
    }

    let data = new FormData(document.querySelector('form'))
    console.log(data)

    console.log('Posting to API ...')
    // if (event.keyCode == 13 || ) {
      api.post('/api/checkout', {
        firstName: document.querySelector('#firstName').value, 
        lastName: document.querySelector('#lastName').value, 
        street: document.querySelector('#street').value, 
        postcode: document.querySelector('#postcode').value, 
        email: document.querySelector('#email').value, 
        phoneNumber: document.querySelector('#phoneNumber').value, 
        company: document.querySelector('#company').value
      }, config)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log('Noooo: ', err.response.data))
    // }
  }

  render() {
    return (
      <div className="CheckoutPage">
      <Title>YOUR ORDER</Title>
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
        <tr>
          <td>Enchilads(mild)</td>
          <td><input type="number" min="1" name="quantity"/></td>
          <td>price</td>
          <td>15</td>
          <td><button>Delete</button></td>
        </tr>
        {
          store.getState().order.map(order => (
            <tr key={order.id}>
                <td>{order.item}</td>
                <td><input type="number" min="1" name="quantity"/></td>  
                <td>{order.price}</td>
                <td></td>
                <td><button>Delete</button></td>
            </tr>
            ))
          }
        <tr>
          <td colSpan="3">Order Total</td>
          <td>20.00</td>
        </tr>
      </tbody>
      </Table>
  
      <UserInfo onClick={this.clickHandler} submit={this.handleSubmit} />
    </div>
    ) 
  }

}

// const CheckoutPage = () => (
 
// );

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
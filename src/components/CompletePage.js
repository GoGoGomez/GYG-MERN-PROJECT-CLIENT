import React, { Component } from 'react';
import styled from "styled-components";

const Div = styled.div`
    text-align: center
    margin-top: 30%;
`;

class CompletePage extends Component {

  
    render() {
      return (
        <Div>
            <h1>Your Order has been submitted!</h1>
            <h2>We will get in contact with you shortly to finalise payment and verify order</h2>
        </Div>
      ) 
    }
  }
  
  export default CompletePage;
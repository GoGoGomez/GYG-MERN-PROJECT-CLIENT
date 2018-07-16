import React, { Component } from 'react';
import axios from 'axios'
import api from '../api/init'

class MenuPage extends Component {
  state = {
    items: []
  }

  render () {
    return (
      <div className="MenuPage">
        {this.state.items.map(item => 
          (
            <div>
            <img src={item.imagePath} alt="Smiley face"/>
            <p>{item.title}</p>
            </div>
          )
        )}
      </div>
    )
  }

  componentDidMount() {
    this.fetchItems()
    console.log(this.state.items)
  }
  
  async fetchItems() {
    try {
      const items = await api.get('/menu')
      this.setState({
        items: items.data
      })
    } catch (error) {
      alert('Can\'t get items!')
    }
  }
};

export default MenuPage;

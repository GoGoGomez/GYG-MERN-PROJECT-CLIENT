import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Item from '../components/Item'
import api from '../api/init'


ReactModal.setAppElement('#root')

class MenuPage extends Component {
  state = {
    items: [],
    showModal: false,
    itemid: 0
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  }

  handleOpenModal = (itemid) => {
    console.log(itemid)
    this.setState({ showModal: true, itemid: itemid });
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  renderModal = () => {
    if (!this.state.showModal) return ''
    const item = this.state.items[this.state.itemid]
    return <h3>{item.title}</h3>
    // switch (this.state.itemid) {
    //   case 'item1':
    //     return (
    //       <p>ian</p>
    //     )
    //     break;
    // }
  }
  

  render () {
    return (
      <div className="MenuPage">
            {this.state.items.map((item, i) => 
              (
                <button onClick={() => this.handleOpenModal(i)}>
                  <Item 
                    imagePath={item.imagePath} 
                    alt={item.title} 
                    title={item.title} 
                    category={item.category} 
                    description={item.description} 
                    options={item.options} 
                    key={item._id}
                    id={item.category}
                  />
                </button>  
              )
            )}
        <ReactModal 
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            onRequestClose={this.handleCloseModal}
        >
        {this.renderModal()}
        </ReactModal>
      </div>
    )
  }

  componentDidMount() {
    this.fetchItems()
    console.log(this.state.items)
  }
  
  async fetchItems() {
    try {
      const items = await api.get('/api/menu')
      this.setState({
        items: items.data
      })
    } catch (error) {
      alert('Can\'t get items!')
    }
  }
};

export default MenuPage;

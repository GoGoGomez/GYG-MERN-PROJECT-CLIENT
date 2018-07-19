import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Item from './Item'
import api from '../api/init'
import Heat from './forms/Heat'
import Loading from './Loading'
import store from '../store'


ReactModal.setAppElement('#root')

class MenuPage extends Component {
  state = {
    items: [],
    showModal: false,
    itemid: 0,
    loading: false,
    heat: '',
    orderItem: { }
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

  handleSubmit = event => {

    console.log('Form value: ' + this.state.heat);
    event.preventDefault();
    store.dispatch({
      type: 'set_order_item',
      order: [...store.getState().order, this.state.orderItem]
    })
    // store.setState().order.push(this.state.orderItem)
    this.setState({orderItem: {}, showModal: false })
    console.log(store.getState().order)
  }

  renderModal = () => {
    if (!this.state.showModal) return ''
    const item = this.state.items[this.state.itemid]
    let orderItemId = store.getState().order.length + 1
    this.state.orderItem = {
      id: orderItemId,
      item: item.title,
      price: item.price
    }
    //let orderItem = new OrderItem({id=orderItemId});
    
    return (
      <div className="ModalItem">
        <img src={item.imagePath} />
        <h1>{item.title}</h1>
        <h3>{item.description}</h3>
        <h3>Price: ${item.price}</h3>
        <form onSubmit={this.handleSubmit}>
        { item.heat && <Heat setHeat={this.setHeatForItem}/> }

        <input type="submit" value="Submit"/>
        </form>
      </div>
    )
    // switch (this.state.itemid) {
    //   case 'item1':
    //     return (
    //       <p>ian</p>
    //     )
    //     break;
    // }
  }
  setHeatForItem = (heat) => {
    this.state.orderItem.heat=heat
    console.log(this.state.orderItem)
  }

  render () {
      {if (this.state.loading) {return <Loading />}}
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
    this.setState({loading: true})
    console.log(this.state.items)
  }
  
  async fetchItems() {
    try {
      const items = await api.get('/api/menu')
      this.setState({
        items: items.data,
        loading: false
      })
      // store.dispatch({
      //   type: 'set_items',
      //   items: items.data,
      // })
    } catch (error) {
      alert('Can\'t get items!')
    }
  }
};

export default MenuPage;

import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Item from './Item'
import api from '../api/init'
import Loading from './Loading'
import store from '../store'

//Form Components
import Heat from './forms/Heat'
import Filling from './forms/Filling'



ReactModal.setAppElement('#root')

class MenuPage extends Component {
  state = {
    test: 0,
    items: [],
    showModal: false,
    itemid: 0,
    loading: false,
    orderItem: { 
      
    }
  }


  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  }

  handleOpenModal = (itemid) => {
    console.log(itemid)
    this.setState({ showModal: true, itemid: itemid });
    const item = this.state.items[itemid]
    let orderItemId = store.getState().order.length + 1
    const orderItem = {
      id: orderItemId,
      item: item.title,
      price: item.price,
      totalPrice: item.price,
      name: ''
    }
    this.setState({ orderItem: orderItem })
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleSubmit = event => {
    event.preventDefault();
    store.dispatch({
      type: 'set_order_item',
      order: [...store.getState().order, this.state.orderItem]
    })
    // store.setState().order.push(this.state.orderItem)
    this.setState({orderItem: {}, showModal: false })
    console.log(store.getState().order)
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  renderModal = () => {
    if (!this.state.showModal) return ''
    const item = this.state.items[this.state.itemid]
    let orderItemId = store.getState().order.length + 1
    
    return (
      <div className="ModalItem">
        <img src={item.imagePath} />
        <h1>{item.title}</h1>
        <h3>{item.description}</h3>
        <h3>Price: ${this.state.orderItem.totalPrice}</h3>
        <form onSubmit={this.handleSubmit}>
        { item.filling && <Filling setFilling={this.setFillingForItem} /> }
        { item.heat && <Heat setHeat={this.setHeatForItem} /> }

        <input type="submit" value="Submit"/>
        </form>
        <button onClick={this.closeModal}>Close</button>
      </div>
    )
    // switch (item.name) {
    //   case 'item1':
    //     return (
    //       <p>ian</p>
    //     )
    //     break;
    // }
  }
  
  setHeatForItem = (heat) => {
    const orderItem = {...this.state.orderItem}
    orderItem.heat=heat
    this.setState({ orderItem })
    console.log(orderItem)
  }

  setFillingForItem = async (filling) => {
    const orderItem = {...this.state.orderItem}
    orderItem.filling = filling
 
    if(filling.length > 1) {
      orderItem.totalPrice = orderItem.price + (3 * (filling.length - 1))
    } else {
      orderItem.totalPrice = orderItem.price
    }

    if(filling.includes("beef") || filling.includes("steak")) {orderItem.totalPrice += 0.5}
    console.log('orderItem: ' + JSON.stringify(orderItem))

    await this.setState({ orderItem: orderItem })
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

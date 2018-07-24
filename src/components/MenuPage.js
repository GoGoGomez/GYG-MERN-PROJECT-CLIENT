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
    modifications: [],
    modPrice: 0,
    test: 0,
    items: [],
    showModal: false,
    itemid: 0,
    loading: false,
    orderItem: {

    }
  }

  handleTotalPrice =  async () => {
    const orderItem = {...this.state.orderItem}
    // let modifications = orderItem.modifications;
    // let totalPrice = orderItem.totalPrice;
    // let filling = orderItem.filling;
    // let price = orderItem.price
    let totalPrice = [orderItem.price];

    //filling
    if(orderItem.filling) {
    if(orderItem.filling.length > 0) totalPrice.push((3 * (orderItem.filling.length - 1)))
    // orderItem.totalPrice += (3 * (orderItem.filling.length - 1))

    if(orderItem.filling.includes("beef") || orderItem.filling.includes("steak")) totalPrice.push(0.5)
    // console.log('orderItem: ' + JSON.stringify(orderItem))
    }
    totalPrice.push(this.state.modPrice)
    function getSum(total, num) {
      return total + num;
    }
    orderItem.totalPrice = totalPrice.reduce(getSum)
    await this.setState({ orderItem: orderItem })
    console.log(orderItem)
    console.log(totalPrice)

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
  //Test
  addModification = async (modification, price) => {
    const newPrice = this.state.modPrice + price
    await this.setState({ 
      modifications: [...this.state.modifications, modification],
      modPrice: newPrice
    })
    console.log(this.state.modPrice)

  }
  removeModification = async (modification, price) => {
      const modifications = [...this.state.modifications]
      const newPrice = this.state.modPrice - price

      let index = modifications.indexOf(modification)
      index > -1 && modifications.splice(index, 1)

      await this.setState({ modifications, modPrice: newPrice })
    console.log(this.state.modPrice)

  }

  handleChange = async (event) => {
    event.persist()
    let price = 0;
    if(event.target.getAttribute('price')) {
      price = parseFloat(event.target.getAttribute('price'));
    }
    const value = event.target.value
    console.log(event.target.getAttribute('price'))

      if (!event.target.checked) {
          await this.removeModification(value, price)
      }else {
          await this.addModification(value, price)
          // console.log(event.target.value)

      }
      
      // await this.setPriceTest(event.target)
       await this.setModifications(this.state.modifications)
  }
  //Test
  setModifications = async (modifications) => {
    const orderItem = {...this.state.orderItem}
    orderItem.modifications = modifications
    await this.setState({ orderItem: orderItem })
    this.handleTotalPrice()
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
        {item.price && <h3>Price: ${(this.state.orderItem.totalPrice).toFixed(2)}</h3>}
        <form onSubmit={this.handleSubmit}>
        { item.filling && <Filling setFilling={this.setFillingForItem} /> }
        { item.heat && <Heat setHeat={this.setHeatForItem} /> }
        {/* Modifications.map */}
        {item.modifications.length !== 0 && <h4>Customise</h4>}
        <p>{item.modifications.map(modification => (
          <label className="checkbox">
          <input
            name={modification.name}
            price={modification.price}
            type="checkbox"
            value={modification.name}
            checked={this.state.checked}
            onChange={(e) => this.handleChange(e) }
          />{modification.name} {modification.price && `$${(modification.price).toFixed(2)}`}
        </label>
        ))}</p>

        {/* { this.state.orderItem.filling && this.state.orderItem.filling.includes("vegetables") && <VeggieMods /> } */}
        <p>Name: <input type="text" onChange={this.handleName}/></p>
        <input type="submit" value="Submit"/>
        </form>
        <button onClick={this.handleCloseModal}>Close</button>
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
  }

  setFillingForItem = async (filling) => {
    const orderItem = {...this.state.orderItem}
    orderItem.filling = filling
    await this.setState({ orderItem: orderItem })
    this.handleTotalPrice()
  }

  handleName = async (event) => {
    const orderItem = {...this.state.orderItem}
    orderItem.name = event.target.value
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

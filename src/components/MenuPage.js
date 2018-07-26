import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Item from './Item'
import api from '../api/init'
import Loading from './Loading'
import store from '../store'
import styled from "styled-components";
import { NavLink } from 'react-router-dom';


//Form Components
import Heat from './forms/Heat'
import Filling from './forms/Filling'
import Size from './forms/Size'



ReactModal.setAppElement('#root')

const padding = 90; // adjust this to your needs

const customStyles = {
  content: {
    backgroundColor: "#f8d315",
    border: "3px solid black",
    borderRadius: "50px",
    bottom: "auto",
    height: "600px", // set height
    left: "50%",
    padding: "2rem",
    position: "absolute",
    right: "auto",
    top: "25%", // start from center
    transform: "translate(-50%,-" + "90px" + ")", // adjust top "up" based on height
    width: "70%",
    maxWidth: "60rem"
  }
};

const Button = styled.button`
  border: 0;
  background: #f8d315;
  padding: 1rem;
  color: black;
  margin: 10px;
  width: auto;
  text-transform: uppercase;
`;

const Img = styled.img`
  float: left;
`

const Button2 = styled.button`
  &:hover {
    border: 3px solid #f8d315;
  }
`;

const OptionsModal = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 50px;
  margin-top: 40px;
  clear: left;
`

const ItemPrice = styled.span`
  background-color: white;
  text-transform: uppercase;
  padding: 10px;
  border-radius: 25px;
  margin: 10px;
`;


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

  handleTotalPrice = async () => {
    const orderItem = { ...this.state.orderItem }
    // let modifications = orderItem.modifications;
    // let totalPrice = orderItem.totalPrice;
    // let filling = orderItem.filling;
    // let price = orderItem.price
    let totalPrice = [orderItem.price];

    //filling
    if (orderItem.filling) {
      if (orderItem.filling.length > 0) totalPrice.push((3 * (orderItem.filling.length - 1)))
      // orderItem.totalPrice += (3 * (orderItem.filling.length - 1))

      if (orderItem.filling.includes("beef") || orderItem.filling.includes("steak")) totalPrice.push(0.5)
      // console.log('orderItem: ' + JSON.stringify(orderItem))
    }
    totalPrice.push(this.state.modPrice)
    function getSum(total, num) {
      return total + num;
    }
    // orderItem.price = parseFloat((totalPrice.reduce(getSum)).toFixed(2))
    orderItem.totalPrice = parseFloat((totalPrice.reduce(getSum) * orderItem.quantity).toFixed(2))
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
      name: '',
      quantity: 1
    }
    this.setState({ orderItem: orderItem })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleSubmit = async event => {
    event.persist()    
    const orderItem = {...this.state.orderItem}
    orderItem.price = orderItem.totalPrice/orderItem.quantity
    
    await this.setState({ orderItem: orderItem })
    // event.preventDefault();
    await store.dispatch({
      type: 'set_order_item',
      order: [...store.getState().order, this.state.orderItem]
    })
    // store.setState().order.push(this.state.orderItem)
    await this.setState({ orderItem: {}, showModal: false })
    console.log(store.getState().order)
  }

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
    if (event.target.getAttribute('price')) {
      price = parseFloat(event.target.getAttribute('price'));
    }
    const value = event.target.value
    console.log(event.target.getAttribute('price'))

    if (!event.target.checked) {
      await this.removeModification(value, price)
    } else {
      await this.addModification(value, price)
      // console.log(event.target.value)

    }

    // await this.setPriceTest(event.target)
    await this.setModifications(this.state.modifications)
  }

  setModifications = async (modifications) => {
    const orderItem = { ...this.state.orderItem }
    orderItem.modifications = modifications
    await this.setState({ orderItem: orderItem })
    this.handleTotalPrice()
  }


  renderModal = () => {
    if (!this.state.showModal) return ''
    const item = this.state.items[this.state.itemid]
    let orderItemId = store.getState().order.length + 1

    return <div className="ModalItem">
        {item.options.length === 0 && <Img className="ItemImage" src={item.imagePath} /> }
        <h1>{item.title}</h1>
        <h3>{item.description}</h3>
         <h3>
            PRICE:
            <ItemPrice>
              ${this.state.orderItem.totalPrice.toFixed(2)}
            </ItemPrice>
          </h3>
        <OptionsModal>
          <form onSubmit={this.handleSubmit}>
            {item.options.length === 0 &&
            <p>
              Quantity: <input type="number" min="1" defaultValue="1" name="quantity" onChange={this.handleQuantity} />
            </p>
            }
            {item.filling && <Filling setFilling={this.setFillingForItem} />}
            {item.heat && <Heat setHeat={this.setHeatForItem} />}
            {item.size && <Size setSize={(size) => this.setSizeForItem(size, item.miniPrice, item.price)}/> }
            {/* Modifications.map */}
            {item.modifications.length !== 0 && <h4>Customise</h4>}
            <p>
              {item.modifications.map(modification => (
                <label className="checkbox">
                  <input
                    name={modification.name}
                    price={modification.price}
                    type="checkbox"
                    value={modification.name}
                    checked={this.state.checked}
                    onChange={e => this.handleChange(e)}
                  />
                  {modification.name}{" "}
                  {modification.price &&
                    `$${modification.price.toFixed(2)}`}
                </label>
              ))}
            </p>
            {item.extras.length !== 0 && <h4>Extras</h4>}
            <p>
              {item.extras.map(extra => (
                <label className="checkbox">
                  <input
                    name={extra.name}
                    price={extra.price}
                    type="checkbox"
                    value={extra.name}
                    checked={this.state.checked}
                    onChange={e => this.handleChange(e)}
                  />
                  {extra.name}{" "}
                  {extra.price &&
                    `$${extra.price.toFixed(2)}`}
                </label>
              ))}
            </p>
            <p className="optionItem">
            {item.options.map(option => (
              <div>
                <img className="OptionImage" src={option.image} />
                <p>Quantity: <input style={{width: "2em"}} type="number" min="0" defaultValue="0" name="quantity" onChange={(event) => this.handleOptionQuantity(event, option.price, option.name, item.title)} /></p>
                <h4>{option.name}</h4>
                <h4>${option.price.toFixed(2)}</h4>
                <Button type="submit" value="Submit">Add To Order</Button>
              </div>
            ))}
            </p>
            <br />


            {/* { this.state.orderItem.filling && this.state.orderItem.filling.includes("vegetables") && <VeggieMods /> } */}
            <div className="addToOrder">
            {item.options.length === 0 && <p>Name: <input type="text" onChange={this.handleName} /></p>}
            {item.options.length === 0 && <Button type="submit" value="Submit">Add To Order</Button>}
            
            
              <Button onClick={this.handleCloseModal}>Close</Button>
            
            </div>
          </form>
        </OptionsModal>
      </div>;

    // switch (item.name) {
    //   case 'item1':
    //     return (
    //       <p>ian</p>
    //     )
    //     break;
    // }
  }

  setHeatForItem = (heat) => {
    const orderItem = { ...this.state.orderItem }
    orderItem.heat = heat
    this.setState({ orderItem })
  }

  setFillingForItem = async (filling) => {
    const orderItem = { ...this.state.orderItem }
    orderItem.filling = filling
    await this.setState({ orderItem: orderItem })
    this.handleTotalPrice()
  }

  setSizeForItem = async (size, miniPrice, price) => {
    const orderItem = {...this.state.orderItem}
    orderItem.size=size
    if(size === "Mini"){
    orderItem.price = miniPrice
    } else {
    orderItem.price = price
    }
    await this.setState({ orderItem })
    this.handleTotalPrice()
  }

  handleName = async (event) => {
    event.persist()
    const orderItem = { ...this.state.orderItem }
    orderItem.name = event.target.value
    await this.setState({ orderItem: orderItem })
  }

  handleQuantity = async (event) => {
    event.persist()
    const orderItem = { ...this.state.orderItem }
    orderItem.quantity = parseInt(event.target.value)
    console.log(parseInt(event.target.value))

    await this.setState({ orderItem })
    console.log(event.target.value)
    console.log(this.state.orderItem.quantity)
    this.handleTotalPrice()
  }

  handleOptionQuantity = async (event, itemPrice, itemName, type) => {
    const orderItem = { ...this.state.orderItem }
    let quantity = parseInt(event.target.value)
    let drinks = orderItem.drinks
    console.log(parseInt(event.target.value))
    console.log(event.target.value)
    console.log(itemPrice)
    console.log(itemName)
    // if(type === "Drinks") {
      // if (drinks) {
      //   if(drinks[itemName]) {
      //     drinks.itemName.quantity = quantity
      //   } else {
      //     drinks = [...drinks, {[itemName]: {price: itemPrice, quantity: event.target.value}}]
      //   }
      // } else {
      //   drinks = [{[itemName]: {price: itemPrice, quantity: event.target.value}}]
      // }
      // orderItem.drinks ? orderItem.drinks = [...orderItem.drinks, {[name]: {price: price, quantity: event.target.value}}] :  orderItem.drinks = [{[name]: {price: price, quantity: event.target.value}}]
      orderItem.price = itemPrice
      orderItem.item = itemName
      orderItem.quantity = quantity
      // orderItem.quantity = quantity
    // } else if (type === "Sides") {
    //   orderItem.totalPrice = itemPrice * quantity
    // }


    // orderItem.quantity = parseInt(event.target.value)
    // console.log(parseInt(event.target.value))

    await this.setState({ orderItem })
    // console.log(event.target.value)
    // console.log(this.state.orderItem.quantity)
    this.handleTotalPrice()
  }
 

  render() {
    { if (this.state.loading) { return <Loading /> } }
    return (
      <div className="MenuPage">
        {this.state.items.map((item, i) =>
          (
            <Button2 onClick={() => this.handleOpenModal(i)}>
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
            </Button2>
      
          )
        )}
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          onRequestClose={this.handleCloseModal}
          style={customStyles}
        >
          {this.renderModal()}
        </ReactModal><br />
        <NavLink to="/checkout" exact={true}><Button>Checkout{store.getState() && store.getState().order.length !== 0 && `(${store.getState().order.length})`}</Button></NavLink>


      </div>
    )
  }

  componentDidMount() {
    this.fetchItems()
    this.setState({ loading: true })
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
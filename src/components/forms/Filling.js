import React, { Component } from 'react';

class Filling extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fillingArray: []
        }
        this.setFilling = props.setFilling
    }
    

    addFilling = async (filling) => {
        await this.setState({ fillingArray: [...this.state.fillingArray, filling] })
        console.log(`fillingArray: ${this.state.fillingArray}`)
    }
    removeFilling = async (filling) => {
        const fillingArray = [...this.state.fillingArray]
        let index = fillingArray.indexOf(filling)
        index > -1 && fillingArray.splice(index, 1)
        await this.setState({ fillingArray })
        console.log(`fillingArray: ${this.state.fillingArray}`)
    }


    handleChange = async (event) => {
        // const target = event.target;
        // // console.log(target)
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;
        // this.setState({
        //     [name]: value
        //   });
        // console.log(event.target.checked)
        if (!event.target.checked) { //} && this.state.fillingArray.includes(event.target.value)) {
            await this.removeFilling(event.target.value)
        }else {
            await this.addFilling(event.target.value)
        }
        //Maybe use the checked boxes to push or splice from filling
        // console.log(this.state)
        // this.state[event.target.value] || 
        await this.setFilling(this.state.fillingArray)
    }

    render () {
        return (
            <div className="FillingForm">
                <div className="field">
                    <div className="control">
                        <label className="label"><strong>Filling: </strong></label>
                        <label className="checkbox">
                            <input
                                name="chicken"
                                type="checkbox"
                                value="chicken"
                                checked={this.state.chicken}
                                onChange={this.handleChange}
                            />Chicken
                        </label>
                        <label className="checkbox">
                            <input
                                name="pork"
                                type="checkbox"
                                value="pork"
                                checked={this.state.pork}
                                onChange={this.handleChange}
                            />Pulled Pork
                        </label>
                        <label className="checkbox">
                            <input
                                name="beef"
                                type="checkbox"
                                value="beef"
                                checked={this.state.beef}
                                onChange={this.handleChange}
                            />Slow Cooked Beef $0.50
                        </label>
                        <label className="checkbox">
                            <input
                                name="steak"
                                type="checkbox"
                                value="steak"
                                checked={this.state.steak}
                                onChange={this.handleChange}
                            />Grilled Steak $0.50
                        </label>
                        <label className="checkbox">
                            <input
                                name="baramundi"
                                type="checkbox"
                                value="baramundi"
                                checked={this.state.baramundi}
                                onChange={this.handleChange}
                            />Pan Seared Baramundi
                        </label>
                        <label className="checkbox">
                            <input
                                name="vegetables"
                                type="checkbox"
                                value="vegetables"
                                checked={this.state.vegetables}
                                onChange={this.handleChange}
                            />Sauteed Vegetables
                        </label>
                        <label className="checkbox">
                            <input
                                name="no filling"
                                type="checkbox"
                                value="no filling"
                                checked={this.state["no filling"]}
                                onChange={this.handleChange}
                            />No Filling
                        </label>
                <p>+ $3 for each extra filling</p>

                    </div>
                </div>
            </div>
        )
    }

}

export default Filling;

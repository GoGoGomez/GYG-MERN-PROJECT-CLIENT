import React, { Component } from 'react';

class Heat extends Component {
    state = {
        heat: ''
    }



    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    render () {
        return (
            <div className="HeatForm">
            {/* <form> */}
                <div className="field">
                    <div className="control">
                        <label className="label"><strong>Heat:</strong></label>
                        <br />
                        <label className="radio">
                            <input type="radio"
                                name="test"
                                onChange={this.handleChange}
                                value="Mild"
                                checked={this.state.test === 'Mild'}
                            />
                        Mild
                        </label>
                        <br />
                        <label className="radio">
                            <input type="radio"
                                name="test"
                                onChange={this.handleChange}
                                value="Medium"
                                checked={this.state.test === 'Medium'}
                        />
                        Medium
                        </label>
                        <br />
                        <label className="radio">
                            <input type="radio"
                                name="test"
                                onChange={this.handleChange}
                                value="Spicy"
                                checked={this.state.test === 'Spicy'}
                        />
                        Spicy
                        </label>
                    </div>
                </div>
                {/* </form> */}
            </div>
        )
    }

}

export default Heat;

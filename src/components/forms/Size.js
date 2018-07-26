import React, { Component } from 'react';

class Size extends Component {

    constructor(props) {
        super(props)
        this.setSize = props.setSize
    }
    


    handleChange = (event) => {  
        this.setSize(event.target.value)
        // this.forceUpdate()
    }

    render () {
        return (
            <div className="SizeForm">
            {/* <form> */}
                <div className="field">
                    <div className="control">
                        <label className="label"><strong>Size:</strong></label>
                        <br />
                        <label className="radio">
                            <input type="radio"
                                // setDefault
                                // checked
                                name="size"
                                onChange={this.handleChange}
                                value="Regular"
                                // checked={this.state.test === 'Regular'}
                            />
                        Regular
                        </label>
                        <br />
                        <label className="radio">
                            <input type="radio"
                                name="size"
                                // checked={false}
                                onChange={this.handleChange}
                                value="Mini"
                                // checked={this.state.test === 'Mini'}
                        />
                        Mini
                        </label>
                    </div>
                </div>
                {/* </form> */}
            </div>
        )
    }

}

export default Size;

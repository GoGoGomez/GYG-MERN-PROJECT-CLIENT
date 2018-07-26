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
                                // checked
                                name="size"
                                onChange={this.handleChange}
                                value="Regular"
                            />
                        Regular
                        </label>
                        <br />
                        <label className="radio">
                            <input type="radio"
                                name="size"
                                onChange={this.handleChange}
                                value="Mini"
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

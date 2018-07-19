import React, { Component } from 'react';
// import {RadioGroup, Radio} from 'react-radio-group';


class TestForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            // selectedValue: 'apple'
            inputvalue: '',
            fullname: '',
            editor: '',
            terms: false

        }
        // this.handleChange = this.handleChange.bind(this);
    }
    // state = {
        
    // }
    handleSubmit = event => {
        console.log('Form value: ' + this.state.fullname);
        event.preventDefault();
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }
    // handleChange = event => {
    //     this.setState({
    //         inputvalue: event.target.value
    //     });
    // }
    render () {
        return (
            <div>
                {/* <RadioGroup name="fruit" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                    <Radio value="apple" />Apple
                    <Radio value="orange" />Orange
                    <Radio value="watermelon" />Watermelon
                </RadioGroup> */}

                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label className="label">Full Name</label>
                        <div className="control">
                            <input className="input" type="text" name="fullname" value={this.state.fullname} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Pick your editor</label>
                        <div className="control">
                            <div className="select">
                                <select value={this.state.editor} name="editor" onChange={this.handleChange}>
                                    <option value="vscode">VsCode</option>
                                    <option value="atom">Atom</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
    <div className="control">
        <label className="checkbox">
            <input
                name="terms"
                type="checkbox"
                checked={this.state.terms}
                onChange={this.handleChange}
            />I agree to the <a href="https://google.com">terms and conditions</a>
        </label>
    </div>
</div>
<div className="field">
    <div className="control">
        <label className="label">Do you test your React code?</label>
        <label className="radio">
            <input type="radio"
                   name="test"
                   onChange={this.handleChange}
                   value="Yes"
                   checked={this.state.test === 'Yes'}
            />
            Yes
        </label>
        <label className="radio">
            <input type="radio"
                   name="test"
                   onChange={this.handleChange}
                   value="No"
                   checked={this.state.test === 'No'}
            />
            No
        </label>
    </div>
</div>
                    <input type="submit" value="Submit"/>
                    {/* <label>Name</label>
                    <input type="text" value={this.state.inputvalue} onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/> */}
                </form>
            </div>
        )
    }
}

export default TestForm;

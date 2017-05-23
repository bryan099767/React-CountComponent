import React from 'react';
import ReactDOM from 'react-dom';

class CountComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            step: Number(this.props.step),
            index: Number(this.props.index),
            maxValue: Number(this.props.maxValue),
            minValue: Number(this.props.minValue)
        };
        this.setIndex = this.setIndex.bind(this);
        // this.testMethod = this.testMethod.bind(this);
        // this.setDefaultValue = this.setDefaultValue.bind(this);
    };
    setIndex (chindIndex){
        if (!chindIndex) {
            chindIndex =  Number(this.props.minValue);
        }
        var val = this._checkLegalValue(chindIndex)
        this.setState({
            index: val
        });
    };

    _blurHandler(){
        var realNumber = this._checkLegalValue(Number(this._textInput.value));
        if (realNumber % this.state.step !== 0) {
            realNumber = Math.floor(realNumber / this.state.step) * this.state.step + this.state.step;
        }
        this.setState({
            index: realNumber
        });
    };

    _changeHandler (){
        var number = this._textInput.value;
        if (number == "") { 
            number = 0
        };
        if (!isNaN(parseInt(number))){
            this._checkLegalValue(number)
            this.setState({
                index: Number(parseInt(number))
            });
        };
    };

    _checkLegalValue(val){
        if (val < this.state.minValue) {
            return this.state.minValue
        } else if (val > this.state.maxValue){
            return this.state.maxValue
        } else {
            return val;
        }
    };

    _setDefaultValue () {
        var val = this._checkLegalValue(this.state.index);
        this.setState({
            index: val
        });
    };

    _addCount() {
        var number = this.state.index + Number(this.state.step);
        var realNumber = this._checkLegalValue(number)
        this.setState({
            index: realNumber
        });
    };

    _lessCount() {
        var number = this.state.index - Number(this.state.step);
        var realNumber = this._checkLegalValue(number)
        this.setState({
            index: realNumber
        });
    };

    render() {
        {() => this._setDefaultValue()}

        return(
            <div className="form-inline count_component">
                <div className="from-group">
                    <div className="input-group">
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button" onClick={ this._lessCount.bind(this) } > - </button>
                        </span>
                        <input ref={(input) => { this._textInput = input; }} type="text" value={ this.state.index } className="form-control" onChange={this._changeHandler.bind(this)} onBlur={this._blurHandler.bind(this)}/>
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button" onClick={ this._addCount.bind(this) }> + </button>
                        </span>
                    </div>
                </div>
            </div>
        );
    };
};



CountComponent.propTypes = {
    step: React.PropTypes.number,
    index: React.PropTypes.number,
    maxValue: React.PropTypes.number,
    minValue: React.PropTypes.number
    
};
CountComponent.defaultProps = {
    step: 100,
    index: 200,
    maxValue: 10000,
    minValue: 100,
};


export default CountComponent
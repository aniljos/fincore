import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import MaskedInput from 'react-text-mask';

function timeMask(value) {

    const chars = value.split('');

    var hours = [/[0-2]/,chars[0] === '2' ? /[0-3]/ : /[0-9]/ ];
    const minutes = [ /[0-5]/, /[0-9]/ ];

    return hours.concat(':').concat(minutes);
}
function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={timeMask}
        //placeholderChar={'_'}
        showMask
        guide

      />
    );
  }

  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };

class FTimeField extends Component {

    state = {
        error: false,
        meridiem: ""
    }

    onBlur = (evt) => {
        console.log(evt.target.value);
        let value = evt.target.value;
        if(value){
            let hours = value.substr(0,2);
            if(hours > 12){
              hours -= 12;
            }
        }
    }

     render(){
         return (
             <TextField 
                variant="outlined"
                {...this.props}
                InputProps = {{
                    inputComponent: TextMaskCustom,
                    endAdornment: <InputAdornment position="end">{this.state.meridiem}</InputAdornment>
                }}
                required= {this.props.required}
                onBlur={this.onBlur}/>
         );
     }

}

FTimeField.propTypes = {
    onBlur: PropTypes.func,
    meridiem: PropTypes.string,
    required: PropTypes.bool
}

FTimeField.defaultProps = {
    onBlur: () => {},
    meridiem: "AM",
    required: false
}

export default FTimeField;
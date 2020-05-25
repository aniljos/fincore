import React, { Component, Fragment, PureComponent } from 'react'
import DateFnsUtils from "@date-io/date-fns";
import {
    KeyboardTimePicker, MuiPickersUtilsProvider, KeyboardTimePickerProps
} from "@material-ui/pickers";
import {withStyles} from '@material-ui/core';

const styles = theme => ({

    root: {
        height: 25,
        width: 160
    }

});

interface FTimeFieldProps extends KeyboardTimePickerProps{
    classes: any
}


class FTimeField extends PureComponent<FTimeFieldProps> {

    inputRef: any;
    timeError: any = undefined;
    
    checkValidity = () => {
        return this.inputRef.validity.valid && this.timeError === undefined;
    }

    onError = (e, val)=>{
        //console.log("error", e, val);
        this.timeError = e || undefined;
        if(this.props.onError){
            this.props.onError(e, val);
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker 
                        inputVariant="outlined"
                        InputProps={{className: classes.root}}
                        InputLabelProps={{shrink: true}}
                        {...this.props}
                        mask="__:__ _M"
                        onError={this.onError}
                        inputRef={(inputRef) => this.inputRef = inputRef}
                    />
                </MuiPickersUtilsProvider>
            </Fragment>
        );
    }

}


export default withStyles(styles)(FTimeField);

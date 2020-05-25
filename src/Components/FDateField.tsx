import React, { Component, PureComponent } from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardDatePickerProps } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {withStyles} from '@material-ui/core';

const styles = theme => ({

    root: {
        height: 25,
        width: 180
    }
});

interface FDateFieldProps extends KeyboardDatePickerProps {
    classes: any,
    componentRef?: (arg: FDateField) => void,
}

class FDateField extends PureComponent<FDateFieldProps> {

    static defaultProps = {
        onBlur: () => { },
        onChange: () => { },
        required: false
    }
    inputRef: any;
    dateError: any = undefined;

    checkValidity = () => {

        //console.log(this.inputRef.validity)
        return this.inputRef.validity.valid && this.dateError === undefined;
    }

    onError= (e, val) => {
        //console.log("Error: ", typeof(e));
        this.dateError = e || undefined;
        //console.log("dateError: ", this.dateError);
        if(this.props.onError){
            this.props.onError(e, val);
        }
    }
    componentDidMount(){
        if(this.props.componentRef){
            this.props.componentRef(this.inputRef);
        }
    }

    render() {

        const {classes, componentRef, ...props} = this.props;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker
                    variant="dialog"
                    inputVariant="outlined"
                    InputAdornmentProps={{ position: "end" }}
                    format="dd/MM/yyyy"
                    InputProps={{className: classes.root}}
                    InputLabelProps={{shrink: true}}
                    onError={this.onError}
                    {...props}
                    inputRef={(inputRef) => this.inputRef = inputRef}
                />
            </MuiPickersUtilsProvider>
        );
    }
}


export default withStyles(styles)(FDateField);
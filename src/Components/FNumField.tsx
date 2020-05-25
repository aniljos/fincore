import React, { Component, Fragment, PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import { FTextFieldProps } from './FTextFieldProps';
import { withStyles } from '@material-ui/core';
import FErrorMessageModal from './FErrorMessageModal';

const styles = theme => ({

    input: {
        height: 25,
        width: 150
    }

});
interface FNumFieldProps extends FTextFieldProps {
    length?: number;
    classes?: any
    decimalLength?: number;
    componentRef?: (arg: FNumField) => void,
    errorMessage?: string,
    errorMessageTitle?: string,
    value? : any,
    onChange?: (evt: any) => void
}

class FNumField extends PureComponent<FNumFieldProps> {

    static defaultProps = {
        //decimalLenght: 0
        errorMessage: "Invalid value",
        errorMessageTitle: ""
    };
    state = {
        error: false,
        _value: 0,
        modalOpen: false
    };
    inputProps: any = {};
    value: number = 0;
    inputRef: any;
    modalCloseReason: number = 1; // 1 for OK, 2 for Cancel

    constructor(props) {

        super(props);
        const reqExp = this.getPattern();
        this.inputProps.pattern = reqExp.toString().replace(/\//g, '');
        //console.log("pattern: ", this.inputProps.pattern);
    }

    componentDidMount(){
        
        if(this.props.componentRef){
            this.props.componentRef(this.inputRef);
        }

        if(this.props.onChange && this.props.value && this.props.decimalLength 
                && this.props.value > 0 && this.props.decimalLength > 0){
                    
            if(this.props.value.toString().indexOf(".") === -1){
                
                const updatedValue = parseFloat(this.props.value).toFixed(this.props.decimalLength);

                const evt = {
                    target: {
                        value: updatedValue
                    }
                }
                this.props.onChange(evt);
            } 
        }
    }
    componentDidUpdate(){
        
        // if(this.props.onChange && this.props.value && this.props.decimalLength 
        //         && this.props.value > 0 && this.props.decimalLength > 0){
                    
        //     if(this.props.value.toString().indexOf(".") === -1){
                
        //         const updatedValue = parseFloat(this.props.value).toFixed(this.props.decimalLength);

        //         const evt = {
        //             target: {
        //                 value: updatedValue
        //             }
        //         }
        //         this.props.onChange(evt);
        //     } 
        // }
    }

    private getPattern = () => {

        let { length, decimalLength } = this.props;
        let regexpStr = ``;
        if (length && decimalLength && decimalLength > 0) {

            length = length - decimalLength;
            regexpStr = `^\\d{0,${length}}(\\.\\d{0,${decimalLength}})?$`;
        }
        else {
            regexpStr = `^\\d{0,}$`;
        }
        const regexp = new RegExp(regexpStr);
        return regexp;
    }
    public checkValidity = () => {

        //console.log(this.inputRef.validity);
        return this.inputRef.validity.valid;
    }

    onKeyDown = (evt) => {

        if (this.state.error) {
            this.setState({
                error: false
            });
        }
        // if([37,39,46,8,9,110, 190, 188].includes(evt.keyCode) || (!evt.shiftKey && ((evt.keyCode >= 48 && evt.keyCode <= 57) ||  (evt.keyCode >= 96 && evt.keyCode <= 105)))){
        //     return;
        // }
        // else{
        //     evt.preventDefault();
        // }

        if ([37, 39, 46, 8, 9, 110, 190].includes(evt.keyCode)
            || (!evt.shiftKey && ((evt.keyCode >= 48 && evt.keyCode <= 57)
                || (evt.keyCode >= 96 && evt.keyCode <= 105)))) {
            return;
        }
        else {
            evt.preventDefault();
        }

    }
    private onModalClose = () => {

        this.setState({
            modalOpen: false
        });

    }
    private onModalExited = () => {
        
        if(this.modalCloseReason === 1){
            this.inputRef.focus();
        }
        
    }
    private onModalOK = () => {
        this.setState({
            modalOpen: false
        }, () => {
            this.modalCloseReason = 1;
        });
    }
    private onModalCancel = (e) => {
        this.setState({
            modalOpen: false
        }, () => {
            this.modalCloseReason = 2;
        });
    }
    onBlur = (evt) => {

        const isValid = this.checkValidity();
        if (!isValid) {
            this.setState({
                error: true,
                modalOpen: true
            });
        }
        else {
            if (this.props.decimalLength && this.props.decimalLength > 0 && evt.target.value != 0) {
                const value = evt.target.value;
                const updatedValue = parseFloat(value).toFixed(this.props.decimalLength);
                this.inputRef.value = updatedValue;
                if (this.props.onChange) {
                    evt.target.value = updatedValue;
                    this.props.onChange(evt);
                }
            }
        }
        if (this.props.onBlur) {
            this.props.onBlur(evt);
        }

    }
   

    // onChange = (evt) => {

    //     console.log(evt.target.value)
    //     this.value = evt.target.value;

    //     const decimalLenght = this.props.decimalLenght? this.props.decimalLenght: 0;
    //     try{

    //         const formattedValue = Number(this.value).toFixed(decimalLenght);
    //         this.setState({
    //             _value :  Number(formattedValue).toFixed(decimalLenght)
    //         })      
    //         //this.props.onChange(evt, Number(this.value).toFixed(decimalLenght));
    //     }
    //     catch{
    //         this.setState({
    //             _value :  Number(0).toFixed(2)
    //         })
    //     }
    // }
    render() {

        const { length, classes, decimalLength, errorMessage, errorMessageTitle,componentRef, ...props } = this.props;

        const variant = props.variant;

        const tsProps = (() => {
            let tsVariant;
            switch (variant) {
                case "outlined": {
                    tsVariant = { variant: variant as "outlined" };
                    break;
                }
                case "filled": {
                    tsVariant = { variant: "filled" as "filled" };
                    break;
                }
                case "standard":
                default: {
                    tsVariant = { variant: "outlined" as "outlined" };
                    break;
                }
            }
            const p = props;
            delete p.variant;
            return { ...p, ...tsVariant };
        })();

        return (
            <Fragment>
                <TextField
                    InputProps={{
                        className: classes.input
                    }}
                    InputLabelProps={{ shrink: true }}
                    {...tsProps}
                    error={this.state.error}
                    required={this.props.required}
                    type="text"
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onBlur}
                    inputProps={this.inputProps}
                    inputRef={(inputRef) => this.inputRef = inputRef} />
                <FErrorMessageModal open={this.state.modalOpen}
                    onClose={this.onModalClose}
                    errorMessage={this.props.errorMessage}
                    errorMessageTitle={this.props.errorMessageTitle}
                    onExited={this.onModalExited}
                    onOkay = {this.onModalOK} 
                    onCancel={this.onModalCancel} />
            </Fragment>
        );
    }
}



export default withStyles(styles)(FNumField);
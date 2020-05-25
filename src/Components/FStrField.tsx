import React, { Component, Fragment, PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import FErrorMessageModal from './FErrorMessageModal';
import { FTextFieldProps } from './FTextFieldProps';
import { StringFormat } from './StringFormat';
import { withStyles } from '@material-ui/core';

const styles = theme => ({

    root: {
        height: 25,
        width: 150
    }

});

interface FStrFieldProps extends FTextFieldProps {
    //custom
    format: StringFormat,
    errorMessage?: string,
    errorMessageTitle?: string,
    componentRef?: (arg: FStrField) => void,
    length?: number;
    classes: any,
    value: any,
    onChange: any;
}
interface FStrFieldState {

    modalOpen?: boolean,
    error?: boolean,
    type?: string,

}


class FStrField extends PureComponent<FStrFieldProps, FStrFieldState>  {

    static defaultProps = {
        format: StringFormat.type_x,
        errorMessage: "Invalid Value",
        errorMessageTitle: "",
        variant: "outlined"
    }

    state: FStrFieldState = {

        modalOpen: false,
        error: false,
        type: "text",


    }

    public value: any = ""
    private inputProps: any = {};
    private capsOn = false;
    private isRequired = false;
    private textFieldRef: any;
    private type = "";
    private inputRef: any;
    private capsFormats: Array<string> = [
        StringFormat.type_ANC,
        StringFormat.type_GSTIN,
        StringFormat.type_IFSCCode,
        StringFormat.type_PanNo,
        StringFormat.type_XC,
        StringFormat.type_AC,
        StringFormat.type_Name,
        StringFormat.type_Name_Space,
        StringFormat.type_Name_Space_Dot
    ];

    constructor(props) {
        super(props);

        this.setFormatValue();

        if (this.props.format === StringFormat.type_N) {
            this.state.type = "number";
        }
    }

    componentDidMount() {

        if(this.props.componentRef){
            this.props.componentRef(this.inputRef);
        }
        if (this.props.value) {
            if (this.capsOn && !this.isUpperCase(this.props.value)) {
                if (this.props.onChange) {
                    let evt = {
                        target: {
                            value: this.props.value.toUpperCase()
                        }
                    }
                    this.props.onChange(evt)
                }
            }
        }
    }

    componentDidUpdate() {

        if (this.props.value) {
            if (this.capsOn && !this.isUpperCase(this.props.value)) {
                if (this.props.onChange) {
                    let evt = {
                        target: {
                            value: this.props.value.toUpperCase()
                        }
                    }
                    this.props.onChange(evt)
                }
            }
        }
    }

    isUpperCase(str) {
        return str.toString() === str.toString().toUpperCase();
    }

    private setFormatValue() {

        //if (this.props.format !== StringFormat.type_x && this.props.format !== StringFormat.type_XC) {
        if (this.props.format !== StringFormat.type_x) {
            // const pattern = StringFormat[this.props.format];
            const pattern = this.props.format;
            this.inputProps.pattern = pattern;
        }
        if (this.props.length) {
            this.inputProps.maxLength = this.props.length;
        }

        this.capsOn = this.capsFormats.includes(this.props.format);

        //sconsole.log("caps: " + this.capsOn , this.props.format);    
    }

    checkValidity = () => {

        //console.log(this.inputRef.validity);
        return this.inputRef.validity.valid;
    }

    onBlur = (evt) => {
       
        const isValid = this.checkValidity();
        if (!isValid) {
            this.setState({
                error: true
            });
        }
        else{
            this.setState({
                error: false
            });
        }
        if(this.props.onBlur){
            this.props.onBlur(evt);
        }
    }
    private onKeyDown = (evt) => {

        if (this.state.error) {
            this.setState({
                error: false
            });
        }
        if (this.props.format === StringFormat.type_N) {
            if (evt.keyCode === 37 || evt.keyCode === 39 || evt.keyCode === 46 || evt.keyCode === 8 || evt.keyCode === 9 || (!evt.shiftKey && ((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 && evt.keyCode <= 105)))) {
                //return;
            }
            else {
                evt.preventDefault();
            }
        }
        if(this.props.onKeyDown){
            this.props.onKeyDown(evt);
        }
    }
    onChange = (evt) => {

        const _evt = { ...evt };
        if (this.capsOn) {
            _evt.target.value = _evt.target.value.toUpperCase();
           // console.log("value:", _evt.target.value);
        }
        if (this.props.onChange) {
            this.props.onChange(_evt);
        }
    }
    
    render() {

        const { classes, format, componentRef, errorMessage, errorMessageTitle, ...props } = this.props;

        const variant = props.variant;

        const tsProps = (() => {
            let tsVariant;
            switch (variant) {
                case "outlined": {
                    tsVariant = { variant: variant as "outlined" };
                    break;
                }
                case "filled": {
                    tsVariant = { variant: variant as "filled" };
                    break;
                }
                case "standard":
                default: {
                    tsVariant = { variant: variant as "standard" };
                    break;
                }
            }
            const p = props;
            delete p.variant;
            return { ...p, ...tsVariant };
        })();


        return (
            <Fragment>
                <TextField error={this.state.error}
                    type={this.state.type}
                    InputProps={{ className: classes.root }}
                    InputLabelProps={{ shrink: true }}
                    {...tsProps}
                    onBlur={this.onBlur}
                    onKeyDown={this.onKeyDown}
                    onChange={this.onChange}
                    inputProps={this.inputProps}
                    inputRef={(inputRef) => this.inputRef = inputRef}
                    // inputRef={this.setInputRef}
                    ref={(textFieldRef) => this.textFieldRef = textFieldRef}
                />
            </Fragment>
        );
    }

}

export default withStyles(styles)(FStrField);
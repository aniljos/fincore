import React, { Component, Fragment, PureComponent } from 'react';
import { FTextFieldProps } from './FTextFieldProps';
import { TextField, withStyles } from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import createNumberMaskIndian from '../Helpers/createNumberMaskIndian';
import { convertNumberToWords } from '../Helpers/numberToWords';
import PropTypes from 'prop-types';
import FErrorMessageModal from './FErrorMessageModal';
import FAmountMessageModal from './FAmountMessageModal';

const styles = theme => ({
    input: {
        height: 25,
        width: 150
    }
});

const numberMask = createNumberMaskIndian({
    prefix: '',
    allowDecimal: true,
    requireDecimal: false
    //suffix: ' $' // This will put the dollar sign at the end, with a space.
});

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={numberMask}
            placeholderChar={'_'}
            showMask={false}
            guide={false}

        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};


interface FAmountFieldProps extends FTextFieldProps {

    value?: string,
    required?: boolean,
    classes: any,
    allowNegative?: boolean,
    popupAmountInWords?: boolean,
    errorMessage?: string,
    errorMessageTitle?: string,
    wordsTitle: string
    onChangeValue: (value?: string, words?: string, evt?: any) => {},
    componentRef?: (arg: FAmountField) => void,
}

interface FAmountFieldState {

    error?: boolean,
    modalOpen: boolean,
    wordsModalOpen: boolean,
    wordsMessage: string

}

class FAmountField extends PureComponent<FAmountFieldProps, FAmountFieldState> {

    static defaultProps = {

        onBlur: () => { },
        required: false,
        allowNegative: false,
        popupAmountInWords: false,
        errorMessage: "Invalid value",
        errorMessageTitle: ""
    }

    inputProps?: any = {};
    inputRef: any;
    length: number = 13;
    decimalLength: number = 2;
    modalCloseReason: number = 1; // 1 for OK, 2 for Cancel

    state = {
        error: false,
        modalOpen: false,
        wordsModalOpen: false,
        wordsMessage: ""
    }

    constructor(props) {
        super(props);

        this.inputProps = {
            style: {
                'textAlign': 'right'
            }
        }

        const reqExp = this.getPattern();
        this.inputProps.pattern = reqExp.toString().replace(/\//g, '');
       // console.log("pattern: ", this.inputProps.pattern);

    }

    componentDidMount() {

        if(this.props.componentRef){
            this.props.componentRef(this.inputRef);
        }
        if(this.props.value && this.props.onChangeValue){

            if(this.props.value.toString().indexOf(".") === -1){
                const updatedValue = parseFloat(this.props.value).toFixed(this.decimalLength);

                this.props.onChangeValue(updatedValue, convertNumberToWords(updatedValue) );
            } 
        }
    } 

    componentDidUpdate() {
        if(this.props.value && this.props.onChangeValue){

            if(this.props.value.toString().indexOf(".") === -1){
                const updatedValue = parseFloat(this.props.value).toFixed(this.decimalLength);

                // To be resolved(throwing stack overflow)
                //this.props.onChangeValue(updatedValue, convertNumberToWords(updatedValue) );
            } 
        }
    } 

    private getPattern = () => {

        let { length, decimalLength } = this;
        let regexpStr = ``;
        if (this.props.allowNegative) {
            regexpStr = `^[-]?\\d{0,${length}}(\\.\\d{0,${decimalLength}})?$`;
        }
        else {
            regexpStr = `^\\d{0,${length}}(\\.\\d{0,${decimalLength}})?$`;
        }
        const regexp = new RegExp(regexpStr);
        return regexp;
    }
    onChange = (evt) => {

        const value = evt.target.value.replace(/,/g, "");
        //console.log("Nan: ", isNaN(value));
        
        
        if (!isNaN(value) && this.props.onChangeValue) {
            const theValue = Number(value).toFixed(this.decimalLength);
            this.props.onChangeValue(theValue, convertNumberToWords(theValue), evt);
        }
        else{
            if(this.props.onChangeValue){
                this.props.onChangeValue("", "", evt);
            }
            
        }
        
    }
    onKeyDown = (evt) => {

        if (this.state.error) {
            this.setState({
                error: false
            });
        }
        if ([37, 39, 46, 8, 9, 110, 190, 109, 189].includes(evt.keyCode)
            || (!evt.shiftKey && ((evt.keyCode >= 48 && evt.keyCode <= 57)
                || (evt.keyCode >= 96 && evt.keyCode <= 105)))) {
            return;
        }
        else {
            evt.preventDefault();
        }

    }

    public checkValidity = () => {

        const value = this.inputRef.value.replace(/,/g, "");
        const pattern = this.getPattern();

        if(this.props.required){
            return value !== "" && pattern.test(value) ;
        }
        else{
            return pattern.test(value);
        }
        
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


            if (evt.target.value != 0) {
                // const value = evt.target.value;
                // const updatedValue = parseFloat(value).toFixed(this.decimalLength);
                // this.inputRef.value = updatedValue;
                // if (this.props.onChange) {
                //     evt.target.value = updatedValue;
                //     this.props.onChange(evt);
                // }

            }
            if (this.props.onBlur) {
                this.props.onBlur(evt)
            }
            if(this.props.popupAmountInWords){

                const value = evt.target.value.replace(/,/g, "");
                if (!isNaN(value) && this.props.onChangeValue) {
                    const theValue = Number(value).toFixed(this.decimalLength);
                    this.setState({
                        wordsModalOpen: true,
                        wordsMessage: convertNumberToWords(theValue)
                    });
                }
                
            }


        }
    }

    private onModalClose = () => {

        this.setState({
            modalOpen: false
        });

    }
    private onWordsModalClose = () => {

        this.setState({
            wordsModalOpen: false
        });

    }
    private onWordsModalOK = () => {
        this.setState({
            wordsModalOpen: false
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

    render() {

        const { classes, onChangeValue, allowNegative, 
                popupAmountInWords,errorMessage, errorMessageTitle, wordsTitle,componentRef,  ...props } = this.props;

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
                    InputLabelProps={{ shrink: true }}
                    {...tsProps}
                    error={this.state.error}
                    type="text"
                    inputProps={this.inputProps}
                    InputProps={{
                        inputComponent: TextMaskCustom,
                        className: classes.input
                    }}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    inputRef={(inputRef) => this.inputRef = inputRef} />
                <FErrorMessageModal open={this.state.modalOpen}
                    onClose={this.onModalClose}
                    errorMessage={this.props.errorMessage}
                    errorMessageTitle={this.props.errorMessageTitle}
                    onExited={this.onModalExited}
                    onOkay = {this.onModalOK} 
                    onCancel={this.onModalCancel} />
                <FAmountMessageModal 
                    open={this.state.wordsModalOpen}
                    onClose={this.onWordsModalClose}
                    message={this.state.wordsMessage}
                    onOkay={this.onWordsModalOK}/>
            </Fragment>
        );
    }

}

export default withStyles(styles)(FAmountField);
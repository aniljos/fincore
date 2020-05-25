import React, { Component } from 'react'
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography, DialogActions, DialogContentText } from '@material-ui/core';
import Button from '@material-ui/core/Button';

interface FAmountMessageModalProps extends DialogProps {
    message?: string,
    title?: string,
    onOkay? : any
}

class FAmountMessageModal extends Component<FAmountMessageModalProps> {

    handleOK = () => {
        if(this.props.onOkay){
            this.props.onOkay();
        }    
    }
    

    render() {

        const { message, title,onOkay,  ...props } = this.props;

        return (
            <Dialog {...props} fullWidth={true} maxWidth="xs">
                <DialogTitle>{this.props.title ? this.props.message : "FinCore Information"}</DialogTitle>
                <DialogContent>
                   <Typography variant="subtitle2" color="primary">Amount in Words</Typography>
                   <br/>
                   <Typography variant="subtitle1" color="primary">
                        {this.props.message}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={this.handleOK} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

}

export default FAmountMessageModal;
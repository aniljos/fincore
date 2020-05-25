import React, { Component } from 'react'
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography, DialogActions, DialogContentText } from '@material-ui/core';
import Button from '@material-ui/core/Button'

interface FErrorMessageModalProps extends DialogProps {
    errorMessage?: string,
    errorMessageTitle?: string,
    onOkay?: any,
    onCancel?: any

}

class FErrorMessageModal extends Component<FErrorMessageModalProps> {

    handleOK = () => {
        if (this.props.onOkay) {
            this.props.onOkay();
        }
    }
    handleCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    render() {

        const { errorMessage, errorMessageTitle, onOkay, onCancel, ...props } = this.props;

        return (
            <Dialog {...props} fullWidth={true} maxWidth="xs">
                <DialogTitle>{this.props.errorMessageTitle ? this.props.errorMessageTitle : "Fincore Information"}</DialogTitle>

                <DialogContent>
                    <Typography variant="subtitle2" color="primary">Input Error</Typography>
                    <br />
                    <Typography variant="subtitle1" color="secondary">
                        {this.props.errorMessage}
                    </Typography>
                    {/* <DialogContentText>
                        {this.props.errorMessage}
                    </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={this.handleOK} color="primary" autoFocus>
                        OK
                    </Button>
                    <Button size="small" onClick={this.handleCancel} color="primary" >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

}

export default FErrorMessageModal;
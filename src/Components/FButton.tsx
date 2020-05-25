import React, { Component, PureComponent } from 'react';
import Button, {ButtonProps} from '@material-ui/core/Button';

interface FButtonProps extends ButtonProps{

}
class FButton extends PureComponent<FButtonProps> {

    render() {
        return (
            <Button variant="contained" 
                color="primary" size="small" {...this.props}>{this.props.children}</Button>
            );
    }

}

export default FButton;
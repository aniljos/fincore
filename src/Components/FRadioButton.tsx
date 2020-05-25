import React, { Component, Fragment } from 'react'
import Radio, {RadioProps} from '@material-ui/core/Radio';

interface FRadioButtonProps extends RadioProps{
    
}

class FRadioButton extends Component<FRadioButtonProps> {

    render() {
        return (
            <Fragment>
                <Radio size="small" {...this.props}/>
            </Fragment>
        );
    }
}
export default FRadioButton;
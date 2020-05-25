import React, {Component, Fragment} from 'react'
import Checkbox, {CheckboxProps} from '@material-ui/core/Checkbox';

interface FCheckBoxProps extends CheckboxProps{}

class FCheckBox extends Component<FCheckBoxProps> {

     render(){
         return (
             <Fragment>
                 <Checkbox size="small" {...this.props}></Checkbox>
             </Fragment>
         );
     }

}

export default FCheckBox;
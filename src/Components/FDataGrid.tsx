import React, {Component, Fragment} from 'react'
import MaterialTable, {MaterialTableProps} from 'material-table';

interface FDataGridProps extends MaterialTableProps<any>{

}

class FDataGrid extends Component<FDataGridProps> {

     render(){
         return (
             <Fragment>
                 <MaterialTable {...this.props}/>
             </Fragment>

         );
     }

}


export default FDataGrid;
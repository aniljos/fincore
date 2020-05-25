import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import {TextField,Paper} from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import WrappedVirtualizedTable from './WrappedVirtualizedTable';



class FLookupField extends PureComponent {

    state = {
        data: [],
        open: false,
        placement: 'bottom-start',
        flip: true,
        disablePortal: false,

        pFieldValue: "",
        sFieldValue: ""
    }


    componentDidMount(){

        var data = []
            data.push({lookupId: 1, desc: "Individual"});
            data.push({lookupId: 2, desc: "Company"});
            data.push({lookupId: 3, desc: "Others"});
            data.push({lookupId: 3, desc: "Others"});
            data.push({lookupId: 3, desc: "Others"});
            this.setState({
                data: data
            });
       
    }

    onKeyF2 = (event) => {

        //console.log(event);
        //console.log(event.key);
        if(event.key === "F2"){
            
            this.setState({
                open: true
            })
        
            

        }else if(event.key === "Escape"){
            this.setState({
                open: false
            });
        }

    }
    handleItemClick = (item) => {
        
        const {lookupId, desc} = item.rowData;
        this.setState({
            pFieldValue: lookupId,
            sFieldValue: desc,
            open: false
        })
    }
    handleChange = (evt) => {

        this.setState({
            pFieldValue: evt.target.value
        });
    } 

    render() {

        // var list = (
        //     this.state.data.map((item, index) => (
        //         <Fragment>
                   
        //         </Fragment>

        //     ))
        // );

        return (
            <Grid container>
                <Grid container spacing={16}>
                    <Grid item>
                        <TextField variant="outlined" label="LookupId"  value={this.state.pFieldValue}
                            onKeyUp={this.onKeyF2} inputRef={ref => {this.anchorRef = ref}}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField variant="outlined" InputProps={{readOnly: true}} label="Description" value={this.state.sFieldValue}></TextField>     
                    </Grid>
                </Grid>
                <Popper style={{width: '40%', height: 200}}
                        open={this.state.open} 
                        placement={this.state.placement}
                        disablePortal={this.state.disablePortal}
                        anchorEl={this.anchorRef}>
                        <Paper style={{ height: 200, width: '100%' }}>      
                        <WrappedVirtualizedTable
                                    rowHeight={35}
                                    rowCount={5}
                                    rowGetter = {({index}) => { console.log(this.state.data[index]);  return this.state.data[index]}}
                                    onRowClick = {this.handleItemClick}
                                    columns={[
                                        {
                                            width: 200,
                                            label: "LookUpID",
                                            dataKey: "lookupId"
                                        },
                                        {
                                            width: 200,
                                            label: "Description",
                                            dataKey: "desc"
                                        }
                                    ]}/>
                        </Paper>
                    </Popper>
                
            </Grid>
            );
    }
}

export default FLookupField;
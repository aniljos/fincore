// @flow
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {
    ExpansionPanel, ExpansionPanelSummary,
    ExpansionPanelDetails, Typography, Paper, RadioGroup, FormControlLabel, FormLabel, Grid, Icon
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FStrField from './Components/FStrField';
import { StringFormat } from './Components/StringFormat';
import FNumField from './Components/FNumField';
import FAmountField from './Components/FAmountField';
import FDateField from './Components/FDateField';
import FTimeField from './Components/FTimeField';
import FRadioButton from './Components/FRadioButton';
import FCheckBox from './Components/FCheckBox';
import FDataGrid from './Components/FDataGrid';
import FPickListField from './Components/FPickListField';
import FLookupFieldList, { FLookupFieldResult } from './Components/FLookupFieldList';
import FAccountObject from './Components/FAccountObject';

//import { ArrowRightOutlined, ArrowRightAltSharp, ArrowRightTwoTone, ArrowRightSharp } from '@material-ui/icons';
import FButton from './Components/FButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});




class AppTest extends Component {

    state = {
        format: "",
        num: 0,
        amt: 0,
        sDate: new Date(),
        tDate: new Date(),
        radioValue: "A",
        cCheck: true,
        pickListValue: { pickId: 1 },
        lookup: {},
        lookupData: { lookupId: 1 },
        lpId: 2,
        accountNo: "",
        accountNo2: {
            id: "FDR     000000000001074600000002"
        }
    }
    onFormatChange = (e) => {
        this.setState({
            format: e.target.value
        });
    }
    generateSearchWindow = () => {
        return (
            <FDataGrid
                title="Hello World"
                columns={[
                    { title: "Id", field: "id" },
                    { title: "Name", field: "name" },
                    { title: "Salary", field: "salary" },
                    { title: "IsActive", field: "isActive", render: rowData => <FCheckBox checked={rowData.isActive} /> }
                ]}
                data={[
                    { id: 1, name: "Anil", salary: 90000, isActive: true },
                    { id: 2, name: "Ethan", salary: 80000, isActive: true },
                    { id: 3, name: "Steve", salary: 60000, isActive: false },
                ]}
            />
        );
    }

    lookupDisplay = () => {
        //alert("display");
        console.log(this.lref);
    }

    loadAccountObject = () => {

        console.log(this.accObjRef);
        this.accObjRef.expandAccName();
        

    }
    clearAccountObject = () => {

        //console.log(this.accObjRef);
        this.accObjRef.clearValues();       

    }
    changeAccountObject = () => {

        //console.log(this.accObjRef);
        this.setState({
            accountNo2 : {
                id: "BALU    000000000000000100000001"
            }
        })    

    }

    render() {

        const { classes } = this.props;
        return (
            <div className="App">
                <header className="App-header">
                    <Typography variant="h3" component="h2" gutterBottom >
                        Demos
                    </Typography>
                </header>
                <br /><br /><br /><br />
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography className={classes.heading}>FStrField</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Paper className={classes.paper} spacing={1}>
                            <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                                <Paper className={classes.paper}>
                                    <FStrField label="FStrField"
                                        placeholder='FStrField WaterMark'
                                        length={5}
                                        format={this.state.format}
                                        value={this.state.fvalue}
                                        onChange={(e) => this.setState({ fvalue: e.target.value })}>

                                    </FStrField>
                                    <Paper>
                                        <Typography>{this.state.fvalue}</Typography>
                                    </Paper>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <FStrField label="type_AC"
                                        placeholder='FStrField WaterMark'
                                        format={StringFormat.type_AC}
                                        value={this.state.fvalue1}
                                        onChange={(e) => this.setState({ fvalue1: e.target.value })}>

                                    </FStrField>
                                    <Paper>
                                        <Typography>{this.state.fvalue1}</Typography>
                                    </Paper>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <FStrField label="type_ANC"
                                        placeholder='FStrField WaterMark'
                                        format={StringFormat.type_ANC}
                                        value={this.state.fvalue2}
                                        onChange={(e) => this.setState({ fvalue2: e.target.value })}>

                                    </FStrField>
                                    <Paper>
                                        <Typography>{this.state.fvalue2}</Typography>
                                    </Paper>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <FStrField label="type_N"
                                        placeholder='FStrField WaterMark'
                                        format={StringFormat.type_N}
                                        value={this.state.fvalue3}
                                        onChange={(e) => this.setState({ fvalue3: e.target.value })}>

                                    </FStrField>
                                    <Paper>
                                        <Typography>{this.state.fvalue3}</Typography>
                                    </Paper>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <FStrField label="type_Name"
                                        placeholder='FStrField WaterMark'
                                        format={StringFormat.type_Name}
                                        value={this.state.fvalue4}
                                        onChange={(e) => this.setState({ fvalue4: e.target.value })}>

                                    </FStrField>
                                    <Paper>
                                        <Typography>{this.state.fvalue4}</Typography>
                                    </Paper>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <FStrField label="type_Name_Space"
                                        placeholder='FStrField WaterMark'
                                        format={StringFormat.type_Name_Space}
                                        value={this.state.fvalue5}
                                        onChange={(e) => this.setState({ fvalue5: e.target.value })}>

                                    </FStrField>
                                    <Paper>
                                        <Typography>{this.state.fvalue5}</Typography>
                                    </Paper>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <FStrField label="type_Name_Space_Dot"
                                        placeholder='FStrField WaterMark'
                                        format={StringFormat.type_Name_Space_Dot}
                                        value={this.state.fvalue6}
                                        onChange={(e) => this.setState({ fvalue6: e.target.value })}>

                                    </FStrField>
                                    <Paper>
                                        <Typography>{this.state.fvalue6}</Typography>
                                    </Paper>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <FStrField label="type_PanNo"
                                        placeholder='FStrField WaterMark'
                                        format={StringFormat.type_PanNo}
                                        value={this.state.fvalue7}
                                        onChange={(e) => this.setState({ fvalue7: e.target.value })}>

                                    </FStrField>
                                    <Paper>
                                        <Typography>{this.state.fvalue7}</Typography>
                                    </Paper>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <FStrField label="type_GSTIN"
                                        placeholder='FStrField WaterMark'
                                        format={StringFormat.type_GSTIN}
                                        value={this.state.fvalue8}
                                        onChange={(e) => this.setState({ fvalue8: e.target.value })}>

                                    </FStrField>
                                    <Paper>
                                        <Typography>{this.state.fvalue8}</Typography>
                                    </Paper>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <FStrField label="type_IFSCCode"
                                        placeholder='FStrField WaterMark'
                                        format={StringFormat.type_IFSCCode}
                                        value={this.state.fvalue9}
                                        onChange={(e) => this.setState({ fvalue9: e.target.value })}>

                                    </FStrField>
                                    <Paper>
                                        <Typography>{this.state.fvalue9}</Typography>
                                    </Paper>
                                </Paper>
                                <Paper className={classes.paper}>
                                    <FStrField label="type_XC"
                                        placeholder='FStrField WaterMark'
                                        format={StringFormat.type_XC}
                                        value={this.state.fvalue10}
                                        onChange={(e) => this.setState({ fvalue10: e.target.value })}>

                                    </FStrField>
                                    <Paper>
                                        <Typography>{this.state.fvalue10}</Typography>
                                    </Paper>
                                </Paper>
                            </div>
                        </Paper>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header">
                        <Typography className={classes.heading}>Number Fields</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div style={{ display: "flex", flexFlow: 'row wrap' }}>
                            <Paper className={classes.paper}>
                                <FNumField label="FNumField"
                                    value={this.state.num}
                                    length={5}
                                    onChange={(e) => this.setState({
                                        num: e.target.value
                                    })} />

                                <Paper>
                                    <Typography>{this.state.num}</Typography>
                                </Paper>
                            </Paper>
                            <Paper className={classes.paper}>
                                <FAmountField label="FAmountField" value={this.state.amt}
                                    onChange={(evt, value, words) => this.setState({ amt: value, words })} />
                                <Paper>
                                    <Typography>{this.state.amt}</Typography>
                                    <Typography>{this.state.words}</Typography>
                                </Paper>
                            </Paper>

                            <Paper className={classes.paper}>
                                <div>
                                    <FormLabel component="legend">FRadioButton</FormLabel>
                                    <RadioGroup >
                                        <FormControlLabel
                                            value="A"
                                            control={<FRadioButton color="primary" value="A" name="r1" checked={this.state.radioValue === 'A'} onChange={(evt) => { this.setState({ radioValue: evt.target.value }) }} />}
                                            label="A"
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="B"
                                            control={<FRadioButton color="primary" value="B" name="r1" checked={this.state.radioValue === 'B'} onChange={(evt) => { this.setState({ radioValue: evt.target.value }) }} />}
                                            label="B"
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="C"
                                            control={<FRadioButton color="primary" value="C" name="r1" checked={this.state.radioValue === 'C'} onChange={(evt) => { this.setState({ radioValue: evt.target.value }) }} />}
                                            label="C"
                                            labelPlacement="start"
                                        />
                                    </RadioGroup>
                                </div>
                                <Paper>
                                    <Typography>{this.state.radioValue}</Typography>
                                    <FButton onClick={() => { this.setState({ radioValue: "A" }) }}>Set A</FButton>
                                    <FButton onClick={() => { this.setState({ radioValue: "B" }) }}>Set B</FButton>
                                    <FButton onClick={() => { this.setState({ radioValue: "C" }) }}>Set C</FButton>
                                </Paper>
                            </Paper>
                        </div>

                        <Paper className={classes.paper}>
                            <FormControlLabel
                                value=""
                                control={<FCheckBox checked={this.state.cCheck} onChange={(e) => this.setState({ cCheck: e.target.checked })} label="FCheckbox">Hello</FCheckBox>}
                                label="FCheckBox"
                                labelPlacement="top"
                            />

                            <Paper>
                                <Typography>{"isCheck: " + this.state.cCheck}</Typography>
                                <FButton onClick={() => { this.setState({ cCheck: !this.state.cCheck }) }}>Toggle</FButton>
                            </Paper>
                        </Paper>
                        <Paper className={classes.paper}>
                            <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
                                <FButton variant="outlined" color="primary" onClick={() => { alert("Edit Button") }}>
                                    <Icon>edit_icon</Icon>
                                </FButton>
                                <FButton variant="contained" color="default" onClick={() => { alert("Save Button") }}>
                                    Save
                            </FButton>
                                <FButton variant="contained" color="secondary" onClick={() => { alert("Delete Button") }}>
                                    <DeleteIcon></DeleteIcon>
                                </FButton>
                            </div>
                            <Paper>
                                <Typography>FButtons</Typography>
                            </Paper>
                        </Paper>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className={classes.heading}>Date and Time</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Paper className={classes.paper}>
                            <FDateField label="CurrentDate" value={this.state.sDate} onChange={(e) => this.setState({
                                sDate: e
                            })} />
                            <Paper>
                                <Typography>{this.state.sDate? this.state.sDate.toDateString(): "Date Not Set"}</Typography>
                                <FButton onClick={() => { this.setState({ sDate: new Date() }) }}>Today</FButton>
                            </Paper>
                        </Paper>
                        <Paper className={classes.paper}>
                            <FTimeField label="CurrentTime" value={this.state.tDate} onChange={(e) => this.setState({
                                tDate: e
                            })} />
                            <Paper>
                                <Typography>{this.state.tDate.toTimeString()}</Typography>

                            </Paper>
                        </Paper>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className={classes.heading}>PickupList</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container >
                            <Grid item >
                                <Paper className={classes.paper}>
                                    <FPickListField

                                        tableName="D001003"
                                        pickListName="pick1"
                                        pickListArgs=""
                                        dbConnName=""
                                        addMode={false}
                                        descriptionVisible={true}
                                        onResultChange={(result) => {
                                            this.setState({
                                                pickListValue: result
                                            });
                                        }}
                                        data={this.state.pickListValue}
                                        searchWindow={this.generateSearchWindow()}
                                        dataRef={(ref) => {
                                            this.pickListRef = ref;
                                        }}
                                    />

                                </Paper>
                                <Paper>
                                    <Typography>{this.state.pickListValue.pickId ? this.state.pickListValue.pickId + " " + this.state.pickListValue.pickDescription : null}</Typography>
                                    <FButton onClick={() => console.log(this.pickListRef)}>Display Ref</FButton>
                                </Paper>
                            </Grid>
                        </Grid>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className={classes.heading}>Lookup</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <FLookupFieldList
                            required={false}
                            codeType={1061}
                            onChange={(r) => { this.setState({ lookup: r }) }} />
                        <Paper>
                            <Typography>{this.state.lookup.LookupIDDb ? this.state.lookup.LookupIDDb + ", " + this.state.lookup.LookupDescriprionDb : null}</Typography>
                        </Paper>
                        <FLookupFieldList key={this.state.lpId}
                            data={this.state.lookupData}
                            required={false}
                            codeType={1061}
                            onChange={(r) => { console.log(r); this.setState({ lookupData: r }) }}
                            ref={ref => this.lref = ref} />
                        <Paper>
                            <Typography>{this.state.lookupData.lookupId + ", " + this.state.lookupData.lookupDescription}</Typography>
                        </Paper>
                        <FButton onClick={this.lookupDisplay}>Display</FButton>
                        <FButton onClick={() => this.setState({ lpId: 3 })}>Update</FButton>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className={classes.heading}>DataGrid</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <FDataGrid
                            title="Hello World"
                            columns={[
                                { title: "Id", field: "id" },
                                { title: "Name", field: "name" },
                                { title: "Salary", field: "salary" },
                                { title: "IsActive", field: "isActive", render: rowData => <FCheckBox checked={rowData.isActive} /> }
                            ]}
                            data={[
                                { id: 1, name: "ABC", salary: 90000, isActive: true },
                                { id: 2, name: "XYZ", salary: 80000, isActive: true },
                                { id: 3, name: "ZZZ", salary: 60000, isActive: false },
                            ]}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className={classes.heading}>AccountObject</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item xs={6}>
                                <FAccountObject
                                    BranchCode="3"
                                    ModuleFilter="20"
                                    SearchWindow={this.generateSearchWindow()}
                                    PickAddMode={false}
                                    Text={this.state.accountNo}
                                    onChange={(evt) => { console.log(evt); this.setState({ accountNo: evt.text }) }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Paper>
                                    <Typography>{this.state.accountNo}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className={classes.heading}>AccountObject Set on Startup</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item xs={6}>
                                <FAccountObject
                                    key={this.state.accountNo2.id}
                                    BranchCode="3"
                                    ModuleFilter="20"
                                    descVisible={true}
                                    SearchWindow={this.generateSearchWindow()}
                                    PickAddMode={false}
                                    Text={this.state.accountNo2.id}
                                    ref = {ref => {this.accObjRef = ref}}
                                    onChange={(evt) => { console.log(evt); this.setState({ accountNo2: evt.text }) }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Paper>
                                    <FButton onClick={this.loadAccountObject}>Load</FButton>
                                    <FButton onClick={this.clearAccountObject}>Clear</FButton>
                                    <FButton onClick={this.changeAccountObject}>Change</FButton>
                                    {this.state.accountNo2.id}
                                </Paper>
                            </Grid>
                        </Grid>

                    </ExpansionPanelDetails>
                </ExpansionPanel>

              

            </div>
        );
    }
}

export default withStyles(styles)(AppTest);

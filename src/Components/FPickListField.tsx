import React, { Component, Fragment, PureComponent } from 'react'
//import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable, { Column } from 'material-table';
//import FDataGrid from './FDataGrid';
import FSearchWindow from './FSearchWIndow';
import ArrowRightOutlined from '@material-ui/icons/ArrowRightOutlined';
import FStrField from './FStrField';
import { StringFormat } from './StringFormat';

const styles = theme => ({

    close: {
        margin: 2
    },
    paper: {
        maxHeight: 500,
        overflow: 'auto',
        border: '1px solid blue',
        minWidth: 400

    },
    label: {

        backgroundColor: 'lightblue',
        margin: 2,
        border: '1px solid blue'

    },
    input: {
        height: 25,
        width: 150
    }

});

interface FPickListFieldProps {
    onBlur?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onFocus?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onChange?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    required?: boolean,
    variant?: "filled" | "standard" | "outlined" | undefined,
    tableName: string,
    pickListName: string,
    pickListArgs?: string,
    dbConnName?: string,
    addMode?: boolean,
    descriptionVisible?: boolean,
    classes?: any,
    data?: FPickListResult,
    searchWindow?: any,
    onResultChange?: (result: FPickListResult) => void,
    componentRef?: (ref: FPickListField) => void,
    dataRef?: (ref: any) => void,
    value?: any,
    disabled?: boolean,
    format?:  StringFormat;
}
interface FPickListData {
    PiclistOrder: string,
    PicklistTBOrder: string,
    PicklistHeader: string,
    TotalPages: number,
    PickDt: Array<any>,
    DictOne: any
}

interface FPickListFieldState {
    pickListData?: FPickListData,
    anchorEl?: any,
    pickId?: string,
    pickDesc?: string,
    error?: boolean;
    showSerachWindow?: boolean
}

export interface FPickListResult {
    pickId?: any,
    pickDescription?: any
}

export class FPickListField extends PureComponent<FPickListFieldProps> {

    static defaultProps = {
        onBlur: () => { },
        onFocus: () => { },
        onChange: () => { },
        required: false,
        addMode: false,
        descriptionVisible: true,
        disabled: false,
        format: StringFormat.type_x
    }
    CONTROLS_API_URL: string | undefined;
    pickFieldRef: any;
    data: FPickListResult = { pickId: undefined };
    isValid: boolean = false;
    displayRef: any


    state: FPickListFieldState = {

        anchorEl: null,
        pickId: "",
        pickDesc: "",
        error: false,
        showSerachWindow: false
    }
    pagenation = {
        totalPages: 0,
        currentPage: 0
    }

    constructor(props) {

        super(props);
        this.CONTROLS_API_URL = process.env.REACT_APP_CONTROLS_API_URL || undefined;

    }
    componentDidUpdate(prevProps) {

        if (!this.props.addMode && this.props.value && this.props.value != prevProps.value) {
            let pickId = this.props.value;;
            this.onLoadfetchListCheckInitPicklistDB(pickId, (result) => {

                const { PiclistOrder, DictOne } = result;
                const PicklistTBOrderArr = PiclistOrder.split(",");
                this.setState({
                    pickId: DictOne[PicklistTBOrderArr[0].trim()],
                    pickDesc: DictOne[PicklistTBOrderArr[1].trim()]
                }, () => {

                    this.isValid = true;
                    this.raiseResultChangeEvent();
                });
            }, (error) => {

                this.isValid = false;
                this.setState({
                    pickId: "",
                    pickDesc: ""
                });
                this.pickFieldRef.focus();
                if (error !== null) {
                    alert("Network error");
                }
            })

        }
        
        
        // if(this.props.value == ""){
        //             this.setState({
        //             pickId: "",
        //             pickDesc: ""
        //         });
        //  }
        


    }
    componentDidMount() {

        if (this.props.dataRef) {
            this.props.dataRef(this.data);
        }

        if (!this.props.addMode) {
            if ((this.props.data && this.props.data.pickId) || this.props.value) {

                let pickId;
                if (this.props.data && this.props.data.pickId) {
                    pickId = this.props.data.pickId;
                }
                else {
                    pickId = this.props.value;
                }

                this.onLoadfetchListCheckInitPicklistDB(pickId, (result) => {

                    const { PiclistOrder, DictOne } = result;
                    const PicklistTBOrderArr = PiclistOrder.split(",");
                    this.setState({
                        pickId: DictOne[PicklistTBOrderArr[0].trim()],
                        pickDesc: DictOne[PicklistTBOrderArr[1].trim()]
                    }, () => {

                        this.isValid = true;
                        this.raiseResultChangeEvent();
                    });
                }, (error) => {

                    this.isValid = false;
                    this.setState({
                        pickId: "",
                        pickDesc: ""
                    });
                    this.pickFieldRef.focus();
                    if (error !== null) {
                        alert("Network error");
                    }
                })
            }
        }
    }
    onPickIdChange = (evt) => {

        this.setState({
            pickId: evt.target.value,
            pickDesc: "",
            error: false
        }, () => {
            this.isValid = false;
            if (this.props.addMode) {
                this.raiseResultChangeEvent();
            }
        });
    }
    onDescChange = (evt) => {

        this.setState({

            pickDesc: evt.target.value,
            error: false
        }, () => {
            this.isValid = false;
            if (this.props.addMode) {
                this.raiseResultChangeEvent();
            }
        });
    }
    fetchListGetInitPicklistDB = async (success, error) => {

        try {
            const url = this.CONTROLS_API_URL + "ListGetInitPicklistDB?tot=" + this.pagenation.totalPages;
            const { tableName, pickListName, pickListArgs, dbConnName } = this.props;
            const data = {
                TableName: tableName,
                PicklistName: pickListName,
                ParamArr: pickListArgs,
                TBVal: this.pickFieldRef.value,
                DbConnName: dbConnName,
                Pagen: this.pagenation.currentPage
            }

            let response = await axios.post(url, data);
            const result = await response.data;
            this.setState({
                pickListData: result
            })

            success();
        }
        catch (ex) {
            error(ex);
        }

    }

    fetchListCheckInitPicklistDB = async (success, error) => {

        if (this.state.pickId) {
            try {
                const url = this.CONTROLS_API_URL + "ListCheckInitPicklistDB";
                const { tableName, pickListName, pickListArgs, dbConnName } = this.props;
                const data = {
                    TableName: tableName,
                    PicklistName: pickListName,
                    ParamArr: pickListArgs,
                    TBVal: this.state.pickId.toString(),
                    DbConnName: dbConnName,
                    KeyVal: this.state.pickId.toString()
                }

                let response = await axios.post(url, data);
                const result = await response.data;
                if (result === null) {
                    error(result);
                }
                else {
                    success(result)
                }
            }
            catch (ex) {
                error(ex);
            }
        }

    }

    onLoadfetchListCheckInitPicklistDB = async (pickId, success, error) => {

        try {
            const url = this.CONTROLS_API_URL + "ListCheckInitPicklistDB";
            const { tableName, pickListName, pickListArgs, dbConnName } = this.props;
            const data = {
                TableName: tableName,
                PicklistName: pickListName,
                ParamArr: pickListArgs,
                TBVal: pickId.toString(),
                DbConnName: dbConnName,
                KeyVal: pickId.toString()
            }

            let response = await axios.post(url, data);
            const result = await response.data;
            if (result === null) {
                error(result);
            }
            else {
                success(result)
            }

        }
        catch (ex) {
            error(ex);
        }

    }




    onSearchKeyDown = (evt) => {


        if (evt.key === "F2") {

            if (evt.shiftKey) {
                if (!this.props.searchWindow) {
                    alert("No Advance Search Avaialbale");
                }
                else {
                    //alert("Advance Search Avaialbale");
                    this.setState({
                        showSerachWindow: true
                    });
                }

                return;
            }
            else {
                this.setState({
                    error: false
                })
                this.searchOnF2();
            }


        }
        if (evt.key === "Tab") {
            this.searchOnTab();
        }

    }
    closePopover = () => {
        this.setState({
            anchorEl: null
        });
    }

    onItemSelect = (evt, selectedRow) => {
        //alert("You saved " + selectedRow.Name);
        if (this.state.pickListData) {
            const { PiclistOrder } = this.state.pickListData;

            const PiclistOrderArr = PiclistOrder.split(",");
            this.setState({
                pickId: selectedRow[PiclistOrderArr[0]],
                pickDesc: selectedRow[PiclistOrderArr[1]],
                anchorEl: null,
                error: false
            }, () => {
                this.raiseResultChangeEvent();
            });
        }
    }

    generateList = () => {

        if (this.state.pickListData) {

            const { PicklistHeader, PickDt, PiclistOrder } = this.state.pickListData;
            //Array
            const headers = PicklistHeader.split(",");
            const columns: Array<Column<any>> = [];

            const fields = PiclistOrder.split(",");

            // for (const header of headers) {
            //     columns.push({ title: header, field: header });
            // }
            for (let index = 0; index < headers.length; index++) {
                columns.push({ title: headers[index], field: fields[index].trim() });
            }

            return (
                <MaterialTable
                    title=""
                    isLoading={!this.state.pickListData}
                    columns={columns}
                    data={PickDt}
                    options={{
                        sorting: true,
                        filtering: true,
                        pageSize: 5,
                        search: true,
                        searchFieldAlignment: 'left',
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        },
                        // rowStyle: (arg, index) => {
                        //     return index % 2 == 0 ? {backgroundColor: 'aliceblue'}: {backgroundColor: 'beige'} 
                        // } 

                    }}
                    onRowClick={this.onItemSelect}
                    actions={[
                        {
                            icon: 'add',
                            tooltip: 'Select',
                            onClick: this.onItemSelect
                        }
                    ]}
 
                />
            )
        }

    }
    onPickIdBlur = (e) => {

        //console.log("blur")
        const valid = this.pickFieldRef.validity.valid;
        if(!valid){
            this.setState({
                error: true
            });
        }
        else{
            this.setState({
                error: false
            })
        }
    }

    raiseResultChangeEvent() {


        this.data.pickId = this.state.pickId;
        this.data.pickDescription = this.state.pickDesc;

        if (this.props.onResultChange) {
            this.props.onResultChange({
                pickId: this.state.pickId,
                pickDescription: this.state.pickDesc ? (typeof this.state.pickDesc == 'number' ? this.state.pickDesc : this.state.pickDesc.trim()) : undefined
            });
        }
    }

    private searchOnTab() {
        const pickIdVal = this.state.pickId;
        if (pickIdVal && pickIdVal !== "" && !this.props.addMode) {
            this.setState(() => {
                return {
                    pickDesc: ""
                };
            }, () => {
                this.fetchListCheckInitPicklistDB((result) => {

                    const { PiclistOrder, DictOne } = result;
                    const PicklistTBOrderArr = PiclistOrder.split(",");
                    this.setState({
                        pickId: DictOne[PicklistTBOrderArr[0].trim()],
                        pickDesc: DictOne[PicklistTBOrderArr[1].trim()]
                    }, () => {
                        this.isValid = true;
                        this.raiseResultChangeEvent();
                    });
                }, (error) => {

                    this.isValid = false;
                    this.setState({
                        
                        pickDesc: "",
                        error: true
                    });
                    this.pickFieldRef.focus();
                    if (error !== null) {
                        //alert("Network error");
                    }
                });
            });
        }
    }

    private searchOnF2() {
        if (!this.props.addMode) {
            this.setState({
                pickListData: null
            });
            this.fetchListGetInitPicklistDB(() => {

                this.setState({
                    anchorEl: this.pickFieldRef
                });
            }, (ex) => {

            });
        }
    }

    onSearchWindowClose = () => {
        this.setState({
            showSerachWindow: false
        });
    }
    checkValidity = () => {

        if(this.props.addMode){
            return this.pickFieldRef.validity.valid && this.displayRef.validity.valid
        }
        else{

            let displayValid = false;
            if(this.props.required && this.displayRef.value != ""){
                displayValid = true;
            }
            if(!this.props.required){
                displayValid = true;
            }

            return this.pickFieldRef.validity.valid 
                    && displayValid
        }
    }
    render() {
        const { classes, descriptionVisible, searchWindow } = this.props;
        const open = Boolean(this.state.anchorEl);
        const { showSerachWindow } = this.state;
        const list = this.generateList();

        return (
            <Fragment>
                {searchWindow && showSerachWindow ? <FSearchWindow contents={searchWindow} onClose={this.onSearchWindowClose} /> : null}
                <Grid container spacing={0} style={{ alignItems: 'center' }}>
                    <Grid item >
                        <FStrField
                            variant="outlined"
                            required={this.props.required}
                            onKeyDown={this.onSearchKeyDown}
                            componentRef={ref => { this.pickFieldRef = ref }}
                            value={this.state.pickId}
                            onChange={this.onPickIdChange}
                            onBlur={this.onPickIdBlur}
                            error={this.state.error}
                            // InputProps={{
                            //     className: classes.input
                            // }}
                            InputLabelProps={{ shrink: true }}
                            disabled={this.props.disabled}
                            format={this.props.format} />
                    </Grid>
                    {descriptionVisible ? <Grid item >
                        <ArrowRightOutlined color="primary" />
                    </Grid> : null}
                    {descriptionVisible ? <Grid item >
                        <TextField variant="outlined"
                            required={this.props.required && this.props.addMode}
                            inputProps={{ readOnly: !this.props.addMode, tabIndex: this.props.addMode ? 0 : -1 }}
                            value={this.state.pickDesc}
                            onChange={this.onDescChange}
                            InputProps={{
                                className: classes.input
                            }}
                            InputLabelProps={{ shrink: true }}
                            disabled={this.props.disabled}
                            inputRef={ref=> this.displayRef = ref} />
                    </Grid> : null}
                </Grid>
                <Popover anchorEl={this.state.anchorEl} open={open}
                    onClose={this.closePopover}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}>
                    <Paper className={classes.paper}>
                        {list}
                    </Paper>
                </Popover>
            </Fragment>
        );
    }
}
export default withStyles(styles)(FPickListField);
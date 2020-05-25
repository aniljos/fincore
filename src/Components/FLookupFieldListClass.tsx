import React, { Component, PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Paper, Typography } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MaterialTable from 'material-table';
import ArrowRightSharp from '@material-ui/icons/ArrowRightSharp';
import ArrowRightOutlined from '@material-ui/icons/ArrowRightOutlined';
import FStrField from './FStrField';
import { StringFormat } from './StringFormat';
const styles = theme => ({
    list: {
        minWidth: 300,
        maxWidth: 600,
        border: '2px solid darkblue',
        //padding: 2,
        //margin: 2
    },
    close: {
        margin: 2
    },
    paper: {
        maxHeight: 200,
        overflow: 'auto',
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

export interface FLookupFieldResult {
    lookupId?: any,
    lookupDescription?: any
}

interface FLookupFieldListProps {

    addMode?: boolean,
    organizationId?: number,
    dbConnName?: string,
    codeType?: number,

    lookupId?: any,
    data?: FLookupFieldResult,

    description?: string,
    lookupIdLabel?: string,
    descriptionLabel?: string,
    lookupIdPlaceholder?: string,
    descriptionPlaceholder?: string,
    descriptionVisible?: boolean,

    lookupTableName?: string,
    onChange?: (evt: any) => void,
    onError?: (evt: any) => void,
    required?: boolean,
    classes?: any,
    dataRef?: (ref: any) => void,

    value?: any,
    disabled?:  boolean,
    format? : StringFormat
}

export class FLookupFieldList extends PureComponent<FLookupFieldListProps> {

    static defaultProps = {

        lookupIdLabel: undefined,
        descriptionLabel: undefined,
        lookupIdPlaceholder: undefined,
        descriptionPlaceholder: undefined,
        descriptionVisible: true,
        dbConnName: "",
        lookupTableName: "",
        onChange: () => { }, 
        onError: () => { },
        required: false,
        addMode: false,
        disabled: false,
        format: StringFormat.type_x
    }

    state = {
        data: [],
        open: false,
        placement: 'bottom-start',
        disablePortal: false,

        pFieldValue: "",
        sFieldValue: "",
        error: false,
        anchorEl: null,
        isInternalChange: false
    }
    lookupId: any = null;
    lookupDescription: any = null;
    data: FLookupFieldResult = {};

    CONTROLS_API_URL?: string;
    anchorRef: any;
    displayRef: any;

    constructor(props) {

        super(props);
        this.CONTROLS_API_URL = process.env.REACT_APP_CONTROLS_API_URL || undefined;
    }

    componentDidUpdate(prevProps) {

        if (!this.props.addMode && this.props.value && this.props.value != prevProps.value) {

            if (this.props.value) {

                this.state.pFieldValue = this.props.value.toString();
                // if (this.props.data && this.props.data.lookupId) {
                //     this.state.pFieldValue = this.props.data.lookupId;
                // }
                // else {
                //     this.state.pFieldValue = this.props.value;
                // }

                this.fetchDataCheckInitLookup(() => {

                    this.data = {
                        lookupId: this.state.pFieldValue,
                        lookupDescription: this.state.sFieldValue
                    }
                    // this.lookupId = this.state.pFieldValue;
                    // this.lookupDescription = this.state.sFieldValue;

                    if (this.props.onChange) {
                        this.props.onChange({
                            lookupId: this.state.pFieldValue,
                            lookupDescription: this.state.sFieldValue,
                            props: {
                                ...this.props
                            }
                        });
                    }
                }, (ex) => {
                    if (this.props.onError) {
                        this.props.onError(ex);
                    }
                    if (this.props.onChange) {
                        this.props.onChange({
                            lookupId: this.state.pFieldValue,
                            lookupDescription: this.state.sFieldValue,
                            props: {
                                ...this.props
                            }
                        });
                    }
                });
            }
        }

        // if(this.props.value == ""){
        //     this.setState({
        //         pFieldValue: "",
        //         sFieldValue: ""
        //     });
        // }
    }
    componentDidMount() {

        if (this.props.dataRef) {
            this.props.dataRef(this.data);
        }
        if (!this.props.addMode) {
            if ((this.props.data && this.props.data.lookupId) || this.props.value) {

                if (this.props.data && this.props.data.lookupId) {
                    this.state.pFieldValue = this.props.data.lookupId.toString();
                }
                else {
                    this.state.pFieldValue = this.props.value.toString();
                }

                this.fetchDataCheckInitLookup(() => {

                    this.data = {
                        lookupId: this.state.pFieldValue,
                        lookupDescription: this.state.sFieldValue
                    }
                    // this.lookupId = this.state.pFieldValue;
                    // this.lookupDescription = this.state.sFieldValue;

                    if (this.props.onChange) {
                        this.props.onChange({
                            lookupId: this.state.pFieldValue,
                            lookupDescription: this.state.sFieldValue,
                            props: {
                                ...this.props
                            }
                        });
                    }
                }, (ex) => {
                    if (this.props.onError) {
                        this.props.onError(ex);
                    }
                    if (this.props.onChange) {
                        this.props.onChange({
                            lookupId: this.state.pFieldValue,
                            lookupDescription: this.state.sFieldValue,
                            props: {
                                ...this.props
                            }
                        });
                    }
                });
            }
        }
    }

    fetchDataGetInitLookup = async (success, error) => {

        try {
            const { organizationId, codeType, lookupTableName } = this.props;
            const url = this.CONTROLS_API_URL + "ListGetInitLookup";
            const data = {
                OrgId: organizationId,
                LookupCode: codeType,
                LkTableName: lookupTableName
            }
            const response = await axios.post(url, data);
            const result = await response.data;
            this.setState({
                data: result
            });
            success();
        }
        catch (ex) {
            error(ex);
        }
    }
    fetchDataCheckInitLookup = async (success, error) => {

        try {
            const { organizationId, codeType, lookupTableName } = this.props;
            const { pFieldValue } = this.state;
            const url = this.CONTROLS_API_URL + "ListCheckInitLookup";
            const data = {

                LookupId: pFieldValue.toString(),
                OrgId: organizationId,
                LookupCode: codeType,
                LkTableName: lookupTableName
            }
            const response = await axios.post(url, data);
            const result = await response.data;
            if(result){
                this.setState(() => {
                    return {
                        sFieldValue: result.LookupDescriprionDb,
                        error: false
                    };
                }, () => {
                    success()
                })
            }
            else{
                this.setState(() => {
                    return {

                        sFieldValue: "",
                        error: true
                    };
                }, () => {
                    this.anchorRef.focus();
                    error()
                })
            }
        } catch (ex) {

            this.setState(() => {
                return {
                    pFieldValue: "",
                    sFieldValue: "",
                    error: true
                };
            }, () => {
                setTimeout(() => {
                    this.anchorRef.focus();
                }, 0);
                error(ex);
            })
        }
    }

    lookupId_onKeyDown = (event) => {

        
        if (event.key === "F2" && !this.props.addMode) {
            this.fetchDataGetInitLookup(() => {

                this.setState({
                    anchorEl: this.anchorRef,
                    error: false
                });

            }, (ex) => {
                //console.log(ex);
                if (this.props.onError) {
                    this.props.onError(ex);
                }

            });
        }
        if (event.key === "Tab" && !this.props.addMode) {
            if (this.state.pFieldValue) {
                this.fetchDataCheckInitLookup(() => {

                    this.data = {
                        lookupId: this.state.pFieldValue,
                        lookupDescription: this.state.sFieldValue
                    }
                    // this.lookupId = this.state.pFieldValue;
                    // this.lookupDescription = this.state.sFieldValue;
                    if (this.props.onChange) {
                        this.props.onChange({
                            lookupId: this.state.pFieldValue,
                            lookupDescription: this.state.sFieldValue,
                            props: {
                                ...this.props
                            }
                        });
                    }
                }, (ex) => {
                    if (this.props.onError) {
                        this.props.onError(ex);
                    }
                    if (this.props.onChange) {
                        this.props.onChange({
                            lookupId: this.state.pFieldValue,
                            lookupDescription: this.state.sFieldValue,
                            props: {
                                ...this.props
                            }
                        });
                    }
                })
            }
            else {

                event.preventDefault();
                this.setState({ error: true });
            }
        }

    }
    lookupId_onBlur = (event) => {


    }
    lookupId_onChange = (event) => {

        this.data = {}
        //this.lookupId = null;
        //this.lookupDescription = null;
        this.setState({
            pFieldValue: event.target.value,
            sFieldValue: "",
            error: false
        }, () => {
            if (this.props.onChange) {
                this.props.onChange({
                    lookupId: this.state.pFieldValue,
                    lookupDescripton: this.state.sFieldValue,
                    props: {
                        ...this.props
                    }
                });
            }
        });
    }
    desc_onChange = (event) => {

        if (this.props.addMode) {
            

            this.setState({
                sFieldValue: event.target.value,

            }, () => {
                if (this.props.onChange) {
                    this.props.onChange({
                        lookupId: this.state.pFieldValue,
                        lookupDescripton: this.state.sFieldValue,
                        props: {
                            ...this.props
                        }
                    });
                }
            });
        }
    }
    handleItemClick = (item) => {

       // console.log("selected: ", item)
        this.setState(() => {
            return {
                pFieldValue: item.LookupIDDb,
                sFieldValue: item.LookupDescriprionDb,
                anchorEl: null,
                error: false
            }
        }, () => {

            if (this.props.onChange) {
                this.props.onChange({
                    lookupId: this.state.pFieldValue,
                    lookupDescripton: this.state.sFieldValue,
                    props: {
                        ...this.props
                    }
                });
            }
        })
    }
    handleChange = (evt) => {

        this.setState({
            pFieldValue: evt.target.value
        });
    }
    closePopover = () => {
        this.setState({
            anchorEl: null
        });
    }
    rowSelect = (evt, selectedRow) => {

        this.setState(() => {
            return {
                pFieldValue: selectedRow["LookupIDDb"],
                sFieldValue: selectedRow["LookupDescriprionDb"]
            }
        }, () => {
            this.closePopover();

            this.data = {
                lookupId: this.state.pFieldValue,
                lookupDescription: this.state.sFieldValue
            }
            //console.log("setting, ", this.state.sFieldValue)
            if (this.props.onChange) {
                this.props.onChange({
                    lookupId: this.state.pFieldValue,
                    lookupDescription: this.state.sFieldValue,
                    props: {
                        ...this.props
                    }
                });
            }
        })


    }

    generateList = () => {
        if (this.state.data) {
            return (
                <MaterialTable
                    title="Lookup"
                    columns={[
                        { title: this.props.lookupIdLabel, field: "LookupIDDb" },
                        { title: this.props.descriptionLabel, field: "LookupDescriprionDb" },
                    ]}
                    data={this.state.data}
                    onRowClick={this.rowSelect}
                />
            )
        }
    }

    checkValidity = () => {

        if(this.props.addMode){
            return this.anchorRef.validity.valid && this.displayRef.validity.valid
        }
        else{

            let displayValid = false;
            if(this.props.required && this.displayRef.value != ""){
                displayValid = true;
            }
            if(!this.props.required){
                displayValid = true;
            }

            return this.anchorRef.validity.valid 
                    && displayValid
        }
    }
    onDisplayBlur = () => {
        
        if(this.props.addMode){
            const valid = this.checkValidity();
            if(!valid){
                this.setState({
                    error: true
                });
            }
        }
    }

    render() {

        const { lookupIdLabel, lookupIdPlaceholder,
            descriptionLabel, descriptionPlaceholder, codeType, required, classes, descriptionVisible } = this.props;
        const open = Boolean(this.state.anchorEl);


        const list = this.generateList();

        return (
            <Grid container>
                <Grid container spacing={0} style={{ alignItems: 'center' }}>
                    <Grid item>
                        <FStrField
                            // error={this.state.error} 
                            required={required}
                            error={this.state.error}
                            variant="outlined"
                            label={lookupIdPlaceholder}
                            value={this.state.pFieldValue}
                            onKeyDown={this.lookupId_onKeyDown}
                            //inputRef={ref => { this.anchorRef = ref }}
                            componentRef={ref => { this.anchorRef = ref }}
                            onBlur={this.lookupId_onBlur}
                            onChange={this.lookupId_onChange}
                            // InputProps={{
                            //     className: classes.input
                            // }}
                            InputLabelProps={{ shrink: true }}
                            disabled={this.props.disabled}
                            format={this.props.format} />
                    </Grid>
                    {descriptionVisible ? <Grid item>
                        <ArrowRightOutlined color="secondary"/>
                    </Grid> : null}
                    {descriptionVisible ? <Grid item hidden={!descriptionVisible}>
                        <TextField
                            required={this.props.required && this.props.addMode}
                            variant="outlined"
                            inputProps={{ readOnly: !this.props.addMode, tabIndex: this.props.addMode ? 0 : -1 }}
                            label={descriptionPlaceholder}
                            value={this.state.sFieldValue}
                            onChange={this.desc_onChange}
                            InputProps={{
                                className: classes.input
                            }}
                            InputLabelProps={{ shrink: true }}
                            disabled={this.props.disabled}
                            inputRef={ref => this.displayRef=ref}
                            onBlur={this.onDisplayBlur} />
                    </Grid>: null}
                </Grid>
                <Popover
                    open={open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    onClose={this.closePopover}>
                    <Paper >
                        <Paper  >
                            {list}
                            {/* <List component="nav" className={classes.list}>
                                    <ListItem>
                                            <ListItemText primary={lookupIdLabel}/>
                                            <ListItemText primary={descriptionLabel}/>
                                    </ListItem>
                                    <Divider component="li" />
                                    <Paper className={classes.paper}>
                                        
                                    </Paper> 
                                </List>                               */}
                        </Paper>
                        <Paper>
                            <Typography className={classes.label} align='center' color='primary'>{codeType}</Typography>
                        </Paper>
                    </Paper>
                </Popover>

            </Grid>
        );
    }
}

export default withStyles(styles)(FLookupFieldList);
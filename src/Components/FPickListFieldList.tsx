import React, {
    FunctionComponent, Fragment,
    useState, useEffect, useRef, useCallback, useImperativeHandle
} from 'react';
import { StringFormat } from './StringFormat';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import FStrField from './FStrField';
import ArrowRightOutlined from '@material-ui/icons/ArrowRightOutlined';
import { TextField, makeStyles } from '@material-ui/core';
import MaterialTable, { Column } from 'material-table';
import Axios from 'axios';

const useStyles = makeStyles({

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
    componentRef?: (ref: any) => void,
    dataRef?: (ref: any) => void,
    value?: any,
    disabled?: boolean,
    format?: StringFormat;
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

const FPickListField: FunctionComponent<FPickListFieldProps>
    = ({
        onBlur = () => { },
        onFocus = () => { },
        onChange = () => { },
        required = false,
        variant,
        tableName,
        pickListName,
        pickListArgs,
        dbConnName,
        addMode = false,
        descriptionVisible = true,
        data: propData,
        searchWindow,
        onResultChange,
        componentRef,
        dataRef,
        value,
        disabled = false,
        format = StringFormat.type_x
    }, ref) => {



        const [anchorEl, setAnchorEL] = useState(null);
        const [pickId, setPickId] = useState("");
        const [pickDesc, setPickDesc] = useState("");
        const [error, setError] = useState(false);
        const [showSearchWindow, setShowSearchWindow] = useState(false);
        const [pickListData, setPickListData] = useState<FPickListData | undefined>(undefined);
        
        let pickFieldRef: any = useRef(null);
        let callInProgress = useRef(false);
        let displayRef: any;

        const CONTROLS_API_URL: { current: string | undefined } = useRef("");
        const isValid = useRef(false);

        let data: FPickListResult = { pickId: undefined };
        const pagenation = {
            totalPages: 0,
            currentPage: 0
        }

        useImperativeHandle(ref, () => {
            return {
                componentRef: pickFieldRef.current,
                data: data,
                checkValidity: () => {

                    if (addMode) {
                        return pickFieldRef.current.validity.valid && displayRef.validity.valid
                    }
                    else {
            
                        let displayValid = false;
                        if (required && displayRef.value != "") {
                            displayValid = true;
                        }
                        if (!required) {
                            displayValid = true;
                        }
            
                        return pickFieldRef.current.validity.valid
                            && displayValid
                    }


                }
            }
        });


        useEffect(() => {
            CONTROLS_API_URL.current = process.env.REACT_APP_CONTROLS_API_URL || undefined;
            
        }, [])
        useEffect(() => {
            
            if (!addMode) {
                if ((propData && propData.pickId) || value) {
    
                    let pickId;
                    if (propData && propData.pickId) {
                        pickId = propData.pickId;
                    }
                    else {
                        pickId = value;
                    }
    
                    onLoadfetchListCheckInitPicklistDB(pickId, (result) => {
    
                        const { PiclistOrder, DictOne } = result;
                        const PicklistTBOrderArr = PiclistOrder.split(",");
                        setPickId(DictOne[PicklistTBOrderArr[0].trim()]);
                        setPickDesc(DictOne[PicklistTBOrderArr[1].trim()]);
                        isValid.current = true; 

                        
                    }, (error) => {
    
                        isValid.current = false;
                        setPickId("");
                        setPickDesc("");
                        pickFieldRef.current.focus();
                        if (error !== null) {
                            alert("Network error");
                        }
                    })
                }
            }
            
        }, [])
        useEffect(() => {
            // if (addMode) {
            raiseResultChangeEvent();
            //}
        }, [pickId && pickDesc])

        useEffect(() => {
            if (!addMode) {
                
                if (value) {
    
                    const pickId = value;
                    onLoadfetchListCheckInitPicklistDB(pickId, (result) => {
    
                        const { PiclistOrder, DictOne } = result;
                        const PicklistTBOrderArr = PiclistOrder.split(",");
                        setPickId(DictOne[PicklistTBOrderArr[0].trim()]);
                        setPickDesc(DictOne[PicklistTBOrderArr[1].trim()]);
                        isValid.current = true; 

                        
                    }, (error) => {
    
                        isValid.current = false;
                        setPickId("");
                        setPickDesc("");
                        pickFieldRef.current.focus();
                        if (error !== null) {
                            alert("Network error");
                        }
                    })
                }

                if(!value){
                    console.log("calling !value")
                    setPickId("");
                    setPickDesc("");
                }
            }
            else{
                if(value){
                    setPickId(value);
                }
            }
        }, [value])

        useEffect(() => {
            if (!addMode) {
                
                if (propData && propData.pickId) {
    
                    let pickId;
                    pickId = propData.pickId;
                    onLoadfetchListCheckInitPicklistDB(pickId, (result) => {
    
                        const { PiclistOrder, DictOne } = result;
                        const PicklistTBOrderArr = PiclistOrder.split(",");
                        setPickId(DictOne[PicklistTBOrderArr[0].trim()]);
                        setPickDesc(DictOne[PicklistTBOrderArr[1].trim()]);
                        isValid.current = true; 

                        
                    }, (error) => {
    
                        isValid.current = false;
                        setPickId("");
                        setPickDesc("");
                        pickFieldRef.current.focus();
                        if (error !== null) {
                            alert("Network error");
                        }
                    })
                }

                if(!propData || !propData.pickId){
                    console.log("calling !value")
                    setPickId("");
                    setPickDesc("");
                }
            }
            else{
                if(propData && propData.pickId){
                    setPickId(propData.pickId);
                }
            }
        }, [propData])

        const onLoadfetchListCheckInitPicklistDB = async (pickId, success, error) => {
            try {
                const url = CONTROLS_API_URL.current + "ListCheckInitPicklistDB";
                //const { tableName, pickListName, pickListArgs, dbConnName } = this.props;
                const data = {
                    TableName: tableName,
                    PicklistName: pickListName,
                    ParamArr: pickListArgs,
                    TBVal: pickId.toString(),
                    DbConnName: dbConnName,
                    KeyVal: pickId.toString()
                }
    
                let response = await Axios.post(url, data);
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

        const fetchListGetInitPicklistDB = async (success, error) => {

            try {
                const url = CONTROLS_API_URL.current + "ListGetInitPicklistDB?tot=" + pagenation.totalPages;
                //const { tableName, pickListName, pickListArgs, dbConnName } = this.props;
                const data = {
                    TableName: tableName,
                    PicklistName: pickListName,
                    ParamArr: pickListArgs,
                    TBVal: pickFieldRef.current.value,
                    DbConnName: dbConnName,
                    Pagen: pagenation.currentPage
                }
                let response = await Axios.post(url, data);
                const result = await response.data;
                setPickListData(result);
                success();
            }
            catch (ex) {
                error(ex);
            }
        }

        const searchOnF2 = () => {
            if (!addMode) {

                setPickListData(undefined);
                fetchListGetInitPicklistDB(() => {

                    setAnchorEL(pickFieldRef.current);

                }, (ex) => {
                    console.log(ex);
                });
            }
        }

        const onSearchKeyDown = (evt) => {

            if (evt.key === "F2") {

                if (evt.shiftKey) {
                    if (!searchWindow) {
                        alert("No Advance Search Avaialbale");
                    }
                    else {
                        //alert("Advance Search Avaialbale");
                        setShowSearchWindow(true);
                    }

                    return;
                }
                else {
                    setError(false);
                    searchOnF2();
                }
            }
            if (evt.key === "Tab") {
                searchOnTab();
            }
        }
        const fetchListCheckInitPicklistDB = async (success, error) => {

            if (pickId) {
                try {
                    const url = CONTROLS_API_URL.current + "ListCheckInitPicklistDB";
                    //const { tableName, pickListName, pickListArgs, dbConnName } = this.props;
                    const data = {
                        TableName: tableName,
                        PicklistName: pickListName,
                        ParamArr: pickListArgs,
                        TBVal: pickId.toString(),
                        DbConnName: dbConnName,
                        KeyVal: pickId.toString()
                    }

                    let response = await Axios.post(url, data);
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
        const searchOnTab = () => {
            const pickIdVal = pickId;
            if (pickIdVal && pickIdVal !== "" && !addMode) {

                fetchListCheckInitPicklistDB((result) => {

                    const { PiclistOrder, DictOne } = result;
                    const PicklistTBOrderArr = PiclistOrder.split(",");
                    setPickId(DictOne[PicklistTBOrderArr[0].trim()]);
                    setPickDesc(DictOne[PicklistTBOrderArr[1].trim()])
                    //setError(false);
                    isValid.current = true;

                    // this.setState({
                    //     pickId: DictOne[PicklistTBOrderArr[0].trim()],
                    //     pickDesc: DictOne[PicklistTBOrderArr[1].trim()]
                    // }, () => {
                    //     this.isValid = true;
                    //     this.raiseResultChangeEvent();
                    // });
                }, (error) => {

                    isValid.current = false;
                    setPickDesc("");
                    setError(true);
                    pickFieldRef.current.focus();
                    if (error !== null) {
                        //alert("Network error");
                    }
                });
            }
        }

        const onPickIdChange = useCallback((evt) => {

            setPickId(evt.target.value);
            setPickDesc("");
            setError(false);
            isValid.current = false;
        }, []);
        const onPickIdBlur = useCallback(() => {

            const valid = pickFieldRef.current.validity.valid;
            if (!valid) {
                setError(true);
            }
            else {
                setError(false);
            }

        }, []);
        const onDescChange = useCallback((evt) => {

            if(addMode){
                setPickDesc(evt.target.value)
            }

         }, []);
        const onItemSelect = (evt, selectedRow) => {

            if (pickListData) {
                const { PiclistOrder } = pickListData;

                const PiclistOrderArr = PiclistOrder.split(",");

                setPickId(selectedRow[PiclistOrderArr[0]]);
                setPickDesc(selectedRow[PiclistOrderArr[1]])
                setAnchorEL(null);
                setError(false);

                // this.setState({
                //     pickId: selectedRow[PiclistOrderArr[0]],
                //     pickDesc: selectedRow[PiclistOrderArr[1]],
                //     anchorEl: null,
                //     error: false
                // }, () => {
                //     this.raiseResultChangeEvent();
                // });
            }
        }
        const generateList = () => {

            if (pickListData) {

                const { PicklistHeader, PickDt, PiclistOrder } = pickListData;
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
                        isLoading={!pickListData}
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
                        onRowClick={onItemSelect}
                        actions={[
                            {
                                icon: 'add',
                                tooltip: 'Select',
                                onClick: onItemSelect
                            }
                        ]}

                    />
                )

            }
        }
        const closePopover = () => { }

        const open = Boolean(anchorEl);
        const list = generateList();
        const classes = useStyles();

        const raiseResultChangeEvent = () => {
            data.pickId = pickId;
            data.pickDescription = pickDesc;

            if (onResultChange) {
                onResultChange({
                    pickId: pickId,
                    pickDescription: pickDesc ? (typeof pickDesc === 'number' ? pickDesc : pickDesc.trim()) : undefined
                });
            }
        }
        return (
            <Fragment>
                <Grid container spacing={0} style={{ alignItems: 'center' }}>
                    <Grid item >
                        <FStrField
                            variant="outlined"
                            required={required}
                            onKeyDown={onSearchKeyDown}
                            componentRef={ref => pickFieldRef.current = ref}
                            value={pickId}
                            onChange={onPickIdChange}
                            onBlur={onPickIdBlur}
                            error={error}
                            // InputProps={{
                            //     className: classes.input
                            // }}
                            InputLabelProps={{ shrink: true }}
                            disabled={disabled}
                            format={format} />
                    </Grid>
                    {descriptionVisible ? <Grid item >
                        <ArrowRightOutlined color="primary" />
                    </Grid> : null}
                    {descriptionVisible ? <Grid item >
                        <TextField variant="outlined"
                            required={required && addMode}
                            inputProps={{ readOnly: !addMode, tabIndex: addMode ? 0 : -1 }}
                            value={pickDesc}
                            onChange={onDescChange}
                            InputProps={{
                                className: classes.input
                            }}
                            InputLabelProps={{ shrink: true }}
                            disabled={disabled}
                            inputRef={ref => displayRef = ref} />
                    </Grid> : null}
                    <Popover anchorEl={anchorEl} open={open}
                        onClose={closePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}>
                        <Paper className={classes.paper}>
                            {list}
                        </Paper>
                    </Popover>
                </Grid>
            </Fragment>
        );

    }

export default React.memo(React.forwardRef(FPickListField));
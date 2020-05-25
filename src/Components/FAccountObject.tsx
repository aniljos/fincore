import React, { Component, Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Paper } from '@material-ui/core';
import axios from 'axios';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import FSearchWindow from './FSearchWIndow';

const styles = (theme) => ({
    list: {
        border: '2px solid blue',
        padding: 2,
        margin: 2,
        minWidth: 400
    },
    close: {
        margin: 2
    },
    paper: {
        maxHeight: 300,
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
    },
    inputStatic: {
        height: 25,
    }
});

interface IFAccountObjectProps {
    onBlur?(evt: any): void,
    onFocus?(evt: any): void,
    onChange?(evt: { text?: string, args?: any }): void,
    AcceptLevel?: string,
    variant?: any,
    required?: boolean,
    DbConnName?: string,
    HomeBranchCode?: string,
    ModuleFilter?: string,
    UsrGrpCd?: number,
    CustNoFilter?: string,
    HideClosedAccounts?: boolean,
    BranchCode?: string,
    classes?: any;
    PickAddMode?: string,
    Text?: string,
    SearchWindow?: any,
    descVisible: boolean,
    disabled? : boolean
}
interface IFAccountObjectState {
    products: Array<any>,
    accounts: Array<any>,
    subAccounts: Array<any>,
    open: boolean,
    placement: string,
    disablePortal: boolean,
    error: boolean,
    accountError: boolean,
    subAccountError: boolean,
    productId: string,
    accountId: string,
    subAccountId: string,
    description: string,
    productTBDisabled: boolean,
    accountTBDisabled: boolean,
    subAccountTBDisabled: boolean,
    anchorEl: any,
    showSearchWindow: boolean,
    text: string
}
export enum ImplementationLevel { P, A, S, T }
export interface IFAccountObjectEvtArgs {
    id: string,
    desc: string,
    productNo: string,
    accountNo: string,
    subAccountNo: string,
    implementationLevel: string | undefined,
    curCd: string | undefined,
    autoGenAcct: string | undefined,
    autoGenSubAcct: string | undefined,
    moduleType: number | undefined,
    custNo: number | undefined,
    prdStatus: number | undefined,
    accStatus: number | undefined,
    subAccStatus: number | undefined,
    prdAuthNeeded: number | undefined,
    accAuthNeeded: number | undefined,
    subAccAuthNeeded: number | undefined
}

export interface IAccountObjectProduct {
    AutoGenAcct?: string;
    AutoGenSubAcct?: string;
    CurCd?: string;
    DbtrAuthNeeded?: number;
    ImplementationLevel?: string;
    ModuleType?: number;
    ProductId: string;
    ProductName?: string;
    Status?: number;
}
export interface IAccountObjectAccount {

    AccountNo: string;
    AccountStatus?: string;
    CustNo?: number;
    DbtrAuthNeeded?: number;
    FullName?: string;
    NameTittle?: string;
    ShortAccountNo?: string;
    Status?: number;
}
export interface IAccountObjectSubAccount {

    DbtrAuthNeeded?: number;
    FullName?: string;
    ReceiptNo?: string;
    ReceiptStatus?: string;
    ShortReceiptNo?: string;
    Status?: number;
}
const BLANK_ACC = "        000000000000000000000000";
export class FAccountObject extends Component<IFAccountObjectProps, IFAccountObjectState> {

    static defaultProps = {

        onBlur: (evt?: any): void => { },
        onFocus: (evt?: any): void => { },
        onChange: (evt?: any): void => { },
        variant: "outlined",
        required: false,
        DbConnName: "",
        HomeBranchCode: "0",
        ModuleFilter: "",
        UsrGrpCd: 1,
        CustNoFilter: "",
        HideClosedAccounts: false,
        text: "",
        descVisible: true,
        disabled: false
    }

    private prdIdRef: any;
    private accIdRef: any;
    private subIdRef: any;
    private anchorRef: any;
    private showProductTable = false;
    private showAccountTable = false;
    private showSubAccountTable = false;

    private product: IAccountObjectProduct = { ProductId: "" };
    private account: IAccountObjectAccount = { AccountNo: "" };
    private subAccount: IAccountObjectSubAccount = {}
    private CONTROLS_API_URL: string | undefined;

    private implementationLevel: string | undefined;
    private cacAuthNeeded: number | undefined = 0
    private curCd: string | undefined;
    private autoGenAcct: string | undefined;
    private autoGenSubAcct: string | undefined;
    private moduleType: number | undefined = 0;
    private custNo: number | undefined = 0;
    private prdAuthNeeded: number | undefined = 0;
    private subAccAuthNeeded: number | undefined = 0;
    private accNameTitle: string | undefined = ""
    private accName: string | undefined = ""

    private prdStat: number | undefined = 0;
    private accStat: number | undefined = 0;
    private subAccStat: number | undefined = 0;

    private text: string = BLANK_ACC;

    state = {
        products: [],
        accounts: [],
        subAccounts: [],
        open: false,
        placement: 'bottom-start',
        disablePortal: false,
        error: false,
        accountError: false,
        subAccountError: false,
        productId: "",
        accountId: "",
        subAccountId: "",
        description: "",
        productTBDisabled: false,
        accountTBDisabled: true,
        subAccountTBDisabled: true,
        anchorEl: null,
        showSearchWindow: false,
        text: ""
    }
    constructor(props) {

        super(props);
        //console.log("FAccountObject const");
        this.CONTROLS_API_URL = process.env.REACT_APP_CONTROLS_API_URL;
        if (this.props.Text) {

            if (this.props.Text.trim() === "") {
                this.state.text = this.text;
            }
            else {
                this.state.text = this.props.Text;
                this.text = this.props.Text
                this.setTextFieldValues();
            }
        }
        else {
            this.state.text = this.text;
        }
        // console.log("State Text: ", this.state.text);
        // console.log("Text: ", this.text);
    }

    setTextFieldValues = () => {

        //console.log(this.text, "--", this.text.length);
        if (this.text.length === 32) {
            let productId = "";
            let accountId = "";
            let subAccountId = "";

            let n_accId = 0
            let n_subAccId = 0

            productId = this.text.substr(0, 8);
            this.implementationLevel = "P";
            

            n_accId = parseInt(this.text.substr(16, 8));
            if(n_accId === 0){
                this.state.accountTBDisabled = true;
                accountId = "";
            }
            else{
                this.implementationLevel = "A";
                accountId = n_accId.toString();
                this.state.accountTBDisabled = false;
            }

            n_subAccId = parseInt(this.text.substr(24, 8));
            if(n_subAccId === 0){
                this.state.subAccountTBDisabled = true;
                subAccountId = "";
            }
            else{
                this.implementationLevel = "S";
                subAccountId = n_subAccId.toString();
                this.state.subAccountTBDisabled = false;
                
            }

            this.state.productId = productId;
            this.state.accountId= accountId;
            this.state.subAccountId= subAccountId;
        }
    }

    raiseChangeEvent = (evtArgs?: IFAccountObjectEvtArgs) => {
        if (this.props.onChange) {

            let accountEventArgs: IFAccountObjectEvtArgs = {

                id: this.text,
                desc: this.state.description,
                productNo: this.state.productId,
                accountNo: this.state.accountId,
                subAccountNo: this.state.subAccountId,
                implementationLevel: this.implementationLevel,
                moduleType: this.moduleType!,
                curCd: this.curCd,
                autoGenAcct: this.autoGenAcct,
                autoGenSubAcct: this.autoGenSubAcct,
                custNo: this.custNo,
                prdStatus: this.prdStat,
                accStatus: this.accStat,
                subAccStatus: this.subAccStat,
                prdAuthNeeded: this.prdAuthNeeded,
                accAuthNeeded: this.cacAuthNeeded,
                subAccAuthNeeded: this.subAccAuthNeeded
            }


            this.props.onChange({
                text: this.text,
                args: accountEventArgs
            });
        }
    }

    onChangeProductId = (evt) => {

        if (!evt.target.value || evt.target.value === "") {
            this.text = BLANK_ACC;
            this.raiseChangeEvent();
        }

        this.setState({
            productId: evt.target.value,
            accountId: "",
            subAccountId: "",
            description: "",
            accountTBDisabled: true,
            subAccountTBDisabled: true,
            error: false,
            accountError: false,
            subAccountError: false
        });
    }
    onChangeAccountId = (evt) => {
        this.setState({
            accountId: evt.target.value,
            subAccountId: "",
            accountError: false,
            subAccountError: false,
            //description: ""
        })
    }
    onChangeSubAccountId = (evt) => {

        if(this.state.accountId !== ""){
            this.setState({
                subAccountId: evt.target.value,
                subAccountError: false
            })
        }
        
    }
    fetchDataGetAccountsDBCustNoFilter = async (success, error) => {

        try {

            const { BranchCode, CustNoFilter, DbConnName, HideClosedAccounts } = this.props;
            let url = this.CONTROLS_API_URL + "GetAccountsDBCustNoFilter";
            let From = 0;
            if (this.state.accountId !== "") {
                From = parseInt(this.state.accountId);
            }
            const data = {
                LBrCode: BranchCode,
                Product: this.state.productId,
                From,
                Pagen: 0,
                HideClosedAccounts,
                DbConnName,
                CustNoFilter
            }
            //console.log(data);
            const response = await axios.post(url, data);
            const result = await response.data;
            this.setState({
                accounts: result
            });
            //console.log(result);
            success();

        } catch (ex) {
            error();
        }
    }
    private fetchDataCheckAccountsDBCustNoFilter = async (success, error) => {

        try {

            const { BranchCode, CustNoFilter, DbConnName, HideClosedAccounts } = this.props;
            let url = this.CONTROLS_API_URL + "CheckAccountsDBCustNoFilter";
            let From = 0;
            if (this.state.accountId !== "") {
                From = parseInt(this.state.accountId);
            }
            const data = {
                LBrCode: BranchCode,
                Product: this.state.productId,
                From,
                Pagen: 0,
                HideClosedAccounts,
                DbConnName,
                CustNoFilter
            }
            //console.log(data);
            const response = await axios.post(url, data);
            const result = await response.data;
            success(result);

        } catch (ex) {
            error();
        }
    }
    private fetchDataGetProductDBCustNoFilter = async (success, error) => {

        try {
            const { BranchCode, HomeBranchCode, CustNoFilter, DbConnName, ModuleFilter, UsrGrpCd } = this.props;
            let url = this.CONTROLS_API_URL + "GetProductDBCustNoFilter";

            const data = {
                LBrCode: BranchCode,
                HomeLBrCode: HomeBranchCode,
                CustNoFilter,
                DbConnName,
                ModuleString: ModuleFilter,
                UsrGrpCd,
                ProdLike: this.prdIdRef.value
            }

            //console.log(data);
            const response = await axios.post(url, data);
            const result = await response.data;
            this.setState({
                products: result
            });
            //console.log(result);
            success();
        } catch (err) {
            //console.log(err);
            error()
        }

    }
    private fetchDataGetSubAccountDBCustNoFilter = async (success, error) => {

        try {

            const { BranchCode, CustNoFilter, DbConnName, ModuleFilter, HideClosedAccounts } = this.props;
            let url = this.CONTROLS_API_URL + "GetSubAccountDBCustNoFilter";
            let Product = this.state.productId;
            let Acc = 1;
            if (this.state.accountId !== "") {
                Acc = parseInt(this.state.accountId);
            }
            let From = 0;
            if (this.state.subAccountId !== "") {
                From = parseInt(this.state.subAccountId);
            }
            const data = {
                LBrCode: BranchCode,
                Product,
                Acc,
                ModuleType: this.product.ModuleType,
                From,
                Pagen: 0,
                HideClosedAccounts,
                DbConnName,
                CustNoFilter
            }
            //console.log(data);
            const response = await axios.post(url, data);
            const result = await response.data;
            //this.subAccounts = { ...result };
            this.setState({
                subAccounts: result
            });
            success();

        } catch (err) {
            error();
        }
    }

    private fetchDataCheckSubAccountDBCustNoFilter = async (success, error) => {

        try {

            const { BranchCode, CustNoFilter, DbConnName, ModuleFilter } = this.props;
            let url = this.CONTROLS_API_URL + "CheckSubAccountDBCustNoFilter";
            let Product = this.state.productId;
            let acc = 0;
            if (this.state.accountId !== "") {
                acc = parseInt(this.state.accountId) | 0;
            }
            let receipt = 0;
            if (this.state.subAccountId !== "") {
                receipt = parseInt(this.state.subAccountId) | 0
            }
            const data = {
                LBrCode: BranchCode,
                Product,
                Acc: acc,
                ModuleType: this.product.ModuleType,
                DbConnName,
                CustNoFilter,
                Receipt: receipt
            }
            const response = await axios.post(url, data);
            const result = await response.data;
            success(result);

        } catch (err) {
            error()
        }

    }

    private fetchDataCheckProductDBCustNoFilter = async (success, error) => {

        try {
            const { BranchCode, HomeBranchCode, CustNoFilter, DbConnName, ModuleFilter, UsrGrpCd } = this.props;
            let url = this.CONTROLS_API_URL + "CheckProductDBCustNoFilter";

            const data = {
                LBrCode: BranchCode,
                HomeLBrCode: HomeBranchCode,
                CustNoFilter,
                DbConnName,
                ModuleString: ModuleFilter,
                UsrGrpCd,
                ProdLike: this.prdIdRef.value
            }

            //console.log(data);
            const response = await axios.post(url, data);
            const result = await response.data;
            success(result);
        } catch (err) {

            error()
        }

    }
    private setFieldsByModuleType = () => {

        let product = this.product;
        let implementationLevel = product.ImplementationLevel;
        //console.log(implementationLevel);
        switch (implementationLevel) {
            case "P":
                this.setState({
                    productTBDisabled: false,
                    accountTBDisabled: true,
                    subAccountTBDisabled: true
                });

                break;
            case "A":
                this.setState({
                    productTBDisabled: false,
                    accountTBDisabled: false,
                    subAccountTBDisabled: true
                }, () => {

                    this.accIdRef.focus();
                });

                break;

            case "S":
                this.setState({
                    productTBDisabled: false,
                    accountTBDisabled: false,
                    subAccountTBDisabled: false
                });
                this.accIdRef.focus();
                break;
            case "T":
                this.setState({
                    productTBDisabled: false,
                    accountTBDisabled: false,
                    subAccountTBDisabled: false
                });
                //console.log("case T");
                this.accIdRef.focus();
                break;

            default:
                //console.log("default");
                break;
        }
    }

    onProductKeyDown = (evt) => {

        if (evt.key === "F2") {

            if (evt.shiftKey) {
                if (this.props.SearchWindow) {

                    this.setState({
                        showSearchWindow: true
                    });

                }
                else {
                    alert("No Advance Search Avaialbale")
                }
            }
            else {
                this.showProductTable = true;
                this.fetchDataGetProductDBCustNoFilter(() => {
                    this.setState({
                        anchorEl: this.anchorRef,
                        error: false
                    })
                }, () => { });
            }



        }
        if (evt.key === "Tab") {
            if (evt.target.value && evt.target.value.trim() !== "") {
                this.fetchDataCheckProductDBCustNoFilter((result) => {

                    this.product = { ...result };
                    this.setState({
                        productId: result.ProductId.trim(),
                        description: result.ProductName,
                        error: false
                    }, () => {

                        this.setFieldsByModuleType();
                        this.setProductResultValues();
                        this.triggerValueChangedForProduct();
                        if (this.props.PickAddMode && this.implementationLevel === "A" && this.autoGenAcct === "Y") {
                            this.accStat = 0;
                            this.cacAuthNeeded = 0;
                        }
                        setTimeout(() => {
                            this.accIdRef.focus();
                        }, 100)
                        
                    });
                }, () => {
                    alert("Invalid Product Code");
                    this.setState({
                        error: true
                    });
                    this.prdIdRef.focus();
                });
            }
        }
    }
    onAccountKeyDown = (evt) => {
        if (evt.key === "F2") {

            if (evt.shiftKey && !(this.props.PickAddMode && this.implementationLevel === "A")) {
                if (this.props.SearchWindow) {

                    this.setState({
                        showSearchWindow: true
                    });

                }
                else {
                    alert("No Advance Search Avaialbale")
                }
            }
            else {
                this.showAccountTable = true;
                this.fetchDataGetAccountsDBCustNoFilter(() => {
                    this.setState({
                        anchorEl: this.anchorRef,
                        error: false,
                        accountError: false
                    })
                }, () => { });
            }


        }
        if (evt.key === "Tab") {
            this.fetchDataCheckAccountsDBCustNoFilter((result) => {

                if (this.props.PickAddMode && this.autoGenAcct != "Y" &&
                    (this.implementationLevel == "A" || (this.implementationLevel == "S" && this.props.AcceptLevel == "A"))) {

                    if (!result) {
                        let accountNo =
                            this.product.ProductId.trim().padEnd(8, ' ') + "00000000" + this.state.accountId.trim().padStart(8, '0') + "00000000";

                        this.account = {
                            AccountNo: accountNo,
                            ShortAccountNo: FAccountObject.toShortAccountNo(accountNo)
                        };
                        this.custNo = this.account.CustNo;
                        this.triggerValueChangedForAccount(this.account);
                    }
                    else {
                        alert("Account already exists");
                        this.setState({
                            description: "",
                            accountError: true
                        });
                    }

                } else {

                    if (result) {

                        this.account = result;
                        this.setAccountResultValues();
                        this.setState({
                            description: this.account.NameTittle + " " + this.account.FullName,
                            accountError: false,
                        });
                        this.accNameTitle = this.account.NameTittle;
                        this.accName = this.account.FullName;
                        this.triggerValueChangedForAccount(this.account);
                        if ((this.implementationLevel === "S" || this.implementationLevel === "T") && this.props.AcceptLevel !== "A")
                            this.subIdRef.focus();
                        else {
                            this.setState({
                                subAccountTBDisabled: true
                            })
                        }
                    }
                    else {

                        alert("Invalid Account Code");
                        this.setState({
                            subAccountId: "",
                            accountError: true,
                            description: ""
                        }, () => {
                            setTimeout(() => {
                                this.accIdRef.focus();
                            }, 100)
                        })
                    }

                }
            },
                () => {
                    this.setState({
                        accountError: true
                    })
                    this.accIdRef.focus();
                });
        }
    }
    onSubAccountKeyDown = (evt) => {
        if (evt.key === "F2") {

            if (evt.shiftKey && !(this.props.PickAddMode && this.implementationLevel === "A")) {

                if (this.props.SearchWindow) {

                    this.setState({
                        showSearchWindow: true
                    });

                }
                else {
                    alert("No Advance Search Avaialbale")
                }
            }
            else {

                this.showSubAccountTable = true;
                this.fetchDataGetSubAccountDBCustNoFilter(() => {
                    this.setState({
                        anchorEl: this.anchorRef,
                        error: false
                    })
                }, () => { });
            }
        }
        if (evt.key === "Tab") {
            this.showSubAccountTable = false;
            this.fetchDataCheckSubAccountDBCustNoFilter((result) => {

                const { PickAddMode } = this.props;

                if (PickAddMode && this.autoGenSubAcct !== "Y") {

                    if (!result) {
                        this.subAccount = result;
                        this.subAccount.ReceiptNo = this.state.productId.trim().padEnd(8, ' ') +
                            "00000000" +
                            this.state.accountId.trim().padStart(8, '0') +
                            this.state.subAccountId.trim().padStart(8, '0');
                        this.subAccount.ShortReceiptNo = FAccountObject.toShortAccountNo(this.subAccount.ReceiptNo);
                        this.subAccStat = 0;
                        this.subAccAuthNeeded = 0;
                        this.triggerValueChangedForSubAccountNumber(this.subAccount);
                        this.setState({
                            subAccountError: false
                        });
                    }
                    else {

                        alert("Receipt Number Already Present")
                        this.setState({
                            subAccountError: true
                        }, () => {
                            setTimeout(() => {
                                this.subIdRef.focus();
                            }, 100)
                        });
                        this.text = BLANK_ACC;
                        this.raiseChangeEvent();
                    }
                }
                else {

                    if (!result) {
                        
                        alert("Invalid Receipt No.");
                        this.setState({
                            subAccountError: true
                        }, () => {
                            setTimeout(() => {
                                this.subIdRef.focus();
                            })
                        });
                        this.text = BLANK_ACC;
                        this.raiseChangeEvent();
                    }
                    else {

                        this.subAccount = result;
                        this.subAccStat = this.subAccount.Status;
                        this.subAccAuthNeeded = this.subAccount.DbtrAuthNeeded;
                        this.setState({
                            description: this.subAccount.FullName!,
                            subAccountError: false
                        });
                        this.triggerValueChangedForSubAccountNumber(this.subAccount);
                    }
                }


            }, () => {
                this.setState({
                    subAccountError: true
                })
                setTimeout(() => {
                    this.subIdRef.focus();
                }, 0)

            })
        }
    }

    triggerValueChangedForProduct = () => {

        let product = this.product;
        const { AcceptLevel, PickAddMode } = this.props;

        if (product.ImplementationLevel === "P" || AcceptLevel === "P") {
            this.text = product.ProductId.padEnd(8, ' ') + "000000000000000000000000";
            this.setState({
                accountTBDisabled: true,
                subAccountTBDisabled: true
            }, () => {
                this.raiseChangeEvent();
            })
        }
        else if (product.ImplementationLevel === "A" && PickAddMode && this.autoGenAcct === "Y") {
            this.accStat = 0;
            this.cacAuthNeeded = 0;
            this.text = product.ProductId.padEnd(8, ' ') + "000000000000000000000000";
            this.setState({
                accountTBDisabled: true,
                subAccountTBDisabled: true
            }, () => {
                this.raiseChangeEvent();
            });
            //console.log("Text: ", this.text);
        }
        else if (product.ImplementationLevel == "S" && PickAddMode && this.autoGenAcct == "Y" && AcceptLevel == "A") {
            this.accStat = 0;
            this.subAccStat = 0;
            this.cacAuthNeeded = 0;
            this.subAccAuthNeeded = 0;
            this.text = product.ProductId.padEnd(8, ' ') + "000000000000000000000000";
            this.setState({
                accountTBDisabled: true,
                subAccountTBDisabled: true
            }, () => {
                this.raiseChangeEvent()
            });

        }
        else if (product.ImplementationLevel == "S" && PickAddMode && this.autoGenSubAcct == "Y") {
            this.subAccStat = 0;
            this.subAccAuthNeeded = 0;
            this.setState({
                subAccountTBDisabled: true
            });
            return;
        }
        else
            return;
    }

    triggerValueChangedForAccount = (account: IAccountObjectAccount) => {

        const { AcceptLevel, PickAddMode } = this.props;
        const { implementationLevel, autoGenSubAcct } = this;

        if (implementationLevel === "A" || (implementationLevel === "S" && AcceptLevel === "A")) {

            this.setTextOnAccountChanged(account);
            this.raiseChangeEvent();
        }
        else if (implementationLevel === "S" && PickAddMode && autoGenSubAcct == "Y") {

            this.setTextOnAccountChanged(account);
            this.setState({
                subAccountTBDisabled: true
            }, () => {
                this.raiseChangeEvent();
            })
        }
        else if (implementationLevel == "S" && PickAddMode && AcceptLevel == "A") {

            this.setTextOnAccountChanged(account);
            this.setState({
                subAccountTBDisabled: true
            }, () => {
                this.raiseChangeEvent();
            })

        }
        else {
            return;
        }
    }

    triggerValueChangedForSubAccountNumber = (subAccount: IAccountObjectSubAccount) => {

        const { implementationLevel } = this;

        if (implementationLevel == "S" || implementationLevel == "T") {
            // console.log(this.product.ProductId.trim().padEnd(8, ' '))
            // console.log("00000000");
            // console.log(this.state.accountId.padStart(8, '0'));
            // console.log(subAccount.ShortReceiptNo!.split('/')[2].trim().padStart(8, '0'));

            this.text = this.product.ProductId.trim().padEnd(8, ' ') + "00000000" + this.state.accountId.padStart(8, '0') + subAccount.ShortReceiptNo!.split('/')[2].trim().padStart(8, '0');
            
            //console.log(this.text);
        }
        else {
            return;
        }


        if (this.text.trim() !== "") {

            let accountEventArgs: IFAccountObjectEvtArgs = {

                id: this.text,
                desc: this.state.description,
                productNo: this.state.productId,
                accountNo: this.state.accountId,
                subAccountNo: this.state.subAccountId,
                implementationLevel: this.implementationLevel,
                moduleType: this.moduleType!,
                curCd: this.curCd,
                autoGenAcct: this.autoGenAcct,
                autoGenSubAcct: this.autoGenSubAcct,
                custNo: this.custNo,
                prdStatus: this.prdStat,
                accStatus: this.accStat,
                subAccStatus: this.subAccStat,
                prdAuthNeeded: this.prdAuthNeeded,
                accAuthNeeded: this.cacAuthNeeded,
                subAccAuthNeeded: this.subAccAuthNeeded
            }
            this.raiseChangeEvent(accountEventArgs);
        }

    }

    onBlurProductId = (evt) => {
        //console.log(evt.target.value);

    }
    onBlurAccountId = (evt) => {

    }


    productRowSelect = (evt, selectedProduct) => {

        console.log(selectedProduct);
        this.showProductTable = false;
        this.product = {
            ...selectedProduct
        };
        let productId = selectedProduct["ProductId"].trim();
        this.setState(() => {
            return {
                productId: productId,
                description: selectedProduct["ProductName"].trim(),
                anchorEl: null
            }
        }, () => {

            this.setFieldsByModuleType();
            this.setProductResultValues();
            this.triggerValueChangedForProduct();
            //console.log(this.accIdRef);
            setTimeout(() => {
                this.accIdRef.focus();
            }, 100)
        });

    }
    accountRowSelect = (evt, selectedAccount) => {
        this.showAccountTable = false;
        this.account = { ...selectedAccount }
        //console.log("Account: " + this.account, this.account.AccountNo);
        let accountId = selectedAccount["ShortAccountNo"].split("/")[1];
        this.setState({
            accountId: accountId,
            description: this.account.NameTittle + " " + this.account.FullName,
            anchorEl: null
        }, () => {
            this.setAccountResultValues();
            this.triggerValueChangedForAccount(this.account)
            setTimeout(() => {
                this.subIdRef.focus();
            }, 100)
        });
    }

    subAccountRowSelect = (evt, selectedSubAccount) => {

        this.showSubAccountTable = false;
        this.subAccount = { ...selectedSubAccount };
        let subAccountId = selectedSubAccount["ShortReceiptNo"].split("/")[2];
        this.setState({
            subAccountId: subAccountId,
            description: this.subAccount.FullName!,
            anchorEl: null
        }, () => {
            this.subAccStat = this.subAccount.Status;
            this.subAccAuthNeeded = this.subAccount.DbtrAuthNeeded;
            this.triggerValueChangedForSubAccountNumber(this.subAccount);
        })
    }
    closePopover = () => {
        //console.log("onclose");
        this.setState({
            anchorEl: null,
            products: [],
            accounts: []
        });
        this.showProductTable = false;
        this.showAccountTable = false;
        this.showSubAccountTable = false;
    }

    private setTextOnAccountChanged(account: IAccountObjectAccount) {

        const { ShortAccountNo } = account;
        this.text = this.product.ProductId.trim().padEnd(8, ' ') + "00000000" + ShortAccountNo!.split('/')[1].toString().trim().padStart(8, '0') + "00000000";
    }

    private setAccountResultValues() {
        this.accStat = this.account.Status;
        this.cacAuthNeeded = this.account.DbtrAuthNeeded;
        this.custNo = this.account.CustNo;
    }

    private setProductResultValues() {
        this.implementationLevel = this.product.ImplementationLevel;
        this.curCd = this.product.CurCd;
        this.prdStat = this.product.Status;
        this.prdAuthNeeded = this.product.DbtrAuthNeeded;
        this.autoGenAcct = this.product.AutoGenAcct;
        this.autoGenSubAcct = this.product.AutoGenSubAcct;
        this.custNo = 0;
    }

    generateProductTable() {

        if (this.state.products) {
            return (
                <MaterialTable
                    title="Products"
                    columns={[
                        { title: "Product ID", field: "ProductId" },
                        { title: "Product Name", field: "ProductName" },
                    ]}
                    data={this.state.products}
                    onRowClick={this.productRowSelect}
                    options={{
                        filtering: true
                    }}
                />
            )
        }
    }
    generateAccountTable() {

        if (this.state.accounts) {
            return (
                <MaterialTable
                    title="Accounts"
                    columns={[
                        { title: "Account ID", field: "ShortAccountNo" },
                        { title: "Account Holder's Name", field: "FullName" },
                        { title: "Account Status", field: "AccountStatus" },
                    ]}
                    data={this.state.accounts}
                    onRowClick={this.accountRowSelect}
                />
            )
        }
    }
    generateSubAccountTable() {

        if (this.state.subAccounts) {
            return (
                <MaterialTable
                    title="SubAccounts"
                    columns={[
                        { title: "Account ID", field: "ShortReceiptNo" },
                        { title: "Account Holder's Name", field: "FullName" },
                        { title: "Account Status", field: "ReceiptStatus" },
                    ]}
                    data={this.state.subAccounts}
                    onRowClick={this.subAccountRowSelect}
                />
            )
        }
    }

    componentDidMount() {

    }

    onSearchWindowClose = () => {
        this.setState({
            showSearchWindow: false
        });
    }

    static toShortAccountNo(str: string) {

        if (str.length !== 32) {
            return str;
        }
        else {

            try {

                if (parseInt(str.substring(24, 8)) === 0) {
                    str = str.substring(0, 8).trim() + "/" + parseInt(str.substring(16, 8)) || "0"
                }
                else {
                    str = str.substring(0, 8).trim() + "/"
                        + parseInt(str.substring(16, 8)) || "0"
                        + "/"
                        + parseInt(str.substring(28, 8)) || "0"
                }
                return str;

            } catch (error) {
                return str;
            }
        }
    }

    expandAccName = () => {

        
        const {implementationLevel} = this;

        if(implementationLevel === "P"){
            
            this.fetchDataCheckProductDBCustNoFilter((result) => {

                if(result !== null){
                    let productData: IAccountObjectProduct = result;
                    this.setState({
                        description: productData.ProductName!
                    });
                }

            }, () => {

            })
        }
        else if(implementationLevel === "A" || implementationLevel === "S"){

            this.fetchDataCheckAccountsDBCustNoFilter((result) => {

                if(result !== null){
                    let accountData: IAccountObjectAccount  = result;
                    this.setState({
                        description: accountData.NameTittle + " " + accountData.FullName
                    });
                    this.custNo = accountData.CustNo;
                }

            }, () => {});
        }

    }

    clearValues =  () => {

        this.setState({
            productId: "",
            accountId: "",
            subAccountId: "",
            description: "",

        });
        this.text = "";

    }
    

    render() {

        const { classes, descVisible } = this.props;
        const open = Boolean(this.state.anchorEl);
        let productTable: any = null;
        let accountTable: any = null;
        let subAccountTable: any = null;
        if (this.showProductTable) {
            productTable = this.generateProductTable();
        }
        if (this.showAccountTable) {
            accountTable = this.generateAccountTable();
        }
        if (this.showSubAccountTable) {
            subAccountTable = this.generateSubAccountTable();
        }



        return (
            <Fragment>
                {this.props.SearchWindow && this.state.showSearchWindow ? <FSearchWindow contents={this.props.SearchWindow} onClose={this.onSearchWindowClose} /> : null}
                <Grid container>
                    <Grid container spacing={1} justify="center">
                        <Grid item xs={4}>
                            <TextField
                                variant={this.props.variant}
                                error={this.state.error}
                                onKeyDown={this.onProductKeyDown}
                                inputRef={ref => { this.prdIdRef = ref }}
                                value={this.state.productId}
                                onChange={this.onChangeProductId}
                                onBlur={this.onBlurProductId}
                                disabled={this.state.productTBDisabled || this.props.disabled}
                                InputProps={{className: classes.input}}
                                InputLabelProps={{shrink: true}}
                                />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant={this.props.variant}
                                error={this.state.accountError}
                                inputRef={ref => { this.accIdRef = ref }}
                                disabled={this.state.accountTBDisabled || this.props.disabled}
                                value={this.state.accountId}
                                onChange={this.onChangeAccountId}
                                onBlur={this.onBlurAccountId}
                                onKeyDown={this.onAccountKeyDown}
                                InputProps={{className: classes.input}}
                                InputLabelProps={{shrink: true}} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant={this.props.variant}
                                error={this.state.subAccountError}
                                inputRef={ref => { this.subIdRef = ref }}
                                value={this.state.subAccountId}
                                onChange={this.onChangeSubAccountId}
                                disabled={this.state.subAccountTBDisabled || this.props.disabled}
                                onKeyDown={this.onSubAccountKeyDown}
                                InputProps={{className: classes.input}}
                                InputLabelProps={{shrink: true}} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="filled"
                                fullWidth
                                disabled={false}
                                hidden={!descVisible}
                                inputProps={{ readOnly: true, tabIndex: -1 }}
                                inputRef={ref => { this.anchorRef = ref }}
                                value={this.state.description}
                                InputProps={{className: classes.inputStatic}}
                                InputLabelProps={{shrink: true}}/>

                        </Grid>
                    </Grid>
                    <Popover open={open}
                        anchorEl={this.state.anchorEl}
                        onClose={this.closePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}>
                        <Paper >
                            {productTable}
                            {accountTable}
                            {subAccountTable}
                        </Paper>
                    </Popover>
                </Grid>
            </Fragment>
        );
    }

}

// FAccountObject.propTypes = {

//     variant: PropTypes.string,
//     onBlur: PropTypes.func,
//     onFocus: PropTypes.func,
//     onChange: PropTypes.func,
//     required: PropTypes.bool,
//     LBrCode: PropTypes.string,
//     DbConnName: PropTypes.string,
//     HomeLBrCode: PropTypes.string,
//     ModuleString: PropTypes.string,
//     UsrGrpCd: PropTypes.number,
//     CustNoFilter: PropTypes.string,
//     HideClosedAccounts: PropTypes.bool,

// }

// FAccountObject.defaultProps = {
//     onBlur: () => { },
//     onFocus: () => { },
//     onChange: () => { },
//     variant: "outlined",
//     required: false,
//     DbConnName: "",
//     HomeLBrCode: "0",
//     ModuleString: "",
//     UsrGrpCd: 1,
//     CustNoFilter: "",
//     HideClosedAccounts: false
// }

export default withStyles(styles)(FAccountObject);


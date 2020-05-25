"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var core_1 = require("@material-ui/core");
var axios_1 = __importDefault(require("axios"));
var Popover_1 = __importDefault(require("@material-ui/core/Popover"));
var styles_1 = require("@material-ui/core/styles");
var material_table_1 = __importDefault(require("material-table"));
var FSearchWIndow_1 = __importDefault(require("./FSearchWIndow"));
var styles = function (theme) { return ({
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
}); };
var ImplementationLevel;
(function (ImplementationLevel) {
    ImplementationLevel[ImplementationLevel["P"] = 0] = "P";
    ImplementationLevel[ImplementationLevel["A"] = 1] = "A";
    ImplementationLevel[ImplementationLevel["S"] = 2] = "S";
    ImplementationLevel[ImplementationLevel["T"] = 3] = "T";
})(ImplementationLevel = exports.ImplementationLevel || (exports.ImplementationLevel = {}));
var BLANK_ACC = "        000000000000000000000000";
var FAccountObject = (function (_super) {
    __extends(FAccountObject, _super);
    function FAccountObject(props) {
        var _this = _super.call(this, props) || this;
        _this.showProductTable = false;
        _this.showAccountTable = false;
        _this.showSubAccountTable = false;
        _this.product = { ProductId: "" };
        _this.account = { AccountNo: "" };
        _this.subAccount = {};
        _this.cacAuthNeeded = 0;
        _this.moduleType = 0;
        _this.custNo = 0;
        _this.prdAuthNeeded = 0;
        _this.subAccAuthNeeded = 0;
        _this.accNameTitle = "";
        _this.accName = "";
        _this.prdStat = 0;
        _this.accStat = 0;
        _this.subAccStat = 0;
        _this.text = BLANK_ACC;
        _this.state = {
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
        };
        _this.setTextFieldValues = function () {
            if (_this.text.length === 32) {
                var productId = "";
                var accountId = "";
                var subAccountId = "";
                var n_accId = 0;
                var n_subAccId = 0;
                productId = _this.text.substr(0, 8);
                _this.implementationLevel = "P";
                n_accId = parseInt(_this.text.substr(16, 8));
                if (n_accId === 0) {
                    _this.state.accountTBDisabled = true;
                    accountId = "";
                }
                else {
                    _this.implementationLevel = "A";
                    accountId = n_accId.toString();
                    _this.state.accountTBDisabled = false;
                }
                n_subAccId = parseInt(_this.text.substr(24, 8));
                if (n_subAccId === 0) {
                    _this.state.subAccountTBDisabled = true;
                    subAccountId = "";
                }
                else {
                    _this.implementationLevel = "S";
                    subAccountId = n_subAccId.toString();
                    _this.state.subAccountTBDisabled = false;
                }
                _this.state.productId = productId;
                _this.state.accountId = accountId;
                _this.state.subAccountId = subAccountId;
            }
        };
        _this.raiseChangeEvent = function (evtArgs) {
            if (_this.props.onChange) {
                var accountEventArgs = {
                    id: _this.text,
                    desc: _this.state.description,
                    productNo: _this.state.productId,
                    accountNo: _this.state.accountId,
                    subAccountNo: _this.state.subAccountId,
                    implementationLevel: _this.implementationLevel,
                    moduleType: _this.moduleType,
                    curCd: _this.curCd,
                    autoGenAcct: _this.autoGenAcct,
                    autoGenSubAcct: _this.autoGenSubAcct,
                    custNo: _this.custNo,
                    prdStatus: _this.prdStat,
                    accStatus: _this.accStat,
                    subAccStatus: _this.subAccStat,
                    prdAuthNeeded: _this.prdAuthNeeded,
                    accAuthNeeded: _this.cacAuthNeeded,
                    subAccAuthNeeded: _this.subAccAuthNeeded
                };
                _this.props.onChange({
                    text: _this.text,
                    args: accountEventArgs
                });
            }
        };
        _this.onChangeProductId = function (evt) {
            if (!evt.target.value || evt.target.value === "") {
                _this.text = BLANK_ACC;
                _this.raiseChangeEvent();
            }
            _this.setState({
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
        };
        _this.onChangeAccountId = function (evt) {
            _this.setState({
                accountId: evt.target.value,
                subAccountId: "",
                accountError: false,
                subAccountError: false,
            });
        };
        _this.onChangeSubAccountId = function (evt) {
            if (_this.state.accountId !== "") {
                _this.setState({
                    subAccountId: evt.target.value,
                    subAccountError: false
                });
            }
        };
        _this.fetchDataGetAccountsDBCustNoFilter = function (success, error) { return __awaiter(_this, void 0, void 0, function () {
            var _a, BranchCode, CustNoFilter, DbConnName, HideClosedAccounts, url, From, data, response, result, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = this.props, BranchCode = _a.BranchCode, CustNoFilter = _a.CustNoFilter, DbConnName = _a.DbConnName, HideClosedAccounts = _a.HideClosedAccounts;
                        url = this.CONTROLS_API_URL + "GetAccountsDBCustNoFilter";
                        From = 0;
                        if (this.state.accountId !== "") {
                            From = parseInt(this.state.accountId);
                        }
                        data = {
                            LBrCode: BranchCode,
                            Product: this.state.productId,
                            From: From,
                            Pagen: 0,
                            HideClosedAccounts: HideClosedAccounts,
                            DbConnName: DbConnName,
                            CustNoFilter: CustNoFilter
                        };
                        return [4, axios_1.default.post(url, data)];
                    case 1:
                        response = _b.sent();
                        return [4, response.data];
                    case 2:
                        result = _b.sent();
                        this.setState({
                            accounts: result
                        });
                        success();
                        return [3, 4];
                    case 3:
                        ex_1 = _b.sent();
                        error();
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        _this.fetchDataCheckAccountsDBCustNoFilter = function (success, error) { return __awaiter(_this, void 0, void 0, function () {
            var _a, BranchCode, CustNoFilter, DbConnName, HideClosedAccounts, url, From, data, response, result, ex_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = this.props, BranchCode = _a.BranchCode, CustNoFilter = _a.CustNoFilter, DbConnName = _a.DbConnName, HideClosedAccounts = _a.HideClosedAccounts;
                        url = this.CONTROLS_API_URL + "CheckAccountsDBCustNoFilter";
                        From = 0;
                        if (this.state.accountId !== "") {
                            From = parseInt(this.state.accountId);
                        }
                        data = {
                            LBrCode: BranchCode,
                            Product: this.state.productId,
                            From: From,
                            Pagen: 0,
                            HideClosedAccounts: HideClosedAccounts,
                            DbConnName: DbConnName,
                            CustNoFilter: CustNoFilter
                        };
                        return [4, axios_1.default.post(url, data)];
                    case 1:
                        response = _b.sent();
                        return [4, response.data];
                    case 2:
                        result = _b.sent();
                        success(result);
                        return [3, 4];
                    case 3:
                        ex_2 = _b.sent();
                        error();
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        _this.fetchDataGetProductDBCustNoFilter = function (success, error) { return __awaiter(_this, void 0, void 0, function () {
            var _a, BranchCode, HomeBranchCode, CustNoFilter, DbConnName, ModuleFilter, UsrGrpCd, url, data, response, result, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = this.props, BranchCode = _a.BranchCode, HomeBranchCode = _a.HomeBranchCode, CustNoFilter = _a.CustNoFilter, DbConnName = _a.DbConnName, ModuleFilter = _a.ModuleFilter, UsrGrpCd = _a.UsrGrpCd;
                        url = this.CONTROLS_API_URL + "GetProductDBCustNoFilter";
                        data = {
                            LBrCode: BranchCode,
                            HomeLBrCode: HomeBranchCode,
                            CustNoFilter: CustNoFilter,
                            DbConnName: DbConnName,
                            ModuleString: ModuleFilter,
                            UsrGrpCd: UsrGrpCd,
                            ProdLike: this.prdIdRef.value
                        };
                        return [4, axios_1.default.post(url, data)];
                    case 1:
                        response = _b.sent();
                        return [4, response.data];
                    case 2:
                        result = _b.sent();
                        this.setState({
                            products: result
                        });
                        success();
                        return [3, 4];
                    case 3:
                        err_1 = _b.sent();
                        error();
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        _this.fetchDataGetSubAccountDBCustNoFilter = function (success, error) { return __awaiter(_this, void 0, void 0, function () {
            var _a, BranchCode, CustNoFilter, DbConnName, ModuleFilter, HideClosedAccounts, url, Product, Acc, From, data, response, result, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = this.props, BranchCode = _a.BranchCode, CustNoFilter = _a.CustNoFilter, DbConnName = _a.DbConnName, ModuleFilter = _a.ModuleFilter, HideClosedAccounts = _a.HideClosedAccounts;
                        url = this.CONTROLS_API_URL + "GetSubAccountDBCustNoFilter";
                        Product = this.state.productId;
                        Acc = 1;
                        if (this.state.accountId !== "") {
                            Acc = parseInt(this.state.accountId);
                        }
                        From = 0;
                        if (this.state.subAccountId !== "") {
                            From = parseInt(this.state.subAccountId);
                        }
                        data = {
                            LBrCode: BranchCode,
                            Product: Product,
                            Acc: Acc,
                            ModuleType: this.product.ModuleType,
                            From: From,
                            Pagen: 0,
                            HideClosedAccounts: HideClosedAccounts,
                            DbConnName: DbConnName,
                            CustNoFilter: CustNoFilter
                        };
                        return [4, axios_1.default.post(url, data)];
                    case 1:
                        response = _b.sent();
                        return [4, response.data];
                    case 2:
                        result = _b.sent();
                        this.setState({
                            subAccounts: result
                        });
                        success();
                        return [3, 4];
                    case 3:
                        err_2 = _b.sent();
                        error();
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        _this.fetchDataCheckSubAccountDBCustNoFilter = function (success, error) { return __awaiter(_this, void 0, void 0, function () {
            var _a, BranchCode, CustNoFilter, DbConnName, ModuleFilter, url, Product, acc, receipt, data, response, result, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = this.props, BranchCode = _a.BranchCode, CustNoFilter = _a.CustNoFilter, DbConnName = _a.DbConnName, ModuleFilter = _a.ModuleFilter;
                        url = this.CONTROLS_API_URL + "CheckSubAccountDBCustNoFilter";
                        Product = this.state.productId;
                        acc = 0;
                        if (this.state.accountId !== "") {
                            acc = parseInt(this.state.accountId) | 0;
                        }
                        receipt = 0;
                        if (this.state.subAccountId !== "") {
                            receipt = parseInt(this.state.subAccountId) | 0;
                        }
                        data = {
                            LBrCode: BranchCode,
                            Product: Product,
                            Acc: acc,
                            ModuleType: this.product.ModuleType,
                            DbConnName: DbConnName,
                            CustNoFilter: CustNoFilter,
                            Receipt: receipt
                        };
                        return [4, axios_1.default.post(url, data)];
                    case 1:
                        response = _b.sent();
                        return [4, response.data];
                    case 2:
                        result = _b.sent();
                        success(result);
                        return [3, 4];
                    case 3:
                        err_3 = _b.sent();
                        error();
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        _this.fetchDataCheckProductDBCustNoFilter = function (success, error) { return __awaiter(_this, void 0, void 0, function () {
            var _a, BranchCode, HomeBranchCode, CustNoFilter, DbConnName, ModuleFilter, UsrGrpCd, url, data, response, result, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = this.props, BranchCode = _a.BranchCode, HomeBranchCode = _a.HomeBranchCode, CustNoFilter = _a.CustNoFilter, DbConnName = _a.DbConnName, ModuleFilter = _a.ModuleFilter, UsrGrpCd = _a.UsrGrpCd;
                        url = this.CONTROLS_API_URL + "CheckProductDBCustNoFilter";
                        data = {
                            LBrCode: BranchCode,
                            HomeLBrCode: HomeBranchCode,
                            CustNoFilter: CustNoFilter,
                            DbConnName: DbConnName,
                            ModuleString: ModuleFilter,
                            UsrGrpCd: UsrGrpCd,
                            ProdLike: this.prdIdRef.value
                        };
                        return [4, axios_1.default.post(url, data)];
                    case 1:
                        response = _b.sent();
                        return [4, response.data];
                    case 2:
                        result = _b.sent();
                        success(result);
                        return [3, 4];
                    case 3:
                        err_4 = _b.sent();
                        error();
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        _this.setFieldsByModuleType = function () {
            var product = _this.product;
            var implementationLevel = product.ImplementationLevel;
            switch (implementationLevel) {
                case "P":
                    _this.setState({
                        productTBDisabled: false,
                        accountTBDisabled: true,
                        subAccountTBDisabled: true
                    });
                    break;
                case "A":
                    _this.setState({
                        productTBDisabled: false,
                        accountTBDisabled: false,
                        subAccountTBDisabled: true
                    }, function () {
                        _this.accIdRef.focus();
                    });
                    break;
                case "S":
                    _this.setState({
                        productTBDisabled: false,
                        accountTBDisabled: false,
                        subAccountTBDisabled: false
                    });
                    _this.accIdRef.focus();
                    break;
                case "T":
                    _this.setState({
                        productTBDisabled: false,
                        accountTBDisabled: false,
                        subAccountTBDisabled: false
                    });
                    _this.accIdRef.focus();
                    break;
                default:
                    break;
            }
        };
        _this.onProductKeyDown = function (evt) {
            if (evt.key === "F2") {
                if (evt.shiftKey) {
                    if (_this.props.SearchWindow) {
                        _this.setState({
                            showSearchWindow: true
                        });
                    }
                    else {
                        alert("No Advance Search Avaialbale");
                    }
                }
                else {
                    _this.showProductTable = true;
                    _this.fetchDataGetProductDBCustNoFilter(function () {
                        _this.setState({
                            anchorEl: _this.anchorRef,
                            error: false
                        });
                    }, function () { });
                }
            }
            if (evt.key === "Tab") {
                if (evt.target.value && evt.target.value.trim() !== "") {
                    _this.fetchDataCheckProductDBCustNoFilter(function (result) {
                        _this.product = __assign({}, result);
                        _this.setState({
                            productId: result.ProductId.trim(),
                            description: result.ProductName,
                            error: false
                        }, function () {
                            _this.setFieldsByModuleType();
                            _this.setProductResultValues();
                            _this.triggerValueChangedForProduct();
                            if (_this.props.PickAddMode && _this.implementationLevel === "A" && _this.autoGenAcct === "Y") {
                                _this.accStat = 0;
                                _this.cacAuthNeeded = 0;
                            }
                            setTimeout(function () {
                                _this.accIdRef.focus();
                            }, 100);
                        });
                    }, function () {
                        alert("Invalid Product Code");
                        _this.setState({
                            error: true
                        });
                        _this.prdIdRef.focus();
                    });
                }
            }
        };
        _this.onAccountKeyDown = function (evt) {
            if (evt.key === "F2") {
                if (evt.shiftKey && !(_this.props.PickAddMode && _this.implementationLevel === "A")) {
                    if (_this.props.SearchWindow) {
                        _this.setState({
                            showSearchWindow: true
                        });
                    }
                    else {
                        alert("No Advance Search Avaialbale");
                    }
                }
                else {
                    _this.showAccountTable = true;
                    _this.fetchDataGetAccountsDBCustNoFilter(function () {
                        _this.setState({
                            anchorEl: _this.anchorRef,
                            error: false,
                            accountError: false
                        });
                    }, function () { });
                }
            }
            if (evt.key === "Tab") {
                _this.fetchDataCheckAccountsDBCustNoFilter(function (result) {
                    if (_this.props.PickAddMode && _this.autoGenAcct != "Y" &&
                        (_this.implementationLevel == "A" || (_this.implementationLevel == "S" && _this.props.AcceptLevel == "A"))) {
                        if (!result) {
                            var accountNo = _this.product.ProductId.trim().padEnd(8, ' ') + "00000000" + _this.state.accountId.trim().padStart(8, '0') + "00000000";
                            _this.account = {
                                AccountNo: accountNo,
                                ShortAccountNo: FAccountObject.toShortAccountNo(accountNo)
                            };
                            _this.custNo = _this.account.CustNo;
                            _this.triggerValueChangedForAccount(_this.account);
                        }
                        else {
                            alert("Account already exists");
                            _this.setState({
                                description: "",
                                accountError: true
                            });
                        }
                    }
                    else {
                        if (result) {
                            _this.account = result;
                            _this.setAccountResultValues();
                            _this.setState({
                                description: _this.account.NameTittle + " " + _this.account.FullName,
                                accountError: false,
                            });
                            _this.accNameTitle = _this.account.NameTittle;
                            _this.accName = _this.account.FullName;
                            _this.triggerValueChangedForAccount(_this.account);
                            if ((_this.implementationLevel === "S" || _this.implementationLevel === "T") && _this.props.AcceptLevel !== "A")
                                _this.subIdRef.focus();
                            else {
                                _this.setState({
                                    subAccountTBDisabled: true
                                });
                            }
                        }
                        else {
                            alert("Invalid Account Code");
                            _this.setState({
                                subAccountId: "",
                                accountError: true,
                                description: ""
                            }, function () {
                                setTimeout(function () {
                                    _this.accIdRef.focus();
                                }, 100);
                            });
                        }
                    }
                }, function () {
                    _this.setState({
                        accountError: true
                    });
                    _this.accIdRef.focus();
                });
            }
        };
        _this.onSubAccountKeyDown = function (evt) {
            if (evt.key === "F2") {
                if (evt.shiftKey && !(_this.props.PickAddMode && _this.implementationLevel === "A")) {
                    if (_this.props.SearchWindow) {
                        _this.setState({
                            showSearchWindow: true
                        });
                    }
                    else {
                        alert("No Advance Search Avaialbale");
                    }
                }
                else {
                    _this.showSubAccountTable = true;
                    _this.fetchDataGetSubAccountDBCustNoFilter(function () {
                        _this.setState({
                            anchorEl: _this.anchorRef,
                            error: false
                        });
                    }, function () { });
                }
            }
            if (evt.key === "Tab") {
                _this.showSubAccountTable = false;
                _this.fetchDataCheckSubAccountDBCustNoFilter(function (result) {
                    var PickAddMode = _this.props.PickAddMode;
                    if (PickAddMode && _this.autoGenSubAcct !== "Y") {
                        if (!result) {
                            _this.subAccount = result;
                            _this.subAccount.ReceiptNo = _this.state.productId.trim().padEnd(8, ' ') +
                                "00000000" +
                                _this.state.accountId.trim().padStart(8, '0') +
                                _this.state.subAccountId.trim().padStart(8, '0');
                            _this.subAccount.ShortReceiptNo = FAccountObject.toShortAccountNo(_this.subAccount.ReceiptNo);
                            _this.subAccStat = 0;
                            _this.subAccAuthNeeded = 0;
                            _this.triggerValueChangedForSubAccountNumber(_this.subAccount);
                            _this.setState({
                                subAccountError: false
                            });
                        }
                        else {
                            alert("Receipt Number Already Present");
                            _this.setState({
                                subAccountError: true
                            }, function () {
                                setTimeout(function () {
                                    _this.subIdRef.focus();
                                }, 100);
                            });
                            _this.text = BLANK_ACC;
                            _this.raiseChangeEvent();
                        }
                    }
                    else {
                        if (!result) {
                            alert("Invalid Receipt No.");
                            _this.setState({
                                subAccountError: true
                            }, function () {
                                setTimeout(function () {
                                    _this.subIdRef.focus();
                                });
                            });
                            _this.text = BLANK_ACC;
                            _this.raiseChangeEvent();
                        }
                        else {
                            _this.subAccount = result;
                            _this.subAccStat = _this.subAccount.Status;
                            _this.subAccAuthNeeded = _this.subAccount.DbtrAuthNeeded;
                            _this.setState({
                                description: _this.subAccount.FullName,
                                subAccountError: false
                            });
                            _this.triggerValueChangedForSubAccountNumber(_this.subAccount);
                        }
                    }
                }, function () {
                    _this.setState({
                        subAccountError: true
                    });
                    setTimeout(function () {
                        _this.subIdRef.focus();
                    }, 0);
                });
            }
        };
        _this.triggerValueChangedForProduct = function () {
            var product = _this.product;
            var _a = _this.props, AcceptLevel = _a.AcceptLevel, PickAddMode = _a.PickAddMode;
            if (product.ImplementationLevel === "P" || AcceptLevel === "P") {
                _this.text = product.ProductId.padEnd(8, ' ') + "000000000000000000000000";
                _this.setState({
                    accountTBDisabled: true,
                    subAccountTBDisabled: true
                }, function () {
                    _this.raiseChangeEvent();
                });
            }
            else if (product.ImplementationLevel === "A" && PickAddMode && _this.autoGenAcct === "Y") {
                _this.accStat = 0;
                _this.cacAuthNeeded = 0;
                _this.text = product.ProductId.padEnd(8, ' ') + "000000000000000000000000";
                _this.setState({
                    accountTBDisabled: true,
                    subAccountTBDisabled: true
                }, function () {
                    _this.raiseChangeEvent();
                });
            }
            else if (product.ImplementationLevel == "S" && PickAddMode && _this.autoGenAcct == "Y" && AcceptLevel == "A") {
                _this.accStat = 0;
                _this.subAccStat = 0;
                _this.cacAuthNeeded = 0;
                _this.subAccAuthNeeded = 0;
                _this.text = product.ProductId.padEnd(8, ' ') + "000000000000000000000000";
                _this.setState({
                    accountTBDisabled: true,
                    subAccountTBDisabled: true
                }, function () {
                    _this.raiseChangeEvent();
                });
            }
            else if (product.ImplementationLevel == "S" && PickAddMode && _this.autoGenSubAcct == "Y") {
                _this.subAccStat = 0;
                _this.subAccAuthNeeded = 0;
                _this.setState({
                    subAccountTBDisabled: true
                });
                return;
            }
            else
                return;
        };
        _this.triggerValueChangedForAccount = function (account) {
            var _a = _this.props, AcceptLevel = _a.AcceptLevel, PickAddMode = _a.PickAddMode;
            var _b = _this, implementationLevel = _b.implementationLevel, autoGenSubAcct = _b.autoGenSubAcct;
            if (implementationLevel === "A" || (implementationLevel === "S" && AcceptLevel === "A")) {
                _this.setTextOnAccountChanged(account);
                _this.raiseChangeEvent();
            }
            else if (implementationLevel === "S" && PickAddMode && autoGenSubAcct == "Y") {
                _this.setTextOnAccountChanged(account);
                _this.setState({
                    subAccountTBDisabled: true
                }, function () {
                    _this.raiseChangeEvent();
                });
            }
            else if (implementationLevel == "S" && PickAddMode && AcceptLevel == "A") {
                _this.setTextOnAccountChanged(account);
                _this.setState({
                    subAccountTBDisabled: true
                }, function () {
                    _this.raiseChangeEvent();
                });
            }
            else {
                return;
            }
        };
        _this.triggerValueChangedForSubAccountNumber = function (subAccount) {
            var implementationLevel = _this.implementationLevel;
            if (implementationLevel == "S" || implementationLevel == "T") {
                _this.text = _this.product.ProductId.trim().padEnd(8, ' ') + "00000000" + _this.state.accountId.padStart(8, '0') + subAccount.ShortReceiptNo.split('/')[2].trim().padStart(8, '0');
            }
            else {
                return;
            }
            if (_this.text.trim() !== "") {
                var accountEventArgs = {
                    id: _this.text,
                    desc: _this.state.description,
                    productNo: _this.state.productId,
                    accountNo: _this.state.accountId,
                    subAccountNo: _this.state.subAccountId,
                    implementationLevel: _this.implementationLevel,
                    moduleType: _this.moduleType,
                    curCd: _this.curCd,
                    autoGenAcct: _this.autoGenAcct,
                    autoGenSubAcct: _this.autoGenSubAcct,
                    custNo: _this.custNo,
                    prdStatus: _this.prdStat,
                    accStatus: _this.accStat,
                    subAccStatus: _this.subAccStat,
                    prdAuthNeeded: _this.prdAuthNeeded,
                    accAuthNeeded: _this.cacAuthNeeded,
                    subAccAuthNeeded: _this.subAccAuthNeeded
                };
                _this.raiseChangeEvent(accountEventArgs);
            }
        };
        _this.onBlurProductId = function (evt) {
        };
        _this.onBlurAccountId = function (evt) {
        };
        _this.productRowSelect = function (evt, selectedProduct) {
            console.log(selectedProduct);
            _this.showProductTable = false;
            _this.product = __assign({}, selectedProduct);
            var productId = selectedProduct["ProductId"].trim();
            _this.setState(function () {
                return {
                    productId: productId,
                    description: selectedProduct["ProductName"].trim(),
                    anchorEl: null
                };
            }, function () {
                _this.setFieldsByModuleType();
                _this.setProductResultValues();
                _this.triggerValueChangedForProduct();
                setTimeout(function () {
                    _this.accIdRef.focus();
                }, 100);
            });
        };
        _this.accountRowSelect = function (evt, selectedAccount) {
            _this.showAccountTable = false;
            _this.account = __assign({}, selectedAccount);
            var accountId = selectedAccount["ShortAccountNo"].split("/")[1];
            _this.setState({
                accountId: accountId,
                description: _this.account.NameTittle + " " + _this.account.FullName,
                anchorEl: null
            }, function () {
                _this.setAccountResultValues();
                _this.triggerValueChangedForAccount(_this.account);
                setTimeout(function () {
                    _this.subIdRef.focus();
                }, 100);
            });
        };
        _this.subAccountRowSelect = function (evt, selectedSubAccount) {
            _this.showSubAccountTable = false;
            _this.subAccount = __assign({}, selectedSubAccount);
            var subAccountId = selectedSubAccount["ShortReceiptNo"].split("/")[2];
            _this.setState({
                subAccountId: subAccountId,
                description: _this.subAccount.FullName,
                anchorEl: null
            }, function () {
                _this.subAccStat = _this.subAccount.Status;
                _this.subAccAuthNeeded = _this.subAccount.DbtrAuthNeeded;
                _this.triggerValueChangedForSubAccountNumber(_this.subAccount);
            });
        };
        _this.closePopover = function () {
            _this.setState({
                anchorEl: null,
                products: [],
                accounts: []
            });
            _this.showProductTable = false;
            _this.showAccountTable = false;
            _this.showSubAccountTable = false;
        };
        _this.onSearchWindowClose = function () {
            _this.setState({
                showSearchWindow: false
            });
        };
        _this.expandAccName = function () {
            var implementationLevel = _this.implementationLevel;
            if (implementationLevel === "P") {
                _this.fetchDataCheckProductDBCustNoFilter(function (result) {
                    if (result !== null) {
                        var productData = result;
                        _this.setState({
                            description: productData.ProductName
                        });
                    }
                }, function () {
                });
            }
            else if (implementationLevel === "A" || implementationLevel === "S") {
                _this.fetchDataCheckAccountsDBCustNoFilter(function (result) {
                    if (result !== null) {
                        var accountData = result;
                        _this.setState({
                            description: accountData.NameTittle + " " + accountData.FullName
                        });
                        _this.custNo = accountData.CustNo;
                    }
                }, function () { });
            }
        };
        _this.clearValues = function () {
            _this.setState({
                productId: "",
                accountId: "",
                subAccountId: "",
                description: "",
            });
            _this.text = "";
        };
        _this.CONTROLS_API_URL = process.env.REACT_APP_CONTROLS_API_URL;
        if (_this.props.Text) {
            if (_this.props.Text.trim() === "") {
                _this.state.text = _this.text;
            }
            else {
                _this.state.text = _this.props.Text;
                _this.text = _this.props.Text;
                _this.setTextFieldValues();
            }
        }
        else {
            _this.state.text = _this.text;
        }
        return _this;
    }
    FAccountObject.prototype.setTextOnAccountChanged = function (account) {
        var ShortAccountNo = account.ShortAccountNo;
        this.text = this.product.ProductId.trim().padEnd(8, ' ') + "00000000" + ShortAccountNo.split('/')[1].toString().trim().padStart(8, '0') + "00000000";
    };
    FAccountObject.prototype.setAccountResultValues = function () {
        this.accStat = this.account.Status;
        this.cacAuthNeeded = this.account.DbtrAuthNeeded;
        this.custNo = this.account.CustNo;
    };
    FAccountObject.prototype.setProductResultValues = function () {
        this.implementationLevel = this.product.ImplementationLevel;
        this.curCd = this.product.CurCd;
        this.prdStat = this.product.Status;
        this.prdAuthNeeded = this.product.DbtrAuthNeeded;
        this.autoGenAcct = this.product.AutoGenAcct;
        this.autoGenSubAcct = this.product.AutoGenSubAcct;
        this.custNo = 0;
    };
    FAccountObject.prototype.generateProductTable = function () {
        if (this.state.products) {
            return (react_1.default.createElement(material_table_1.default, { title: "Products", columns: [
                    { title: "Product ID", field: "ProductId" },
                    { title: "Product Name", field: "ProductName" },
                ], data: this.state.products, onRowClick: this.productRowSelect, options: {
                    filtering: true
                } }));
        }
    };
    FAccountObject.prototype.generateAccountTable = function () {
        if (this.state.accounts) {
            return (react_1.default.createElement(material_table_1.default, { title: "Accounts", columns: [
                    { title: "Account ID", field: "ShortAccountNo" },
                    { title: "Account Holder's Name", field: "FullName" },
                    { title: "Account Status", field: "AccountStatus" },
                ], data: this.state.accounts, onRowClick: this.accountRowSelect }));
        }
    };
    FAccountObject.prototype.generateSubAccountTable = function () {
        if (this.state.subAccounts) {
            return (react_1.default.createElement(material_table_1.default, { title: "SubAccounts", columns: [
                    { title: "Account ID", field: "ShortReceiptNo" },
                    { title: "Account Holder's Name", field: "FullName" },
                    { title: "Account Status", field: "ReceiptStatus" },
                ], data: this.state.subAccounts, onRowClick: this.subAccountRowSelect }));
        }
    };
    FAccountObject.prototype.componentDidMount = function () {
    };
    FAccountObject.toShortAccountNo = function (str) {
        if (str.length !== 32) {
            return str;
        }
        else {
            try {
                if (parseInt(str.substring(24, 8)) === 0) {
                    str = str.substring(0, 8).trim() + "/" + parseInt(str.substring(16, 8)) || "0";
                }
                else {
                    str = str.substring(0, 8).trim() + "/"
                        + parseInt(str.substring(16, 8)) || "0"
                        + "/"
                        + parseInt(str.substring(28, 8)) || "0";
                }
                return str;
            }
            catch (error) {
                return str;
            }
        }
    };
    FAccountObject.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, descVisible = _a.descVisible;
        var open = Boolean(this.state.anchorEl);
        var productTable = null;
        var accountTable = null;
        var subAccountTable = null;
        if (this.showProductTable) {
            productTable = this.generateProductTable();
        }
        if (this.showAccountTable) {
            accountTable = this.generateAccountTable();
        }
        if (this.showSubAccountTable) {
            subAccountTable = this.generateSubAccountTable();
        }
        return (react_1.default.createElement(react_1.Fragment, null,
            this.props.SearchWindow && this.state.showSearchWindow ? react_1.default.createElement(FSearchWIndow_1.default, { contents: this.props.SearchWindow, onClose: this.onSearchWindowClose }) : null,
            react_1.default.createElement(Grid_1.default, { container: true },
                react_1.default.createElement(Grid_1.default, { container: true, spacing: 1, justify: "center" },
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 4 },
                        react_1.default.createElement(core_1.TextField, { variant: this.props.variant, error: this.state.error, onKeyDown: this.onProductKeyDown, inputRef: function (ref) { _this.prdIdRef = ref; }, value: this.state.productId, onChange: this.onChangeProductId, onBlur: this.onBlurProductId, disabled: this.state.productTBDisabled || this.props.disabled, InputProps: { className: classes.input }, InputLabelProps: { shrink: true } })),
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 4 },
                        react_1.default.createElement(core_1.TextField, { variant: this.props.variant, error: this.state.accountError, inputRef: function (ref) { _this.accIdRef = ref; }, disabled: this.state.accountTBDisabled || this.props.disabled, value: this.state.accountId, onChange: this.onChangeAccountId, onBlur: this.onBlurAccountId, onKeyDown: this.onAccountKeyDown, InputProps: { className: classes.input }, InputLabelProps: { shrink: true } })),
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 4 },
                        react_1.default.createElement(core_1.TextField, { variant: this.props.variant, error: this.state.subAccountError, inputRef: function (ref) { _this.subIdRef = ref; }, value: this.state.subAccountId, onChange: this.onChangeSubAccountId, disabled: this.state.subAccountTBDisabled || this.props.disabled, onKeyDown: this.onSubAccountKeyDown, InputProps: { className: classes.input }, InputLabelProps: { shrink: true } })),
                    react_1.default.createElement(Grid_1.default, { item: true, xs: 12 },
                        react_1.default.createElement(core_1.TextField, { variant: "filled", fullWidth: true, disabled: false, hidden: !descVisible, inputProps: { readOnly: true, tabIndex: -1 }, inputRef: function (ref) { _this.anchorRef = ref; }, value: this.state.description, InputProps: { className: classes.inputStatic }, InputLabelProps: { shrink: true } }))),
                react_1.default.createElement(Popover_1.default, { open: open, anchorEl: this.state.anchorEl, onClose: this.closePopover, anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    } },
                    react_1.default.createElement(core_1.Paper, null,
                        productTable,
                        accountTable,
                        subAccountTable)))));
    };
    FAccountObject.defaultProps = {
        onBlur: function (evt) { },
        onFocus: function (evt) { },
        onChange: function (evt) { },
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
    };
    return FAccountObject;
}(react_1.Component));
exports.FAccountObject = FAccountObject;
exports.default = styles_1.withStyles(styles)(FAccountObject);
//# sourceMappingURL=FAccountObject.js.map
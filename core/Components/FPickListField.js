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
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var core_1 = require("@material-ui/core");
var axios_1 = __importDefault(require("axios"));
var Popover_1 = __importDefault(require("@material-ui/core/Popover"));
var styles_1 = require("@material-ui/core/styles");
var material_table_1 = __importDefault(require("material-table"));
var FSearchWIndow_1 = __importDefault(require("./FSearchWIndow"));
var ArrowRightOutlined_1 = __importDefault(require("@material-ui/icons/ArrowRightOutlined"));
var FStrField_1 = __importDefault(require("./FStrField"));
var StringFormat_1 = require("./StringFormat");
var styles = function (theme) { return ({
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
}); };
var FPickListField = (function (_super) {
    __extends(FPickListField, _super);
    function FPickListField(props) {
        var _this = _super.call(this, props) || this;
        _this.data = { pickId: undefined };
        _this.isValid = false;
        _this.state = {
            anchorEl: null,
            pickId: "",
            pickDesc: "",
            error: false,
            showSerachWindow: false
        };
        _this.pagenation = {
            totalPages: 0,
            currentPage: 0
        };
        _this.onPickIdChange = function (evt) {
            _this.setState({
                pickId: evt.target.value,
                pickDesc: "",
                error: false
            }, function () {
                _this.isValid = false;
                if (_this.props.addMode) {
                    _this.raiseResultChangeEvent();
                }
            });
        };
        _this.onDescChange = function (evt) {
            _this.setState({
                pickDesc: evt.target.value,
                error: false
            }, function () {
                _this.isValid = false;
                if (_this.props.addMode) {
                    _this.raiseResultChangeEvent();
                }
            });
        };
        _this.fetchListGetInitPicklistDB = function (success, error) { return __awaiter(_this, void 0, void 0, function () {
            var url, _a, tableName, pickListName, pickListArgs, dbConnName, data, response, result, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        url = this.CONTROLS_API_URL + "ListGetInitPicklistDB?tot=" + this.pagenation.totalPages;
                        _a = this.props, tableName = _a.tableName, pickListName = _a.pickListName, pickListArgs = _a.pickListArgs, dbConnName = _a.dbConnName;
                        data = {
                            TableName: tableName,
                            PicklistName: pickListName,
                            ParamArr: pickListArgs,
                            TBVal: this.pickFieldRef.value,
                            DbConnName: dbConnName,
                            Pagen: this.pagenation.currentPage
                        };
                        return [4, axios_1.default.post(url, data)];
                    case 1:
                        response = _b.sent();
                        return [4, response.data];
                    case 2:
                        result = _b.sent();
                        this.setState({
                            pickListData: result
                        });
                        success();
                        return [3, 4];
                    case 3:
                        ex_1 = _b.sent();
                        error(ex_1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        _this.fetchListCheckInitPicklistDB = function (success, error) { return __awaiter(_this, void 0, void 0, function () {
            var url, _a, tableName, pickListName, pickListArgs, dbConnName, data, response, result, ex_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.state.pickId) return [3, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        url = this.CONTROLS_API_URL + "ListCheckInitPicklistDB";
                        _a = this.props, tableName = _a.tableName, pickListName = _a.pickListName, pickListArgs = _a.pickListArgs, dbConnName = _a.dbConnName;
                        data = {
                            TableName: tableName,
                            PicklistName: pickListName,
                            ParamArr: pickListArgs,
                            TBVal: this.state.pickId.toString(),
                            DbConnName: dbConnName,
                            KeyVal: this.state.pickId.toString()
                        };
                        return [4, axios_1.default.post(url, data)];
                    case 2:
                        response = _b.sent();
                        return [4, response.data];
                    case 3:
                        result = _b.sent();
                        if (result === null) {
                            error(result);
                        }
                        else {
                            success(result);
                        }
                        return [3, 5];
                    case 4:
                        ex_2 = _b.sent();
                        error(ex_2);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        }); };
        _this.onLoadfetchListCheckInitPicklistDB = function (pickId, success, error) { return __awaiter(_this, void 0, void 0, function () {
            var url, _a, tableName, pickListName, pickListArgs, dbConnName, data, response, result, ex_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        url = this.CONTROLS_API_URL + "ListCheckInitPicklistDB";
                        _a = this.props, tableName = _a.tableName, pickListName = _a.pickListName, pickListArgs = _a.pickListArgs, dbConnName = _a.dbConnName;
                        data = {
                            TableName: tableName,
                            PicklistName: pickListName,
                            ParamArr: pickListArgs,
                            TBVal: pickId.toString(),
                            DbConnName: dbConnName,
                            KeyVal: pickId.toString()
                        };
                        return [4, axios_1.default.post(url, data)];
                    case 1:
                        response = _b.sent();
                        return [4, response.data];
                    case 2:
                        result = _b.sent();
                        if (result === null) {
                            error(result);
                        }
                        else {
                            success(result);
                        }
                        return [3, 4];
                    case 3:
                        ex_3 = _b.sent();
                        error(ex_3);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        _this.onSearchKeyDown = function (evt) {
            if (evt.key === "F2") {
                if (evt.shiftKey) {
                    if (!_this.props.searchWindow) {
                        alert("No Advance Search Avaialbale");
                    }
                    else {
                        _this.setState({
                            showSerachWindow: true
                        });
                    }
                    return;
                }
                else {
                    _this.setState({
                        error: false
                    });
                    _this.searchOnF2();
                }
            }
            if (evt.key === "Tab") {
                _this.searchOnTab();
            }
        };
        _this.closePopover = function () {
            _this.setState({
                anchorEl: null
            });
        };
        _this.onItemSelect = function (evt, selectedRow) {
            if (_this.state.pickListData) {
                var PiclistOrder = _this.state.pickListData.PiclistOrder;
                var PiclistOrderArr = PiclistOrder.split(",");
                _this.setState({
                    pickId: selectedRow[PiclistOrderArr[0]],
                    pickDesc: selectedRow[PiclistOrderArr[1]],
                    anchorEl: null,
                    error: false
                }, function () {
                    _this.raiseResultChangeEvent();
                });
            }
        };
        _this.generateList = function () {
            if (_this.state.pickListData) {
                var _a = _this.state.pickListData, PicklistHeader = _a.PicklistHeader, PickDt = _a.PickDt, PiclistOrder = _a.PiclistOrder;
                var headers = PicklistHeader.split(",");
                var columns = [];
                var fields = PiclistOrder.split(",");
                for (var index = 0; index < headers.length; index++) {
                    columns.push({ title: headers[index], field: fields[index].trim() });
                }
                return (react_1.default.createElement(material_table_1.default, { title: "", isLoading: !_this.state.pickListData, columns: columns, data: PickDt, options: {
                        sorting: true,
                        filtering: true,
                        pageSize: 5,
                        search: true,
                        searchFieldAlignment: 'left',
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        },
                    }, onRowClick: _this.onItemSelect, actions: [
                        {
                            icon: 'add',
                            tooltip: 'Select',
                            onClick: _this.onItemSelect
                        }
                    ] }));
            }
        };
        _this.onPickIdBlur = function (e) {
            var valid = _this.pickFieldRef.validity.valid;
            if (!valid) {
                _this.setState({
                    error: true
                });
            }
            else {
                _this.setState({
                    error: false
                });
            }
        };
        _this.onSearchWindowClose = function () {
            _this.setState({
                showSerachWindow: false
            });
        };
        _this.checkValidity = function () {
            if (_this.props.addMode) {
                return _this.pickFieldRef.validity.valid && _this.displayRef.validity.valid;
            }
            else {
                var displayValid = false;
                if (_this.props.required && _this.displayRef.value != "") {
                    displayValid = true;
                }
                if (!_this.props.required) {
                    displayValid = true;
                }
                return _this.pickFieldRef.validity.valid
                    && displayValid;
            }
        };
        _this.CONTROLS_API_URL = process.env.REACT_APP_CONTROLS_API_URL || undefined;
        return _this;
    }
    FPickListField.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (!this.props.addMode && this.props.value && this.props.value != prevProps.value) {
            var pickId = this.props.value;
            ;
            this.onLoadfetchListCheckInitPicklistDB(pickId, function (result) {
                var PiclistOrder = result.PiclistOrder, DictOne = result.DictOne;
                var PicklistTBOrderArr = PiclistOrder.split(",");
                _this.setState({
                    pickId: DictOne[PicklistTBOrderArr[0].trim()],
                    pickDesc: DictOne[PicklistTBOrderArr[1].trim()]
                }, function () {
                    _this.isValid = true;
                    _this.raiseResultChangeEvent();
                });
            }, function (error) {
                _this.isValid = false;
                _this.setState({
                    pickId: "",
                    pickDesc: ""
                });
                _this.pickFieldRef.focus();
                if (error !== null) {
                    alert("Network error");
                }
            });
        }
    };
    FPickListField.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.dataRef) {
            this.props.dataRef(this.data);
        }
        if (!this.props.addMode) {
            if ((this.props.data && this.props.data.pickId) || this.props.value) {
                var pickId = void 0;
                if (this.props.data && this.props.data.pickId) {
                    pickId = this.props.data.pickId;
                }
                else {
                    pickId = this.props.value;
                }
                this.onLoadfetchListCheckInitPicklistDB(pickId, function (result) {
                    var PiclistOrder = result.PiclistOrder, DictOne = result.DictOne;
                    var PicklistTBOrderArr = PiclistOrder.split(",");
                    _this.setState({
                        pickId: DictOne[PicklistTBOrderArr[0].trim()],
                        pickDesc: DictOne[PicklistTBOrderArr[1].trim()]
                    }, function () {
                        _this.isValid = true;
                        _this.raiseResultChangeEvent();
                    });
                }, function (error) {
                    _this.isValid = false;
                    _this.setState({
                        pickId: "",
                        pickDesc: ""
                    });
                    _this.pickFieldRef.focus();
                    if (error !== null) {
                        alert("Network error");
                    }
                });
            }
        }
    };
    FPickListField.prototype.raiseResultChangeEvent = function () {
        this.data.pickId = this.state.pickId;
        this.data.pickDescription = this.state.pickDesc;
        if (this.props.onResultChange) {
            this.props.onResultChange({
                pickId: this.state.pickId,
                pickDescription: this.state.pickDesc ? (typeof this.state.pickDesc == 'number' ? this.state.pickDesc : this.state.pickDesc.trim()) : undefined
            });
        }
    };
    FPickListField.prototype.searchOnTab = function () {
        var _this = this;
        var pickIdVal = this.state.pickId;
        if (pickIdVal && pickIdVal !== "" && !this.props.addMode) {
            this.setState(function () {
                return {
                    pickDesc: ""
                };
            }, function () {
                _this.fetchListCheckInitPicklistDB(function (result) {
                    var PiclistOrder = result.PiclistOrder, DictOne = result.DictOne;
                    var PicklistTBOrderArr = PiclistOrder.split(",");
                    _this.setState({
                        pickId: DictOne[PicklistTBOrderArr[0].trim()],
                        pickDesc: DictOne[PicklistTBOrderArr[1].trim()]
                    }, function () {
                        _this.isValid = true;
                        _this.raiseResultChangeEvent();
                    });
                }, function (error) {
                    _this.isValid = false;
                    _this.setState({
                        pickDesc: "",
                        error: true
                    });
                    _this.pickFieldRef.focus();
                    if (error !== null) {
                    }
                });
            });
        }
    };
    FPickListField.prototype.searchOnF2 = function () {
        var _this = this;
        if (!this.props.addMode) {
            this.setState({
                pickListData: null
            });
            this.fetchListGetInitPicklistDB(function () {
                _this.setState({
                    anchorEl: _this.pickFieldRef
                });
            }, function (ex) {
            });
        }
    };
    FPickListField.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, descriptionVisible = _a.descriptionVisible, searchWindow = _a.searchWindow;
        var open = Boolean(this.state.anchorEl);
        var showSerachWindow = this.state.showSerachWindow;
        var list = this.generateList();
        return (react_1.default.createElement(react_1.Fragment, null,
            searchWindow && showSerachWindow ? react_1.default.createElement(FSearchWIndow_1.default, { contents: searchWindow, onClose: this.onSearchWindowClose }) : null,
            react_1.default.createElement(core_1.Grid, { container: true, spacing: 0, style: { alignItems: 'center' } },
                react_1.default.createElement(core_1.Grid, { item: true },
                    react_1.default.createElement(FStrField_1.default, { variant: "outlined", required: this.props.required, onKeyDown: this.onSearchKeyDown, componentRef: function (ref) { _this.pickFieldRef = ref; }, value: this.state.pickId, onChange: this.onPickIdChange, onBlur: this.onPickIdBlur, error: this.state.error, InputLabelProps: { shrink: true }, disabled: this.props.disabled, format: this.props.format })),
                descriptionVisible ? react_1.default.createElement(core_1.Grid, { item: true },
                    react_1.default.createElement(ArrowRightOutlined_1.default, { color: "primary" })) : null,
                descriptionVisible ? react_1.default.createElement(core_1.Grid, { item: true },
                    react_1.default.createElement(TextField_1.default, { variant: "outlined", required: this.props.required && this.props.addMode, inputProps: { readOnly: !this.props.addMode, tabIndex: this.props.addMode ? 0 : -1 }, value: this.state.pickDesc, onChange: this.onDescChange, InputProps: {
                            className: classes.input
                        }, InputLabelProps: { shrink: true }, disabled: this.props.disabled, inputRef: function (ref) { return _this.displayRef = ref; } })) : null),
            react_1.default.createElement(Popover_1.default, { anchorEl: this.state.anchorEl, open: open, onClose: this.closePopover, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                } },
                react_1.default.createElement(core_1.Paper, { className: classes.paper }, list))));
    };
    FPickListField.defaultProps = {
        onBlur: function () { },
        onFocus: function () { },
        onChange: function () { },
        required: false,
        addMode: false,
        descriptionVisible: true,
        disabled: false,
        format: StringFormat_1.StringFormat.type_x
    };
    return FPickListField;
}(react_1.PureComponent));
exports.FPickListField = FPickListField;
exports.default = styles_1.withStyles(styles)(FPickListField);
//# sourceMappingURL=FPickListField.js.map
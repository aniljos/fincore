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
var Popover_1 = __importDefault(require("@material-ui/core/Popover"));
var styles_1 = require("@material-ui/core/styles");
var axios_1 = __importDefault(require("axios"));
var material_table_1 = __importDefault(require("material-table"));
var ArrowRightOutlined_1 = __importDefault(require("@material-ui/icons/ArrowRightOutlined"));
var FStrField_1 = __importDefault(require("./FStrField"));
var StringFormat_1 = require("./StringFormat");
var styles = function (theme) { return ({
    list: {
        minWidth: 300,
        maxWidth: 600,
        border: '2px solid darkblue',
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
}); };
var FLookupFieldList = (function (_super) {
    __extends(FLookupFieldList, _super);
    function FLookupFieldList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: [],
            open: false,
            placement: 'bottom-start',
            disablePortal: false,
            pFieldValue: "",
            sFieldValue: "",
            error: false,
            anchorEl: null,
            isInternalChange: false
        };
        _this.lookupId = null;
        _this.lookupDescription = null;
        _this.data = {};
        _this.fetchDataGetInitLookup = function (success, error) { return __awaiter(_this, void 0, void 0, function () {
            var _a, organizationId, codeType, lookupTableName, url, data, response, result, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = this.props, organizationId = _a.organizationId, codeType = _a.codeType, lookupTableName = _a.lookupTableName;
                        url = this.CONTROLS_API_URL + "ListGetInitLookup";
                        data = {
                            OrgId: organizationId,
                            LookupCode: codeType,
                            LkTableName: lookupTableName
                        };
                        return [4, axios_1.default.post(url, data)];
                    case 1:
                        response = _b.sent();
                        return [4, response.data];
                    case 2:
                        result = _b.sent();
                        this.setState({
                            data: result
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
        _this.fetchDataCheckInitLookup = function (success, error) { return __awaiter(_this, void 0, void 0, function () {
            var _a, organizationId, codeType, lookupTableName, pFieldValue, url, data, response, result_1, ex_2;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = this.props, organizationId = _a.organizationId, codeType = _a.codeType, lookupTableName = _a.lookupTableName;
                        pFieldValue = this.state.pFieldValue;
                        url = this.CONTROLS_API_URL + "ListCheckInitLookup";
                        data = {
                            LookupId: pFieldValue.toString(),
                            OrgId: organizationId,
                            LookupCode: codeType,
                            LkTableName: lookupTableName
                        };
                        return [4, axios_1.default.post(url, data)];
                    case 1:
                        response = _b.sent();
                        return [4, response.data];
                    case 2:
                        result_1 = _b.sent();
                        if (result_1) {
                            this.setState(function () {
                                return {
                                    sFieldValue: result_1.LookupDescriprionDb,
                                    error: false
                                };
                            }, function () {
                                success();
                            });
                        }
                        else {
                            this.setState(function () {
                                return {
                                    sFieldValue: "",
                                    error: true
                                };
                            }, function () {
                                _this.anchorRef.focus();
                                error();
                            });
                        }
                        return [3, 4];
                    case 3:
                        ex_2 = _b.sent();
                        this.setState(function () {
                            return {
                                pFieldValue: "",
                                sFieldValue: "",
                                error: true
                            };
                        }, function () {
                            setTimeout(function () {
                                _this.anchorRef.focus();
                            }, 0);
                            error(ex_2);
                        });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        _this.lookupId_onKeyDown = function (event) {
            if (event.key === "F2" && !_this.props.addMode) {
                _this.fetchDataGetInitLookup(function () {
                    _this.setState({
                        anchorEl: _this.anchorRef,
                        error: false
                    });
                }, function (ex) {
                    if (_this.props.onError) {
                        _this.props.onError(ex);
                    }
                });
            }
            if (event.key === "Tab" && !_this.props.addMode) {
                if (_this.state.pFieldValue) {
                    _this.fetchDataCheckInitLookup(function () {
                        _this.data = {
                            lookupId: _this.state.pFieldValue,
                            lookupDescription: _this.state.sFieldValue
                        };
                        if (_this.props.onChange) {
                            _this.props.onChange({
                                lookupId: _this.state.pFieldValue,
                                lookupDescription: _this.state.sFieldValue,
                                props: __assign({}, _this.props)
                            });
                        }
                    }, function (ex) {
                        if (_this.props.onError) {
                            _this.props.onError(ex);
                        }
                        if (_this.props.onChange) {
                            _this.props.onChange({
                                lookupId: _this.state.pFieldValue,
                                lookupDescription: _this.state.sFieldValue,
                                props: __assign({}, _this.props)
                            });
                        }
                    });
                }
                else {
                    event.preventDefault();
                    _this.setState({ error: true });
                }
            }
        };
        _this.lookupId_onBlur = function (event) {
        };
        _this.lookupId_onChange = function (event) {
            _this.data = {};
            _this.setState({
                pFieldValue: event.target.value,
                sFieldValue: "",
                error: false
            }, function () {
                if (_this.props.onChange) {
                    _this.props.onChange({
                        lookupId: _this.state.pFieldValue,
                        lookupDescripton: _this.state.sFieldValue,
                        props: __assign({}, _this.props)
                    });
                }
            });
        };
        _this.desc_onChange = function (event) {
            if (_this.props.addMode) {
                _this.setState({
                    sFieldValue: event.target.value,
                }, function () {
                    if (_this.props.onChange) {
                        _this.props.onChange({
                            lookupId: _this.state.pFieldValue,
                            lookupDescripton: _this.state.sFieldValue,
                            props: __assign({}, _this.props)
                        });
                    }
                });
            }
        };
        _this.handleItemClick = function (item) {
            _this.setState(function () {
                return {
                    pFieldValue: item.LookupIDDb,
                    sFieldValue: item.LookupDescriprionDb,
                    anchorEl: null,
                    error: false
                };
            }, function () {
                if (_this.props.onChange) {
                    _this.props.onChange({
                        lookupId: _this.state.pFieldValue,
                        lookupDescripton: _this.state.sFieldValue,
                        props: __assign({}, _this.props)
                    });
                }
            });
        };
        _this.handleChange = function (evt) {
            _this.setState({
                pFieldValue: evt.target.value
            });
        };
        _this.closePopover = function () {
            _this.setState({
                anchorEl: null
            });
        };
        _this.rowSelect = function (evt, selectedRow) {
            _this.setState(function () {
                return {
                    pFieldValue: selectedRow["LookupIDDb"],
                    sFieldValue: selectedRow["LookupDescriprionDb"]
                };
            }, function () {
                _this.closePopover();
                _this.data = {
                    lookupId: _this.state.pFieldValue,
                    lookupDescription: _this.state.sFieldValue
                };
                if (_this.props.onChange) {
                    _this.props.onChange({
                        lookupId: _this.state.pFieldValue,
                        lookupDescription: _this.state.sFieldValue,
                        props: __assign({}, _this.props)
                    });
                }
            });
        };
        _this.generateList = function () {
            if (_this.state.data) {
                return (react_1.default.createElement(material_table_1.default, { title: "Lookup", columns: [
                        { title: _this.props.lookupIdLabel, field: "LookupIDDb" },
                        { title: _this.props.descriptionLabel, field: "LookupDescriprionDb" },
                    ], data: _this.state.data, onRowClick: _this.rowSelect }));
            }
        };
        _this.checkValidity = function () {
            if (_this.props.addMode) {
                return _this.anchorRef.validity.valid && _this.displayRef.validity.valid;
            }
            else {
                var displayValid = false;
                if (_this.props.required && _this.displayRef.value != "") {
                    displayValid = true;
                }
                if (!_this.props.required) {
                    displayValid = true;
                }
                return _this.anchorRef.validity.valid
                    && displayValid;
            }
        };
        _this.onDisplayBlur = function () {
            if (_this.props.addMode) {
                var valid = _this.checkValidity();
                if (!valid) {
                    _this.setState({
                        error: true
                    });
                }
            }
        };
        _this.CONTROLS_API_URL = process.env.REACT_APP_CONTROLS_API_URL || undefined;
        return _this;
    }
    FLookupFieldList.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (!this.props.addMode && this.props.value && this.props.value != prevProps.value) {
            if (this.props.value) {
                this.state.pFieldValue = this.props.value.toString();
                this.fetchDataCheckInitLookup(function () {
                    _this.data = {
                        lookupId: _this.state.pFieldValue,
                        lookupDescription: _this.state.sFieldValue
                    };
                    if (_this.props.onChange) {
                        _this.props.onChange({
                            lookupId: _this.state.pFieldValue,
                            lookupDescription: _this.state.sFieldValue,
                            props: __assign({}, _this.props)
                        });
                    }
                }, function (ex) {
                    if (_this.props.onError) {
                        _this.props.onError(ex);
                    }
                    if (_this.props.onChange) {
                        _this.props.onChange({
                            lookupId: _this.state.pFieldValue,
                            lookupDescription: _this.state.sFieldValue,
                            props: __assign({}, _this.props)
                        });
                    }
                });
            }
        }
    };
    FLookupFieldList.prototype.componentDidMount = function () {
        var _this = this;
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
                this.fetchDataCheckInitLookup(function () {
                    _this.data = {
                        lookupId: _this.state.pFieldValue,
                        lookupDescription: _this.state.sFieldValue
                    };
                    if (_this.props.onChange) {
                        _this.props.onChange({
                            lookupId: _this.state.pFieldValue,
                            lookupDescription: _this.state.sFieldValue,
                            props: __assign({}, _this.props)
                        });
                    }
                }, function (ex) {
                    if (_this.props.onError) {
                        _this.props.onError(ex);
                    }
                    if (_this.props.onChange) {
                        _this.props.onChange({
                            lookupId: _this.state.pFieldValue,
                            lookupDescription: _this.state.sFieldValue,
                            props: __assign({}, _this.props)
                        });
                    }
                });
            }
        }
    };
    FLookupFieldList.prototype.render = function () {
        var _this = this;
        var _a = this.props, lookupIdLabel = _a.lookupIdLabel, lookupIdPlaceholder = _a.lookupIdPlaceholder, descriptionLabel = _a.descriptionLabel, descriptionPlaceholder = _a.descriptionPlaceholder, codeType = _a.codeType, required = _a.required, classes = _a.classes, descriptionVisible = _a.descriptionVisible;
        var open = Boolean(this.state.anchorEl);
        var list = this.generateList();
        return (react_1.default.createElement(Grid_1.default, { container: true },
            react_1.default.createElement(Grid_1.default, { container: true, spacing: 0, style: { alignItems: 'center' } },
                react_1.default.createElement(Grid_1.default, { item: true },
                    react_1.default.createElement(FStrField_1.default, { required: required, error: this.state.error, variant: "outlined", label: lookupIdPlaceholder, value: this.state.pFieldValue, onKeyDown: this.lookupId_onKeyDown, componentRef: function (ref) { _this.anchorRef = ref; }, onBlur: this.lookupId_onBlur, onChange: this.lookupId_onChange, InputLabelProps: { shrink: true }, disabled: this.props.disabled, format: this.props.format })),
                descriptionVisible ? react_1.default.createElement(Grid_1.default, { item: true },
                    react_1.default.createElement(ArrowRightOutlined_1.default, { color: "secondary" })) : null,
                descriptionVisible ? react_1.default.createElement(Grid_1.default, { item: true, hidden: !descriptionVisible },
                    react_1.default.createElement(core_1.TextField, { required: this.props.required && this.props.addMode, variant: "outlined", inputProps: { readOnly: !this.props.addMode, tabIndex: this.props.addMode ? 0 : -1 }, label: descriptionPlaceholder, value: this.state.sFieldValue, onChange: this.desc_onChange, InputProps: {
                            className: classes.input
                        }, InputLabelProps: { shrink: true }, disabled: this.props.disabled, inputRef: function (ref) { return _this.displayRef = ref; }, onBlur: this.onDisplayBlur })) : null),
            react_1.default.createElement(Popover_1.default, { open: open, anchorEl: this.state.anchorEl, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                }, onClose: this.closePopover },
                react_1.default.createElement(core_1.Paper, null,
                    react_1.default.createElement(core_1.Paper, null, list),
                    react_1.default.createElement(core_1.Paper, null,
                        react_1.default.createElement(core_1.Typography, { className: classes.label, align: 'center', color: 'primary' }, codeType))))));
    };
    FLookupFieldList.defaultProps = {
        lookupIdLabel: undefined,
        descriptionLabel: undefined,
        lookupIdPlaceholder: undefined,
        descriptionPlaceholder: undefined,
        descriptionVisible: true,
        dbConnName: "",
        lookupTableName: "",
        onChange: function () { },
        onError: function () { },
        required: false,
        addMode: false,
        disabled: false,
        format: StringFormat_1.StringFormat.type_x
    };
    return FLookupFieldList;
}(react_1.PureComponent));
exports.FLookupFieldList = FLookupFieldList;
exports.default = styles_1.withStyles(styles)(FLookupFieldList);
//# sourceMappingURL=FLookupFieldListClass.js.map
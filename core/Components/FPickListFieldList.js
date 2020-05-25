"use strict";
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
var StringFormat_1 = require("./StringFormat");
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var Popover_1 = __importDefault(require("@material-ui/core/Popover"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var FStrField_1 = __importDefault(require("./FStrField"));
var ArrowRightOutlined_1 = __importDefault(require("@material-ui/icons/ArrowRightOutlined"));
var core_1 = require("@material-ui/core");
var material_table_1 = __importDefault(require("material-table"));
var axios_1 = __importDefault(require("axios"));
var useStyles = core_1.makeStyles({
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
var FPickListField = function (_a, ref) {
    var _b = _a.onBlur, onBlur = _b === void 0 ? function () { } : _b, _c = _a.onFocus, onFocus = _c === void 0 ? function () { } : _c, _d = _a.onChange, onChange = _d === void 0 ? function () { } : _d, _e = _a.required, required = _e === void 0 ? false : _e, variant = _a.variant, tableName = _a.tableName, pickListName = _a.pickListName, pickListArgs = _a.pickListArgs, dbConnName = _a.dbConnName, _f = _a.addMode, addMode = _f === void 0 ? false : _f, _g = _a.descriptionVisible, descriptionVisible = _g === void 0 ? true : _g, propData = _a.data, searchWindow = _a.searchWindow, onResultChange = _a.onResultChange, componentRef = _a.componentRef, dataRef = _a.dataRef, value = _a.value, _h = _a.disabled, disabled = _h === void 0 ? false : _h, _j = _a.format, format = _j === void 0 ? StringFormat_1.StringFormat.type_x : _j;
    var _k = react_1.useState(null), anchorEl = _k[0], setAnchorEL = _k[1];
    var _l = react_1.useState(""), pickId = _l[0], setPickId = _l[1];
    var _m = react_1.useState(""), pickDesc = _m[0], setPickDesc = _m[1];
    var _o = react_1.useState(false), error = _o[0], setError = _o[1];
    var _p = react_1.useState(false), showSearchWindow = _p[0], setShowSearchWindow = _p[1];
    var _q = react_1.useState(undefined), pickListData = _q[0], setPickListData = _q[1];
    var pickFieldRef = react_1.useRef(null);
    var callInProgress = react_1.useRef(false);
    var displayRef;
    var CONTROLS_API_URL = react_1.useRef("");
    var isValid = react_1.useRef(false);
    var data = { pickId: undefined };
    var pagenation = {
        totalPages: 0,
        currentPage: 0
    };
    react_1.useImperativeHandle(ref, function () {
        return {
            componentRef: pickFieldRef.current,
            data: data,
            checkValidity: function () {
                if (addMode) {
                    return pickFieldRef.current.validity.valid && displayRef.validity.valid;
                }
                else {
                    var displayValid = false;
                    if (required && displayRef.value != "") {
                        displayValid = true;
                    }
                    if (!required) {
                        displayValid = true;
                    }
                    return pickFieldRef.current.validity.valid
                        && displayValid;
                }
            }
        };
    });
    react_1.useEffect(function () {
        CONTROLS_API_URL.current = process.env.REACT_APP_CONTROLS_API_URL || undefined;
    }, []);
    react_1.useEffect(function () {
        if (!addMode) {
            if ((propData && propData.pickId) || value) {
                var pickId_1;
                if (propData && propData.pickId) {
                    pickId_1 = propData.pickId;
                }
                else {
                    pickId_1 = value;
                }
                onLoadfetchListCheckInitPicklistDB(pickId_1, function (result) {
                    var PiclistOrder = result.PiclistOrder, DictOne = result.DictOne;
                    var PicklistTBOrderArr = PiclistOrder.split(",");
                    setPickId(DictOne[PicklistTBOrderArr[0].trim()]);
                    setPickDesc(DictOne[PicklistTBOrderArr[1].trim()]);
                    isValid.current = true;
                }, function (error) {
                    isValid.current = false;
                    setPickId("");
                    setPickDesc("");
                    pickFieldRef.current.focus();
                    if (error !== null) {
                        alert("Network error");
                    }
                });
            }
        }
    }, []);
    react_1.useEffect(function () {
        raiseResultChangeEvent();
    }, [pickId && pickDesc]);
    react_1.useEffect(function () {
        if (!addMode) {
            if (value) {
                var pickId_2 = value;
                onLoadfetchListCheckInitPicklistDB(pickId_2, function (result) {
                    var PiclistOrder = result.PiclistOrder, DictOne = result.DictOne;
                    var PicklistTBOrderArr = PiclistOrder.split(",");
                    setPickId(DictOne[PicklistTBOrderArr[0].trim()]);
                    setPickDesc(DictOne[PicklistTBOrderArr[1].trim()]);
                    isValid.current = true;
                }, function (error) {
                    isValid.current = false;
                    setPickId("");
                    setPickDesc("");
                    pickFieldRef.current.focus();
                    if (error !== null) {
                        alert("Network error");
                    }
                });
            }
            if (!value) {
                console.log("calling !value");
                setPickId("");
                setPickDesc("");
            }
        }
        else {
            if (value) {
                setPickId(value);
            }
        }
    }, [value]);
    react_1.useEffect(function () {
        if (!addMode) {
            if (propData && propData.pickId) {
                var pickId_3;
                pickId_3 = propData.pickId;
                onLoadfetchListCheckInitPicklistDB(pickId_3, function (result) {
                    var PiclistOrder = result.PiclistOrder, DictOne = result.DictOne;
                    var PicklistTBOrderArr = PiclistOrder.split(",");
                    setPickId(DictOne[PicklistTBOrderArr[0].trim()]);
                    setPickDesc(DictOne[PicklistTBOrderArr[1].trim()]);
                    isValid.current = true;
                }, function (error) {
                    isValid.current = false;
                    setPickId("");
                    setPickDesc("");
                    pickFieldRef.current.focus();
                    if (error !== null) {
                        alert("Network error");
                    }
                });
            }
            if (!propData || !propData.pickId) {
                console.log("calling !value");
                setPickId("");
                setPickDesc("");
            }
        }
        else {
            if (propData && propData.pickId) {
                setPickId(propData.pickId);
            }
        }
    }, [propData]);
    var onLoadfetchListCheckInitPicklistDB = function (pickId, success, error) { return __awaiter(void 0, void 0, void 0, function () {
        var url, data_1, response, result, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    url = CONTROLS_API_URL.current + "ListCheckInitPicklistDB";
                    data_1 = {
                        TableName: tableName,
                        PicklistName: pickListName,
                        ParamArr: pickListArgs,
                        TBVal: pickId.toString(),
                        DbConnName: dbConnName,
                        KeyVal: pickId.toString()
                    };
                    return [4, axios_1.default.post(url, data_1)];
                case 1:
                    response = _a.sent();
                    return [4, response.data];
                case 2:
                    result = _a.sent();
                    if (result === null) {
                        error(result);
                    }
                    else {
                        success(result);
                    }
                    return [3, 4];
                case 3:
                    ex_1 = _a.sent();
                    error(ex_1);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); };
    var fetchListGetInitPicklistDB = function (success, error) { return __awaiter(void 0, void 0, void 0, function () {
        var url, data_2, response, result, ex_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    url = CONTROLS_API_URL.current + "ListGetInitPicklistDB?tot=" + pagenation.totalPages;
                    data_2 = {
                        TableName: tableName,
                        PicklistName: pickListName,
                        ParamArr: pickListArgs,
                        TBVal: pickFieldRef.current.value,
                        DbConnName: dbConnName,
                        Pagen: pagenation.currentPage
                    };
                    return [4, axios_1.default.post(url, data_2)];
                case 1:
                    response = _a.sent();
                    return [4, response.data];
                case 2:
                    result = _a.sent();
                    setPickListData(result);
                    success();
                    return [3, 4];
                case 3:
                    ex_2 = _a.sent();
                    error(ex_2);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); };
    var searchOnF2 = function () {
        if (!addMode) {
            setPickListData(undefined);
            fetchListGetInitPicklistDB(function () {
                setAnchorEL(pickFieldRef.current);
            }, function (ex) {
                console.log(ex);
            });
        }
    };
    var onSearchKeyDown = function (evt) {
        if (evt.key === "F2") {
            if (evt.shiftKey) {
                if (!searchWindow) {
                    alert("No Advance Search Avaialbale");
                }
                else {
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
    };
    var fetchListCheckInitPicklistDB = function (success, error) { return __awaiter(void 0, void 0, void 0, function () {
        var url, data_3, response, result, ex_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!pickId) return [3, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    url = CONTROLS_API_URL.current + "ListCheckInitPicklistDB";
                    data_3 = {
                        TableName: tableName,
                        PicklistName: pickListName,
                        ParamArr: pickListArgs,
                        TBVal: pickId.toString(),
                        DbConnName: dbConnName,
                        KeyVal: pickId.toString()
                    };
                    return [4, axios_1.default.post(url, data_3)];
                case 2:
                    response = _a.sent();
                    return [4, response.data];
                case 3:
                    result = _a.sent();
                    if (result === null) {
                        error(result);
                    }
                    else {
                        success(result);
                    }
                    return [3, 5];
                case 4:
                    ex_3 = _a.sent();
                    error(ex_3);
                    return [3, 5];
                case 5: return [2];
            }
        });
    }); };
    var searchOnTab = function () {
        var pickIdVal = pickId;
        if (pickIdVal && pickIdVal !== "" && !addMode) {
            fetchListCheckInitPicklistDB(function (result) {
                var PiclistOrder = result.PiclistOrder, DictOne = result.DictOne;
                var PicklistTBOrderArr = PiclistOrder.split(",");
                setPickId(DictOne[PicklistTBOrderArr[0].trim()]);
                setPickDesc(DictOne[PicklistTBOrderArr[1].trim()]);
                isValid.current = true;
            }, function (error) {
                isValid.current = false;
                setPickDesc("");
                setError(true);
                pickFieldRef.current.focus();
                if (error !== null) {
                }
            });
        }
    };
    var onPickIdChange = react_1.useCallback(function (evt) {
        setPickId(evt.target.value);
        setPickDesc("");
        setError(false);
        isValid.current = false;
    }, []);
    var onPickIdBlur = react_1.useCallback(function () {
        var valid = pickFieldRef.current.validity.valid;
        if (!valid) {
            setError(true);
        }
        else {
            setError(false);
        }
    }, []);
    var onDescChange = react_1.useCallback(function (evt) {
        if (addMode) {
            setPickDesc(evt.target.value);
        }
    }, []);
    var onItemSelect = function (evt, selectedRow) {
        if (pickListData) {
            var PiclistOrder = pickListData.PiclistOrder;
            var PiclistOrderArr = PiclistOrder.split(",");
            setPickId(selectedRow[PiclistOrderArr[0]]);
            setPickDesc(selectedRow[PiclistOrderArr[1]]);
            setAnchorEL(null);
            setError(false);
        }
    };
    var generateList = function () {
        if (pickListData) {
            var PicklistHeader = pickListData.PicklistHeader, PickDt = pickListData.PickDt, PiclistOrder = pickListData.PiclistOrder;
            var headers = PicklistHeader.split(",");
            var columns = [];
            var fields = PiclistOrder.split(",");
            for (var index = 0; index < headers.length; index++) {
                columns.push({ title: headers[index], field: fields[index].trim() });
            }
            return (react_1.default.createElement(material_table_1.default, { title: "", isLoading: !pickListData, columns: columns, data: PickDt, options: {
                    sorting: true,
                    filtering: true,
                    pageSize: 5,
                    search: true,
                    searchFieldAlignment: 'left',
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    },
                }, onRowClick: onItemSelect, actions: [
                    {
                        icon: 'add',
                        tooltip: 'Select',
                        onClick: onItemSelect
                    }
                ] }));
        }
    };
    var closePopover = function () { };
    var open = Boolean(anchorEl);
    var list = generateList();
    var classes = useStyles();
    var raiseResultChangeEvent = function () {
        data.pickId = pickId;
        data.pickDescription = pickDesc;
        if (onResultChange) {
            onResultChange({
                pickId: pickId,
                pickDescription: pickDesc ? (typeof pickDesc === 'number' ? pickDesc : pickDesc.trim()) : undefined
            });
        }
    };
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(Grid_1.default, { container: true, spacing: 0, style: { alignItems: 'center' } },
            react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(FStrField_1.default, { variant: "outlined", required: required, onKeyDown: onSearchKeyDown, componentRef: function (ref) { return pickFieldRef.current = ref; }, value: pickId, onChange: onPickIdChange, onBlur: onPickIdBlur, error: error, InputLabelProps: { shrink: true }, disabled: disabled, format: format })),
            descriptionVisible ? react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(ArrowRightOutlined_1.default, { color: "primary" })) : null,
            descriptionVisible ? react_1.default.createElement(Grid_1.default, { item: true },
                react_1.default.createElement(core_1.TextField, { variant: "outlined", required: required && addMode, inputProps: { readOnly: !addMode, tabIndex: addMode ? 0 : -1 }, value: pickDesc, onChange: onDescChange, InputProps: {
                        className: classes.input
                    }, InputLabelProps: { shrink: true }, disabled: disabled, inputRef: function (ref) { return displayRef = ref; } })) : null,
            react_1.default.createElement(Popover_1.default, { anchorEl: anchorEl, open: open, onClose: closePopover, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                } },
                react_1.default.createElement(Paper_1.default, { className: classes.paper }, list)))));
};
exports.default = react_1.default.memo(react_1.default.forwardRef(FPickListField));
//# sourceMappingURL=FPickListFieldList.js.map
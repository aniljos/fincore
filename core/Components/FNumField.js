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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var FErrorMessageModal_1 = __importDefault(require("./FErrorMessageModal"));
var styles = function (theme) { return ({
    input: {
        height: 25,
        width: 150
    }
}); };
var FNumField = (function (_super) {
    __extends(FNumField, _super);
    function FNumField(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            error: false,
            _value: 0,
            modalOpen: false
        };
        _this.inputProps = {};
        _this.value = 0;
        _this.modalCloseReason = 1;
        _this.getPattern = function () {
            var _a = _this.props, length = _a.length, decimalLength = _a.decimalLength;
            var regexpStr = "";
            if (length && decimalLength && decimalLength > 0) {
                length = length - decimalLength;
                regexpStr = "^\\d{0," + length + "}(\\.\\d{0," + decimalLength + "})?$";
            }
            else {
                regexpStr = "^\\d{0,}$";
            }
            var regexp = new RegExp(regexpStr);
            return regexp;
        };
        _this.checkValidity = function () {
            return _this.inputRef.validity.valid;
        };
        _this.onKeyDown = function (evt) {
            if (_this.state.error) {
                _this.setState({
                    error: false
                });
            }
            if ([37, 39, 46, 8, 9, 110, 190].includes(evt.keyCode)
                || (!evt.shiftKey && ((evt.keyCode >= 48 && evt.keyCode <= 57)
                    || (evt.keyCode >= 96 && evt.keyCode <= 105)))) {
                return;
            }
            else {
                evt.preventDefault();
            }
        };
        _this.onModalClose = function () {
            _this.setState({
                modalOpen: false
            });
        };
        _this.onModalExited = function () {
            if (_this.modalCloseReason === 1) {
                _this.inputRef.focus();
            }
        };
        _this.onModalOK = function () {
            _this.setState({
                modalOpen: false
            }, function () {
                _this.modalCloseReason = 1;
            });
        };
        _this.onModalCancel = function (e) {
            _this.setState({
                modalOpen: false
            }, function () {
                _this.modalCloseReason = 2;
            });
        };
        _this.onBlur = function (evt) {
            var isValid = _this.checkValidity();
            if (!isValid) {
                _this.setState({
                    error: true,
                    modalOpen: true
                });
            }
            else {
                if (_this.props.decimalLength && _this.props.decimalLength > 0 && evt.target.value != 0) {
                    var value = evt.target.value;
                    var updatedValue = parseFloat(value).toFixed(_this.props.decimalLength);
                    _this.inputRef.value = updatedValue;
                    if (_this.props.onChange) {
                        evt.target.value = updatedValue;
                        _this.props.onChange(evt);
                    }
                }
            }
            if (_this.props.onBlur) {
                _this.props.onBlur(evt);
            }
        };
        var reqExp = _this.getPattern();
        _this.inputProps.pattern = reqExp.toString().replace(/\//g, '');
        return _this;
    }
    FNumField.prototype.componentDidMount = function () {
        if (this.props.componentRef) {
            this.props.componentRef(this.inputRef);
        }
        if (this.props.onChange && this.props.value && this.props.decimalLength
            && this.props.value > 0 && this.props.decimalLength > 0) {
            if (this.props.value.toString().indexOf(".") === -1) {
                var updatedValue = parseFloat(this.props.value).toFixed(this.props.decimalLength);
                var evt = {
                    target: {
                        value: updatedValue
                    }
                };
                this.props.onChange(evt);
            }
        }
    };
    FNumField.prototype.componentDidUpdate = function () {
    };
    FNumField.prototype.render = function () {
        var _this = this;
        var _a = this.props, length = _a.length, classes = _a.classes, decimalLength = _a.decimalLength, errorMessage = _a.errorMessage, errorMessageTitle = _a.errorMessageTitle, componentRef = _a.componentRef, props = __rest(_a, ["length", "classes", "decimalLength", "errorMessage", "errorMessageTitle", "componentRef"]);
        var variant = props.variant;
        var tsProps = (function () {
            var tsVariant;
            switch (variant) {
                case "outlined": {
                    tsVariant = { variant: variant };
                    break;
                }
                case "filled": {
                    tsVariant = { variant: "filled" };
                    break;
                }
                case "standard":
                default: {
                    tsVariant = { variant: "outlined" };
                    break;
                }
            }
            var p = props;
            delete p.variant;
            return __assign(__assign({}, p), tsVariant);
        })();
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(TextField_1.default, __assign({ InputProps: {
                    className: classes.input
                }, InputLabelProps: { shrink: true } }, tsProps, { error: this.state.error, required: this.props.required, type: "text", onKeyDown: this.onKeyDown, onBlur: this.onBlur, inputProps: this.inputProps, inputRef: function (inputRef) { return _this.inputRef = inputRef; } })),
            react_1.default.createElement(FErrorMessageModal_1.default, { open: this.state.modalOpen, onClose: this.onModalClose, errorMessage: this.props.errorMessage, errorMessageTitle: this.props.errorMessageTitle, onExited: this.onModalExited, onOkay: this.onModalOK, onCancel: this.onModalCancel })));
    };
    FNumField.defaultProps = {
        errorMessage: "Invalid value",
        errorMessageTitle: ""
    };
    return FNumField;
}(react_1.PureComponent));
exports.default = core_1.withStyles(styles)(FNumField);
//# sourceMappingURL=FNumField.js.map
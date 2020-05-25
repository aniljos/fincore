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
var FErrorMessageModal_1 = __importDefault(require("./FErrorMessageModal"));
var StringFormat_1 = require("./StringFormat");
var core_1 = require("@material-ui/core");
var styles = function (theme) { return ({
    root: {
        height: 35
    }
}); };
var FStrField = (function (_super) {
    __extends(FStrField, _super);
    function FStrField(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: "",
            modalOpen: false,
            error: false,
            type: "text",
            isInternalChange: false
        };
        _this.value = "";
        _this.inputProps = {};
        _this.capsOn = false;
        _this.isRequired = false;
        _this.type = "";
        _this.capsFormats = [
            StringFormat_1.StringFormat.type_ANC,
            StringFormat_1.StringFormat.type_GSTIN,
            StringFormat_1.StringFormat.type_IFSCCode,
            StringFormat_1.StringFormat.type_PanNo,
            StringFormat_1.StringFormat.type_XC,
            StringFormat_1.StringFormat.type_AC,
            StringFormat_1.StringFormat.type_Name,
            StringFormat_1.StringFormat.type_Name_Space,
            StringFormat_1.StringFormat.type_Name_Space_Dot
        ];
        _this.onKeyDown = function (evt) {
            if (_this.props.format === StringFormat_1.StringFormat.type_N) {
                if (evt.keyCode === 37 || evt.keyCode === 39 || evt.keyCode === 46 || evt.keyCode === 8 || evt.keyCode === 9 || (!evt.shiftKey && ((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 && evt.keyCode <= 105)))) {
                    return;
                }
                else {
                    evt.preventDefault();
                }
            }
        };
        _this.onChange = function (evt) {
            var _evt = __assign({}, evt);
            var value = _this.capsOn ? _evt.target.value.toUpperCase() : _evt.target.value;
            var reqexPattern = _this.props.format;
            var regex = new RegExp(reqexPattern);
            var isValid = regex.test(value);
            _this.setState({
                value: value,
                error: !isValid,
                isInternalChange: true
            }, function () {
                if (_this.props.onChange) {
                    _this.props.onChange(_evt);
                }
                _this.value = value;
            });
        };
        _this.onBlur = function () {
            if (!_this.inputRef.validity.valid) {
                _this.setState({
                    modalOpen: true,
                    error: true
                });
            }
            else {
                _this.setState({
                    error: false
                });
            }
        };
        _this.onModalClose = function () {
            _this.setState({
                modalOpen: false
            });
        };
        _this.onModalExited = function () {
            _this.inputRef.focus();
        };
        if (_this.props.value) {
            _this.state.value = _this.props.value;
        }
        if (_this.props.required) {
            _this.isRequired = _this.props.required;
        }
        else {
            _this.isRequired = false;
        }
        if (_this.props.format === StringFormat_1.StringFormat.type_N) {
            _this.type = "number";
        }
        return _this;
    }
    FStrField.prototype.componentDidMount = function () {
        if (this.props.componentRef) {
            this.props.componentRef(this);
        }
        this.setFormatValue();
    };
    FStrField.prototype.setFormatValue = function () {
        if (this.props.format !== StringFormat_1.StringFormat.type_x && this.props.format !== StringFormat_1.StringFormat.type_XC) {
            var pattern = this.props.format;
            this.inputProps.pattern = pattern;
        }
        if (this.props.length) {
            this.inputProps.maxLength = this.props.length;
        }
        this.capsOn = this.capsFormats.includes(this.props.format);
    };
    FStrField.getDerivedStateFromProps = function (props, current_state) {
        if ((current_state.value !== props.value) && !current_state.isInternalChange) {
            return {
                value: props.value,
                isInternalChange: false
            };
        }
        return {
            isInternalChange: false
        };
    };
    FStrField.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, format = _a.format, componentRef = _a.componentRef, errorMessage = _a.errorMessage, errorMessageTitle = _a.errorMessageTitle, props = __rest(_a, ["classes", "format", "componentRef", "errorMessage", "errorMessageTitle"]);
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
                    tsVariant = { variant: "standard" };
                    break;
                }
            }
            var p = props;
            delete p.variant;
            return __assign(__assign({}, p), tsVariant);
        })();
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(TextField_1.default, __assign({ error: this.state.error, variant: "outlined", type: this.type, InputProps: { className: classes.root }, InputLabelProps: { shrink: true } }, tsProps, { inputProps: this.inputProps, value: this.state.value, onChange: this.onChange, inputRef: function (inputRef) { return _this.inputRef = inputRef; }, onBlur: this.onBlur, ref: function (textFieldRef) { return _this.textFieldRef = textFieldRef; }, onKeyDown: this.onKeyDown })),
            react_1.default.createElement(FErrorMessageModal_1.default, { open: this.state.modalOpen, onClose: this.onModalClose, errorMessage: this.props.errorMessage, title: this.props.errorMessageTitle, onExited: this.onModalExited })));
    };
    FStrField.defaultProps = {
        format: StringFormat_1.StringFormat.type_x,
        errorMessage: "Invalid Value",
        errorMessageTitle: ""
    };
    return FStrField;
}(react_1.Component));
exports.default = core_1.withStyles(styles)(FStrField);
//# sourceMappingURL=FStrField.js.map
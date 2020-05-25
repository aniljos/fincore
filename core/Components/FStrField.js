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
var StringFormat_1 = require("./StringFormat");
var core_1 = require("@material-ui/core");
var styles = function (theme) { return ({}); };
var FStrField = (function (_super) {
    __extends(FStrField, _super);
    function FStrField(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            modalOpen: false,
            error: false,
            type: "text",
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
        _this.checkValidity = function () {
            return _this.inputRef.validity.valid;
        };
        _this.onBlur = function (evt) {
            var isValid = _this.checkValidity();
            if (!isValid) {
                _this.setState({
                    error: true
                });
            }
            else {
                _this.setState({
                    error: false
                });
            }
            if (_this.props.onBlur) {
                _this.props.onBlur(evt);
            }
        };
        _this.onKeyDown = function (evt) {
            if (_this.state.error) {
                _this.setState({
                    error: false
                });
            }
            if (_this.props.format === StringFormat_1.StringFormat.type_N) {
                if (evt.keyCode === 37 || evt.keyCode === 39 || evt.keyCode === 46 || evt.keyCode === 8 || evt.keyCode === 9 || (!evt.shiftKey && ((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 && evt.keyCode <= 105)))) {
                }
                else {
                    evt.preventDefault();
                }
            }
            if (_this.props.onKeyDown) {
                _this.props.onKeyDown(evt);
            }
        };
        _this.onChange = function (evt) {
            var _evt = __assign({}, evt);
            if (_this.capsOn) {
                _evt.target.value = _evt.target.value.toUpperCase();
            }
            if (_this.props.onChange) {
                _this.props.onChange(_evt);
            }
        };
        _this.setFormatValue();
        if (_this.props.format === StringFormat_1.StringFormat.type_N) {
            _this.state.type = "number";
        }
        return _this;
    }
    FStrField.prototype.componentDidMount = function () {
        if (this.props.componentRef) {
            this.props.componentRef(this.inputRef);
        }
        if (this.props.value) {
            if (this.capsOn && !this.isUpperCase(this.props.value)) {
                if (this.props.onChange) {
                    var evt = {
                        target: {
                            value: this.props.value.toUpperCase()
                        }
                    };
                    this.props.onChange(evt);
                }
            }
        }
    };
    FStrField.prototype.componentDidUpdate = function () {
        if (this.props.value) {
            if (this.capsOn && !this.isUpperCase(this.props.value)) {
                if (this.props.onChange) {
                    var evt = {
                        target: {
                            value: this.props.value.toUpperCase()
                        }
                    };
                    this.props.onChange(evt);
                }
            }
        }
    };
    FStrField.prototype.isUpperCase = function (str) {
        return str.toString() === str.toString().toUpperCase();
    };
    FStrField.prototype.setFormatValue = function () {
        if (this.props.format !== StringFormat_1.StringFormat.type_x) {
            var pattern = this.props.format;
            this.inputProps.pattern = pattern;
        }
        if (this.props.length) {
            this.inputProps.maxLength = this.props.length;
        }
        this.capsOn = this.capsFormats.includes(this.props.format);
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
                    tsVariant = { variant: variant };
                    break;
                }
                case "standard":
                default: {
                    tsVariant = { variant: variant };
                    break;
                }
            }
            var p = props;
            delete p.variant;
            return __assign(__assign({}, p), tsVariant);
        })();
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(TextField_1.default, __assign({ error: this.state.error, type: this.state.type, InputProps: { className: classes.root }, InputLabelProps: { shrink: true } }, tsProps, { onBlur: this.onBlur, onKeyDown: this.onKeyDown, onChange: this.onChange, inputProps: this.inputProps, inputRef: function (inputRef) { return _this.inputRef = inputRef; }, ref: function (textFieldRef) { return _this.textFieldRef = textFieldRef; } }))));
    };
    FStrField.defaultProps = {
        format: StringFormat_1.StringFormat.type_x,
        errorMessage: "Invalid Value",
        errorMessageTitle: "",
        variant: "outlined"
    };
    return FStrField;
}(react_1.PureComponent));
exports.default = core_1.withStyles(styles)(FStrField);
//# sourceMappingURL=FStrField.js.map
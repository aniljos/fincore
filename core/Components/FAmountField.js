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
var core_1 = require("@material-ui/core");
var react_text_mask_1 = __importDefault(require("react-text-mask"));
var createNumberMaskIndian_1 = __importDefault(require("../Helpers/createNumberMaskIndian"));
var numberToWords_1 = require("../Helpers/numberToWords");
var prop_types_1 = __importDefault(require("prop-types"));
var FErrorMessageModal_1 = __importDefault(require("./FErrorMessageModal"));
var FAmountMessageModal_1 = __importDefault(require("./FAmountMessageModal"));
var styles = function (theme) { return ({
    input: {
        height: 25,
        width: 150
    }
}); };
var numberMask = createNumberMaskIndian_1.default({
    prefix: '',
    allowDecimal: true,
    requireDecimal: false
});
function TextMaskCustom(props) {
    var inputRef = props.inputRef, other = __rest(props, ["inputRef"]);
    return (react_1.default.createElement(react_text_mask_1.default, __assign({}, other, { ref: function (ref) {
            inputRef(ref ? ref.inputElement : null);
        }, mask: numberMask, placeholderChar: '_', showMask: false, guide: false })));
}
TextMaskCustom.propTypes = {
    inputRef: prop_types_1.default.func.isRequired,
};
var FAmountField = (function (_super) {
    __extends(FAmountField, _super);
    function FAmountField(props) {
        var _this = _super.call(this, props) || this;
        _this.inputProps = {};
        _this.length = 13;
        _this.decimalLength = 2;
        _this.modalCloseReason = 1;
        _this.state = {
            error: false,
            modalOpen: false,
            wordsModalOpen: false,
            wordsMessage: ""
        };
        _this.getPattern = function () {
            var _a = _this, length = _a.length, decimalLength = _a.decimalLength;
            var regexpStr = "";
            if (_this.props.allowNegative) {
                regexpStr = "^[-]?\\d{0," + length + "}(\\.\\d{0," + decimalLength + "})?$";
            }
            else {
                regexpStr = "^\\d{0," + length + "}(\\.\\d{0," + decimalLength + "})?$";
            }
            var regexp = new RegExp(regexpStr);
            return regexp;
        };
        _this.onChange = function (evt) {
            var value = evt.target.value.replace(/,/g, "");
            if (!isNaN(value) && _this.props.onChangeValue) {
                var theValue = Number(value).toFixed(_this.decimalLength);
                _this.props.onChangeValue(theValue, numberToWords_1.convertNumberToWords(theValue), evt);
            }
            else {
                if (_this.props.onChangeValue) {
                    _this.props.onChangeValue("", "", evt);
                }
            }
        };
        _this.onKeyDown = function (evt) {
            if (_this.state.error) {
                _this.setState({
                    error: false
                });
            }
            if ([37, 39, 46, 8, 9, 110, 190, 109, 189].includes(evt.keyCode)
                || (!evt.shiftKey && ((evt.keyCode >= 48 && evt.keyCode <= 57)
                    || (evt.keyCode >= 96 && evt.keyCode <= 105)))) {
                return;
            }
            else {
                evt.preventDefault();
            }
        };
        _this.checkValidity = function () {
            var value = _this.inputRef.value.replace(/,/g, "");
            var pattern = _this.getPattern();
            if (_this.props.required) {
                return value !== "" && pattern.test(value);
            }
            else {
                return pattern.test(value);
            }
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
                if (evt.target.value != 0) {
                }
                if (_this.props.onBlur) {
                    _this.props.onBlur(evt);
                }
                if (_this.props.popupAmountInWords) {
                    var value = evt.target.value.replace(/,/g, "");
                    if (!isNaN(value) && _this.props.onChangeValue) {
                        var theValue = Number(value).toFixed(_this.decimalLength);
                        _this.setState({
                            wordsModalOpen: true,
                            wordsMessage: numberToWords_1.convertNumberToWords(theValue)
                        });
                    }
                }
            }
        };
        _this.onModalClose = function () {
            _this.setState({
                modalOpen: false
            });
        };
        _this.onWordsModalClose = function () {
            _this.setState({
                wordsModalOpen: false
            });
        };
        _this.onWordsModalOK = function () {
            _this.setState({
                wordsModalOpen: false
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
        _this.inputProps = {
            style: {
                'textAlign': 'right'
            }
        };
        var reqExp = _this.getPattern();
        _this.inputProps.pattern = reqExp.toString().replace(/\//g, '');
        return _this;
    }
    FAmountField.prototype.componentDidMount = function () {
        if (this.props.componentRef) {
            this.props.componentRef(this.inputRef);
        }
        if (this.props.value && this.props.onChangeValue) {
            if (this.props.value.toString().indexOf(".") === -1) {
                var updatedValue = parseFloat(this.props.value).toFixed(this.decimalLength);
                this.props.onChangeValue(updatedValue, numberToWords_1.convertNumberToWords(updatedValue));
            }
        }
    };
    FAmountField.prototype.componentDidUpdate = function () {
        if (this.props.value && this.props.onChangeValue) {
            if (this.props.value.toString().indexOf(".") === -1) {
                var updatedValue = parseFloat(this.props.value).toFixed(this.decimalLength);
            }
        }
    };
    FAmountField.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, onChangeValue = _a.onChangeValue, allowNegative = _a.allowNegative, popupAmountInWords = _a.popupAmountInWords, errorMessage = _a.errorMessage, errorMessageTitle = _a.errorMessageTitle, wordsTitle = _a.wordsTitle, componentRef = _a.componentRef, props = __rest(_a, ["classes", "onChangeValue", "allowNegative", "popupAmountInWords", "errorMessage", "errorMessageTitle", "wordsTitle", "componentRef"]);
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
            react_1.default.createElement(core_1.TextField, __assign({ InputLabelProps: { shrink: true } }, tsProps, { error: this.state.error, type: "text", inputProps: this.inputProps, InputProps: {
                    inputComponent: TextMaskCustom,
                    className: classes.input
                }, onKeyDown: this.onKeyDown, onBlur: this.onBlur, onChange: this.onChange, inputRef: function (inputRef) { return _this.inputRef = inputRef; } })),
            react_1.default.createElement(FErrorMessageModal_1.default, { open: this.state.modalOpen, onClose: this.onModalClose, errorMessage: this.props.errorMessage, errorMessageTitle: this.props.errorMessageTitle, onExited: this.onModalExited, onOkay: this.onModalOK, onCancel: this.onModalCancel }),
            react_1.default.createElement(FAmountMessageModal_1.default, { open: this.state.wordsModalOpen, onClose: this.onWordsModalClose, message: this.state.wordsMessage, onOkay: this.onWordsModalOK })));
    };
    FAmountField.defaultProps = {
        onBlur: function () { },
        required: false,
        allowNegative: false,
        popupAmountInWords: false,
        errorMessage: "Invalid value",
        errorMessageTitle: ""
    };
    return FAmountField;
}(react_1.PureComponent));
exports.default = core_1.withStyles(styles)(FAmountField);
//# sourceMappingURL=FAmountField.js.map
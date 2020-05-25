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
var prop_types_1 = __importDefault(require("prop-types"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var react_text_mask_1 = __importDefault(require("react-text-mask"));
var createNumberMaskIndian_1 = __importDefault(require("../Helpers/createNumberMaskIndian"));
var numberToWords_1 = require("../Helpers/numberToWords");
var core_1 = require("@material-ui/core");
var styles = function (theme) { return ({
    input: {
        height: 35
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
        _this.state = {
            error: false,
            _value: "0",
            isInternalChange: false
        };
        _this.onKeyDown = function (evt) {
            if ([37, 39, 46, 8, 9, 110, 190, 188, 189, 109].includes(evt.keyCode) || (!evt.shiftKey && ((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 && evt.keyCode <= 105)))) {
                return;
            }
            else {
                evt.preventDefault();
            }
        };
        _this.onBlur = function (evt) {
            if (_this.props.required) {
                _this.setState({
                    error: evt.target.value ? false : true
                });
            }
            _this.props.onBlur(evt);
        };
        _this.onFocus = function (evt) {
            _this.setState({ error: false });
            _this.props.onFocus(evt);
        };
        _this.onChange = function (evt) {
            _this.value = evt.target.value.replace(/,/g, "");
            try {
                var formattedValue = Number(_this.value).toFixed(2);
                _this.setState({
                    _value: Number(formattedValue).toFixed(2),
                    isInternalChange: true
                });
                _this.props.onChange(evt);
                _this.props.onChangeValue(Number(_this.value).toFixed(2), numberToWords_1.convertNumberToWords(_this.value));
            }
            catch (_a) {
                _this.setState({
                    _value: Number(0).toFixed(2)
                });
            }
        };
        _this.state._value = Number(_this.props.value).toFixed(2);
        _this.inputProps = {
            style: {
                'textAlign': 'right'
            }
        };
        return _this;
    }
    FAmountField.getDerivedStateFromProps = function (props, current_state) {
        if ((current_state._value !== props.value) && !current_state.isInternalChange) {
            return {
                _value: Number(props.value).toFixed(2),
                isInternalChange: false
            };
        }
        return {
            isInternalChange: false
        };
    };
    FAmountField.prototype.render = function () {
        var classes = this.props.classes;
        return (react_1.default.createElement(TextField_1.default, __assign({ variant: "outlined", InputLabelProps: { shrink: true } }, this.props, { error: this.state.error, onBlur: this.onBlur, type: "text", inputProps: this.inputProps, InputProps: {
                inputComponent: TextMaskCustom,
                className: classes.input
            }, required: this.props.required, onKeyDown: this.onKeyDown, onFocus: this.onFocus, onChange: this.onChange, value: this.state._value })));
    };
    FAmountField.defaultProps = {
        onBlur: function () { },
        onChange: function () { },
        onFocus: function () { },
        required: false,
        value: 0
    };
    return FAmountField;
}(react_1.Component));
exports.default = core_1.withStyles(styles)(FAmountField);
//# sourceMappingURL=FAmountField.js.map
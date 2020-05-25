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
var styles = function (theme) { return ({
    input: {
        height: 35
    }
}); };
var FNumField = (function (_super) {
    __extends(FNumField, _super);
    function FNumField(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            error: false,
            _value: 0
        };
        _this.inputProps = {};
        _this.value = 0;
        _this.onKeyDown = function (evt) {
            if ([37, 39, 46, 8, 9].includes(evt.keyCode) || (!evt.shiftKey && ((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 && evt.keyCode <= 105)))) {
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
            if (_this.props.onBlur) {
                _this.props.onBlur(evt);
            }
        };
        if (_this.props.length) {
            _this.inputProps.maxLength = _this.props.length;
        }
        return _this;
    }
    FNumField.prototype.render = function () {
        var _a = this.props, length = _a.length, classes = _a.classes, props = __rest(_a, ["length", "classes"]);
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
        return (react_1.default.createElement(TextField_1.default, __assign({ variant: "outlined", InputProps: {
                className: classes.input
            }, InputLabelProps: { shrink: true } }, tsProps, { error: this.state.error, required: this.props.required, type: "text", onKeyDown: this.onKeyDown, onBlur: this.onBlur, inputProps: this.inputProps })));
    };
    FNumField.defaultProps = {};
    return FNumField;
}(react_1.Component));
exports.default = core_1.withStyles(styles)(FNumField);
//# sourceMappingURL=FNumField.js.map
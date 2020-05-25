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
var date_fns_1 = __importDefault(require("@date-io/date-fns"));
var pickers_1 = require("@material-ui/pickers");
var core_1 = require("@material-ui/core");
var styles = function (theme) { return ({
    input: {
        height: 35
    }
}); };
var FTimeField = (function (_super) {
    __extends(FTimeField, _super);
    function FTimeField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FTimeField.prototype.render = function () {
        var classes = this.props.classes;
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(pickers_1.MuiPickersUtilsProvider, { utils: date_fns_1.default },
                react_1.default.createElement(pickers_1.KeyboardTimePicker, __assign({ inputVariant: "outlined", InputProps: { className: classes.input }, InputLabelProps: { shrink: true } }, this.props, { mask: "__:__ _M" })))));
    };
    return FTimeField;
}(react_1.Component));
exports.default = core_1.withStyles(styles)(FTimeField);
//# sourceMappingURL=FTimeField.js.map
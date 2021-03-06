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
var Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
var DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var core_1 = require("@material-ui/core");
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var FAmountMessageModal = (function (_super) {
    __extends(FAmountMessageModal, _super);
    function FAmountMessageModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleOK = function () {
            if (_this.props.onOkay) {
                _this.props.onOkay();
            }
        };
        return _this;
    }
    FAmountMessageModal.prototype.render = function () {
        var _a = this.props, message = _a.message, title = _a.title, onOkay = _a.onOkay, props = __rest(_a, ["message", "title", "onOkay"]);
        return (react_1.default.createElement(Dialog_1.default, __assign({}, props, { fullWidth: true, maxWidth: "xs" }),
            react_1.default.createElement(DialogTitle_1.default, null, this.props.title ? this.props.message : "FinCore Information"),
            react_1.default.createElement(DialogContent_1.default, null,
                react_1.default.createElement(core_1.Typography, { variant: "subtitle2", color: "primary" }, "Amount in Words"),
                react_1.default.createElement("br", null),
                react_1.default.createElement(core_1.Typography, { variant: "subtitle1", color: "primary" }, this.props.message)),
            react_1.default.createElement(core_1.DialogActions, null,
                react_1.default.createElement(Button_1.default, { size: "small", onClick: this.handleOK, color: "primary", autoFocus: true }, "OK"))));
    };
    return FAmountMessageModal;
}(react_1.Component));
exports.default = FAmountMessageModal;
//# sourceMappingURL=FAmountMessageModal.js.map
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
var core_1 = require("@material-ui/core");
var react_draggable_1 = __importDefault(require("react-draggable"));
function PaperComponent(props) {
    return (react_1.default.createElement(react_draggable_1.default, { cancel: '[class*="MuiDialogContent-root"]' },
        react_1.default.createElement(core_1.Paper, __assign({}, props))));
}
var FSearchWindow = (function (_super) {
    __extends(FSearchWindow, _super);
    function FSearchWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: true
        };
        _this.handleClose = function () {
            if (_this.props.onClose)
                _this.props.onClose();
        };
        return _this;
    }
    FSearchWindow.prototype.render = function () {
        var open = this.state.open;
        var contents = this.props.contents;
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(core_1.Dialog, { open: open, onClose: this.handleClose, PaperComponent: PaperComponent, "aria-labelledby": "draggable-dialog-title", fullWidth: true, maxWidth: "lg" },
                react_1.default.createElement(core_1.DialogTitle, { style: { cursor: 'move' }, id: "draggable-dialog-title" }, "Search"),
                react_1.default.createElement(core_1.DialogContent, null, contents),
                react_1.default.createElement(core_1.DialogActions, null,
                    react_1.default.createElement(core_1.Button, { variant: "outlined", onClick: this.handleClose, color: "primary" }, "Close")))));
    };
    FSearchWindow.defaultProps = {
        onClose: function () { },
        component: null,
    };
    return FSearchWindow;
}(react_1.Component));
exports.default = FSearchWindow;
//# sourceMappingURL=FSearchWIndow.js.map
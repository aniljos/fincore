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
var Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
var Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var LockOutlined_1 = __importDefault(require("@material-ui/icons/LockOutlined"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var react_router_1 = require("react-router");
var styles = function (theme) { return ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(/finacus.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    msgpaper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "crimson"
    },
}); };
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            userNameError: false,
            passwordError: false,
            invalid: false,
            userName: "admin",
            password: "admin",
            validating: false
        };
        _this.login = function () {
            var userNameError = !_this.userNameRef.value;
            var passwordError = !_this.passwordRef.value;
            if (userNameError || passwordError) {
                _this.setState({
                    userNameError: userNameError,
                    passwordError: passwordError
                });
                return;
            }
            else {
                if (_this.userNameRef.value === "admin" && _this.passwordRef.value === "admin") {
                    _this.setState({
                        validating: true
                    });
                    setTimeout(function () {
                        _this.setState({
                            validating: false
                        });
                        _this.props.history.push("/home");
                    }, 1000);
                }
                else {
                    _this.setState({
                        invalid: true
                    });
                }
            }
        };
        _this.onUserNameChange = function (evt) {
            _this.setState({
                userNameError: false,
                userName: evt.target.value
            });
        };
        _this.onPasswordChange = function (evt) {
            _this.setState({
                passwordError: false,
                password: evt.target.value
            });
        };
        return _this;
    }
    Login.prototype.render = function () {
        var _this = this;
        var classes = this.props.classes;
        return (react_1.default.createElement(Grid_1.default, { container: true, component: "main", className: classes.root },
            react_1.default.createElement(CssBaseline_1.default, null),
            react_1.default.createElement(Grid_1.default, { item: true, xs: false, sm: 4, md: 7, className: classes.image }),
            react_1.default.createElement(Grid_1.default, { item: true, xs: 12, sm: 8, md: 5 },
                react_1.default.createElement("div", { className: classes.paper },
                    react_1.default.createElement(Avatar_1.default, { className: classes.avatar },
                        react_1.default.createElement(LockOutlined_1.default, null)),
                    react_1.default.createElement(Typography_1.default, { component: "h1", variant: "h5" }, "Login"),
                    react_1.default.createElement(Typography_1.default, { hidden: !this.state.invalid, style: { textAlign: 'left', color: 'red' } }, "Invalid Credentials"),
                    react_1.default.createElement("form", { className: classes.form, noValidate: true },
                        react_1.default.createElement(TextField_1.default, { error: this.state.userNameError, variant: "outlined", margin: "normal", required: true, fullWidth: true, id: "username", label: "Username", name: "Username", autoFocus: true, inputRef: function (ref) { return _this.userNameRef = ref; }, onChange: this.onUserNameChange, value: this.state.userName }),
                        react_1.default.createElement(TextField_1.default, { error: this.state.passwordError, variant: "outlined", margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", inputRef: function (ref) { return _this.passwordRef = ref; }, onChange: this.onPasswordChange, value: this.state.password }),
                        react_1.default.createElement(FormControlLabel_1.default, { control: react_1.default.createElement(Checkbox_1.default, { value: "remember", color: "primary" }), label: "Remember me" }),
                        react_1.default.createElement(Button_1.default, { type: "button", fullWidth: true, variant: "contained", color: "primary", className: classes.submit, onClick: this.login }, "Login"),
                        react_1.default.createElement(Grid_1.default, { container: true },
                            react_1.default.createElement(Grid_1.default, { item: true, xs: true },
                                react_1.default.createElement(Paper_1.default, { hidden: !this.state.validating, className: classes.msgpaper },
                                    react_1.default.createElement(Typography_1.default, null, "Validating. Please Wait.."),
                                    react_1.default.createElement(core_1.LinearProgress, { color: "primary" })))))))));
    };
    return Login;
}(react_1.Component));
exports.default = react_router_1.withRouter(core_1.withStyles(styles)(Login));
//# sourceMappingURL=Login.js.map
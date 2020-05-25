"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringFormat;
(function (StringFormat) {
    StringFormat["type_x"] = "";
    StringFormat["type_XC"] = "[A-Z]";
    StringFormat["type_aN"] = "^[a-z0-9]*$";
    StringFormat["type_ANC"] = "^[a-zA-Z0-9]*$";
    StringFormat["type_a"] = "^[A-Za-z]*$";
    StringFormat["type_AC"] = "^[a-zA-Z]*$";
    StringFormat["type_Name"] = "^[a-zA-Z0-9]*[']{0,1}[a-zA-Z0-9]*$";
    StringFormat["type_Name_Space"] = "^[a-zA-Z0-9 ]*[']{0,1}[a-zA-Z0-9 ]*$";
    StringFormat["type_N"] = "^[0-9]*$";
    StringFormat["type_PanNo"] = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$";
    StringFormat["type_IFSCCode"] = "^[A-Z]{4}[0][a-zA-Z0-9]{6}$";
    StringFormat["type_GSTIN"] = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$";
    StringFormat["type_Name_Space_Dot"] = "^[a-zA-Z0-9 ]*[.]{0,1}[a-zA-Z0-9 ]*$";
})(StringFormat = exports.StringFormat || (exports.StringFormat = {}));
//# sourceMappingURL=StringFormat.js.map
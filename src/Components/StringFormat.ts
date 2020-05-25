export enum StringFormat {
    type_x = "",
    type_XC = "[A-Z]",
    type_aN = "^[a-z0-9]*$",
    type_ANC = "^[a-zA-Z0-9]*$",
    type_a = "^[A-Za-z]*$",
    type_AC = "^[a-zA-Z]*$",
    type_Name = "^[a-zA-Z0-9]*[']{0,1}[a-zA-Z0-9]*$",
    type_Name_Space = "^[a-zA-Z0-9 ]*[']{0,1}[a-zA-Z0-9 ]*$",
    type_N = "^[0-9]*$",
    //Validations On Value Changed
    type_PanNo = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
    type_IFSCCode = "^[A-Z]{4}[0][a-zA-Z0-9]{6}$",
    type_GSTIN = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
    type_Name_Space_Dot = "^[a-zA-Z0-9 ]*[.]{0,1}[a-zA-Z0-9 ]*$",
}
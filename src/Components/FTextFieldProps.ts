import { FormHelperTextProps } from "@material-ui/core/FormHelperText";
import { InputLabelProps } from "@material-ui/core/InputLabel";
import { PropTypes } from "@material-ui/core";
import { SelectProps } from "@material-ui/core/Select";

export interface FTextFieldProps {
    

    //inherited
    autoComplete?: string;
    autoFocus?: boolean;
    children?: React.ReactNode;
    defaultValue?: unknown;
    disabled?: boolean;
    error?: boolean;
    FormHelperTextProps?: Partial<FormHelperTextProps>;
    fullWidth?: boolean;
    helperText?: React.ReactNode;
    id?: string;
    InputLabelProps?: Partial<InputLabelProps>;
    inputRef?: React.Ref<any> | React.RefObject<any>;
    label?: React.ReactNode;
    margin?: PropTypes.Margin;
    multiline?: boolean;
    name?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    variant?: any,

    onBlur?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onFocus?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    placeholder?: string;
    required?: boolean;
    rows?: string | number;
    rowsMax?: string | number;
    select?: boolean;
    SelectProps?: Partial<SelectProps>;
    type?: string;
    value?: unknown;

 
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dollarSign = '$';
var emptyString = '';
var comma = ',';
var period = '.';
var minus = '-';
var minusRegExp = /-/;
var nonDigitsRegExp = /\D+/g;
var number = 'number';
var digitRegExp = /\d/;
var caretTrap = '[]';
function createNumberMaskIndian(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.prefix, prefix = _c === void 0 ? dollarSign : _c, _d = _b.suffix, suffix = _d === void 0 ? emptyString : _d, _e = _b.includeThousandsSeparator, includeThousandsSeparator = _e === void 0 ? true : _e, _f = _b.thousandsSeparatorSymbol, thousandsSeparatorSymbol = _f === void 0 ? comma : _f, _g = _b.allowDecimal, allowDecimal = _g === void 0 ? false : _g, _h = _b.decimalSymbol, decimalSymbol = _h === void 0 ? period : _h, _j = _b.decimalLimit, decimalLimit = _j === void 0 ? 2 : _j, _k = _b.requireDecimal, requireDecimal = _k === void 0 ? false : _k, _l = _b.allowNegative, allowNegative = _l === void 0 ? true : _l, _m = _b.allowLeadingZeroes, allowLeadingZeroes = _m === void 0 ? false : _m, _o = _b.integerLimit, integerLimit = _o === void 0 ? null : _o;
    var prefixLength = prefix && prefix.length || 0;
    var suffixLength = suffix && suffix.length || 0;
    var thousandsSeparatorSymbolLength = thousandsSeparatorSymbol && thousandsSeparatorSymbol.length || 0;
    function numberMask(rawValue) {
        if (rawValue === void 0) { rawValue = emptyString; }
        var rawValueLength = rawValue.length;
        if (rawValue === emptyString ||
            (rawValue[0] === prefix[0] && rawValueLength === 1)) {
            return prefix.split(emptyString).concat([digitRegExp]).concat(suffix.split(emptyString));
        }
        else if (rawValue === decimalSymbol &&
            allowDecimal) {
            return prefix.split(emptyString).concat(['0', decimalSymbol, digitRegExp]).concat(suffix.split(emptyString));
        }
        var isNegative = (rawValue[0] === minus) && allowNegative;
        if (isNegative) {
            rawValue = rawValue.toString().substr(1);
        }
        var indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol);
        var hasDecimal = indexOfLastDecimal !== -1;
        var integer;
        var fraction;
        var mask;
        if (rawValue.slice(suffixLength * -1) === suffix) {
            rawValue = rawValue.slice(0, suffixLength * -1);
        }
        if (hasDecimal && (allowDecimal || requireDecimal)) {
            integer = rawValue.slice(rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0, indexOfLastDecimal);
            fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength);
            fraction = convertToMask(fraction.replace(nonDigitsRegExp, emptyString));
        }
        else {
            if (rawValue.slice(0, prefixLength) === prefix) {
                integer = rawValue.slice(prefixLength);
            }
            else {
                integer = rawValue;
            }
        }
        if (integerLimit && typeof integerLimit === number) {
            var thousandsSeparatorRegex = thousandsSeparatorSymbol === '.' ? '[.]' : "" + thousandsSeparatorSymbol;
            var numberOfThousandSeparators = (integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []).length;
            integer = integer.slice(0, integerLimit + (numberOfThousandSeparators * thousandsSeparatorSymbolLength));
        }
        integer = integer.replace(nonDigitsRegExp, emptyString);
        if (!allowLeadingZeroes) {
            integer = integer.replace(/^0+(0$|[^0])/, '$1');
        }
        integer = (includeThousandsSeparator) ? addThousandsSeparator(integer, thousandsSeparatorSymbol) : integer;
        mask = convertToMask(integer);
        if ((hasDecimal && allowDecimal) || requireDecimal === true) {
            if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
                mask.push(caretTrap);
            }
            mask.push(decimalSymbol, caretTrap);
            if (fraction) {
                if (typeof decimalLimit === number) {
                    fraction = fraction.slice(0, decimalLimit);
                }
                mask = mask.concat(fraction);
            }
            if (requireDecimal === true && rawValue[indexOfLastDecimal - 1] === decimalSymbol) {
                mask.push(digitRegExp);
            }
        }
        if (prefixLength > 0) {
            mask = prefix.split(emptyString).concat(mask);
        }
        if (isNegative) {
            if (mask.length === prefixLength) {
                mask.push(digitRegExp);
            }
            mask = [minusRegExp].concat(mask);
        }
        if (suffix.length > 0) {
            mask = mask.concat(suffix.split(emptyString));
        }
        return mask;
    }
    numberMask.instanceOf = 'createNumberMask';
    return numberMask;
}
exports.default = createNumberMaskIndian;
function convertToMask(strNumber) {
    return strNumber
        .split(emptyString)
        .map(function (char) { return digitRegExp.test(char) ? digitRegExp : char; });
}
function addThousandsSeparator(n, thousandsSeparatorSymbol) {
    var s = parseFloat(n).toLocaleString('en-IN', { maximumFractionDigits: 2 });
    return s;
}
//# sourceMappingURL=createNumberMaskIndian.js.map
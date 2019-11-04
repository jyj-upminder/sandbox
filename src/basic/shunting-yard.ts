"use strict";
class Calculation {

		_symbols = {}

    constructor() {
        this._symbols = {};
        this.defineOperator("!", this.factorial,      "postfix", 6);
        this.defineOperator("^", Math.pow,            "infix",   5, true);
        this.defineOperator("*", this.multiplication, "infix",   4);
        this.defineOperator("/", this.division,       "infix",   4);
        this.defineOperator("+", this.last,           "prefix",  3);
        this.defineOperator("-", this.negation,       "prefix",  3);
        this.defineOperator("+", this.addition,       "infix",   2);
        this.defineOperator("-", this.subtraction,    "infix",   2);
        this.defineOperator(",", Array.of,            "infix",   1);
        this.defineOperator("(", this.last,           "prefix");
        this.defineOperator(")", null,                "postfix");
        this.defineOperator("min", Math.min);
        this.defineOperator("sqrt", Math.sqrt);
    }
    // Method allowing to extend an instance with more operators and functions:
    defineOperator(symbol: string, f, notation = "func", precedence = 0, rightToLeft = false) {
        // Store operators keyed by their symbol/name. Some symbols may represent
        // different usages: e.g. "-" can be unary or binary, so they are also
        // keyed by their notation (prefix, infix, postfix, func):
        if (notation === "func") { precedence = 0; }
        this._symbols[symbol] = Object.assign({}, this._symbols[symbol], {
            [notation]: {
                symbol, f, notation, precedence, rightToLeft, 
                argCount: 1 + (notation === "infix")
            },
            symbol,
            regSymbol: symbol.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&')
                + (/\w$/.test(symbol) ? "\\b" : "") // add a break if it's a name 
        });
    }
    last(...a: any[])           { return a[a.length-1] }
    negation(a: number)          { return -a }
    addition(a: string | number, b: string | number)       { return a + b }
    subtraction(a: number, b: number)    { return a - b }
    multiplication(a: number, b: number) { return a * b }
    division(a: number, b: number)       { return a / b }
    factorial(a: number) {
        if (a%1 || !(+a>=0)) { return NaN }
        if (a > 170) { return Infinity; }
        let b = 1;
        while (a > 1) { b *= a--; }
        return b;
    }
    calculate(expression: string) {
        let match: RegExpExecArray | string[] | (string | undefined)[] | null;
        // tslint:disable-next-line: one-variable-per-declaration
        const values: any[] | never[] = [],
            operators = [this._symbols["("].prefix],
            exec = (_: undefined) => {
                let op = operators.pop();
                values.push(op.f(...[].concat(...values.splice(-op.argCount))));
                return op.precedence;
            },
            error = (msg: string) => {
                // tslint:disable-next-line: prefer-const
                let notation = match ? match.index : expression.length;
                return `${msg} at ${notation}:\n${expression}\n${' '.repeat(notation)}^`;
            },
            pattern = new RegExp(
                // Pattern for numbers
                "\\d+(?:\\.\\d+)?|" 
                // ...and patterns for individual operators/function names
                + Object.values(this._symbols)
                        // longer symbols should be listed first
                        .sort( (a, b) => b.symbol.length - a.symbol.length ) 
                        .map( val => val.regSymbol ).join('|')
                + "|(\\S)", "g"
            );
        let afterValue = false;
        pattern.lastIndex = 0; // Reset regular expression object
        do {
            match = pattern.exec(expression);
            const [token, bad] = match || [")", undefined],
                notNumber = this._symbols[token],
                notNewValue = notNumber && !notNumber.prefix && !notNumber.func,
                notAfterValue = !notNumber || !notNumber.postfix && !notNumber.infix;
            // Check for syntax errors:
            if (bad || (afterValue ? notAfterValue : notNewValue)) { return error("Syntax error"); }
            if (afterValue) {
                // We either have an infix or postfix operator (they should be mutually exclusive)
                const curr = notNumber.postfix || notNumber.infix;
                do {
                    const prev = operators[operators.length-1];
                    if (((curr.precedence - prev.precedence) || prev.rightToLeft) > 0) { break; } 
                    // Apply previous operator, since it has precedence over current one
                } while (exec()); // Exit loop after executing an opening parenthesis or function
                afterValue = curr.notation === "postfix";
                if (curr.symbol !== ")") {
                    operators.push(curr);
                    // Postfix always has precedence over any operator that follows after it
                    if (afterValue) { exec(); }
                }
            } else if (notNumber) { // prefix operator or function
                operators.push(notNumber.prefix || notNumber.func);
                if (notNumber.func) { // Require an opening parenthesis
                    match = pattern.exec(expression);
                    if (!match || match[0] !== "(") { return error("Function needs parentheses") }
                }
            } else { // number
                values.push(+token);
                afterValue = true;
            }
        } while (match && operators.length);
        return operators.length ? error("Missing closing parenthesis")
                : match ? error("Too many closing parentheses")
                : values.pop() // All done!
    }
}
Calculation = new Calculation(); // Create a singleton

// I/O handling
function perform() {
    // tslint:disable-next-line: one-variable-per-declaration
    const expr = document.getElementById('expr').value,
        result = Calculation.calculate(expr);
    document.getElementById('out').textContent = isNaN(result) ? result : '=' + result;
}
document.getElementById('expr').addEventListener('input', perform);
perform();

// Tests
const tests = [
    { expr: '1+2', expected: 3 },
    { expr: '1+2*3', expected: 7 },
    { expr: '1+2*3^2', expected: 19 },
    { expr: '1+2*2^3^2', expected: 1025 },
    { expr: '-3!', expected: -6 },
    { expr: '12---11+1-3', expected: -1 },
    { expr: 'min(2,1,3)', expected: 1 },
    { expr: '(2,1,3)', expected: 3 },
    { expr: '4-min(sqrt(2+2*7),9,5)', expected: 0 },
    { expr: '2,3,10', expected: 10 }
]

for (let {expr, expected} of tests) {
    let result = Calculation.calculate(expr);
    console.assert(result === expected, `${expr} should be ${expected}, but gives ${result}`);
}
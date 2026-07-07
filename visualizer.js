class CalculatorVisualizer {
    constructor() {
        this.states = [];
        this.currentStateIndex = 0;
    }

    // Determine precedence of operators
    getPrecedence(op) {
        if (op === '+' || op === '-') return 1;
        if (op === '*' || op === '/') return 2;
        return 0; // for '('
    }

    // Apply operator
    applyOp(op, b, a) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return Math.trunc(a / b);
        }
        return 0;
    }

    // Preprocess to handle spaces and detect unary operators
    // Returns a list of tokens, where each token has:
    // { type: 'number' | 'operator' | 'paren', value: string/number, originalIndex: number }
    tokenize(s) {
        let tokens = [];
        let i = 0;
        let n = s.length;
        
        while (i < n) {
            let c = s[i];
            if (c === ' ') {
                i++;
                continue;
            }
            
            if (c >= '0' && c <= '9') {
                let start = i;
                let val = 0;
                while (i < n && s[i] >= '0' && s[i] <= '9') {
                    val = val * 10 + parseInt(s[i]);
                    i++;
                }
                tokens.push({ type: 'number', value: val, originalIndex: start, length: i - start });
                continue;
            }
            
            if (c === '+' || c === '-' || c === '*' || c === '/' || c === '(' || c === ')') {
                tokens.push({ type: c === '(' || c === ')' ? 'paren' : 'operator', value: c, originalIndex: i, length: 1 });
                i++;
                continue;
            }
            // Ignore unrecognized characters
            i++;
        }
        return tokens;
    }

    // Generates the step-by-step history of evaluating expression s
    generateSteps(s) {
        this.states = [];
        this.currentStateIndex = 0;
        
        const tokens = this.tokenize(s);
        const valuesStack = [];
        const opsStack = [];
        
        const pushState = (tokenIdx, desc, highlightToken = null) => {
            // Find current character index for highlighting
            let charIndex = -1;
            let highlightLength = 1;
            if (highlightToken) {
                charIndex = highlightToken.originalIndex;
                highlightLength = highlightToken.length;
            } else if (tokenIdx >= 0 && tokenIdx < tokens.length) {
                charIndex = tokens[tokenIdx].originalIndex;
                highlightLength = tokens[tokenIdx].length;
            }
            
            // Build highlighted string HTML
            let highlightedExpr = '';
            if (charIndex !== -1) {
                highlightedExpr = 
                    s.substring(0, charIndex) + 
                    `<span class="highlight-char">${s.substring(charIndex, charIndex + highlightLength)}</span>` + 
                    s.substring(charIndex + highlightLength);
            } else {
                highlightedExpr = s;
            }

            this.states.push({
                index: charIndex,
                highlightedExpr: highlightedExpr,
                valuesStack: [...valuesStack],
                opsStack: [...opsStack],
                description: desc,
                completed: false
            });
        };

        pushState(-1, "Start evaluation. Stacks are currently empty.");

        let i = 0;
        while (i < tokens.length) {
            let tok = tokens[i];
            
            if (tok.type === 'number') {
                valuesStack.push(tok.value);
                pushState(i, `Encountered number <strong>${tok.value}</strong>. Pushing it to the values stack.`, tok);
            } else if (tok.value === '(') {
                opsStack.push('(');
                pushState(i, "Encountered opening parenthesis <strong>'('</strong>. Pushing it to the operators stack.", tok);
            } else if (tok.value === ')') {
                pushState(i, "Encountered closing parenthesis <strong>')'</strong>. Evaluating operators until matching <strong>'('</strong>.", tok);
                
                while (opsStack.length > 0 && opsStack[opsStack.length - 1] !== '(') {
                    let op = opsStack.pop();
                    let val2 = valuesStack.pop();
                    let val1 = valuesStack.pop();
                    let res = this.applyOp(op, val2, val1);
                    valuesStack.push(res);
                    pushState(i, `Popped operator <strong>'${op}'</strong> and operands <strong>${val1}</strong>, <strong>${val2}</strong>. Result <strong>${res}</strong> pushed back to values stack.`, tok);
                }
                
                if (opsStack.length > 0 && opsStack[opsStack.length - 1] === '(') {
                    opsStack.pop(); // remove '('
                    pushState(i, "Found matching opening parenthesis <strong>'('</strong>. Popping it from the operators stack.", tok);
                }
            } else {
                // Operator (+, -, *, /)
                // Check for unary operator: if current is + or - and (it is the first token OR previous token was an operator or '(')
                let isUnary = false;
                if (tok.value === '+' || tok.value === '-') {
                    if (i === 0) {
                        isUnary = true;
                    } else {
                        let prevTok = tokens[i - 1];
                        if (prevTok.type === 'operator' || prevTok.value === '(') {
                            isUnary = true;
                        }
                    }
                }
                
                if (isUnary) {
                    if (tok.value === '-') {
                        // Unary minus: we push a 0 and treat '-' as normal binary minus
                        valuesStack.push(0);
                        pushState(i, "Detected unary minus <strong>'-'</strong>. Pushing dummy operand <strong>0</strong> to values stack to resolve it.", tok);
                        
                        // Proceed to push '-' operator
                        while (opsStack.length > 0 && this.getPrecedence(opsStack[opsStack.length - 1]) >= this.getPrecedence('-')) {
                            let op = opsStack.pop();
                            let val2 = valuesStack.pop();
                            let val1 = valuesStack.pop();
                            let res = this.applyOp(op, val2, val1);
                            valuesStack.push(res);
                            pushState(i, `Popped operator <strong>'${op}'</strong> and operands <strong>${val1}</strong>, <strong>${val2}</strong>. Result <strong>${res}</strong> pushed back to values stack.`, tok);
                        }
                        opsStack.push('-');
                        pushState(i, "Pushing operator <strong>'-'</strong> to the operators stack.", tok);
                    } else {
                        // Unary plus: we can just ignore it
                        pushState(i, "Detected unary plus <strong>'+'</strong>. Ignoring it as it doesn't change value.", tok);
                    }
                } else {
                    // Binary operator
                    pushState(i, `Encountered operator <strong>'${tok.value}'</strong>. Checking precedence against operators stack.`, tok);
                    
                    while (opsStack.length > 0 && this.getPrecedence(opsStack[opsStack.length - 1]) >= this.getPrecedence(tok.value)) {
                        let op = opsStack.pop();
                        let val2 = valuesStack.pop();
                        let val1 = valuesStack.pop();
                        let res = this.applyOp(op, val2, val1);
                        valuesStack.push(res);
                        pushState(i, `Operator <strong>'${op}'</strong> has higher or equal precedence than <strong>'${tok.value}'</strong>. Popping and evaluating: <strong>${val1} ${op} ${val2} = ${res}</strong>.`, tok);
                    }
                    opsStack.push(tok.value);
                    pushState(i, `Pushing operator <strong>'${tok.value}'</strong> to the operators stack.`, tok);
                }
            }
            i++;
        }
        
        pushState(-1, "Expression end reached. Evaluating remaining operators on the stack.");
        
        while (opsStack.length > 0) {
            let op = opsStack.pop();
            let val2 = valuesStack.pop();
            let val1 = valuesStack.pop();
            let res = this.applyOp(op, val2, val1);
            valuesStack.push(res);
            pushState(-1, `Popped operator <strong>'${op}'</strong> and operands <strong>${val1}</strong>, <strong>${val2}</strong>. Result <strong>${res}</strong> pushed back to values stack.`);
        }
        
        const finalResult = valuesStack.length > 0 ? valuesStack[0] : 0;
        
        this.states.push({
            index: -1,
            highlightedExpr: s,
            valuesStack: [...valuesStack],
            opsStack: [...opsStack],
            description: `Evaluation finished. The final result is <strong>${finalResult}</strong>.`,
            completed: true,
            result: finalResult
        });
        
        return this.states;
    }
}
window.CalculatorVisualizer = CalculatorVisualizer;

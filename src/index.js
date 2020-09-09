function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let arr = expr.split('').filter(val => val !== ' ');

    for (let i = 0; i < arr.length; i++) {
        if ((!isNaN(arr[i])) && (!isNaN(arr[i + 1]))) {
            arr[i] = arr[i] + arr[i + 1];
            arr.splice(i + 1, 1);
            i--;
        }
    }
    arr = arr.map(val => isNaN(val) ? val : +val);

    const leftBracket = arr.filter(val => val === '(').length;
    const rightBracket = arr.filter(val => val === ')').length;
    if (leftBracket !== rightBracket) {
        throw new Error('ExpressionError: Brackets must be paired');
    };

    arr.forEach((val, index, arr) => {
        if ((val === '/') && arr[index + 1] === 0) {
            throw new Error("TypeError: Division by zero.");
        }
    })

    function calc(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '*') {
                arr[i - 1] = arr[i - 1] * arr[i + 1];
                arr.splice(i, 2);
                i--;
            } else if (arr[i] === '/') {
                arr[i - 1] = arr[i - 1] / arr[i + 1];
                arr.splice(i, 2);
                i--;
            }
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '+') {
                arr[i - 1] = arr[i - 1] + arr[i + 1];
                arr.splice(i, 2);
                i--;
            } else if (arr[i] === '-') {
                arr[i - 1] = arr[i - 1] - arr[i + 1];
                arr.splice(i, 2);
                i--;
            }
        }
        return arr[0];
    }

    function brackets(arr) {
        const finish = arr.indexOf(')');
        for (let i = finish; i >= 0; i--) {
            if (arr[i] === '(') {
                let newArr = arr.splice(i, finish - i + 1);
                newArr = newArr.slice(1, -1);
                let result = calc(newArr);
                arr.splice(i, 0, result);
                if (arr.indexOf(')') !== -1) {
                    brackets(arr);
                }
            }
        }
    }
    brackets(arr);
    return calc(arr);
}

module.exports = {
    expressionCalculator
}
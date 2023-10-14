import {FibonacciCalculator} from "../fibonacciCalculator.js";

describe('Fibonacci calculator in', () => {
    const fibonacciCalculator = FibonacciCalculator.create()
    test('first iteration, returns 0', async () => {
        const result = fibonacciCalculator.calculate(0)

        expect(result).toBe(0)
    });
    test('second iteration, returns 1', async () => {

    const result = fibonacciCalculator.calculate(1)

    expect(result).toBe(1)
    });

    test('third iteration, returns 1', async () => {

        const result = fibonacciCalculator.calculate(2)

        const expectedReturn1 = fibonacciCalculator.calculate(0) + fibonacciCalculator.calculate(1)

        expect(result).toBe(expectedReturn1)
    });

    test('fourth iteration, returns 2', async () => {

        const result = fibonacciCalculator.calculate(3)

        const expectedReturn2 = fibonacciCalculator.calculate(2) + fibonacciCalculator.calculate(1)
        expect(result).toBe(expectedReturn2)
    });

    test('fifth iteration, returns 5', async () => {

        const result = fibonacciCalculator.calculate(4)

        const expectedReturn = fibonacciCalculator.calculate(3) + fibonacciCalculator.calculate(2)
        expect(result).toBe(expectedReturn)
    });

    test('sixth iteration, returns 5', async () => {

        const result = fibonacciCalculator.calculate(5)

        const expectedReturn = fibonacciCalculator.calculate(4) + fibonacciCalculator.calculate(3)
        expect(result).toBe(expectedReturn)
    });
});
//expect(fibonacci(3)).toBe(fibonacci(1) + fibonacci(2));

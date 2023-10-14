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

});

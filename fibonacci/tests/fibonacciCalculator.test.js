import {FibonacciCalculator} from "../fibonacciCalculator.js";

describe('Fibonacci calculator in', () => {
    const fibonacciCalculator = FibonacciCalculator.create()
    test('first iteration, returns 0', async () => {
        const result = fibonacciCalculator.calculate()

        expect(result).toBe(0)
    });
});
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

    test.each([
        [2, 1, 0],
        [3, 2, 1],
        [4, 3, 2],
        [5, 4, 3],
        [6, 5, 4],
        [7, 6, 5]
    ])('iteration %s, returns %s', async (iteration, iterationMinus1, iterationMinus2) => {
        const fibonacci = fibonacciCalculator.calculate(iteration)

        const expectedResult = fibonacciCalculator.calculate(iterationMinus1) + fibonacciCalculator.calculate(iterationMinus2)
        expect(fibonacci).toBe(expectedResult)
    });
});

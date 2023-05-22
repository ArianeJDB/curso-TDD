import {StringCalculator} from "../stringCalculator.js";

describe('String Calculator', () => {
    const stringCalculator = StringCalculator.create()
    test('returns 0 when input is null', async () => {
        const input = null

       const result = stringCalculator.calculate(input)

        expect(result).toBe(0)
    });

    test('when input is one number in string format returns it as a number', async () => {
        const input = "4"

        const result = stringCalculator.calculate(input)

        expect(result).toBe(4)
    });

    test('when input are numbers separated by commas returns the result of the sum', async () => {
        const input = '2,3,4,5'

        const result = stringCalculator.calculate(input)

        expect(result).toBe(14)
    });
    test('when input are numbers separated by commas and there is a letter, avoid the letter and returns the result of the sum', async () => {
        const input = '2,3,4,a,b,c,5'

        const result = stringCalculator.calculate(input)

        expect(result).toBe(14)
    });

    test('when input is separated by // in the beginning, / in the end or commas, returns the result of the sum', async () => {
        const input = '2//fgh/3,4,1//%/1'

        const result = stringCalculator.calculate(input)

        expect(result).toBe(11)
    });
});
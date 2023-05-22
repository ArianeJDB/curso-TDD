import {PasswordValidator} from "../passwordValidator.js";

describe('Password Validator validates when password has', () => {
    const passwordValidator = PasswordValidator.create()
        test('all rules', async () => {
            const input = '1_PASs'

            const validator = passwordValidator.validate(input)

            expect(validator).toBe(true)
        });

    describe('does not validate when', () => {
        test('is less than 6 long', async () => {
            const input = '1_aA'

            const validator = passwordValidator.validate(input)

            expect(validator).toBe(false)
        });

        test('does not have any number', async () => {
            const input = 'aA_eee'

            const validator = passwordValidator.validate(input)

            expect(validator).toBe(false)
        });

        test('does not have any character in lowercase', async () => {
            const input = '1_PASSWORD'

            const validator = passwordValidator.validate(input)

            expect(validator).toBe(false)
        });

        test('does not have any character in uppercase', async () => {
            const input = '1_pass'

            const validator = passwordValidator.validate(input)

            expect(validator).toBe(false)
        });

        test('does not have any underscore', async () => {
            const input = '12Pass'

            const validator = passwordValidator.validate(input)

            expect(validator).toBe(false)
        });

        test('does not follow some rule', async () => {
            const input = 'PASS'

            const validator = passwordValidator.validate(input)

            expect(validator).toBe(false)
        });
    });
});
import {CsvFilter} from "../csvFilter.js";

describe('CSV Filter', () => {
    const csvFilter = CsvFilter.create()
    const header = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
    describe('when file has only recipe and', () => {
        test('recipe is correct, returns the same row ', async () => {
            const row = '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,'

            const result = csvFilter.filter({header, row})

            expect(result).toStrictEqual([header, row])
        });

        test('header is empty, returns [] ', async () => {
            const header = ''
            const row = '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,N789789'

            const result = csvFilter.filter({header, row})

            expect(result).toStrictEqual([])
        });

        test('row is empty, returns [] ', async () => {
            const row = ''

            const result = csvFilter.filter({header, row})

            expect(result).toStrictEqual([])
        });

        test('there is IVA and IGIC, removes the row', async () => {
            const row = '1,02/05/2021,1000,790,21,4,ACER Laptop,B76430134,'

            const result = csvFilter.filter({header, row})

            expect(result).toStrictEqual([header])
        });

        test('there is not IVA nor IGIC, removes the row ', async () => {
            const row = '1,02/05/2021,1000,790,,,ACER Laptop,B76430134,'

            const result = csvFilter.filter({header, row})

            expect(result).toStrictEqual([header])
        });

        test('IGIC is not a number, removes the row', async () => {
            const row = '1,02/05/2021,1000,790,,er,ACER Laptop,B76430134,'

            const result = csvFilter.filter({header, row})

            expect(result).toStrictEqual([header])
        });

        test('IVA is not a number, removes the row', async () => {
            const row = '1,02/05/2021,1000,790,vhj,,ACER Laptop,B76430134,'

            const result = csvFilter.filter({header, row})

            expect(result).toStrictEqual([header])
        });

        test('neto is calculated wrong, removes the row', async () => {
            const row = '1,02/05/2021,1000,790,,4,ACER Laptop,B76430134,'

            const result = csvFilter.filter({header, row})

            expect(result).toStrictEqual([header])
        });

        test('there is CIF and NIF, removes the row', async () => {
            const row = '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,N789789'

            const result = csvFilter.filter({header, row})

            expect(result).toStrictEqual([header])
        });
    });
});
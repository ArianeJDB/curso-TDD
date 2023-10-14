import {CsvFilter} from "../csvFilter.js";

describe('CSV Filter', () => {
    const csvFilter = CsvFilter.create()
    const header = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
    describe('when file has only recipe and', () => {
        test('recipe is correct, returns the same row', async () => {
            const rows = ['1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,']

            const result = csvFilter.filter({header, rows})
            expect(result).toStrictEqual([header, rows])
        });

        test.each([
            ['header is empty', [], ['1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,N789789']],
            ['row is empty', 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente', []]
        ])('when %s returns []', (_, header, rows) => {
            const result = csvFilter.filter({header, rows})

            expect(result).toStrictEqual([])
        });

        test.each([
            ['there is IVA and IGIC', ['1,02/05/2021,1000,790,21,4,ACER Laptop,B76430134,']],
            ['there is not IVA nor IGIC', ['1,02/05/2021,1000,790,,,ACER Laptop,B76430134,']],
            ['IGIC is not a number', ['1,02/05/2021,1000,790,,er,ACER Laptop,B76430134,']],
            ['IVA is not a number', ['1,02/05/2021,1000,790,vhj,,ACER Laptop,B76430134,']],
            ['neto is calculated wrong', ['1,02/05/2021,1000,790,,4,ACER Laptop,B76430134,']],
            ['there is CIF and NIF', ['1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,N789789']]
        ])('when %s, removes the row', async (_, rows) => {
            const result = csvFilter.filter({header, rows})

            expect(result).toStrictEqual([header, []])
        });
    })

    describe('when file has more than one recipe', () => {
        test('and all are correct, returns the same rows', async () => {
            const rows = [
                '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,',
                '1,02/05/2021,1000,790,21,,ACER Laptop,B763333334,'
            ]

            const result = csvFilter.filter({header, rows})

            expect(result).toStrictEqual([header, rows])
        });

        test('and header is empty and all rows are correct, returns []', async () => {
            const header = ''
            const rows = [
                '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,',
                '1,02/05/2021,1000,790,21,,ACER Laptop,B763333334,'
            ]

            const result = csvFilter.filter({header, rows})

            expect(result).toStrictEqual([])
        });

        test('and one row is correct and other is wrong, returns only the correct row', async () => {
            const rows = [
                '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,',
                '1,02/05/2021,1000,790,21,4,ACER Laptop,B763333334,'
            ]

            const result = csvFilter.filter({header, rows})

            const expectedRow = [rows[0]]
            expect(result).toStrictEqual([header, expectedRow])
        });

        test('two rows are correct and other two are wrong, returns only the two correct row', async () => {
            const rows = [
                '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,',
                '1,02/05/2021,1000,790,vhj,,ACER Laptop,B76430134,',
                '1,02/05/2021,1000,790,21,,ACER Laptop,B763333334,',
                '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,N789789'
            ]

            const result = csvFilter.filter({header, rows})

            const expectedRows = [rows[0], rows [2]]
            expect(result).toStrictEqual([header, expectedRows])
        });
    });
});
import {CsvFilter} from "../csvFilter.js";

describe('CSV Filter', () => {
    const csvFilter = CsvFilter.create()
    describe('when file has only recipe', () => {
        test('returns the same line when recipe is correct', async () => {
            const titles = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
            const line = '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,'

            const result = csvFilter.filter(titles, line)

            expect(result).toStrictEqual([titles, line])
        });

        test('returns [] when titles is empty', async () => {
            const titles = ''
            const line = '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,N789789'

            const result = csvFilter.filter(titles, line)

            expect(result).toStrictEqual([])
        });


        test('returns [] when line is empty', async () => {
            const titles = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
            const line = ''

            const result = csvFilter.filter(titles, line)

            expect(result).toStrictEqual([])
        });

        test('removes the line when there is IVA and IGIC', async () => {
            const titles = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
            const line = '1,02/05/2021,1000,790,21,4,ACER Laptop,B76430134,'

            const result = csvFilter.filter(titles, line)

            expect(result).toStrictEqual([titles])
        });

        test('removes the line when there is not IVA nor IGIC', async () => {
            const titles = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
            const line = '1,02/05/2021,1000,790,,,ACER Laptop,B76430134,'

            const result = csvFilter.filter(titles, line)

            expect(result).toStrictEqual([titles])
        });

        test('removes the line when IGIC is not a number', async () => {
            const titles = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
            const line = '1,02/05/2021,1000,790,,er,ACER Laptop,B76430134,'

            const result = csvFilter.filter(titles, line)

            expect(result).toStrictEqual([titles])
        });

        test('removes the line when IVA is not a number', async () => {
            const titles = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
            const line = '1,02/05/2021,1000,790,vhj,,ACER Laptop,B76430134,'

            const result = csvFilter.filter(titles, line)

            expect(result).toStrictEqual([titles])
        });

        test('removes the line when neto is calculated wrong', async () => {
            const titles = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
            const line = '1,02/05/2021,1000,790,,4,ACER Laptop,B76430134,'

            const result = csvFilter.filter(titles, line)

            expect(result).toStrictEqual([titles])
        });

        test('removes the line when there is CIF and NIF', async () => {
            const titles = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
            const line = '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,N789789'

            const result = csvFilter.filter(titles, line)

            expect(result).toStrictEqual([titles])
        });
    });
});
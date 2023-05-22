import {CsvFilter} from "../csvFilter.js";

describe('CSV Filter', () => {
    const csvFilter = CsvFilter.create()
    describe('when there is only recipe', () => {
        test('when recipe is correct returns same line', async () => {
            const titles = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
            const line = '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,'

            const result = csvFilter.filter(titles, line)

            expect(result).toStrictEqual([titles, line])
        });

        test('when there is IVA and IGIC should remove the line', async () => {
            const titles = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
            const line = '1,02/05/2021,1000,790,21,4,ACER Laptop,B76430134,'

            const result = csvFilter.filter(titles, line)

            expect(result).toStrictEqual([titles])
        });

    });
});
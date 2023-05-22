import {CsvFilter} from "../csvFilter.js";

describe('CSV Filter', () => {
    const csvFilter = CsvFilter.create()
    describe('when there is only recipe in the CSV file', () => {
        test('returns same line when recipe is correct', async () => {
            const titles = 'Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente'
            const line = '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,'

            const result = csvFilter.filter(titles, line)

            expect(result).toMatchObject([titles, line])
        });
    });
});
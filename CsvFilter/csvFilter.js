export const CsvFilter = {
  create: _create
}

function _create () {
  function filter () {
    return ['Num_factura, Fecha, Bruto, Neto, IVA, IGIC, Concepto, CIF_cliente, NIF_cliente', '1,02/05/2021,1000,790,21,,ACER Laptop,B76430134,']
  }

  return {
    filter
  }
}
export const CsvFilter = {
  create: _create
}

function _create () {
  function filter (titles, line) {
    if (line === '') {
      return []
    }
    if(titles === '') {
      return []
    }
    const lineSplit = line.split(',')
    if (lineSplit[4] !== '' && lineSplit[5] !== '') {
      return [titles]
    }
    if (lineSplit[7] !== '' && lineSplit[8] !== '') {
      return [titles]
    }
    return [titles, line]
  }

  return {
    filter
  }
}

// - Es válido que algunos campos estén vacíos, apareciendo dos comas seguidas o una coma final.
// - El número de factura no puede estar repetido, si lo estuviese eliminaremos todas las líneas con repetición.
// - Los impuestos IVA e IGIC son excluyentes, es decir, sólo puede aplicarse uno de los dos.
//        Si alguna línea tiene contenido en ambos campos debe quedarse fuera.
// - Los campos CIF y NIF son excluyentes, sólo se puede usar uno de ellos.
// - El neto es el resultado de aplicar al bruto el correspondiente impuesto.
//        Si algún neto no está bien calculado la línea se queda fuera.

// -(/) Un fichero con una sola factura donde todo es correcto, debería producir como salida la misma línea
// - (/) Un fichero con una sola factura donde IVA e IGIC están rellenos, debería eliminar la línea
// - Un fichero con una sola factura donde el neto está mal calculado, debería ser eliminada la línea
// - (/)Un fichero con una sola factura donde CIF y NIF están rellenos, debería eliminar la línea
// - Si el número de factura se repite en varias líneas, se eliminan todas ellas (sin dejar ninguna línea).
// - (/)Una lista vacía producirá una lista vacía de salida
// - (/)Un fichero de una sola línea es incorrecto porque no tiene cabecera ¿qué devuelve?
// - cuando ni iva ni igic están. Se elimina la linea
// se pasa [header, lines], recibe solo una cosa que es el array, pero yo lo hice pasando las dos coss separadas  de una vez
// xcludes lines with both tax fields empty as one is required
//excludes lines with non decimal tax fields (qye tenga letras en vez de num)
// que uno de los campos de impuestos sea correcto y el otro esté relleno pero incluya letras
// si el campo del IVA o el IGIC es un decimal y, además, uno de los dos debe estar vacío.
// regex del decimal '\\d+(\\.\\d+)?'
// podemos hacer test each?
// hacer esto? function fileWithOneInvoiceLineHaving(ivaTax: string = '21', igicTax: string = emptyField) {
//   const invoiceId = '1';
//   const invoiceDate = '02/05/2019';
//   const grossAmount = '1000';
//   const netAmount = '790';
//   const concept = 'ACER Laptop';
//   const cif = 'B76430134';
//   const nif = emptyField;
//   return [invoiceId, invoiceDate, grossAmount, netAmount, ivaTax, igicTax, concept, cif, nif].join(',');
// } pasandole argumento cada arg que necesitamos. el resto tiene valor por defecto=

// lo del neto = bruto - (bruto*iva) / 100
// iva o igic pueden pasarse como taxfield, sea cual sea que esté (porque ya hemos testeado que sollo puede haber uno) y aplicar ese tax al bruto.
// un test para iva y uno para igic

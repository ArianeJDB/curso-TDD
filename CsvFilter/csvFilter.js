export const CsvFilter = {
  create: _create
}

function _create () {
  function filter (titles, line) {
    if (line === '') {
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
// - Un fichero con una sola factura donde el neto está mal calculado, debería ser eliminada
// - (/)Un fichero con una sola factura donde CIF y NIF están rellenos, debería eliminar la línea
// - Si el número de factura se repite en varias líneas, se eliminan todas ellas (sin dejar ninguna línea).
// - (/)Una lista vacía producirá una lista vacía de salida
// - Un fichero de una sola línea es incorrecto porque no tiene cabecera
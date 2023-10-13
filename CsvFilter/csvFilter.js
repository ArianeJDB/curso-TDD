export const CsvFilter = {
  create: _create
}

function _create () {
  function filter ({header, rows}) {
    const finalRows = []
      if (!rows.length || !header.length) {
        return []
      }

      rows.forEach((row, index) => {
        const lineSplit = row.split(',')
        const iva = lineSplit[4] === '' ? 0 : parseInt(lineSplit[4])
        const igic = lineSplit[5] === '' ? 0 : parseInt(lineSplit[5])
        const bruto = parseInt(lineSplit[2])
        const neto = parseInt(lineSplit[3])
        const cif = lineSplit[7]
        const nif = lineSplit[8]

        if(isNaN(igic) || isNaN(iva)){
          return [header, finalRows]
        }

        if ((iva !== 0 && igic !== 0) || iva === 0 && igic === 0) {
          return [header, finalRows]
        }

        if (calculateNeto({bruto, iva, igic}) !== neto ) {
          return [header, finalRows]
        }

        if (cif !== '' && nif !== '') {
          return [header, finalRows]
        }
        finalRows.push(row)
      })
      return [header, finalRows]
  }

  function calculateNeto({bruto, iva, igic }) {
    const tax = iva === 0 ? igic : iva
    const taxInDecimal = tax / 100
    const brutoTaxApplied = bruto * taxInDecimal

    return bruto - brutoTaxApplied
  }
  return {
    filter
  }
}
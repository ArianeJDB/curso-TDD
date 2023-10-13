export const CsvFilter = {
  create: _create
}

function _create () {
  function filter ({header, row}) {
    const final = []
    if(Array.isArray(row)) {
      if (!row.length || !header.length) {
        return []
      }
      row.forEach(item => {
        const lineSplit = item.split(',')
        const iva = lineSplit[4] === '' ? 0 : parseInt(lineSplit[4])
        const igic = lineSplit[5] === '' ? 0 : parseInt(lineSplit[5])

        if(isNaN(igic) || isNaN(iva)){
          return [header]
        }

        if ((iva !== 0 && igic !== 0) || iva === 0 && igic === 0) {
          console.log('no tiendo')
          return [header, final]
        }
        final.push(row)
      })
      return [header, final]
    }
    return
    const lineSplit = row.split(',')
    const bruto = parseInt(lineSplit[2])
    const neto = parseInt(lineSplit[3])
    const iva = lineSplit[4] === '' ? 0 : parseInt(lineSplit[4])
    const igic = lineSplit[5] === '' ? 0 : parseInt(lineSplit[5])
    const cif = lineSplit[7]
    const nif = lineSplit[8]




    if (cif !== '' && nif !== '') {
      return [header]
    }

    if (calculateNeto({bruto, iva, igic}) !== neto ) {
      return [header]
    }

    return [header, row]
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

//varias rows
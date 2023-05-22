export const StringCalculator = {
  create: _create
}

function _create () {
  function calculate (input) {
      if(input === null) {
          return 0
      }
      if (typeof input === "string") {
          const regexSeparators = /[//.*/]|,/
          const inputSplit = input.split(regexSeparators)

          return inputSplit.reduce((acc, curr) => {
              const regexIsNumber = /^[0-9]$/
              if (regexIsNumber.test(curr)) {
                  acc += parseInt(curr)
              }
              return acc
          }, 0)
      }
  }

  return {
    calculate
  }
}
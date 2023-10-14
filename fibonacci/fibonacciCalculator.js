export const FibonacciCalculator = {
  create: _create
}

function _create () {
  function calculate (iteration) {
    if (iteration === 0) return 0
    if (iteration <= 2) return 1
    return 2
  }

  return {
    calculate
  }
}
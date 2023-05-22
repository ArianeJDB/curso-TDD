export const PasswordValidator = {
  create: _create
}

function _create () {
  function validate (input) {
    const hasAtLeastOneNumber = /\d/.test(input)
    const hasAtLeastOneLowerCase = /.*[a-z]+.*/.test(input)
    const hasAtLeastOneLUpperCase = /.*[A-Z]+.*/.test(input)
    const hasAtLeastOneUnderscore = /.*_+.*/.test(input)
    // const hasAllRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*_).*$/g.test(input)

    // return input.length >= 6 && hasAllRules
    return input.length >= 6
        && hasAtLeastOneNumber
        && hasAtLeastOneLowerCase
        && hasAtLeastOneLUpperCase
        && hasAtLeastOneUnderscore
  }

  return {
    validate
  }
}
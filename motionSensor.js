export const MotionSensor = {
  create: _create
}

function _create () {
    function isDetectingMotion () {
      throwsError()
      return true
    }
    function throwsError () {
      throw new Error('Unexpected error')
    }


  return {
    isDetectingMotion
  }
}
import {MotionSensor} from "../motionSensor.js";
import {VideoRecorder} from "./videoRecorder.js";


export const VideoSurveillance = {
  create: _create
}
function _create (dependencies = {}) {
  const {
    sensor = MotionSensor.create(),
    video = VideoRecorder.create()
  } = dependencies

  function runs (times = 1) {
    try {
      Array.from(Array(times)).forEach(_ => {
        sensor.isDetectingMotion() ? video.startRecording() : video.stopRecording()
      })
    } catch (e) {
      if (e === 'Unexpected error') {
        return video.stopRecording()
      }
    }
  }

  return {
    runs
  }
}
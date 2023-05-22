//import {VideoSurveillance} from "../videoSurveillance";
//import {MotionSensor} from "../motionSensor";

import {VideoSurveillance} from "../videoSurveillance.js";
import {when} from "jest-when";

describe('Video Surveillance', () => {

    const sensor = {
        isDetectingMotion: jest.fn(),
        throwsError: jest.fn()
    }

    const video = {
        startRecording: jest.fn(),
        stopRecording: jest.fn()
    }
   const videoSurveillance = VideoSurveillance.create({sensor, video})

    test('checks sensor state every second', () => {
        const seconds = 8

        videoSurveillance.runs(seconds)

        expect(sensor.isDetectingMotion).toHaveBeenCalledTimes(seconds)
    });

    test('stops recording when sensor does not detect movement',  () => {
        when(sensor.isDetectingMotion).calledWith().mockReturnValue(false)

        videoSurveillance.runs()

        expect(video.stopRecording).toHaveBeenCalled()
    });

    test('starts recording when sensor detects movement',  () => {
        when(sensor.isDetectingMotion).calledWith().mockReturnValue(true)

        videoSurveillance.runs()

        expect(video.startRecording).toHaveBeenCalled()
    });

    test('stops recording when sensor throws unexpected error',  () => {
        when(sensor.throwsError).calledWith().mockRejectedValue('Unexpected error')

        videoSurveillance.runs()

        expect(video.stopRecording).toHaveBeenCalled()
    });


});
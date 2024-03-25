"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
var PictoryHandlers;
(function (PictoryHandlers) {
    PictoryHandlers.generateVideoPreviewFromText = (req, res, access_token, payload) => {
        console.log("generateVideoPreviewFromText ");
        axios_1.default
            .post('https://api.pictory.ai/pictoryapis/v1/video/storyboard', payload, {
            headers: {
                Authorization: access_token,
                'X-Pictory-User-Id': 'PictoryCustomer',
            },
        })
            .then((previewRes) => {
            console.log(previewRes.data.data);
            const interval = 5000; // Interval in milliseconds (5 seconds in this example)
            const duration = 600000; // Duration in milliseconds (10 minutes in this example)
            // Set an interval to check status every specified interval
            const intervalId = setInterval(() => {
                PictoryHandlers.getVideoPreviewAndDefaultSettings(req, res, previewRes.data.data.job_id, intervalId);
            }, interval);
            // To stop listening after a certain condition, use clearInterval
            setTimeout(() => {
                clearInterval(intervalId);
                console.log('Stopped listening for status changes');
            }, duration);
        })
            .catch((err) => {
            console.log(err);
            res.send(err);
        });
    };
    PictoryHandlers.getVideoPreviewAndDefaultSettings = (req, res, jobId, intervalId) => {
        const { access_token } = req.body;
        console.log("get Video Preview And DefaultSettings");
        axios_1.default
            .get('https://api.pictory.ai/pictoryapis/v1/jobs/' + jobId, {
            headers: {
                Authorization: access_token,
                'X-Pictory-User-Id': 'PictoryCustomer',
            },
        })
            .then((pictoryRes) => {
            var _a;
            const jobStatus = pictoryRes.data.data.status;
            const successStatus = (_a = pictoryRes === null || pictoryRes === void 0 ? void 0 : pictoryRes.data) === null || _a === void 0 ? void 0 : _a.success;
            console.log(pictoryRes.data);
            console.log(jobStatus);
            if (jobStatus === 'in-progress') {
                // Handle in-progress response
                console.log('Job is in progress:', pictoryRes.data);
            }
            else if (successStatus) {
                // Handle completed response
                console.log('Job is completed:', pictoryRes.data);
                // Access the video preview link
                PictoryHandlers.rendrVideo(req, res, pictoryRes.data.data.renderParams);
                clearInterval(intervalId);
                console.log('Stopped listening for status changes');
            }
            else {
                // Handle other statuses if needed
                console.log('Unknown job status:', jobStatus);
            }
        })
            .catch((err) => {
            console.log(err);
            res.send(err);
        });
    };
    PictoryHandlers.rendrVideo = (req, res, renderParams) => {
        const { access_token } = req.body;
        console.log("render video");
        axios_1.default
            .post('https://api.pictory.ai/pictoryapis/v1/video/render', Object.assign(Object.assign({}, renderParams), { next_generation_video: true, containsTextToImage: true }), {
            headers: {
                Authorization: access_token,
                'X-Pictory-User-Id': 'PictoryCustomer',
            },
        })
            .then((previewRes) => {
            console.log(previewRes.data.data);
            const interval = 5000; // Interval in milliseconds (5 seconds in this example)
            const duration = 600000; // Duration in milliseconds (10 minutes in this example)
            // Set an interval to check status every specified interval
            const intervalId = setInterval(() => {
                PictoryHandlers.getVideoDownloadUrl(req, res, previewRes.data.data.job_id, intervalId);
            }, interval);
            // To stop listening after a certain condition, use clearInterval
            setTimeout(() => {
                clearInterval(intervalId);
                console.log('Stopped listening for status changes');
            }, duration);
            // if (nextRes && nextRes.data.data.status == 'completed') {
            // getVideoDownloadUrl(req, res, previewRes.data.data.job_id)
            // }
        })
            .catch((err) => {
            console.log(err);
            res.send(err);
        });
    };
    PictoryHandlers.getVideoDownloadUrl = (req, res, job_id, intervalId) => {
        const { access_token } = req.body;
        console.log("getVideoDownloadUrl");
        axios_1.default
            .get(`https://api.pictory.ai/pictoryapis/v1/jobs/${job_id}`, {
            headers: {
                Authorization: access_token,
                'X-Pictory-User-Id': 'PictoryCustomer',
            },
        })
            .then((previewRes) => {
            console.log(previewRes.data);
            if (previewRes && previewRes.data.data.status == 'completed') {
                clearInterval(intervalId);
                res.send(previewRes.data);
            }
        })
            .catch((err) => {
            console.log(err);
            clearInterval(intervalId);
            res.send(err);
        });
    };
})(PictoryHandlers || (PictoryHandlers = {}));
exports.default = PictoryHandlers;

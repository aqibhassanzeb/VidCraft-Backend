import axios from "axios";
import { Request, Response } from "express";

namespace PictoryHandlers {
    export const generateVideoPreviewFromText = (req: any, res: any, access_token: any, payload: any) => {
        console.log("generateVideoPreviewFromText ")
        axios
            .post('https://api.pictory.ai/pictoryapis/v1/video/storyboard', payload, {
                headers: {
                    Authorization: access_token,
                    'X-Pictory-User-Id': 'PictoryCustomer',
                },
            })
            .then((previewRes: any) => {
                console.log(previewRes.data.data);
                const interval = 5000; // Interval in milliseconds (5 seconds in this example)
                const duration = 600000; // Duration in milliseconds (10 minutes in this example)

                // Set an interval to check status every specified interval
                const intervalId = setInterval(() => {
                    getVideoPreviewAndDefaultSettings(req, res, previewRes.data.data.job_id, intervalId);
                }, interval);

                // To stop listening after a certain condition, use clearInterval
                setTimeout(() => {
                    clearInterval(intervalId);
                    console.log('Stopped listening for status changes');
                }, duration);
            })
            .catch((err: any) => {
                console.log(err);
                res.send(err)
            });
    };

    export const getVideoPreviewAndDefaultSettings = (req: Request, res: Response, jobId: string, intervalId: any) => {
        const { access_token } = req.body
        console.log("get Video Preview And DefaultSettings")
        axios
            .get('https://api.pictory.ai/pictoryapis/v1/jobs/' + jobId, {
                headers: {
                    Authorization: access_token,
                    'X-Pictory-User-Id': 'PictoryCustomer',
                },
            })
            .then((pictoryRes: any) => {
                const jobStatus = pictoryRes.data.data.status;
                const successStatus = pictoryRes?.data?.success
                console.log(pictoryRes.data)
                console.log(jobStatus);

                if (jobStatus === 'in-progress') {
                    // Handle in-progress response
                    console.log('Job is in progress:', pictoryRes.data);
                } else if (successStatus) {
                    // Handle completed response
                    console.log('Job is completed:', pictoryRes.data);

                    // Access the video preview link
                    rendrVideo(req, res, pictoryRes.data.data.renderParams)
                    clearInterval(intervalId);
                    console.log('Stopped listening for status changes');
                } else {
                    // Handle other statuses if needed
                    console.log('Unknown job status:', jobStatus);
                }

            })
            .catch((err: any) => {
                console.log(err);
                res.send(err)
            });
    };

    export const rendrVideo = (req: Request, res: Response, renderParams: any) => {
        const { access_token } = req.body
        console.log("render video")
        axios
            .post(
                'https://api.pictory.ai/pictoryapis/v1/video/render',
                {
                    ...renderParams,
                    next_generation_video: true,
                    containsTextToImage: true,
                },
                {
                    headers: {
                        Authorization: access_token,
                        'X-Pictory-User-Id': 'PictoryCustomer',
                    },
                }
            )
            .then((previewRes: any) => {
                console.log(previewRes.data.data);
                const interval = 5000; // Interval in milliseconds (5 seconds in this example)
                const duration = 600000; // Duration in milliseconds (10 minutes in this example)

                // Set an interval to check status every specified interval
                const intervalId = setInterval(() => {
                    getVideoDownloadUrl(req, res, previewRes.data.data.job_id, intervalId);
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
            .catch((err: any) => {
                console.log(err);
                res.send(err)
            });
    };

    export const getVideoDownloadUrl = (req: Request, res: Response, job_id: any, intervalId: any) => {
        const { access_token } = req.body
        console.log("getVideoDownloadUrl")
        axios
            .get(
                `https://api.pictory.ai/pictoryapis/v1/jobs/${job_id}`,
                {
                    headers: {
                        Authorization: access_token,
                        'X-Pictory-User-Id': 'PictoryCustomer',
                    },
                }
            )
            .then((previewRes: any) => {
                console.log(previewRes.data);
                if (previewRes && previewRes.data.data.status == 'completed') {
                    clearInterval(intervalId);
                    res.send(previewRes.data)
                }
            })
            .catch((err: any) => {
                console.log(err);
                clearInterval(intervalId);
                res.send(err)
            });
    }
}

export default PictoryHandlers
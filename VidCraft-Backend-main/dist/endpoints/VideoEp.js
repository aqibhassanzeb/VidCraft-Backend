"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv = __importStar(require("dotenv"));
const uuid_1 = require("uuid");
var fs = require('fs');
dotenv.config();
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
var VideoEp;
(function (VideoEp) {
    VideoEp.mergeVideos = (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        console.log(process.env.SUPABASE_URL);
        console.log(process.env.SUPABASE_KEY);
        let timemark = null;
        const video_path = '../../assets/input.mp4';
        const selectedTv1 = "./assets/tv1.png";
        const selectedTv2 = "./assets/tv2.png";
        // const mainVidUrl = 'https://synthesia-ttv-data.s3.amazonaws.com/video_data/04d5a557-e1e9-4d78-970d-fdbe05b570cf/transfers/rendered_video.mp4?response-content-disposition=attachment%3Bfilename%3D%22Synthesia%20video%20-%2004d5a557-e1e9-4d78-970d-fdbe05b570cf.mp4%22&AWSAccessKeyId=ASIA32NGJ5TSS6L2DVW7&Signature=EtzA83tnHYt49zmw5DCzVE1n6%2Fo%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDQaQiPV%2BFRSs%2FnyCJD8Za36HUPUPRDhLFwci4WyFCcmgIhAKj2OrQ7Uaw1FGuFg4AwaBlPSB51ErsIbh1KddBfVG%2BAKpYDCL3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAxoMODEyNjM0NDY3NTU3IgzS9a760mE5QBpoLRoq6gLLgZu39MOXdL2drj7PtWrooh9F3xBebppvO0HZiyo0CovChgtTlitfO4tccTuWbNhgpxF%2BIG5VwIaMNesLzdP3ShN5DHftmP4elVzZxdNt7TI16Ah7linwqIISrpWsBZmt8%2F9Mzn0q3mtLXZ16VsnXz6E6yAurPv2oe0igX2fqiLEQ%2FltCTG9Rz7UJm3hfF9TeKqD0d0EFf6MCzGl1n6pmT5hWW3DVTSFpx42eM4AHntp%2FBlEExnmMuSH3%2BEmbk%2BaNM3QJvLh8q%2FEpFMPwGu1swvbbWAqDrHasCsOakTZyahzvs7ELnP8bSmTKSgKI%2B6GJHLg4D8N%2FRFh2x16M4qwOahZ%2FpsbANef8kW8cvIAIFY2lMbsdoKXxSJnvv228S8kEzjSEmm0TFxtsAd7Qnrgb0mYE6BLEoNNV4AAn8Dpl1V0mA4vuEDyDcYR5giA6v9cSMXrO8hVyGSM5naBiS784UUb7OJOiKNvMuzC57tqoBjqcAbDvRuMDfPmhKwR50s29hjMfdYpuqz3Q1CHJ8ivEiIirFdhnCN8KV8khLB53jwmWbvfFY%2FBgO6fgJZgzL5GUxt1FM5bxenZiOtrJThjvqtVnFeKw3mjWR2SPBl8iamuH5rkG5waKtXp%2B6wGYW%2FTZVge8WwW6g4%2FhiGswmnaD7rS5qCkIwzvVjjVNj6rhkAg76tFfyli7wazLz1CsCQ%3D%3D&Expires=1696017420';
        // const overlayVideo = 'https://d3uryq9bhgb5qr.cloudfront.net/EnterpriseSubscription/PictoryCustomer/ecb62c09-69d2-4650-adf6-4356617b5b30/VIDEO/Pictory_2023-09-29T12:12:04.823Z.mp4';
        var dateString = (0, uuid_1.v4)();
        const outputVideo = "./outputs/" + dateString + "-video.mp4";
        // const mainVidUrl = './assets/input.mp4'
        // const overlayVideo = './assets/news.mp4'
        let { mainVidUrl, overlayVideo, selectedTv } = req.body;
        console.log('mainVidUrl', mainVidUrl);
        console.log('overlayVideo', overlayVideo);
        console.log('selectedTv', selectedTv);
        if (!selectedTv) {
            selectedTv = 'one';
        }
        const complexFilterOption2Test = [
            '[1:v]scale=640:-1[scaled_overlay]',
            '[2:v]scale=640:-1[scaled_image]',
            '[0:v][scaled_image]overlay=1000:500[overlayed_video]',
            '[overlayed_video][scaled_overlay]overlay=1000:490'
        ];
        const complexFilterOption1 = [
            '[1:v]scale=615:-1[scaled_overlay]',
            '[2:v]scale=640:-1[scaled_image]',
            '[0:v][scaled_image]overlay=1000:200[overlayed_video]',
            '[overlayed_video][scaled_overlay]overlay=1008:290'
        ];
        const complexFilterOption2 = [
            '[1:v]scale=610:-1[scaled_overlay]',
            '[2:v]scale=626:353[scaled_image]',
            '[0:v][scaled_image]overlay=1000:300[overlayed_video]',
            '[overlayed_video][scaled_overlay]overlay=1009:307'
        ];
        (0, fluent_ffmpeg_1.default)()
            .input(mainVidUrl)
            .input(overlayVideo)
            .input(selectedTv == 'one' ? selectedTv1 : selectedTv2)
            .complexFilter(selectedTv == 'one' ? complexFilterOption1 : complexFilterOption2)
            .output(outputVideo)
            .on('progress', onProgress)
            .on('end', () => {
            console.log('Processing finished!');
            storeVideoOnSupabase();
        })
            .on('error', (err) => {
            console.error('Error:', err);
        })
            .run();
        function onProgress(progress) {
            if (progress.timemark != timemark) {
                timemark = progress.timemark;
                console.log('Time mark: ' + timemark + "...");
            }
        }
        // function sendProgress(progress: any) {
        //     res.write(`data: ${JSON.stringify({ progress })}\n\n`);
        // }
        function storeVideoOnSupabase() {
            console.log('storing video on supabase', outputVideo);
            fs.readFile(outputVideo, function (fserr, data) {
                supabase === null || supabase === void 0 ? void 0 : supabase.storage.from('final_videos').upload(`${dateString}_video.mp4`, data).then((fres) => {
                    console.log('supabase response', fres);
                    res.send(fres);
                    deleteFile();
                }).catch((err) => {
                    deleteFile();
                });
            });
        }
        const deleteFile = () => {
            fs.stat(outputVideo, function (err, stats) {
                console.log(stats); //here we got all information of file in stats variable
                if (err) {
                    return console.error(err);
                }
                fs.unlink(outputVideo, function (err) {
                    if (err)
                        return console.log(err);
                    console.log('file deleted successfully');
                });
            });
        };
    };
})(VideoEp || (VideoEp = {}));
exports.default = VideoEp;

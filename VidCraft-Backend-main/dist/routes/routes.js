"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VideoEp_1 = __importDefault(require("../endpoints/VideoEp"));
const PictoryEp_1 = __importDefault(require("../endpoints/PictoryEp"));
const router = (0, express_1.Router)();
router.post('/merge_videos', VideoEp_1.default.mergeVideos);
router.post('/generate-pictory-video', PictoryEp_1.default.generatePictoryVideo);
exports.default = router;

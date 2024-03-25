"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pictory_1 = __importDefault(require("../handlers/pictory"));
var PictoryEp;
(function (PictoryEp) {
    PictoryEp.generatePictoryVideo = (req, res) => {
        const { access_token, text } = req.body;
        console.log(text);
        const payload = {
            videoName: 'Pictory_' + new Date().toISOString(),
            // videoDescription: 'Santa Claus is coming to town', //(OPTIONAL) Value can be empty ""
            language: 'en',
            audio: {
                autoBackgroundMusic: true,
                backGroundMusicVolume: 0.5,
                aiVoiceOver: {
                    speaker: 'Jackson',
                    speed: 100,
                    amplifyLevel: 0, //AI voice volume. Decimal value range from -1 to 1 where -1 is muted, -0.5 is 50% decreased volume, 0 is regular volume, 0.5 is 50% increased volume and 1 is 100% increased volume
                },
            },
            scenes: [
                {
                    text: text,
                    voiceOver: true,
                    splitTextOnNewLine: false,
                    splitTextOnPeriod: true, //When true, will create a new video scene after any period in the text
                },
            ],
        };
        pictory_1.default.generateVideoPreviewFromText(req, res, access_token, payload);
        // res.send('generatePictoryVideo');
    };
})(PictoryEp || (PictoryEp = {}));
exports.default = PictoryEp;

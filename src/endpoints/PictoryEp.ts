import axios from "axios";
import PictoryHandlers from "../handlers/pictory";

namespace PictoryEp {
    export const generatePictoryVideo = (req: any, res: any) => {
        const { access_token, text } = req.body
        console.log(text)
        const payload = {
            videoName: 'Pictory_' + new Date().toISOString(), //Name you wish to call your video file
            // videoDescription: 'Santa Claus is coming to town', //(OPTIONAL) Value can be empty ""
            language: 'en', //Language of the provided text, currently API'\''s only support English
            audio: {
                autoBackgroundMusic: true, //Pictory AI will apply background music to the generated video when set to true
                backGroundMusicVolume: 0.5, //Decimal value range from 0-1 where 0.5 represents 50% volume
                aiVoiceOver: {
                    speaker: 'Jackson', //Only English AI is supported. Sample US speakers: Jackson, Sophia. Sample UK: Arthur, Hazel. All possible values can be previewed from the webUI Storyboard under Audio -> Voice-over.
                    speed: 100, //Percentage value where 100 is regular speed. Accepted value range 50-200.
                    amplifyLevel: 0, //AI voice volume. Decimal value range from -1 to 1 where -1 is muted, -0.5 is 50% decreased volume, 0 is regular volume, 0.5 is 50% increased volume and 1 is 100% increased volume
                },
            },
            scenes: [
                {
                    text: text, //Text you provide to Pictory'\''s AI to generate your video.
                    voiceOver: true, //Adds an AI voice to the generated video that reads the text
                    splitTextOnNewLine: false, //When true will use new lines within the text to create a new video scene. Add a \n to the text for new line
                    splitTextOnPeriod: true, //When true, will create a new video scene after any period in the text
                },
            ],
        };
        PictoryHandlers.generateVideoPreviewFromText(req, res, access_token, payload)
        // res.send('generatePictoryVideo');
    }
}

export default PictoryEp
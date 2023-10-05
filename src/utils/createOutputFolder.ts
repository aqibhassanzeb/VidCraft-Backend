import path from "path";
var fs = require('fs');

export const createOutputFolder = () => {
    const outputPath = path.join(__dirname, '..', '..', 'outputs');

    // Check if the folder exists
    return fs.access(outputPath, (err: { code: string; }) => {
        if (err && err.code === 'ENOENT') {
            // Folder doesn't exist, create it
            fs.mkdir(outputPath, (err: any) => {
                if (err) {
                    console.error('Error creating output folder:', err);
                } else {
                    console.log('Output folder created');
                }
                //   next();
            });
        } else if (err) {
            console.error('Error accessing output folder:', err);
            // next();
        } else {
            // Folder already exists
            // next();
            console.log('Folder already exists');
        }
    });
}

createOutputFolder()
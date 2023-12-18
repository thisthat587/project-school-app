const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// let XSTART = 244; // Starting X position
let TOP = 130; // Fixed top position
let WIDTH = 105; // Width of each column
let HEIGHT = 370; // Height of the crop
let LEFT = 244;
function cropImageIntoColumns(imagePath, i, callback) {
    sharp(imagePath).metadata((err, metadata) => {
        if (err) {
            return callback(err);
        }

        // console.log(metadata);

        // if (XSTART + WIDTH * numColumns > metadata.width || TOP + HEIGHT > metadata.height) {
        //     return callback(new Error('Crop area exceeds image bounds'));
        // }

        // let tasksCompleted = 0;

        // for (let i = 0; i < numColumns; i++) {
        if (i === 1) {
            LEFT= 244;
            TOP = 130;
            WIDTH = 105;
            HEIGHT = 370;
        }
        else if (i === 2) {
            LEFT = 355;
            TOP = 130;
            WIDTH = 105;
            HEIGHT = 370;
        }
        else if (i === 3) {
            LEFT = 480;
            TOP = 130;
            WIDTH = 105;
            HEIGHT = 370;
        }
        else if (i === 4) {
            LEFT = 580;
            TOP = 130;
            WIDTH = 105;
            HEIGHT = 370;
        }
        else if (i === 5) {
            LEFT = 750;
            TOP = 130;
            WIDTH = 105;
            HEIGHT = 320;
        }
        else if (i === 6) {
            LEFT = 860;
            TOP = 130;
            WIDTH = 105;
            HEIGHT = 320;
        }
        else if (i === 7) {
            LEFT = 925;
            TOP = 130;
            WIDTH = 105;
            HEIGHT = 320;
        }
        else if (i == 8) {
            LEFT = 1030;
            TOP = 130;
            WIDTH = 105;
            HEIGHT = 320;
        }else if (i == 9) {
            LEFT = 755;
            TOP = 350;
            WIDTH = 105;
            HEIGHT = 120;
        }else if (i == 10) {
            LEFT = 860;
            TOP = 350;
            WIDTH = 105;
            HEIGHT = 120;
        }else if (i == 11) {
            LEFT = 925;
            TOP = 350;
            WIDTH = 105;
            HEIGHT = 120;
        }else if (i == 12) {
            LEFT = 1030;
            TOP = 350;
            WIDTH = 105;
            HEIGHT = 120;
        }
        const outputPath = path.join(__dirname, `cropped_column_${i}.png`);

        sharp(imagePath)
            .extract({ left: LEFT, top: TOP, width: WIDTH, height: HEIGHT })
            .toFile(outputPath, (error) => {
                if (error) {
                    return callback(error);
                }
                // tasksCompleted++;
                // if (tasksCompleted === numColumns) {
                //     console.log('Cropping completed!');
                //     callback(null);
                // }
            });
        // }
    });
}

const imagePath = 'WhatsApp Image 2023-12-10 at 7.45.40 PM (1).jpeg'; // Replace with your image path
const numColumns = 8; // Adjust as needed

cropImageIntoColumns(imagePath, numColumns, (err) => {
    if (err) {
        console.error('Error during image cropping:', err.message);
    } else {
        console.log('All images cropped successfully');
    }
});

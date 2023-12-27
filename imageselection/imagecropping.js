const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// let XSTART = 244; // Starting X position
let TOP = 130; // Fixed top position
let WIDTH = 440; // Width of each column
let HEIGHT = 70; // Height of the crop
let LEFT = 244;
function cropImageIntoColumns(imagePath,i ,callback) {
    sharp(imagePath).metadata((err, metadata) => {
        if (err) {
            return callback(err);
        }

        console.log(metadata);

        // if (XSTART + WIDTH * numColumns > metadata.width || TOP + HEIGHT > metadata.height) {
        //     return callback(new Error('Crop area exceeds image bounds'));
        // }

        // let tasksCompleted = 0;

        // for (let i = 1; i <= numColumns; i++) {
            if (i === 1) {
                LEFT = 244;
                TOP = 130;
                WIDTH = 440;
                HEIGHT = 70;
            }
            else if (i === 2) {
                LEFT = 244;
                TOP = 200;
                WIDTH = 440;
                HEIGHT = 70;
            }
            else if (i === 3) {
                LEFT = 244;
                TOP = 280;
                WIDTH = 440;
                HEIGHT = 70;
            }
            else if (i === 4) {
                LEFT = 244;
                TOP = 355;
                WIDTH = 440;
                HEIGHT = 70;
            }
            else if (i === 5) {
                LEFT = 244;
                TOP = 430;
                WIDTH = 440;
                HEIGHT = 70;
            }
            else if (i === 6) {
                LEFT = 750;
                TOP = 130;
                WIDTH = 350;
                HEIGHT = 60;
            }
            else if (i === 7) {
                LEFT = 750;
                TOP = 190;
                WIDTH = 350;
                HEIGHT = 60;
            }
            else if (i === 8) {
                LEFT = 750;
                TOP = 260;
                WIDTH = 350;
                HEIGHT = 60;
            }  
            else if (i === 9) {
                LEFT = 750;
                TOP = 320;
                WIDTH = 350;
                HEIGHT = 60;
            }
            else if (i === 10) {
                LEFT = 750;
                TOP = 390;
                WIDTH = 350;
                HEIGHT = 60;
            }  
            else if (i === 11) {
                LEFT = 750;
                TOP = 350;
                WIDTH = 350;
                HEIGHT = 60;
            } else if (i === 12) {
                LEFT = 750;
                TOP = 410;
                WIDTH = 350;
                HEIGHT = 60;
            }
        // }
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

const imagePath = 'WhatsApp Image 2023-12-10 at 7.45.40 PM.jpeg'; // Replace with your image path
const numColumns = 8; // Adjust as needed

cropImageIntoColumns(imagePath, numColumns, (err) => {
    if (err) {
        console.error('Error during image cropping:', err.message);
    } else {
        console.log('All images cropped successfully');
    }
});

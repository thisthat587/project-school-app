const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// let XSTART = 244; // Starting X position
const TOP = 130; // Fixed top position
const WIDTH = 100; // Width of each column
const HEIGHT = 370; // Height of the crop
let left = 244;
function cropImageIntoColumns(imagePath, numColumns, callback) {
    sharp(imagePath).metadata((err, metadata) => {
        if (err) {
            return callback(err);
        }

        console.log(metadata);

        // if (XSTART + WIDTH * numColumns > metadata.width || TOP + HEIGHT > metadata.height) {
        //     return callback(new Error('Crop area exceeds image bounds'));
        // }

        let tasksCompleted = 0;

        for (let i = 0; i < numColumns; i++) {
            if (i === 0) {
                left = 244;
            }
            else if (i === 1) {
                left = 355;
            }
            else if (i === 2) {
                left = 475;
            }
            else if (i === 3) {
                left = 580;
            }
            else if (i === 4) {
                left = 755;
            }
            else if (i === 5) {
                left = 860;
            }
            else if (i === 6) {
                left = 930;
            }
            else {
                left = 1030;
            }
            const outputPath = path.join(__dirname, `cropped_column_${i + 1}.jpeg`);

            sharp(imagePath)
                .extract({ left, top: TOP, width: WIDTH, height: HEIGHT })
                .toFile(outputPath, (error) => {
                    if (error) {
                        return callback(error);
                    }
                    tasksCompleted++;
                    if (tasksCompleted === numColumns) {
                        console.log('Cropping completed!');
                        callback(null);
                    }
                });
        }
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

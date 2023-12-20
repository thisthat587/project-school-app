const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

let TOP = 130; 
let WIDTH = 40; 
let HEIGHT = 370; 
let LEFT = 700;
function cropImageIntoColumns(imagePath, callback) {
    sharp(imagePath).metadata((err, metadata) => {
        if (err) {
            return callback(err);
        }

        const outputPath = path.join(__dirname, `numbers.png`);

        sharp(imagePath)
            .extract({ left: LEFT, top: TOP, width: WIDTH, height: HEIGHT })
            .toFile(outputPath, (error) => {
                if (error) {
                    return callback(error);
                }
                
            });
    });
}

const imagePath = 'WhatsApp Image 2023-12-10 at 7.45.40 PM.jpeg'; 

cropImageIntoColumns(imagePath, (err) => {
    if (err) {
        console.error('Error during image cropping:', err.message);
    } else {
        console.log('All images cropped successfully');
    }
});

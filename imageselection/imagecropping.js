const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

let XSTART = 244; // Starting X position
const TOP = 130; // Fixed top position
const WIDTH = 100; // Width of each column
const HEIGHT = 370; // Height of the crop

async function cropImageIntoColumns(imagePath, numColumns) {
    try {
        const image = sharp(imagePath);
        const metadata = await image.metadata();

        if (XSTART + WIDTH * numColumns > metadata.width || TOP + HEIGHT > metadata.height) {
            throw new Error('Crop area exceeds image bounds');
        }

        let promises = [];

        for (let i = 0; i < numColumns; i++) {
            let left = XSTART + i * WIDTH;
            const outputPath = path.join(__dirname, `cropped_column_${i + 1}.jpg`);

            promises.push(
                image
                    .extract({ left, top: TOP, width: WIDTH, height: HEIGHT })
                    .toFile(outputPath)
            );
        }

        await Promise.all(promises);
        console.log('Cropping completed!');
    } catch (error) {
        console.error('Error during image cropping:', error.message);
    }
}

const imagePath = 'WhatsApp Image 2023-12-10 at 7.45.40 PM.jpeg'; // Replace with your image path
const numColumns = 2; // Adjust as needed

cropImageIntoColumns(imagePath, numColumns);

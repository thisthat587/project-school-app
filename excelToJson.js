const XLSX = require('xlsx');
const fs = require('fs');

// Excel file path
const excelFilePath ='C:\\Users\\Piyush Singh\\Desktop\\studentrecords.xlsx';

// Read the Excel file
const workbook = XLSX.readFile(excelFilePath);

// Assuming the first sheet contains your data
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Convert to JSON
const jsonData = XLSX.utils.sheet_to_json(worksheet);

// Write the JSON to a file
fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2));

console.log('Excel to JSON conversion completed.',jsonData.length,jsonData[0].name,jsonData[0].fname);

var stdName = document.getElementById('list').value;

function student_Data() {
    // location.href = 'student_list.html';
    for (var i; i <= jsonData.length; i++) {
        if (jsonData[i].name === stdName){
            const list=document.getElementById('list');
            const newElement=document.createElement('p');
            newElement.innerHTML=`Name: ${jsonData[i].name}`;
            list.appendChild(newElement);
        }
    }
    console.log(stdName);
}

student_Data();
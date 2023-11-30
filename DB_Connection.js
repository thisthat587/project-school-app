var mysql = require('mysql')
var admission_no = [];
var admsn_no = [];
var extract = [];
var connection = mysql.createConnection({
    host: '89.117.188.154',
    user: 'u932299896_eduware',
    password: 'Webgen@220310',
    database: 'u932299896_sisdb',
});
connection.connect((err) => {
    if (err) {
        console.log("Error connecting to the mysql DB");
    } else {
        console.log("Connected to DB");
    }
})
let query = "select admno from tbl_transportfee where apr=-1"

connection.query(query, (err, data) => {
    if (err) {
        console.log("error", err)
    } else {
        for (var i = 0; i <= data.length; i++) {
            admission_no.push(data[i]);
        }
    }
    let query1 = 'select admno from tbl_admission where session="2023-2024"';

    connection.query(query1, (err, data) => {
        if (err) {
            console.log("error", err);
        } else {
            for (var i = 0; i <= data.length; i++) {
                admsn_no.push(data[i]);
            }
        }
        for (var i = 0; i <= admission_no.length; i++) {
            console.log("From tbl_transportfee :", admission_no[i].admno);
        }
        // console.log("From tbl_amdmission: ", admsn_no);
        // extraction(admission_no, admsn_no);
    })
})
// function extraction(tbl_fee, tbl_adm) {
//     console.log(tbl_fee[0].admno);
//     for (var i = 0; i <= tbl_fee.length; i++) {
//         for (var j = 0; j <= tbl_adm.length; j++) {
//             if (tbl_fee[i].admno === tbl_adm[j].admno) {
//                 extract.push(tbl_fee[i]);
//             }
//         }
//     }
//     console.log("Extraction: ", extract);
// }







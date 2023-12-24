const mysql = require('mysql2');

const searchBtn = document.getElementById('searchBtn');
const stdname = document.getElementById('name');
const fname = document.getElementById('fname');
const mobile = document.getElementById('mobile');
let inputValue;
const connection = mysql.createConnection({
    host: "89.117.188.154",
    user: "u932299896_eduware",
    password: "Webgen@220310",
    database: "u932299896_sisdb",
});
let query = 'select * from tbl_admission';
// getQuery();

function showStdlistDiv() {
    document.getElementById('stdList-div').style.display = '';
    document.getElementById('enquiry-div').style.display = 'none';
}

function getinputValuetoSearch(Value, flag) {

    inputValue = Value.toUpperCase();

    console.log(inputValue)

    if (flag === 0) {
        query = `SELECT admno, name, fname, class, section, roll, fmob, session, active, transport FROM tbl_admission WHERE session = "2023-2024" AND active = 1 AND name=?;`;
    } else if (flag === 1) {
        query = `SELECT admno, name, fname, class, section, roll, fmob, session, active, transport FROM tbl_admission WHERE session = "2023-2024" AND active = 1 AND fname=?;`;
    } else if (flag === 2) {
        query = `SELECT admno, name, fname, class, section, roll, fmob, session, active, transport FROM tbl_admission WHERE session = "2023-2024" AND active = 1 AND fmob=?;`;
    }
    getQuery();
}

function getQuery() {
    connection.query(query, [inputValue], (error, results) => {
        console.log(results);
        if (error) {
            console.log("Some error occured...", error)
            return;
        }
        if (results.length > 0) {
            showStdlistDiv()
        }
        else {
            document.getElementById('enquiry-form').innerHTML += '<br><h4>Please Input any value...</h4>';
        }
        alert("Hello");
    })
}

function sendinputValuetoSearch() {
    if (stdname.value) {
        getinputValuetoSearch(stdname.value, 0);
    }
    else if (fname.value) {
        try {
            getinputValuetoSearch(fname.value, 1);
        } catch (error) {
            console.log(error);
        }
    }
    else if (mobile.value) {
        try {
            getinputValuetoSearch(mobile.value, 2);
        } catch (error) {
            console.log(error);
        }
    }
    // else {
    //     document.getElementById('enquiry-form').innerHTML += '<br><h4>Please Input any value...</h4>';
    //     document.getElementById('name').addEventListener('click', reloadPage);
    //     function reloadPage() {
    //         window.location.reload();
    //         document.getElementById('name').focus();
    //     }
    // }
}

function catchsearchBtn() {
    // getQuery();
    sendinputValuetoSearch();
}
const mysql = require('mysql2');
require('dotenv').config();

class Elements {
    searchBtn = document.getElementById('searchBtn');
    stdname = document.getElementById('name');
    fname = document.getElementById('fname');
    mobile = document.getElementById('mobile');

}

class Search {
    #inputValue;
    #query;
    connection;
    constructor() {
        document.getElementById('name').focus();
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });
    }

    showStdlistDiv(){
        document.getElementById('stdList-div').style.display='';
        document.getElementById('enquiry-div').style.display='none';
    }
    // async connectingMysql() {
    //     try {
    //         await new Promise((resolve, reject) => {
    //             this.connection.connect((error) => {
    //                 if (error) {
    //                     reject(error);
    //                 } else {
    //                     console.log("Connected to mySql...");
    //                     resolve();
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //         console.log("Some error Occured....", error);
    //     }
    // }
    getinputValuetoSearch(Value, flag) {
        this.#inputValue = Value;
        console.log(this.#inputValue)
        if (flag === 0) {
            this.#query = `SELECT admno, name, fname, class, section, roll, fmob, session, active, transport FROM tbl_admission WHERE session = "2023-2024" AND active = 1 AND name=${this.#inputValue};`;
        } else if (flag === 1) {
            this.#query = `SELECT admno, name, fname, class, section, roll, fmob, session, active, transport FROM tbl_admission WHERE session = "2023-2024" AND active = 1 AND fname=${this.#inputValue};`;
        } else if (flag === 2) {
            this.#query = `SELECT admno, name, fname, class, section, roll, fmob, session, active, transport FROM tbl_admission WHERE session = "2023-2024" AND active = 1 AND fmob=${this.#inputValue};`;
        }
        // this.connectingMysql();
        // this.getQuery();
    }


    getQuery() {
        // console.log(this.#query);
        this.connection.query(this.#query, (error, results) => {
            if (error) {
                console.log("Some error occured...", error)
                return;
            }
            if (results.length > 0) {
                console.log("Result : BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKHL.HIO;HBUJVHYVFUU");
                console.log("Result : ", result);
                document.getElementById('stdList-div').innerHTML = `<h3>${results[0].name}</h3>`;

            }
        })
    }
    sendinputValuetoSearch = () => {
        if (e.stdname.value) {
            this.getinputValuetoSearch(e.stdname.value, 0);
        }
        else if (e.fname.value) {
            try {
                this.getinputValuetoSearch(e.fname.value, 1);
            } catch (error) {
                console.log(error);
            }
        }
        else if (e.mobile.value) {
            try {
                this.getinputValuetoSearch(e.mobile.value, 2);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            document.getElementById('enquiry-form').innerHTML += '<br><h4>Please Input any value...</h4>';
            document.getElementById('name').addEventListener('click', reloadPage);
            function reloadPage() {
                window.location.reload();
                document.getElementById('name').focus();
            }
        }
    }
}
// SearchObj.getQuery();
const SearchObj = new Search;
const e = new Elements;

function catchsearchBtn() {
    SearchObj.showStdlistDiv();
    SearchObj.sendinputValuetoSearch();
    SearchObj.getQuery();
}
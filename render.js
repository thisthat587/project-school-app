const mysql = require('mysql2');
require('dotenv').config();
const searchBtn = document.getElementById('searchBtn');
const stdname = document.getElementById('name');
const fname = document.getElementById('fname');
const mobile = document.getElementById('mobile');

class Search {
    #inputValue;
    #connection;
    #query;
    constructor(Value,flag) {
        this.#inputValue = Value;
        console.log(this.#inputValue)

        // this.#connection = mysql.createConnection({
        //     host: process.env.HOST,
        //     user: process.env.USER,
        //     password: process.env.PASSWORD,
        //     database: process.env.DATABASE,
        // })

        if(flag===0){
            this.#query = `SELECT admno, name, fname, class, section, roll, fmob, session, active, transport FROM tbl_admission WHERE session = "2023-2024" AND active = 1 AND name=${this.#inputValue};`;
        } else if(flag===1){
            this.#query = `SELECT admno, name, fname, class, section, roll, fmob, session, active, transport FROM tbl_admission WHERE session = "2023-2024" AND active = 1 AND fname=${this.#inputValue};`;
        } else if(flag===2){
            this.#query = `SELECT admno, name, fname, class, section, roll, fmob, session, active, transport FROM tbl_admission WHERE session = "2023-2024" AND active = 1 AND fmob=${this.#inputValue};`;
        }
    }
}

searchBtn.addEventListener('click', () => {
    if (stdname.value) {
        try {
            const searchByname = new Search(stdname.value,0);
        } catch (error) {
            console.log(error);
        }
    }
    else if (fname.value) {
        try {
            const searchByfname = new Search(fname.value,1);
        } catch (error) {
            console.log(error);
        }
    }
    else if (mobile.value) {
        try {
            const searchBymobile = new Search(mobile.value,2);
        } catch (error) {
            console.log(error);
        }
    }
    else {
        document.getElementById('enquiry-form').innerHTML += 'Please Input any value...';
    }
});





const { app, BrowserWindow } = require('electron');
const mysql = require("mysql2");
const Con = require('./renderer');

let pay = new Con();

function createWindow(htmlfile, w, h) {
    const mainWindow = new BrowserWindow({
        width: w,
        height: h,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
        },
    });
    mainWindow.loadFile(htmlfile);
}

///////////////////////////////////////////////////////////////////////////////////

function converttoJson(name, flag) {
    var connection = mysql.createConnection({
        host: "89.117.188.154",
        user: "u932299896_eduware",
        password: "Webgen@220310",
        database: "u932299896_sisdb",
    });
    document.getElementById("notFound").innerHTML = "Loading...";
    var i = 0;
    document.getElementById("notFound").style.color = "black";
    var dashboard = (document.getElementById("dashboard").style.display = "none");
    var form = (document.querySelector(".form").style.display = "none");
    document.getElementById('spinner').style.display = '';
    name = name.toUpperCase();
    connection.connect((err) => {
        if (err) {
            console.error("Error connecting to MySQL:", err);
            return;
        }
        console.log("Connected to MySQL");
        var query1 =
            'SELECT admno,name, fname, class, section, roll, fmob, session, active,transport FROM tbl_admission WHERE session = "2023-2024" AND active = 1';
        // query is for the detail of students from table tbl_admission.
        getData(query1, flag, name, connection);
    });
}

/////////////////////////////////////////////////////////////////////////////////
function getData(query1, flag, name, connection) {
    var matchedList = [];
    connection.query(query1, (err, jsonData) => {
        if (err) {
            console.error("Error querying MySQL:", err);
            return;
        }

        if (jsonData.length > 0) {
            if (flag === 0) {
                for (i = 0; i < jsonData.length; i++) {
                    if (name === jsonData[i].name) {
                        matchedList.push(jsonData[i]);
                        flag++;
                    }
                }
                if (flag == 0) {
                    document.getElementById("notFound").style.color = "red";
                    document.getElementById("notFound").innerHTML =
                        "Data not found,Please Re-enter : ";
                } else {
                    document.getElementById("notFound").innerHTML =
                        "Click on your choice to see the Data";
                }
            } else if (flag === 1) {
                for (i = 0; i < jsonData.length; i++) {
                    if (name === jsonData[i].fname) {
                        matchedList.push(jsonData[i]);
                        flag++;
                    }
                }
                if (flag == 1) {
                    document.getElementById("notFound").style.color = "red";
                    document.getElementById("notFound").innerHTML =
                        "Data not found,Please Re-enter : ";
                } else {
                    document.getElementById("notFound").innerHTML =
                        "Click on your choice to see the Data";
                }
            } else if (flag === 2) {
                for (i = 0; i < jsonData.length; i++) {
                    if (name === jsonData[i].fmob) {
                        matchedList.push(jsonData[i]);
                        flag++;
                    }
                }
                if (flag == 2) {
                    document.getElementById("notFound").style.color = "red";
                    document.getElementById("notFound").innerHTML =
                        "Data not found,Please Re-enter : ";
                } else {
                    document.getElementById("notFound").innerHTML =
                        "Click on your choice to see the Data";
                }
            }
            createTable(matchedList);
        }
    });
}
////////////////////////////////////////////////////////////////////
function createTable(matchedList) {
    // document.querySelector(".dashboard").style.display = 'none';
    var tableContainer = document.getElementById("table-container");

    var newTable = document.createElement("table");
    newTable.id = "list";
    newTable.style.border = "1px solid black";
    for (i = 0; i < matchedList.length; i++) {
        var row = newTable.insertRow();
        row.classList.add("table-row");
        row.id = "row" + i;
        row.innerHTML = `Name : ${matchedList[i].name}<br>Father's Name : ${matchedList[i].fname}<br>Mobile : ${matchedList[i].fmob}<br>_______________________________________`;
    }
    tableContainer.appendChild(newTable);
    document.getElementById('spinner').style.display = 'none';
    document.getElementById("table-container").style.display = "";
    showData(matchedList);
}
//////////////////////////////////////////////////////////////////////////////////////
function showData(matchedList) {
    var rows = document.querySelectorAll("table tr");
    rows.forEach(function (row, i) {
        row.addEventListener("click", function () {
            dashboard(matchedList, i);
        });
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////

function dashboard(matchedList, i) {
    var dashboard = (document.getElementById("dashboard").style.display = "");
    var data = (document.getElementById("data").style.display = "none");
    var form = (document.querySelector(".form").style.display = "none");
    const tableContainer = (document.getElementById("table-container").style.display = "none");
    let feeStatus = document.getElementById("feeStatus");
    var profile = document.getElementById("profile");
    const payNow = document.getElementById('pay-now');
    
    profile.addEventListener("click", refershowProfile, { once: true });

    function refershowProfile() {
        showProfile(matchedList, i);
    }

    document.getElementById('fee-status').style.display = 'none';

    feeStatus.addEventListener("click", refergetdata);
    payNow.addEventListener('click', refergetdata);

    function refergetdata() {
        write(matchedList[i].admno);
    }
}

////////////////////////////////////////////////////////////////////

function write(adm) {
    var dashboard = (document.getElementById("dashboard").style.display = "none");
    var form = (document.querySelector(".form").style.display = "none");
    const tableContainer = (document.getElementById("table-container").style.display = "none");
    const Data = (document.getElementById("data").style.display = "none");
    document.getElementById('spinner').style.display = '';
    pay.setAdmission(adm);
    setTimeout(() => {
        document.getElementById('spinner').style.display = 'none';
        const feeDetails = document.getElementById('fee-status').style.display = '';
    }, 4000);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
function showProfile(matchedList, i) {
    var dashboard = (document.getElementById("dashboard").style.display = "none");
    var data = (document.getElementById("data").style.display = "");
    var form = (document.querySelector(".form").style.display = "none");
    const tableContainer = (document.getElementById(
        "table-container"
    ).style.display = "none");
    document.querySelector(
        ".name"
    ).innerHTML = `<strong class="pr-1">Name :</strong>${matchedList[i].name}`;
    document.querySelector(
        ".ftname"
    ).innerHTML = `<strong class="pr-1">Father's Name :</strong>${matchedList[i].fname}`;
    document.querySelector(
        ".fmob"
    ).innerHTML = `<strong class="pr-1">Mobile :</strong>${matchedList[i].fmob}`;
    document.getElementById("admno").innerHTML = `${matchedList[i].admno}`;
    document.getElementById("class").innerHTML = `${matchedList[i].class}`;
    document.getElementById("section").innerHTML = `${matchedList[i].section}`;
    document.getElementById("roll").innerHTML = `${matchedList[i].roll}`;
    document.getElementById("session").innerHTML = `${matchedList[i].session}`;
    document.getElementById(
        "transport"
    ).innerHTML = `${matchedList[i].transport}`;
    getAndShowTransDetail(matchedList[i]);
}
//////////////////////////////////////////////////////////////////////////////////////////////
function getAndShowTransDetail(matchedList) {
    console.log("hello from getAndShowTransDetail")
    // const data = document.getElementById('data').style.display = '';
    var connection = mysql.createConnection({
        host: "89.117.188.154",
        user: "u932299896_eduware",
        password: "Webgen@220310",
        database: "u932299896_sisdb",
    });
    connection.connect((err) => {
        if (err) {
            console.error("Error connecting to MySQL:", err);
            return;
        } else {
            console.log("CONNECTED TO DB");
        }
        if (matchedList.transport === "YES") {
            const query2 = `SELECT destination from tbl_stdtransdetail WHERE admno="${matchedList.admno}"`;
            connection.query(query2, (err, trans_dest) => {
                if (err) {
                    console.error("Error querying MySQL:", err);
                    return;
                } else {
                    // console.log(trans_dest);
                    document.getElementById(
                        "destination"
                    ).innerHTML = `${trans_dest[0].destination}`;
                }
            });
            const query3 = `SELECT * from tbl_transportfee WHERE admno="${matchedList.admno}"`;
            connection.query(query3, (err, trans_fee) => {
                if (err) {
                    console.error("Error querying MySQL:", err);
                    return;
                } else {
                    transport_fee = trans_fee;
                    document.getElementById(
                        "transport_fee"
                    ).innerHTML = `${trans_fee[0].apr}`;
                }
            });
        } else if (matchedList[i].transport === "NO") {
            document.getElementById("transport_fee").innerHTML = ``;
            document.getElementById("destination").innerHTML = ``;
        }
    });
    // connection.end();
}
//////////////////////////////////////////////////////////////////////
function goFirst() {
    // location.reload();   
    const form = (document.querySelector(".form").style.display = "");
    const dashboard = (document.getElementById("dashboard").style.display = "none");
    const tableContainer = (document.getElementById(
        "table-container"
    ).style.display = "none");
    const data = (document.getElementById("data").style.display = "none");
    var list = document.getElementById("list");
    list.remove();
    var inputs = document.querySelectorAll("input");
    inputs.forEach(function (input) {
        input.value = "";
    });
    document.getElementById("transport_fee").innerHTML = ``;
    document.getElementById("destination").innerHTML = ``;
    document.getElementById('name').focus();
    form.style.height = '550';
    form.style.width = '400';
}
// app.whenReady().then(createWindow);
app.whenReady().then(() => {
    createWindow("index.html", 375, 667);
});

// const { invoke } = window.__TAURI__.tauri;
const mysql = require("mysql");
println = console.log;
class Con {
	#conect;
	#tbl_detail;
	#adm_no;
	#tbl_monthfee;
	#query;
	#total;
	#tbl_transfee;
	#temp;
	#trans_flag;
	#total_fee;
	#tbl_stdfeemaster;
	#tbl_hostelfee;
	#tbl_address;
	#tbl_loc;
	#tbl_address_query;
	#tbl_detail_query;
	#tbl_stdfeemaster_query;
	#tbl_tarnsport_query;
	#tbl_loc_query;
	#tbl_hostelfee_query;
	#tbl_monthfee_query;
	constructor(adm_no) {
		this.#conect = mysql.createConnection({
			host: "89.117.188.154",
			user: "u932299896_eduware",
			password: "Webgen@220310",
			database: "u932299896_sisdb",
		});
		this.#total = 0;
		this.#trans_flag = false;
		this.#total_fee = 0;
		this.#adm_no = adm_no;
		this.#tbl_detail_query = `select * from tbl_admission where admno='${adm_no}' AND session= '2023-2024';`;
		this.#tbl_tarnsport_query = `select * from tbl_transportfee where admno='${adm_no}' AND session= '2023-2024';`;
		this.#tbl_monthfee_query = `select * from tbl_monthfee where admno='${adm_no}' AND session= '2023-2024';`;
		this.#tbl_hostelfee_query = `select * from tbl_hostelfee WHERE admno='${adm_no}' AND session= '2023-2024';`;
		this.#tbl_stdfeemaster_query = `select * from tbl_stdfeemaster WHERE admno='${adm_no}' AND session= '2023-2024';`;
		this.#tbl_loc_query = `select * from tbl_stdtransdetail WHERE admno='${adm_no}';`;
		this.buildConection();
	}
	setAdmission(adm_no) {
		this.#conect = mysql.createConnection({
			host: "89.117.188.154",
			user: "u932299896_eduware",
			password: "Webgen@220310",
			database: "u932299896_sisdb",
		});
		this.#trans_flag = false;
		this.#total_fee = 0;
		this.#total = 0;
		this.#adm_no = adm_no;
		//admno,class,section,roll,name,fname,mname,fmob,whatsapp,hostel,transport,session
		this.#tbl_address_query = `select * from tbl_admission where admno='${adm_no}' AND session= '2023-2024' AND active=1;`;
		this.#tbl_detail_query = `select * from tbl_admission where   admno='${adm_no}' AND session= '2023-2024';`;
		this.#tbl_tarnsport_query = `select * from tbl_transportfee where admno='${adm_no}' AND session= '2023-2024';`;
		this.#tbl_monthfee_query = `select * from tbl_monthfee where admno='${adm_no}' AND session= '2023-2024';`;
		this.#tbl_hostelfee_query = `select * from tbl_hostelfee WHERE admno='${adm_no}' AND session= '2023-2024';`;
		this.#tbl_stdfeemaster_query = `select * from tbl_stdfeemaster WHERE admno='${adm_no}' AND session= '2023-2024';`;
		this.#tbl_loc_query = `select * from tbl_stdtransdetail WHERE admno='${adm_no}';`;

		this.buildConection();
	}
	buildConection() {
		this.#conect.connect((err) => {
			if (err) {
				console.log("unable to connect database");
				return null;
			}
			console.log("sucessfull conection");
			this.#scan();
		});
		println("exited");
	}
	#write() {
		console.log("tbl_detail", this.#tbl_detail);
		console.log("pass1");
		console.log("tbl_monthfee", this.#tbl_monthfee);
		// if (this.#trans_flag) {
		// 	console.log("tbl_transfee", this.#tbl_transfee);
		// } else console.log("tbl_hostelfee", this.#tbl_hostelfee);
		console.log("feedetail ", this.#tbl_stdfeemaster);
		let arr = [
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
			"Jan",
			"Feb",
			"Mar",
		];
		let tfee = [];
		let hfee = [];
		let tempflag = 0;
		if (this.#tbl_detail[0].transport == "YES") {
			tfee = [
				this.#tbl_transfee[0].apr,
				this.#tbl_transfee[0].may,
				this.#tbl_transfee[0].jun,
				this.#tbl_transfee[0].jul,
				this.#tbl_transfee[0].aug,
				this.#tbl_transfee[0].sep,
				this.#tbl_transfee[0].oct,
				this.#tbl_transfee[0].nov,
				this.#tbl_transfee[0].dece,
				this.#tbl_transfee[0].jan,
				this.#tbl_transfee[0].feb,
				this.#tbl_transfee[0].mar,
			];
			tempflag = 1;
		} else if (this.#tbl_detail[0].hostel == "YES") {
			hfee = [
				this.#tbl_hostelfee[0].apr,
				this.#tbl_hostelfee[0].may,
				this.#tbl_hostelfee[0].jun,
				this.#tbl_hostelfee[0].jul,
				this.#tbl_hostelfee[0].aug,
				this.#tbl_hostelfee[0].sep,
				this.#tbl_hostelfee[0].oct,
				this.#tbl_hostelfee[0].nov,
				this.#tbl_hostelfee[0].dece,
				this.#tbl_hostelfee[0].jan,
				this.#tbl_hostelfee[0].feb,
				this.#tbl_hostelfee[0].mar,
			];
			tempflag = 2;
		}
		let fee = [
			this.#tbl_monthfee[0].apr,
			this.#tbl_monthfee[0].may,
			this.#tbl_monthfee[0].jun,
			this.#tbl_monthfee[0].jul,
			this.#tbl_monthfee[0].aug,
			this.#tbl_monthfee[0].sep,
			this.#tbl_monthfee[0].oct,
			this.#tbl_monthfee[0].nov,
			this.#tbl_monthfee[0].dece,
			this.#tbl_monthfee[0].jan,
			this.#tbl_monthfee[0].feb,
			this.#tbl_monthfee[0].mar,
		];
		let month = "";
		console.log("none", tempflag);
		if (tempflag == 0) {
			month = ` 
				<table class="table table-borderless">
					<thead>
						<tr>
							<th><h2>Month</h2></th>
						</tr>
					</thead>
					<tbody>`;
			for (let i in fee) {
				if (fee[i] > 0 || fee[i] == -1) {
					month += `
					<tr>
						<td>
							<h3><input
								class="form-check-input bg-primary"
								type="checkbox"
								checked
								disabled
								/> <label class="form-check-label ">${arr[i]}</label>
							</h3>
						</td>
					</tr>`;
				} else {
					month += `
					<tr>	
						<td>
							<h3>
								<input
								class="form-check-input is-invalid"
								type="checkbox"
								id="m${arr[i]}"
								onclick="pay.action('m${arr[i]}')"
								/> <label class="form-check-label">${arr[i]}</label>
							</h3>
						</td>
					</tr>`;
				}
			}

			month += ` </tbody>
			</table></div>`;
		} else {
			let names;
			let table_arr = [];
			if (tempflag == 2) names = "Hostel";
			if (tempflag == 1) names = "Transport";
			month = ` 
				<table class="table table-borderless">
					<thead>
						<tr>
							<th><h2>Month</h2></th>
							<th><h2>${names}</h2></th>
						</tr>
					</thead>
					<tbody>
					`;
			for (let i in fee)
				if (fee[i] > 0 || fee[i] == -1) {
					table_arr.push(`<h3><input
							class="form-check-input bg-primary"
							type="checkbox"
							checked
							disabled
							/> <label class="form-check-label ">${arr[i]}</label></h3>`);
				} else {
					table_arr.push(`<h3><input
							class="form-check-input is-invalid"
							type="checkbox"
							id="m${arr[i]}"
							onclick="pay.action('m${arr[i]}')"
							/> <label class="form-check-label">${arr[i]}</label></h3>`);
				}
			let htable = [];
			if (tempflag == 1) {
				for (let i in fee) {
					if (tfee[i] > 0 || tfee[i] == -1) {
						htable.push(`<h3><input
								class="form-check-input bg-primary"
								type="checkbox"
								checked
								disabled
								/> <label class="form-check-label ">${arr[i]}</label></h3>`);
					} else {
						htable.push(`<h3><input
								class="form-check-input is-invalid"
								type="checkbox"
								id="t${arr[i]}"
								onclick="pay.action('t${arr[i]}')"
								/> <label class="form-check-label">${arr[i]}</label></h3>`);
					}
				}
			} else {
				for (let i in hfee) {
					if (hfee[i] > 0 || hfee[i] == -1) {
						htable.push(`<h3><input
								class="form-check-input bg-primary"
								type="checkbox"
								checked
								disabled
								/> <label class="form-check-label ">${arr[i]}</label></h3>`);
					} else {
						htable.push(`<h3><input
								class="form-check-input is-invalid"
								type="checkbox"
								id="h${arr[i]}"
								onclick="pay.action('h${arr[i]}')"
								/> <label class="form-check-label">${arr[i]}</label></h3>`);
					}
				}
			}

			for (let i in fee) {
				month += `<tr>
								<td>${table_arr[i]}</td>
								<td>${htable[i]}</td>
							</tr>`;
			}

			month += ` </tbody>
			</table></div>`;
		}
		let destination = ["", ""];
		let flag_dest = ""
		if (tempflag == 1) {
			destination[0] = `<tr>
			<td><h3>Destination<h3></td>
			<td><h3>${this.#tbl_loc[0].destination}<h3></td>
			</tr>`;
			flag_dest = "YES"
		} else flag_dest = "NO";
		let alldisp = `
				<table class="table table-borderless">
						<thead>
							<tr>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>`;
		alldisp += `<tr>
					<td><h3>Adm No<h3></td>
					<td><h3>${this.#tbl_detail[0].admno}<h3></td>
				</tr>
				<tr>
					<td><h3>Name<h3></td>
					<td><h3>${this.#tbl_detail[0].name}<h3></td>
				</tr>
				<tr>
					<td><h3>Class<h3></td>
					<td><h3>${this.#tbl_detail[0].class}<h3></td>
				</tr>
				<tr>
					<td><h3>Section<h3></td>
					<td><h3>${this.#tbl_detail[0].section}<h3></td>
				</tr>
				<tr>
					<td><h3>Roll<h3></td>
					<td><h3>${this.#tbl_detail[0].roll}<h3></td>
				</tr>
				<tr>
					<td><h3>Father Name<h3></td>
					<td><h3>${this.#tbl_detail[0].fname}<h3></td>
				</tr>
				<tr>
					<td><h3>Mob No<h3></td>
					<td><h3>${this.#tbl_detail[0].fmob}<h3></td>
				</tr>
				<tr>
					<td><h3>Whatsapp No<h3></td>
					<td><h3>${this.#tbl_detail[0].whatsapp}<h3></td>
				</tr>
				<tr>
					<td><h3>Transport<h3></td>
					<td><h3>${flag_dest}<h3></td>
				</tr>
				${destination[0]}
				<tr>
					<td><h3>Month Fee<h3></td>
					<td><h3>₹${this.#tbl_stdfeemaster[0].monthfee}.00<h3></td>
				</tr>
				
				`;

		let th = "";
		if (this.#tbl_detail[0].transport == "YES")
			alldisp += `<tr>
					<td><h3>Transport Fee<h3></td>
					<td><h3>₹${this.#tbl_stdfeemaster[0].transportfee}.00<h3></td>
				</tr>`;
		if (this.#tbl_detail[0].hostel == "YES")
			alldisp += `<tr>
						<td><h3>Hostel Fee<h3></td>
						<td><h3>₹${this.#tbl_stdfeemaster[0].hostelfee}.00<h3></td>
					</tr>`;
		alldisp += ` </tbody>
			</table></div>`;
		document.getElementById("doc").innerHTML = `${alldisp}  ${th}  ${month}`;
		document.getElementById("fee").innerHTML = `&nbsp;&nbsp;Total Fee ₹${this.#total
			}.00 <button type="button" class="btn btn-primary"><h4>Pay Now</h4></button>`;
	}
	action(id) {
		let check = document.getElementById(id);
		if (check.checked) {
			check.className = "form-check-input bg-primary";
			if (id.startsWith("m")) this.#total += this.#tbl_stdfeemaster[0].monthfee;
			else {
				if (this.#tbl_detail[0].transport == "YES")
					this.#total += this.#tbl_stdfeemaster[0].transportfee;
				if (this.#tbl_detail[0].hostel == "YES")
					this.#total += this.#tbl_stdfeemaster[0].hostelfee;
			}
		} else {
			check.className = "form-check-input is-invalid";
			if (id.startsWith("m")) this.#total -= this.#tbl_stdfeemaster[0].monthfee;
			else {
				if (this.#tbl_detail[0].transport == "YES")
					this.#total -= this.#tbl_stdfeemaster[0].transportfee;
				if (this.#tbl_detail[0].hostel == "YES")
					this.#total -= this.#tbl_stdfeemaster[0].hostelfee;
			}
		}
		document.getElementById("fee").innerHTML = `&nbsp;&nbsp;Total Fee ₹${this.#total
			}.00 <button type="button" class="btn btn-primary btn-sm"><h4>Pay Now</h4></button>`;
	}
	#scan() {
		this.#getDetail();
	}
	#getTrans() {
		this.#conect.query(this.#tbl_tarnsport_query, (err, data) => {
			if (err) {
				console.log("err hai bhai sahab :", err);
				return null;
			}
			this.#tbl_transfee = data;
			this.#trans_flag = true;
			this.#getLoc();
		});
	}
	#getHostel() {
		this.#conect.query(this.#tbl_hostelfee_query, (err, data) => {
			if (err) {
				console.log("err hai bhai sahab :", err);
				return null;
			}
			this.#tbl_hostelfee = data;
			this.#trans_flag = false;
			// console.log("tbl = ", this.#tbl_hostelfee);
		});
	}
	#getMonth() {
		this.#conect.query(this.#tbl_monthfee_query, (err, data) => {
			if (err) {
				console.log("err hai bhai sahab :", err);
				return null;
			}
			this.#tbl_monthfee = data;
		});
	}
	#getLoc() {
		this.#conect.query(this.#tbl_loc_query, (err, data) => {
			if (err) {
				console.log("err hai bhai sahab :", err);
				return null;
			}
			this.#tbl_loc = data;
			console.log("loc ", this.#tbl_loc);
			this.#write();
		});
	}
	#getFeeDetail() {
		this.#conect.query(this.#tbl_stdfeemaster_query, async (err, data) => {
			if (err) {
				console.log("err hai bhai sahab :", err);
				return null;
			}
			this.#tbl_stdfeemaster = data;
			if (this.#tbl_detail[0].transport == "YES") {
			} else if (this.#tbl_detail[0].hostel == "YES") {
			} else {
				this.#write();
			}
		});
	}
	#getDetail() {
		this.#conect.query(this.#tbl_detail_query, async (err, data) => {
			if (err) {
				console.log("err hai bhai sahab :", err);
				return null;
			}
			console.clear();
			this.#getFeeDetail();
			this.#tbl_detail = data;
			this.#getMonth();
			if (this.#tbl_detail[0].transport == "YES") {
				this.#getTrans();
			} else if (this.#tbl_detail[0].hostel == "YES") {
				this.#getHostel();
			} else {
				this.#getFeeDetail();
			}
		});
	}
}

let pay = new Con();
// "ASIS192000020"
// "ASIS192000067";
function getdata(data) {
	var dashboard = (document.getElementById("dashboard").style.display = "none");
	var form = (document.querySelector(".form").style.display = "none");
	const tableContainer = (document.getElementById(
		"table-container"
	).style.display = "none");
	const Data = (document.getElementById("data").style.display = "none");
	const feeDetails=document.getElementById('fee-status').style.display='';
	pay.setAdmission(data);
	// console.log(data)
}
module.exports = getdata;

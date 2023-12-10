const mysql = require( 'mysql' );
class Con
{
	#conect;
	#tbl_detail;
	#adm_no;
	#tbl_monthfee;
	#total_fine;
	#query;
	#total;
	#fine_flag = {
		fine: [ false, 0 ],
		transfine: [ false, 0 ],
		dueses: [ false, 0 ]
	}; #fine;
	#tbl_transfee;
	#tbl_latefinedate;
	#tbl_miscfee;
	#tbl_examfee;
	#transfine;
	#total_transfine;
	#tbl_micfine_query;
	#tbl_examfee_query;
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
	constructor()
		{
		}
	
	async setAdmission ( adm_no )
	{
		this.#conect = mysql.createConnection( {
			host: "89.117.188.154",
			user: "u932299896_eduware",
			password: "Webgen@220310",
			database: "u932299896_sisdb",
		} );
		this.#total_fine = 0;
		this.#total_transfine = 0;
		this.#trans_flag = false;
		this.#tbl_miscfee = false;
		this.#tbl_examfee = false;
		this.#total_fee = 0;
		this.#total = 0;
		this.#adm_no = adm_no;
		this.#tbl_address_query = `select * from tbl_admission where admno='${ adm_no }' AND session= '2023-2024' AND active=1;`;
		this.#tbl_detail_query = `select * from tbl_admission where admno='${ adm_no }' AND session= '2023-2024' AND active=1;`;
		this.#tbl_tarnsport_query = `select * from tbl_transportfee where admno='${ adm_no }' AND session= '2023-2024';`;
		this.#tbl_monthfee_query = `select * from tbl_monthfee where admno='${ adm_no }' AND session= '2023-2024';`;
		this.#tbl_hostelfee_query = `select * from tbl_hostelfee WHERE admno='${ adm_no }' AND session= '2023-2024';`;
		this.#tbl_stdfeemaster_query = `select * from tbl_stdfeemaster WHERE admno='${ adm_no }' AND session= '2023-2024';`;
		this.#tbl_loc_query = `select * from tbl_stdtransdetail WHERE admno='${ adm_no }';`;
		this.#getDetail();
	}
	#write ()
	{
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
		if ( this.#tbl_detail[ 0 ].transport == "YES" )
		{
			tfee = [
				this.#tbl_transfee[ 0 ].apr,
				this.#tbl_transfee[ 0 ].may,
				this.#tbl_transfee[ 0 ].jun,
				this.#tbl_transfee[ 0 ].jul,
				this.#tbl_transfee[ 0 ].aug,
				this.#tbl_transfee[ 0 ].sep,
				this.#tbl_transfee[ 0 ].oct,
				this.#tbl_transfee[ 0 ].nov,
				this.#tbl_transfee[ 0 ].dece,
				this.#tbl_transfee[ 0 ].jan,
				this.#tbl_transfee[ 0 ].feb,
				this.#tbl_transfee[ 0 ].mar,
			];
			tempflag = 1;
		} else if ( this.#tbl_detail[ 0 ].hostel == "YES" )
		{
			hfee = [
				this.#tbl_hostelfee[ 0 ].apr,
				this.#tbl_hostelfee[ 0 ].may,
				this.#tbl_hostelfee[ 0 ].jun,
				this.#tbl_hostelfee[ 0 ].jul,
				this.#tbl_hostelfee[ 0 ].aug,
				this.#tbl_hostelfee[ 0 ].sep,
				this.#tbl_hostelfee[ 0 ].oct,
				this.#tbl_hostelfee[ 0 ].nov,
				this.#tbl_hostelfee[ 0 ].dece,
				this.#tbl_hostelfee[ 0 ].jan,
				this.#tbl_hostelfee[ 0 ].feb,
				this.#tbl_hostelfee[ 0 ].mar,
			];
			tempflag = 2;
		}
		let fee = [
			this.#tbl_monthfee[ 0 ].apr,
			this.#tbl_monthfee[ 0 ].may,
			this.#tbl_monthfee[ 0 ].jun,
			this.#tbl_monthfee[ 0 ].jul,
			this.#tbl_monthfee[ 0 ].aug,
			this.#tbl_monthfee[ 0 ].sep,
			this.#tbl_monthfee[ 0 ].oct,
			this.#tbl_monthfee[ 0 ].nov,
			this.#tbl_monthfee[ 0 ].dece,
			this.#tbl_monthfee[ 0 ].jan,
			this.#tbl_monthfee[ 0 ].feb,
			this.#tbl_monthfee[ 0 ].mar,
		];
		let month = "";
		if ( tempflag == 0 )
		{
			month = ` 
				<table class="table table-border">
					<thead>
						<tr>
							<th><h2>Month</h2></th>
						</tr>
					</thead>
					<tbody>`;
			for ( let i in fee )
			{
				if ( fee[ i ] > 0 || fee[ i ] == -1 )
				{
					month += `
					<tr>
						<td>
							<h3><input
								class="form-check-input bg-primary"
								type="checkbox"
								checked
								disabled
								/> <label class="form-check-label ">${ arr[ i ] }</label>
							</h3>
						</td>
					</tr>`;
				} else
				{
					month += `
					<tr>	
						<td>
							<h3>
								<input
								class="form-check-input is-invalid"
								type="checkbox"
								id="m${ arr[ i ] }"
								onclick="pay.action('m${ arr[ i ] }')"
								/> <label class="form-check-label">${ arr[ i ] }</label>
							</h3>
						</td>
					</tr>`;
				}
			}
			month += ` </tbody>
					</table></div>`;
		} else
		{
			let names;
			let table_arr = [];
			if ( tempflag == 2 ) names = "Hostel";
			if ( tempflag == 1 ) names = "Transport";
			month = ` 
				<table class="table table-borderless align="center"">
					<thead>
						<tr>
							<th><h2>Month</h2></th>
							<th><h2>${ names }</h2></th>
						</tr>
					</thead>
					<tbody>
					`;
			for ( let i in fee )
				if ( fee[ i ] > 0 || fee[ i ] == -1 )
				{
					table_arr.push( `<h3><input
							class="form-check-input bg-primary"
							type="checkbox"
							checked
							disabled
							/> <label class="form-check-label ">${ arr[ i ] }</label></h3>` );
				} else
				{
					table_arr.push( `<h3><input
							class="form-check-input is-invalid"
							type="checkbox"
							id="m${ arr[ i ] }"
							onclick="pay.action('m${ arr[ i ] }')"
							/> <label class="form-check-label">${ arr[ i ] }</label></h3>` );
				}
			let htable = [];
			if ( tempflag == 1 )
			{
				for ( let i in fee )
				{
					if ( tfee[ i ] > 0 || tfee[ i ] == -1 )
					{
						htable.push( `<h3><input
								class="form-check-input bg-primary"
								type="checkbox"
								checked
								disabled
								/> <label class="form-check-label ">${ arr[ i ] }</label></h3>` );
					} else
					{
						htable.push( `<h3><input
								class="form-check-input is-invalid"
								type="checkbox"
								id="t${ arr[ i ] }"
								onclick="pay.action('t${ arr[ i ] }')"
								/> <label class="form-check-label">${ arr[ i ] }</label></h3>` );
					}
				}
			}
			else
			{
				for ( let i in hfee )
				{
					if ( hfee[ i ] > 0 || hfee[ i ] == -1 )
					{
						htable.push( `<h3><input
								class="form-check-input bg-primary"
								type="checkbox"
								checked
								disabled
								/> <label class="form-check-label ">${ arr[ i ] }</label></h3>` );
					} else
					{
						htable.push( `<h3><input
								class="form-check-input is-invalid"
								type="checkbox"
								id="h${ arr[ i ] }"
								onclick="pay.action('h${ arr[ i ] }')"
								/> <label class="form-check-label">${ arr[ i ] }</label></h3>` );
					}
				}
			}
			for ( let i in fee )
			{
				month += `<tr>
								<td>${ table_arr[ i ] }</td>
								<td>${ htable[ i ] }</td>
							</tr>`;
			}
			month += ` </tbody>
			</table></div>`;
		}
		let destination = [ "", "" ];
		let flag_dest = ""
		if ( tempflag == 1 )
		{
			destination[ 0 ] = `<tr>
			<td><h3>Destination<h3></td>
			<td><h3>${ this.#tbl_loc[ 0 ].destination }<h3></td>
			</tr>`;
			flag_dest = "YES"
		} else flag_dest = "NO";
		let alldisp = `<table class="table table-borderless align="center"">
						<thead>
							<tr>
								<th></th>
								<th></th>
							</tr>
						</thead>
					<tbody>`;
		alldisp += `<tr>
					<td><h3>Adm No<h3></td>
					<td><h3>${ this.#tbl_detail[ 0 ].admno }<h3></td>
				</tr>
				<tr>
					<td><h3>Name<h3></td>
					<td><h3>${ this.#tbl_detail[ 0 ].name }<h3></td>
				</tr>
				<tr>
					<td><h3>Class<h3></td>
					<td><h3>${ this.#tbl_detail[ 0 ].class }<h3></td>
				</tr>
				<tr>
					<td><h3>Section<h3></td>
					<td><h3>${ this.#tbl_detail[ 0 ].section }<h3></td>
				</tr>
				<tr>
					<td><h3>Roll<h3></td>
					<td><h3>${ this.#tbl_detail[ 0 ].roll }<h3></td>
				</tr>
				<tr>
					<td><h3>Father Name<h3></td>
					<td><h3>${ this.#tbl_detail[ 0 ].fname }<h3></td>
				</tr>
				<tr>
					<td><h3>Mob No<h3></td>
					<td><h3>${ this.#tbl_detail[ 0 ].fmob }<h3></td>
				</tr>
				<tr>
					<td><h3>Whatsapp No<h3></td>
					<td><h3>${ this.#tbl_detail[ 0 ].whatsapp }<h3></td>
				</tr>
				<tr>
					<td><h3>Transport<h3></td>
					<td><h3>${ flag_dest }<h3></td>
				</tr>
				${ destination[ 0 ] }
				<tr>
					<td><h3>Month Fee<h3></td>
					<td><h3>₹${ this.#tbl_stdfeemaster[ 0 ].monthfee }.00<h3></td>
				</tr>
				<tr>
					<td><h3>Dues<h3></td>
					<td><h3>₹${ this.#tbl_monthfee[ 0 ].billdues }.00<h3></td>
				</tr>
				<tr>
					<td><h3>Monthly Fine<h3></td>
					<td><h3>₹${ this.#total_fine }.00<h3></td>
				</tr>
				<tr>
					<td><h3>Transport Fine<h3></td>
					<td><h3>₹${ this.#total_transfine }.00<h3></td>
				</tr>
				
				`;
		let th = "";
		if ( this.#tbl_detail[ 0 ].transport == "YES" )
			alldisp += `<tr>
					<td><h3>Transport Fee<h3></td>
					<td><h3>₹${ this.#tbl_stdfeemaster[ 0 ].transportfee }.00<h3></td>
				</tr>`;
		if ( this.#tbl_detail[ 0 ].hostel == "YES" )
			alldisp += `<tr>
						<td><h3>Hostel Fee<h3></td>
						<td><h3>₹${ this.#tbl_stdfeemaster[ 0 ].hostelfee }.00<h3></td>
					</tr>`;
		alldisp += ` </tbody>
			</table></div>`;
		this.#total = 0;
		document.getElementById( "doc" ).innerHTML = `${ alldisp }  ${ th }  ${ month }`;
		document.getElementById( "fee" ).innerHTML = `<button type="button" class="btn btn-primary  btn-lg w-100   disabled"><h1>Total Fee ₹${ this.#total
			}.00  Pay Now</h1></button>`;

	}

	action ( id )
	{
		let check = document.getElementById( id );
		if ( check.checked )
		{
			check.className = "form-check-input bg-primary";
			if ( id.startsWith( "m" ) )
			{
				if ( !this.#fine_flag.fine[ 1 ] )
				{
					this.#total += this.#total_fine;
					this.#fine_flag.fine[ 0 ] = true;
				}
				if ( !this.#fine_flag.dueses[ 1 ] )
				{
					console.log( this.#tbl_stdfeemaster.dues );
					this.#total += this.#tbl_monthfee[ 0 ].billdues
					this.#fine_flag.dueses[ 0 ] = true;
				}
				this.#fine_flag.dueses[ 1 ] += 1;
				this.#fine_flag.fine[ 1 ] += 1;
				this.#total += this.#tbl_stdfeemaster[ 0 ].monthfee;
				if ( !typeof ( this.#tbl_miscfee ) )
				{
					console.log( this.#tbl_miscfee );
					this.#total += this.#tbl_miscfee[ 0 ][ id.substring( 1, id.length ) ]
				}
				if ( !typeof ( this.#tbl_examfee ) )
				{
					this.#total += this.#tbl_examfee[ 0 ][ id.substring( 1, id.length ) ]
				}
			}
			else
			{

				if ( this.#tbl_detail[ 0 ].transport == "YES" )
				{
					if ( !this.#fine_flag.transfine[ 1 ] )
					{
						this.#total += this.#total_transfine;
						this.#fine_flag.transfine[ 0 ] = true;
					}
					if ( this.#fine_flag.transfine[ 1 ] > 0 )
					{
						this.#fine_flag.transfine[ 1 ] += 1;
					}
					this.#total += this.#tbl_stdfeemaster[ 0 ].transportfee;
				}
				if ( this.#tbl_detail[ 0 ].hostel == "YES" )
				{ this.#total += this.#tbl_stdfeemaster[ 0 ].hostelfee; }
			}
		} else
		{
			check.className = "form-check-input is-invalid";
			if ( id.startsWith( "m" ) )
			{
				if ( this.#fine_flag.fine[ 1 ] > 0 )
					this.#fine_flag.fine[ 1 ] -= 1;
				if ( this.#fine_flag.fine[ 1 ] == 0 )
				{
					this.#total -= this.#total_fine;
					this.#fine_flag.fine[ 0 ] = false;
				}
				if ( !typeof ( this.#tbl_miscfee ) )
				{
					this.#total -= this.#tbl_miscfee[ 0 ][ id.substring( 1, id.length ) ]
				}
				if ( !typeof ( this.#tbl_examfee ) )
				{
					this.#total -= this.#tbl_examfee[ 0 ][ id.substring( 1, id.length ) ]
				}
				this.#fine_flag.dueses[ 1 ] -= 1;
				if ( !this.#fine_flag.dueses[ 1 ] )
				{
					this.#total -= this.#tbl_monthfee[ 0 ].billdues
					this.#fine_flag.dueses[ 0 ] = false;
				}
				this.#total -= this.#tbl_stdfeemaster[ 0 ].monthfee;
			}
			else
			{
				if ( this.#tbl_detail[ 0 ].transport == "YES" )
				{
					if ( this.#fine_flag.transfine[ 1 ] > 0 )
						this.#fine_flag.transfine[ 1 ] -= 1;
					if ( this.#fine_flag.transfine[ 1 ] == 0 )
					{
						this.#total -= this.#total_transfine;
						this.#fine_flag.transfine[ 0 ] = true;
					}
					this.#total -= this.#tbl_stdfeemaster[ 0 ].transportfee;
				}
				if ( this.#tbl_detail[ 0 ].hostel == "YES" )
				{ this.#total -= this.#tbl_stdfeemaster[ 0 ].hostelfee; }
			}
		}
		if ( this.#total == 0 )
			document.getElementById( "fee" ).innerHTML = `<button type="button" class="btn btn-primary  btn-lg w-100   disabled"><h1>Total Fee ₹${ this.#total
				}.00  Pay Now</h1></button>`;
		else
		{
			document.getElementById( "fee" ).innerHTML = `<button type="button" class="btn btn-primary  btn-lg w-100  "><h1>Total Fee ₹${ this.#total
				}.00  Pay Now</h1></button>
			`;
		}
	}
	#finecal ()
	{

		const mfee = [
			this.#tbl_monthfee[ 0 ].apr,
			this.#tbl_monthfee[ 0 ].may,
			this.#tbl_monthfee[ 0 ].jun,
			this.#tbl_monthfee[ 0 ].jul,
			this.#tbl_monthfee[ 0 ].aug,
			this.#tbl_monthfee[ 0 ].sep,
			this.#tbl_monthfee[ 0 ].oct,
			this.#tbl_monthfee[ 0 ].nov,
			this.#tbl_monthfee[ 0 ].dece,
			this.#tbl_monthfee[ 0 ].jan,
			this.#tbl_monthfee[ 0 ].feb,
			this.#tbl_monthfee[ 0 ].mar,
		];
		const num_month = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
		const month_num = {
			"Apr": 1,
			"May": 2,
			"Jun": 3,
			"Jul": 4,
			"Aug": 5,
			"Sep": 6,
			"Oct": 7,
			"Nov": 8,
			"Dec": 9,
			"Jan": 10,
			"Feb": 11,
			"Mar": 12
		};

		const cdate = new Date();
		const cmonth = month_num[ num_month[ cdate.getMonth() ] ];
		const cday = cdate.getDate();
		let i = 0;
		this.#total_fine = 0;
		for ( i = 0; i < cmonth; i++ )
		{
			if ( mfee[ i ] == 0 ) this.#total_fine += this.#fine;
		}
		if ( this.#tbl_detail[ 0 ].transport == "YES" )
		{
			const tfee = [
				this.#tbl_transfee[ 0 ].apr,
				this.#tbl_transfee[ 0 ].may,
				this.#tbl_transfee[ 0 ].jun,
				this.#tbl_transfee[ 0 ].jul,
				this.#tbl_transfee[ 0 ].aug,
				this.#tbl_transfee[ 0 ].sep,
				this.#tbl_transfee[ 0 ].oct,
				this.#tbl_transfee[ 0 ].nov,
				this.#tbl_transfee[ 0 ].dece,
				this.#tbl_transfee[ 0 ].jan,
				this.#tbl_transfee[ 0 ].feb,
				this.#tbl_transfee[ 0 ].mar,
			];
			for ( i = 0; i < cmonth; i++ )
			{
				if ( tfee[ i ] == 0 ) this.#total_transfine += this.#transfine;
			}
		}
		if ( cday > this.#tbl_latefinedate ) this.#total_fine += this.#fine;
	}
	async #sqlQuery ( querys )
	{
		return await new Promise( ( resolve, reject ) =>
		{
			this.#conect.query( querys, ( error, results ) =>
			{
				if ( error ) reject( error );

				if ( !results[ 0 ] )
				{
					resolve();
					return;
				} else
				{
					resolve( results );
				}

			} )
		} );
	}
	async #getDetail ()
	{
		try
		{
			await new Promise( ( resolve, reject ) =>
			{
				this.#conect.connect( function ( err )
				{
					if ( err ) reject( err );
					resolve();
				} );
			} )
			this.#tbl_detail = await this.#sqlQuery( this.#tbl_detail_query );
			this.#tbl_latefinedate = await this.#sqlQuery( `SELECT * FROM tbl_latefinedate;` );
			const fineResult = await this.#sqlQuery( `SELECT * FROM tbl_monthlyfeesetup WHERE class="${ this.#tbl_detail[ 0 ].class }";` );
			this.#fine = fineResult[ 0 ].fine;
			this.#transfine = fineResult[ 0 ].transfine;

			this.#tbl_examfee = await this.#sqlQuery( `SELECT * FROM tbl_examfee WHERE class="${ this.#tbl_detail[ 0 ].class }";` )
			this.#tbl_miscfee = await this.#sqlQuery( `SELECT * FROM tbl_miscfee WHERE class="${ this.#tbl_detail[ 0 ].class }";` )

			this.#tbl_monthfee = await this.#sqlQuery( this.#tbl_monthfee_query );
			this.#tbl_stdfeemaster = await this.#sqlQuery( this.#tbl_stdfeemaster_query );

			if ( this.#tbl_detail[ 0 ].transport === "YES" )
			{
				this.#tbl_transfee = await this.#sqlQuery( this.#tbl_tarnsport_query );
				this.#tbl_loc = await this.#sqlQuery( this.#tbl_loc_query );
				this.#trans_flag = true;
			} else if ( this.#tbl_detail[ 0 ].hostel === "YES" )
			{
				this.#tbl_hostelfee = await this.#sqlQuery( this.#tbl_hostelfee_query );
				this.#trans_flag = false;
			}
			this.#conect.end();
			this.#finecal();
			this.#write()
		} catch ( error )
		{
			console.error( 'Error in #getDetails:', error );
		}
	}
}


module.exports = Con;
// pay.setAdmission( "ASIS192000020" );

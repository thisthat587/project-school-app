async payment()
{
  let arr = []
  let check = document.querySelectorAll("input[type='checkbox']:checked");
  this.#stack_fee["std"] = []
  this.#stack_fee["trans"] = []
  this.#stack_fee["host"] = []
  this.#stack_fee["billdues"] = this.#tbl_monthfee[0].billdues;
  check.forEach(function (x) {
    if (x.checked)
      arr.push(`${x.id}`);
  })
  arr.forEach((x) => {
    if (x != "")
      if (x.startsWith('m')) this.#stack_fee["std"].push(x)
      else if (x.startsWith('t')) this.#stack_fee["trans"].push(x)
      else if (x.startsWith('h')) this.#stack_fee["host"].push(x)
  })
  console.clear();
  console.table(this.#stack_fee)
  console.log("you click");
  await this.updating();
}
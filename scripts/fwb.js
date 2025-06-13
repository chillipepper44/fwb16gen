// ==========================
// Shipper Form
// ==========================
const shipper = document.getElementById("shipperContainer");
if (shipper) {
  shipper.innerHTML = `
    <div class="section-box">
      <h3>Shipper Information</h3>

      <label>Shipper Name</label>
      <input id="shipperName" maxlength="35" style="width: 520px;" placeholder="ACME CO LTD" />

      <label>Shipper Address</label>
      <input id="shipperAddr" maxlength="35" style="width: 520px;" placeholder="152 Silom Rd" />

      <label>Shipper City</label>
      <input id="shipperCity" maxlength="19" style="width: 300px;" placeholder="Bangkok" />

      <label>Shipper Post Code</label>
      <input id="shipperPost" maxlength="9" style="width: 110px;" placeholder="10500" />

      <label>Shipper Phone No</label>
      <input id="shipperTel" maxlength="18" style="width: 200px;" placeholder="0812345678" />

      <label>Shipper Country</label>
      <input id="shipperCountry" maxlength="2" placeholder="TH" style="width: 45px;" class="center-text" />
    </div>
  `;
}

// ==========================
// Consignee Form
// ==========================
const consignee = document.getElementById("consigneeContainer");
if (consignee) {
  consignee.innerHTML = `
    <div class="section-box">
      <h3>Consignee Information</h3>

      <label>Consignee Name</label>
      <input id="consigneeName" maxlength="35" style="width: 520px;" placeholder="BETA CO LTD" />

      <label>Consignee Address</label>
      <input id="consigneeAddr" maxlength="35" style="width: 520px;" placeholder="88 Jalan Ampang" />

      <label>Consignee City</label>
      <input id="consigneeCity" maxlength="19" style="width: 300px;" placeholder="SINGAPORE" />

      <label>Consignee Post Code</label>
      <input id="consigneePost" maxlength="9" style="width: 110px;" placeholder="50450" />

      <label>Consignee Phone No</label>
      <input id="consigneeTel" maxlength="18" style="width: 200px;" placeholder="0123456789" />

      <label>Consignee Country</label>
      <input id="consigneeCountry" maxlength="2" placeholder="SG" style="width: 45px;" class="center-text" />
    </div>
  `;
}

// ==========================
// AWB Input Auto-format
// ==========================
const awbInput = document.getElementById("awb");
if (awbInput) {
  awbInput.oninput = function (e) {
    let raw = e.target.value.replace(/[^0-9]/g, "");
    if (raw.length > 3) {
      raw = raw.slice(0, 3) + "-" + raw.slice(3, 11);
    }
    e.target.value = raw;
  };
}

// ==========================
// Generate FWB Function
// ==========================
function generateFWB() {
  const $ = id => document.getElementById(id).value.trim().toUpperCase();

  const pcs = parseFloat($("pcs")) || 0;
  const weight = parseFloat($("weight")) || 0;
  const cweight = parseFloat($("cweight")) || 0;

  let msg = `FWB/16\n`;
  msg += `${$("awb")}${$("dep")}${$("arr")}/T${pcs}K${weight}\n`;
  msg += `FLT/${$("flight")}/${$("flightDate").substring(0, 2)}\n`;
  msg += `RTG/${$("arr")}${$("flight").substring(0, 2)}\n`;

  const shipperBase = `SHP\n/${$("shipperName")}\n/${$("shipperAddr")}\n/${$("shipperCity")}\n/${$("shipperCountry")}`;
  let shipperLine = shipperBase;
  if ($("shipperPost")) {
  shipperLine += `/${$("shipperPost")}`;
  if ($("shipperTel")) shipperLine += `/TE/${$("shipperTel")}`;
  } else if ($("shipperTel")) {
  shipperLine += `//TE/${$("shipperTel")}`;
  }
  shipperLine += `\n`;

  const consigneeBase = `CNE\n/${$("consigneeName")}\n/${$("consigneeAddr")}\n/${$("consigneeCity")}\n/${$("consigneeCountry")}`;
  let consigneeLine = consigneeBase;
  if ($("consigneePost")) {
  consigneeLine += `/${$("consigneePost")}`;
  if ($("consigneeTel")) consigneeLine += `/TE/${$("consigneeTel")}`;
  } else if ($("consigneeTel")) {
  consigneeLine += `//TE/${$("consigneeTel")}`;
  }
  consigneeLine += `\n`;

  msg += shipperLine;
  msg += consigneeLine;

  msg += `CVD/THB/PP/PP/NVD/NCV/XXX\n`;
  msg += `RTD/1/P${pcs}/K${weight}/CQ/W${cweight}/R1/T${pcs}\n`;
  msg += `OTH/P/AWA1\n`;
  msg += `/P/AWC1\n`;
  msg += `PPD/WT${pcs}/TX1/CT${pcs}\n`;
  msg += `ISU/${$("flightDate")}/${$("dep")}\n`;

  document.getElementById("output").innerText = msg;
}

// ==========================
// Bind to Window
// ==========================
window.generateFWB = generateFWB;

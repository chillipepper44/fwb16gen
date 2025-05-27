// ==========================
// Insert HKT Shipper Form
// ==========================
const shipper = document.getElementById("HKTshipperContainer");
if (shipper) {
  shipper.innerHTML = `
    <div class="section-box">
      <h3>Shipper Information</h3>
      <label>Shipper Name</label>
      <input id="shipperName" maxlength="35" style="width: 520px;" placeholder="MOST INVEST LIMITED" />
      <label>Shipper Address</label>
      <input id="shipperAddr" maxlength="35" style="width: 520px;" placeholder="6 F MANULIFE PLACE 348 KWUN TONG RD" />
      <label>Shipper City</label>
      <input id="shipperCity" maxlength="19" style="width: 300px;" placeholder="KOWLOON" />
      <label>Shipper Country</label>
      <input id="shipperCountry" maxlength="2" placeholder="HK" style="width: 45px;" class="center-text" />
    </div>
  `;
}

// ==========================
// Insert HKT Consignee Form
// ==========================
const consignee = document.getElementById("HKTconsigneeContainer");
if (consignee) {
  consignee.innerHTML = `
    <div class="section-box">
      <h3>Consignee Information</h3>
      <label>Consignee Name</label>
      <input id="consigneeName" maxlength="35" style="width: 520px;" placeholder="PREDPRIYATIE ELTEKS OOO" />
      <label>Consignee Address</label>
      <input id="consigneeAddr" maxlength="35" style="width: 520px;" placeholder="NOVOSIBIRSK CITY OKRUZHNAYAS" />
      <label>Consignee City</label>
      <input id="consigneeCity" maxlength="19" style="width: 300px;" placeholder="NOVOSIBIRSK" />
      <label>Consignee Country</label>
      <input id="consigneeCountry" maxlength="2" placeholder="RU" style="width: 45px;" class="center-text" />
    </div>
  `;
}

// ==========================
// Insert HKT Agent Form
// ==========================
const agent = document.getElementById("HKTagentContainer");
if (agent) {
  agent.innerHTML = `
    <div class="section-box">
      <h3>Agent Information</h3>
      <div style="display: flex; gap: 50px; margin-bottom: 10px;">
        <div>
          <label>Agent Number</label>
          <input id="agentNo" maxlength="7" style="width: 80px;" value="9999999"/>
        </div>
        <div>
          <label>Agent Name</label>
          <input id="agentName" maxlength="28" style="width: 280px;" placeholder="ASIAN FLIGHT SERVICE CO LTD" />
        </div>
      </div>
      <div style="display: flex; gap: 95px;">
        <div>
          <label>Place</label>
          <input id="place" maxlength="3" placeholder="HKT" style="width: 60px;" class="center-text" />
        </div>
        <div>
          <label>Date on AWB</label>
          <input id="dateawb" placeholder="01JAN25" style="width: 100px;" class="center-text" />
        </div>
      </div>
    </div>
  `;
}

// ==========================
// AWB Auto-format Input
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
// Auto-Calculate Total Display (cweight × rate)
// ==========================
const cweightInput = document.getElementById("cweight");
const rateInput = document.getElementById("rate");
const totalDisplay = document.getElementById("total-display");

function updateTotalDisplay() {
  const c = parseFloat(cweightInput?.value) || 0;
  const r = parseFloat(rateInput?.value) || 0;
  const total = (c * r).toFixed(2);
  if (totalDisplay) totalDisplay.textContent = total;
}

if (cweightInput) cweightInput.oninput = updateTotalDisplay;
if (rateInput) rateInput.oninput = updateTotalDisplay;

// ==========================
// Generate HKT FWB Function
// ==========================
function generateHKTFWB() {
  const $ = id => document.getElementById(id).value.trim().toUpperCase();

  const pcs = parseFloat($("pcs")) || 0;
  const weight = parseFloat($("weight")) || 0;
  const cweight = parseFloat($("cweight")) || 0;
  const rate = parseFloat($("rate")) || 0;
  const total = parseFloat(document.getElementById("total-display")?.textContent) || 0;
  const totalFormatted = Number.isInteger(total) ? total.toString() : total.toFixed(2);
  const currency = $("currency");
  const payType = document.querySelector('input[name="paytype"]:checked')?.value || "PP";

  let msg = `FWB/16\n`;
  msg += `${$("awb")}${$("dep")}${$("arr")}/T${pcs}K${weight}\n`;
  msg += `FLT/${$("flight")}/${$("flightDate").substring(0, 2)}\n`;
  msg += `RTG/${$("arr")}${$("flight").substring(0, 2)}\n`;

  msg += `SHP\n/${$("shipperName")}\n/${$("shipperAddr")}\n/${$("shipperCity")}\n/${$("shipperCountry")}\n`;
  msg += `CNE\n/${$("consigneeName")}\n/${$("consigneeAddr")}\n/${$("consigneeCity")}\n/${$("consigneeCountry")}\n`;

  msg += `AGT//${$("agentNo")}\n`;
  msg += `/${$("agentName")}\n`;
  msg += `/${$("place")}\n`;

  msg += `ACC/GEN/FREIGHT PREPAID\n`;
  msg += `CVD/${currency}/${payType}/${payType}/NVD/NCV/XXX\n`;
  msg += `RTD/1/P1/K${weight}/CQ/W${cweight}/R${rate}/T${totalFormatted}\n`;
  msg += `/NG/${$("ng")}\n`;
  msg += `PPD/WT${totalFormatted}\n`;
  msg += `/CT${totalFormatted}\n`;
  msg += `ISU/${$("flightDate")}/${$("place")}/${$("agentName")}\n`;
  msg += `REF///GHA/AGS/DMK`;

  document.getElementById("output").innerText = msg;
}

// ==========================
// Export Function to Window
// ==========================
window.generateHKTFWB = generateHKTFWB;

// Shipper Form
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("shipperContainer").innerHTML = `
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
});

// Consignee Form
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("consigneeContainer").innerHTML = `
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
});

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
  if ($("shipperPost")) shipperLine += `/${$("shipperPost")}`;
  if ($("shipperTel")) shipperLine += `/TE/${$("shipperTel")}`;
  shipperLine += `\n`;

  const consigneeBase = `CNE\n/${$("consigneeName")}\n/${$("consigneeAddr")}\n/${$("consigneeCity")}\n/${$("consigneeCountry")}`;
  let consigneeLine = consigneeBase;
  if ($("consigneePost")) consigneeLine += `/${$("consigneePost")}`;
  if ($("consigneeTel")) consigneeLine += `/TE/${$("consigneeTel")}`;
  consigneeLine += `\n`;

  msg += shipperLine;
  msg += consigneeLine;

  msg += `CVD/THB/PP/PP/NVD/NCV/XXX\n`;
  msg += `RTD/1/P${pcs}/K${weight}/CQ/W${cweight}/R1/T${pcs}\n`;
  msg += `PPD/WT${pcs}/CT${pcs}\n`;
  msg += `ISU/${$("flightDate")}/${$("dep")}\n`;

  document.getElementById("output").innerText = msg;
}

function generateFHL() {
  const $ = id => document.getElementById(id).value.trim().toUpperCase();

  const mpcs = parseFloat($("mpcs")) || 0;
  const mweight = parseFloat($("mweight")) || 0;
  const hpcs = parseFloat($("hpcs")) || 0;
  const hweight = parseFloat($("hweight")) || 0;

  let msg = 'FHL/4\n';
  msg += `MBI/${$("mawb")}${$("mdep")}${$("marr")}/T${mpcs}K${mweight}\n`;
  msg += `HBS/${$("hawb")}/${$("hdep")}${$("harr")}/${hpcs}/K${hweight}/${hpcs}/${$("hng")}\n`;
  msg += `TXT/${$("hng")}\n`;

  const shipperLine = `SHP/${$("shipperName")}\n/${$("shipperAddr")}\n/${$("shipperCity")}\n/${$("shipperCountry")}`;
  const shipperPost = $("shipperPost");
  const shipperTel = $("shipperTel");
  let shipperFull = shipperLine;
  if (shipperPost) shipperFull += `/${shipperPost}`;
  if (shipperTel) shipperFull += `/TE/${shipperTel}`;
  shipperFull += `\n`;

  const consigneeLine = `CNE/${$("consigneeName")}\n/${$("consigneeAddr")}\n/${$("consigneeCity")}\n/${$("consigneeCountry")}`;
  const consigneePost = $("consigneePost");
  const consigneeTel = $("consigneeTel");
  let consigneeFull = consigneeLine;
  if (consigneePost) consigneeFull += `/${consigneePost}`;
  if (consigneeTel) consigneeFull += `/TE/${consigneeTel}`;
  consigneeFull += `\n`;

  msg += shipperFull;
  msg += consigneeFull;
  msg += `CVD/THB/PP/NVD/0.000/0.00\n`;

  document.getElementById("output").innerText = msg;
}

// AWB Number
document.addEventListener("DOMContentLoaded", () => {
  const awbInput = document.getElementById("awb");
  if (awbInput) {
    awbInput.addEventListener("input", function (e) {
      let raw = e.target.value.replace(/[^0-9]/g, "");
      if (raw.length > 3) {
        raw = raw.slice(0, 3) + "-" + raw.slice(3, 11);
      }
      e.target.value = raw;
    });
  }
});

// MAWB Number for FHL
document.addEventListener("DOMContentLoaded", () => {
  const awbInput = document.getElementById("mawb");
  if (awbInput) {
    awbInput.addEventListener("input", function (e) {
      let raw = e.target.value.replace(/[^0-9]/g, "");
      if (raw.length > 3) {
        raw = raw.slice(0, 3) + "-" + raw.slice(3, 11);
      }
      e.target.value = raw;
    });
  }
});

// HKT Shipper Form
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("HKTshipperContainer").innerHTML = `
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
});

// HKT Consignee Form
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("HKTconsigneeContainer").innerHTML = `
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
});

// HKT Agent Form
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("HKTagentContainer").innerHTML = `
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
});

// HKT Gen FWB
function generateHKTFWB() {
  const $ = id => document.getElementById(id).value.trim().toUpperCase();

  const pcs = parseFloat($("pcs")) || 0;
  const weight = parseFloat($("weight")) || 0;
  const cweight = parseFloat($("cweight")) || 0;
  const rate = parseFloat($("rate")) || 0;
  const total = parseFloat(document.getElementById("total-display").textContent) || 0;
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
  msg += `ISU/${$("flightDate")}/${$("dep")}/${$("place")}/${$("agentName")}\n`;
  msg += `REF///GHA/AGS/DMK`;

  document.getElementById("output").innerText = msg;
}

// HKT Gen FHL
function generateHKTFHL() {
  const $ = id => document.getElementById(id).value.trim().toUpperCase();

  const mpcs = parseFloat($("mpcs")) || 0;
  const mweight = parseFloat($("mweight")) || 0;
  const hpcs = parseFloat($("hpcs")) || 0;
  const hweight = parseFloat($("hweight")) || 0;
  const currency = $("currency");
  const payType = document.querySelector('input[name="paytype"]:checked')?.value || "PP";

  let msg = 'FHL/4\n';
  msg += `MBI/${$("mawb")}${$("mdep")}${$("marr")}/T${mpcs}K${mweight}\n`;
  msg += `HBS/${$("hawb")}/${$("hdep")}${$("harr")}/${hpcs}/K${hweight}//${$("hng")}\n`;

  msg += `SHP/${$("shipperName")}\n/${$("shipperAddr")}\n/${$("shipperCity")}\n/${$("shipperCountry")}\n`;

  msg += `CNE/${$("consigneeName")}\n/${$("consigneeAddr")}\n/${$("consigneeCity")}\n/${$("consigneeCountry")}\n`;

  msg += `CVD/${currency}/${payType}/NVD/NCV/XXX`;

  document.getElementById("output").innerText = msg;
}

document.addEventListener("DOMContent Loaded", () => {
  const cweightInput = document.getElementById("cweight");
  const rateInput = document.getElementById("rate");
  const totalDisplay = document.getElementById("total-display");

  function updateTotalDisplay() {
    const c = parseFloat(cweightInput.value) || 0;
    const r = parseFloat(rateInput.value) || 0;
    const total = (c * r).toFixed(2);
    totalDisplay.textContent = total;
  }

  cweightInput.addEventListener("input", updateTotalDisplay);
  rateInput.addEventListener("input", updateTotalDisplay);
});

// MAWB Form
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("mawbContainer").innerHTML = `
<div class="section-box">
  <h3>MAWB Information</h3>
  
  <div class="double-row">
    <div class="form-field">
      <label>MAWB Number</label>
      <input id="mawb" placeholder="310-12345678" style="width: 120px;">
    </div>

    <div class="form-field">
      <label>MAWB Dep Airport</label>
      <input id="mdep" placeholder="HKT" maxlength="3" style="width: 56px;" class="center-text" />
    </div>

    <div class="form-field">
      <label>MAWB Arr Airport</label>
      <input id="marr" placeholder="MCT" maxlength="3" style="width: 56px;" class="center-text" />
    </div>

  </div>

  <div class="double-row">
    <div class="form-field">
      <label>MAWB Piece (PCS)</label>
      <input id="mpcs" type="number" placeholder="10" style="width: 136px;">
    </div>

    <div class="form-field">
      <label>MAWB Weight (kg)</label>
      <input id="mweight" type="number" placeholder="20.00" style="width: 136px;">
    </div>
  </div>
</div>
  `;
});

// HAWB Form
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("hawbContainer").innerHTML = `
<div class="section-box">
  <h3>HAWB Information</h3>
  
  <div class="double-row">
    <div class="form-field">
      <label>HAWB Number</label>
      <input id="hawb" placeholder="63000973" style="width: 180px;" />
    </div>

    <div class="form-field">
      <label>HAWB Dep Airport</label>
      <input id="hdep" placeholder="HKT" maxlength="3" style="width: 56px;" />
    </div>

    <div class="form-field">
      <label>HAWB Arr Airport</label>
      <input id="harr" placeholder="MCT" maxlength="3" style="width: 56px;" />
    </div>

  </div>

  <div class="double-row">
    <div class="form-field">
      <label>HAWB Piece (PCS)</label>
      <input id="hpcs" type="number" placeholder="10" style="width: 136px;" />
    </div>

    <div class="form-field">
      <label>HAWB Weight (kg)</label>
      <input id="hweight" type="number" placeholder="20.00" style="width: 136px;" />
    </div>
    <div class="form-field">
      <label>HAWB Nature of Goods (NG)</label>
      <input id="hng" placeholder="LIVE TROPICAl FISH" />
    </div>
    <div class="rtd-row">
    <div class="rtd-field">
      <label>Currency</label>
      <input id="currency" maxlength="3" style="width: 56px;" placeholder="THB" class="center-text" value="THB" />
    </div>
    <div class=".rtd-field.full-width">
      <label>Prepaid / Collect</label>
      <div class="radio-group">
        <label><input type="radio" name="paytype" value="PP" checked /> Prepaid</label>
        <label><input type="radio" name="paytype" value="CC" /> Collect</label>
      </div>
    </div>
  </div>
  </div>
</div>
  `;
});

document.addEventListener("DOMContentLoaded", () => {
  const awbInput = document.getElementById("mawb");
  if (awbInput) {
    awbInput.addEventListener("input", function (e) {
      let raw = e.target.value.replace(/[^0-9]/g, "");
      if (raw.length > 3) {
        raw = raw.slice(0, 3) + "-" + raw.slice(3, 11);
      }
      e.target.value = raw;
    });
  }
});

// Clear Shipper & Consignee for FHL Form
document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clearBtn");
  clearBtn.addEventListener("click", clearHouseFields);
});
function clearHouseFields() {
  const idsToClear = [
    "shipperName", "shipperAddr", "shipperCity", "shipperPost", "shipperTel", "shipperCountry",
    "consigneeName", "consigneeAddr", "consigneeCity", "consigneePost", "consigneeTel", "consigneeCountry",
    "hpcs", "hweight", "hng", "hawb", "hdep", "harr"
  ];

  idsToClear.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  const totalDisplay = document.getElementById("total-display");
  if (totalDisplay) totalDisplay.textContent = "0.00";
}

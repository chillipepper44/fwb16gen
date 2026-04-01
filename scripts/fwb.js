// ==========================
// Shipper Form
// ==========================
const shipper = document.getElementById("shipperContainer");
if (shipper) {
  shipper.innerHTML = `
    <div class="section-box">
      <h3>Shipper Information</h3>

      <label>Shipper Name</label>
      <input id="shipperName" maxlength="50" style="width: 520px;" placeholder="ACME CO LTD" />

      <label>Shipper Address</label>
      <input id="shipperAddr" maxlength="50" style="width: 520px;" placeholder="152 Silom Rd" />

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
      <input id="consigneeName" maxlength="50" style="width: 520px;" placeholder="BETA CO LTD" />

      <label>Consignee Address</label>
      <input id="consigneeAddr" maxlength="50" style="width: 520px;" placeholder="88 Jalan Ampang" />

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
// OCI Section
// ==========================
const oci = document.getElementById("ociContainer");
if (oci) {
  oci.innerHTML = `
    <div class="section-box">
      <h3 onclick="toggleOCI()" style="cursor:pointer;">
        ➕ Optional OCI / SPH
      </h3>

      <div id="ociSection" style="display:none; margin-top:10px;">

        <!-- SPH -->
        <div class="rtd-row">
          <div class="rtd-field">
            <label>SPH</label>
            <input id="sph" placeholder="PER">
          </div>
        </div>

        <!-- SHP -->
        <div class="rtd-row">
          <div class="rtd-field">
            <label>Country (SHP)</label>
            <input id="cc1" placeholder="TH" class="center-text" maxlength="2">
          </div>
          <div class="rtd-field" style="flex:1;">
            <label>Info</label>
            <input id="info1" placeholder="TRADE REGISTER NUMBER">
          </div>
        </div>

        <!-- CNE -->
        <div class="rtd-row">
          <div class="rtd-field">
            <label>Country (CNE)</label>
            <input id="cc2" placeholder="CN" class="center-text" maxlength="2">
          </div>
          <div class="rtd-field" style="flex:1;">
            <label>CNE T</label>
            <input id="info2" placeholder="USCI">
          </div>
        </div>

        <div class="rtd-row">
          <div class="rtd-field">
            <label style="visibility:hidden;">Country</label>
            <input id="cc2_display1" readonly placeholder="(same)" class="center-text">
          </div>
          <div class="rtd-field" style="flex:1;">
            <label>CNE KC</label>
            <input id="info3" placeholder="CNE NAME">
          </div>
        </div>

        <div class="rtd-row">
          <div class="rtd-field">
            <label style="visibility:hidden;">Country</label>
            <input id="cc2_display2" readonly placeholder="(same)" class="center-text">
          </div>
          <div class="rtd-field" style="flex:1;">
            <label>CNE U</label>
            <input id="info4" placeholder="TEL">
          </div>
        </div>

      </div>
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
import { generateOCI } from "./utils.js";

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
  msg += `RTD/1/P1/K1/CQ/W${cweight}/R1/T1\n`;
  msg += `OTH/P/AWC1\n`;
  msg += `PPD/WT1\n`;
  msg += `/CT1\n`;
  msg += `ISU/${$("flightDate")}/${$("dep")}\n`;
  msg += `REF/XXXX\n`;

  const ociBlock = generateOCI();

  if (ociBlock) {
  msg += ociBlock + "\n";
  }

document.getElementById("output").innerText = msg;
}
// ==========================
// Bind to Window
// ==========================
window.generateFWB = generateFWB;

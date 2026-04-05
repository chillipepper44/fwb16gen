// ==========================
// Helpers
// ==========================
const $ = id =>
  document.getElementById(id)?.value.trim().toUpperCase() || "";

const getEl = id => document.getElementById(id);


// ==========================
// Shipper Form
// ==========================
const shipper = getEl("shipperContainer");

if (shipper) {
  shipper.innerHTML = `
    <div class="section-box">
      <h3>Shipper Information</h3>

      <label>Shipper Name</label>
      <input id="shipperName" maxlength="35" style="width:520px;" placeholder="ACME CO LTD"/>

      <label>Shipper Address</label>
      <input id="shipperAddr" maxlength="35" style="width:520px;" placeholder="152 Silom Rd"/>

      <label>Shipper City</label>
      <input id="shipperCity" maxlength="17" style="width:300px;" placeholder="Bangkok"/>

      <label>Shipper Post Code</label>
      <input id="shipperPost" maxlength="9" style="width:110px;" placeholder="10500"/>

      <label>Shipper Phone No</label>
      <input id="shipperTel" maxlength="18" style="width:200px;" placeholder="0812345678"/>

      <label>Shipper Country</label>
      <input id="shipperCountry" maxlength="2" placeholder="TH" style="width:45px;" class="center-text"/>
    </div>
  `;
}


// ==========================
// Consignee Form
// ==========================
const consignee = getEl("consigneeContainer");

if (consignee) {
  consignee.innerHTML = `
    <div class="section-box">
      <h3>Consignee Information</h3>

      <label>Consignee Name</label>
      <input id="consigneeName" maxlength="35" style="width:520px;" placeholder="BETA CO LTD"/>

      <label>Consignee Address</label>
      <input id="consigneeAddr" maxlength="35" style="width:520px;" placeholder="88 Jalan Ampang"/>

      <label>Consignee City</label>
      <input id="consigneeCity" maxlength="17" style="width:300px;" placeholder="SINGAPORE"/>

      <label>Consignee Post Code</label>
      <input id="consigneePost" maxlength="9" style="width:110px;" placeholder="50450"/>

      <label>Consignee Phone No</label>
      <input id="consigneeTel" maxlength="18" style="width:200px;" placeholder="0123456789"/>

      <label>Consignee Country</label>
      <input id="consigneeCountry" maxlength="2" placeholder="SG" style="width:45px;" class="center-text"/>
    </div>
  `;
}


// ==========================
// OCI Section
// ==========================
const oci = getEl("ociContainer");

if (oci) {
  oci.innerHTML = `
    <div class="section-box">
      <h3 onclick="toggleOCI()" style="cursor:pointer;">
        ➕ MAWB OCI / SPH
      </h3>

      <div id="ociSection" style="display:none; margin-top:10px;">

        <div class="rtd-row">
          <div class="rtd-field">
            <label>SPH</label>
            <input id="sph" placeholder="PER" maxlength="3" class="center-text">
          </div>
        </div>

        <div class="rtd-row">
          <div class="rtd-field">
            <label>Country (SHP)</label>
            <input id="cc1" maxlength="2" class="center-text" placeholder="TH">
          </div>
          <div class="rtd-field" style="flex:1;">
            <label>Info</label>
            <input id="info1" placeholder="TRADE REGISTER NUMBER" maxlength="35">
          </div>
        </div>

        <div class="rtd-row">
          <div class="rtd-field">
            <label>Country (CNE)</label>
            <input id="cc2" maxlength="2" class="center-text" placeholder="CN">
          </div>
          <div class="rtd-field" style="flex:1;">
            <label>CNE T</label>
            <input id="info2" placeholder="USCI" maxlength="35">
          </div>
        </div>

        <div class="rtd-row">
          <div class="rtd-field">
            <label style="visibility:hidden;">.</label>
            <input id="cc2_display1" readonly class="center-text" placeholder="(same)">
          </div>
          <div class="rtd-field" style="flex:1;">
            <label>CNE KC</label>
            <input id="info3" placeholder="CNE NAME" maxlength="35">
          </div>
        </div>

        <div class="rtd-row">
          <div class="rtd-field">
            <label style="visibility:hidden;">.</label>
            <input id="cc2_display2" readonly class="center-text" placeholder="(same)">
          </div>
          <div class="rtd-field" style="flex:1;">
            <label>CNE U</label>
            <input id="info4" placeholder="TEL" maxlength="35">
          </div>
        </div>

      </div>
    </div>
  `;
}

// ==========================
// FHL Section (Collapsible)
// ==========================
const fhl = getEl("fhlContainer");

if (fhl) {
  fhl.innerHTML = `
    <div class="section-box">
      <h3 onclick="toggleFHL()" style="cursor:pointer;">
        ➕ FHL / HAWB
      </h3>

      <div id="fhlSection" style="display:none; margin-top:10px;">

        <!-- MAWB -->
        <div class="double-row">
          <div class="form-field">
            <label>MAWB</label>
            <input id="fhl_mawb" readonly style="width: 120px;">
          </div>
          <div class="form-field">
            <label>PCS</label>
            <input id="fhl_mpcs" readonly style="width: 136px;">
          </div>
          <div class="form-field">
            <label>Weight</label>
            <input id="fhl_mweight" readonly style="width: 136px;">
          </div>
        </div>

        <!-- HAWB -->
        <div class="double-row">
          <div class="form-field">
            <label>HAWB</label>
            <input id="fhl_hawb" maxlength="12">
          </div>
          <div class="form-field">
            <label>Dep</label>
            <input id="fhl_hdep" maxlength="3" class="center-text" style="width: 56px;">
          </div>
          <div class="form-field">
            <label>Arr</label>
            <input id="fhl_harr" maxlength="3" class="center-text" style="width: 56px;">
          </div>
        </div>
        <div class="double-row">
          <div class="form-field">
            <label>PCS</label>
            <input id="fhl_hpcs" type="number" style="width: 136px;">
          </div>
          <div class="form-field">
            <label>Weight</label>
            <input id="fhl_hweight" type="number" style="width: 136px;">
          </div>
          <div class="form-field" style="flex:1;">
            <label>Nature of Goods</label>
            <input id="fhl_ng" maxlength="15" style="width: 200px;">
          </div>
        </div>
        <!-- HOUSE SHIPPER -->
        <div class="section-box">
          <h4>House Shipper</h4>

          <div class="fhl-row">
            <label>Name</label>
            <input id="fhl_shipperName" style="width: 430px;" maxlength="35">
          </div>

          <div class="fhl-row">
            <label>Address</label>
            <input id="fhl_shipperAddr" style="width: 430px;" maxlength="35">
          </div>

          <div class="fhl-row">
            <label>City</label>
            <input id="fhl_shipperCity" style="width: 300px;" maxlength="17">
          </div>

          <div class="fhl-row">
            <label>Post Code</label>
            <input id="fhl_shipperPost" style="width: 110px;" maxlength="9">
          </div>

          <div class="fhl-row">
            <label>Tel</label>
            <input id="fhl_shipperTel" style="width: 200px;" maxlength="18">
          </div>

          <div class="fhl-row">
            <label>Country</label>
            <input id="fhl_shipperCountry" maxlength="2" class="center-text" style="width: 45px;">
          </div>
        </div>

        <!-- HOUSE CONSIGNEE -->
        <div class="section-box">
          <h4>House Consignee</h4>

          <div class="fhl-row">
            <label>Name</label>
            <input id="fhl_consigneeName" style="width: 430px;" maxlength="35">
          </div>

          <div class="fhl-row">
            <label>Address</label>
            <input id="fhl_consigneeAddr" style="width: 430px;" maxlength="35">
          </div>

          <div class="fhl-row">
            <label>City</label>
            <input id="fhl_consigneeCity" style="width: 300px;" maxlength="17">
          </div>

          <div class="fhl-row">
            <label>Post Code</label>
            <input id="fhl_consigneePost" style="width: 110px;" maxlength="9">
          </div>

          <div class="fhl-row">
            <label>Tel</label>
            <input id="fhl_consigneeTel" style="width: 200px;" maxlength="18">
          </div>

          <div class="fhl-row">
            <label>Country</label>
            <input id="fhl_consigneeCountry" maxlength="2" class="center-text" style="width: 45px;">
          </div>
        </div>

        <!-- SPH -->
        <div class="rtd-row">
          <div class="rtd-field">
            <label>SPH</label>
            <input id="fhl_sph" placeholder="PER" maxlength="3" class="center-text">
          </div>
          <div class="rtd-field">
            <label>Currency</label>
            <input id="fhlcurrency" maxlength="3" class="center-text" style="width: 60px;">
          </div>
        </div>

        <!-- SHP -->
        <div class="rtd-row">
          <div class="rtd-field">
            <label>Country (SHP)</label>
            <input id="fhl_cc1" maxlength="2" class="center-text">
          </div>
          <div class="rtd-field" style="flex:1;">
            <label>Info</label>
            <input id="fhl_info1" maxlength="35">
          </div>
        </div>

        <!-- CNE -->
        <div class="rtd-row">
          <div class="rtd-field">
            <label>Country (CNE)</label>
            <input id="fhl_cc2" maxlength="2" class="center-text">
          </div>
          <div class="rtd-field" style="flex:1;">
            <label>CNE T</label>
            <input id="fhl_info2" maxlength="35">
          </div>
        </div>

        <div class="rtd-row">
          <div class="rtd-field">
            <label style="visibility:hidden;">.</label>
            <input id="fhl_cc2_display1" readonly class="center-text" placeholder="(same)">
          </div>
          <div class="rtd-field" style="flex:1;">
            <label>CNE KC</label>
            <input id="fhl_info3" maxlength="35">
          </div>
        </div>

        <div class="rtd-row">
          <div class="rtd-field">
            <label style="visibility:hidden;">.</label>
            <input id="fhl_cc2_display2" readonly class="center-text" placeholder="(same)">
          </div>
          <div class="rtd-field" style="flex:1;">
            <label>CNE U</label>
            <input id="fhl_info4" maxlength="35">
          </div>
        </div>

        <!-- ACTION -->
        <button onclick="generateFHL_inline()">Generate FHL</button>

        <pre id="fhl_output" style="margin-top:15px;"></pre>

        <div class="form-container">
          <button onclick="copyFHL()">Copy FHL</button>
        </div>

      </div>
    </div>
  `;
}

// ==========================
// AWB Auto Format
// ==========================
const awbInput = getEl("awb");

if (awbInput) {
  awbInput.oninput = e => {
    let raw = e.target.value.replace(/[^0-9]/g, "");

    if (raw.length > 3) {
      raw = raw.slice(0, 3) + "-" + raw.slice(3, 11);
    }

    e.target.value = raw;
  };
}


// ==========================
// Import
// ==========================
import { generateOCI } from "./utils.js";


// ==========================
// Generate FWB
// ==========================
function generateFWB() {

  const pcs     = parseFloat($("pcs")) || 0;
  const weight  = parseFloat($("weight")) || 0;
  const cweight = parseFloat($("cweight")) || 0;

  let msg = `FWB/16\n`;

  // ---------- HEADER ----------
  msg += `${$("awb")}${$("dep")}${$("arr")}/T${pcs}K${weight}\n`;
  msg += `FLT/${$("flight")}/${$("flightDate").substring(0,2)}\n`;
  msg += `RTG/${$("arr")}${$("flight").substring(0,2)}\n`;

  // ---------- SHIPPER ----------
  let shipperLine =
    `SHP\n` +
    `/${$("shipperName")}\n` +
    `/${$("shipperAddr")}\n` +
    `/${$("shipperCity")}\n` +
    `/${$("shipperCountry")}`;

  if ($("shipperPost")) {
    shipperLine += `/${$("shipperPost")}`;
    if ($("shipperTel")) shipperLine += `/TE/${$("shipperTel")}`;
  } else if ($("shipperTel")) {
    shipperLine += `//TE/${$("shipperTel")}`;
  }

  msg += shipperLine + "\n";

  // ---------- CONSIGNEE ----------
  let consigneeLine =
    `CNE\n` +
    `/${$("consigneeName")}\n` +
    `/${$("consigneeAddr")}\n` +
    `/${$("consigneeCity")}\n` +
    `/${$("consigneeCountry")}`;

  if ($("consigneePost")) {
    consigneeLine += `/${$("consigneePost")}`;
    if ($("consigneeTel")) consigneeLine += `/TE/${$("consigneeTel")}`;
  } else if ($("consigneeTel")) {
    consigneeLine += `//TE/${$("consigneeTel")}`;
  }

  msg += consigneeLine + "\n";

  // ---------- CARGO ----------
  msg += `AGT//0000000/0000\n`;
  msg += `/X\n`;
  msg += `/X\n`;
  msg += `CVD/${$("fwbcurrency")}/PP/PP/NVD/NCV/XXX\n`;

  const rate  = parseFloat($("rate")) || 0;
  const total = parseFloat($("total")) || 0;


  msg += `RTD/1/P${pcs}/K${weight}/CQ/W${cweight}/R${rate}/T${total}\n`;

  if ($("ng")) {
    msg += `/NG/${$("ng")}\n`;
  }

  msg += `OTH/P/AWC1\n`;
  msg += `PPD/WT1\n`;
  msg += `COL\n`;
  msg += `/CT1\n`;
  msg += `CER/X\n`;
  msg += `ISU/${$("flightDate")}/${$("dep")}\n`;
  msg += `REF/CGOFHAK\n`;

  // ---------- OCI ----------
  const ociBlock = generateOCI();
  if (ociBlock) {
    msg += ociBlock + "\n";
  }

  getEl("output").innerText = msg;
}

window.generateFWB = generateFWB;


// ==========================
// FHL Sync
// ==========================
function syncFHLFromFWB() {
  const mawb   = $("awb");
  const pcs    = $("pcs");
  const weight = $("weight");

  if (getEl("fhl_mawb"))   getEl("fhl_mawb").value   = mawb;
  if (getEl("fhl_mpcs"))   getEl("fhl_mpcs").value   = pcs;
  if (getEl("fhl_mweight")) getEl("fhl_mweight").value = weight;
}


// ==========================
// Toggle FHL
// ==========================
window.toggleFHL = function () {
  const section = getEl("fhlSection");

  section.style.display =
    section.style.display === "none" ? "block" : "none";

  if (section.style.display === "block") {
    syncFHLFromFWB();
  }
};


// ==========================
// Generate FHL OCI
// ==========================
function generateFHL_OCI() {

  let msg = "";

  if ($("fhl_sph")) {
    msg += `SPH/${$("fhl_sph")}\n`;
  }

  const parts = [];

  if ($("fhl_cc1") && $("fhl_info1")) {
    parts.push(`/${$("fhl_cc1")}/SHP/T/${$("fhl_info1")}`);
  }

  if ($("fhl_cc2") && $("fhl_info2")) {
    parts.push(`/${$("fhl_cc2")}/CNE/T/${$("fhl_info2")}`);
  }

  if ($("fhl_cc2") && $("fhl_info3")) {
    parts.push(`/${$("fhl_cc2")}/CNE/KC/${$("fhl_info3")}`);
  }

  if ($("fhl_cc2") && $("fhl_info4")) {
    parts.push(`/${$("fhl_cc2")}/CNE/U/${$("fhl_info4")}`);
  }

  if (parts.length > 0) {
    msg += "OCI" + parts.join("\n") + "\n";
  }

  return msg;
}


// ==========================
// Generate FHL
// ==========================
window.generateFHL_inline = function () {

  let msg = "FHL/4\n";

  const mpcs = parseFloat($("fhl_mpcs")) || 0;
  const mweight = parseFloat($("fhl_mweight")) || 0;
  const hpcs = parseFloat($("fhl_hpcs")) || 0;
  const hweight = parseFloat($("fhl_hweight")) || 0;

  // ---------- HEADER ----------
  msg += `MBI/${$("fhl_mawb")}${$("dep")}${$("arr")}/T${mpcs}K${mweight}\n`;

  msg += `HBS/${$("fhl_hawb")}/${$("fhl_hdep")}${$("fhl_harr")}/${hpcs}/K${hweight}/${hpcs}/${$("fhl_ng")}\n`;

  const oci = generateFHL_OCI();
  if (oci) msg += oci;

  msg += `TXT/${$("fhl_ng")}\n`;

// ---------- SHIPPER ----------
let shipper =
  `SHP/${$("fhl_shipperName")}\n` +
  `/${$("fhl_shipperAddr")}\n` +
  `/${$("fhl_shipperCity")}\n` +
  `/${$("fhl_shipperCountry")}`;

if ($("fhl_shipperPost")) {
  shipper += `/${$("fhl_shipperPost")}`;
  if ($("fhl_shipperTel")) shipper += `/TE/${$("fhl_shipperTel")}`;
} else if ($("fhl_shipperTel")) {
  shipper += `//TE/${$("fhl_shipperTel")}`;
}

msg += shipper + "\n";


// ---------- CONSIGNEE ----------
let consignee =
  `CNE/${$("fhl_consigneeName")}\n` +
  `/${$("fhl_consigneeAddr")}\n` +
  `/${$("fhl_consigneeCity")}\n` +
  `/${$("fhl_consigneeCountry")}`;

if ($("fhl_consigneePost")) {
  consignee += `/${$("fhl_consigneePost")}`;
  if ($("fhl_consigneeTel")) consignee += `/TE/${$("fhl_consigneeTel")}`;
} else if ($("fhl_consigneeTel")) {
  consignee += `//TE/${$("fhl_consigneeTel")}`;
}

msg += consignee + "\n";

  // ---------- CVD ----------
  msg += `CVD/${$("fhlcurrency")}/PP/NVD/0.000/0.00\n`;

  getEl("fhl_output").innerText = msg;
};


// ==========================
// Copy FHL
// ==========================
window.copyFHL = function () {
  const text = getEl("fhl_output")?.innerText;

  if (!text) {
    showToast("ยังไม่ได้ Generate FHL", false);
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => showToast("Copy FHL แล้ว ✅", true))
    .catch(err => showToast("Copy ไม่สำเร็จ: " + err, false));
};


// ==========================
// Calculate Total
// ==========================
function calculateTotal() {
  const rate    = parseFloat(getEl("rate")?.value) || 0;
  const cweight = parseFloat(getEl("cweight")?.value) || 0;

  const total = rate * cweight;

  if (getEl("total")) {
    getEl("total").value = total.toFixed(2);
  }
}


// ==========================
// Sync Country Mirror
// ==========================
function syncFHL_Country() {
  const cc2 = getEl("fhl_cc2")?.value || "";

  if (getEl("fhl_cc2_display1")) getEl("fhl_cc2_display1").value = cc2;
  if (getEl("fhl_cc2_display2")) getEl("fhl_cc2_display2").value = cc2;
}


// ==========================
// Events
// ==========================
document.addEventListener("input", (e) => {

  // sync FWB → FHL
  if (["awb", "pcs", "weight"].includes(e.target.id)) {
    syncFHLFromFWB();
  }

  // total calc
  if (["rate", "cweight"].includes(e.target.id)) {
    calculateTotal();
  }

  // country mirror
  if (e.target.id === "fhl_cc2") {
    syncFHL_Country();
  }
});
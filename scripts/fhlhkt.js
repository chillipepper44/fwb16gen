// ==========================
// Insert MAWB Form
// ==========================
const mawb = document.getElementById("mawbContainer");
if (mawb) {
  mawb.innerHTML = `
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
}

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
// Insert HAWB Form
// ==========================
const hawb = document.getElementById("hawbContainer");
if (hawb) {
  hawb.innerHTML = `
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
          <input id="hng" placeholder="LIVE TROPICAL FISH" />
        </div>
      </div>

      <div style="display: flex; gap: 40px; align-items: center; margin-top: 10px;">
        <div class="form-field">
          <label>Currency</label>
          <input id="currency" maxlength="3" style="width: 56px;" placeholder="THB" class="center-text" value="THB" />
        </div>
        <div class="form-field">
          <label>Prepaid / Collect</label>
          <div class="radio-group" style="display: flex; gap: 20px;">
            <label><input type="radio" name="paytype" value="PP" checked /> Prepaid</label>
            <label><input type="radio" name="paytype" value="CC" /> Collect</label>
          </div>
        </div>
      </div>
    </div>
  `;
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

// ==========================
// Generate HKT FHL Function
// ==========================
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

// ==========================
// Format MAWB Input
// ==========================
const mawbInput = document.getElementById("mawb");
if (mawbInput) {
  mawbInput.oninput = function (e) {
    let raw = e.target.value.replace(/[^0-9]/g, "");
    if (raw.length > 3) {
      raw = raw.slice(0, 3) + "-" + raw.slice(3, 11);
    }
    e.target.value = raw;
  };
}

// ==========================
// Clear Shipper & Consignee Fields
// ==========================
const clearBtn = document.getElementById("clearBtn");
if (clearBtn) {
  clearBtn.onclick = clearHouseFields;
}

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

// ==========================
// Export Function to Window
// ==========================
window.generateHKTFHL = generateHKTFHL;

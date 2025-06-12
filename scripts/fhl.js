// ==========================
// Insert Shipper Form
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
// Insert Consignee Form
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
        </div>
      </div>
    </div>
  `;
}

// ==========================
// Format MAWB Number
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
// Clear Button Logic
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
// Generate FHL Function
// ==========================
function generateFHL() {
  const $ = id => document.getElementById(id).value.trim().toUpperCase();

  const mpcs = parseFloat($("mpcs")) || 0;
  const mweight = parseFloat($("mweight")) || 0;
  const hpcs = parseFloat($("hpcs")) || 0;
  const hweight = parseFloat($("hweight")) || 0;
  const payType = document.querySelector('input[name="paytype"]:checked')?.value || "PP";

  let msg = 'FHL/4\n';
  msg += `MBI/${$("mawb")}${$("mdep")}${$("marr")}/T${mpcs}K${mweight}\n`;
  msg += `HBS/${$("hawb")}/${$("hdep")}${$("harr")}/${hpcs}/K${hweight}/${hpcs}/${$("hng")}\n`;
  msg += `TXT/${$("hng")}\n`;

  const shipperLine = `SHP/${$("shipperName")}\n/${$("shipperAddr")}\n/${$("shipperCity")}\n/${$("shipperCountry")}`;
  let shipperFull = shipperLine;

  const post = $("shipperPost");
  const tel = $("shipperTel");
  
  if (shipperPost) {shipperFull += `/${post}`;
  if (tel) {shipperFull += `/TE/${tel}`;
  }
  } else if (tel) {
  shipperFull += `//TE/${tel}`;
  }
  shipperFull += `\n`;

  const consigneeLine = `CNE/${$("consigneeName")}\n/${$("consigneeAddr")}\n/${$("consigneeCity")}\n/${$("consigneeCountry")}`;
  let consigneeFull = consigneeLine;

  const post = $("consigneePost");
  const tel = $("consigneeTel");

  if (post && tel) {
  consigneeFull += `/${post}/TE/${tel}`;
  } else if (post && !tel) {
  consigneeFull += `/${post}`;
  } else if (!post && tel) {
  consigneeFull += `//TE/${tel}`;
  }

  consigneeFull += `\n`;

  msg += shipperFull;
  msg += consigneeFull;
  msg += `CVD/${$("currency")}/PP/NVD/0.000/0.00\n`;

  document.getElementById("output").innerText = msg;
}

// ==========================
// Export Functions to Window
// ==========================
window.generateFHL = generateFHL;
window.clearHouseFields = clearHouseFields;

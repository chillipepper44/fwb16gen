document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("shipperContainer").innerHTML = `
    <div class="section-box">
    <h3>Shipper Information</h3>
    <label>Shipper Name</label><input id="shipperName" maxlength="35" style="width: 520px;" placeholder="ACME CO LTD" />
    <label>Shipper Address</label><input id="shipperAddr" maxlength="35" style="width: 520px;" placeholder="152 Silom Rd" />
    <label>Shipper City</label><input id="shipperCity" maxlength="19" style="width: 300px;" placeholder="Bangkok" />
    <label>Shipper Post Code</label><input id="shipperPost" maxlength="9" style="width: 110px;" placeholder="10500" />
    <label>Shipper Phone No</label><input id="shipperTel" maxlength="18" style="width: 200px;" placeholder="0812345678" />
    <label>Shipper Country</label>
    <input id="shipperCountry" maxlength="2" placeholder="TH" style="width: 45px;" />
    </div>
  `;
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("consigneeContainer").innerHTML = `
    <div class="section-box">
    <h3>Consignee Information</h3>
    <label>Consignee Name</label><input id="consigneeName" maxlength="35" style="width: 520px;" placeholder="BETA CO LTD" />
    <label>Consignee Address</label><input id="consigneeAddr" maxlength="35" style="width: 520px;" placeholder="88 Jalan Ampang" />
    <label>Consignee City</label><input id="consigneeCity" maxlength="19" style="width: 300px;" placeholder="SINGAPORE" />
    <label>Consignee Post Code</label><input id="consigneePost" maxlength="9" style="width: 110px;" placeholder="50450" />
    <label>Consignee Phone No</label><input id="consigneeTel" maxlength="18" style="width: 200px;" placeholder="0123456789" />
    <label>Consignee Country</label>
    <input id="consigneeCountry" maxlength="2" placeholder="SG" style="width: 45px;" />
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

  msg += `CVD/THB/PX/PP/NVD/NCV/XXX\n`;
  msg += `RTD/1/P1/K${weight}/CQ/W${cweight}/R1/T1\n`;
  msg += `OTH/P/AWC1\n`;
  msg += `PPD/WT1/TX1/CT1\n`;
  msg += `ISU/${$("flightDate")}/${$("dep")}\n`;

  document.getElementById("output").innerText = msg;
}

function copyFWB() {
  const output = document.getElementById("output").innerText;
  if (!output) {
    alert("กรุณาสร้างข้อความก่อนคัดลอกนะครับ");
    return;
  }
  navigator.clipboard.writeText(output).then(() => {
    alert("Copied to clipboard!");
  }).catch(err => {
    alert("ไม่สามารถคัดลอกได้: " + err);
  });
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

  // Shipper block
  const shipperLine = `SHP/${$("shipperName")}\n/${$("shipperAddr")}\n/${$("shipperCity")}\n/${$("shipperCountry")}`;
  const shipperPost = $("shipperPost");
  const shipperTel = $("shipperTel");
  let shipperFull = shipperLine;
  if (shipperPost) shipperFull += `/${shipperPost}`;
  if (shipperTel) shipperFull += `/TE/${shipperTel}`;
  shipperFull += `\n`;

  // Consignee block
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

function copyFHL() {
  const output = document.getElementById("output").innerText;
  if (!output) {
    alert("กรุณาสร้างข้อความก่อนคัดลอกนะครับ");
    return;
  }
  navigator.clipboard.writeText(output).then(() => {
    alert("Copied to clipboard!");
  }).catch(err => {
    alert("ไม่สามารถคัดลอกได้: " + err);
  });
}

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

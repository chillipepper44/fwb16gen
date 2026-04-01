// ==========================
// Copy to Clipboard Function
// ==========================
function copy() {
  const output = document.getElementById("output")?.innerText;
  if (!output) {
    showToast("กรุณา Gen ก่อนคัดลอก", false);
    return;
  }
  navigator.clipboard.writeText(output)
    .then(() => {
      showToast("Copy เรียบร้อยแล้ว ✅", true);
    })
    .catch(err => {
      showToast("ไม่สามารถคัดลอกได้: " + err, false);
    });
}

window.copy = copy;

// ==========================
// Toast Notification Function
// ==========================
function showToast(message, success = true) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.top = "50%";
  toast.style.left = "50%";
  toast.style.transform = "translate(-50%, -50%)";
  toast.style.background = success ? "#4caf50" : "#f44336"; // Green / Red
  toast.style.color = "#fff";
  toast.style.padding = "12px 24px";
  toast.style.borderRadius = "10px";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  toast.style.zIndex = 9999;
  toast.style.opacity = "0";
  toast.style.fontSize = "1rem";
  toast.style.transition = "opacity 0.3s ease";

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2000);
}

// ==========================
// CreateMail Function
// ==========================
window.createMailFWB = function () {
  const outputEl = document.getElementById("output");

  if (!outputEl || outputEl.innerText.trim() === "") {
    showToast("ไม่มี Message", false);
    return;
  }

  const body = outputEl.innerText;

  const to = "dmkfc@asiagroundservice.com;dmkfci@asiagroundservice.com";

const mailtoLink =
  `mailto:${to}` +
  `?body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
}

// ==========================
// generateOCI Function
// ==========================
export function generateOCI() {
  const sph = document.getElementById("sph")?.value.trim();

  const cc1 = document.getElementById("cc1")?.value.trim();
  const info1 = document.getElementById("info1")?.value.trim();

  const cc2 = document.getElementById("cc2")?.value.trim();
  const info2 = document.getElementById("info2")?.value.trim();
  const info3 = document.getElementById("info3")?.value.trim();
  const info4 = document.getElementById("info4")?.value.trim();

  let lines = [];

  // SPH
  if (sph) {
    lines.push(`SPH/${sph}`);
  }

  let ociLines = [];

  if (cc1 && info1) {
    ociLines.push(`/${cc1}/SHP/T/${info1}`);
  }

  if (cc2 && info2) {
    ociLines.push(`/${cc2}/CNE/T/${info2}`);
  }

  if (cc2 && info3) {
    ociLines.push(`/${cc2}/CNE/KC/${info3}`);
  }

  if (cc2 && info4) {
    ociLines.push(`/${cc2}/CNE/U/${info4}`);
  }

  if (ociLines.length > 0) {
    lines.push("OCI" + ociLines.join("\n"));
  }

  return lines.join("\n");
}

// ==========================
// toggleOCI Function
// ==========================
window.toggleOCI = function () {
  const section = document.getElementById("ociSection");
  section.style.display = section.style.display === "none" ? "block" : "none";
}

document.addEventListener("input", (e) => {
  if (e.target.closest("#ociSection input")) {
    e.target.value = e.target.value.toUpperCase();
  }
})

document.addEventListener("input", (e) => {
  if (e.target.id === "cc2") {
    const value = e.target.value.toUpperCase();

    const mirrors = [
      document.getElementById("cc2_display1"),
      document.getElementById("cc2_display2")
    ];

    mirrors.forEach(el => {
      if (el) el.value = value;
    });
  }
});


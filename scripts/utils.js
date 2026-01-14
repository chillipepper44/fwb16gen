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
};


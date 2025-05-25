// ==========================
// Copy to Clipboard Function
// ==========================
function copy() {
  const output = document.getElementById("output")?.innerText;
  if (!output) {
    alert("กรุณา Gen ก่อนคัดลอกนะครับ");
    return;
  }
  navigator.clipboard.writeText(output)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch(err => {
      alert("ไม่สามารถคัดลอกได้: " + err);
    });
}

window.copy = copy;

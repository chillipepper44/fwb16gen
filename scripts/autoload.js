// ==========================
// Autoload per Page
// ==========================
const page = location.pathname.split("/").pop();

// Always load utilities (copy, toast, etc.)
import('./utils.js');

// Load specific logic for each page
if (page === "fwb.html") import('./fwb.js');
else if (page === "fhl.html") import('./fhl.js');
else if (page === "fwbhkt.html") import('./fwbhkt.js');
else if (page === "fhlhkt.html") import('./fhlhkt.js');

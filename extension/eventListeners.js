console.log("✅ Custom FEN tracker script loaded");

window.addEventListener("fenChanged", (e) => {
  console.log("♟️ Nuovo ply:", e.detail.ply);

  if (typeof updateFEN === 'function') {
    updateFEN();
  }
});
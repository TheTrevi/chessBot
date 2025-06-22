

const ws = new WebSocket("ws://localhost:8765");

ws.onopen = function() {
    console.log('Selenium bridge connected');
};

ws.addEventListener("open", () => {
  console.log("📡 WebSocket connesso");

  window.addEventListener("fenChanged", (e) => {
    const fen = e.detail.fen;
    if (ws.readyState === WebSocket.OPEN) {
      console.log("➡️ Inviando FEN:", e);
      ws.send(JSON.stringify({
          type: 'fenChanged',
          fen: e.detail.fen,
          isMyTurn: e.detail.isMyTurn,
          lastMove: e.detail.lastMove,
          timestamp: Date.now()
      }));
    } else {  
      console.log("Websocket non è ready!!!!")
    }
  });
});


(function () {
    console.log("🔁 Inject script running...");

    if (document.getElementById("lichess-fen-injected")) return;

    const marker = document.createElement("div");
    marker.id = "lichess-fen-injected";
    marker.style.display = "none";
    document.documentElement.appendChild(marker);

    const injectFile = (filename) => {
        const script = document.createElement("script");
        script.src = chrome.runtime.getURL(filename);
        script.onload = () => script.remove();
        (document.head || document.documentElement).appendChild(script);
    };

    injectFile("library.js");
    injectFile("eventListeners.js");
    console.log("☑️Inject compltete")
})();

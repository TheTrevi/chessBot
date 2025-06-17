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

    injectFile("eventListeners.js");
    injectFile("library.js");
    console.log("☑️Inject compltete")
})();

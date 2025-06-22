console.log("✅ Custom FEN tracker script loaded");
window.addEventListener("plyChanged", (e) => {
  console.log("♟️ Nuovo ply:", e.detail.ply);

  if (typeof updateFEN === 'function') {

    if (game.data.game.id == currentGame.id) {
      //updateFEN();
      waitToLoad(e.detail.ply, updateFEN)
    }
    else {
      waitToLoad(e.detail.ply, loadGame);
      currentGame.id = game.data.game.id
    }

  }
});

function waitToLoad(ply, func) {
  const updateInterval = setInterval(() => {
    lastply = game.data.steps.at(-1).ply  
    if (lastply == ply) {
      clearInterval(updateInterval);
      func()
    }    
  }, 50)
}

function loadGame() {
  window.currentGame.game = Chess();
  okFen = "";
  game.data.steps.forEach(element => {
    if (element.fen.includes(" ")) {
      okFen = element.fen
      currentGame.fen = okFen
    } else {
      if (okFen) {currentGame.game.load(okFen);console.log("setting fen: " + okFen);  okFen = ""; }
      safeMove(element.san)
    }
  });

  window.dispatchEvent(new CustomEvent("fenChanged", {
      detail: { fen: currentGame.game.fen(), isMyTurn: true, lastMove: game.chessground.state.lastMove.join("")  }
  }));
  
}

function updateFEN() {
  move = game.data.steps.at(-1).san
  safeMove(move)
  window.dispatchEvent(new CustomEvent("fenChanged", {
      detail: { fen: currentGame.game.fen(), isMyTurn: true, lastMove: game.chessground.state.lastMove.join("")  }
  }));
}



function safeMove(moveStr) {

  try {
    const move = currentGame.game.move(moveStr, { sloppy: true }); // sloppy = allow fuzzy SAN
    if (!move) {
      console.warn("Invalid move:", moveStr);
      console.log(currentGame.game.fen())
      return
    }
    console.log("played: ", move)
    currentGame.fen = currentGame.game.fen()
  } catch (e) {
    console.error("Error processing move:", moveStr, e);
    return null;
  }

}

window.currentGame = {game: "", id: "", fen: ""}

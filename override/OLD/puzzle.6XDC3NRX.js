import {a as at, b as lt, c as dt, d as ut, e as ht, g as pt, h as mt, j as R, k as E, l as j, m as J} from "./lib.44JAT3R4.js";
import {a as nt, c as rt} from "./lib.M4V5U66M.js";
import "./lib.K4SQT4HR.js";
import {a as it, b as st} from "./lib.V465VJZN.js";
import {a as ie} from "./lib.HTTCUGMA.js";
import {a as et, b as tt} from "./lib.IJUDT7HG.js";
import {a as ot} from "./lib.3B7VEY4Z.js";
import {b as Qe} from "./lib.XQXNLCLN.js";
import {a as Re, c as h, d as Ee, f as S, g as Ve} from "./lib.VDRNGPFS.js";
import "./lib.YY2M7B4J.js";
import {b as Ze} from "./lib.EG62OE4Y.js";
import {a as Xe} from "./lib.P2KHB2MX.js";
import {b as Ke, e as D, f as je, g as K} from "./lib.UDVWPZ3Q.js";
import "./lib.A3N3EN2B.js";
import "./lib.QVL5WYDK.js";
import {b as We, c as W, g as te} from "./lib.67NW2GN4.js";
import "./lib.7N7EZUST.js";
import {n as U, o as ke} from "./lib.2QUFEFFQ.js";
import {h as we} from "./lib.VGUHCROA.js";
import "./lib.JJMOHYB3.js";
import {B, G as ze, K as N, M as G, P as ye, Q as ge, R as be, g as ce, h as b, m as X, n as v, o as z, p as O, t as M, v as H, z as ve} from "./lib.ZHYX4GJ4.js";
import "./lib.EUNDXK5Q.js";
import "./lib.JPYWEH7Z.js";
import {a as F, e as Z, g as xe, h as De, j as q} from "./lib.HPSH4ANO.js";
import {a as Ye} from "./lib.RXKCJLII.js";
import {d as oe, e as Je} from "./lib.BICGBJDI.js";
import {a as Fe, b as qe} from "./lib.JAHQ3XBJ.js";
import {b as Ie} from "./lib.PFYR5E37.js";
import {a as Ae, b as g, c as $e, e as Q, g as r} from "./lib.WFXQGRIB.js";
import "./lib.YUYJMT4V.js";
import {a as Pe, b as d, d as Me, e as Ce} from "./lib.JDGIJSRT.js";
import {A as Le, C as ee, H as _e, P as Oe, Q as He, R as Be, S as Ge, ta as Ue} from "./lib.M4AIDKQM.js";
import {a as k} from "./lib.VLCMJXS7.js";
import {f as x, h as Ne, k as C} from "./lib.RKXQ2UXZ.js";
import {a as w, e as I, f as Se, h as y, n as Te} from "./lib.UMJYW5NQ.js";
import "./lib.XNXLGS2X.js";
var ft = (t, e, o, i, s, n, a) => x(`/training/complete/${e}/${t}`, {
    method: "POST",
    body: C({
        win: o,
        ...s ? {
            replayDays: s.days
        } : {},
        ...n ? {
            streakId: n.nextId(),
            streakScore: n.data.index
        } : {},
        rated: i,
        color: a
    })
})
  , ct = (t, e) => x(`/training/${t}/vote`, {
    method: "POST",
    body: C({
        vote: e
    })
})
  , se = (t, e, o) => x(`/training/${t}/vote/${e}`, {
    method: "POST",
    body: w(o) ? C({
        vote: o
    }) : void 0
})
  , Lt = 2e3
  , vt = (t, e) => x(`/training/${t}/report`, {
    method: "POST",
    body: C({
        reason: e.slice(0, Lt)
    })
})
  , zt = We( () => 1e3, t => Ne("/pref/zen", {
    method: "post",
    body: C({
        zen: t ? 1 : 0
    })
}));
function P(t, e, o, i) {
    let s = z(e)
      , n = v(s.to);
    return [{
        orig: v(s.from),
        dest: n,
        brush: o,
        modifiers: i
    }, ...s.promotion ? [{
        orig: n,
        piece: {
            color: t,
            role: s.promotion,
            scale: .8
        },
        brush: "green"
    }] : []]
}
function yt(t) {
    var l, p, m;
    let e = t.node
      , o = t.ceval.hovering()
      , i = e.fen.includes(" w ") ? "white" : "black"
      , s = [];
    if (o && o.fen === e.fen && (s = s.concat(P(i, o.uci, "paleBlue"))),
    t.showComputer() && t.ceval.storedPv() > 0 && (e.eval && (s = s.concat(P(i, e.eval.best, "paleGreen"))),
    !o)) {
        let u = t.nextNodeBest();
        !u && t.ceval.enabled() && e.ceval && (u = e.ceval.pvs[0].moves[0]),
        u && (s = s.concat(P(i, u, "paleBlue"))),
        t.ceval.enabled() && ((p = (l = e.ceval) == null ? void 0 : l.pvs) != null && p[1]) && !(t.threatMode() && ((m = e.threat) != null && m.pvs[2])) && e.ceval.pvs.forEach(f => {
            if (f.moves[0] === u)
                return;
            let c = D.povDiff(i, e.ceval.pvs[0], f);
            c > .2 || isNaN(c) || c < 0 || (s = s.concat(P(i, f.moves[0], "paleGrey", {
                lineWidth: Math.round(12 - c * 50)
            })))
        }
        )
    }
    t.ceval.enabled() && t.threatMode() && e.threat && (e.threat.pvs[1] ? (s = s.concat(P(b(i), e.threat.pvs[0].moves[0], "paleRed")),
    e.threat.pvs.slice(1).forEach(u => {
        let f = D.povDiff(b(i), u, e.threat.pvs[0]);
        f > .2 || isNaN(f) || f < 0 || (s = s.concat(P(b(i), u.moves[0], "paleRed", {
            lineWidth: Math.round(11 - f * 45)
        })))
    }
    )) : s = s.concat(P(b(i), e.threat.pvs[0].moves[0], "red")));
    let n = Ot(e)
      , a = t.hint !== void 0 ? {
        orig: v(t.hint),
        brush: "green"
    } : void 0;
    return [...s, ...ie(e), ...n ? ie(n) : [], ...a ? [a] : []]
}
function Ot(t) {
    let e;
    switch (t.puzzle) {
    case "good":
    case "win":
        e = {
            id: 7,
            name: "good",
            symbol: "\u2713"
        };
        break;
    case "fail":
        e = {
            id: 4,
            name: "fail",
            symbol: "\u2717"
        }
    }
    return e && {
        ...t,
        glyphs: [e]
    }
}
var gt = t => site.mousetrap.bind(["left", "k"], () => {
    E(t),
    t.redraw()
}
).bind(["right", "j"], () => {
    R(t),
    t.redraw()
}
).bind(["up", "0", "home"], () => {
    J(t),
    t.redraw()
}
).bind(["down", "$", "end"], () => {
    j(t),
    t.redraw()
}
).bind("l", t.toggleCeval).bind("x", t.toggleThreatMode).bind("space", () => {
    t.mode === "view" && (t.ceval.enabled() ? t.playBestMove() : t.toggleCeval())
}
).bind("z", () => k.emit("zen")).bind("?", () => t.keyboardHelp(!t.keyboardHelp())).bind("f", t.flip).bind("n", t.nextPuzzle)
  , bt = t => qe({
    class: "help",
    htmlUrl: "/training/help",
    onClose: () => t.keyboardHelp(!1),
    modal: !0
});
var wt = {
    e1a1: "e1c1",
    e1h1: "e1g1",
    e8a8: "e8c8",
    e8h8: "e8g8"
};
function Bt(t) {
    return t in wt
}
function ne(t) {
    if (t.mode === "view" || !h.contains(t.path, t.initialPath) || (t.node.ply % 2 === 1 ? "white" : "black") !== t.pov)
        return;
    let o = t.nodeList.slice(h.size(t.initialPath) + 1).map(s => ({
        uci: s.uci,
        castle: s.san.startsWith("O-O"),
        checkmate: s.san.endsWith("#")
    }));
    for (let s in o) {
        if (o[s].checkmate)
            return t.node.puzzle = "win";
        let n = o[s].uci
          , a = t.data.puzzle.solution[s];
        if (n !== a && (!o[s].castle || !Bt(n) || wt[n] !== a))
            return t.node.puzzle = "fail"
    }
    let i = t.data.puzzle.solution[o.length];
    return i ? (t.node.puzzle = "good",
    {
        move: z(i),
        fen: t.node.fen,
        path: t.path
    }) : t.node.puzzle = "win"
}
var V = class {
    constructor(e, o, i) {
        this.theme = e;
        this.userId = o;
        this.streak = i;
        this.maxSize = 100;
        this.maxAge = 1e3 * 3600;
        this.default = () => ({
            theme: this.theme,
            rounds: [],
            at: Date.now()
        });
        this.store = this.streak ? I(this.default()) : q(`puzzle.session.${this.userId || "anon"}`, this.default);
        this.clear = () => this.update(e => ({
            ...e,
            rounds: []
        }));
        this.get = () => {
            let e = this.store();
            return e.theme == this.theme && e.at > Date.now() - this.maxAge ? e : this.default()
        }
        ;
        this.update = e => this.store(e(this.get()));
        this.complete = (e, o) => this.update(i => {
            let s = i.rounds.findIndex(n => n.id === e);
            return s === -1 ? (i.rounds.push({
                id: e,
                result: o
            }),
            i.rounds.length > this.maxSize && i.rounds.shift()) : i.rounds[s].result = o,
            i.at = Date.now(),
            i
        }
        );
        this.setRatingDiff = (e, o) => this.update(i => (i.rounds.forEach(s => {
            s.id === e && (s.ratingDiff = o)
        }
        ),
        i));
        this.isNew = () => this.store().rounds.length < 2
    }
}
;
var A = class {
    constructor(e) {
        this.fail = !1;
        this.onComplete = (e, o) => {
            e ? this.nextId() ? (this.data.index++,
            o && (this.data.current = {
                puzzle: o.puzzle,
                game: o.game
            }),
            this.store(this.data)) : (this.store(null),
            site.reload()) : (this.fail = !0,
            this.store(null))
        }
        ;
        this.nextId = () => this.data.ids[this.data.index + 1];
        this.skip = () => {
            this.data.skip = !1,
            this.store(this.data)
        }
        ;
        var o;
        this.store = q(`puzzle.streak.${((o = e.user) == null ? void 0 : o.id) || "anon"}`, () => null),
        this.data = this.store() || {
            ids: e.streak.split(" "),
            index: 0,
            skip: !0,
            current: {
                puzzle: e.puzzle,
                game: e.game
            }
        }
    }
}
;
function kt(t) {
    let e = M.default()
      , o = {
        ply: 0,
        id: "",
        fen: ze,
        children: []
    }
      , i = o;
    return t.forEach( (s, n) => {
        let a = be(e, s);
        e.play(a);
        let l = Mt(e, a, n + 1, s);
        i.children.push(l),
        i = l
    }
    ),
    o
}
function Pt(t, e, o, i) {
    let s = t.nodeAtPath(e)
      , n = M.fromSetup(N(s.fen).unwrap()).unwrap()
      , a = s.ply
      , l = o.map( (p, m) => {
        let u = H(n, z(p))
          , f = ge(n, u);
        n.play(u);
        let c = Mt(n, u, a + m + 1, f);
        return i === "white" == (c.ply % 2 === 1) && (c.puzzle = "good"),
        c
    }
    );
    t.addNodes(l, e)
}
var Mt = (t, e, o, i) => ({
    ply: o,
    san: i,
    fen: G(t.toSetup()),
    id: B(e),
    uci: O(e),
    check: t.isCheck() ? v(t.toSetup().board.kingOf(t.turn)) : void 0,
    children: []
});
function Ct(t) {
    if (t.mode === "view" || !h.contains(t.path, t.initialPath) || (t.node.ply % 2 === 1 ? "white" : "black") === t.pov)
        return;
    let o = t.nodeList.slice(h.size(t.initialPath) + 1)
      , i = t.data.puzzle.solution[o.length]
      , s = i && z(i);
    return s && ce(s) ? s : void 0
}
var Gt = 10
  , T = class {
    constructor() {
        this.reported = !1;
        this.evalsWithMultipleSolutions = 0;
        this.reportDialog = (e, o) => {
            let s = '<div style="display:flex; flex-flow: row nowrap; align-items: center; justify-content: center"><div class="switch switch-report-puzzle" title="temporarily disable reporting puzzles"><input id="puzzle-toggle-report" class="cmn-toggle cmn-toggle--subtle" type="checkbox"><label for="puzzle-toggle-report"></label></div><span style="padding-left: 1em"> Hide this for a week</span></div>'
              , n = () => document.querySelector(".switch-report-puzzle input");
            Fe({
                focus: ".apply",
                modal: !0,
                htmlText: '<div><strong style="font-size:1.5em">Report multiple solutions</strong><br /><br /><p>You have found a puzzle with multiple solutions, report it?</p><br />' + s + `<br /><br /><button type="reset" class="button button-empty button-red text reset" data-icon="${_e}">No</button><button type="submit" class="button button-green text apply" data-icon="${Le}">Yes</button>`
            }).then(a => {
                $(".switch-report-puzzle", a.view).on("click", () => {
                    let l = n();
                    l.checked = !l.checked
                }
                ),
                $(".reset", a.view).on("click", () => {
                    n().checked && this.tsHideReportDialog(Date.now()),
                    a.close()
                }
                ),
                $(".apply", a.view).on("click", () => {
                    vt(e, o),
                    a.close()
                }
                ),
                a.show()
            }
            )
        }
        ;
        this.tsHideReportDialog = De("puzzle.report.hide.ts", 0)
    }
    checkForMultipleSolutions(e, o, i) {
        var a, l;
        if (!o.session.userId || this.reported || o.mode !== "view" || o.threatMode() || i || o.data.puzzle.themes.some(p => p.toLowerCase().includes("mate")) || ke(e.fen) <= 7 || !((l = (a = o.ceval.engines.active) == null ? void 0 : a.requires) != null && l.includes("dynamicImportFromWorker")) || this.tsHideReportDialog() > Date.now() - 1e3 * 3600 * 24 * 7)
            return;
        let s = o.node
          , n = s.fen.includes(" w ") ? "white" : "black";
        if (Ut(s) && n === o.pov && o.mainline.some(p => p.id === s.id)) {
            let[p,m] = [e.pvs[0], e.pvs[1]];
            if ((e.depth > 50 || e.nodes > 25e6) && p && m && D.hasMultipleSolutions(o.pov, p, m) ? this.evalsWithMultipleSolutions += 1 : this.evalsWithMultipleSolutions = 0,
            this.evalsWithMultipleSolutions == 2) {
                this.reported = !0;
                let u = o.ceval.engines.active
                  , f = (u == null ? void 0 : u.short) || u.name
                  , c = `(v${Gt}, ${f}) after move ${U(s.ply)}. ${s.san}, at depth ${e.depth}, multiple solutions:

${e.pvs.map(fe => `${It(fe)}: ${fe.moves.join(" ")}`).join(`

`)}`;
                this.reportDialog(o.data.puzzle.id, c)
            }
        }
    }
}
  , Ut = t => {
    let e = t.children[0];
    return e && (e.puzzle === "good" || e.puzzle === "win")
}
  , It = t => t.mate ? `#${t.mate}` : `${t.cp}`;
var L = class {
    constructor(e, o, i) {
        this.opts = e;
        window.puzzle = this;
        this.redraw = o;
        this.nvui = i;
        this.next = te();
        this.ground = I(void 0);
        this.threatMode = y(!1);
        this.streakFailStorage = F.make("puzzle.streak.fail");
        this.flipped = y(!1);
        this.canViewSolution = y(!1);
        this.showHint = y(!1);
        this.hintHasBeenShown = y(!1);
        this.loadSound = (e, o) => (site.sound.load(e, site.sound.url(`${e}.mp3`)),
        () => site.sound.play(e, o));
        this.sound = {
            good: this.loadSound("lisp/PuzzleStormGood", .7),
            end: this.loadSound("lisp/PuzzleStormEnd", 1)
        };
        this.setPath = e => {
            this.path = e,
            this.nodeList = this.tree.getNodeList(e),
            this.node = S.last(this.nodeList),
            this.mainline = S.mainlineNodeList(this.tree.root),
            this.showHint(!1)
        }
        ;
        this.setChessground = e => {
            this.ground(e);
            let o = () => ({
                data: {
                    game: {
                        variant: {
                            key: "standard"
                        }
                    },
                    player: {
                        color: this.pov
                    }
                },
                pluginMove: this.pluginMove,
                redraw: this.redraw,
                flipNow: this.flip,
                userJumpPlyDelta: this.userJumpPlyDelta,
                nextPuzzle: this.nextPuzzle,
                vote: this.vote,
                solve: this.viewSolution,
                blindfold: this.blindfold
            })
              , i = {
                fen: this.node.fen,
                canMove: !0,
                cg: e
            };
            this.opts.pref.voiceMove && (this.voiceMove ? this.voiceMove.update(i) : this.voiceMove = rt(o(), i)),
            this.opts.pref.keyboardMove && (this.keyboardMove || (this.keyboardMove = tt(o())),
            this.keyboardMove.update(i)),
            requestAnimationFrame( () => this.redraw()),
            k.on("board.change", s => {
                this.withGround(n => {
                    n.state.addPieceZIndex = s,
                    n.redrawAll()
                }
                )
            }
            )
        }
        ;
        this.pref = this.opts.pref;
        this.withGround = e => {
            let o = this.ground();
            return o ? e(o) : void 0
        }
        ;
        this.initiate = e => {
            this.data = e,
            this.tree = Ve(kt(this.data.game.pgn.split(" ")));
            let o = h.fromNodeList(S.mainlineNodeList(this.tree.root));
            this.mode = "play",
            this.next = te(),
            this.round = void 0,
            this.justPlayed = void 0,
            this.resultSent = !1,
            this.lastFeedback = "init",
            this.initialPath = o,
            this.initialNode = this.tree.nodeAtPath(o),
            this.pov = this.initialNode.ply % 2 === 1 ? "black" : "white",
            this.isDaily = location.href.endsWith("/daily"),
            this.hintHasBeenShown(!1),
            this.canViewSolution(!1),
            this.report = new T,
            this.setPath(site.blindMode ? o : h.init(o)),
            setTimeout( () => {
                this.jump(o),
                this.redraw()
            }
            , this.opts.pref.animation.duration > 0 ? 500 : 0),
            setTimeout( () => {
                this.canViewSolution(!0),
                this.redraw()
            }
            , this.rated() ? 4e3 : 2e3),
            this.withGround(i => {
                i.selectSquare(null),
                i.setAutoShapes([]),
                i.setShapes([]),
                this.showGround(i)
            }
            )
        }
        ;
        this.position = () => {
            let e = N(this.node.fen).unwrap();
            return M.fromSetup(e).unwrap()
        }
        ;
        this.makeCgOpts = () => {
            let e = this.node
              , o = e.ply % 2 === 0 ? "white" : "black"
              , i = ve(this.position())
              , s = this.node.children[0]
              , a = this.mode === "view" || o === this.pov && (!s || s.puzzle === "fail") ? {
                color: i.size > 0 ? o : void 0,
                dests: i
            } : {
                color: void 0,
                dests: new Map
            }
              , l = {
                fen: e.fen,
                orientation: this.flipped() ? b(this.pov) : this.pov,
                turnColor: o,
                movable: a,
                premovable: {
                    enabled: !1
                },
                check: !!e.check,
                lastMove: we(e.uci)
            };
            return e.ply >= this.initialNode.ply && this.mode !== "view" && o !== this.pov && !s && (l.movable.color = this.pov,
            l.premovable.enabled = !0),
            this.cgConfig = l,
            l
        }
        ;
        this.showGround = e => {
            e.set(this.makeCgOpts()),
            this.setAutoShapes()
        }
        ;
        this.pluginMove = (e, o, i) => {
            i ? this.playUserMove(e, o, i) : this.withGround(s => {
                s.move(e, o),
                s.state.movable.dests = void 0,
                s.state.turnColor = b(s.state.turnColor)
            }
            )
        }
        ;
        this.pluginUpdate = e => {
            var o, i;
            (o = this.voiceMove) == null || o.update({
                fen: e,
                canMove: !0
            }),
            (i = this.keyboardMove) == null || i.update({
                fen: e,
                canMove: !0
            })
        }
        ;
        this.userMove = (e, o) => {
            var s;
            this.justPlayed = e,
            this.promotion.start(e, o, {
                submit: this.playUserMove,
                show: (s = this.voiceMove) == null ? void 0 : s.promotionHook()
            }) || this.playUserMove(e, o),
            this.pluginUpdate(this.node.fen)
        }
        ;
        this.playUci = e => this.sendMove(z(e));
        this.playUciList = e => e.forEach(this.playUci);
        this.playUserMove = (e, o, i) => this.sendMove({
            from: X(e),
            to: X(o),
            promotion: i
        });
        this.sendMove = e => this.sendMoveAt(this.path, this.position(), e);
        this.sendMoveAt = (e, o, i) => {
            
            i = H(o, i);
            let s = ye(o, i)
              , n = o.isCheck() ? o.board.kingOf(o.turn) : void 0;
            this.addNode({
                ply: 2 * (o.fullmoves - 1) + (o.turn === "white" ? 0 : 1),
                fen: G(o.toSetup()),
                id: B(i),
                uci: O(i),
                san: s,
                check: w(n) ? v(n) : void 0,
                children: []
            }, e)
        }
        ;
        this.addNode = (e, o) => {
            let i = this.tree.addNode(e, o);
            this.jump(i),
            this.withGround(n => n.playPremove());
            let s = ne(this);
            this.setAutoShapes(),
            s === "fail" && site.sound.say("incorrect"),
            s && this.applyProgress(s),
            this.reorderChildren(o),
            this.redraw()
        }
        ;
        this.reorderChildren = (e, o) => {
            let i = this.tree.nodeAtPath(e);
            i.children.sort( (s, n) => {
                let a = s.puzzle;
                return a === "fail" ? 1 : a === "good" || a === "win" ? -1 : 0
            }
            ),
            o && i.children.forEach(s => this.reorderChildren(e + s.id, !0))
        }
        ;
        this.instantRevertUserMove = () => {
            this.withGround(e => {
                e.cancelPremove(),
                e.selectSquare(null)
            }
            ),
            this.jump(h.init(this.path)),
            this.redraw()
        }
        ;
        this.revertUserMove = () => {
            site.blindMode ? this.instantRevertUserMove() : setTimeout(this.instantRevertUserMove, 300)
        }
        ;
        this.applyProgress = e => {
            if (e === "fail")
                this.lastFeedback = "fail",
                this.revertUserMove(),
                this.mode === "play" && (this.streak ? (this.failStreak(this.streak),
                this.streakFailStorage.fire()) : (this.canViewSolution(!0),
                this.mode = "try",
                this.sendResult(!1)));
            else if (e === "win") {
                if (this.streak && this.sound.good(),
                this.lastFeedback = "win",
                this.mode != "view") {
                    let o = this.mode === "play" ? this.sendResult(!0) : Promise.resolve();
                    this.mode = "view",
                    this.withGround(this.showGround),
                    o.then(i => this.autoNext() ? this.nextPuzzle() : this.startCeval())
                }
            } else
                e && (this.lastFeedback = "good",
                setTimeout( () => {
                    let o = M.fromSetup(N(e.fen).unwrap()).unwrap();
                    this.sendMoveAt(e.path, o, e.move)
                }
                , this.opts.pref.animation.duration * (this.autoNext() ? 1 : 1.5)))
        }
        ;
        this.failStreak = e => {
            this.mode = "view",
            e.onComplete(!1),
            setTimeout(this.viewSolution, 500),
            this.sound.end()
        }
        ;
        this.sendResult = async e => {
            var s;
            if (this.resultSent)
                return Promise.resolve();
            this.resultSent = !0,
            this.session.complete(this.data.puzzle.id, e);
            let o = await ft(this.data.puzzle.id, this.data.angle.key, e, this.rated() && !this.hintHasBeenShown(), this.data.replay, this.streak, this.opts.settings.color)
              , i = o.next;
            i != null && i.user && this.data.user && (this.data.user.rating = i.user.rating,
            this.data.user.provisional = i.user.provisional,
            this.round = o.round,
            (s = o.round) != null && s.ratingDiff && this.session.setRatingDiff(this.data.puzzle.id, o.round.ratingDiff)),
            e && site.sound.say("Success!"),
            i && (this.next.resolve(this.data.replay && o.replayComplete ? this.data.replay : i),
            this.streak && e && this.streak.onComplete(!0, o.next)),
            this.redraw(),
            !i && !this.data.replay && (await Ye("No more puzzles available! Try another theme."),
            site.redirect("/training/themes"))
        }
        ;
        this.isPuzzleData = e => "puzzle"in e;
        this.nextPuzzle = () => {
            if (this.streak && this.lastFeedback != "win") {
                this.lastFeedback === "fail" && site.redirect(this.routerWithLang("/streak"));
                return
            }
            if (this.mode === "view" && (this.ceval.stop(),
            this.next.promise.then(e => {
                this.isPuzzleData(e) && (this.initiate(e),
                this.redraw())
            }
            ),
            this.data.replay && this.round === void 0 && site.redirect(`/training/dashboard/${this.data.replay.days}`),
            !this.streak && !this.data.replay)) {
                let e = this.routerWithLang(`/training/${this.data.angle.key}`);
                location.pathname != e && history.replaceState(null, "", e)
            }
        }
        ;
        this.setAutoShapes = () => this.withGround(e => e.setAutoShapes(yt({
            ...this,
            node: this.node,
            hint: this.hintSquare()
        })));
        this.hintSquare = () => {
            let e = this.showHint() ? Ct(this) : void 0;
            return e == null ? void 0 : e.from
        }
        ;
        this.canUseCeval = () => this.mode === "view" && !this.outcome();
        this.startCeval = () => {
            this.ceval.enabled() && this.canUseCeval() && this.doStartCeval()
        }
        ;
        this.doStartCeval = W(800, () => this.ceval.start(this.path, this.nodeList, this.data.puzzle.id, this.threatMode()));
        this.nextNodeBest = () => S.withMainlineChild(this.node, e => {
            var o;
            return (o = e.eval) == null ? void 0 : o.best
        }
        );
        this.toggleCeval = () => {
            this.ceval.toggle(),
            this.setAutoShapes(),
            this.startCeval(),
            this.ceval.enabled() || this.threatMode(!1),
            this.autoScrollRequested = !0,
            this.redraw()
        }
        ;
        this.restartCeval = () => {
            this.ceval.stop(),
            this.startCeval(),
            this.redraw()
        }
        ;
        this.toggleThreatMode = () => {
            this.node.check || (this.ceval.enabled() || this.ceval.toggle(),
            this.ceval.enabled() && (this.threatMode.toggle(),
            this.setAutoShapes(),
            this.startCeval(),
            this.redraw()))
        }
        ;
        this.outcome = () => this.position().outcome();
        this.jump = e => {
            let o = e !== this.path
              , i = o && e.length === this.path.length + 2;
            this.setPath(e),
            this.withGround(this.showGround),
            o && (i && (site.sound.saySan(this.node.san),
            site.sound.move(this.node)),
            this.threatMode(!1),
            this.ceval.stop(),
            this.startCeval()),
            this.promotion.cancel(),
            this.justPlayed = void 0,
            this.autoScrollRequested = !0,
            this.pluginUpdate(this.node.fen),
            k.emit("ply", this.node.ply)
        }
        ;
        this.userJump = e => {
            var o;
            ((o = this.tree.nodeAtPath(e)) == null ? void 0 : o.puzzle) === "fail" && this.mode != "view" || (this.withGround(i => i.selectSquare(null)),
            this.jump(e))
        }
        ;
        this.userJumpPlyDelta = e => {
            var s;
            let o = this.mainline.length - 1;
            ((s = Ee(this.mainline)) == null ? void 0 : s.puzzle) === "fail" && this.mode != "view" && (o -= 1);
            let i = Math.min(Math.max(this.node.ply + e, 0), o);
            this.userJump(Re(this.mainline.slice(0, i + 1)))
        }
        ;
        this.toggleHint = () => {
            this.showHint() || (this.hintHasBeenShown(!0),
            this.userJump(h.fromNodeList(this.mainline.filter(o => o.puzzle != "fail")))),
            this.showHint.toggle(),
            this.setAutoShapes();
            let e = this.hintSquare();
            this.withGround(o => o.selectSquare(e ? v(e) : null)),
            this.redraw()
        }
        ;
        this.viewSolution = () => {
            this.sendResult(!1),
            this.mode = "view",
            Pt(this.tree, this.initialPath, this.data.puzzle.solution, this.pov),
            this.reorderChildren(this.initialPath, !0);
            let e = this.node.children[0];
            if (e && e.puzzle === "good")
                this.userJump(this.path + e.id);
            else {
                let o = S.takePathWhile(this.mainline, i => i.puzzle != "good");
                o && this.userJump(o + this.tree.nodeAtPath(o).children[0].id)
            }
            this.autoScrollRequested = !0,
            this.voteDisabled = !0,
            this.redraw(),
            this.startCeval(),
            setTimeout( () => {
                this.voteDisabled = !1,
                this.redraw()
            }
            , 500)
        }
        ;
        this.skip = () => {
            if (!this.streak || !this.streak.data.skip || this.mode != "play")
                return;
            this.streak.skip(),
            this.userJump(h.fromNodeList(this.mainline));
            let e = h.size(this.path) - h.size(this.initialPath)
              , o = this.data.puzzle.solution[e];
            this.playUci(o),
            this.playBestMove()
        }
        ;
        this.flip = () => {
            this.flipped.toggle(),
            this.withGround(e => e.toggleOrientation()),
            this.redraw()
        }
        ;
        this.vote = e => {
            this.voteDisabled || (ct(this.data.puzzle.id, e),
            this.nextPuzzle())
        }
        ;
        this.voteTheme = (e, o) => {
            this.round && (this.round.themes = this.round.themes || {},
            o === this.round.themes[e] ? (delete this.round.themes[e],
            se(this.data.puzzle.id, e, void 0)) : (o || this.data.puzzle.themes.includes(e) ? this.round.themes[e] = o : delete this.round.themes[e],
            se(this.data.puzzle.id, e, o)),
            this.redraw())
        }
        ;
        this.blindfold = e => (e !== void 0 && e !== this.blindfolded() && (this.blindfolded(e),
        this.redraw()),
        this.blindfolded());
        this.playBestMove = () => {
            let e = this.nextNodeBest() || this.node.ceval && this.node.ceval.pvs[0].moves[0];
            e && this.playUci(e)
        }
        ;
        this.autoNexting = () => this.lastFeedback === "win" && this.autoNext();
        this.currentEvals = () => ({
            client: this.node.ceval
        });
        this.showEvalGauge = () => this.showComputer() && this.ceval.enabled() && !this.outcome();
        this.getOrientation = () => this.withGround(e => e.state.orientation);
        this.allThemes = this.opts.themes && {
            dynamic: this.opts.themes.dynamic.split(" "),
            static: new Set(this.opts.themes.static.split(" "))
        };
        this.toggleRated = () => this.rated(!this.rated());
        this.getCeval = () => this.ceval;
        this.ongoing = !1;
        this.getNode = () => this.node;
        this.showComputer = () => this.mode === "view";
        this.routerWithLang = e => {
            if (document.body.hasAttribute("data-user"))
                return e;
            let o = document.documentElement.lang.slice(0, 2);
            return o === "en" ? e : `/${o}${e}`
        }
        ;
        var s, n, a;
        this.rated = xe("puzzle.rated", !0, this.redraw),
        this.autoNext = Z(`puzzle.autoNext${e.data.streak ? ".streak" : ""}`, !!e.data.streak),
        this.blindfolded = Z(`puzzle.${((s = this.opts.data.user) == null ? void 0 : s.id) || "anon"}.blindfolded`, !1),
        this.streak = e.data.streak ? new A(e.data) : void 0,
        this.streak && (e.data = {
            ...e.data,
            ...this.streak.data.current
        },
        this.streakFailStorage.listen(l => this.failStreak(this.streak))),
        this.session = new V(e.data.angle.key,(n = e.data.user) == null ? void 0 : n.id,!!e.data.streak),
        this.menu = y(!1, o),
        this.initiate(e.data),
        this.promotion = new Qe(this.withGround, () => this.withGround(l => l.set(this.cgConfig)),o),
        this.ceval = new je({
            redraw: this.redraw,
            variant: {
                short: "Std",
                name: "Standard",
                key: "standard"
            },
            externalEngines: ((a = this.data.externalEngines) == null ? void 0 : a.map(l => ({
                ...l,
                endpoint: this.opts.externalEngineEndpoint
            }))) || [],
            initialFen: void 0,
            possible: !0,
            emit: (l, p) => {
                this.tree.updateAt(p.path, m => {
                    if (p.threatMode) {
                        let u = l;
                        (!m.threat || m.threat.depth <= u.depth) && (m.threat = u)
                    } else
                        (!m.ceval || m.ceval.depth <= l.depth) && (m.ceval = l);
                    p.path === this.path && (this.report.checkForMultipleSolutions(l, this, p.threatMode),
                    this.setAutoShapes(),
                    this.redraw())
                }
                )
            }
            ,
            setAutoShapes: this.setAutoShapes
        }),
        this.keyboardHelp = Se(location.hash === "#keyboard", this.redraw),
        gt(this),
        this.report = new T,
        document.addEventListener("visibilitychange", () => Te( () => this.jump(this.path), 500)),
        k.on("zen", () => {
            let l = $("body").toggleClass("zen").hasClass("zen");
            window.dispatchEvent(new Event("resize")),
            $("body").hasClass("zen-auto") || zt(l)
        }
        ),
        $("body").addClass("playing"),
        $("#zentog").on("click", () => k.emit("zen"))
    }
    clearCeval() {
        this.tree.removeCeval(),
        this.restartCeval()
    }
}
;
var Ft = t => {
    var e;
    return r("div.puzzle__vote", {}, !t.autoNexting() && [t.session.isNew() && ((e = t.data.user) == null ? void 0 : e.provisional) && r("div.puzzle__vote__help", [r("p", i18n.puzzle.didYouLikeThisPuzzle), r("p", i18n.puzzle.voteToLoadNextOne)]), r("div.puzzle__vote__buttons", {
        class: {
            enabled: !t.voteDisabled
        }
    }, [r("div.vote.vote-up", {
        hook: g("click", () => t.vote(!0))
    }), r("div.vote.vote-down", {
        hook: g("click", () => t.vote(!1))
    })])])
}
  , qt = t => r("a.continue", {
    hook: g("click", t.nextPuzzle)
}, [r("i", {
    attrs: Q(ee)
}), i18n.puzzle.continueTraining])
  , Wt = t => {
    var e, o;
    return [r("div.complete", [r("span.game-over", "GAME OVER"), r("span", i18n.puzzle.yourStreakX.asArray(r("strong", `${(o = (e = t.streak) == null ? void 0 : e.data.index) != null ? o : 0}`)))]), r("a.continue", {
        attrs: {
            href: t.routerWithLang("/streak")
        }
    }, [r("i", {
        attrs: Q(ee)
    }), i18n.puzzle.newStreak])]
}
;
function Tt(t) {
    var s;
    let e = t.data
      , o = t.lastFeedback === "win"
      , i = !((s = t.node.san) != null && s.includes("#"));
    return r("div.puzzle__feedback.after", t.streak && !o ? Wt(t) : [r("div.complete", i18n.puzzle[o ? "puzzleSuccess" : "puzzleComplete"]), e.user ? Ft(t) : qt(t), r("div.puzzle__more", [i ? r("a", {
        attrs: {
            "data-icon": Ue,
            href: `/analysis/${t.node.fen.replace(/ /g, "_")}?color=${t.pov}#practice`,
            title: i18n.site.playWithTheMachine,
            target: "_blank"
        }
    }) : r("a"), e.user && !t.autoNexting() && r("a", {
        hook: g("click", t.nextPuzzle)
    }, i18n.puzzle[t.streak ? "continueTheStreak" : "continueTraining"])])])
}
var re = t => {
    var e;
    return t.streak ? d("div.view_solution.skip", {
        class: {
            show: !!((e = t.streak) != null && e.data.skip)
        }
    }, [d("a.button.button-empty", {
        hook: g("click", t.skip),
        attrs: {
            title: i18n.puzzle.streakSkipExplanation
        }
    }, i18n.storm.skip)]) : d("div.view_solution", {
        class: {
            show: t.canViewSolution()
        }
    }, [t.mode !== "view" ? d("a.button" + (t.showHint() ? "" : ".button-empty"), {
        hook: g("click", t.toggleHint)
    }, i18n.site.getAHint) : void 0, d("a.button.button-empty", {
        hook: g("click", t.viewSolution)
    }, i18n.site.viewTheSolution)])
}
  , Kt = t => d("div.puzzle__feedback.play", [d("div.player", [d("div.no-square", d("piece.king." + t.pov)), d("div.instruction", [d("strong", i18n.site.yourTurn), d("em", i18n.puzzle[t.pov === "white" ? "findTheBestMoveForWhite" : "findTheBestMoveForBlack"])])]), re(t)])
  , jt = t => d("div.puzzle__feedback.good", [d("div.player", [d("div.icon", "\u2713"), d("div.instruction", [d("strong", i18n.puzzle.bestMove), d("em", i18n.puzzle.keepGoing)])]), re(t)])
  , Jt = t => d("div.puzzle__feedback.fail", [d("div.player", [d("div.icon", "\u2717"), d("div.instruction", [d("strong", i18n.puzzle.notTheMove), d("em", i18n.puzzle.trySomethingElse)])]), re(t)]);
function Nt(t) {
    if (t.mode === "view")
        return Tt(t);
    switch (t.lastFeedback) {
    case "init":
        return Kt(t);
    case "good":
        return jt(t);
    case "fail":
        return Jt(t)
    }
}
var ae = W(150, (t, e) => {
    let o = e.parentNode
      , i = e.querySelector(".active");
    if (!i) {
        o.scrollTop = t.path === h.root ? 0 : 99999;
        return
    }
    let s = i.getBoundingClientRect().y - e.getBoundingClientRect().y;
    o.scrollTop = s - o.offsetHeight / 2 + i.offsetHeight
}
);
function Yt(t, e) {
    return h.contains(t.ctrl.path, e)
}
function _(t, e) {
    return r("index", U(t) + (e ? t % 2 === 1 ? "." : "..." : ""))
}
function he(t, e, o) {
    let i = e.children
      , s = i[0];
    if (!s)
        return [];
    if (o.isMainline) {
        let n = s.ply % 2 === 1;
        if (!i[1])
            return [n && _(s.ply, !1), ...de(t, s, {
                parentPath: o.parentPath,
                isMainline: !0
            })];
        let a = he(t, s, {
            parentPath: o.parentPath + s.id,
            isMainline: !0
        })
          , l = {
            parentPath: o.parentPath,
            isMainline: !0
        };
        return [n && _(s.ply, !1), Rt(t, s, l), n && ue(), r("interrupt", xt(t, i.slice(1), {
            parentPath: o.parentPath,
            isMainline: !0
        })), ...n && a ? [_(s.ply, !1), ue()] : [], ...a]
    }
    return i[1] ? [xt(t, i, o)] : de(t, s, o)
}
function xt(t, e, o) {
    return r("lines", {
        class: {
            single: !!e[1]
        }
    }, e.map(function(i) {
        return r("line", de(t, i, {
            parentPath: o.parentPath,
            isMainline: !1,
            withIndex: !0
        }))
    }))
}
function Rt(t, e, o) {
    return o.isMainline ? Xt(t, e, o) : Qt(t, e, o)
}
function Xt(t, e, o) {
    let i = o.parentPath + e.id
      , s = {
        active: i === t.ctrl.path,
        current: i === t.ctrl.initialPath,
        hist: e.ply < t.ctrl.initialNode.ply
    };
    return e.puzzle && (s[e.puzzle] = !0),
    r("move", {
        attrs: {
            p: i
        },
        class: s
    }, Zt(e))
}
var le = t => r("glyph", {
    attrs: {
        title: t.name
    }
}, t.symbol);
function Et(t) {
    switch (t.puzzle) {
    case "good":
    case "win":
        return le({
            name: i18n.puzzle.bestMove,
            symbol: "\u2713"
        });
    case "fail":
        return le({
            name: "Puzzle failed",
            symbol: "\u2717"
        });
    case "retry":
        return le({
            name: i18n.puzzle.goodMove,
            symbol: "?!"
        });
    default:
        return
    }
}
function Zt(t) {
    let e = t.eval || t.ceval;
    return [t.san, e && (w(e.cp) ? Dt(Ke(e.cp)) : w(e.mate) && Dt("#" + e.mate)), Et(t)]
}
function Qt(t, e, o) {
    let i = o.withIndex || e.ply % 2 === 1
      , s = o.parentPath + e.id
      , n = s === t.ctrl.path
      , a = {
        active: n,
        parent: !n && Yt(t, s)
    };
    return e.puzzle && (a[e.puzzle] = !0),
    r("move", {
        attrs: {
            p: s
        },
        class: a
    }, [i && _(e.ply, !0), e.san, Et(e)])
}
function de(t, e, o) {
    return [Rt(t, e, o), ...he(t, e, {
        parentPath: o.parentPath + e.id,
        isMainline: o.isMainline
    })]
}
function ue() {
    return r("move.empty", "...")
}
function Dt(t) {
    return r("eval", t)
}
function eo(t) {
    let e = t.target;
    return e.getAttribute("p") || e.parentNode.getAttribute("p")
}
function Vt(t) {
    let e = t.tree.root
      , o = {
        ctrl: t,
        showComputer: !1
    };
    return r("div.tview2.tview2-column", {
        hook: {
            insert: i => {
                let s = i.elm;
                t.path !== h.root && ae(t, s),
                s.addEventListener("mousedown", n => {
                    if (w(n.button) && n.button !== 0)
                        return;
                    let a = eo(n);
                    a && t.userJump(a),
                    t.redraw()
                }
                )
            }
            ,
            postpatch: (i, s) => {
                t.autoScrollNow ? (ae(t, s.elm),
                t.autoScrollNow = !1,
                t.autoScrollRequested = !1) : t.autoScrollRequested && (t.path !== h.root && ae(t, s.elm),
                t.autoScrollRequested = !1)
            }
        }
    }, [...e.ply % 2 === 1 ? [_(e.ply, !1), ue()] : [], ...he(o, e, {
        parentPath: "",
        isMainline: !0
    })])
}
function At(t) {
    return st(t.redraw, t.menu, e => [d("section", [e.flip(i18n.site.flipBoard, t.flipped(), () => {
        t.flip(),
        t.menu.toggle()
    }
    )]), d("section", [e.zenMode(!0), e.blindfold(y(t.blindfold(), o => t.blindfold(o)), !0), e.voiceInput(oe("voice", !!t.voiceMove), !0), e.keyboardInput(oe("keyboardMove", !!t.keyboardMove), !0)]), d("section.board-menu__links", [d("a", {
        attrs: {
            target: "_blank",
            href: "/account/preferences/display"
        }
    }, i18n.preferences.display)])])
}
var to = t => r("div.puzzle__moves.areplay", [Vt(t)]);
function oo(t) {
    let e = t.target;
    return e.getAttribute("data-act") || e.parentNode.getAttribute("data-act")
}
function Y(t, e, o, i=!1) {
    return r("button.fbt", {
        class: {
            disabled: o,
            glowing: i
        },
        attrs: {
            "data-act": e,
            "data-icon": t
        }
    })
}
function io(t) {
    let e = t.node
      , o = e.children[0]
      , i = t.mode === "play" && o && o.puzzle !== "fail";
    return r("div.puzzle__controls.analyse-controls", [r("div.jumps", {
        hook: Ae(Ie(s => {
            let n = oo(s);
            n === "prev" ? E(t) : n === "next" ? R(t) : n === "first" ? J(t) : n === "last" && j(t)
        }
        , t.redraw))
    }, [Y(He, "first", !e.ply), Y(Ge, "prev", !e.ply), Y(Be, "next", !o), Y(Oe, "last", !o, i), it(t.menu, i18n.site.menu)]), At(t)])
}
var pe = !1;
function me(t) {
    if (t.nvui)
        return t.nvui.render(t);
    let e = t.showComputer()
      , o = t.showEvalGauge();
    return pe !== e && (pe || (t.autoScrollNow = !0),
    pe = e),
    r(`main.puzzle.puzzle-${t.data.replay ? "replay" : "play"}${t.streak ? ".puzzle--streak" : ""}`, {
        class: {
            "gauge-on": o
        },
        hook: {
            postpatch(i, s) {
                i.data.gaugeOn !== o && (t.pref.coords === Xe.Outside && $("body").toggleClass("coords-in", o).toggleClass("coords-out", !o),
                Ze()),
                s.data.gaugeOn = o
            }
        }
    }, [r("aside.puzzle__side", [ut(t), at(t), t.streak ? dt(t) : lt(t), ht(t), pt(t)]), r("div.puzzle__board.main-board" + (t.blindfold() ? ".blindfold" : ""), {
        hook: "ontouchstart"in window || !F.boolean("scrollMoves").getOrDefault(!0) ? void 0 : $e("wheel", Je( (i, s) => {
            let n = i.target;
            n.tagName !== "PIECE" && n.tagName !== "SQUARE" && n.tagName !== "CG-BOARD" || (i.preventDefault(),
            i.deltaY > 0 && s ? R(t) : i.deltaY < 0 && s && E(t),
            t.redraw())
        }
        ))
    }, [mt(t), t.promotion.view()]), K.renderGauge(t), r("div.puzzle__tools", [t.voiceMove ? nt(t.voiceMove.ctrl, t.redraw, "puz") : null, r("div.ceval-wrap", {
        class: {
            none: !e
        }
    }, e ? [...K.renderCeval(t), K.renderPvs(t)] : []), to(t), Nt(t)]), io(t), t.keyboardMove && et(t.keyboardMove), so(t), t.keyboardHelp() && bt(t)])
}
function so(t) {
    let e = t.session.get().rounds
      , o = t.data.puzzle.id;
    return r("div.puzzle__session", [...e.map(i => {
        let s = i.ratingDiff && t.opts.showRatings ? i.ratingDiff > 0 ? "+" + i.ratingDiff : i.ratingDiff : null;
        return d(`a.result-${i.result}${s ? "" : ".result-empty"}`, {
            key: i.id,
            class: {
                current: o === i.id
            },
            attrs: {
                href: `/training/${t.session.theme}/${i.id}`,
                ...t.streak ? {
                    target: "_blank"
                } : {}
            }
        }, s)
    }
    ), e.find(i => i.id === o) ? !t.streak && r("a.session-new", {
        key: "new",
        attrs: {
            href: `/training/${t.session.theme}`
        }
    }) : r("a.result-cursor.current", {
        key: o,
        attrs: t.streak ? {} : {
            href: `/training/${t.session.theme}/${o}`
        }
    }, t.streak && (t.streak.data.index + 1).toString())])
}
var $t = Pe([Ce, Me]);
async function Xi(t) {
    let e = document.querySelector("main.puzzle")
      , o = site.blindMode ? await site.asset.loadEsm("puzzle.nvui") : void 0
      , i = new L(t,a,o)
      , s = me(i);
    e.innerHTML = "";
    let n = $t(e, s);
    function a() {
        n = $t(n, me(i))
    }
    ot()
}
export {Xi as initModule};

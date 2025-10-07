import {a as F} from "./lib.X4Y5P3ZP.js";
import {c as _o} from "./lib.DS3BKRD3.js";
import {a as Uo, c as Yo} from "./lib.HRMLZFTG.js";
import {a as Fo} from "./lib.6HOWPF4T.js";
import {a as ae, b as jo} from "./lib.VIBV7OH7.js";
import {a as O} from "./lib.Z4JYGFNY.js";
import {a as Ko, b as Wo} from "./lib.DX2M6X53.js";
import {a as Bo, b as Vo, d as Eo, e as W} from "./lib.EB4HLPDQ.js";
import {a as Te} from "./lib.7X2AVV66.js";
import {a as $o, b as zo} from "./lib.QEURAC64.js";
import {b as co} from "./lib.VZKDU3XO.js";
import {a as ve, d as po, e as ke, f as we} from "./lib.P2KHB2MX.js";
import {c as T, d as P, e as bo, f as v, g as oe, h as y, i as vo, j as te, k as ko, l as ie, m as wo, n as Co, o as Ce, p as ne, q as se, r as Mo, s as To, u as Po, v as re, w as Ro, x as xo} from "./lib.3VCG2A7E.js";
import {a as No, g as Oo} from "./lib.EGYPG5O5.js";
import {b as uo, c as fo, d as mo, e as ho} from "./lib.CEU5KCNN.js";
import {c as oo, d as to, g as io, n as ao} from "./lib.O34UKQWH.js";
import {f as no, g as so, h as z, l as ro} from "./lib.DRCUXNBO.js";
import {c as Ao, e as Ho, f as Go, h as Io} from "./lib.35RCTIFM.js";
import {a as g, e as Ze, n as eo} from "./lib.ZS3AJRKZ.js";
import {b as lo, c as K} from "./lib.67NW2GN4.js";
import {a as So, d as Me, e as Do, i as Lo} from "./lib.3VGJMM5W.js";
import {a as go, b as yo} from "./lib.IV6QNXIA.js";
import {d as x, e as Xe} from "./lib.UB2UE2WQ.js";
import {a as C, b as u, g as r} from "./lib.VYXVMBIL.js";
import {b as M} from "./lib.JDGIJSRT.js";
import {a as h} from "./lib.VLCMJXS7.js";
import {f as ee, h as N, k as be} from "./lib.QUZI7FGT.js";
import {a as L, h as I, i as qe, n as Je, s as Qe} from "./lib.7MXXVI7Z.js";
var Pe = o => o.userJump(o.ply - 1)
  , Re = o => o.userJump(o.ply + 1)
  , qo = o => site.mousetrap.bind(["left", "k"], () => {
    Pe(o),
    o.redraw()
}
).bind(["right", "j"], () => {
    Re(o),
    o.redraw()
}
).bind(["up", "0", "home"], () => {
    o.userJump(0),
    o.redraw()
}
).bind(["down", "$", "end"], () => {
    o.userJump(o.data.steps.length - 1),
    o.redraw()
}
).bind("f", o.flipNow).bind("z", () => h.emit("zen")).bind("F", o.yeet).bind("?", () => {
    o.keyboardHelp = !o.keyboardHelp,
    o.redraw()
}
)
  , Jo = o => yo({
    class: "help",
    htmlUrl: "/round/help",
    onClose() {
        o.keyboardHelp = !1,
        o.redraw()
    },
    modal: !0
});
var B = o => ({
    attrs: {
        "data-icon": o
    }
});
function j(o) {
    let e = new Map;
    if (!o)
        return e;
    if (typeof o == "string")
        for (let t of o.split(" "))
            e.set(t.slice(0, 2), t.slice(2).match(/.{2}/g));
    else
        for (let t in o)
            e.set(t, o[t].match(/.{2}/g));
    return e
}
var R = o => o.steps[0].ply
  , S = o => xe(o).ply
  , xe = o => o.steps[o.steps.length - 1]
  , A = (o, e) => o.steps[e - R(o)]
  , Se = o => {
    o.correspondence && (o.correspondence.showBar = o.pref.clockBar),
    ["horde", "crazyhouse"].includes(o.game.variant.key) && (o.pref.showCaptured = !1),
    o.expiration && (o.expiration.movedAt = Date.now() - o.expiration.idleMillis)
}
;
var Le = ["pawn", "knight", "bishop", "rook", "queen"];
function Qo(o, e) {
    if (e.button !== void 0 && e.button !== 0 || o.replaying() || !o.isPlaying())
        return;
    let t = e.target
      , n = t.getAttribute("data-role")
      , i = t.getAttribute("data-color")
      , s = t.getAttribute("data-nb");
    !n || !i || s === "0" || (e.stopPropagation(),
    e.preventDefault(),
    uo(o.chessground.state, {
        color: i,
        role: n
    }, e))
}
var Xo = !1
  , Zo = !1
  , et = !1;
function le(o, e, t) {
    if (b.length === 0 ? Zo = !0 : (Xo = !0,
    et || it(o)),
    !y(o) || e === "pawn" && (t[1] === "1" || t[1] === "8"))
        return !1;
    let n = o.possibleDrops;
    if (typeof n == "undefined" || n === null)
        return !0;
    let i = n.match(/.{2}/g);
    return !!(i != null && i.includes(t))
}
function ot() {
    let o = g.make("crazyKeyHist");
    if (Xo)
        o.set(10);
    else if (Zo) {
        let e = parseInt(o.get());
        e > 0 && e <= 10 ? o.set(e - 1) : e !== 0 && o.set(3)
    }
}
var b = [];
function tt(o) {
    let e = site.mousetrap, t, n = () => {
        if (t && document.body.classList.remove(t),
        b.length > 0) {
            let s = Le[b[b.length - 1] - 1]
              , a = o.data.player.color
              , l = o.data.crazyhouse;
            if (!l)
                return;
            let d = l.pockets[a === "white" ? 0 : 1][s];
            fo(o.chessground.state, d ? {
                color: a,
                role: s
            } : void 0),
            t = `cursor-${a}-${s}`,
            document.body.classList.add(t)
        } else
            mo(o.chessground.state),
            t = void 0
    }
    ;
    h.on("ply", () => {
        b.length > 0 && n()
    }
    );
    for (let s = 1; s <= 5; s++) {
        let a = s.toString();
        e.bind(a, () => {
            b.includes(s) || (b.push(s),
            n())
        }
        ).bind(a, () => {
            let l = b.indexOf(s);
            l >= 0 && (b.splice(l, 1),
            l === b.length && n())
        }
        , "keyup")
    }
    let i = () => {
        b.length > 0 && (b.length = 0,
        n())
    }
    ;
    window.addEventListener("blur", i),
    window.addEventListener("focus", s => {
        s.target && s.target.localName === "input" && i()
    }
    , {
        capture: !0
    }),
    g.get("crazyKeyHist") !== "0" && it(o.data)
}
function it(o) {
    let e = o.player.color[0];
    for (let t of "PNBRQ")
        fetch(site.asset.url(`piece/cburnett/${e}${t}.svg`));
    et = !0
}
var mi = ["mousedown", "touchstart"];
function de(o, e, t) {
    let n = A(o.data, o.ply);
    if (!n.crazy)
        return;
    let i = o.justDropped
      , s = o.preDrop
      , a = n.crazy.pockets[e === "white" ? 0 : 1]
      , l = t === (o.flip ? "top" : "bottom")
      , d = l && !o.replaying() && o.isPlaying()
      , p = e === o.data.player.color
      , c = o.justCaptured
      , f = c && (c.promoted ? "pawn" : c.role);
    return M("div.pocket.is2d.pocket-" + t, {
        class: {
            usable: d
        },
        hook: C(m => mi.forEach(E => m.addEventListener(E, fi => {
            t === (o.flip ? "top" : "bottom") && b.length === 0 && Qo(o, fi)
        }
        )))
    }, Le.map(m => {
        let E = a[m] || 0;
        return p && (i === m && E--,
        f === m && E++),
        M("div.pocket-c1", M("div.pocket-c2", M("piece." + m + "." + e, {
            class: {
                premove: p && s === m
            },
            attrs: {
                "data-role": m,
                "data-color": e,
                "data-nb": E
            }
        })))
    }
    ))
}
function nt(o) {
    let e = o.data
      , t = o.makeCgHooks()
      , n = A(e, o.ply)
      , i = o.isPlaying();
    return {
        fen: n.fen,
        orientation: Ne(e, o.flip),
        turnColor: n.ply % 2 === 0 ? "white" : "black",
        lastMove: z(n.uci),
        check: !!n.check,
        coordinates: e.pref.coords !== ve.Hidden,
        coordinatesOnSquares: e.pref.coords === ve.All,
        addPieceZIndex: o.data.pref.is3d,
        addDimensionsCssVarsTo: document.body,
        touchIgnoreRadius: e.correspondence ? 0 : 1,
        highlight: {
            lastMove: e.pref.highlight,
            check: e.pref.highlight
        },
        events: {
            move: t.onMove,
            dropNewPiece: t.onNewPiece,
            insert(s) {
                let a = R(o.data)
                  , l = (a % 2 === 0 ? "white" : "black") !== e.player.color
                  , d = a + 2 + +l;
                co(s, i ? o.data.pref.resizeHandle : po.Always, o.ply, p => p <= d)
            }
        },
        movable: {
            free: !1,
            color: i ? e.player.color : void 0,
            dests: i ? j(e.possibleMoves) : new Map,
            showDests: e.pref.destination && !o.blindfold(),
            rookCastle: e.pref.rookCastle,
            events: {
                after: t.onUserMove,
                afterNewPiece: t.onUserNewPiece
            }
        },
        animation: {
            enabled: !0,
            duration: e.pref.animationDuration
        },
        premovable: {
            enabled: e.pref.enablePremove,
            showDests: e.pref.destination && !o.blindfold(),
            castle: e.game.variant.key !== "antichess",
            events: {
                set: t.onPremove,
                unset: t.onCancelPremove
            },
            unrestrictedPremoves: e.game.variant.key === "atomic"
        },
        predroppable: {
            enabled: e.pref.enablePremove && e.game.variant.key === "crazyhouse",
            events: {
                set: t.onPredrop,
                unset() {
                    t.onPredrop(void 0)
                }
            }
        },
        draggable: {
            enabled: e.pref.moveEvent !== ke.Click,
            showGhost: e.pref.highlight
        },
        selectable: {
            enabled: e.pref.moveEvent !== ke.Drag
        },
        drawable: {
            enabled: !0,
            defaultSnapToValidMove: g.boolean("arrow.snap").getOrDefault(!0)
        },
        disableContextMenu: !0
    }
}
var st = o => o.chessground.set(nt(o))
  , Ne = (o, e) => o.game.variant.key === "racingKings" ? e ? "black" : "white" : e ? o.opponent.color : o.player.color
  , rt = o => M("div.cg-wrap", {
    hook: C(e => o.setChessground(ho(e, nt(o))))
});
function at(o) {
    return jo(o.redraw, o.menu, e => {
        let t = o.data
          , n = t.player.spectator;
        return [r("section", [e.flip(i18n.site.flipBoard, o.flip, () => {
            o.flipNow(),
            o.menu.toggle()
        }
        )]), r("section", [e.zenMode(!0), e.blindfold(I(o.blindfold(), i => o.blindfold(i)), !n), "vibrate"in navigator && So({
            name: "Vibration feedback",
            id: "haptics",
            checked: o.vibration(),
            change: i => o.vibration(i)
        }, o.redraw), e.voiceInput(Me("voice", !!o.voiceMove), !n), e.keyboardInput(Me("keyboardMove", !!o.keyboardMove), !n), !n && (t.pref.submitMove || o.voiceMove) ? e.confirmMove(o.confirmMoveToggle) : void 0]), r("section.board-menu__links", [r("a", {
            attrs: {
                target: "_blank",
                href: "/account/preferences/display"
            }
        }, i18n.preferences.display), r("a", {
            attrs: {
                target: "_blank",
                href: "/account/preferences/game-behavior "
            }
        }, i18n.preferences.gameBehavior)])]
    }
    )
}
var lt = 99999
  , Oe = "kwdb"
  , ft = "i5z"
  , vi = ft.toUpperCase()
  , ki = "l4x"
  , wi = "rm6"
  , Ci = "rb1"
  , Mi = K(100, (o, e) => window.requestAnimationFrame( () => {
    if (e.data.steps.length < 7 && !T(e.data))
        return;
    let t;
    if (e.ply < 3)
        t = 0;
    else if (e.ply === S(e.data))
        t = lt;
    else {
        let n = o.querySelector(".a1t");
        n && (t = x() === 1 ? n.offsetLeft - o.offsetWidth / 2 + n.offsetWidth / 2 : n.offsetTop - o.offsetHeight / 2 + n.offsetHeight / 2)
    }
    typeof t == "number" && (t === lt ? o.scrollLeft = o.scrollTop = t : x() === 1 ? o.scrollLeft = t : o.scrollTop = t)
}
))
  , Ti = () => r("draw", {
    attrs: {
        title: "Draw offer"
    }
}, "\xBD?")
  , dt = (o, e, t, n) => o ? r(Oe, {
    class: {
        a1t: o.ply === e
    }
}, [o.san[0] === "P" ? o.san.slice(1) : o.san, n.has(o.ply) ? Ti() : void 0]) : t && r(Oe, "\u2026");
function mt(o) {
    let e;
    if (T(o.data))
        switch (o.data.game.winner) {
        case "white":
            e = "1-0";
            break;
        case "black":
            e = "0-1";
            break;
        default:
            e = "\xBD-\xBD"
        }
    if (e || P(o.data))
        return r("div.result-wrap", [r("p.result", e || ""), r("p.status", {
            hook: C( () => {
                o.autoScroll ? o.autoScroll() : setTimeout( () => o.autoScroll(), 200)
            }
            )
        }, W(o.data))])
}
function Pi(o) {
    let e = o.data.steps
      , t = R(o.data)
      , n = S(o.data)
      , i = Math.trunc(t / 2) + 1
      , s = new Set(o.data.game.drawOffers || []);
    if (typeof n == "undefined")
        return [];
    let a = []
      , l = 1;
    t % 2 === 1 && (a.push([null, e[1]]),
    l = 2);
    for (let c = l; c < e.length; c += 2)
        a.push([e[c], e[c + 1]]);
    let d = []
      , p = o.ply;
    for (let c = 0; c < a.length; c++)
        d.push(r(ft, c + i + "")),
        d.push(dt(a[c][0], p, !0, s)),
        d.push(dt(a[c][1], p, !1, s));
    return d.push(mt(o)),
    d
}
function Be(o) {
    let e = o.data.forecastCount;
    return Po(o.data) && !o.data.local && r("a.fbt.analysis", {
        class: {
            text: !!e
        },
        attrs: {
            title: i18n.site.analysis,
            href: O(o.data, o.data.player.color) + "/analysis#" + o.ply,
            "data-icon": "\uE01F"
        }
    }, !!e && String(e))
}
var ht = (o, e) => {
    let t = () => parseInt(e.target.getAttribute("data-ply") || "");
    Qe( () => {
        let n = t();
        isNaN(n) || o.userJump(n),
        o.redraw()
    }
    , () => isNaN(t()))
}
;
function Ri(o) {
    let e = R(o.data)
      , t = S(o.data);
    return r(Ci, [Be(o) || r("div.noop"), [["\uE035", e], ["\uE037", o.ply - 1], ["\uE036", o.ply + 1], ["\uE034", t]].map( (n, i) => {
        let s = o.ply !== n[1] && n[1] >= e && n[1] <= t;
        return r("button.fbt.repeatable", {
            class: {
                glowing: i === 3 && o.isLate()
            },
            attrs: {
                disabled: !s,
                "data-icon": n[0],
                "data-ply": s ? n[1] : "-"
            },
            hook: C(a => Te(a, {
                click: l => ht(o, l),
                hold: "click"
            }))
        })
    }
    ), ae(o.menu, i18n.site.menu)])
}
function xi(o) {
    let e = o.data;
    return (o.replayEnabledByPref() || x() > 1) && v(e) && e.game.turns === 0 && !e.player.spectator && r("div.message", B("\uE060"), [r("div", [i18n.site[e.player.color === "white" ? "youPlayTheWhitePieces" : "youPlayTheBlackPieces"], e.player.color === "white" && [r("br"), r("strong", i18n.site.itsYourTurn)]])])
}
var pt = (o, e, t, n) => r("button.fbt", {
    attrs: {
        disabled: n,
        "data-icon": t,
        "data-ply": o.ply + e
    },
    hook: C(i => Te(i, {
        click: s => ht(o, s),
        hold: "click"
    }))
});
function Ve(o) {
    let e = o.data
      , t = o.replayEnabledByPref() && r(ki, {
        hook: C(i => {
            i.addEventListener("mousedown", s => {
                let a = s.target
                  , l = -2;
                if (a.tagName === Oe.toUpperCase()) {
                    for (; a = a.previousSibling; )
                        if (l++,
                        a.tagName === vi) {
                            o.userJump(2 * parseInt(a.textContent || "") + l),
                            o.redraw();
                            break
                        }
                }
            }
            ),
            o.autoScroll = () => Mi(i, o),
            o.ply > 2 && (o.autoScroll(),
            x() === 1 && o.autoScroll())
        }
        )
    }, Pi(o))
      , n = t || mt(o);
    return !o.nvui && r(wi, [Ri(o), at(o), xi(o) || (x() === 1 ? r("div.col1-moves", [pt(o, -1, "\uE037", o.ply === R(e)), n, pt(o, 1, "\uE036", o.ply === S(e))]) : n)])
}
var gt = !1;
function yt(o) {
    let e = v(o.data) && o.data.expiration;
    if (!e)
        return;
    let t = Math.max(0, e.movedAt - Date.now() + e.millisToMove)
      , n = Math.floor(t / 1e3)
      , i = y(o.data)
      , s = i && t < 8e3;
    !gt && s && (site.sound.play("lowTime"),
    gt = !0);
    let a = i !== o.flip ? "bottom" : "top";
    return M("div.expiration.expiration-" + a, {
        class: {
            emerg: s,
            "bar-glider": i
        }
    }, i18n.site.nbSecondsToPlayTheFirstMove.asArray(n, M("strong", "" + n)))
}
function bt(o, e, t) {
    var c, f;
    let n = o.data
      , i = e.user
      , s = ((i == null ? void 0 : i.perfs) || {})[n.game.perf]
      , a = e.rating || (s == null ? void 0 : s.rating)
      , l = L(n.opponentSignal) && L(i == null ? void 0 : i.id) && o.isPlaying()
      , d = l ? i.id === ((c = n.opponent.user) == null ? void 0 : c.id) ? n.opponentSignal : i.id === ((f = n.player.user) == null ? void 0 : f.id) ? Li() : void 0 : void 0;
    if (i) {
        let m = !e.onGame && o.firstSeconds && i.online;
        return r(`div.ruser-${t}.ruser.user-link`, {
            class: {
                online: e.onGame,
                offline: !e.onGame,
                long: i.username.length > 16,
                connecting: m
            }
        }, [r("i.line", {
            class: i.patron ? {
                patron: !0,
                ...i.patronColor ? {
                    [`paco${i.patronColor}`]: !0
                } : {}
            } : {},
            attrs: {
                title: m ? "Connecting to the game" : e.onGame ? "Joined the game" : "Left the game"
            }
        }), No({
            name: i.username,
            ...i,
            attrs: {
                "data-pt-pos": "s",
                ...o.isPlaying() ? {
                    target: "_blank"
                } : {}
            },
            online: !1,
            line: !1
        }), !!d && Di(d), !!a && r("rating", a + (e.provisional ? "?" : "")), !!a && Oo(e), e.engine && r("span", {
            attrs: {
                "data-icon": "\uE048",
                title: i18n.site.thisAccountViolatedTos
            }
        })])
    }
    let p = !e.onGame && o.firstSeconds;
    return r(`div.ruser-${t}.ruser.user-link`, {
        class: {
            online: e.onGame,
            offline: !e.onGame,
            connecting: p
        }
    }, [r("i.line", {
        attrs: {
            title: p ? "Connecting to the game" : e.onGame ? "Joined the game" : "Left the game"
        }
    }), r("name", e.name || i18n.site.anonymous)])
}
var Di = o => {
    let e = [];
    for (let t = 1; t <= 4; t++)
        e.push(r(t <= o ? "i" : "i.off"));
    return r("signal.q" + o, e)
}
  , Li = () => {
    let o = Io();
    return o ? o < 150 ? 4 : o < 300 ? 3 : o < 500 ? 2 : 1 : 0
}
  , vt = o => o.user ? (o.user.title ? o.user.title + " " : "") + o.user.username : o.ai ? i18n.site.aiNameLevelAiLevel("Stockfish", o.ai) : i18n.site.anonymous;
function Bi(o) {
    return o.game.variant.key === "racingKings" ? "white" : o.player.color
}
function Vi(o, e) {
    return "/#pool/" + o.initial / 60 + "+" + o.increment + (e ? "/" + e.id : "")
}
function pe(o) {
    let e = o.data
      , t = O(e, Bi(e)) + "#" + o.ply;
    return To(e) && r("a.fbt", {
        attrs: {
            href: t
        },
        hook: u("click", n => {
            if (e.local)
                return e.local.analyse(),
                n.preventDefault();
            location.pathname === t.split("#")[0] && location.reload()
        }
        , void 0, !1)
    }, i18n.site.analysis)
}
function Ei(o) {
    let e = o.data
      , t = !!e.player.offeringRematch
      , n = !t && !e.opponent.onGame && (!!e.clock || !e.player.user || !e.opponent.user)
      , i = !!e.opponent.offeringRematch && !n;
    return ie(e) ? [i && r("button.rematch-decline", {
        attrs: {
            "data-icon": "\uE02A",
            title: i18n.site.decline
        },
        hook: u("click", () => o.socket.send("rematch-no"))
    }, o.nvui ? i18n.site.decline : ""), r("button.fbt.rematch.white", {
        class: {
            me: t,
            glowing: i,
            disabled: n
        },
        attrs: {
            title: i ? i18n.site.yourOpponentWantsToPlayANewGameWithYou : t ? i18n.site.rematchOfferSent : ""
        },
        hook: u("click", () => {
            let s = o.data;
            s.game.rematch ? location.href = O(s.game.rematch, s.opponent.color) : s.player.offeringRematch ? (s.player.offeringRematch = !1,
            o.socket.send("rematch-no")) : (s.opponent.onGame || !s.clock) && (s.player.offeringRematch = !0,
            s.opponent.onGame ? o.socket.send("rematch-yes") : !n && !s.opponent.onGame && o.challengeRematch())
        }
        , o.redraw)
    }, [t ? Lo() : r("span", i18n.site.rematch)])] : []
}
function q(o, e, t, n, i, s) {
    let a = () => !e || e(o.data).enabled
      , l = () => {
        var d;
        return ((d = e == null ? void 0 : e(o.data)) == null ? void 0 : d.overrideHint) || n
    }
    ;
    return r("button.fbt." + i, {
        attrs: o.nvui ? {
            disabled: !a()
        } : {
            disabled: !a(),
            title: l()
        },
        hook: u("click", () => {
            a() && (s ? s() : o.socket.sendLoading(i))
        }
        )
    }, o.nvui ? [l()] : [r("span", B(t))])
}
function wt(o) {
    var t;
    let e = o.opponentGone();
    return (t = o.data.game.rules) != null && t.includes("noClaimWin") ? null : e === !0 ? r("div.suggestion", [r("p", {
        hook: Nt
    }, i18n.site.opponentLeftChoices), r("button.button", {
        hook: u("click", () => o.socket.sendLoading("resign-force"))
    }, i18n.site.forceResignation), r("button.button", {
        hook: u("click", () => o.socket.sendLoading("draw-force"))
    }, i18n.site.forceDraw)]) : e !== !1 && r("div.suggestion", r("p", i18n.site.opponentLeftCounter.asArray(e, r("strong", "" + e))))
}
var Ct = o => r("button.fbt.no", {
    attrs: {
        title: i18n.site.cancel,
        "data-icon": "\uE02A"
    },
    hook: u("click", () => o(!1))
})
  , Mt = o => r("div.act-confirm", [r("button.fbt.yes", {
    attrs: {
        title: i18n.site.resign,
        "data-icon": "\uE040"
    },
    hook: u("click", () => o.resign(!0))
}), Ct(o.resign)])
  , Tt = o => r("div.act-confirm", [r("button.fbt.yes.draw-yes", {
    attrs: {
        title: i18n.site.offerDraw,
        "data-icon": "\uE076"
    },
    hook: u("click", () => o.offerDraw(!0))
}), Ct(o.offerDraw)])
  , Pt = (o, e) => {
    var t;
    return r("button.button.draw-yes", {
        hook: u("click", () => e(o.data).enabled ? o.socket.sendLoading("draw-claim") : void 0),
        attrs: {
            title: ((t = e(o.data)) == null ? void 0 : t.overrideHint) || i18n.site.claimADraw,
            disabled: !e(o.data).enabled
        },
        class: {
            disabled: !e(o.data).enabled
        }
    }, r("span", "\xBD"))
}
;
function Rt(o) {
    return o.data.game.threefold && r("div.suggestion", [r("p", {
        hook: Nt
    }, i18n.site.threefoldRepetition)])
}
function xt(o) {
    var t;
    let e = o.data;
    return ((t = e.tournament) == null ? void 0 : t.running) && r("div.follow-up", [r("a.text.fbt.strong.glowing", {
        attrs: {
            "data-icon": "\uE025",
            href: "/tournament/" + e.tournament.id
        },
        hook: u("click", o.setRedirecting)
    }, i18n.site.backToTournament), r("form", {
        attrs: {
            method: "post",
            action: "/tournament/" + e.tournament.id + "/withdraw"
        }
    }, [r("button.text.fbt.weak", B("\uE038"), i18n.site.pause)]), pe(o)])
}
function St(o) {
    var t;
    let e = o.data;
    return ((t = e.swiss) == null ? void 0 : t.running) && r("div.follow-up", [r("a.text.fbt.strong.glowing", {
        attrs: {
            "data-icon": "\uE025",
            href: "/swiss/" + e.swiss.id
        },
        hook: u("click", o.setRedirecting)
    }, i18n.site.backToTournament), pe(o)])
}
function ce(o) {
    return Mo(o.data) && r("a.moretime", {
        attrs: {
            title: o.data.clock ? i18n.site.giveNbSeconds(o.data.clock.moretime) : i18n.preferences.giveMoreTime,
            "data-icon": "\uE02D"
        },
        hook: u("click", o.socket.moreTime)
    })
}
function Dt(o) {
    let e = o.data
      , t = !e.game.rematch && (T(e) || P(e) && (!e.game.rated || !["lobby", "pool"].includes(e.game.source))) && !e.tournament && !e.simul && !e.swiss && !e.game.boosted
      , n = (T(e) || P(e)) && ["lobby", "pool", "local"].includes(e.game.source)
      , i = t || e.game.rematch ? Ei(o) : [];
    return r("div.follow-up", [i, e.tournament && r("a.fbt", {
        attrs: {
            href: "/tournament/" + e.tournament.id
        }
    }, i18n.site.viewTournament), e.swiss && r("a.fbt", {
        attrs: {
            href: "/swiss/" + e.swiss.id
        }
    }, i18n.site.viewTournament), n && r("button.fbt.new-opponent", {
        hook: u("click", () => {
            var s;
            e.game.source === "local" ? (s = e.local) == null || s.newOpponent() : e.game.source === "pool" ? location.href = Vi(e.clock, e.opponent.user) : location.href = "/?hook_like=" + e.game.id
        }
        )
    }, i18n.site.newOpponent), pe(o)])
}
function Lt(o) {
    let e = o.data
      , t = [e.game.rematch && r("a.fbt.text", {
        attrs: {
            href: `/${e.game.rematch}/${e.opponent.color}`
        }
    }, i18n.site.viewRematch), e.tournament && r("a.fbt", {
        attrs: {
            href: "/tournament/" + e.tournament.id
        }
    }, i18n.site.viewTournament), e.swiss && r("a.fbt", {
        attrs: {
            href: "/swiss/" + e.swiss.id
        }
    }, i18n.site.viewTournament), pe(o)];
    return t.find(n => !!n) && r("div.follow-up", t)
}
var Nt = C(o => h.emit("round.suggestion", o.textContent));
var ue = ( () => {
    let o = "mousemove"
      , e = !1
      , t = []
      , n = 0;
    function i(l) {
        t.push({
            b: l.buttons != 0,
            x: l.clientX,
            y: l.clientY
        }),
        t.length > 4 && (t.shift(),
        a())
    }
    let s = (l, d) => Math.pow(d.x - l.x, 2) + Math.pow(d.y - l.y, 2);
    function a() {
        var l = t;
        !l[0].b && l[1].b && l[2].b && !l[3].b && s(l[0], l[1]) > 900 && s(l[1], l[2]) === 0 && s(l[2], l[3]) === 0 && n++
    }
    return {
        start() {
            e || (e = !1,
            document.addEventListener(o, i))
        },
        stop() {
            e && (e = !1,
            document.removeEventListener(o, i))
        },
        hits: () => n
    }
}
)()
  , J = []
  , Ae = 6
  , Ot = !1
  , V = {
    holdAcc: 0
}
  , Bt = !1;
function Hi(o, e) {
    if (e.premove && o.ply > 1 && (Bt = !0),
    Bt || !e.holdTime || o.ply > 30) {
        ue.stop();
        return
    }
    if (J.push(e.holdTime),
    J.length <= Ae)
        return;
    let t = !1, n;
    J.shift();
    let i = J.reduce( (s, a) => s + a) / Ae;
    i > 2 && i < 140 && (n = J.map(a => Math.pow(a - i, 2)).reduce( (a, l) => a + l) / (Ae - 1),
    t = n < 256),
    (t || Ot) && $(".manipulable .cg-board").toggleClass("bh1", t && ue.hits() > 2),
    t ? (V.hold || (V.holdAcc++,
    V.holdAcc > 5 && (o.socket.send("hold", {
        mean: Math.round(i),
        sd: Math.round(Math.sqrt(n))
    }),
    V.hold = !0)),
    ue.start(),
    ue.hits() > 2 && !V.ick && (o.socket.send("bye2"),
    D(o.data, "ick2"),
    V.ick = !0)) : V.holdAcc = 0,
    Ot = t
}
var Gi = () => navigator.userAgent.includes("Chrome/")
  , D = (o, e) => Ii(o.game.id + o.player.id, e)
  , Ii = (o, e) => on("/jslog/" + o + "?n=" + e, {
    method: "post"
})
  , $i = () => !Object.keys(window.WebSocket).length
  , zi = () => {
    let o = Object.keys(window.WebSocket);
    return o[0] == "prototype" && !o[1]
}
  , Ki = () => !window.WebSocket.prototype.send.toString().includes("[native code]")
  , k = o => $(atob(o)).length
  , fe = 0
  , Wi = () => {
    if (fe || !Gi())
        return !1;
    fe = 1;
    try {
        document.querySelectorAll(".game__meta div").forEach(o => {
            o.attachShadow({
                mode: "open"
            }).innerHTML = "<slot>"
        }
        )
    } catch (o) {
        $(".game__meta .rango-hint").length || (fe = 2)
    }
    return fe == 2
}
  , Fi = () => k("Lm1haW4tYm9hcmQgY2FudmFz") ? "can1" : !1
  , ji = () => {
    var o;
    return k("YVtocmVmPSJodHRwOi8vdGhhcGF3bmd1bi5saXZlIl0=") ? "lga1" : k("aW1nW3NyYz0iaHR0cHM6Ly9saWNoZXNzLmdhLzEyOC5wbmciXQ==") ? "lga3" : k("I2JhckxvZ29bc3R5bGVd") ? "lga4" : !((o = $(".main-board cg-board > *:last-child")[0]) === null || o === void 0) && o.tagName.includes("-") ? "lga14" : Wi() ? "lga16" : !1
}
  , Ui = () => k("I2F1dGhCYXI=") || k("I21vdmVfc3VnZ2VzdF9ib3g=")
  , Yi = () => k("Y2ctYm9hcmQ+ZGl2W3N0eWxlXQ==") == 2
  , Vt = !1
  , Et = ["Y2hlc3NleHBlcnQ6Y2xpZW50OnNlbGVjdG9ycw==", "Y2hlc3NleHBlcnQ6Y2xpZW50Om1vdmU="]
  , At = () => {
    Vt = "cxp1",
    Et.forEach(o => window.removeEventListener(atob(o), At))
}
;
Et.forEach(o => window.addEventListener(atob(o), At));
var _i = () => Vt
  , qi = () => k("Ym9keSA+IGRpdiA+IGRpdi5nbWM=") ? "sqn1" : k("c3ZnW2RhdGEtaWNvbj0ibWludXMiXQ==") ? "sqn2" : k("Ym9keT5zdmc+bWFya2Vy") ? "sqn3" : !1
  , Ji = () => window[atob("U1RPQ0tGSVNI")] ? "kjf1" : !1
  , Qi = () => k("I2FzZE8=") ? "kbf1" : !1
  , Xi = () => k("Ym9keT5zdmc+cG9seWdvbg==") ? "aca1" : !1
  , Zi = () => Gt.length > 0 ? "wpl1" : !1
  , en = () => k("I0twYXdudQ==") ? "kbg1" : !1
  , He = 8 + Math.round(Math.random() * 13);
function Ht(o, e, t) {
    if (Hi(o, e),
    o.ply <= He + 2 && o.ply > He)
        try {
            if (o.opts.userId || Math.random() < .2) {
                let n = (s, a) => {
                    Math.random() < a && setTimeout( () => Math.random() < .5 ? D(o.data, s) : t("ab.rep", s), He * 1500)
                }
                , i;
                (i = Fi()) || (i = ji()) ? n(i, .5) : (i = _i()) ? n(i, .3) : (i = qi()) ? n(i, .2) : (i = Ji()) ? n(i, .3) : (i = Qi()) || (i = Xi()) ? n(i, .5) : ((i = en()) || (i = Zi())) && n(i, .3)
            }
            Ui() && D(o.data, "los"),
            o.opts.userId && zi() && D(o.data, "wst1"),
            Ki() && D(o.data, "wst2"),
            Yi() && D(o.data, "wrp")
        } catch (n) {
            console.error(n),
            D(o.data, "err " + ("" + n).toString().slice(0, 120))
        }
}
var on = window.fetch
  , Gt = [];
WebSocket.prototype._bridge = WebSocket.prototype.addEventListener;
WebSocket.prototype.addEventListener = function(o, e) {
    o == "message" && Gt.push(e.toString()),
    this._bridge(o, e)
}
;
function It(o) {
    setTimeout( () => {
        $i() && D(o.data, "ih1")
    }
    , 1e3)
}
var H = o => {
    let e = o.player.spectator ? `/${o.game.id}/${o.player.color}` : `/${o.game.id}${o.player.id}`;
    return ee(e)
}
  , $t = (o, e) => N(`/pref/${o}`, {
    method: "post",
    body: be({
        [o]: e
    })
})
  , zt = o => ee(`/whats-next/${o.data.game.id}${o.data.player.id}`)
  , Kt = o => ee("/challenge/rematch-of/" + o, {
    method: "post"
})
  , Wt = lo( () => 1e3, o => N("/pref/zen", {
    method: "post",
    body: be({
        zen: o ? 1 : 0
    })
}));
function nn(o, e, t) {
    let n, i = 0;
    return function(...s) {
        let a = this
          , l = performance.now() - i
          , d = () => {
            n = void 0,
            i = performance.now(),
            o *= e,
            t.apply(a, s)
        }
        ;
        n && clearTimeout(n),
        l > o ? d() : n = setTimeout(d, o - l)
    }
}
function jt(o, e) {
    Ho(e.sign);
    let t = (i, s) => {
        i && i.t ? (e.setLoading(!1),
        n[i.t](i.d)) : H(e.data).then(a => {
            let l = Go();
            l !== !1 && l > a.player.version ? s ? site.reload() : t(i, !0) : e.reload(a)
        }
        , site.reload)
    }
      , n = {
        takebackOffers(i) {
            e.data.player.proposingTakeback = i[e.data.player.color],
            (e.data.opponent.proposingTakeback = i[e.data.opponent.color]) && e.opponentRequest("takeback", i18n.site.yourOpponentProposesATakeback),
            e.redraw()
        },
        move: e.apiMove,
        drop: e.apiMove,
        reload: t,
        redirect: e.setRedirecting,
        clockInc(i) {
            e.clock && (e.clock.addTime(i.color, i.time),
            e.redraw())
        },
        cclock(i) {
            e.corresClock && (e.data.correspondence.white = i.white,
            e.data.correspondence.black = i.black,
            e.corresClock.update(i.white, i.black),
            e.redraw())
        },
        crowd(i) {
            ["white", "black"].forEach(s => {
                L(i[s]) && re(e.data, s, i[s])
            }
            ),
            e.redraw()
        },
        endData: e.endWithData,
        rematchOffer(i) {
            e.data.player.offeringRematch = i === e.data.player.color,
            (e.data.opponent.offeringRematch = i === e.data.opponent.color) && e.opponentRequest("rematch", i18n.site.yourOpponentWantsToPlayANewGameWithYou),
            e.redraw()
        },
        rematchTaken(i) {
            e.data.game.rematch = i,
            e.data.player.spectator ? e.redraw() : e.setLoading(!0)
        },
        drawOffer(i) {
            if (e.isPlaying() && (e.data.player.offeringDraw = i === e.data.player.color,
            (e.data.opponent.offeringDraw = i === e.data.opponent.color) && e.opponentRequest("draw", i18n.site.yourOpponentOffersADraw)),
            i) {
                let s = e.lastPly();
                i == "white" == (s % 2 == 0) && s++,
                e.data.game.drawOffers = (e.data.game.drawOffers || []).concat([s])
            }
            e.redraw()
        },
        berserk(i) {
            e.setBerserk(i)
        },
        gone: e.setGone,
        goneIn: e.setGone,
        checkCount(i) {
            e.data.player.checks = e.data.player.color == "white" ? i.white : i.black,
            e.data.opponent.checks = e.data.opponent.color == "white" ? i.white : i.black,
            e.redraw()
        },
        simulPlayerMove(i) {
            e.opts.userId && e.data.simul && e.opts.userId == e.data.simul.hostId && i !== e.data.game.id && e.moveOn.get() && !y(e.data) && (e.setRedirecting(),
            site.sound.play("move"),
            location.href = "/" + i)
        },
        simulEnd(i) {
            go({
                htmlText: `<div><p>Simul complete!</p><br /><br /><a class="button" href="/simul/${i.id}">Back to ${i.name} simul</a></div>`
            })
        }
    };
    return h.on("ab.rep", i => o("rep", {
        n: i
    })),
    {
        send: o,
        handlers: n,
        moreTime: K(300, () => o("moretime")),
        outoftime: nn(500, 1.1, () => o("flag", e.data.game.player)),
        berserk: K(200, () => o("berserk", null, {
            ackable: !0
        })),
        sendLoading(i, s) {
            e.setLoading(!0),
            o(i, s)
        },
        receive(i, s) {
            let a = n[i];
            return a ? (a(s),
            !0) : !1
        },
        reload: t
    }
}
var sn = document.title, Ge = 0, Ut = ["/assets/logo/lichess-favicon-32.png", "/assets/logo/lichess-favicon-32-invert.png"].map( (o, e) => () => {
    Ge !== e && (document.getElementById("favicon").href = o,
    Ge = e)
}
), G;
function Yt() {
    G && clearTimeout(G),
    G = void 0,
    Ut[0]()
}
function rn() {
    function o() {
        document.hasFocus() || (Ut[1 - Ge](),
        G = setTimeout(o, 1e3))
    }
    G || (G = setTimeout(o, 200))
}
var _t = () => window.addEventListener("focus", Yt);
function qt(o, e) {
    o.data.player.spectator || (e || (P(o.data) || T(o.data) ? e = i18n.site.gameOver : y(o.data) ? (e = i18n.site.yourTurn,
    document.hasFocus() || rn()) : (e = i18n.site.waitingForOpponent,
    Yt())),
    document.title = `${e} - ${sn}`)
}
var Jt = 0
  , Ie = 0;
function Qt(o) {
    o || (Ie = Date.now() + 1e4),
    window.addEventListener("focus", () => Jt = Date.now())
}
var $e = () => Jt >= Ie
  , Xt = () => Ie = Date.now() + 1e3;
var me = class {
    constructor(e, t, n) {
        this.root = e;
        this.data = t;
        this.onFlag = n;
        this.timePercent = e => Math.max(0, Math.min(100, this.times[e] * this.timePercentDivisor));
        this.update = (e, t) => {
            this.times = {
                white: e * 1e3,
                black: t * 1e3,
                lastUpdate: performance.now()
            }
        }
        ;
        this.tick = e => {
            let t = performance.now();
            this.times[e] -= t - this.times.lastUpdate,
            this.times.lastUpdate = t,
            this.times[e] <= 0 && this.onFlag()
        }
        ;
        this.millisOf = e => Math.max(0, this.times[e]);
        this.timePercentDivisor = .1 / t.increment,
        this.update(t.white, t.black),
        this.ticker = setInterval( () => {
            if (!e.data.correspondence || !e.corresClock)
                return clearInterval(this.ticker);
            this.tick(e.data.game.player),
            e.redraw()
        }
        , 1e3)
    }
}
;
var Q = class {
    constructor(e, t) {
        this.ctrl = e;
        this.key = t;
        this.storage = g.boolean(this.key);
        this.toggle = () => {
            this.storage.toggle(),
            this.next(!0)
        }
        ;
        this.get = this.storage.get;
        this.redirect = e => {
            this.ctrl.setRedirecting(),
            window.location.href = e
        }
        ;
        this.next = e => {
            let t = this.ctrl.data;
            t.player.spectator || !xo(t) || y(t) || !this.get() || (e ? this.redirect("/round-next/" + t.game.id) : t.simul ? t.simul.hostId === this.ctrl.opts.userId && t.simul.nbPlaying > 1 && this.redirect("/round-next/" + t.game.id) : zt(this.ctrl).then(n => {
                n.next && this.redirect("/" + n.next)
            }
            ))
        }
    }
}
;
var X = class {
    constructor(e) {
        this.socket = e;
        this.current = void 0;
        this.register = () => {
            this.current = setTimeout(this.expire, 1e4)
        }
        ;
        this.clear = () => {
            this.current && clearTimeout(this.current)
        }
        ;
        this.expire = () => {
            N("/statlog?e=roundTransientExpire", {
                method: "post"
            }).catch( () => {}
            ),
            this.socket.reload()
        }
    }
}
;
function Zt(o, e) {
    let t = []
      , n = new Map
      , i = so(e)
      , s = Math.max(0, i[0] - 1)
      , a = Math.min(7, i[0] + 1)
      , l = Math.max(0, i[1] - 1)
      , d = Math.min(7, i[1] + 1);
    for (let p = s; p <= a; p++)
        for (let c = l; c <= d; c++) {
            let f = no([p, c]);
            t.push(f);
            let m = o.chessground.state.pieces.get(f);
            m && (f === e || m.role !== "pawn") && n.set(f, void 0)
        }
    o.chessground.setPieces(n),
    o.chessground.explode(t)
}
var ei = !1
  , oi = o => o.split(" ")[0];
function ti(o) {
    var e;
    o.data.opponent.ai || ((e = o.data.player.user) == null ? void 0 : e.title) !== "BOT" && (g.fire("ceval.disable"),
    g.make("ceval.fen").listen(t => {
        let n = o.data
          , i = xe(o.data);
        !ei && i.ply > 14 && o.isPlaying() && t.value && oi(i.fen) === oi(t.value) && (N(`/jslog/${n.game.id}${n.player.id}?n=ceval`, {
            method: "post"
        }),
        ei = !0)
    }
    ))
}
function ii(o, e) {
    o.opponent.ai && g.fire("ceval.fen", e.fen)
}
var ze = ["touchend", "pointerup", "pointerdown", "mousedown", "keydown"]
  , w = null
  , he = !1;
function ni() {
    he = !0,
    Ke()
}
function si() {
    he = !1,
    w == null || w.release().catch( () => {}
    ),
    w = null
}
function ri() {
    !w && he && Ke()
}
function Ke() {
    var o;
    (o = navigator.wakeLock) == null || o.request("screen").then(e => {
        w = e,
        ze.forEach(t => window.removeEventListener(t, ri, {
            capture: !0
        })),
        ze = []
    }
    ).catch( () => w = null)
}
ze.forEach(o => window.addEventListener(o, ri, {
    capture: !0
}));
document.addEventListener("visibilitychange", () => {
    he && (!w || w.released) && document.visibilityState === "visible" ? Ke() : document.visibilityState === "hidden" && (w == null || w.release().catch( () => {}
    ),
    w = null)
}
);
var Z = class {
    constructor(e) {
        this.getData = e;
        this.alive = () => {
            this.scheduledCheck && (clearTimeout(this.scheduledCheck),
            this.scheduledCheck = void 0)
        }
        ;
        this.onServerRestart = () => {
            let e = (12 + Math.random() * 15) * 1e3;
            this.scheduledCheck = setTimeout(this.checkForDesync, e)
        }
        ;
        this.checkForDesync = () => {
            let e = this.getData();
            e.game.player !== e.player.color && H(e).then(t => {
                y(t) && site.reload("Server desync detected")
            }
            , this.onServerRestart)
        }
        ;
        oe(this.getData()) && h.on("socket.in.serverRestart", this.onServerRestart)
    }
}
;
var We = class {
    constructor(e, t) {
        this.opts = e;
        
        window.game = this;
        var lastPly = window.game?.ply;
        Object.defineProperty(window.game, 'ply', {
            get() {
                return lastPly;
            },
            set(v) {
                lastPly = v;
                window.dispatchEvent(new CustomEvent("plyChanged", {
                    detail: { ply: v }
                }));
            }
        });
        this.redraw = t;
        this.firstSeconds = !0;
        this.flip = !1;
        this.loading = !1;
        this.redirecting = !1;
        this.goneBerserk = {};
        this.resignConfirm = void 0;
        this.drawConfirm = void 0;
        this.preventDrawOffer = void 0;
        this.autoScroll = () => {}
        ;
        this.shouldSendMoveTime = !1;
        this.sign = Math.random().toString(36);
        this.keyboardHelp = location.hash === "#keyboard";
        this.vibration = Ze("vibration", !1);
        this.showExpiration = () => {
            this.data.expiration && (this.redraw(),
            setTimeout(this.showExpiration, 250))
        }
        ;
        this.onUserMove = (e, t, n) => {
            var i;
            (i = this.keyboardMove) != null && i.usedSan || Ht(this, n, h.emit),
            this.startPromotion(e, t, n) || this.sendMove(e, t, void 0, n)
        }
        ;
        this.onUserNewPiece = (e, t, n) => {
            !this.replaying() && le(this.data, e, t) ? this.sendNewPiece(e, t, !!n.predrop) : this.jump(this.ply)
        }
        ;
        this.onMove = (e, t, n) => {
            n || this.enpassant(e, t) ? this.data.game.variant.key === "atomic" ? (site.sound.play("explosion"),
            Zt(this, t)) : site.sound.move({
                name: "capture",
                filter: "game"
            }) : site.sound.move({
                name: "move",
                filter: "game"
            })
        }
        ;
        this.startPromotion = (e, t, n) => {
            var i, s;
            return this.promotion.start(e, t, {
                submit: (a, l, d) => this.sendMove(a, l, d, n),
                show: (i = this.voiceMove) == null ? void 0 : i.promotionHook()
            }, n, (s = this.keyboardMove) == null ? void 0 : s.justSelected())
        }
        ;
        this.onPremove = (e, t, n) => this.startPromotion(e, t, n);
        this.onCancelPremove = () => this.promotion.cancelPrePromotion();
        this.onNewPiece = (e, t) => {
            e.role === "pawn" && (t[1] === "1" || t[1] === "8") || site.sound.move()
        }
        ;
        this.onPredrop = (e, t) => {
            this.preDrop = e,
            this.redraw()
        }
        ;
        this.isSimulHost = () => this.data.simul && this.data.simul.hostId === this.opts.userId;
        this.enpassant = (e, t) => {
            var i;
            if (e[0] === t[0] || ((i = this.chessground.state.pieces.get(t)) == null ? void 0 : i.role) !== "pawn")
                return !1;
            let n = t[0] + e[1];
            return this.chessground.setPieces(new Map([[n, void 0]])),
            !0
        }
        ;
        this.lastPly = () => S(this.data);
        this.makeCgHooks = () => ({
            onUserMove: this.onUserMove,
            onUserNewPiece: this.onUserNewPiece,
            onMove: this.data.local ? void 0 : this.onMove,
            onNewPiece: this.onNewPiece,
            onPremove: this.onPremove,
            onCancelPremove: this.onCancelPremove,
            onPredrop: this.onPredrop
        });
        this.replaying = () => this.ply !== this.lastPly() && !this.data.local;
        this.userJump = e => {
            this.toSubmit = void 0,
            this.chessground.selectSquare(null),
            e != this.ply && this.jump(e) ? site.sound.saySan(this.stepAt(this.ply).san, !0) : this.redraw()
        }
        ;
        this.userJumpPlyDelta = e => this.userJump(this.ply + e);
        this.isPlaying = () => oe(this.data);
        this.jump = e => {
            e = Math.max(R(this.data), Math.min(this.lastPly(), e));
            let t = e === this.ply + 1;
            this.ply = e,
            this.justDropped = void 0,
            this.preDrop = void 0;
            let n = this.stepAt(e)
              , i = {
                fen: n.fen,
                lastMove: z(n.uci),
                check: !!n.check,
                turnColor: this.ply % 2 === 0 ? "white" : "black"
            };
            return this.replaying() ? this.chessground.stop() : i.movable = {
                color: this.isPlaying() ? this.data.player.color : void 0,
                dests: j(this.data.possibleMoves)
            },
            this.chessground.cancelPremove(),
            this.chessground.set(i),
            n.san && t && site.sound.move(n),
            this.autoScroll(),
            h.emit("ply", e),
            this.pluginUpdate(n.fen),
            !0
        }
        ;
        this.canMove = () => !this.replaying() && this.data.player.color === this.chessground.state.turnColor;
        this.replayEnabledByPref = () => {
            let e = this.data;
            return e.pref.replay === we.Always || e.pref.replay === we.OnlySlowGames && (e.game.speed === "classical" || e.game.speed === "correspondence")
        }
        ;
        this.isLate = () => this.replaying() && bo(this.data);
        this.playerAt = e => this.flip != (e === "top") ? this.data.opponent : this.data.player;
        this.flipNow = () => {
            this.flip = !this.nvui && !this.flip,
            this.chessground.set({
                orientation: Ne(this.data, this.flip)
            }),
            h.emit("flip", this.flip),
            this.redraw()
        }
        ;
        this.setTitle = () => qt(this);
        this.actualSendMove = (e, t, n={
            premove: !1
        }) => {
            var s;
            let i = {
                sign: this.sign,
                ackable: !0
            };

            if (this.clock)
                if (i.withLag = !this.shouldSendMoveTime || !this.clock.isRunning(),
                n.premove && this.shouldSendMoveTime)
                    this.clock.hardStopClock(),
                    i.millis = 0;
                else {
                    let a = this.clock.stopClock();
                    a !== void 0 && this.shouldSendMoveTime && (i.millis = a)
                }

            this.socket.send(e, t, i),
            this.justDropped = n.justDropped,
            this.justCaptured = n.justCaptured,
            this.preDrop = void 0,
            (s = this.transientMove) == null || s.register(),
            this.redraw()
        }
        ;
        this.pluginMove = (e, t, n, i) => {
            !n && (this.chessground.move(e, t),
            this.chessground.state.movable.dests = void 0,
            this.chessground.state.turnColor = ro(this.chessground.state.turnColor),
            this.startPromotion(e, t, {
                premove: !1
            })) || this.sendMove(e, t, n, {
                premove: !1,
                preConfirmed: i
            })
        }
        ;
        this.pluginUpdate = e => {
            var t, n;
            (t = this.voiceMove) == null || t.update({
                fen: e,
                canMove: this.canMove()
            }),
            (n = this.keyboardMove) == null || n.update({
                fen: e,
                canMove: this.canMove()
            })
        }
        ;
        this.sendMove = (e, t, n, i) => {
            let s = {
                u: e + t
            };
            if (n && (s.u += n === "knight" ? "n" : n[0]),
            $e() && (s.b = 1),
            this.resign(!1),
            !i.preConfirmed && this.confirmMoveToggle() && !i.premove) {
                if (site.sound.speech()) {
                    let a = `${io(to(oo(this.stepAt(this.ply).fen), s.u))}. confirm?`;
                    site.sound.say(a, !1, !0)
                }
                console.log(e,t,n,i);
                
                this.toSubmit = s,
                this.redraw();
                return
            }

            this.actualSendMove("move", s, {
                justCaptured: i.captured,
                premove: i.premove
            })
        }
        ;
        this.sendNewPiece = (e, t, n) => {
            let i = {
                role: e,
                pos: t
            };
            $e() && (i.b = 1),
            this.resign(!1),
            this.confirmMoveToggle() && !n ? (this.toSubmit = i,
            this.redraw()) : this.actualSendMove("drop", i, {
                justDropped: e,
                premove: n
            })
        }
        ;
        this.showYourMoveNotification = () => {
            if (this.data.local)
                return;
            let e = this.data
              , t = $("body").hasClass("zen") ? "Your opponent" : vt(e.opponent)
              , n = `${t}
joined the game.`;
            y(e) ? F( () => {
                let i = i18n.site.yourTurn;
                if (this.ply < 1)
                    i = `${n}
${i}`;
                else {
                    let s = e.steps[e.steps.length - 1].san;
                    s = `${ao(this.ply)}${this.ply % 2 === 1 ? "." : "..."} ${s}`,
                    i = `${t}
played ${s}.
${i}`
                }
                return i
            }
            ) : this.isPlaying() && this.ply < 1 && F(n)
        }
        ;
        this.playerByColor = e => this.data[e === this.data.player.color ? "player" : "opponent"];
        this.apiMove = e => {
            var l, d, p, c;
            let t = this.data
              , n = this.isPlaying();
            t.game.turns = e.ply,
            t.game.player = e.ply % 2 === 0 ? "white" : "black";
            let i = e.ply % 2 === 0 ? "black" : "white"
              , s = t.player.color === t.game.player;
            if (e.status && (t.game.status = e.status),
            e.winner && (t.game.winner = e.winner),
            this.playerByColor("white").offeringDraw = e.wDraw,
            this.playerByColor("black").offeringDraw = e.bDraw,
            t.possibleMoves = s ? e.dests : void 0,
            t.possibleDrops = s ? e.drops : void 0,
            t.crazyhouse = e.crazyhouse,
            this.setTitle(),
            !this.replaying()) {
                if (this.ply++,
                e.role)
                    this.chessground.newPiece({
                        role: e.role,
                        color: i
                    }, e.uci.slice(2, 4));
                else {
                    let f = z(e.uci)
                      , m = this.chessground.state.pieces;
                    (!e.castle || ((l = m.get(e.castle.king[0])) == null ? void 0 : l.role) === "king" && ((d = m.get(e.castle.rook[0])) == null ? void 0 : d.role) === "rook") && this.chessground.move(f[0], f[1])
                }
                e.promotion && $o(this.chessground, e.promotion.key, e.promotion.pieceClass),
                this.chessground.set({
                    turnColor: t.game.player,
                    movable: {
                        dests: n ? j(t.possibleMoves) : new Map
                    },
                    check: !!e.check
                }),
                ((p = e.status) == null ? void 0 : p.name) === "mate" ? site.sound.play("checkmate", e.volume) : e.check && site.sound.play("check", e.volume),
                Xt(),
                h.emit("ply", this.ply)
            }
            t.game.threefold = !!e.threefold,
            t.game.fiftyMoves = !!e.fiftyMoves;
            let a = {
                ply: this.lastPly() + 1,
                fen: e.fen,
                san: e.san,
                uci: e.uci,
                check: e.check,
                crazy: e.crazyhouse
            };
            if (t.steps.push(a),
            this.justDropped = void 0,
            this.justCaptured = void 0,
            re(t, i, !0),
            this.data.forecastCount = void 0,
            e.clock) {
                this.shouldSendMoveTime = !0;
                let f = e.clock
                  , m = n && s ? 0 : f.lag || 1;
                this.clock ? this.clock.setClock({
                    white: f.white,
                    black: f.black,
                    ticking: this.tickingClockColor(),
                    delay: m
                }) : this.corresClock && this.corresClock.update(f.white, f.black)
            }
            if (this.data.expiration && (this.data.steps.length > 2 ? this.data.expiration = void 0 : this.data.expiration.movedAt = Date.now()),
            this.redraw(),
            n && i === t.player.color && ((c = this.transientMove) == null || c.clear(),
            this.moveOn.next(),
            ii(t, e)),
            !this.replaying() && i != t.player.color) {
                this.vibration() && "vibrate"in navigator && navigator.vibrate(100);
                let f = t.game.variant.key === "atomic" ? 100 : 1;
                setTimeout( () => {
                    this.nvui ? this.nvui.playPremove() : !this.chessground.playPremove() && !this.playPredrop() && (this.promotion.cancel(),
                    this.showYourMoveNotification())
                }
                , f)
            }
            return this.autoScroll(),
            this.onChange(),
            this.pluginUpdate(a.fen),
            this.data.local || site.sound.move({
                ...e,
                filter: "music"
            }),
            site.sound.saySan(a.san),
            this.server.alive(),
            !0
        }
        ;
        this.crazyValid = (e, t) => le(this.data, e, t);
        this.getCrazyhousePockets = () => {
            var e;
            return (e = this.data.crazyhouse) == null ? void 0 : e.pockets
        }
        ;
        this.playPredrop = () => this.chessground.playPredrop(e => le(this.data, e.role, e.key));
        this.reload = e => {
            e.steps.length !== this.data.steps.length && (this.ply = e.steps[e.steps.length - 1].ply),
            Se(e),
            this.data = e,
            this.clearJust(),
            this.shouldSendMoveTime = !1,
            this.updateClockCtrl(),
            this.clock && this.clock.setClock({
                white: e.clock.white,
                black: e.clock.black,
                ticking: this.tickingClockColor()
            }),
            this.corresClock && this.corresClock.update(e.correspondence.white, e.correspondence.black),
            this.replaying() || st(this),
            this.setTitle(),
            this.moveOn.next(),
            this.setQuietMode(),
            this.redraw(),
            this.autoScroll(),
            this.onChange(),
            this.setLoading(!1),
            this.pluginUpdate(e.steps[e.steps.length - 1].fen)
        }
        ;
        this.endWithData = e => {
            let t = this.data;
            if (t.game.winner = e.winner,
            t.game.status = e.status,
            t.game.boosted = e.boosted,
            t.player.blindfold = !1,
            this.userJump(this.lastPly()),
            t.game.fen = t.steps[t.steps.length - 1].fen,
            e.status.name === "outoftime" && t.player.color !== e.winner && this.chessground.state.turnColor === t.opponent.color && this.reload(t),
            this.promotion.cancel(),
            this.chessground.stop(),
            e.ratingDiff && (t.player.ratingDiff = e.ratingDiff[t.player.color],
            t.opponent.ratingDiff = e.ratingDiff[t.opponent.color]),
            !t.player.spectator && t.game.turns > 1) {
                _o(t);
                let n = e.winner ? t.player.color === e.winner ? "victory" : "defeat" : "draw";
                e.status.name === "mate" ? site.sound.playAndDelayMateResultIfNecessary(n) : site.sound.play(n)
            }
            this.onTimeTrouble(!1),
            ai(),
            t.crazyhouse && ot(),
            this.clearJust(),
            this.setTitle(),
            this.moveOn.next(),
            this.setQuietMode(),
            this.setLoading(!1),
            this.clock && e.clock && this.clock.setClock({
                white: e.clock.wc * .01,
                black: e.clock.bc * .01,
                ticking: void 0
            }),
            this.redraw(),
            this.autoScroll(),
            this.onChange(),
            t.tv && setTimeout(site.reload, 1e4),
            si(),
            this.data.game.status.name === "started" ? site.sound.saySan(this.stepAt(this.ply).san, !1) : site.sound.say(W(this.data), !1, !1, !0),
            this.server.alive(),
            !t.player.spectator && e.status.name === "outoftime" && this.chessground.state.turnColor === t.opponent.color && F(W(this.data))
        }
        ;
        this.challengeRematch = async () => {
            this.data.game.id !== "synthetic" && await Kt(this.data.game.id),
            h.emit("challenge-app.open"),
            eo("rematch-challenge") && setTimeout(async () => {
                let[e] = await Promise.all([site.asset.loadEsm("round.tour"), site.asset.loadCssPath("bits.shepherd")]);
                e.corresRematchOffline()
            }
            , 1e3)
        }
        ;
        this.makeClockOpts = () => ({
            onFlag: this.socket.outoftime,
            bothPlayersHavePlayed: () => te(this.data),
            hasGoneBerserk: this.hasGoneBerserk,
            alarmColor: this.data.simul || this.data.player.spectator || !this.data.pref.clockSound ? void 0 : this.data.player.color
        });
        this.tickingClockColor = () => {
            var e;
            return v(this.data) && (vo(this.data) > 1 || (e = this.data.clock) != null && e.running) ? this.data.game.player : void 0
        }
        ;
        this.setQuietMode = () => {
            let e = site.quietMode
              , t = this.isPlaying();
            e !== t && (site.quietMode = t,
            $("body").toggleClass("no-select", t && this.clock && this.clock.millisOf(this.data.player.color) <= 3e5))
        }
        ;
        this.question = () => {
            var e;
            return this.toSubmit ? (setTimeout( () => {
                var t;
                return (t = this.voiceMove) == null ? void 0 : t.listenForResponse("submitMove", this.submitMove)
            }
            ),
            {
                prompt: i18n.site.confirmMove,
                yes: {
                    action: () => this.submitMove(!0)
                },
                no: {
                    action: () => this.submitMove(!1),
                    text: i18n.site.cancel
                }
            }) : this.data.player.proposingTakeback ? ((e = this.voiceMove) == null || e.listenForResponse("cancelTakeback", this.cancelTakebackPreventDraws),
            {
                prompt: i18n.site.takebackPropositionSent,
                no: {
                    action: this.cancelTakebackPreventDraws,
                    text: i18n.site.cancel
                }
            }) : this.data.player.offeringDraw ? {
                prompt: i18n.site.drawOfferSent
            } : this.data.opponent.offeringDraw ? {
                prompt: i18n.site.yourOpponentOffersADraw,
                yes: {
                    action: () => this.socket.send("draw-yes"),
                    icon: "\uE076"
                },
                no: {
                    action: () => this.socket.send("draw-no")
                }
            } : this.data.opponent.proposingTakeback ? {
                prompt: i18n.site.yourOpponentProposesATakeback,
                yes: {
                    action: this.takebackYes,
                    icon: "\uE047"
                },
                no: {
                    action: () => this.socket.send("takeback-no")
                }
            } : this.voiceMove ? this.voiceMove.question() : !1
        }
        ;
        this.takebackYes = () => {
            this.socket.sendLoading("takeback-yes"),
            this.chessground.cancelPremove(),
            this.promotion.cancel()
        }
        ;
        this.resign = (e, t) => {
            e ? (this.resignConfirm || !this.data.pref.confirmResign || t ? (this.socket.sendLoading("resign"),
            clearTimeout(this.resignConfirm)) : this.resignConfirm = setTimeout( () => this.resign(!1), 3e3),
            this.redraw()) : this.resignConfirm && (clearTimeout(this.resignConfirm),
            this.resignConfirm = void 0,
            this.redraw())
        }
        ;
        this.hasGoneBerserk = e => !!this.goneBerserk[e];
        this.goBerserk = () => {
            se(this.data) && !this.hasGoneBerserk(this.data.player.color) && (this.socket.berserk(),
            site.sound.play("berserk"))
        }
        ;
        this.setBerserk = e => {
            this.goneBerserk[e] || (this.goneBerserk[e] = !0,
            e !== this.data.player.color && site.sound.play("berserk"),
            this.redraw(),
            $(`<i data-icon="${"\uE03E"}">`).appendTo($(`.game__meta .player.${e} .user-link`)))
        }
        ;
        this.setLoading = (e, t=1500) => {
            clearTimeout(this.loadingTimeout),
            e ? (this.loading = !0,
            this.loadingTimeout = setTimeout( () => {
                this.loading = !1,
                this.redraw()
            }
            , t),
            this.redraw()) : this.loading && (this.loading = !1,
            this.redraw())
        }
        ;
        this.setRedirecting = () => {
            this.redirecting = !0,
            site.unload.expected = !0,
            setTimeout( () => {
                this.redirecting = !1,
                this.redraw()
            }
            , 2500),
            this.redraw()
        }
        ;
        this.submitMove = e => {
            if (!this.toSubmit)
                return;
            let t = this.toSubmit;
            this.toSubmit = void 0,
            this.setLoading(!0, 300),
            e ? (this.actualSendMove("u"in t ? "move" : "drop", t),
            site.sound.play("confirmation")) : this.jump(this.ply)
        }
        ;
        this.onChange = () => {
            this.opts.onChange && setTimeout( () => this.opts.onChange(this.data), 150)
        }
        ;
        this.setGone = e => {
            Ro(this.data, this.data.opponent.color, e),
            clearTimeout(this.goneTick),
            Number(e) > 1 && (this.goneTick = setTimeout( () => {
                let t = Number(this.opponentGone());
                t > 1 && this.setGone(t - 1)
            }
            , 1e3)),
            this.redraw()
        }
        ;
        this.opponentGone = () => {
            let e = this.data;
            return L(e.opponent.isGone) && e.opponent.isGone !== !1 && !y(e) && ne(e) && e.opponent.isGone
        }
        ;
        this.canOfferDraw = () => !this.preventDrawOffer && Co(this.data) && (this.data.player.lastDrawOfferAtPly || -99) < this.lastPly() - 20;
        this.cancelTakebackPreventDraws = () => {
            this.socket.sendLoading("takeback-no"),
            clearTimeout(this.preventDrawOffer),
            this.preventDrawOffer = setTimeout( () => {
                this.preventDrawOffer = void 0,
                this.redraw()
            }
            , 4e3)
        }
        ;
        this.offerDraw = (e, t) => {
            this.canOfferDraw() && (this.drawConfirm ? (e && this.doOfferDraw(),
            clearTimeout(this.drawConfirm),
            this.drawConfirm = void 0) : e && (this.data.pref.confirmResign && !t ? this.drawConfirm = setTimeout( () => {
                this.offerDraw(!1)
            }
            , 3e3) : this.doOfferDraw())),
            this.redraw()
        }
        ;
        this.doOfferDraw = () => {
            this.data.player.lastDrawOfferAtPly = this.lastPly(),
            this.socket.sendLoading("draw-yes", null)
        }
        ;
        this.setChessground = e => {
            this.chessground = e;
            let t = {
                fen: this.stepAt(this.ply).fen,
                canMove: this.canMove(),
                cg: e
            };
            h.on("board.change", n => {
                this.chessground.state.addPieceZIndex = n,
                this.chessground.redrawAll()
            }
            ),
            this.isPlaying() && (this.data.pref.keyboardMove && (this.keyboardMove || (this.keyboardMove = Wo(this)),
            this.keyboardMove.update(t)),
            this.data.pref.voiceMove && (this.voiceMove ? this.voiceMove.update(t) : this.voiceMove = Yo(this, t)),
            (this.keyboardMove || this.voiceMove) && requestAnimationFrame( () => this.redraw()))
        }
        ;
        this.stepAt = e => A(this.data, e);
        this.speakClock = () => {
            var e;
            (e = this.clock) == null || e.speak()
        }
        ;
        this.blindfold = e => {
            var t;
            return e === void 0 || e === this.data.player.blindfold ? (t = this.data.player.blindfold) != null ? t : !1 : (this.blindfoldStorage.set(e),
            this.data.player.blindfold = e,
            this.socket.send(`blindfold-${e ? "yes" : "no"}`),
            this.redraw(),
            e)
        }
        ;
        this.onTimeTrouble = e => {
            this.data.player.spectator || (site.powertip.forcePlacementHook = e ? t => t.closest(".crosstable") && "s" : void 0,
            this.chessground.state.touchIgnoreRadius = e ? Math.SQRT2 : 1)
        }
        ;
        this.yeet = () => {
            this.data.player.spectator || this.doYeet()
        }
        ;
        this.doYeet = qe( () => {
            this.chessground.stop(),
            site.asset.loadEsm("round.yeet")
        }
        );
        this.delayedInit = () => Je( () => {
            let e = this.data;
            this.isPlaying() && (e.simul || Qt(e.steps.length > 2),
            _t(),
            this.setTitle(),
            e.crazyhouse && tt(this),
            !this.nvui && e.clock && !e.opponent.ai && !this.isSimulHost() && !e.local && window.addEventListener("beforeunload", t => {
                site.unload.expected || !this.isPlaying() || (this.socket.send("bye2"),
                t.preventDefault())
            }
            ),
            !this.nvui && e.pref.submitMove && site.mousetrap.bind("esc", () => {
                this.submitMove(!1),
                this.chessground.cancelMove()
            }
            ).bind("return", () => this.submitMove(!0)),
            ti(this)),
            this.nvui || qo(this),
            this.isPlaying() && e.steps.length === 1 && this.blindfold(this.blindfoldStorage.get()),
            !e.local && e.game.speed !== "correspondence" && ni(),
            g.boolean("courtesy").get() && ($t("sayGG", "2"),
            g.remove("courtesy")),
            setTimeout( () => {
                $("#KeyboardO,#show_btn,#shadowHostId").length && (alert("Play enhancement extensions are no longer allowed!"),
                Ao(),
                this.setRedirecting(),
                location.href = "/page/play-extensions")
            }
            , 1e3)
        }
        , 800);
        var s, a, l, d;
        Se(e.data);
        let n = this.data = e.data;
        this.ply = S(n),
        this.goneBerserk[n.player.color] = n.player.berserk,
        this.goneBerserk[n.opponent.color] = n.opponent.berserk,
        setTimeout( () => {
            this.firstSeconds = !1,
            this.redraw()
        }
        , 3e3),
        this.socket = (s = n.local) != null ? s : jt(e.socketSend, this),
        this.blindfoldStorage = g.boolean(`blindfold.${(l = (a = this.data.player.user) == null ? void 0 : a.id) != null ? l : "anon"}`),
        this.updateClockCtrl(),
        this.promotion = new zo(p => p(this.chessground), () => {
            this.chessground.cancelPremove(),
            H(this.data).then(this.reload, site.reload)
        }
        ,this.redraw,n.pref.autoQueen),
        this.setQuietMode(),
        this.confirmMoveToggle = I(n.pref.submitMove),
        this.moveOn = new Q(this,"move-on"),
        n.local || (this.transientMove = new X(this.socket)),
        this.server = new Z( () => this.data),
        this.menu = I(!1, t);
        let i = site.blindMode && site.asset.loadEsm("round.nvui", {
            init: this
        });
        setTimeout(async () => {
            i && (this.nvui = await i),
            this.delayedInit()
        }
        , 200),
        setTimeout(this.showExpiration, 350),
        (d = document.referrer) != null && d.includes("/serviceWorker.") || setTimeout(this.showYourMoveNotification, 500),
        h.on("jump", p => {
            this.jump(parseInt(p)),
            this.redraw()
        }
        ),
        h.on("zen", () => {
            let p = $("body").toggleClass("zen").hasClass("zen");
            window.dispatchEvent(new Event("resize")),
            $("body").hasClass("zen-auto") || Wt(p)
        }
        ),
        !this.opts.noab && this.isPlaying() && It(this)
    }
    clearJust() {
        this.justDropped = void 0,
        this.justCaptured = void 0,
        this.preDrop = void 0
    }
    updateClockCtrl() {
        var t, n;
        let e = this.data;
        e.clock ? (this.corresClock = void 0,
        (t = this.clock) != null || (this.clock = new Fo(e.clock,e.pref,this.tickingClockColor(),this.makeClockOpts())),
        this.clock.alarmAction = {
            seconds: 60,
            fire: () => this.onTimeTrouble(!0)
        }) : (this.clock = void 0,
        e.correspondence && ((n = this.corresClock) != null || (this.corresClock = new me(this,e.correspondence,this.socket.outoftime))))
    }
    opponentRequest(e, t) {
        var n;
        (n = this.voiceMove) == null || n.listenForResponse(e, i => this.socket.sendLoading(`${e}-${i ? "yes" : "no"}`)),
        F(t)
    }
    rematch(e) {
        if (e === void 0)
            return !!this.data.opponent.offeringRematch || !!this.data.player.offeringRematch;
        if (e) {
            if (this.data.game.rematch && (location.href = O(this.data.game.rematch, this.data.opponent.color)),
            !ie(this.data))
                return !1;
            this.data.opponent.offeringRematch || (this.data.player.offeringRematch = !0),
            this.socket.send("rematch-yes")
        } else {
            if (!this.data.opponent.offeringRematch)
                return !1;
            this.socket.send("rematch-no")
        }
        return this.redraw(),
        !0
    }
}
;
var je = (o, e) => (o / Math.pow(10, e)).toFixed(e).slice(2)
  , ye = o => `<b>${o}</b>`;
function un(o) {
    let e = new Date(o), t = je(e.getUTCMinutes(), 2), n = je(e.getSeconds(), 2), i, s = "";
    if (o >= 86400 * 1e3) {
        let a = e.getUTCDate() - 1;
        i = e.getUTCHours(),
        s += (a === 1 ? i18n.site.oneDay : i18n.site.nbDays(a)) + " ",
        i !== 0 && (s += i18n.site.nbHours(i))
    } else
        o >= 3600 * 1e3 ? (i = e.getUTCHours(),
        s += ye(je(i, 2)) + ":" + ye(t)) : s += ye(t) + ":" + ye(n);
    return s
}
function li(o, e, t, n) {
    let i = o.millisOf(e)
      , s = d => {
        d.innerHTML = site.blindMode ? Vo(i) : un(i)
    }
      , a = o.root.data.player.color === e
      , l = document.dir === "rtl" && i < 86400 * 1e3 ? "ltr" : void 0;
    return r("div.rclock.rclock-correspondence.rclock-" + t, {
        class: {
            outoftime: i <= 0,
            running: n === e
        }
    }, [o.data.showBar && r("div.bar", [r("span", {
        attrs: {
            style: `width: ${o.timePercent(e)}%`
        }
    })]), r("div.time", {
        attrs: l && {
            style: `direction: ${l}`
        },
        hook: {
            insert: d => s(d.elm),
            postpatch: (d, p) => s(p.elm)
        }
    }), !a && ce(o.root)])
}
var Ue = (o, e) => {
    let t = o.playerAt(e);
    return o.clock ? Bo(o.clock, t.color, e, fn(o)) : o.data.correspondence && o.data.game.turns > 1 ? li(o.corresClock, t.color, e, o.data.game.player) : mn(o, t.color, e)
}
  , fn = o => (e, t) => {
    var s, a;
    let n = !o.data.player.spectator && o.data.player.color == e
      , i = ((s = o.data.tournament) == null ? void 0 : s.ranks) || ((a = o.data.swiss) == null ? void 0 : a.ranks);
    return [hn(o, e, t) || (n ? gn(o, e) : ce(o)), yn(o, e, t, i)]
}
;
function mn(o, e, t) {
    let n = o.data;
    if (!(T(n) || P(n)))
        return r("div.rclock.rclock-turn.rclock-" + t, n.game.player === e && r("div.rclock-turn__text", n.player.spectator ? i18n.site[n.game.player === "white" ? "whitePlays" : "blackPlays"] : i18n.site[n.game.player === n.player.color ? "yourTurn" : "waitingForOpponent"]))
}
var di = (o, e) => o.hasGoneBerserk(e) && !te(o.data) && v(o.data)
  , hn = (o, e, t) => di(o, e) ? r("div.berserked." + t, B("\uE03E")) : null
  , gn = (o, e) => se(o.data) && !o.hasGoneBerserk(e) && r("button.fbt.go-berserk", {
    attrs: {
        title: "GO BERSERK! Half the time, no increment, bonus point",
        "data-icon": "\uE03E"
    },
    hook: u("click", o.goBerserk)
})
  , yn = (o, e, t, n) => n && !di(o, e) && r("div.tour-rank." + t, {
    attrs: {
        title: "Current tournament rank"
    }
}, "#" + n[e]);
function pi(o, e) {
    let t = o.playerAt(e);
    return o.nvui ? void 0 : t.ai ? r("div.user-link.online.ruser.ruser-" + e, [r("i.line"), r("name", i18n.site.aiNameLevelAiLevel("Stockfish", t.ai))]) : bt(o, t, e)
}
var Ye = o => o.loading || o.redirecting
  , _e = () => r("i.ddloader")
  , ci = (o, e) => [Ve(o), e.find(t => !!t) && r("div.rcontrols", e)]
  , vn = o => ci(o, [Ye(o) ? _e() : xt(o) || St(o) || Dt(o)])
  , kn = o => ci(o, [Ye(o) ? _e() : v(o.data) ? void 0 : Lt(o)])
  , wn = o => {
    let e = o.question();
    if (!e)
        return {};
    let t = (s, a, l, d) => o.nvui ? r("button", {
        hook: u("click", d)
    }, l) : r(`a.${s}`, {
        attrs: {
            "data-icon": a
        },
        hook: u("click", d)
    })
      , n = e.no && t("no", e.no.icon || "\uE02A", e.no.text || i18n.site.decline, e.no.action)
      , i = e.yes && t("yes", e.yes.icon || "\uE023", e.yes.text || i18n.site.accept, e.yes.action);
    return {
        promptVNode: r("div.question", {
            key: e.prompt
        }, [n, r("p", e.prompt), i]),
        isQuestion: e.no !== void 0 || e.yes !== void 0
    }
}
  , Cn = o => {
    let e = o.data
      , t = Ye(o)
      , {promptVNode: n, isQuestion: i} = wn(o)
      , s = t || i ? [] : [ko(e) ? q(o, void 0, "\uE02A", i18n.site.abortGame, "abort") : q(o, l => ({
        enabled: wo(l)
    }), "\uE047", i18n.site.proposeATakeback, "takeback-yes", o.takebackYes), o.drawConfirm ? Tt(o) : o.data.game.threefold ? Pt(o, l => {
        let d = Ce(l);
        return {
            enabled: d,
            overrideHint: d ? void 0 : i18n.site.noDrawBeforeSwissLimit
        }
    }
    ) : q(o, l => ({
        enabled: o.canOfferDraw(),
        overrideHint: Ce(l) ? void 0 : i18n.site.noDrawBeforeSwissLimit
    }), "\uE076", i18n.site.offerDraw, "draw-yes", () => o.offerDraw(!0)), o.resignConfirm ? Mt(o) : q(o, l => ({
        enabled: ne(l)
    }), "\uE040", i18n.site.resign, "resign", () => o.resign(!0)), Be(o), ae(o.menu, i18n.site.menu)]
      , a = t ? [_e()] : [n, wt(o), Rt(o)];
    return [Ve(o), r("div.rcontrols", [r("div.ricons", {
        class: {
            confirm: !!(o.drawConfirm || o.resignConfirm),
            empty: !s.length
        }
    }, s), a])]
}
  , ui = o => [r("div.round__app__table"), yt(o), pi(o, "top"), o.data.player.spectator ? kn(o) : v(o.data) ? Cn(o) : vn(o), pi(o, "bottom"), Ue(o, "top"), Ue(o, "bottom")];
function oa(o) {
    let e = o.data
      , t = e[o.flip ? "player" : "opponent"].color
      , n = e[o.flip ? "opponent" : "player"].color
      , i = Eo(o.data.pref.showCaptured, o.flip ? o.data.opponent.color : o.data.player.color, o.stepAt(o.ply).fen, !!(o.data.player.checks || o.data.opponent.checks), o.data.steps, o.ply)
      , s = o.data.player.blindfold && v(o.data);
    return o.nvui ? o.nvui.render() : r("div.round__app.variant-" + e.game.variant.key, {
        class: {
            "swap-clock": Xe() && x() === 1 && g.boolean("swapClock").get()
        }
    }, [r("div.round__app__board.main-board" + (s ? ".blindfold" : ""), {
        hook: "ontouchstart"in window || !g.boolean("scrollMoves").getOrDefault(!0) ? void 0 : u("wheel", Do( (a, l) => {
            l && !o.isPlaying() && (a.preventDefault(),
            a.deltaY > 0 ? Re(o) : a.deltaY < 0 && Pe(o),
            o.redraw())
        }
        ), void 0, !1)
    }, [rt(o), o.promotion.view(o.data.game.variant.key === "antichess")]), o.voiceMove && Uo(o.voiceMove.ctrl, o.redraw), o.keyboardHelp && Jo(o), de(o, t, "top") || i[0], ui(o), de(o, n, "bottom") || i[1], o.keyboardMove && Ko(o.keyboardMove)])
}
function ai() {
    $("body").hasClass("zen-auto") && $("body").hasClass("zen") && ($("body").toggleClass("zen"),
    window.dispatchEvent(new Event("resize")))
}
export {A as a, mt as b, nt as c, Pe as d, Re as e, oa as f, We as g, li as h, vn as i, kn as j, Cn as k};

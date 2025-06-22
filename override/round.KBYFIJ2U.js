import {
    a as R
} from "./lib.VCZA6FWV.js";
import {
    a as te,
    b as ht,
    c as oe,
    d as ut,
    e as G,
    f as ie,
    h as mt,
    m as ft,
    o as gt,
    p as yt,
    q as vt,
    r as bt,
    s as kt,
    t as wt,
    u as Ct
} from "./lib.LDYEEYVL.js";
import {
    c as pt
} from "./lib.BYPQWXRA.js";
import {
    a as dt,
    c as ct
} from "./lib.M4V5U66M.js";
import "./lib.K4SQT4HR.js";
import {
    a as lt
} from "./lib.P3L3AZHC.js";
import "./lib.V465VJZN.js";
import {
    a as rt
} from "./lib.TGSVGIY6.js";
import {
    a as st,
    b as at
} from "./lib.IJUDT7HG.js";
import {
    a as nt
} from "./lib.3B7VEY4Z.js";
import {
    a as ot,
    b as it
} from "./lib.XQXNLCLN.js";
import "./lib.PN4BH2FP.js";
import {
    a as tt
} from "./lib.Z4JYGFNY.js";
import {
    a as et
} from "./lib.MC4VYKK5.js";
import {
    d as ee
} from "./lib.WSLURD3G.js";
import "./lib.EG62OE4Y.js";
import {
    f as X
} from "./lib.P2KHB2MX.js";
import {
    c as Oe,
    d as $e,
    e as Ee,
    f as S,
    g as N,
    h as v,
    i as Le,
    j as Ie,
    l as ze,
    n as Ae,
    p as Ne,
    q as Ke,
    v as K,
    w as We,
    x as Ge
} from "./lib.MRAU3QIP.js";
import "./lib.BCRK4RX7.js";
import "./lib.WDM5RK7R.js";
import "./lib.A3N3EN2B.js";
import "./lib.QVL5WYDK.js";
import {
    b as qe,
    c as Z
} from "./lib.67NW2GN4.js";
import {
    d as Xe
} from "./lib.YUDTDMSU.js";
import {
    b as Ue,
    c as Ze,
    d as Je
} from "./lib.7N7EZUST.js";
import {
    c as ue,
    d as me,
    g as fe,
    n as be
} from "./lib.2QUFEFFQ.js";
import {
    f as ge,
    g as ye,
    h as _,
    l as ve
} from "./lib.VGUHCROA.js";
import "./lib.JJMOHYB3.js";
import "./lib.ZHYX4GJ4.js";
import "./lib.LE4HQ5U6.js";
import {
    b as Re,
    c as A,
    e as xe,
    f as De
} from "./lib.SLUWX2AH.js";
import "./lib.EUNDXK5Q.js";
import "./lib.JPYWEH7Z.js";
import {
    a as m,
    n as Se
} from "./lib.HPSH4ANO.js";
import {
    a as J
} from "./lib.RXKCJLII.js";
import {
    e as Qe
} from "./lib.BICGBJDI.js";
import {
    a as _e
} from "./lib.JAHQ3XBJ.js";
import "./lib.PFYR5E37.js";
import {
    a as W,
    b as Be,
    g as U
} from "./lib.WFXQGRIB.js";
import "./lib.YUYJMT4V.js";
import {
    a as ke,
    b as f,
    d as we,
    e as Ce
} from "./lib.JDGIJSRT.js";
import {
    K as je,
    Ma as Ve,
    Y as Ye,
    ca as Fe,
    ea as He
} from "./lib.M4AIDKQM.js";
import {
    a as u
} from "./lib.VLCMJXS7.js";
import {
    f as z,
    h as w,
    k as Te
} from "./lib.RKXQ2UXZ.js";
import {
    a as I,
    h as q,
    i as Me,
    n as Pe,
    q as Q
} from "./lib.UMJYW5NQ.js";
import "./lib.XNXLGS2X.js";
var B = (() => {
        let o = "mousemove",
            e = !1,
            t = [],
            s = 0;

        function i(n) {
            t.push({
                b: n.buttons != 0,
                x: n.clientX,
                y: n.clientY
            }), t.length > 4 && (t.shift(), r())
        }
        let a = (n, d) => Math.pow(d.x - n.x, 2) + Math.pow(d.y - n.y, 2);

        function r() {
            var n = t;
            !n[0].b && n[1].b && n[2].b && !n[3].b && a(n[0], n[1]) > 900 && a(n[1], n[2]) === 0 && a(n[2], n[3]) === 0 && s++
        }
        return {
            start() {
                e || (e = !1, document.addEventListener(o, i))
            },
            stop() {
                e && (e = !1, document.removeEventListener(o, i))
            },
            hits: () => s
        }
    })(),
    x = [],
    se = 6,
    Mt = !1,
    M = {
        holdAcc: 0
    },
    Pt = !1;

function po(o, e) {
    if (e.premove && o.ply > 1 && (Pt = !0), Pt || !e.holdTime || o.ply > 30) {
        B.stop();
        return
    }
    if (x.push(e.holdTime), x.length <= se) return;
    let t = !1,
        s;
    x.shift();
    let i = x.reduce((a, r) => a + r) / se;
    i > 2 && i < 140 && (s = x.map(r => Math.pow(r - i, 2)).reduce((r, n) => r + n) / (se - 1), t = s < 256), (t || Mt) && $(".manipulable .cg-board").toggleClass("bh1", t && B.hits() > 2), t ? (M.hold || (M.holdAcc++, M.holdAcc > 5 && (o.socket.send("hold", {
        mean: Math.round(i),
        sd: Math.round(Math.sqrt(s))
    }), M.hold = !0)), B.start(), B.hits() > 2 && !M.ick && (o.socket.send("bye2"), C(o.data, "ick2"), M.ick = !0)) : M.holdAcc = 0, Mt = t
}
var ho = () => navigator.userAgent.includes("Chrome/"),
    C = (o, e) => uo(o.game.id + o.player.id, e),
    uo = (o, e) => Do("/jslog/" + o + "?n=" + e, {
        method: "post"
    }),
    mo = () => !Object.keys(window.WebSocket).length,
    fo = () => {
        let o = Object.keys(window.WebSocket);
        return o[0] == "prototype" && !o[1]
    },
    go = () => !window.WebSocket.prototype.send.toString().includes("[native code]"),
    g = o => $(atob(o)).length,
    j = 0,
    yo = () => {
        if (j || !ho()) return !1;
        j = 1;
        try {
            document.querySelectorAll(".game__meta div").forEach(o => {
                o.attachShadow({
                    mode: "open"
                }).innerHTML = "<slot>"
            })
        } catch (o) {
            j = 2
        }
        return j == 2
    },
    vo = () => {
        let o = () => {
            let e = "chess-master-autoclick",
                t = localStorage.getItem(e) !== null;
            return t && localStorage.removeItem(e), t
        };
        return g("YVtocmVmKj0iY2hlc3Mub3JnZnJlZS5jb20iXTpub3QoW2hyZWYqPSJsaWNoZXNzLm9yZyJdKQ==") || o() ? "cma20" : ($("body>div[id]>div[class]>div[style]>span[id][style]").attr("style") || "").includes("color:blue") ? "cma22" : !1
    },
    bo = () => {
        var o;
        return g("YVtocmVmPSJodHRwOi8vdGhhcGF3bmd1bi5saXZlIl0=") ? "lga1" : g("Lm1haW4tYm9hcmQgY2FudmFz") || g("aW1nW3NyYz0iaHR0cHM6Ly9saWNoZXNzLmdhLzEyOC5wbmciXQ==") ? "lga3" : g("I2JhckxvZ29bc3R5bGVd") ? "lga4" : !((o = $(".main-board cg-board > *:last-child")[0]) === null || o === void 0) && o.tagName.includes("-") ? "lga14" : yo() ? "lga16" : !1
    },
    ko = () => g("I2F1dGhCYXI=") || g("I21vdmVfc3VnZ2VzdF9ib3g="),
    wo = () => g("Y2ctYm9hcmQ+ZGl2W3N0eWxlXQ==") == 2,
    Tt = !1,
    St = ["Y2hlc3NleHBlcnQ6Y2xpZW50OnNlbGVjdG9ycw==", "Y2hlc3NleHBlcnQ6Y2xpZW50Om1vdmU="],
    Rt = () => {
        Tt = "cxp1", St.forEach(o => window.removeEventListener(atob(o), Rt))
    };
St.forEach(o => window.addEventListener(atob(o), Rt));
var Co = () => Tt,
    Mo = () => g("Ym9keSA+IGRpdiA+IGRpdi5nbWM=") ? "sqn1" : g("c3ZnW2RhdGEtaWNvbj0ibWludXMiXQ==") ? "sqn2" : g("Ym9keT5zdmc+bWFya2Vy") ? "sqn3" : !1,
    Po = () => window[atob("U1RPQ0tGSVNI")] ? "kjf1" : !1,
    To = () => g("I2FzZE8=") ? "kbf1" : !1,
    So = () => g("Ym9keT5zdmc+cG9seWdvbg==") ? "aca1" : !1,
    Ro = () => Dt.length > 0 ? "wpl1" : !1,
    xo = () => g("I0twYXdudQ==") ? "kbg1" : !1,
    ae = 8 + Math.round(Math.random() * 13);

function xt(o, e) {
    if (po(o, e), o.ply <= ae + 2 && o.ply > ae) try {
        if (o.opts.userId || Math.random() < .2) {
            let t = (i, a) => {
                    Math.random() < a && setTimeout(() => Math.random() < .5 ? C(o.data, i) : window.lichess.pubsub.emit("ab.rep", i), ae * 1500)
                },
                s;
            (s = vo()) || (s = bo()) ? t(s, .5): (s = Co()) ? t(s, .3) : (s = Mo()) ? t(s, .2) : (s = Po()) ? t(s, .3) : (s = To()) || (s = So()) ? t(s, .5) : ((s = xo()) || (s = Ro())) && t(s, .3)
        }
        ko() && C(o.data, "los"), o.opts.userId && fo() && C(o.data, "wst1"), go() && C(o.data, "wst2"), wo() && C(o.data, "wrp")
    } catch (t) {
        console.error(t), C(o.data, "err " + ("" + t).toString().slice(0, 120))
    }
}
var Do = window.fetch,
    Dt = [];
WebSocket.prototype._bridge = WebSocket.prototype.addEventListener;
WebSocket.prototype.addEventListener = function(o, e) {
    o == "message" && Dt.push(e.toString()), this._bridge(o, e)
};

function Ot(o) {
    setTimeout(() => {
        mo() && C(o.data, "ih1")
    }, 1e3)
}
var P = o => {
    let e = o.player.spectator ? `/${o.game.id}/${o.player.color}` : `/${o.game.id}${o.player.id}`;
    return z(e)
};
var $t = o => z(`/whats-next/${o.data.game.id}${o.data.player.id}`),
    Et = o => z("/challenge/rematch-of/" + o, {
        method: "post"
    }),
    Lt = qe(() => 1e3, o => w("/pref/zen", {
        method: "post",
        body: Te({
            zen: o ? 1 : 0
        })
    }));

function $o(o, e, t) {
    let s, i = 0;
    return function(...a) {
        let r = this,
            n = performance.now() - i,
            d = () => {
                s = void 0, i = performance.now(), o *= e, t.apply(r, a)
            };
        s && clearTimeout(s), n > o ? d() : s = setTimeout(d, o - n)
    }
}

function zt(o, e) {
    xe(e.sign);
    let t = (i, a) => {
            i && i.t ? (e.setLoading(!1), s[i.t](i.d)) : P(e.data).then(r => {
                let n = De();
                n !== !1 && n > r.player.version ? a ? site.reload() : t(i, !0) : e.reload(r)
            }, site.reload)
        },
        s = {
            takebackOffers(i) {
                e.data.player.proposingTakeback = i[e.data.player.color], (e.data.opponent.proposingTakeback = i[e.data.opponent.color]) && e.opponentRequest("takeback", i18n.site.yourOpponentProposesATakeback), e.redraw()
            },
            move: e.apiMove,
            drop: e.apiMove,
            reload: t,
            redirect: e.setRedirecting,
            clockInc(i) {
                e.clock && (e.clock.addTime(i.color, i.time), e.redraw())
            },
            cclock(i) {
                e.corresClock && (e.data.correspondence.white = i.white, e.data.correspondence.black = i.black, e.corresClock.update(i.white, i.black), e.redraw())
            },
            crowd(i) {
                ["white", "black"].forEach(a => {
                    I(i[a]) && K(e.data, a, i[a])
                }), e.redraw()
            },
            endData: e.endWithData,
            rematchOffer(i) {
                e.data.player.offeringRematch = i === e.data.player.color, (e.data.opponent.offeringRematch = i === e.data.opponent.color) && e.opponentRequest("rematch", i18n.site.yourOpponentWantsToPlayANewGameWithYou), e.redraw()
            },
            rematchTaken(i) {
                e.data.game.rematch = i, e.data.player.spectator ? e.redraw() : e.setLoading(!0)
            },
            drawOffer(i) {
                if (e.isPlaying() && (e.data.player.offeringDraw = i === e.data.player.color, (e.data.opponent.offeringDraw = i === e.data.opponent.color) && e.opponentRequest("draw", i18n.site.yourOpponentOffersADraw)), i) {
                    let a = e.lastPly();
                    i == "white" == (a % 2 == 0) && a++, e.data.game.drawOffers = (e.data.game.drawOffers || []).concat([a])
                }
                e.redraw()
            },
            berserk(i) {
                e.setBerserk(i)
            },
            gone: e.setGone,
            goneIn: e.setGone,
            checkCount(i) {
                e.data.player.checks = e.data.player.color == "white" ? i.white : i.black, e.data.opponent.checks = e.data.opponent.color == "white" ? i.white : i.black, e.redraw()
            },
            simulPlayerMove(i) {
                e.opts.userId && e.data.simul && e.opts.userId == e.data.simul.hostId && i !== e.data.game.id && e.moveOn.get() && !v(e.data) && (e.setRedirecting(), site.sound.play("move"), location.href = "/" + i)
            },
            simulEnd(i) {
                _e({
                    htmlText: `<div><p>Simul complete!</p><br /><br /><a class="button" href="/simul/${i.id}">Back to ${i.name} simul</a></div>`
                })
            }
        };
    return u.on("ab.rep", i => o("rep", {
        n: i
    })), {
        send: o,
        handlers: s,
        moreTime: Z(300, () => o("moretime")),
        outoftime: $o(500, 1.1, () => o("flag", e.data.game.player)),
        berserk: Z(200, () => o("berserk", null, {
            ackable: !0
        })),
        sendLoading(i, a) {
            e.setLoading(!0), o(i, a)
        },
        receive(i, a) {
            let r = s[i];
            return r ? (r(a), !0) : !1
        },
        reload: t
    }
}
var Eo = document.title,
    ne = 0,
    At = ["/assets/logo/lichess-favicon-32.png", "/assets/logo/lichess-favicon-32-invert.png"].map((o, e) => () => {
        ne !== e && (document.getElementById("favicon").href = o, ne = e)
    }),
    T;

function Nt() {
    T && clearTimeout(T), T = void 0, At[0]()
}

function Lo() {
    function o() {
        document.hasFocus() || (At[1 - ne](), T = setTimeout(o, 1e3))
    }
    T || (T = setTimeout(o, 200))
}
var Kt = () => window.addEventListener("focus", Nt);

function Wt(o, e) {
    o.data.player.spectator || (e || ($e(o.data) || Oe(o.data) ? e = i18n.site.gameOver : v(o.data) ? (e = i18n.site.yourTurn, document.hasFocus() || Lo()) : (e = i18n.site.waitingForOpponent, Nt())), document.title = `${e} - ${Eo}`)
}
var Gt = 0,
    re = 0;

function Bt(o) {
    o || (re = Date.now() + 1e4), window.addEventListener("focus", () => Gt = Date.now())
}
var le = () => Gt >= re,
    jt = () => re = Date.now() + 1e3;
var Y = class {
    constructor(e, t, s) {
        this.root = e;
        this.data = t;
        this.onFlag = s;
        this.timePercent = e => Math.max(0, Math.min(100, this.times[e] * this.timePercentDivisor));
        this.update = (e, t) => {
            this.times = {
                white: e * 1e3,
                black: t * 1e3,
                lastUpdate: performance.now()
            }
        };
        this.tick = e => {
            let t = performance.now();
            this.times[e] -= t - this.times.lastUpdate, this.times.lastUpdate = t, this.times[e] <= 0 && this.onFlag()
        };
        this.millisOf = e => Math.max(0, this.times[e]);
        this.timePercentDivisor = .1 / t.increment, this.update(t.white, t.black), this.ticker = setInterval(() => {
            if (!e.data.correspondence || !e.corresClock) return clearInterval(this.ticker);
            this.tick(e.data.game.player), e.redraw()
        }, 1e3)
    }
};
var D = class {
    constructor(e, t) {
        this.ctrl = e;
        this.key = t;
        this.storage = m.boolean(this.key);
        this.toggle = () => {
            this.storage.toggle(), this.next(!0)
        };
        this.get = this.storage.get;
        this.redirect = e => {
            this.ctrl.setRedirecting(), window.location.href = e
        };
        this.next = e => {
            let t = this.ctrl.data;
            t.player.spectator || !Ge(t) || v(t) || !this.get() || (e ? this.redirect("/round-next/" + t.game.id) : t.simul ? t.simul.hostId === this.ctrl.opts.userId && t.simul.nbPlaying > 1 && this.redirect("/round-next/" + t.game.id) : $t(this.ctrl).then(s => {
                s.next && this.redirect("/" + s.next)
            }))
        }
    }
};
var O = class {
    constructor(e) {
        this.socket = e;
        this.current = void 0;
        this.register = () => {
            this.current = setTimeout(this.expire, 1e4)
        };
        this.clear = () => {
            this.current && clearTimeout(this.current)
        };
        this.expire = () => {
            w("/statlog?e=roundTransientExpire", {
                method: "post"
            }).catch(() => {}), this.socket.reload()
        }
    }
};

function Yt(o, e) {
    let t = [],
        s = new Map,
        i = ye(e),
        a = Math.max(0, i[0] - 1),
        r = Math.min(7, i[0] + 1),
        n = Math.max(0, i[1] - 1),
        d = Math.min(7, i[1] + 1);
    for (let h = a; h <= r; h++)
        for (let l = n; l <= d; l++) {
            let c = ge([h, l]);
            t.push(c);
            let p = o.chessground.state.pieces.get(c);
            p && (c === e || p.role !== "pawn") && s.set(c, void 0)
        }
    o.chessground.setPieces(s), o.chessground.explode(t)
}
var de = ["pawn", "knight", "bishop", "rook", "queen"];

function Ft(o, e) {
    if (e.button !== void 0 && e.button !== 0 || o.replaying() || !o.isPlaying()) return;
    let t = e.target,
        s = t.getAttribute("data-role"),
        i = t.getAttribute("data-color"),
        a = t.getAttribute("data-nb");
    !s || !i || a === "0" || (e.stopPropagation(), e.preventDefault(), Ue(o.chessground.state, {
        color: i,
        role: s
    }, e))
}
var Ht = !1,
    Vt = !1,
    _t = !1;

function F(o, e, t) {
    if (y.length === 0 ? Vt = !0 : (Ht = !0, _t || Ut(o)), !v(o) || e === "pawn" && (t[1] === "1" || t[1] === "8")) return !1;
    let s = o.possibleDrops;
    if (typeof s == "undefined" || s === null) return !0;
    let i = s.match(/.{2}/g);
    return !!(i != null && i.includes(t))
}

function qt() {
    let o = m.make("crazyKeyHist");
    if (Ht) o.set(10);
    else if (Vt) {
        let e = parseInt(o.get());
        e > 0 && e <= 10 ? o.set(e - 1) : e !== 0 && o.set(3)
    }
}
var y = [];

function Qt(o) {
    let e = site.mousetrap,
        t, s = () => {
            if (t && document.body.classList.remove(t), y.length > 0) {
                let a = de[y[y.length - 1] - 1],
                    r = o.data.player.color,
                    n = o.data.crazyhouse;
                if (!n) return;
                let d = n.pockets[r === "white" ? 0 : 1][a];
                Ze(o.chessground.state, d ? {
                    color: r,
                    role: a
                } : void 0), t = `cursor-${r}-${a}`, document.body.classList.add(t)
            } else Je(o.chessground.state), t = void 0
        };
    u.on("ply", () => {
        y.length > 0 && s()
    });
    for (let a = 1; a <= 5; a++) {
        let r = a.toString();
        e.bind(r, () => {
            y.includes(a) || (y.push(a), s())
        }).bind(r, () => {
            let n = y.indexOf(a);
            n >= 0 && (y.splice(n, 1), n === y.length && s())
        }, "keyup")
    }
    let i = () => {
        y.length > 0 && (y.length = 0, s())
    };
    window.addEventListener("blur", i), window.addEventListener("focus", a => {
        a.target && a.target.localName === "input" && i()
    }, {
        capture: !0
    }), m.get("crazyKeyHist") !== "0" && Ut(o.data)
}

function Ut(o) {
    let e = o.player.color[0];
    for (let t of "PNBRQ") fetch(site.asset.url(`piece/cburnett/${e}${t}.svg`));
    _t = !0
}
var Zt = !1,
    Jt = o => o.split(" ")[0];

function Xt(o) {
    var e;
    o.data.opponent.ai || ((e = o.data.player.user) == null ? void 0 : e.title) !== "BOT" && (m.fire("ceval.disable"), m.make("ceval.fen").listen(t => {
        let s = o.data,
            i = ut(o.data);
        !Zt && i.ply > 14 && o.isPlaying() && t.value && Jt(i.fen) === Jt(t.value) && (w(`/jslog/${s.game.id}${s.player.id}?n=ceval`, {
            method: "post"
        }), Zt = !0)
    }))
}

function eo(o, e) {
    o.opponent.ai && m.fire("ceval.fen", e.fen)
}
var ce = ["touchend", "pointerup", "pointerdown", "mousedown", "keydown"],
    b = null,
    H = !1;

function to() {
    H = !0, pe()
}

function oo() {
    H = !1, b == null || b.release().catch(() => {}), b = null
}

function io() {
    !b && H && pe()
}

function pe() {
    var o;
    (o = navigator.wakeLock) == null || o.request("screen").then(e => {
        b = e, ce.forEach(t => window.removeEventListener(t, io, {
            capture: !0
        })), ce = []
    }).catch(() => b = null)
}
ce.forEach(o => window.addEventListener(o, io, {
    capture: !0
}));
document.addEventListener("visibilitychange", () => {
    H && (!b || b.released) && document.visibilityState === "visible" ? pe() : document.visibilityState === "hidden" && (b == null || b.release().catch(() => {}), b = null)
});
var Wo = ["mousedown", "touchstart"];

function V(o, e, t) {
    let s = G(o.data, o.ply);
    if (!s.crazy) return;
    let i = o.justDropped,
        a = o.preDrop,
        r = s.crazy.pockets[e === "white" ? 0 : 1],
        n = t === (o.flip ? "top" : "bottom"),
        d = n && !o.replaying() && o.isPlaying(),
        h = e === o.data.player.color,
        l = o.justCaptured,
        c = l && (l.promoted ? "pawn" : l.role);
    return f("div.pocket.is2d.pocket-" + t, {
        class: {
            usable: d
        },
        hook: W(p => Wo.forEach(k => p.addEventListener(k, co => {
            t === (o.flip ? "top" : "bottom") && y.length === 0 && Ft(o, co)
        })))
    }, de.map(p => {
        let k = r[p] || 0;
        return h && (i === p && k--, c === p && k++), f("div.pocket-c1", f("div.pocket-c2", f("piece." + p + "." + e, {
            class: {
                premove: h && a === p
            },
            attrs: {
                "data-role": p,
                "data-color": e,
                "data-nb": k
            }
        })))
    }))
}

function he(o) {
    let e = o.data,
        t = e[o.flip ? "player" : "opponent"].color,
        s = e[o.flip ? "opponent" : "player"].color,
        i = et(o.data.pref.showCaptured, o.flip ? o.data.opponent.color : o.data.player.color, o.stepAt(o.ply).fen, !!(o.data.player.checks || o.data.opponent.checks), o.data.steps, o.ply),
        a = o.data.player.blindfold && S(o.data);
    return o.nvui ? o.nvui.render(o) : U("div.round__app.variant-" + e.game.variant.key, [U("div.round__app__board.main-board" + (a ? ".blindfold" : ""), {
        hook: "ontouchstart" in window || !m.boolean("scrollMoves").getOrDefault(!0) ? void 0 : Be("wheel", Qe((r, n) => {
            n && !o.isPlaying() && (r.preventDefault(), r.deltaY > 0 ? kt(o) : r.deltaY < 0 && bt(o), o.redraw())
        }), void 0, !1)
    }, [vt(o), o.promotion.view(o.data.game.variant.key === "antichess")]), o.voiceMove && dt(o.voiceMove.ctrl, o.redraw), o.keyboardHelp && Ct(o), V(o, t, "top") || i[0], ...ft(o), V(o, s, "bottom") || i[1], o.keyboardMove && st(o.keyboardMove)])
}

function so() {
    $("body").hasClass("zen-auto") && $("body").hasClass("zen") && ($("body").toggleClass("zen"), window.dispatchEvent(new Event("resize")))
}
var E = class {
    constructor(e) {
        this.getData = e;
        this.alive = () => {
            this.scheduledCheck && (clearTimeout(this.scheduledCheck), this.scheduledCheck = void 0)
        };
        this.onServerRestart = () => {
            let e = (12 + Math.random() * 15) * 1e3;
            this.scheduledCheck = setTimeout(this.checkForDesync, e)
        };
        this.checkForDesync = () => {
            let e = this.getData();
            e.game.player !== e.player.color && P(e).then(t => {
                v(t) && site.reload("Server desync detected")
            }, this.onServerRestart)
        };
        N(this.getData()) && u.on("socket.in.serverRestart", this.onServerRestart)
    }
};
console.log("prova")
var L = class {
    constructor(e, t, s) {
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
        this.nvui = s;
        this.firstSeconds = !0;
        this.flip = !1;
        this.loading = !1;
        this.redirecting = !1;
        this.goneBerserk = {};
        this.resignConfirm = void 0;
        this.drawConfirm = void 0;
        this.preventDrawOffer = void 0;
        this.autoScroll = () => {};
        this.shouldSendMoveTime = !1;
        this.sign = Math.random().toString(36);
        this.keyboardHelp = location.hash === "#keyboard";
        this.showExpiration = () => {
            this.data.expiration && (this.redraw(), setTimeout(this.showExpiration, 250))
        };
        this.onUserMove = (e, t, s) => {
            var i;
            (i = this.keyboardMove) != null && i.usedSan || xt(this, s, u.emit), this.startPromotion(e, t, s) || this.sendMove(e, t, void 0, s)
        };
        this.onUserNewPiece = (e, t, s) => {
            !this.replaying() && F(this.data, e, t) ? this.sendNewPiece(e, t, !!s.predrop) : this.jump(this.ply)
        };
        this.onMove = (e, t, s) => {
            s || this.enpassant(e, t) ? this.data.game.variant.key === "atomic" ? (site.sound.play("explosion"), Yt(this, t)) : site.sound.move({
                name: "capture",
                filter: "game"
            }) : site.sound.move({
                name: "move",
                filter: "game"
            })
        };
        this.startPromotion = (e, t, s) => {
            var i, a;
            return this.promotion.start(e, t, {
                submit: (r, n, d) => this.sendMove(r, n, d, s),
                show: (i = this.voiceMove) == null ? void 0 : i.promotionHook()
            }, s, (a = this.keyboardMove) == null ? void 0 : a.justSelected())
        };
        this.onPremove = (e, t, s) => this.startPromotion(e, t, s);
        this.onCancelPremove = () => this.promotion.cancelPrePromotion();
        this.onNewPiece = (e, t) => {
            e.role === "pawn" && (t[1] === "1" || t[1] === "8") || site.sound.move()
        };
        this.onPredrop = (e, t) => {
            this.preDrop = e, this.redraw()
        };
        this.isSimulHost = () => this.data.simul && this.data.simul.hostId === this.opts.userId;
        this.enpassant = (e, t) => {
            var i;
            if (e[0] === t[0] || ((i = this.chessground.state.pieces.get(t)) == null ? void 0 : i.role) !== "pawn") return !1;
            let s = t[0] + e[1];
            return this.chessground.setPieces(new Map([
                [s, void 0]
            ])), !0
        };
        this.lastPly = () => oe(this.data);
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
            this.toSubmit = void 0, this.chessground.selectSquare(null), e != this.ply && this.jump(e) ? site.sound.saySan(this.stepAt(this.ply).san, !0) : this.redraw()
        };
        this.userJumpPlyDelta = e => this.userJump(this.ply + e);
        this.isPlaying = () => N(this.data);
        this.jump = e => {
            e = Math.max(ht(this.data), Math.min(this.lastPly(), e));
            let t = e === this.ply + 1;
            this.ply = e, this.justDropped = void 0, this.preDrop = void 0;
            let s = this.stepAt(e),
                i = {
                    fen: s.fen,
                    lastMove: _(s.uci),
                    check: !!s.check,
                    turnColor: this.ply % 2 === 0 ? "white" : "black"
                };
            return this.replaying() ? this.chessground.stop() : i.movable = {
                color: this.isPlaying() ? this.data.player.color : void 0,
                dests: te(this.data.possibleMoves)
            }, this.chessground.cancelPremove(), this.chessground.set(i), s.san && t && site.sound.move(s), this.autoScroll(), u.emit("ply", e), this.pluginUpdate(s.fen), !0
        };
        this.canMove = () => !this.replaying() && this.data.player.color === this.chessground.state.turnColor;
        this.replayEnabledByPref = () => {
            let e = this.data;
            return e.pref.replay === X.Always || e.pref.replay === X.OnlySlowGames && (e.game.speed === "classical" || e.game.speed === "correspondence")
        };
        this.isLate = () => this.replaying() && Ee(this.data);
        this.playerAt = e => this.flip != (e === "top") ? this.data.opponent : this.data.player;
        this.flipNow = () => {
            this.flip = !this.nvui && !this.flip, this.chessground.set({
                orientation: yt(this.data, this.flip)
            }), u.emit("flip", this.flip), this.redraw()
        };
        this.setTitle = () => Wt(this);
        this.actualSendMove = (e, t, s = {
            premove: !1
        }) => {
            var a;
            let i = {
                sign: this.sign,
                ackable: !0
            };
            if (this.clock)
                if (i.withLag = !this.shouldSendMoveTime || !this.clock.isRunning(), s.premove && this.shouldSendMoveTime) this.clock.hardStopClock(), i.millis = 0;
                else {
                    let r = this.clock.stopClock();
                    r !== void 0 && this.shouldSendMoveTime && (i.millis = r)
                } this.socket.send(e, t, i), this.justDropped = s.justDropped, this.justCaptured = s.justCaptured, this.preDrop = void 0, (a = this.transientMove) == null || a.register(), this.redraw()
        };
        this.pluginMove = (e, t, s, i) => {
            !s && (this.chessground.move(e, t), this.chessground.state.movable.dests = void 0, this.chessground.state.turnColor = ve(this.chessground.state.turnColor), this.startPromotion(e, t, {
                premove: !1
            })) || this.sendMove(e, t, s, {
                premove: !1,
                preConfirmed: i
            })
        };
        this.pluginUpdate = e => {
            var t, s;
            (t = this.voiceMove) == null || t.update({
                fen: e,
                canMove: this.canMove()
            }), (s = this.keyboardMove) == null || s.update({
                fen: e,
                canMove: this.canMove()
            })
        };
        this.sendMove = (e, t, s, i) => {
            let a = {
                u: e + t
            };
            if (s && (a.u += s === "knight" ? "n" : s[0]), le() && (a.b = 1), this.resign(!1), !i.preConfirmed && this.confirmMoveToggle() && !i.premove) {
                if (site.sound.speech()) {
                    let r = `${fe(me(ue(this.stepAt(this.ply).fen),a.u))}. confirm?`;
                    site.sound.say(r, !1, !0)
                }
                this.toSubmit = a, this.redraw();
                return
            }
            this.actualSendMove("move", a, {
                justCaptured: i.captured,
                premove: i.premove
            })
        };
        this.sendNewPiece = (e, t, s) => {
            let i = {
                role: e,
                pos: t
            };
            le() && (i.b = 1), this.resign(!1), this.confirmMoveToggle() && !s ? (this.toSubmit = i, this.redraw()) : this.actualSendMove("drop", i, {
                justDropped: e,
                premove: s
            })
        };
        this.showYourMoveNotification = () => {
            if (this.data.local) return;
            let e = this.data,
                t = $("body").hasClass("zen") ? "Your opponent" : mt(e.opponent),
                s = `${t}
joined the game.`;
            v(e) ? R(() => {
                let i = i18n.site.yourTurn;
                if (this.ply < 1) i = `${s}
${i}`;
                else {
                    let a = e.steps[e.steps.length - 1].san;
                    a = `${be(this.ply)}${this.ply%2===1?".":"..."} ${a}`, i = `${t}
played ${a}.
${i}`
                }
                return i
            }) : this.isPlaying() && this.ply < 1 && R(s)
        };
        this.playerByColor = e => this.data[e === this.data.player.color ? "player" : "opponent"];
        this.apiMove = e => {
            var n, d, h, l;
            let t = this.data,
                s = this.isPlaying();
            t.game.turns = e.ply, t.game.player = e.ply % 2 === 0 ? "white" : "black";
            let i = e.ply % 2 === 0 ? "black" : "white",
                a = t.player.color === t.game.player;
            if (e.status && (t.game.status = e.status), e.winner && (t.game.winner = e.winner), this.playerByColor("white").offeringDraw = e.wDraw, this.playerByColor("black").offeringDraw = e.bDraw, t.possibleMoves = a ? e.dests : void 0, t.possibleDrops = a ? e.drops : void 0, t.crazyhouse = e.crazyhouse, this.setTitle(), !this.replaying()) {
                if (this.ply++, e.role) this.chessground.newPiece({
                    role: e.role,
                    color: i
                }, e.uci.slice(2, 4));
                else {
                    let c = _(e.uci),
                        p = this.chessground.state.pieces;
                    (!e.castle || ((n = p.get(e.castle.king[0])) == null ? void 0 : n.role) === "king" && ((d = p.get(e.castle.rook[0])) == null ? void 0 : d.role) === "rook") && this.chessground.move(c[0], c[1])
                }
                e.promotion && ot(this.chessground, e.promotion.key, e.promotion.pieceClass), this.chessground.set({
                    turnColor: t.game.player,
                    movable: {
                        dests: s ? te(t.possibleMoves) : new Map
                    },
                    check: !!e.check
                }), ((h = e.status) == null ? void 0 : h.name) === "mate" ? site.sound.play("checkmate", e.volume) : e.check && site.sound.play("check", e.volume), jt(), u.emit("ply", this.ply)
            }
            t.game.threefold = !!e.threefold, t.game.fiftyMoves = !!e.fiftyMoves;
            let r = {
                ply: this.lastPly() + 1,
                fen: e.fen,
                san: e.san,
                uci: e.uci,
                check: e.check,
                crazy: e.crazyhouse
            };
            if (t.steps.push(r), this.justDropped = void 0, this.justCaptured = void 0, K(t, i, !0), this.data.forecastCount = void 0, e.clock) {
                this.shouldSendMoveTime = !0;
                let c = e.clock,
                    p = s && a ? 0 : c.lag || 1;
                this.clock ? this.clock.setClock({
                    white: c.white,
                    black: c.black,
                    ticking: this.tickingClockColor(),
                    delay: p
                }) : this.corresClock && this.corresClock.update(c.white, c.black)
            }
            if (this.data.expiration && (this.data.steps.length > 2 ? this.data.expiration = void 0 : this.data.expiration.movedAt = Date.now()), this.redraw(), s && i === t.player.color && ((l = this.transientMove) == null || l.clear(), this.moveOn.next(), eo(t, e)), !this.replaying() && i != t.player.color) {
                let c = t.game.variant.key === "atomic" ? 100 : 1;
                setTimeout(() => {
                    this.nvui ? this.nvui.playPremove(this) : !this.chessground.playPremove() && !this.playPredrop() && (this.promotion.cancel(), this.showYourMoveNotification())
                }, c)
            }
            return this.autoScroll(), this.onChange(), this.pluginUpdate(r.fen), this.data.local || site.sound.move({
                ...e,
                filter: "music"
            }), site.sound.saySan(r.san), this.server.alive(), !0
        };
        this.crazyValid = (e, t) => F(this.data, e, t);
        this.getCrazyhousePockets = () => {
            var e;
            return (e = this.data.crazyhouse) == null ? void 0 : e.pockets
        };
        this.playPredrop = () => this.chessground.playPredrop(e => F(this.data, e.role, e.key));
        this.reload = e => {
            e.steps.length !== this.data.steps.length && (this.ply = e.steps[e.steps.length - 1].ply), ie(e), this.data = e, this.clearJust(), this.shouldSendMoveTime = !1, this.updateClockCtrl(), this.clock && this.clock.setClock({
                white: e.clock.white,
                black: e.clock.black,
                ticking: this.tickingClockColor()
            }), this.corresClock && this.corresClock.update(e.correspondence.white, e.correspondence.black), this.replaying() || gt(this), this.setTitle(), this.moveOn.next(), this.setQuietMode(), this.redraw(), this.autoScroll(), this.onChange(), this.setLoading(!1), this.pluginUpdate(e.steps[e.steps.length - 1].fen)
        };
        this.endWithData = e => {
            var s, i;
            let t = this.data;
            if (t.game.winner = e.winner, t.game.status = e.status, t.game.boosted = e.boosted, t.player.blindfold = !1, this.userJump(this.lastPly()), t.game.fen = t.steps[t.steps.length - 1].fen, e.status.name === "outoftime" && t.player.color !== e.winner && this.chessground.state.turnColor === t.opponent.color && this.reload(t), this.promotion.cancel(), this.chessground.stop(), e.ratingDiff && (t.player.ratingDiff = e.ratingDiff[t.player.color], t.opponent.ratingDiff = e.ratingDiff[t.opponent.color]), !t.player.spectator && t.game.turns > 1) {
                pt(t);
                let a = e.winner ? t.player.color === e.winner ? "victory" : "defeat" : "draw";
                e.status.name === "mate" ? site.sound.playAndDelayMateResultIfNecessary(a) : site.sound.play(a), a != "victory" && t.game.turns > 6 && !t.tournament && !t.swiss && m.boolean("courtesy").get() && ((i = (s = this.opts.chat) == null ? void 0 : s.instance) == null || i.post("Good game, well played"))
            }
            so(), t.crazyhouse && qt(), this.clearJust(), this.setTitle(), this.moveOn.next(), this.setQuietMode(), this.setLoading(!1), this.clock && e.clock && this.clock.setClock({
                white: e.clock.wc * .01,
                black: e.clock.bc * .01,
                ticking: void 0
            }), this.redraw(), this.autoScroll(), this.onChange(), t.tv && setTimeout(site.reload, 1e4), oo(), this.data.game.status.name === "started" ? site.sound.saySan(this.stepAt(this.ply).san, !1) : site.sound.say(ee(this.data), !1, !1, !0), this.server.alive(), !t.player.spectator && e.status.name === "outoftime" && this.chessground.state.turnColor === t.opponent.color && R(ee(this.data))
        };
        this.challengeRematch = async () => {
            this.data.game.id !== "synthetic" && await Et(this.data.game.id), u.emit("challenge-app.open"), Se("rematch-challenge") && setTimeout(async () => {
                let [e] = await Promise.all([site.asset.loadEsm("round.tour"), site.asset.loadCssPath("bits.shepherd")]);
                e.corresRematchOffline()
            }, 1e3)
        };
        this.makeClockOpts = () => ({
            onFlag: this.socket.outoftime,
            playable: () => S(this.data),
            bothPlayersHavePlayed: () => Ie(this.data),
            hasGoneBerserk: this.hasGoneBerserk,
            soundColor: this.data.simul || this.data.player.spectator || !this.data.pref.clockSound ? void 0 : this.data.player.color,
            nvui: !!this.nvui
        });
        this.tickingClockColor = () => {
            var e;
            return S(this.data) && (Le(this.data) > 1 || (e = this.data.clock) != null && e.running) ? this.data.game.player : void 0
        };
        this.setQuietMode = () => {
            let e = site.quietMode,
                t = this.isPlaying();
            e !== t && (site.quietMode = t, $("body").toggleClass("no-select", t && this.clock && this.clock.millisOf(this.data.player.color) <= 3e5))
        };
        this.question = () => {
            var e;
            return this.toSubmit ? (setTimeout(() => {
                var t;
                return (t = this.voiceMove) == null ? void 0 : t.listenForResponse("submitMove", this.submitMove)
            }), {
                prompt: i18n.site.confirmMove,
                yes: {
                    action: () => this.submitMove(!0)
                },
                no: {
                    action: () => this.submitMove(!1),
                    text: i18n.site.cancel
                }
            }) : this.data.player.proposingTakeback ? ((e = this.voiceMove) == null || e.listenForResponse("cancelTakeback", this.cancelTakebackPreventDraws), {
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
                    icon: Ve
                },
                no: {
                    action: () => this.socket.send("draw-no")
                }
            } : this.data.opponent.proposingTakeback ? {
                prompt: i18n.site.yourOpponentProposesATakeback,
                yes: {
                    action: this.takebackYes,
                    icon: He
                },
                no: {
                    action: () => this.socket.send("takeback-no")
                }
            } : this.voiceMove ? this.voiceMove.question() : !1
        };
        this.takebackYes = () => {
            this.socket.sendLoading("takeback-yes"), this.chessground.cancelPremove(), this.promotion.cancel()
        };
        this.resign = (e, t) => {
            e ? (this.resignConfirm || !this.data.pref.confirmResign || t ? (this.socket.sendLoading("resign"), clearTimeout(this.resignConfirm)) : this.resignConfirm = setTimeout(() => this.resign(!1), 3e3), this.redraw()) : this.resignConfirm && (clearTimeout(this.resignConfirm), this.resignConfirm = void 0, this.redraw())
        };
        this.hasGoneBerserk = e => !!this.goneBerserk[e];
        this.goBerserk = () => {
            Ke(this.data) && !this.hasGoneBerserk(this.data.player.color) && (this.socket.berserk(), site.sound.play("berserk"))
        };
        this.setBerserk = e => {
            this.goneBerserk[e] || (this.goneBerserk[e] = !0, e !== this.data.player.color && site.sound.play("berserk"), this.redraw(), $(`<i data-icon="${Ye}">`).appendTo($(`.game__meta .player.${e} .user-link`)))
        };
        this.setLoading = (e, t = 1500) => {
            clearTimeout(this.loadingTimeout), e ? (this.loading = !0, this.loadingTimeout = setTimeout(() => {
                this.loading = !1, this.redraw()
            }, t), this.redraw()) : this.loading && (this.loading = !1, this.redraw())
        };
        this.setRedirecting = () => {
            this.redirecting = !0, site.unload.expected = !0, setTimeout(() => {
                this.redirecting = !1, this.redraw()
            }, 2500), this.redraw()
        };
        this.submitMove = e => {
            if (!this.toSubmit) return;
            let t = this.toSubmit;
            this.toSubmit = void 0, this.setLoading(!0, 300), e ? (this.actualSendMove("u" in t ? "move" : "drop", t), site.sound.play("confirmation")) : this.jump(this.ply)
        };
        this.onChange = () => {
            this.opts.onChange && setTimeout(() => this.opts.onChange(this.data), 150)
        };
        this.setGone = e => {
            We(this.data, this.data.opponent.color, e), clearTimeout(this.goneTick), Number(e) > 1 && (this.goneTick = setTimeout(() => {
                let t = Number(this.opponentGone());
                t > 1 && this.setGone(t - 1)
            }, 1e3)), this.redraw()
        };
        this.opponentGone = () => {
            let e = this.data;
            return I(e.opponent.isGone) && e.opponent.isGone !== !1 && !v(e) && Ne(e) && e.opponent.isGone
        };
        this.canOfferDraw = () => !this.preventDrawOffer && Ae(this.data) && (this.data.player.lastDrawOfferAtPly || -99) < this.lastPly() - 20;
        this.cancelTakebackPreventDraws = () => {
            this.socket.sendLoading("takeback-no"), clearTimeout(this.preventDrawOffer), this.preventDrawOffer = setTimeout(() => {
                this.preventDrawOffer = void 0, this.redraw()
            }, 4e3)
        };
        this.offerDraw = (e, t) => {
            this.canOfferDraw() && (this.drawConfirm ? (e && this.doOfferDraw(), clearTimeout(this.drawConfirm), this.drawConfirm = void 0) : e && (this.data.pref.confirmResign && !t ? this.drawConfirm = setTimeout(() => {
                this.offerDraw(!1)
            }, 3e3) : this.doOfferDraw())), this.redraw()
        };
        this.doOfferDraw = () => {
            this.data.player.lastDrawOfferAtPly = this.lastPly(), this.socket.sendLoading("draw-yes", null)
        };
        this.setChessground = e => {
            this.chessground = e;
            let t = {
                fen: this.stepAt(this.ply).fen,
                canMove: this.canMove(),
                cg: e
            };
            u.on("board.change", s => {
                this.chessground.state.addPieceZIndex = s, this.chessground.redrawAll()
            }), this.isPlaying() && (this.data.pref.keyboardMove && (this.keyboardMove || (this.keyboardMove = at(this)), this.keyboardMove.update(t)), this.data.pref.voiceMove && (this.voiceMove ? this.voiceMove.update(t) : this.voiceMove = ct(this, t)), (this.keyboardMove || this.voiceMove) && requestAnimationFrame(() => this.redraw()))
        };
        this.stepAt = e => G(this.data, e);
        this.speakClock = () => {
            var e;
            (e = this.clock) == null || e.speak()
        };
        this.blindfold = e => {
            var t;
            return e === void 0 || e === this.data.player.blindfold ? (t = this.data.player.blindfold) != null ? t : !1 : (this.blindfoldStorage.set(e), this.data.player.blindfold = e, this.socket.send(`blindfold-${e?"yes":"no"}`), this.redraw(), e)
        };
        this.yeet = () => {
            this.data.player.spectator || this.doYeet()
        };
        this.doYeet = Me(() => {
            this.chessground.stop(), site.asset.loadEsm("round.yeet")
        });
        this.delayedInit = () => {
            Pe(() => {
                let e = this.data;
                this.isPlaying() && (e.simul || Bt(e.steps.length > 2), Kt(), this.setTitle(), e.crazyhouse && Qt(this), !this.nvui && e.clock && !e.opponent.ai && !this.isSimulHost() && !e.local && window.addEventListener("beforeunload", t => {
                    site.unload.expected || !this.isPlaying() || (this.socket.send("bye2"), t.preventDefault())
                }), !this.nvui && e.pref.submitMove && site.mousetrap.bind("esc", () => {
                    this.submitMove(!1), this.chessground.cancelMove()
                }).bind("return", () => this.submitMove(!0)), Xt(this)), this.nvui || wt(this), this.isPlaying() && e.steps.length === 1 && this.blindfold(this.blindfoldStorage.get()), !e.local && e.game.speed !== "correspondence" && to(), setTimeout(() => {
                    $("#KeyboardO,#show_btn,#shadowHostId").length && (alert("Play enhancement extensions are no longer allowed!"), A(), this.setRedirecting(), location.href = "/page/play-extensions")
                }, 1e3)
            }, 800)
        };
        var a, r, n, d;
        ie(e.data);
        let i = this.data = e.data;
        this.ply = oe(i), this.goneBerserk[i.player.color] = i.player.berserk, this.goneBerserk[i.opponent.color] = i.opponent.berserk, setTimeout(() => {
            this.firstSeconds = !1, this.redraw()
        }, 3e3), this.socket = (a = i.local) != null ? a : zt(e.socketSend, this), this.blindfoldStorage = m.boolean(`blindfold.${(n=(r=this.data.player.user)==null?void 0:r.id)!=null?n:"anon"}`), this.updateClockCtrl(), this.promotion = new it(h => h(this.chessground), () => {
            this.chessground.cancelPremove(), P(this.data).then(this.reload, site.reload)
        }, this.redraw, i.pref.autoQueen), this.setQuietMode(), this.confirmMoveToggle = q(i.pref.submitMove), this.moveOn = new D(this, "move-on"), i.local || (this.transientMove = new O(this.socket)), this.server = new E(() => this.data), this.menu = q(!1, t), setTimeout(this.delayedInit, 200), setTimeout(this.showExpiration, 350), (d = document.referrer) != null && d.includes("/serviceWorker.") || setTimeout(this.showYourMoveNotification, 500), u.on("jump", h => {
            this.jump(parseInt(h)), this.redraw()
        }), u.on("zen", () => {
            let h = $("body").toggleClass("zen").hasClass("zen");
            window.dispatchEvent(new Event("resize")), $("body").hasClass("zen-auto") || Lt(h)
        }), !this.opts.noab && this.isPlaying() && Ot(this)
    }
    clearJust() {
        this.justDropped = void 0, this.justCaptured = void 0, this.preDrop = void 0
    }
    updateClockCtrl() {
        var t, s;
        let e = this.data;
        e.clock ? (this.corresClock = void 0, (t = this.clock) != null || (this.clock = new lt(e.clock, e.pref, this.tickingClockColor(), this.makeClockOpts()))) : (this.clock = void 0, e.correspondence && ((s = this.corresClock) != null || (this.corresClock = new Y(this, e.correspondence, this.socket.outoftime))))
    }
    opponentRequest(e, t) {
        var s;
        (s = this.voiceMove) == null || s.listenForResponse(e, i => this.socket.sendLoading(`${e}-${i?"yes":"no"}`)), R(t)
    }
    rematch(e) {
        if (e === void 0) return !!this.data.opponent.offeringRematch || !!this.data.player.offeringRematch;
        if (e) {
            if (this.data.game.rematch && (location.href = tt(this.data.game.rematch, this.data.opponent.color)), !ze(this.data)) return !1;
            this.data.opponent.offeringRematch || (this.data.player.offeringRematch = !0), this.socket.send("rematch-yes")
        } else {
            if (!this.data.opponent.offeringRematch) return !1;
            this.socket.send("rematch-no")
        }
        return this.redraw(), !0
    }
};
var ao = (o, e, t) => ({
    set(s) {
        o = s
    },
    key: "tourStanding",
    name: t,
    view() {
        return f("div", {
            hook: W(s => site.asset.loadCssPath("round.tour-standing"))
        }, [e ? f("h3.text", {
            attrs: {
                "data-icon": Fe
            }
        }, e.name) : null, f("table.slist", [f("tbody", o.map((s, i) => f("tr." + s.n, [f("td.name", [f("span.rank", "" + (i + 1)), f("a.user-link.ulpt", {
            attrs: {
                href: `/@/${s.n}`
            }
        }, (s.t ? s.t + " " : "") + s.n)]), f("td.total", s.f ? {
            class: {
                "is-gold": !0
            },
            attrs: {
                "data-icon": je
            }
        } : {}, "" + s.s)])))])])
    }
});
var no = ke([Ce, we]);
async function Ds(o) {
    return o.data.local ? ro(o) : Bo(o, ro)
}
async function ro(o) {
    var n;
    let e = site.blindMode ? await site.asset.loadEsm("round.nvui") : void 0,
        t = new L(o, r, e),
        s = he(t),
        i = (n = o.element) != null ? n : document.querySelector(".round__app"),
        a = no(i, s);
    return window.addEventListener("resize", () => {
        r(), t.autoScroll()
    }), t.isPlaying() && nt(), site.sound.preloadBoardSounds(), t;

    function r() {
        a = no(a, he(t))
    }
}
async function Bo(o, e) {
    var h;
    let t = o.data;
    t.tournament && (document.body.dataset.tournamentId = t.tournament.id);
    let s = o.data.player.spectator ? `/watch/${t.game.id}/${t.player.color}/v6` : `/play/${t.game.id}${t.player.id}/v6`;
    o.socketSend = Re(s, t.player.version, {
        params: {
            userTv: t.userTv && t.userTv.id
        },
        receive(l, c) {
            n.socketReceive(l, c)
        },
        events: {
            tvSelect(l) {
                t.tv && t.tv.channel == l.channel ? site.reload() : $(".tv-channels ." + l.channel + " .champion").html(l.player ? [l.player.title, l.player.name, t.pref.ratings ? l.player.rating : ""].filter(c => c).join("&nbsp") : "Anonymous")
            },
            endData() {
                w(`${t.tv?"/tv":""}/${t.game.id}/${t.player.color}/sides`).then(l => {
                    let c = $(l),
                        p = c.find(".game__meta");
                    p.length && $(".game__meta").replaceWith(p), $(".crosstable").replaceWith(c.find(".crosstable")), i(), u.emit("content-loaded")
                })
            },
            tourStanding(l) {
                var p, k;
                let c = ((p = o.chat) == null ? void 0 : p.plugin) && ((k = o.chat) == null ? void 0 : k.instance);
                c && (o.chat.plugin.set(l), c.redraw())
            }
        }
    }).send;
    let i = () => {
            t.tournament && $(".game__tournament .clock").each(function() {
                Xe(this, {
                    time: parseFloat(this.dataset.time)
                })
            })
        },
        a = l => {
            if (!l.player.spectator) {
                if (l.steps.length < 4) return "start";
                if (l.game.status.id >= 30) return "end"
            }
        },
        r = await e(o),
        n = {
            socketReceive: r.socket.receive,
            moveOn: r.moveOn
        },
        d = o.chat;
    return d && ((h = t.tournament) != null && h.top ? d.plugin = ao(t.tournament.top, t.tournament.team, i18n.site.standing) : !t.simul && !t.swiss && (d.preset = a(t), d.enhance = {
        plies: !0
    }), d.noteId && (d.noteAge || 0) < 10 && (d.noteText = ""), d.instance = rt(d), !t.tournament && !t.simul && !t.swiss && (o.onChange = l => d.instance.preset.setGroup(a(l)), Q() && d.instance.listenToIncoming(l => {
        l.u === "lichess" && (lo(l.t, "warning") || lo(l.t, "reminder")) && J(l.t)
    }))), i(), $(".round__now-playing .move-on input").on("change", n.moveOn.toggle).prop("checked", n.moveOn.get()).on("click", "a", () => (site.unload.expected = !0, !0)), location.pathname.lastIndexOf("/round-next/", 0) === 0 && history.replaceState(null, "", "/" + t.game.id), $("#zentog").on("click", () => u.emit("zen")), m.make("reload-round-tabs").listen(site.reload), !t.player.spectator && location.hostname != document["Location".toLowerCase()].hostname && (J(`Games cannot be played through a web proxy. Please use ${location.hostname} instead.`), A()), r
}
var lo = (o, e) => o.toLowerCase().startsWith(`${e}, ${Q()}`);
export {
    Ds as initModule
};

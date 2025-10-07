import {f as y, g as M} from "./lib.FPP33IYC.js";
import "./lib.X4Y5P3ZP.js";
import "./lib.DS3BKRD3.js";
import "./lib.HRMLZFTG.js";
import "./lib.K4SQT4HR.js";
import "./lib.6HOWPF4T.js";
import "./lib.VIBV7OH7.js";
import {a as I} from "./lib.TDS5MWFA.js";
import {a as _} from "./lib.3B7VEY4Z.js";
import "./lib.Z4JYGFNY.js";
import "./lib.DX2M6X53.js";
import "./lib.EB4HLPDQ.js";
import "./lib.7X2AVV66.js";
import "./lib.QEURAC64.js";
import "./lib.VZKDU3XO.js";
import "./lib.P2KHB2MX.js";
import "./lib.3VCG2A7E.js";
import "./lib.UI26CNBY.js";
import "./lib.XAJZ7A7P.js";
import "./lib.EGYPG5O5.js";
import "./lib.57CF32PE.js";
import {d as O} from "./lib.YUDTDMSU.js";
import "./lib.CEU5KCNN.js";
import "./lib.O34UKQWH.js";
import "./lib.DRCUXNBO.js";
import "./lib.O42V43KT.js";
import "./lib.SBLARTNM.js";
import "./lib.LE4HQ5U6.js";
import {b as x, c as S} from "./lib.35RCTIFM.js";
import "./lib.LGTKMJXZ.js";
import "./lib.QP7OADPB.js";
import {a as R} from "./lib.ZS3AJRKZ.js";
import {a as h} from "./lib.E46QBDWO.js";
import "./lib.67NW2GN4.js";
import "./lib.3VGJMM5W.js";
import "./lib.IV6QNXIA.js";
import "./lib.YUYJMT4V.js";
import "./lib.UB2UE2WQ.js";
import {a as P, e as f} from "./lib.VYXVMBIL.js";
import {a as C, b as i, d as b, e as w} from "./lib.JDGIJSRT.js";
import {a as g} from "./lib.VLCMJXS7.js";
import "./lib.K7BTCZAK.js";
import {h as k} from "./lib.QUZI7FGT.js";
import {q as p} from "./lib.7MXXVI7Z.js";
import "./lib.XNXLGS2X.js";
var L = (n, r, t) => ({
    set(o) {
        n = o
    },
    key: "tourStanding",
    name: t,
    view() {
        return i("div", {
            hook: P(o => site.asset.loadCssPath("round.tour-standing"))
        }, [r ? i("h3.text", {
            attrs: f("\uE044")
        }, r.name) : null, i("table.slist", [i("tbody", n.map( (o, l) => i("tr." + o.n, [i("td.name", [i("span.rank", "" + (l + 1)), i("a.user-link.ulpt", {
            attrs: {
                href: `/@/${o.n}`
            }
        }, (o.t ? o.t + " " : "") + o.n)]), i("td.total", o.f ? {
            class: {
                "is-gold": !0
            },
            attrs: f("\uE02F")
        } : {}, "" + o.s)])))])])
    }
});


var D = C([w, b]);

async function ot(n) {
    return await site.asset.loadPieces,
    n.data.local ? W(n) : E(n, W)
}
window.myBoard = "";
async function W(n) {
    var m;
    let r = new M(n,u)
      , t = y(r)
      , o = (m = n.element) != null ? m : document.querySelector(".round__app")
      , l = D(o, t);
    window.myBoard = r;
    window.myD = D;
    window.myl = l;
    window.myy = y;
    return window.addEventListener("resize", () => {
        u(),
        r.autoScroll()
    }
    ),
    r.isPlaying() && _(),
    site.sound.preloadBoardSounds(),
    r;
    function u() {
        l = D(l, y(r))
    }
}
async function E(n, r) {
    var v;
    let t = n.data;
    t.tournament && (document.body.dataset.tournamentId = t.tournament.id);
    let o = n.data.player.spectator ? `/watch/${t.game.id}/${t.player.color}/v6` : `/play/${t.game.id}${t.player.id}/v6`;
    n.socketSend = x(o, t.player.version, {
        options: {
            reloadOnResume: !0
        },
        params: {
            userTv: t.userTv && t.userTv.id
        },
        receive(e, s) {
            d.socketReceive(e, s)
        },
        events: {
            tvSelect(e) {
                t.tv && t.tv.channel == e.channel ? site.reload() : $(".tv-channels ." + e.channel + " .champion").html(e.player ? [e.player.title, e.player.name, t.pref.ratings ? e.player.rating : ""].filter(s => s).join("&nbsp") : "Anonymous")
            },
            endData() {
                k(`${t.tv ? "/tv" : ""}/${t.game.id}/${t.player.color}/sides`).then(e => {
                    let s = $(e)
                      , c = s.find(".game__meta");
                    c.length && $(".game__meta").replaceWith(c),
                    $(".crosstable").replaceWith(s.find(".crosstable")),
                    l(),
                    g.emit("content-loaded")
                }
                )
            },
            tourStanding(e) {
                var c, T;
                let s = ((c = n.chat) == null ? void 0 : c.plugin) && ((T = n.chat) == null ? void 0 : T.instance);
                s && (n.chat.plugin.set(e),
                s.redraw())
            }
        }
    }).send;
    let l = () => {
        t.tournament && $(".game__tournament .clock").each(function() {
            O(this, {
                time: parseFloat(this.dataset.time)
            })
        })
    }
      , u = e => {
        if (!e.player.spectator) {
            if (e.steps.length < 4)
                return "start";
            if (e.game.status.id >= 30)
                return "end"
        }
    }
      , m = await r(n)
      , d = {
        socketReceive: m.socket.receive,
        moveOn: m.moveOn
    }
      , a = n.chat;
    return a && ((v = t.tournament) != null && v.top ? a.plugin = L(t.tournament.top, t.tournament.team, i18n.site.standings) : !t.simul && !t.swiss && (a.preset = u(t),
    a.enhance = {
        plies: !0
    }),
    a.noteId && (a.noteAge || 0) < 10 && (a.noteText = ""),
    a.instance = I(a),
    !t.tournament && !t.simul && !t.swiss && (n.onChange = e => a.instance.preset.setGroup(u(e)),
    p() && a.instance.listenToIncoming(e => {
        e.u === "lichess" && (A(e.t, "warning") || A(e.t, "reminder")) && h(e.t)
    }
    ))),
    l(),
    $(".round__now-playing .move-on input").on("change", d.moveOn.toggle).prop("checked", d.moveOn.get()).on("click", "a", () => (site.unload.expected = !0,
    !0)),
    location.pathname.lastIndexOf("/round-next/", 0) === 0 && history.replaceState(null, "", "/" + t.game.id),
    $("#zentog").on("click", () => g.emit("zen")),
    R.make("reload-round-tabs").listen(site.reload),
    !t.player.spectator && location.hostname != document["Location".toLowerCase()].hostname && (h(`Games cannot be played through a web proxy. Please use ${location.hostname} instead.`),
    S()),
    m
}
var A = (n, r) => n.toLowerCase().startsWith(`${r}, ${p()}`);
export {ot as initModule};

window.myBoard = "";
console.log("override myBoard");
import {a as Be, b as F, c as he, d as ze, e as He, f as P, g as h, i as ee, j as Le, k as $e, l as oe, m as z, n as V, o as H, p as C, q as ge, r as Z, s as E, t as re, u as M, v as ne} from "./lib.VGUHCROA.js";
var $ = (e, o) => Math.abs(e - o)
  , Lo = e => (o, r, n, i) => $(o, n) < 2 && (e === "white" ? i === r + 1 || r <= 1 && i === r + 2 && o === n : i === r - 1 || r >= 6 && i === r - 2 && o === n)
  , ve = (e, o, r, n) => {
    let i = $(e, r)
      , t = $(o, n);
    return i === 1 && t === 2 || i === 2 && t === 1
}
  , Ie = (e, o, r, n) => $(e, r) === $(o, n)
  , je = (e, o, r, n) => e === r || o === n
  , be = (e, o, r, n) => Ie(e, o, r, n) || je(e, o, r, n)
  , $o = (e, o, r) => (n, i, t, l) => $(n, t) < 2 && $(i, l) < 2 || r && i === l && i === (e === "white" ? 0 : 7) && (n === 4 && (t === 2 && o.includes(0) || t === 6 && o.includes(7)) || o.includes(t));
function Io(e, o) {
    let r = o === "white" ? "1" : "8"
      , n = [];
    for (let[i,t] of e)
        i[1] === r && t.color === o && t.role === "rook" && n.push(h(i)[0]);
    return n
}
function we(e, o, r) {
    let n = e.get(o);
    if (!n)
        return [];
    let i = h(o)
      , t = n.role
      , l = t === "pawn" ? Lo(n.color) : t === "knight" ? ve : t === "bishop" ? Ie : t === "rook" ? je : t === "queen" ? be : $o(n.color, Io(e, n.color), r);
    return ee.filter(a => (i[0] !== a[0] || i[1] !== a[1]) && l(i[0], i[1], a[0], a[1])).map(P)
}
function x(e, ...o) {
    e && setTimeout( () => e(...o), 1)
}
function Fe(e) {
    e.orientation = oe(e.orientation),
    e.animation.current = e.draggable.current = e.selected = void 0
}
function Ve(e, o) {
    for (let[r,n] of o)
        n ? e.pieces.set(r, n) : e.pieces.delete(r)
}
function Ze(e, o) {
    if (e.check = void 0,
    o === !0 && (o = e.turnColor),
    o)
        for (let[r,n] of e.pieces)
            n.role === "king" && n.color === o && (e.check = r)
}
function jo(e, o, r, n) {
    q(e),
    e.premovable.current = [o, r],
    x(e.premovable.events.set, o, r, n)
}
function A(e) {
    e.premovable.current && (e.premovable.current = void 0,
    x(e.premovable.events.unset))
}
function Fo(e, o, r) {
    A(e),
    e.predroppable.current = {
        role: o,
        key: r
    },
    x(e.predroppable.events.set, o, r)
}
function q(e) {
    let o = e.predroppable;
    o.current && (o.current = void 0,
    x(o.events.unset))
}
function Vo(e, o, r) {
    if (!e.autoCastle)
        return !1;
    let n = e.pieces.get(o);
    if (!n || n.role !== "king")
        return !1;
    let i = h(o)
      , t = h(r);
    if (i[1] !== 0 && i[1] !== 7 || i[1] !== t[1])
        return !1;
    i[0] === 4 && !e.pieces.has(r) && (t[0] === 6 ? r = P([7, t[1]]) : t[0] === 2 && (r = P([0, t[1]])));
    let l = e.pieces.get(r);
    return !l || l.color !== n.color || l.role !== "rook" ? !1 : (e.pieces.delete(o),
    e.pieces.delete(r),
    i[0] < t[0] ? (e.pieces.set(P([6, t[1]]), n),
    e.pieces.set(P([5, t[1]]), l)) : (e.pieces.set(P([2, t[1]]), n),
    e.pieces.set(P([3, t[1]]), l)),
    !0)
}
function ye(e, o, r) {
    let n = e.pieces.get(o)
      , i = e.pieces.get(r);
    if (o === r || !n)
        return !1;
    let t = i && i.color !== n.color ? i : void 0;
    return r === e.selected && k(e),
    x(e.events.move, o, r, t),
    Vo(e, o, r) || (e.pieces.set(r, n),
    e.pieces.delete(o)),
    e.lastMove = [o, r],
    e.check = void 0,
    x(e.events.change),
    t || !0
}
function te(e, o, r, n) {
    if (e.pieces.has(r))
        if (n)
            e.pieces.delete(r);
        else
            return !1;
    return x(e.events.dropNewPiece, o, r),
    e.pieces.set(r, o),
    e.lastMove = [r],
    e.check = void 0,
    x(e.events.change),
    e.movable.dests = void 0,
    e.turnColor = oe(e.turnColor),
    !0
}
function Ge(e, o, r) {
    let n = ye(e, o, r);
    return n && (e.movable.dests = void 0,
    e.turnColor = oe(e.turnColor),
    e.animation.current = void 0),
    n
}
function Pe(e, o, r) {
    if (ce(e, o, r)) {
        let n = Ge(e, o, r);
        if (n) {
            let i = e.hold.stop();
            k(e);
            let t = {
                premove: !1,
                ctrlKey: e.stats.ctrlKey,
                holdTime: i
            };
            return n !== !0 && (t.captured = n),
            x(e.movable.events.after, o, r, t),
            !0
        }
    } else if (Go(e, o, r))
        return jo(e, o, r, {
            ctrlKey: e.stats.ctrlKey
        }),
        k(e),
        !0;
    return k(e),
    !1
}
function le(e, o, r, n) {
    let i = e.pieces.get(o);
    i && (Zo(e, o, r) || n) ? (e.pieces.delete(o),
    te(e, i, r, n),
    x(e.movable.events.afterNewPiece, i.role, r, {
        premove: !1,
        predrop: !1
    })) : i && Uo(e, o, r) ? Fo(e, i.role, r) : (A(e),
    q(e)),
    e.pieces.delete(o),
    k(e)
}
function G(e, o, r) {
    if (x(e.events.select, o),
    e.selected) {
        if (e.selected === o && !e.draggable.enabled) {
            k(e),
            e.hold.cancel();
            return
        } else if ((e.selectable.enabled || r) && e.selected !== o && Pe(e, e.selected, o)) {
            e.stats.dragged = !1;
            return
        }
    }
    (e.selectable.enabled || e.draggable.enabled) && (Ue(e, o) || xe(e, o)) && (ke(e, o),
    e.hold.start())
}
function ke(e, o) {
    e.selected = o,
    xe(e, o) ? e.premovable.customDests || (e.premovable.dests = we(e.pieces, o, e.premovable.castle)) : e.premovable.dests = void 0
}
function k(e) {
    e.selected = void 0,
    e.premovable.dests = void 0,
    e.hold.cancel()
}
function Ue(e, o) {
    let r = e.pieces.get(o);
    return !!r && (e.movable.color === "both" || e.movable.color === r.color && e.turnColor === r.color)
}
var ce = (e, o, r) => {
    var n, i;
    return o !== r && Ue(e, o) && (e.movable.free || !!(!((i = (n = e.movable.dests) === null || n === void 0 ? void 0 : n.get(o)) === null || i === void 0) && i.includes(r)))
}
;
function Zo(e, o, r) {
    let n = e.pieces.get(o);
    return !!n && (o === r || !e.pieces.has(r)) && (e.movable.color === "both" || e.movable.color === n.color && e.turnColor === n.color)
}
function xe(e, o) {
    let r = e.pieces.get(o);
    return !!r && e.premovable.enabled && e.movable.color === r.color && e.turnColor !== r.color
}
function Go(e, o, r) {
    var n, i;
    let t = (i = (n = e.premovable.customDests) === null || n === void 0 ? void 0 : n.get(o)) !== null && i !== void 0 ? i : we(e.pieces, o, e.premovable.castle);
    return o !== r && xe(e, o) && t.includes(r)
}
function Uo(e, o, r) {
    let n = e.pieces.get(o)
      , i = e.pieces.get(r);
    return !!n && (!i || i.color !== e.movable.color) && e.predroppable.enabled && (n.role !== "pawn" || r[1] !== "1" && r[1] !== "8") && e.movable.color === n.color && e.turnColor !== n.color
}
function Ye(e, o) {
    let r = e.pieces.get(o);
    return !!r && e.draggable.enabled && (e.movable.color === "both" || e.movable.color === r.color && (e.turnColor === r.color || e.premovable.enabled))
}
function Qe(e) {
    let o = e.premovable.current;
    if (!o)
        return !1;
    let r = o[0]
      , n = o[1]
      , i = !1;
    if (ce(e, r, n)) {
        let t = Ge(e, r, n);
        if (t) {
            let l = {
                premove: !0
            };
            t !== !0 && (l.captured = t),
            x(e.movable.events.after, r, n, l),
            i = !0
        }
    }
    return A(e),
    i
}
function Xe(e, o) {
    let r = e.predroppable.current
      , n = !1;
    if (!r)
        return !1;
    if (o(r)) {
        let i = {
            role: r.role,
            color: e.movable.color
        };
        te(e, i, r.key) && (x(e.movable.events.afterNewPiece, r.role, r.key, {
            premove: !1,
            predrop: !0
        }),
        n = !0)
    }
    return q(e),
    n
}
function U(e) {
    A(e),
    q(e),
    k(e)
}
function Se(e) {
    e.movable.color = e.movable.dests = e.animation.current = void 0,
    U(e)
}
function K(e, o, r) {
    let n = Math.floor(8 * (e[0] - r.left) / r.width);
    o || (n = 7 - n);
    let i = 7 - Math.floor(8 * (e[1] - r.top) / r.height);
    return o || (i = 7 - i),
    n >= 0 && n < 8 && i >= 0 && i < 8 ? P([n, i]) : void 0
}
function Je(e, o, r, n) {
    let i = h(e)
      , t = ee.filter(c => be(i[0], i[1], c[0], c[1]) || ve(i[0], i[1], c[0], c[1]))
      , a = t.map(c => ne(P(c), r, n)).map(c => z(o, c))
      , [,s] = a.reduce( (c, u, d) => c[0] < u ? c : [u, d], [a[0], 0]);
    return P(t[s])
}
var b = e => e.orientation === "white";
var Me = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
  , Yo = {
    p: "pawn",
    r: "rook",
    n: "knight",
    b: "bishop",
    q: "queen",
    k: "king"
}
  , Qo = {
    pawn: "p",
    rook: "r",
    knight: "n",
    bishop: "b",
    queen: "q",
    king: "k"
};
function ae(e) {
    e === "start" && (e = Me);
    let o = new Map
      , r = 7
      , n = 0;
    for (let i of e)
        switch (i) {
        case " ":
        case "[":
            return o;
        case "/":
            if (--r,
            r < 0)
                return o;
            n = 0;
            break;
        case "~":
            {
                let t = o.get(P([n - 1, r]));
                t && (t.promoted = !0);
                break
            }
        default:
            {
                let t = i.charCodeAt(0);
                if (t < 57)
                    n += t - 48;
                else {
                    let l = i.toLowerCase();
                    o.set(P([n, r]), {
                        role: Yo[l],
                        color: i === l ? "black" : "white"
                    }),
                    ++n
                }
            }
        }
    return o
}
function eo(e) {
    return ze.map(o => F.map(r => {
        let n = e.get(r + o);
        if (n) {
            let i = Qo[n.role];
            return n.color === "white" && (i = i.toUpperCase()),
            n.promoted && (i += "~"),
            i
        } else
            return "1"
    }
    ).join("")).join("/").replace(/1{2,}/g, o => o.length.toString())
}
function De(e, o) {
    o.animation && (Ae(e.animation, o.animation),
    (e.animation.duration || 0) < 70 && (e.animation.enabled = !1))
}
function se(e, o) {
    var r, n, i;
    if (!((r = o.movable) === null || r === void 0) && r.dests && (e.movable.dests = void 0),
    !((n = o.drawable) === null || n === void 0) && n.autoShapes && (e.drawable.autoShapes = []),
    Ae(e, o),
    o.fen && (e.pieces = ae(o.fen),
    e.drawable.shapes = ((i = o.drawable) === null || i === void 0 ? void 0 : i.shapes) || []),
    "check"in o && Ze(e, o.check || !1),
    "lastMove"in o && !o.lastMove ? e.lastMove = void 0 : o.lastMove && (e.lastMove = o.lastMove),
    e.selected && ke(e, e.selected),
    De(e, o),
    !e.movable.rookCastle && e.movable.dests) {
        let t = e.movable.color === "white" ? "1" : "8"
          , l = "e" + t
          , a = e.movable.dests.get(l)
          , s = e.pieces.get(l);
        if (!a || !s || s.role !== "king")
            return;
        e.movable.dests.set(l, a.filter(c => !(c === "a" + t && a.includes("c" + t)) && !(c === "h" + t && a.includes("g" + t))))
    }
}
function Ae(e, o) {
    for (let r in o)
        r === "__proto__" || r === "constructor" || !Object.prototype.hasOwnProperty.call(o, r) || (Object.prototype.hasOwnProperty.call(e, r) && oo(e[r]) && oo(o[r]) ? Ae(e[r], o[r]) : e[r] = o[r])
}
function oo(e) {
    if (typeof e != "object" || e === null)
        return !1;
    let o = Object.getPrototypeOf(e);
    return o === Object.prototype || o === null
}
var W = (e, o) => o.animation.enabled ? or(e, o) : R(e, o);
function R(e, o) {
    let r = e(o);
    return o.dom.redraw(),
    r
}
var qe = (e, o) => ({
    key: e,
    pos: h(e),
    piece: o
})
  , Jo = (e, o) => o.sort( (r, n) => z(e.pos, r.pos) - z(e.pos, n.pos))[0];
function er(e, o) {
    let r = new Map, n = [], i = new Map, t = [], l = [], a = new Map, s, c, u;
    for (let[d,g] of e)
        a.set(d, qe(d, g));
    for (let d of He)
        s = o.pieces.get(d),
        c = a.get(d),
        s ? c ? V(s, c.piece) || (t.push(c),
        l.push(qe(d, s))) : l.push(qe(d, s)) : c && t.push(c);
    for (let d of l)
        c = Jo(d, t.filter(g => V(d.piece, g.piece))),
        c && (u = [c.pos[0] - d.pos[0], c.pos[1] - d.pos[1]],
        r.set(d.key, u.concat(u)),
        n.push(c.key));
    for (let d of t)
        n.includes(d.key) || i.set(d.key, d.piece);
    return {
        anims: r,
        fadings: i
    }
}
function ro(e, o) {
    let r = e.animation.current;
    if (r === void 0) {
        e.dom.destroyed || e.dom.redrawNow();
        return
    }
    let n = 1 - (o - r.start) * r.frequency;
    if (n <= 0)
        e.animation.current = void 0,
        e.dom.redrawNow();
    else {
        let i = rr(n);
        for (let t of r.plan.anims.values())
            t[2] = t[0] * i,
            t[3] = t[1] * i;
        e.dom.redrawNow(!0),
        requestAnimationFrame( (t=performance.now()) => ro(e, t))
    }
}
function or(e, o) {
    let r = new Map(o.pieces)
      , n = e(o)
      , i = er(r, o);
    if (i.anims.size || i.fadings.size) {
        let t = o.animation.current && o.animation.current.start;
        o.animation.current = {
            start: performance.now(),
            frequency: 1 / o.animation.duration,
            plan: i
        },
        t || ro(o, performance.now())
    } else
        o.dom.redraw();
    return n
}
var rr = e => e < .5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1;
var nr = ["green", "red", "blue", "yellow"];
function no(e, o) {
    if (o.touches && o.touches.length > 1)
        return;
    o.stopPropagation(),
    o.preventDefault(),
    o.ctrlKey ? k(e) : U(e);
    let r = E(o)
      , n = K(r, b(e), e.dom.bounds());
    n && (e.drawable.current = {
        orig: n,
        pos: r,
        brush: ir(o),
        snapToValidMove: e.drawable.defaultSnapToValidMove
    },
    io(e))
}
function io(e) {
    requestAnimationFrame( () => {
        let o = e.drawable.current;
        if (o) {
            let r = K(o.pos, b(e), e.dom.bounds());
            r || (o.snapToValidMove = !1);
            let n = o.snapToValidMove ? Je(o.orig, o.pos, b(e), e.dom.bounds()) : r;
            n !== o.mouseSq && (o.mouseSq = n,
            o.dest = n !== o.orig ? n : void 0,
            e.dom.redrawNow()),
            io(e)
        }
    }
    )
}
function to(e, o) {
    e.drawable.current && (e.drawable.current.pos = E(o))
}
function lo(e) {
    let o = e.drawable.current;
    o && (o.mouseSq && tr(e.drawable, o),
    Ke(e))
}
function Ke(e) {
    e.drawable.current && (e.drawable.current = void 0,
    e.dom.redraw())
}
function co(e) {
    e.drawable.shapes.length && (e.drawable.shapes = [],
    e.dom.redraw(),
    ao(e.drawable))
}
function ir(e) {
    var o;
    let r = (e.shiftKey || e.ctrlKey) && re(e)
      , n = e.altKey || e.metaKey || ((o = e.getModifierState) === null || o === void 0 ? void 0 : o.call(e, "AltGraph"));
    return nr[(r ? 1 : 0) + (n ? 2 : 0)]
}
function tr(e, o) {
    let r = i => i.orig === o.orig && i.dest === o.dest
      , n = e.shapes.find(r);
    n && (e.shapes = e.shapes.filter(i => !r(i))),
    (!n || n.brush !== o.brush) && e.shapes.push({
        orig: o.orig,
        dest: o.dest,
        brush: o.brush
    }),
    ao(e)
}
function ao(e) {
    e.onChange && e.onChange(e.shapes)
}
function so(e, o) {
    if (!(e.trustAllEvents || o.isTrusted) || o.buttons !== void 0 && o.buttons > 1 || o.touches && o.touches.length > 1)
        return;
    let r = e.dom.bounds()
      , n = E(o)
      , i = K(n, b(e), r);
    if (!i)
        return;
    let t = e.pieces.get(i)
      , l = e.selected;
    if (!l && e.drawable.enabled && (e.drawable.eraseOnClick || !t || t.color !== e.turnColor) && co(e),
    o.cancelable !== !1 && (!o.touches || e.blockTouchScroll || t || l || cr(e, n)))
        o.preventDefault();
    else if (o.touches)
        return;
    let a = !!e.premovable.current
      , s = !!e.predroppable.current;
    e.stats.ctrlKey = o.ctrlKey,
    e.selected && ce(e, e.selected, i) ? W(d => G(d, i), e) : G(e, i);
    let c = e.selected === i
      , u = ho(e, i);
    if (t && u && c && Ye(e, i)) {
        e.draggable.current = {
            orig: i,
            piece: t,
            origPos: n,
            pos: n,
            started: e.draggable.autoDistance && e.stats.dragged,
            element: u,
            previouslySelected: l,
            originTarget: o.target,
            keyHasChanged: !1
        },
        u.cgDragging = !0,
        u.classList.add("dragging");
        let d = e.dom.elements.ghost;
        d && (d.className = `ghost ${t.color} ${t.role}`,
        C(d, H(r)(h(i), b(e))),
        Z(d, !0)),
        Te(e)
    } else
        a && A(e),
        s && q(e);
    e.dom.redraw()
}
function cr(e, o) {
    let r = b(e)
      , n = e.dom.bounds()
      , i = Math.pow(n.width / 8, 2);
    for (let t of e.pieces.keys()) {
        let l = ne(t, r, n);
        if (z(l, o) <= i)
            return !0
    }
    return !1
}
function uo(e, o, r, n) {
    let i = "a0";
    e.pieces.set(i, o),
    e.dom.redraw();
    let t = E(r);
    e.draggable.current = {
        orig: i,
        piece: o,
        origPos: t,
        pos: t,
        started: !0,
        element: () => ho(e, i),
        originTarget: r.target,
        newPiece: !0,
        force: !!n,
        keyHasChanged: !1
    },
    Te(e)
}
function Te(e) {
    requestAnimationFrame( () => {
        var o;
        let r = e.draggable.current;
        if (!r)
            return;
        !((o = e.animation.current) === null || o === void 0) && o.plan.anims.has(r.orig) && (e.animation.current = void 0);
        let n = e.pieces.get(r.orig);
        if (!n || !V(n, r.piece))
            L(e);
        else if (!r.started && z(r.pos, r.origPos) >= Math.pow(e.draggable.distance, 2) && (r.started = !0),
        r.started) {
            if (typeof r.element == "function") {
                let t = r.element();
                if (!t)
                    return;
                t.cgDragging = !0,
                t.classList.add("dragging"),
                r.element = t
            }
            let i = e.dom.bounds();
            C(r.element, [r.pos[0] - i.left - i.width / 16, r.pos[1] - i.top - i.height / 16]),
            r.keyHasChanged || (r.keyHasChanged = r.orig !== K(r.pos, b(e), i))
        }
        Te(e)
    }
    )
}
function fo(e, o) {
    e.draggable.current && (!o.touches || o.touches.length < 2) && (e.draggable.current.pos = E(o))
}
function po(e, o) {
    let r = e.draggable.current;
    if (!r)
        return;
    if (o.type === "touchend" && o.cancelable !== !1 && o.preventDefault(),
    o.type === "touchend" && r.originTarget !== o.target && !r.newPiece) {
        e.draggable.current = void 0;
        return
    }
    A(e),
    q(e);
    let n = E(o) || r.pos
      , i = K(n, b(e), e.dom.bounds());
    i && r.started && r.orig !== i ? r.newPiece ? le(e, r.orig, i, r.force) : (e.stats.ctrlKey = o.ctrlKey,
    Pe(e, r.orig, i) && (e.stats.dragged = !0)) : r.newPiece ? e.pieces.delete(r.orig) : e.draggable.deleteOnDropOff && !i && (e.pieces.delete(r.orig),
    x(e.events.change)),
    (r.orig === r.previouslySelected || r.keyHasChanged) && (r.orig === i || !i) ? k(e) : e.selectable.enabled || k(e),
    mo(e),
    e.draggable.current = void 0,
    e.dom.redraw()
}
function L(e) {
    let o = e.draggable.current;
    o && (o.newPiece && e.pieces.delete(o.orig),
    e.draggable.current = void 0,
    k(e),
    mo(e),
    e.dom.redraw())
}
function mo(e) {
    let o = e.dom.elements;
    o.ghost && Z(o.ghost, !1)
}
function ho(e, o) {
    let r = e.dom.elements.board.firstChild;
    for (; r; ) {
        if (r.cgKey === o && r.tagName === "PIECE")
            return r;
        r = r.nextSibling
    }
}
function vo(e, o) {
    e.exploding = {
        stage: 1,
        keys: o
    },
    e.dom.redraw(),
    setTimeout( () => {
        go(e, 2),
        setTimeout( () => go(e, void 0), 120)
    }
    , 120)
}
function go(e, o) {
    e.exploding && (o ? e.exploding.stage = o : e.exploding = void 0,
    e.dom.redraw())
}
function bo(e, o) {
    function r() {
        Fe(e),
        o()
    }
    return {
        set(n) {
            n.orientation && n.orientation !== e.orientation && r(),
            De(e, n),
            (n.fen ? W : R)(i => se(i, n), e)
        },
        state: e,
        getFen: () => eo(e.pieces),
        toggleOrientation: r,
        setPieces(n) {
            W(i => Ve(i, n), e)
        },
        selectSquare(n, i) {
            n ? W(t => G(t, n, i), e) : e.selected && (k(e),
            e.dom.redraw())
        },
        move(n, i) {
            W(t => ye(t, n, i), e)
        },
        newPiece(n, i) {
            W(t => te(t, n, i), e)
        },
        playPremove() {
            if (e.premovable.current) {
                if (W(Qe, e))
                    return !0;
                e.dom.redraw()
            }
            return !1
        },
        playPredrop(n) {
            if (e.predroppable.current) {
                let i = Xe(e, n);
                return e.dom.redraw(),
                i
            }
            return !1
        },
        cancelPremove() {
            R(A, e)
        },
        cancelPredrop() {
            R(q, e)
        },
        cancelMove() {
            R(n => {
                U(n),
                L(n)
            }
            , e)
        },
        stop() {
            R(n => {
                Se(n),
                L(n)
            }
            , e)
        },
        explode(n) {
            vo(e, n)
        },
        setAutoShapes(n) {
            R(i => i.drawable.autoShapes = n, e)
        },
        setShapes(n) {
            R(i => i.drawable.shapes = n.slice(), e)
        },
        getKeyAtDomPos(n) {
            return K(n, b(e), e.dom.bounds())
        },
        redrawAll: o,
        dragNewPiece(n, i, t) {
            uo(e, n, i, t)
        },
        destroy() {
            Se(e),
            e.dom.unbind && e.dom.unbind(),
            e.dom.destroyed = !0
        }
    }
}
function wo() {
    return {
        pieces: ae(Me),
        orientation: "white",
        turnColor: "white",
        coordinates: !0,
        coordinatesOnSquares: !1,
        ranksPosition: "right",
        autoCastle: !0,
        viewOnly: !1,
        disableContextMenu: !1,
        addPieceZIndex: !1,
        blockTouchScroll: !1,
        pieceKey: !1,
        trustAllEvents: !1,
        highlight: {
            lastMove: !0,
            check: !0
        },
        animation: {
            enabled: !0,
            duration: 200
        },
        movable: {
            free: !0,
            color: "both",
            showDests: !0,
            events: {},
            rookCastle: !0
        },
        premovable: {
            enabled: !0,
            showDests: !0,
            castle: !0,
            events: {}
        },
        predroppable: {
            enabled: !1,
            events: {}
        },
        draggable: {
            enabled: !0,
            distance: 3,
            autoDistance: !0,
            showGhost: !0,
            deleteOnDropOff: !1
        },
        dropmode: {
            active: !1
        },
        selectable: {
            enabled: !0
        },
        stats: {
            dragged: !("ontouchstart"in window)
        },
        events: {},
        drawable: {
            enabled: !0,
            visible: !0,
            defaultSnapToValidMove: !0,
            eraseOnClick: !0,
            shapes: [],
            autoShapes: [],
            brushes: {
                green: {
                    key: "g",
                    color: "#15781B",
                    opacity: 1,
                    lineWidth: 10
                },
                red: {
                    key: "r",
                    color: "#882020",
                    opacity: 1,
                    lineWidth: 10
                },
                blue: {
                    key: "b",
                    color: "#003088",
                    opacity: 1,
                    lineWidth: 10
                },
                yellow: {
                    key: "y",
                    color: "#e68f00",
                    opacity: 1,
                    lineWidth: 10
                },
                paleBlue: {
                    key: "pb",
                    color: "#003088",
                    opacity: .4,
                    lineWidth: 15
                },
                paleGreen: {
                    key: "pg",
                    color: "#15781B",
                    opacity: .4,
                    lineWidth: 15
                },
                paleRed: {
                    key: "pr",
                    color: "#882020",
                    opacity: .4,
                    lineWidth: 15
                },
                paleGrey: {
                    key: "pgr",
                    color: "#4a4a4a",
                    opacity: .35,
                    lineWidth: 15
                },
                purple: {
                    key: "purple",
                    color: "#68217a",
                    opacity: .65,
                    lineWidth: 10
                },
                pink: {
                    key: "pink",
                    color: "#ee2080",
                    opacity: .5,
                    lineWidth: 10
                },
                white: {
                    key: "white",
                    color: "white",
                    opacity: 1,
                    lineWidth: 10
                }
            },
            prevSvgHash: ""
        },
        hold: $e()
    }
}
var yo = {
    hilitePrimary: {
        key: "hilitePrimary",
        color: "#3291ff",
        opacity: 1,
        lineWidth: 1
    },
    hiliteWhite: {
        key: "hiliteWhite",
        color: "#ffffff",
        opacity: 1,
        lineWidth: 1
    }
};
function xo() {
    let e = w("defs")
      , o = y(w("filter"), {
        id: "cg-filter-blur"
    });
    return o.appendChild(y(w("feGaussianBlur"), {
        stdDeviation: "0.019"
    })),
    e.appendChild(o),
    e
}
function So(e, o, r) {
    var n;
    let i = e.drawable
      , t = i.current
      , l = t && t.mouseSq ? t : void 0
      , a = new Map
      , s = e.dom.bounds()
      , c = i.autoShapes.filter(p => !p.piece);
    for (let p of i.shapes.concat(c).concat(l ? [l] : [])) {
        if (!p.dest)
            continue;
        let m = (n = a.get(p.dest)) !== null && n !== void 0 ? n : new Set
          , f = fe(ue(h(p.orig), e.orientation), s)
          , T = fe(ue(h(p.dest), e.orientation), s);
        m.add(Ne(f, T)),
        a.set(p.dest, m)
    }
    let u = i.shapes.concat(c).map(p => ({
        shape: p,
        current: !1,
        hash: Po(p, Oe(p.dest, a), !1, s)
    }));
    l && u.push({
        shape: l,
        current: !0,
        hash: Po(l, Oe(l.dest, a), !0, s)
    });
    let d = u.map(p => p.hash).join(";");
    if (d === e.drawable.prevSvgHash)
        return;
    e.drawable.prevSvgHash = d;
    let g = o.querySelector("defs");
    sr(i, u, g),
    dr(u, o.querySelector("g"), r.querySelector("g"), p => pr(e, p, i.brushes, a, s))
}
function sr(e, o, r) {
    var n;
    let i = new Map, t;
    for (let s of o.filter(c => c.shape.dest && c.shape.brush))
        t = Co(e.brushes[s.shape.brush], s.shape.modifiers),
        !((n = s.shape.modifiers) === null || n === void 0) && n.hilite && i.set(de(t).key, de(t)),
        i.set(t.key, t);
    let l = new Set
      , a = r.firstElementChild;
    for (; a; )
        l.add(a.getAttribute("cgKey")),
        a = a.nextElementSibling;
    for (let[s,c] of i.entries())
        l.has(s) || r.appendChild(gr(c))
}
function dr(e, o, r, n) {
    let i = new Map;
    for (let t of e)
        i.set(t.hash, !1);
    for (let t of [o, r]) {
        let l = [], a = t.firstElementChild, s;
        for (; a; )
            s = a.getAttribute("cgHash"),
            i.has(s) ? i.set(s, !0) : l.push(a),
            a = a.nextElementSibling;
        for (let c of l)
            t.removeChild(c)
    }
    for (let t of e.filter(l => !i.get(l.hash)))
        for (let l of n(t))
            l.isCustom ? r.appendChild(l.el) : o.appendChild(l.el)
}
function Po({orig: e, dest: o, brush: r, piece: n, modifiers: i, customSvg: t, label: l}, a, s, c) {
    var u, d;
    return [c.width, c.height, s, e, o, r, a && "-", n && ur(n), i && fr(i), t && `custom-${ko(t.html)},${(d = (u = t.center) === null || u === void 0 ? void 0 : u[0]) !== null && d !== void 0 ? d : "o"}`, l && `label-${ko(l.text)}`].filter(g => g).join(",")
}
function ur(e) {
    return [e.color, e.role, e.scale].filter(o => o).join(",")
}
function fr(e) {
    return [e.lineWidth, e.hilite && "*"].filter(o => o).join(",")
}
function ko(e) {
    let o = 0;
    for (let r = 0; r < e.length; r++)
        o = (o << 5) - o + e.charCodeAt(r) >>> 0;
    return o.toString()
}
function pr(e, {shape: o, current: r, hash: n}, i, t, l) {
    var a, s;
    let c = fe(ue(h(o.orig), e.orientation), l)
      , u = o.dest ? fe(ue(h(o.dest), e.orientation), l) : c
      , d = o.brush && Co(i[o.brush], o.modifiers)
      , g = t.get(o.dest)
      , p = [];
    if (d) {
        let m = y(w("g"), {
            cgHash: n
        });
        p.push({
            el: m
        }),
        c[0] !== u[0] || c[1] !== u[1] ? m.appendChild(hr(o, d, c, u, r, Oe(o.dest, t))) : m.appendChild(mr(i[o.brush], c, r, l))
    }
    if (o.label) {
        let m = o.label;
        (a = m.fill) !== null && a !== void 0 || (m.fill = o.brush && i[o.brush].color);
        let f = o.brush ? void 0 : "tr";
        p.push({
            el: vr(m, n, c, u, g, f),
            isCustom: !0
        })
    }
    if (o.customSvg) {
        let m = (s = o.customSvg.center) !== null && s !== void 0 ? s : "orig"
          , [f,T] = m === "label" ? Do(c, u, g).map(S => S - .5) : m === "dest" ? u : c
          , D = y(w("g"), {
            transform: `translate(${f},${T})`,
            cgHash: n
        });
        D.innerHTML = `<svg width="1" height="1" viewBox="0 0 100 100">${o.customSvg.html}</svg>`,
        p.push({
            el: D,
            isCustom: !0
        })
    }
    return p
}
function mr(e, o, r, n) {
    let i = br()
      , t = (n.width + n.height) / (4 * Math.max(n.width, n.height));
    return y(w("circle"), {
        stroke: e.color,
        "stroke-width": i[r ? 0 : 1],
        fill: "none",
        opacity: Mo(e, r),
        cx: o[0],
        cy: o[1],
        r: t - i[1] / 2
    })
}
function de(e) {
    return ["#ffffff", "#fff", "white"].includes(e.color) ? yo.hilitePrimary : yo.hiliteWhite
}
function hr(e, o, r, n, i, t) {
    var l;
    function a(u) {
        var d;
        let g = yr(t && !i)
          , p = n[0] - r[0]
          , m = n[1] - r[1]
          , f = Math.atan2(m, p)
          , T = Math.cos(f) * g
          , D = Math.sin(f) * g;
        return y(w("line"), {
            stroke: u ? de(o).color : o.color,
            "stroke-width": wr(o, i) + (u ? .04 : 0),
            "stroke-linecap": "round",
            "marker-end": `url(#arrowhead-${u ? de(o).key : o.key})`,
            opacity: !((d = e.modifiers) === null || d === void 0) && d.hilite ? 1 : Mo(o, i),
            x1: r[0],
            y1: r[1],
            x2: n[0] - T,
            y2: n[1] - D
        })
    }
    if (!(!((l = e.modifiers) === null || l === void 0) && l.hilite))
        return a(!1);
    let s = w("g")
      , c = y(w("g"), {
        filter: "url(#cg-filter-blur)"
    });
    return c.appendChild(Pr(r, n)),
    c.appendChild(a(!0)),
    s.appendChild(c),
    s.appendChild(a(!1)),
    s
}
function gr(e) {
    let o = y(w("marker"), {
        id: "arrowhead-" + e.key,
        orient: "auto",
        overflow: "visible",
        markerWidth: 4,
        markerHeight: 4,
        refX: e.key.startsWith("hilite") ? 1.86 : 2.05,
        refY: 2
    });
    return o.appendChild(y(w("path"), {
        d: "M0,0 V4 L3,2 Z",
        fill: e.color
    })),
    o.setAttribute("cgKey", e.key),
    o
}
function vr(e, o, r, n, i, t) {
    var l;
    let s = .4 * .75 ** e.text.length
      , c = Do(r, n, i)
      , u = t === "tr" ? .4 : 0
      , d = y(w("g"), {
        transform: `translate(${c[0] + u},${c[1] - u})`,
        cgHash: o
    });
    d.appendChild(y(w("circle"), {
        r: .4 / 2,
        "fill-opacity": t ? 1 : .8,
        "stroke-opacity": t ? 1 : .7,
        "stroke-width": .03,
        fill: (l = e.fill) !== null && l !== void 0 ? l : "#666",
        stroke: "white"
    }));
    let g = y(w("text"), {
        "font-size": s,
        "font-family": "Noto Sans",
        "text-anchor": "middle",
        fill: "white",
        y: .13 * .75 ** e.text.length
    });
    return g.innerHTML = e.text,
    d.appendChild(g),
    d
}
function ue(e, o) {
    return o === "white" ? e : [7 - e[0], 7 - e[1]]
}
function Oe(e, o) {
    return (e && o.has(e) && o.get(e).size > 1) === !0
}
function w(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e)
}
function y(e, o) {
    for (let r in o)
        Object.prototype.hasOwnProperty.call(o, r) && e.setAttribute(r, o[r]);
    return e
}
function Co(e, o) {
    return o ? {
        color: e.color,
        opacity: Math.round(e.opacity * 10) / 10,
        lineWidth: Math.round(o.lineWidth || e.lineWidth),
        key: [e.key, o.lineWidth].filter(r => r).join("")
    } : e
}
function br() {
    return [3 / 64, 4 / 64]
}
function wr(e, o) {
    return (e.lineWidth || 10) * (o ? .85 : 1) / 64
}
function Mo(e, o) {
    return (e.opacity || 1) * (o ? .9 : 1)
}
function yr(e) {
    return (e ? 20 : 10) / 64
}
function fe(e, o) {
    let r = Math.min(1, o.width / o.height)
      , n = Math.min(1, o.height / o.width);
    return [(e[0] - 3.5) * r, (3.5 - e[1]) * n]
}
function Pr(e, o) {
    let r = {
        from: [Math.floor(Math.min(e[0], o[0])), Math.floor(Math.min(e[1], o[1]))],
        to: [Math.ceil(Math.max(e[0], o[0])), Math.ceil(Math.max(e[1], o[1]))]
    };
    return y(w("rect"), {
        x: r.from[0],
        y: r.from[1],
        width: r.to[0] - r.from[0],
        height: r.to[1] - r.from[1],
        fill: "none",
        stroke: "none"
    })
}
function Ne(e, o, r=!0) {
    let n = Math.atan2(o[1] - e[1], o[0] - e[0]) + Math.PI;
    return r ? (Math.round(n * 8 / Math.PI) + 16) % 16 : n
}
function kr(e, o) {
    return Math.sqrt([e[0] - o[0], e[1] - o[1]].reduce( (r, n) => r + n * n, 0))
}
function Do(e, o, r) {
    let n = kr(e, o)
      , i = Ne(e, o, !1);
    if (r && (n -= 33 / 64,
    r.size > 1)) {
        n -= 10 / 64;
        let t = Ne(e, o);
        (r.has((t + 1) % 16) || r.has((t + 15) % 16)) && t & 1 && (n -= .4)
    }
    return [e[0] - Math.cos(i) * n, e[1] - Math.sin(i) * n].map(t => t + .5)
}
function Ao(e, o) {
    e.innerHTML = "",
    e.classList.add("cg-wrap");
    for (let s of Be)
        e.classList.toggle("orientation-" + s, o.orientation === s);
    e.classList.toggle("manipulable", !o.viewOnly);
    let r = M("cg-container");
    e.appendChild(r);
    let n = M("cg-board");
    r.appendChild(n);
    let i, t, l;
    if (o.drawable.visible && (i = y(w("svg"), {
        class: "cg-shapes",
        viewBox: "-4 -4 8 8",
        preserveAspectRatio: "xMidYMid slice"
    }),
    i.appendChild(xo()),
    i.appendChild(w("g")),
    t = y(w("svg"), {
        class: "cg-custom-svgs",
        viewBox: "-3.5 -3.5 8 8",
        preserveAspectRatio: "xMidYMid slice"
    }),
    t.appendChild(w("g")),
    l = M("cg-auto-pieces"),
    r.appendChild(i),
    r.appendChild(t),
    r.appendChild(l)),
    o.coordinates) {
        let s = o.orientation === "black" ? " black" : ""
          , c = o.ranksPosition === "left" ? " left" : "";
        if (o.coordinatesOnSquares) {
            let u = o.orientation === "white" ? d => d + 1 : d => 8 - d;
            F.forEach( (d, g) => r.appendChild(_e(he.map(p => d + p), "squares rank" + u(g) + s + c)))
        } else
            r.appendChild(_e(he, "ranks" + s + c)),
            r.appendChild(_e(F, "files" + s))
    }
    let a;
    return o.draggable.enabled && o.draggable.showGhost && (a = M("piece", "ghost"),
    Z(a, !1),
    r.appendChild(a)),
    {
        board: n,
        container: r,
        wrap: e,
        ghost: a,
        svg: i,
        customSvg: t,
        autoPieces: l
    }
}
function _e(e, o) {
    let r = M("coords", o), n;
    for (let i of e)
        n = M("coord"),
        n.textContent = i,
        r.appendChild(n);
    return r
}
function ln(e, o) {
    e.dropmode = {
        active: !0,
        piece: o
    },
    L(e)
}
function cn(e) {
    e.dropmode = {
        active: !1
    }
}
function qo(e, o) {
    if (!e.dropmode.active)
        return;
    A(e),
    q(e);
    let r = e.dropmode.piece;
    if (r) {
        e.pieces.set("a0", r);
        let n = E(o)
          , i = n && K(n, b(e), e.dom.bounds());
        i && le(e, "a0", i)
    }
    e.dom.redraw()
}
function To(e, o) {
    let r = e.dom.elements.board;
    if ("ResizeObserver"in window && new ResizeObserver(o).observe(e.dom.elements.wrap),
    (e.disableContextMenu || e.drawable.enabled) && r.addEventListener("contextmenu", i => i.preventDefault()),
    e.viewOnly)
        return;
    let n = Sr(e);
    r.addEventListener("touchstart", n, {
        passive: !1
    }),
    r.addEventListener("mousedown", n, {
        passive: !1
    })
}
function Oo(e, o) {
    let r = [];
    if ("ResizeObserver"in window || r.push(Y(document.body, "chessground.resize", o)),
    !e.viewOnly) {
        let n = Ko(e, fo, to)
          , i = Ko(e, po, lo);
        for (let l of ["touchmove", "mousemove"])
            r.push(Y(document, l, n));
        for (let l of ["touchend", "mouseup"])
            r.push(Y(document, l, i));
        let t = () => e.dom.bounds.clear();
        r.push(Y(document, "scroll", t, {
            capture: !0,
            passive: !0
        })),
        r.push(Y(window, "resize", t, {
            passive: !0
        }))
    }
    return () => r.forEach(n => n())
}
function Y(e, o, r, n) {
    return e.addEventListener(o, r, n),
    () => e.removeEventListener(o, r, n)
}
var Sr = e => o => {
    e.draggable.current ? L(e) : e.drawable.current ? Ke(e) : o.shiftKey || re(o) ? e.drawable.enabled && no(e, o) : e.viewOnly || (e.dropmode.active ? qo(e, o) : so(e, o))
}
  , Ko = (e, o, r) => n => {
    e.drawable.current ? e.drawable.enabled && r(e, n) : e.viewOnly || o(e, n)
}
;
function _o(e) {
    let o = b(e), r = H(e.dom.bounds()), n = e.dom.elements.board, i = e.pieces, t = e.animation.current, l = t ? t.plan.anims : new Map, a = t ? t.plan.fadings : new Map, s = e.draggable.current, c = Mr(e), u = new Set, d = new Set, g = new Map, p = new Map, m, f, T, D, S, I, pe, O, me, X;
    for (f = n.firstChild; f; ) {
        if (m = f.cgKey,
        Wo(f))
            if (T = i.get(m),
            S = l.get(m),
            I = a.get(m),
            D = f.cgPiece,
            f.cgDragging && (!s || s.orig !== m) && (f.classList.remove("dragging"),
            C(f, r(h(m), o)),
            f.cgDragging = !1),
            !I && f.cgFading && (f.cgFading = !1,
            f.classList.remove("fading")),
            T) {
                if (S && f.cgAnimating && D === Q(T)) {
                    let v = h(m);
                    v[0] += S[2],
                    v[1] += S[3],
                    f.classList.add("anim"),
                    C(f, r(v, o))
                } else
                    f.cgAnimating && (f.cgAnimating = !1,
                    f.classList.remove("anim"),
                    C(f, r(h(m), o)),
                    e.addPieceZIndex && (f.style.zIndex = Ee(h(m), o)));
                D === Q(T) && (!I || !f.cgFading) ? u.add(m) : I && D === Q(I) ? (f.classList.add("fading"),
                f.cgFading = !0) : We(g, D, f)
            } else
                We(g, D, f);
        else if (Ro(f)) {
            let v = f.className;
            c.get(m) === v ? d.add(m) : We(p, v, f)
        }
        f = f.nextSibling
    }
    for (let[v,j] of c)
        if (!d.has(v)) {
            me = p.get(j),
            X = me && me.pop();
            let N = r(h(v), o);
            if (X)
                X.cgKey = v,
                C(X, N);
            else {
                let _ = M("square", j);
                _.cgKey = v,
                C(_, N),
                n.insertBefore(_, n.firstChild)
            }
        }
    for (let[v,j] of i)
        if (S = l.get(v),
        !u.has(v))
            if (pe = g.get(Q(j)),
            O = pe && pe.pop(),
            O) {
                O.cgKey = v,
                O.cgFading && (O.classList.remove("fading"),
                O.cgFading = !1);
                let N = h(v);
                e.addPieceZIndex && (O.style.zIndex = Ee(N, o)),
                S && (O.cgAnimating = !0,
                O.classList.add("anim"),
                N[0] += S[2],
                N[1] += S[3]),
                C(O, r(N, o))
            } else {
                let N = Q(j)
                  , _ = M("piece", N)
                  , J = h(v);
                _.cgPiece = N,
                _.cgKey = v,
                S && (_.cgAnimating = !0,
                J[0] += S[2],
                J[1] += S[3]),
                C(_, r(J, o)),
                e.addPieceZIndex && (_.style.zIndex = Ee(J, o)),
                n.appendChild(_)
            }
    for (let v of g.values())
        No(e, v);
    for (let v of p.values())
        No(e, v)
}
function Eo(e) {
    let o = b(e)
      , r = H(e.dom.bounds())
      , n = e.dom.elements.board.firstChild;
    for (; n; )
        (Wo(n) && !n.cgAnimating || Ro(n)) && C(n, r(h(n.cgKey), o)),
        n = n.nextSibling
}
function Re(e) {
    var o, r;
    let n = e.dom.elements.wrap.getBoundingClientRect()
      , i = e.dom.elements.container
      , t = n.height / n.width
      , l = Math.floor(n.width * window.devicePixelRatio / 8) * 8 / window.devicePixelRatio
      , a = l * t;
    i.style.width = l + "px",
    i.style.height = a + "px",
    e.dom.bounds.clear(),
    (o = e.addDimensionsCssVarsTo) === null || o === void 0 || o.style.setProperty("---cg-width", l + "px"),
    (r = e.addDimensionsCssVarsTo) === null || r === void 0 || r.style.setProperty("---cg-height", a + "px")
}
var Wo = e => e.tagName === "PIECE"
  , Ro = e => e.tagName === "SQUARE";
function No(e, o) {
    for (let r of o)
        e.dom.elements.board.removeChild(r)
}
function Ee(e, o) {
    let n = e[1];
    return `${o ? 10 - n : 3 + n}`
}
var Q = e => `${e.color} ${e.role}`;
function Mr(e) {
    var o, r, n;
    let i = new Map;
    if (e.lastMove && e.highlight.lastMove)
        for (let a of e.lastMove)
            B(i, a, "last-move");
    if (e.check && e.highlight.check && B(i, e.check, "check"),
    e.selected && (B(i, e.selected, "selected"),
    e.movable.showDests)) {
        let a = (o = e.movable.dests) === null || o === void 0 ? void 0 : o.get(e.selected);
        if (a)
            for (let c of a)
                B(i, c, "move-dest" + (e.pieces.has(c) ? " oc" : ""));
        let s = (n = (r = e.premovable.customDests) === null || r === void 0 ? void 0 : r.get(e.selected)) !== null && n !== void 0 ? n : e.premovable.dests;
        if (s)
            for (let c of s)
                B(i, c, "premove-dest" + (e.pieces.has(c) ? " oc" : ""))
    }
    let t = e.premovable.current;
    if (t)
        for (let a of t)
            B(i, a, "current-premove");
    else
        e.predroppable.current && B(i, e.predroppable.current.key, "current-premove");
    let l = e.exploding;
    if (l)
        for (let a of l.keys)
            B(i, a, "exploding" + l.stage);
    return e.highlight.custom && e.highlight.custom.forEach( (a, s) => {
        B(i, s, a)
    }
    ),
    i
}
function B(e, o, r) {
    let n = e.get(o);
    n ? e.set(o, `${n} ${r}`) : e.set(o, r)
}
function We(e, o, r) {
    let n = e.get(o);
    n ? n.push(r) : e.set(o, [r])
}
function Bo(e, o, r) {
    let n = new Map
      , i = [];
    for (let a of e)
        n.set(a.hash, !1);
    let t = o.firstElementChild, l;
    for (; t; )
        l = t.getAttribute("cgHash"),
        n.has(l) ? n.set(l, !0) : i.push(t),
        t = t.nextElementSibling;
    for (let a of i)
        o.removeChild(a);
    for (let a of e)
        n.get(a.hash) || o.appendChild(r(a))
}
function zo(e, o) {
    let n = e.drawable.autoShapes.filter(i => i.piece).map(i => ({
        shape: i,
        hash: Ar(i),
        current: !1
    }));
    Bo(n, o, i => Dr(e, i, e.dom.bounds()))
}
function Ho(e) {
    var o;
    let r = b(e)
      , n = H(e.dom.bounds())
      , i = (o = e.dom.elements.autoPieces) === null || o === void 0 ? void 0 : o.firstChild;
    for (; i; )
        ge(i, n(h(i.cgKey), r), i.cgScale),
        i = i.nextSibling
}
function Dr(e, {shape: o, hash: r}, n) {
    var i, t, l;
    let a = o.orig
      , s = (i = o.piece) === null || i === void 0 ? void 0 : i.role
      , c = (t = o.piece) === null || t === void 0 ? void 0 : t.color
      , u = (l = o.piece) === null || l === void 0 ? void 0 : l.scale
      , d = M("piece", `${s} ${c}`);
    return d.setAttribute("cgHash", r),
    d.cgKey = a,
    d.cgScale = u,
    ge(d, H(n)(h(a), b(e)), u),
    d
}
var Ar = e => {
    var o, r, n;
    return [e.orig, (o = e.piece) === null || o === void 0 ? void 0 : o.role, (r = e.piece) === null || r === void 0 ? void 0 : r.color, (n = e.piece) === null || n === void 0 ? void 0 : n.scale].join(",")
}
;
function xn(e, o) {
    let r = wo();
    se(r, o || {});
    function n() {
        let i = "dom"in r ? r.dom.unbind : void 0
          , t = Ao(e, r)
          , l = Le( () => t.board.getBoundingClientRect())
          , a = u => {
            _o(c),
            t.autoPieces && zo(c, t.autoPieces),
            !u && t.svg && So(c, t.svg, t.customSvg)
        }
          , s = () => {
            window.myBoard = c;
            Re(c),
            Eo(c),
            t.autoPieces && Ho(c)
        }
          , c = r;
        return c.dom = {
            elements: t,
            bounds: l,
            redraw: Kr(a),
            redrawNow: a,
            unbind: i
        },
        c.drawable.prevSvgHash = "",
        Re(c),
        a(!1),
        To(c, s),
        i || (c.dom.unbind = Oo(c, s)),
        c.events.insert && c.events.insert(t),
        c
    }
    return bo(n(), n)
}
function Kr(e) {
    let o = !1;
    return () => {
        o || (o = !0,
        requestAnimationFrame( () => {
            e(),
            o = !1
        }
        ))
    }
}
export {Me as a, uo as b, ln as c, cn as d, xn as e};

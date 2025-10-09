# override_round_js.py
import re
from mitmproxy import http

# Match any URL path ending with /round.<anything>.js (optionally with query)
ROUND_JS_RE = re.compile(r'(?:^|/)round\.[^/?]+\.js(?:\?.*)?$', re.I)



TARGET = 'return window.addEventListener("resize",()=>'
INJECT = """window.game = r; var lastPly = r?.ply;
        Object.defineProperty(window.game, "ply", {
            get() {
                return lastPly;
            },
            set(v) {
                lastPly = v;
                window.dispatchEvent(new CustomEvent("plyChanged", {
                    detail: { ply: v }
                }));
            }
        });"""

def response(flow: http.HTTPFlow) -> None:
    url = flow.request.pretty_url
    if not ROUND_JS_RE.search(url):
        return

    # Safely get decoded text (handles content-encoding/charset best-effort)
    text = flow.response.get_text(strict = False);

    idx = text.find(TARGET)
    if idx != -1:
        content = text[:idx] + INJECT + text[idx:]
        flow.response = http.Response.make(200,content,{"Content-Type": "application/javascript"})
        print(f"[MITMPROXY] Override JS: {url}")
    
    return

# def response(flow: http.HTTPFlow):
#     print("PERA")
#     print(flow);
#     content_type = flow.response.headers.get("Content-Type", "")
#     if "text/html" in content_type:
#         headers = flow.response.headers
#         print("HEAD: ", headers)
#         if "Content-Security-Policy" in headers:
#             original_csp = headers["Content-Security-Policy"]
#             print(f"[MITMPROXY] Found original CSP:\n{original_csp}")

#             parts = original_csp.split(";")
#             new_parts = []
#             found = False

#             for part in parts:
#                 if "connect-src" in part:
#                     if "ws://localhost:8765" not in part:
#                         part = part.strip() + " ws://localhost:8765"
#                     found = True
#                 new_parts.append(part.strip())

#             # Se non esiste proprio una direttiva connect-src, la aggiungiamo
#             if not found:
#                 new_parts.append("connect-src ws://localhost:8765")

#             new_csp = "; ".join(new_parts)
#             headers["Content-Security-Policy"] = new_csp
#             print(f"[MITMPROXY] Updated CSP:\n{new_csp}")

#         else:
#             # Nessun CSP presente, ne creiamo uno minimale
#             headers["Content-Security-Policy"] = "connect-src * ws://localhost:8765"
#             print("[MITMPROXY] Injected minimal CSP")


# from mitmproxy import http
# OVERRIDES = {
#     "lib.FPP33IYC.js":"override/lib.FPP33IYC.js",
#     "round.ASU7IGKT.js":"override/round.ASU7IGKT.js",
# }

# def request(flow: http.HTTPFlow):
#     if ""
#     for url_substr, local_path in OVERRIDES.items():
#         if url_substr in flow.request.pretty_url:
#             with open(local_path, "r", encoding="utf-8") as f:
#                 content = f.read()
#                 flow.response = http.Response.make(
#                 200,
#                 content,
#                 {"Content-Type": "application/javascript"}
#             )
#             print(f"[MITMPROXY] Override JS: {url_substr}")
#             return

# override.py
from mitmproxy import http

# Cambia questo mapping con i tuoi override
OVERRIDES = {
    "lib.7N7EZUST.js": "override/lib.7N7EZUST.js",
    "puzzle.6XDC3NRX.js": "override/puzzle.6XDC3NRX.js",
    "round.KBYFIJ2U.js": "override/round.KBYFIJ2U.js"

}

def request(flow: http.HTTPFlow):
    for url_substr, local_path in OVERRIDES.items():
        if url_substr in flow.request.pretty_url:
            with open(local_path, "r") as f:
                content = f.read()
            flow.response = http.Response.make(
                200,
                content,
                {"Content-Type": "application/javascript"}
            )
            return




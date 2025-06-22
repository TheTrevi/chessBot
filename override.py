from mitmproxy import http

OVERRIDES = {
    "lib.7N7EZUST.js": "override/lib.7N7EZUST.js",
    "puzzle.6XDC3NRX.js": "override/puzzle.6XDC3NRX.js",
    "round.KBYFIJ2U.js": "override/round.KBYFIJ2U.js"
}

def request(flow: http.HTTPFlow):
    for url_substr, local_path in OVERRIDES.items():
        if url_substr in flow.request.pretty_url:
            with open(local_path, "r", encoding="utf-8") as f:
                content = f.read()
            flow.response = http.Response.make(
                200,
                content,
                {"Content-Type": "application/javascript"}
            )
            print(f"[MITMPROXY] Override JS: {url_substr}")
            return

def response(flow: http.HTTPFlow):

    content_type = flow.response.headers.get("Content-Type", "")
    if "text/html" in content_type:
        headers = flow.response.headers
        print("HEAD: ", headers)
        if "Content-Security-Policy" in headers:
            original_csp = headers["Content-Security-Policy"]
            print(f"[MITMPROXY] Found original CSP:\n{original_csp}")

            parts = original_csp.split(";")
            new_parts = []
            found = False

            for part in parts:
                if "connect-src" in part:
                    if "ws://localhost:8765" not in part:
                        part = part.strip() + " ws://localhost:8765"
                    found = True
                new_parts.append(part.strip())

            # Se non esiste proprio una direttiva connect-src, la aggiungiamo
            if not found:
                new_parts.append("connect-src ws://localhost:8765")

            new_csp = "; ".join(new_parts)
            headers["Content-Security-Policy"] = new_csp
            print(f"[MITMPROXY] Updated CSP:\n{new_csp}")
        
        else:
            # Nessun CSP presente, ne creiamo uno minimale
            headers["Content-Security-Policy"] = "connect-src * ws://localhost:8765"
            print("[MITMPROXY] Injected minimal CSP")
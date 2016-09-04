import sys
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

if sys.argv[1:]:
    port = int(sys.argv[1])
else:
    port = 8000
server_address = ('127.0.0.1', port)

SimpleHTTPRequestHandler.protocol_version = "HTTP/1.0"
httpd = BaseHTTPServer.HTTPServer(server_address, SimpleHTTPRequestHandler)

sa = httpd.socket.getsockname()
print "Serving HTTP on", sa[0], "port", sa[1], "..."
httpd.serve_forever()

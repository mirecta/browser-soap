(function(run, root) {
    var ret = run.bind(root)();
    if ("browser-soap") root["browser-soap"] = ret;
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = ret;
})(function() {
    var __m = {};
    if (typeof require === "undefined") __m.__sr = function() {}; else __m.__sr = require;
    __m.__r = function(key) {
        var m = __m[key];
        if (m.sts === null) m.load.call();
        return m.mod.exports;
    };
    __m["https"] = {
        sts: 1,
        mod: {
            exports: __m.__sr("https")
        }
    };
    __m["http"] = {
        sts: 1,
        mod: {
            exports: __m.__sr("http")
        }
    };
    __m["util"] = {
        sts: 1,
        mod: {
            exports: __m.__sr("util")
        }
    };
    __m["fs"] = {
        sts: 1,
        mod: {
            exports: __m.__sr("fs")
        }
    };
    __m["crypto"] = {
        sts: 1,
        mod: {
            exports: __m.__sr("crypto")
        }
    };
    __m["a"] = {
        sts: null,
        mod: {
            exports: {}
        },
        load: function() {
            var module = __m["a"].mod;
            var exports = module.exports;
            var require = function(name) {
                var namemap = {};
                var k = namemap[name];
                return k ? __m.__r(k) : __m.__sr(name);
            };
            require.resolve = __m.__sr.resolve;
            __m["a"].sts = 0;
            "use strict";
            function hasOwnProperty(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            }
            module.exports.decode = function(qs, sep, eq, options) {
                sep = sep || "&";
                eq = eq || "=";
                var obj = {};
                if (typeof qs !== "string" || qs.length === 0) {
                    return obj;
                }
                var regexp = /\+/g;
                qs = qs.split(sep);
                var maxKeys = 1e3;
                if (options && typeof options.maxKeys === "number") {
                    maxKeys = options.maxKeys;
                }
                var len = qs.length;
                if (maxKeys > 0 && len > maxKeys) {
                    len = maxKeys;
                }
                for (var i = 0; i < len; ++i) {
                    var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
                    if (idx >= 0) {
                        kstr = x.substr(0, idx);
                        vstr = x.substr(idx + 1);
                    } else {
                        kstr = x;
                        vstr = "";
                    }
                    k = decodeURIComponent(kstr);
                    v = decodeURIComponent(vstr);
                    if (!hasOwnProperty(obj, k)) {
                        obj[k] = v;
                    } else if (Array.isArray(obj[k])) {
                        obj[k].push(v);
                    } else {
                        obj[k] = [ obj[k], v ];
                    }
                }
                return obj;
            };
            "use strict";
            var stringifyPrimitive = function(v) {
                switch (typeof v) {
                  case "string":
                    return v;

                  case "boolean":
                    return v ? "true" : "false";

                  case "number":
                    return isFinite(v) ? v : "";

                  default:
                    return "";
                }
            };
            module.exports.encode = function(obj, sep, eq, name) {
                sep = sep || "&";
                eq = eq || "=";
                if (obj === null) {
                    obj = undefined;
                }
                if (typeof obj === "object") {
                    return Object.keys(obj).map(function(k) {
                        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                        if (Array.isArray(obj[k])) {
                            return obj[k].map(function(v) {
                                return ks + encodeURIComponent(stringifyPrimitive(v));
                            }).join(sep);
                        } else {
                            return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                        }
                    }).join(sep);
                }
                if (!name) return "";
                return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
            };
            __m["a"].sts = 1;
        }.bind(this)
    };
    __m["b"] = {
        sts: null,
        mod: {
            exports: {}
        },
        load: function() {
            var module = __m["b"].mod;
            var exports = module.exports;
            var require = function(name) {
                var namemap = {
                    "./querystring": "a"
                };
                var k = namemap[name];
                return k ? __m.__r(k) : __m.__sr(name);
            };
            require.resolve = __m.__sr.resolve;
            __m["b"].sts = 0;
            exports = module.exports;
            exports.parse = urlParse;
            exports.resolve = urlResolve;
            exports.resolveObject = urlResolveObject;
            exports.format = urlFormat;
            var protocolPattern = /^([a-z0-9]+:)/, portPattern = /:[0-9]+$/, nonHostChars = [ "/", "?", ";", "#" ], hostlessProtocol = {
                file: true,
                "file:": true
            }, slashedProtocol = {
                http: true,
                https: true,
                ftp: true,
                gopher: true,
                file: true,
                "http:": true,
                "https:": true,
                "ftp:": true,
                "gopher:": true,
                "file:": true
            }, querystring = require("./querystring");
            function urlParse(url, parseQueryString, slashesDenoteHost) {
                if (url && typeof url === "object" && url.href) return url;
                var out = {
                    href: url
                }, rest = url;
                var proto = protocolPattern.exec(rest);
                if (proto) {
                    proto = proto[0];
                    out.protocol = proto;
                    rest = rest.substr(proto.length);
                }
                if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var slashes = rest.substr(0, 2) === "//";
                    if (slashes && !(proto && hostlessProtocol[proto])) {
                        rest = rest.substr(2);
                        out.slashes = true;
                    }
                }
                if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
                    var firstNonHost = -1;
                    for (var i = 0, l = nonHostChars.length; i < l; i++) {
                        var index = rest.indexOf(nonHostChars[i]);
                        if (index !== -1 && (firstNonHost < 0 || index < firstNonHost)) firstNonHost = index;
                    }
                    if (firstNonHost !== -1) {
                        out.host = rest.substr(0, firstNonHost);
                        rest = rest.substr(firstNonHost);
                    } else {
                        out.host = rest;
                        rest = "";
                    }
                    var p = parseHost(out.host);
                    var keys = Object.keys(p);
                    for (var i = 0, l = keys.length; i < l; i++) {
                        var key = keys[i];
                        out[key] = p[key];
                    }
                    out.hostname = out.hostname || "";
                }
                var hash = rest.indexOf("#");
                if (hash !== -1) {
                    out.hash = rest.substr(hash);
                    rest = rest.slice(0, hash);
                }
                var qm = rest.indexOf("?");
                if (qm !== -1) {
                    out.search = rest.substr(qm);
                    out.query = rest.substr(qm + 1);
                    if (parseQueryString) {
                        out.query = querystring.parse(out.query);
                    }
                    rest = rest.slice(0, qm);
                } else if (parseQueryString) {
                    out.query = {};
                }
                if (rest) out.pathname = rest;
                out.path = out.pathname + out.search;
                return out;
            }
            function urlFormat(obj) {
                if (typeof obj === "string") obj = urlParse(obj);
                var protocol = obj.protocol || "", host = obj.host !== undefined ? obj.host : obj.hostname !== undefined ? (obj.auth ? obj.auth + "@" : "") + obj.hostname + (obj.port ? ":" + obj.port : "") : false, pathname = obj.pathname || "", search = obj.search || obj.query && "?" + (typeof obj.query === "object" ? querystring.stringify(obj.query) : String(obj.query)) || "", hash = obj.hash || "";
                if (protocol && protocol.substr(-1) !== ":") protocol += ":";
                if (obj.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
                    host = "//" + (host || "");
                    if (pathname && pathname.charAt(0) !== "/") pathname = "/" + pathname;
                } else if (!host) {
                    host = "";
                }
                if (hash && hash.charAt(0) !== "#") hash = "#" + hash;
                if (search && search.charAt(0) !== "?") search = "?" + search;
                return protocol + host + pathname + search + hash;
            }
            function urlResolve(source, relative) {
                return urlFormat(urlResolveObject(source, relative));
            }
            function urlResolveObject(source, relative) {
                if (!source) return relative;
                source = urlParse(urlFormat(source), false, true);
                relative = urlParse(urlFormat(relative), false, true);
                source.hash = relative.hash;
                if (relative.href === "") return source;
                if (relative.slashes && !relative.protocol) {
                    relative.protocol = source.protocol;
                    return relative;
                }
                if (relative.protocol && relative.protocol !== source.protocol) {
                    if (!slashedProtocol[relative.protocol]) return relative;
                    source.protocol = relative.protocol;
                    if (!relative.host && !hostlessProtocol[relative.protocol]) {
                        var relPath = (relative.pathname || "").split("/");
                        while (relPath.length && !(relative.host = relPath.shift())) ;
                        if (!relative.host) relative.host = "";
                        if (relPath[0] !== "") relPath.unshift("");
                        if (relPath.length < 2) relPath.unshift("");
                        relative.pathname = relPath.join("/");
                    }
                    source.pathname = relative.pathname;
                    source.search = relative.search;
                    source.query = relative.query;
                    source.host = relative.host || "";
                    delete source.auth;
                    delete source.hostname;
                    source.port = relative.port;
                    return source;
                }
                var isSourceAbs = source.pathname && source.pathname.charAt(0) === "/", isRelAbs = relative.host !== undefined || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || source.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = source.pathname && source.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = source.protocol && !slashedProtocol[source.protocol] && source.host !== undefined;
                if (psychotic) {
                    delete source.hostname;
                    delete source.auth;
                    delete source.port;
                    if (source.host) {
                        if (srcPath[0] === "") srcPath[0] = source.host; else srcPath.unshift(source.host);
                    }
                    delete source.host;
                    if (relative.protocol) {
                        delete relative.hostname;
                        delete relative.auth;
                        delete relative.port;
                        if (relative.host) {
                            if (relPath[0] === "") relPath[0] = relative.host; else relPath.unshift(relative.host);
                        }
                        delete relative.host;
                    }
                    mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
                }
                if (isRelAbs) {
                    source.host = relative.host || relative.host === "" ? relative.host : source.host;
                    source.search = relative.search;
                    source.query = relative.query;
                    srcPath = relPath;
                } else if (relPath.length) {
                    if (!srcPath) srcPath = [];
                    srcPath.pop();
                    srcPath = srcPath.concat(relPath);
                    source.search = relative.search;
                    source.query = relative.query;
                } else if ("search" in relative) {
                    if (psychotic) {
                        source.host = srcPath.shift();
                    }
                    source.search = relative.search;
                    source.query = relative.query;
                    return source;
                }
                if (!srcPath.length) {
                    delete source.pathname;
                    return source;
                }
                var last = srcPath.slice(-1)[0];
                var hasTrailingSlash = (source.host || relative.host) && (last === "." || last === "..") || last === "";
                var up = 0;
                for (var i = srcPath.length; i >= 0; i--) {
                    last = srcPath[i];
                    if (last == ".") {
                        srcPath.splice(i, 1);
                    } else if (last === "..") {
                        srcPath.splice(i, 1);
                        up++;
                    } else if (up) {
                        srcPath.splice(i, 1);
                        up--;
                    }
                }
                if (!mustEndAbs && !removeAllDots) {
                    for (;up--; up) {
                        srcPath.unshift("..");
                    }
                }
                if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
                    srcPath.unshift("");
                }
                if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
                    srcPath.push("");
                }
                var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
                if (psychotic) {
                    source.host = isAbsolute ? "" : srcPath.shift();
                }
                mustEndAbs = mustEndAbs || source.host && srcPath.length;
                if (mustEndAbs && !isAbsolute) {
                    srcPath.unshift("");
                }
                source.pathname = srcPath.join("/");
                return source;
            }
            function parseHost(host) {
                var out = {};
                var at = host.indexOf("@");
                if (at !== -1) {
                    out.auth = host.substr(0, at);
                    host = host.substr(at + 1);
                }
                var port = portPattern.exec(host);
                if (port) {
                    port = port[0];
                    out.port = port.substr(1);
                    host = host.substr(0, host.length - port.length);
                }
                if (host) out.hostname = host;
                return out;
            }
            __m["b"].sts = 1;
        }.bind(this)
    };
    __m["c"] = {
        sts: null,
        mod: {
            exports: {}
        },
        load: function() {
            var module = __m["c"].mod;
            var exports = module.exports;
            var require = function(name) {
                var namemap = {};
                var k = namemap[name];
                return k ? __m.__r(k) : __m.__sr(name);
            };
            require.resolve = __m.__sr.resolve;
            __m["c"].sts = 0;
            var ajax = {};
            ajax.x = function() {
                if (typeof XMLHttpRequest !== "undefined") {
                    return new XMLHttpRequest();
                }
                var versions = [ "MSXML2.XmlHttp.6.0", "MSXML2.XmlHttp.5.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.2.0", "Microsoft.XmlHttp" ];
                var xhr;
                for (var i = 0; i < versions.length; i++) {
                    try {
                        xhr = new ActiveXObject(versions[i]);
                        break;
                    } catch (e) {}
                }
                return xhr;
            };
            ajax.send = function(url, callback, method, data, headers, async) {
                if (async === undefined) {
                    async = true;
                }
                var x = ajax.x();
                x.open(method, url, async);
                x.onreadystatechange = function() {
                    if (x.readyState == 4) {
                        callback(x);
                    }
                };
                var keys = Object.keys(headers);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    x.setRequestHeader(key, headers[key]);
                }
                x.send(data);
            };
            module.exports = ajax;
            __m["c"].sts = 1;
        }.bind(this)
    };
    __m["d"] = {
        sts: null,
        mod: {
            exports: {}
        },
        load: function() {
            var module = __m["d"].mod;
            var exports = module.exports;
            var require = function(name) {
                var namemap = {
                    "./url": "b",
                    "./ajax": "c",
                    https: "https",
                    http: "http"
                };
                var k = namemap[name];
                return k ? __m.__r(k) : __m.__sr(name);
            };
            require.resolve = __m.__sr.resolve;
            __m["d"].sts = 0;
            var url = require("./url");
            var ajax = require("./ajax");
            var VERSION = "0.2.0";
            exports.request = function(rurl, data, callback, exheaders, exoptions) {
                if (typeof window !== "undefined") {
                    headers = {
                        Accept: "text/html,application/xhtml+xml,application/xml",
                        "Content-Type": "application/x-www-form-urlencoded"
                    };
                    exheaders = exheaders || {};
                    for (var attr in exheaders) {
                        headers[attr] = exheaders[attr];
                    }
                    ajax.send(rurl, function(xhr) {
                        var resp = {
                            statusCode: xhr.status
                        };
                        var status = Math.floor(xhr.status / 100);
                        if (status === 2) {
                            callback(null, resp, xhr.responseText);
                        } else {
                            callback("Eroor:: " + xhr.status, resp, xhr.responseText);
                        }
                    }, data ? "POST" : "GET", data, headers);
                } else {
                    var curl = url.parse(rurl);
                    var secure = curl.protocol == "https:";
                    var host = curl.hostname;
                    var port = parseInt(curl.port || (secure ? 443 : 80));
                    var path = [ curl.pathname || "/", curl.search || "", curl.hash || "" ].join("");
                    var method = data ? "POST" : "GET";
                    var headers = {
                        "User-Agent": "node-soap/" + VERSION,
                        Accept: "text/html,application/xhtml+xml,application/xml",
                        "Accept-Encoding": "none",
                        "Accept-Charset": "utf-8",
                        Connection: "close",
                        Host: host
                    };
                    if (typeof data == "string") {
                        headers["Content-Length"] = data.lenght;
                    }
                    exheaders = exheaders || {};
                    for (var attr in exheaders) {
                        headers[attr] = exheaders[attr];
                    }
                    var options = curl;
                    options.method = method;
                    options.headers = headers;
                    exoptions = exoptions || {};
                    for (var attr in exoptions) {
                        options[attr] = exoptions[attr];
                    }
                    var p;
                    if (secure) p = require("https"); else p = require("http");
                    var request = p.request(options, function(res, body) {
                        var body = "";
                        res.on("data", function(chunk) {
                            body += chunk;
                        });
                        res.on("end", function() {
                            callback(null, res, body);
                        });
                    });
                    request.on("error", callback);
                    request.end(data);
                }
            };
            __m["d"].sts = 1;
        }.bind(this)
    };
    __m["e"] = {
        sts: null,
        mod: {
            exports: {}
        },
        load: function() {
            var module = __m["e"].mod;
            var exports = module.exports;
            var require = function(name) {
                var namemap = {};
                var k = namemap[name];
                return k ? __m.__r(k) : __m.__sr(name);
            };
            require.resolve = __m.__sr.resolve;
            __m["e"].sts = 0;
            module.exports = function(expr, msg) {
                if (!(true == !!expr)) {
                    console.log(msg);
                    throw new Error(msg);
                }
            };
            __m["e"].sts = 1;
        }.bind(this)
    };
    __m["f"] = {
        sts: null,
        mod: {
            exports: {}
        },
        load: function() {
            var module = __m["f"].mod;
            var exports = module.exports;
            var require = function(name) {
                var namemap = {
                    "./http": "d",
                    "./assert": "e",
                    "./url": "b"
                };
                var k = namemap[name];
                return k ? __m.__r(k) : __m.__sr(name);
            };
            require.resolve = __m.__sr.resolve;
            __m["f"].sts = 0;
            function findKey(obj, val) {
                for (var n in obj) if (obj[n] === val) return n;
            }
            var http = require("./http"), assert = require("./assert"), url = require("./url");
            var Client = function(wsdl, endpoint) {
                this.wsdl = wsdl;
                this._initializeServices(endpoint);
            };
            Client.prototype.setEndpoint = function(endpoint) {
                this.endpoint = endpoint;
                this._initializeServices(endpoint);
            };
            Client.prototype.describe = function() {
                var types = this.wsdl.definitions.types;
                return this.wsdl.describeServices();
            };
            Client.prototype.setSecurity = function(security) {
                this.security = security;
            };
            Client.prototype.setSOAPAction = function(SOAPAction) {
                this.SOAPAction = SOAPAction;
            };
            Client.prototype._initializeServices = function(endpoint) {
                var definitions = this.wsdl.definitions, services = definitions.services;
                for (var name in services) {
                    this[name] = this._defineService(services[name], endpoint);
                }
            };
            Client.prototype._defineService = function(service, endpoint) {
                var ports = service.ports, def = {};
                for (var name in ports) {
                    def[name] = this._definePort(ports[name], endpoint ? endpoint : ports[name].location);
                }
                return def;
            };
            Client.prototype._definePort = function(port, endpoint) {
                var location = endpoint, binding = port.binding, methods = binding.methods, def = {};
                for (var name in methods) {
                    def[name] = this._defineMethod(methods[name], location);
                    if (!this[name]) this[name] = def[name];
                }
                return def;
            };
            Client.prototype._defineMethod = function(method, location) {
                var self = this;
                return function(args, callback) {
                    if (typeof args === "function") {
                        callback = args;
                        args = {};
                    }
                    self._invoke(method, args, location, function(error, result, raw) {
                        callback(error, result, raw);
                    });
                };
            };
            Client.prototype._invoke = function(method, arguments, location, callback) {
                var self = this, name = method.$name, input = method.input, output = method.output, style = method.style, defs = this.wsdl.definitions, ns = defs.$targetNamespace, encoding = "", message = "", xml = null, headers = {
                    SOAPAction: this.SOAPAction ? this.SOAPAction(ns, name) : (ns.lastIndexOf("/") != ns.length - 1 ? ns + "/" : ns) + name,
                    "Content-Type": "text/xml; charset=utf-8"
                }, options = {}, alias = findKey(defs.xmlns, ns);
                if (self.security && self.security.addHeaders) self.security.addHeaders(headers);
                if (self.security && self.security.addOptions) self.security.addOptions(options);
                if (input.parts) {
                    assert(!style || style == "rpc", "invalid message definition for document style binding");
                    message = self.wsdl.objectToRpcXML(name, arguments, alias, ns);
                    method.inputSoap === "encoded" && (encoding = 'soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" ');
                } else if (typeof arguments === "string") {
                    message = arguments;
                } else {
                    assert(!style || style == "document", "invalid message definition for rpc style binding");
                    message = self.wsdl.objectToDocumentXML(input.$name, arguments, input.targetNSAlias, input.targetNamespace);
                }
                xml = "<soap:Envelope " + 'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' + encoding + this.wsdl.xmlnsInEnvelope + ">" + "<soap:Header>" + (self.security ? self.security.toXML() : "") + "</soap:Header>" + "<soap:Body>" + message + "</soap:Body>" + "</soap:Envelope>";
                http.request(location, xml, function(err, response, body) {
                    if (err) {
                        callback(err, body ? self.wsdl.xmlToObject(body) : null, body);
                    } else {
                        try {
                            var obj = self.wsdl.xmlToObject(body);
                        } catch (error) {
                            return callback(error, response, body);
                        }
                        var result = obj.Body[output.$name];
                        if (!result) {
                            result = obj.Body[name + "Response"];
                        }
                        callback(null, result, body);
                    }
                }, headers, options);
            };
            exports.Client = Client;
            __m["f"].sts = 1;
        }.bind(this)
    };
    __m["g"] = {
        sts: null,
        mod: {
            exports: {}
        },
        load: function() {
            var module = __m["g"].mod;
            var exports = module.exports;
            var require = function(name) {
                var namemap = {
                    util: "util",
                    fs: "fs",
                    util: "util"
                };
                var k = namemap[name];
                return k ? __m.__r(k) : __m.__sr(name);
            };
            require.resolve = __m.__sr.resolve;
            __m["g"].sts = 0;
            (function() {
                var whitespace = "\n\r\t ";
                var XMLP = function(strXML) {
                    strXML = SAXStrings.replace(strXML, null, null, "\r\n", "\n");
                    strXML = SAXStrings.replace(strXML, null, null, "\r", "\n");
                    this.m_xml = strXML;
                    this.m_iP = 0;
                    this.m_iState = XMLP._STATE_PROLOG;
                    this.m_stack = new Stack();
                    this._clearAttributes();
                    this.m_pause = false;
                    this.m_preInterruptIState = XMLP._STATE_PROLOG;
                    this.m_namespaceList = new Array();
                    this.m_chunkTransitionContinuation = null;
                };
                XMLP._NONE = 0;
                XMLP._ELM_B = 1;
                XMLP._ELM_E = 2;
                XMLP._ELM_EMP = 3;
                XMLP._ATT = 4;
                XMLP._TEXT = 5;
                XMLP._ENTITY = 6;
                XMLP._PI = 7;
                XMLP._CDATA = 8;
                XMLP._COMMENT = 9;
                XMLP._DTD = 10;
                XMLP._ERROR = 11;
                XMLP._INTERRUPT = 12;
                XMLP._CONT_XML = 0;
                XMLP._CONT_ALT = 1;
                XMLP._ATT_NAME = 0;
                XMLP._ATT_VAL = 1;
                XMLP._STATE_PROLOG = 1;
                XMLP._STATE_DOCUMENT = 2;
                XMLP._STATE_MISC = 3;
                XMLP._errs = new Array();
                XMLP._errs[XMLP.ERR_CLOSE_PI = 0] = "PI: missing closing sequence";
                XMLP._errs[XMLP.ERR_CLOSE_DTD = 1] = "DTD: missing closing sequence";
                XMLP._errs[XMLP.ERR_CLOSE_COMMENT = 2] = "Comment: missing closing sequence";
                XMLP._errs[XMLP.ERR_CLOSE_CDATA = 3] = "CDATA: missing closing sequence";
                XMLP._errs[XMLP.ERR_CLOSE_ELM = 4] = "Element: missing closing sequence";
                XMLP._errs[XMLP.ERR_CLOSE_ENTITY = 5] = "Entity: missing closing sequence";
                XMLP._errs[XMLP.ERR_PI_TARGET = 6] = "PI: target is required";
                XMLP._errs[XMLP.ERR_ELM_EMPTY = 7] = "Element: cannot be both empty and closing";
                XMLP._errs[XMLP.ERR_ELM_NAME = 8] = 'Element: name must immediatly follow "<"';
                XMLP._errs[XMLP.ERR_ELM_LT_NAME = 9] = 'Element: "<" not allowed in element names';
                XMLP._errs[XMLP.ERR_ATT_VALUES = 10] = "Attribute: values are required and must be in quotes";
                XMLP._errs[XMLP.ERR_ATT_LT_NAME = 11] = 'Element: "<" not allowed in attribute names';
                XMLP._errs[XMLP.ERR_ATT_LT_VALUE = 12] = 'Attribute: "<" not allowed in attribute values';
                XMLP._errs[XMLP.ERR_ATT_DUP = 13] = "Attribute: duplicate attributes not allowed";
                XMLP._errs[XMLP.ERR_ENTITY_UNKNOWN = 14] = "Entity: unknown entity";
                XMLP._errs[XMLP.ERR_INFINITELOOP = 15] = "Infininte loop";
                XMLP._errs[XMLP.ERR_DOC_STRUCTURE = 16] = "Document: only comments, processing instructions, or whitespace allowed outside of document element";
                XMLP._errs[XMLP.ERR_ELM_NESTING = 17] = "Element: must be nested correctly";
                XMLP.prototype.continueParsing = function(strXML) {
                    if (this.m_chunkTransitionContinuation) {
                        strXML = this.m_chunkTransitionContinuation + strXML;
                    }
                    strXML = SAXStrings.replace(strXML, null, null, "\r\n", "\n");
                    strXML = SAXStrings.replace(strXML, null, null, "\r", "\n");
                    this.m_xml = strXML;
                    this.m_iP = 0;
                    this.m_iState = XMLP._STATE_DOCUMENT;
                    this.m_pause = false;
                    this.m_preInterruptIState = XMLP._STATE_PROLOG;
                    this.m_chunkTransitionContinuation = null;
                };
                XMLP.prototype._addAttribute = function(name, value) {
                    this.m_atts[this.m_atts.length] = new Array(name, value);
                };
                XMLP.prototype._checkStructure = function(iEvent) {
                    if (XMLP._STATE_PROLOG == this.m_iState) {
                        if (XMLP._TEXT == iEvent || XMLP._ENTITY == iEvent) {
                            if (SAXStrings.indexOfNonWhitespace(this.getContent(), this.getContentBegin(), this.getContentEnd()) != -1) {
                                return this._setErr(XMLP.ERR_DOC_STRUCTURE);
                            }
                        }
                        if (XMLP._ELM_B == iEvent || XMLP._ELM_EMP == iEvent) {
                            this.m_iState = XMLP._STATE_DOCUMENT;
                        }
                    }
                    if (XMLP._STATE_DOCUMENT == this.m_iState) {
                        if (XMLP._ELM_B == iEvent || XMLP._ELM_EMP == iEvent) {
                            this.m_stack.push(this.getName());
                        }
                        if (XMLP._ELM_E == iEvent || XMLP._ELM_EMP == iEvent) {
                            var strTop = this.m_stack.pop();
                            if (strTop == null || strTop != this.getName()) {
                                return this._setErr(XMLP.ERR_ELM_NESTING);
                            }
                        }
                        if (this.m_stack.count() == 0) {
                            this.m_iState = XMLP._STATE_MISC;
                            return iEvent;
                        }
                    }
                    if (XMLP._STATE_MISC == this.m_iState) {
                        if (XMLP._ELM_B == iEvent || XMLP._ELM_E == iEvent || XMLP._ELM_EMP == iEvent || XMLP.EVT_DTD == iEvent) {
                            return this._setErr(XMLP.ERR_DOC_STRUCTURE);
                        }
                        if (XMLP._TEXT == iEvent || XMLP._ENTITY == iEvent) {
                            if (SAXStrings.indexOfNonWhitespace(this.getContent(), this.getContentBegin(), this.getContentEnd()) != -1) {
                                return this._setErr(XMLP.ERR_DOC_STRUCTURE);
                            }
                        }
                    }
                    return iEvent;
                };
                XMLP.prototype._clearAttributes = function() {
                    this.m_atts = new Array();
                };
                XMLP.prototype._findAttributeIndex = function(name) {
                    for (var i = 0; i < this.m_atts.length; i++) {
                        if (this.m_atts[i][XMLP._ATT_NAME] == name) {
                            return i;
                        }
                    }
                    return -1;
                };
                XMLP.prototype.getAttributeCount = function() {
                    return this.m_atts ? this.m_atts.length : 0;
                };
                XMLP.prototype.getAttributeName = function(index) {
                    return index < 0 || index >= this.m_atts.length ? null : this.m_atts[index][XMLP._ATT_NAME];
                };
                XMLP.prototype.getAttributeValue = function(index) {
                    return index < 0 || index >= this.m_atts.length ? null : __unescapeString(this.m_atts[index][XMLP._ATT_VAL]);
                };
                XMLP.prototype.getAttributeValueByName = function(name) {
                    return this.getAttributeValue(this._findAttributeIndex(name));
                };
                XMLP.prototype.getColumnNumber = function() {
                    return SAXStrings.getColumnNumber(this.m_xml, this.m_iP);
                };
                XMLP.prototype.getContent = function() {
                    return this.m_cSrc == XMLP._CONT_XML ? this.m_xml : this.m_cAlt;
                };
                XMLP.prototype.getContentBegin = function() {
                    return this.m_cB;
                };
                XMLP.prototype.getContentEnd = function() {
                    return this.m_cE;
                };
                XMLP.prototype.getLineNumber = function() {
                    return SAXStrings.getLineNumber(this.m_xml, this.m_iP);
                };
                XMLP.prototype.getName = function() {
                    return this.m_name;
                };
                XMLP.prototype.pause = function() {
                    this.m_pause = true;
                };
                XMLP.prototype.resume = function() {
                    this.m_pause = false;
                    this.m_iState = this.m_preInterruptIState;
                };
                XMLP.prototype.next = function() {
                    if (!this.m_pause) {
                        return this._checkStructure(this._parse());
                    } else {
                        this.m_preInterruptIState = this.m_iState;
                        return XMLP._INTERRUPT;
                    }
                };
                XMLP.prototype._parse = function() {
                    if (this.m_iP == this.m_xml.length) {
                        return XMLP._NONE;
                    }
                    function _indexOf(needle, haystack, start) {
                        for (var i = 0; i < needle.length; i++) {
                            if (needle.charAt(i) != haystack.charAt(start + i)) return -1;
                        }
                        return start;
                    }
                    var fc = this.m_xml.charAt(this.m_iP);
                    if (fc !== "<" && fc !== "&") {
                        return this._parseText(this.m_iP);
                    } else if (this.m_iP == _indexOf("<?", this.m_xml, this.m_iP)) {
                        return this._parsePI(this.m_iP + 2);
                    } else if (this.m_iP == _indexOf("<!DOCTYPE", this.m_xml, this.m_iP)) {
                        return this._parseDTD(this.m_iP + 9);
                    } else if (this.m_iP == _indexOf("\x3c!--", this.m_xml, this.m_iP)) {
                        return this._parseComment(this.m_iP + 4);
                    } else if (this.m_iP == _indexOf("<![CDATA[", this.m_xml, this.m_iP)) {
                        return this._parseCDATA(this.m_iP + 9);
                    } else if (this.m_iP == _indexOf("<", this.m_xml, this.m_iP)) {
                        return this._parseElement(this.m_iP + 1);
                    } else if (this.m_iP == _indexOf("&", this.m_xml, this.m_iP)) {
                        return this._parseEntity(this.m_iP + 1);
                    } else {
                        return this._parseText(this.m_iP);
                    }
                };
                XMLP.prototype._parsePrefixAndElementName = function(elementlabel) {
                    splits = elementlabel.split(":", 2);
                    return {
                        prefix: splits.length === 1 ? "" : splits[0],
                        name: splits.length === 1 ? elementlabel : splits[1]
                    };
                };
                XMLP.prototype._parseNamespacesAndAtts = function(atts) {
                    that = this;
                    var newnamespaces = [];
                    var filteredatts = [];
                    atts.map(function(item) {
                        if (item[0].slice(0, 5) === "xmlns") {
                            newnamespaces.push({
                                prefix: item[0].slice(6),
                                uri: item[1],
                                scopetag: that.m_name
                            });
                        } else {
                            filteredatts.push(item);
                        }
                        return "not used";
                    });
                    this.m_namespaceList = this.m_namespaceList.concat(newnamespaces);
                    return [ filteredatts, newnamespaces.map(function(item) {
                        return [ item.prefix, item.uri ];
                    }) ];
                };
                XMLP.prototype._getContextualNamespace = function(prefix) {
                    if (prefix !== "") {
                        for (item in this.m_namespaceList) {
                            item = this.m_namespaceList[item];
                            if (item.prefix === prefix) {
                                return item.uri;
                            }
                        }
                    }
                    for (var i = this.m_namespaceList.length - 1; i >= 0; i--) {
                        var item = this.m_namespaceList[i];
                        if (item.prefix === "") {
                            return item.uri;
                        }
                    }
                    return "";
                };
                XMLP.prototype._removeExpiredNamesapces = function(closingtagname) {
                    var keeps = [];
                    this.m_namespaceList.map(function(item) {
                        if (item.scopetag !== closingtagname) {
                            keeps.push(item);
                        }
                    });
                    this.m_namespaceList = keeps;
                };
                XMLP.prototype._parseAttribute = function(iB, iE) {
                    var iNB, iNE, iEq, iVB, iVE;
                    var cQuote, strN, strV;
                    this.m_cAlt = "";
                    iNB = SAXStrings.indexOfNonWhitespace(this.m_xml, iB, iE);
                    if (iNB == -1 || iNB >= iE) {
                        return iNB;
                    }
                    iEq = this.m_xml.indexOf("=", iNB);
                    if (iEq == -1 || iEq > iE) {
                        return this._setErr(XMLP.ERR_ATT_VALUES);
                    }
                    iNE = SAXStrings.lastIndexOfNonWhitespace(this.m_xml, iNB, iEq);
                    iVB = SAXStrings.indexOfNonWhitespace(this.m_xml, iEq + 1, iE);
                    if (iVB == -1 || iVB > iE) {
                        return this._setErr(XMLP.ERR_ATT_VALUES);
                    }
                    cQuote = this.m_xml.charAt(iVB);
                    if (SAXStrings.QUOTES.indexOf(cQuote) == -1) {
                        return this._setErr(XMLP.ERR_ATT_VALUES);
                    }
                    iVE = this.m_xml.indexOf(cQuote, iVB + 1);
                    if (iVE == -1 || iVE > iE) {
                        return this._setErr(XMLP.ERR_ATT_VALUES);
                    }
                    strN = this.m_xml.substring(iNB, iNE + 1);
                    strV = this.m_xml.substring(iVB + 1, iVE);
                    if (strN.indexOf("<") != -1) {
                        return this._setErr(XMLP.ERR_ATT_LT_NAME);
                    }
                    if (strV.indexOf("<") != -1) {
                        return this._setErr(XMLP.ERR_ATT_LT_VALUE);
                    }
                    strV = SAXStrings.replace(strV, null, null, "\n", " ");
                    strV = SAXStrings.replace(strV, null, null, "\t", " ");
                    iRet = this._replaceEntities(strV);
                    if (iRet == XMLP._ERROR) {
                        return iRet;
                    }
                    strV = this.m_cAlt;
                    if (this._findAttributeIndex(strN) == -1) {
                        this._addAttribute(strN, strV);
                    } else {
                        return this._setErr(XMLP.ERR_ATT_DUP);
                    }
                    this.m_iP = iVE + 2;
                    return XMLP._ATT;
                };
                XMLP.prototype._parseCDATA = function(iB) {
                    var iE = this.m_xml.indexOf("]]>", iB);
                    if (iE == -1) {
                        this.m_chunkTransitionContinuation = this.m_xml.slice(iB - 9);
                        return XMLP._INTERRUPT;
                    }
                    this._setContent(XMLP._CONT_XML, iB, iE);
                    this.m_iP = iE + 3;
                    return XMLP._CDATA;
                };
                XMLP.prototype._parseComment = function(iB) {
                    var iE = this.m_xml.indexOf("-" + "->", iB);
                    if (iE == -1) {
                        this.m_chunkTransitionContinuation = this.m_xml.slice(iB - 4);
                        return XMLP._INTERRUPT;
                    }
                    this._setContent(XMLP._CONT_XML, iB, iE);
                    this.m_iP = iE + 3;
                    return XMLP._COMMENT;
                };
                XMLP.prototype._parseDTD = function(iB) {
                    var iE, strClose, iInt, iLast;
                    iE = this.m_xml.indexOf(">", iB);
                    if (iE == -1) {
                        this.m_chunkTransitionContinuation = this.m_xml.slice(iB - 9);
                        return XMLP._INTERRUPT;
                    }
                    iInt = this.m_xml.indexOf("[", iB);
                    strClose = iInt != -1 && iInt < iE ? "]>" : ">";
                    while (true) {
                        if (iE == iLast) {
                            return this._setErr(XMLP.ERR_INFINITELOOP);
                        }
                        iLast = iE;
                        iE = this.m_xml.indexOf(strClose, iB);
                        if (iE == -1) {
                            return this._setErr(XMLP.ERR_CLOSE_DTD);
                        }
                        if (this.m_xml.substring(iE - 1, iE + 2) != "]]>") {
                            break;
                        }
                    }
                    this.m_iP = iE + strClose.length;
                    return XMLP._DTD;
                };
                XMLP.prototype._parseElement = function(iB) {
                    util = require("util");
                    var iE, iDE, iNE, iRet;
                    var iType, strN, iLast;
                    iDE = iE = this.m_xml.indexOf(">", iB);
                    if (iE == -1) {
                        this.m_chunkTransitionContinuation = this.m_xml.slice(iB - 1);
                        return XMLP._INTERRUPT;
                    }
                    if (this.m_xml.charAt(iB) == "/") {
                        iType = XMLP._ELM_E;
                        iB++;
                    } else {
                        iType = XMLP._ELM_B;
                    }
                    if (this.m_xml.charAt(iE - 1) == "/") {
                        if (iType == XMLP._ELM_E) {
                            return this._setErr(XMLP.ERR_ELM_EMPTY);
                        }
                        iType = XMLP._ELM_EMP;
                        iDE--;
                    }
                    iDE = SAXStrings.lastIndexOfNonWhitespace(this.m_xml, iB, iDE);
                    if (iE - iB != 1) {
                        if (SAXStrings.indexOfNonWhitespace(this.m_xml, iB, iDE) != iB) {
                            return this._setErr(XMLP.ERR_ELM_NAME);
                        }
                    }
                    this._clearAttributes();
                    iNE = SAXStrings.indexOfWhitespace(this.m_xml, iB, iDE);
                    if (iNE == -1) {
                        iNE = iDE + 1;
                    } else {
                        this.m_iP = iNE;
                        while (this.m_iP < iDE) {
                            if (this.m_iP == iLast) return this._setErr(XMLP.ERR_INFINITELOOP);
                            iLast = this.m_iP;
                            iRet = this._parseAttribute(this.m_iP, iDE);
                            if (iRet == XMLP._ERROR) return iRet;
                        }
                    }
                    strN = this.m_xml.substring(iB, iNE);
                    if (strN.indexOf("<") != -1) {
                        return this._setErr(XMLP.ERR_ELM_LT_NAME);
                    }
                    this.m_name = strN;
                    this.m_iP = iE + 1;
                    return iType;
                };
                XMLP.prototype._parseEntity = function(iB) {
                    var iE = this.m_xml.indexOf(";", iB);
                    if (iE == -1) {
                        this.m_chunkTransitionContinuation = this.m_xml.slice(iB - 1);
                        return XMLP._INTERRUPT;
                    }
                    this.m_iP = iE + 1;
                    return this._replaceEntity(this.m_xml, iB, iE);
                };
                XMLP.prototype._parsePI = function(iB) {
                    var iE, iTB, iTE, iCB, iCE;
                    iE = this.m_xml.indexOf("?>", iB);
                    if (iE == -1) {
                        this.m_chunkTransitionContinuation = this.m_xml.slice(iB - 2);
                        return XMLP._INTERRUPT;
                        return this._setErr(XMLP.ERR_CLOSE_PI);
                    }
                    iTB = SAXStrings.indexOfNonWhitespace(this.m_xml, iB, iE);
                    if (iTB == -1) {
                        return this._setErr(XMLP.ERR_PI_TARGET);
                    }
                    iTE = SAXStrings.indexOfWhitespace(this.m_xml, iTB, iE);
                    if (iTE == -1) {
                        iTE = iE;
                    }
                    iCB = SAXStrings.indexOfNonWhitespace(this.m_xml, iTE, iE);
                    if (iCB == -1) {
                        iCB = iE;
                    }
                    iCE = SAXStrings.lastIndexOfNonWhitespace(this.m_xml, iCB, iE);
                    if (iCE == -1) {
                        iCE = iE - 1;
                    }
                    this.m_name = this.m_xml.substring(iTB, iTE);
                    this._setContent(XMLP._CONT_XML, iCB, iCE + 1);
                    this.m_iP = iE + 2;
                    return XMLP._PI;
                };
                XMLP.prototype._parseText = function(iB) {
                    var iE, ch;
                    for (iE = iB; iE < this.m_xml.length; ++iE) {
                        ch = this.m_xml.charAt(iE);
                        if (ch === "<" || ch === "&") {
                            break;
                        }
                    }
                    this._setContent(XMLP._CONT_XML, iB, iE);
                    this.m_iP = iE;
                    return XMLP._TEXT;
                };
                XMLP.prototype._replaceEntities = function(strD, iB, iE) {
                    if (SAXStrings.isEmpty(strD)) return "";
                    iB = iB || 0;
                    iE = iE || strD.length;
                    var iEB, iEE, strRet = "";
                    iEB = strD.indexOf("&", iB);
                    iEE = iB;
                    while (iEB > 0 && iEB < iE) {
                        strRet += strD.substring(iEE, iEB);
                        iEE = strD.indexOf(";", iEB) + 1;
                        if (iEE == 0 || iEE > iE) {
                            return this._setErr(XMLP.ERR_CLOSE_ENTITY);
                        }
                        iRet = this._replaceEntity(strD, iEB + 1, iEE - 1);
                        if (iRet == XMLP._ERROR) {
                            return iRet;
                        }
                        strRet += this.m_cAlt;
                        iEB = strD.indexOf("&", iEE);
                    }
                    if (iEE != iE) {
                        strRet += strD.substring(iEE, iE);
                    }
                    this._setContent(XMLP._CONT_ALT, strRet);
                    return XMLP._ENTITY;
                };
                XMLP.prototype._replaceEntity = function(strD, iB, iE) {
                    if (SAXStrings.isEmpty(strD)) return -1;
                    iB = iB || 0;
                    iE = iE || strD.length;
                    switch (strD.substring(iB, iE)) {
                      case "amp":
                        strEnt = "&";
                        break;

                      case "lt":
                        strEnt = "<";
                        break;

                      case "gt":
                        strEnt = ">";
                        break;

                      case "apos":
                        strEnt = "'";
                        break;

                      case "quot":
                        strEnt = '"';
                        break;

                      case "nbsp":
                        strEnt = "";
                        break;

                      case "lt":
                        strEnt = "<";
                        break;

                      case "gt":
                        strEnt = ">";
                        break;

                      case "amp":
                        strEnt = "&";
                        break;

                      case "cent":
                        strEnt = "¢";
                        break;

                      case "pound":
                        strEnt = "£";
                        break;

                      case "yen":
                        strEnt = "¥";
                        break;

                      case "euro":
                        strEnt = "€";
                        break;

                      case "sect":
                        strEnt = "§";
                        break;

                      case "copy":
                        strEnt = "©";
                        break;

                      case "reg":
                        strEnt = "®";
                        break;

                      default:
                        if (strD.charAt(iB) == "#") {
                            strEnt = String.fromCharCode(parseInt(strD.substring(iB + 1, iE)));
                        } else {
                            strEnt = " ";
                        }
                        break;
                    }
                    this._setContent(XMLP._CONT_ALT, strEnt);
                    return XMLP._ENTITY;
                };
                XMLP.prototype._setContent = function(iSrc) {
                    var args = arguments;
                    if (XMLP._CONT_XML == iSrc) {
                        this.m_cAlt = null;
                        this.m_cB = args[1];
                        this.m_cE = args[2];
                    } else {
                        this.m_cAlt = args[1];
                        this.m_cB = 0;
                        this.m_cE = args[1].length;
                    }
                    this.m_cSrc = iSrc;
                };
                XMLP.prototype._setErr = function(iErr) {
                    var strErr = XMLP._errs[iErr];
                    this.m_cAlt = strErr;
                    this.m_cB = 0;
                    this.m_cE = strErr.length;
                    this.m_cSrc = XMLP._CONT_ALT;
                    return XMLP._ERROR;
                };
                var SaxParser = function(eventhandlerfactory) {
                    var eventhandler = new function() {}();
                    var thehandler = function() {};
                    thehandler.prototype.onStartDocument = function(funct) {
                        eventhandler.onStartDocument = funct;
                    };
                    thehandler.prototype.onEndDocument = function(funct) {
                        eventhandler.onEndDocument = funct;
                    };
                    thehandler.prototype.onStartElementNS = function(funct) {
                        eventhandler.onStartElementNS = funct;
                    };
                    thehandler.prototype.onEndElementNS = function(funct) {
                        eventhandler.onEndElementNS = funct;
                    };
                    thehandler.prototype.onCharacters = function(funct) {
                        eventhandler.onCharacters = funct;
                    };
                    thehandler.prototype.onCdata = function(funct) {
                        eventhandler.onCdata = funct;
                    };
                    thehandler.prototype.onComment = function(funct) {
                        eventhandler.onComment = funct;
                    };
                    thehandler.prototype.onWarning = function(funct) {
                        eventhandler.onWarning = funct;
                    };
                    thehandler.prototype.onError = function(funct) {
                        eventhandler.onError = funct;
                    };
                    eventhandlerfactory(new thehandler());
                    this.m_hndDoc = eventhandler;
                    this.m_hndErr = eventhandler;
                    this.m_hndLex = eventhandler;
                    this.m_interrupted = false;
                };
                SaxParser.DOC_B = 1;
                SaxParser.DOC_E = 2;
                SaxParser.ELM_B = 3;
                SaxParser.ELM_E = 4;
                SaxParser.CHARS = 5;
                SaxParser.PI = 6;
                SaxParser.CD_B = 7;
                SaxParser.CD_E = 8;
                SaxParser.CMNT = 9;
                SaxParser.DTD_B = 10;
                SaxParser.DTD_E = 11;
                SaxParser.prototype.parseFile = function(filename) {
                    var fs = require("fs");
                    var that = this;
                    fs.readFile(filename, function(err, data) {
                        that.parseString(data);
                    });
                };
                SaxParser.prototype.parseString = function(strD) {
                    util = require("util");
                    var that = this;
                    var startnew = true;
                    if (!that.m_parser) {
                        that.m_parser = new XMLP(strD);
                        startnew = false;
                    } else {
                        that.m_parser.continueParsing(strD);
                        startnew = true;
                    }
                    that.m_bErr = false;
                    if (!that.m_bErr && !startnew) {
                        that._fireEvent(SaxParser.DOC_B);
                    }
                    that._parseLoop();
                    if (!that.m_bErr && !that.m_interrupted) {
                        that._fireEvent(SaxParser.DOC_E);
                    }
                    that.m_xml = null;
                    that.m_iP = 0;
                    that.m_interrupted = false;
                };
                SaxParser.prototype.pause = function() {
                    this.m_parser.pause();
                };
                SaxParser.prototype.resume = function() {
                    this.m_parser.resume();
                    this.m_interrupted = false;
                    var that = this;
                    setTimeout(function() {
                        that._parseLoop();
                        if (!that.m_bErr && !that.m_interrupted) {
                            that._fireEvent(SaxParser.DOC_E);
                        }
                    }, 0);
                };
                SaxParser.prototype.setDocumentHandler = function(hnd) {
                    this.m_hndDoc = hnd;
                };
                SaxParser.prototype.setErrorHandler = function(hnd) {
                    this.m_hndErr = hnd;
                };
                SaxParser.prototype.setLexicalHandler = function(hnd) {
                    this.m_hndLex = hnd;
                };
                SaxParser.prototype.getColumnNumber = function() {
                    return this.m_parser.getColumnNumber();
                };
                SaxParser.prototype.getLineNumber = function() {
                    return this.m_parser.getLineNumber();
                };
                SaxParser.prototype.getMessage = function() {
                    return this.m_strErrMsg;
                };
                SaxParser.prototype.getPublicId = function() {
                    return null;
                };
                SaxParser.prototype.getSystemId = function() {
                    return null;
                };
                SaxParser.prototype.getLength = function() {
                    return this.m_parser.getAttributeCount();
                };
                SaxParser.prototype.getName = function(index) {
                    return this.m_parser.getAttributeName(index);
                };
                SaxParser.prototype.getValue = function(index) {
                    return this.m_parser.getAttributeValue(index);
                };
                SaxParser.prototype.getValueByName = function(name) {
                    return this.m_parser.getAttributeValueByName(name);
                };
                SaxParser.prototype._fireError = function(strMsg) {
                    this.m_strErrMsg = strMsg;
                    this.m_bErr = true;
                    if (this.m_hndErr && this.m_hndErr.onError) {
                        this.m_hndErr.onError(this.m_strErrMsg);
                    }
                };
                SaxParser.prototype._fireEvent = function(iEvt) {
                    var hnd, func, args = arguments, iLen = args.length - 1;
                    if (this.m_bErr) return;
                    if (SaxParser.DOC_B == iEvt) {
                        func = "onStartDocument";
                        hnd = this.m_hndDoc;
                    } else if (SaxParser.DOC_E == iEvt) {
                        func = "onEndDocument";
                        hnd = this.m_hndDoc;
                    } else if (SaxParser.ELM_B == iEvt) {
                        func = "onStartElementNS";
                        hnd = this.m_hndDoc;
                    } else if (SaxParser.ELM_E == iEvt) {
                        func = "onEndElementNS";
                        hnd = this.m_hndDoc;
                    } else if (SaxParser.CHARS == iEvt) {
                        func = "onCharacters";
                        hnd = this.m_hndDoc;
                    } else if (SaxParser.PI == iEvt) {
                        func = "processingInstruction";
                        hnd = this.m_hndDoc;
                    } else if (SaxParser.CD_B == iEvt) {
                        func = "onCdata";
                        hnd = this.m_hndLex;
                    } else if (SaxParser.CD_E == iEvt) {
                        func = "onEndCDATA";
                        hnd = this.m_hndLex;
                    } else if (SaxParser.CMNT == iEvt) {
                        func = "onComment";
                        hnd = this.m_hndLex;
                    }
                    if (hnd && hnd[func]) {
                        if (0 == iLen) {
                            hnd[func]();
                        } else if (1 == iLen) {
                            hnd[func](args[1]);
                        } else if (2 == iLen) {
                            hnd[func](args[1], args[2]);
                        } else if (3 == iLen) {
                            hnd[func](args[1], args[2], args[3]);
                        } else if (4 == iLen) {
                            hnd[func](args[1], args[2], args[3], args[4]);
                        } else if (5 == iLen) {
                            hnd[func](args[1], args[2], args[3], args[4], args[5]);
                        } else if (6 == iLen) {
                            hnd[func](args[1], args[2], args[3], args[4], args[5], args[6]);
                        }
                    }
                };
                SaxParser.prototype._parseLoop = function(parser) {
                    var iEvent, parser;
                    parser = this.m_parser;
                    while (!this.m_bErr) {
                        iEvent = parser.next();
                        if (iEvent == XMLP._ELM_B) {
                            theatts = this.m_parser.m_atts;
                            nameobject = parser._parsePrefixAndElementName(parser.getName());
                            theattsandnamespace = parser._parseNamespacesAndAtts(theatts);
                            var theuri = parser._getContextualNamespace(nameobject.prefix);
                            this._fireEvent(SaxParser.ELM_B, nameobject.name, theattsandnamespace[0], nameobject.prefix === "" ? null : nameobject.prefix, theuri === "" ? null : theuri, theattsandnamespace[1]);
                        } else if (iEvent == XMLP._ELM_E) {
                            nameobject = parser._parsePrefixAndElementName(parser.getName());
                            var theuri = parser._getContextualNamespace(nameobject.prefix);
                            parser._removeExpiredNamesapces(parser.getName());
                            this._fireEvent(SaxParser.ELM_E, nameobject.name, nameobject.prefix === "" ? null : nameobject.prefix, theuri === "" ? null : theuri);
                        } else if (iEvent == XMLP._ELM_EMP) {
                            theatts = this.m_parser.m_atts;
                            nameobject = parser._parsePrefixAndElementName(parser.getName());
                            theattsandnamespace = parser._parseNamespacesAndAtts(theatts);
                            var theuri = parser._getContextualNamespace(nameobject.prefix);
                            this._fireEvent(SaxParser.ELM_B, nameobject.name, theattsandnamespace[0], nameobject.prefix === "" ? null : nameobject.prefix, theuri === "" ? null : theuri, theattsandnamespace[1], true);
                            parser._removeExpiredNamesapces(parser.getName());
                            this._fireEvent(SaxParser.ELM_E, nameobject.name, nameobject.prefix === "" ? null : nameobject.prefix, theuri === "" ? null : theuri, true);
                        } else if (iEvent == XMLP._TEXT) {
                            this._fireEvent(SaxParser.CHARS, parser.getContent().slice(parser.getContentBegin(), parser.getContentEnd()));
                        } else if (iEvent == XMLP._ENTITY) {
                            this._fireEvent(SaxParser.CHARS, parser.getContent(), parser.getContentBegin(), parser.getContentEnd() - parser.getContentBegin());
                        } else if (iEvent == XMLP._PI) {
                            this._fireEvent(SaxParser.PI, parser.getName(), parser.getContent().substring(parser.getContentBegin(), parser.getContentEnd()));
                        } else if (iEvent == XMLP._CDATA) {
                            this._fireEvent(SaxParser.CD_B, parser.getContent().slice(parser.getContentBegin(), parser.getContentEnd()));
                        } else if (iEvent == XMLP._COMMENT) {
                            this._fireEvent(SaxParser.CMNT, parser.getContent().slice(parser.getContentBegin(), parser.getContentEnd()));
                        } else if (iEvent == XMLP._DTD) {} else if (iEvent == XMLP._ERROR) {
                            this._fireError(parser.getContent());
                        } else if (iEvent == XMLP._INTERRUPT) {
                            this.m_interrupted = true;
                            return;
                        } else if (iEvent == XMLP._NONE) {
                            return;
                        }
                    }
                };
                var SAXStrings = function() {};
                SAXStrings.WHITESPACE = " \t\n\r";
                SAXStrings.QUOTES = "\"'";
                SAXStrings.getColumnNumber = function(strD, iP) {
                    if (SAXStrings.isEmpty(strD)) {
                        return -1;
                    }
                    iP = iP || strD.length;
                    var arrD = strD.substring(0, iP).split("\n");
                    var strLine = arrD[arrD.length - 1];
                    arrD.length--;
                    var iLinePos = arrD.join("\n").length;
                    return iP - iLinePos;
                };
                SAXStrings.getLineNumber = function(strD, iP) {
                    if (SAXStrings.isEmpty(strD)) {
                        return -1;
                    }
                    iP = iP || strD.length;
                    return strD.substring(0, iP).split("\n").length;
                };
                SAXStrings.indexOfNonWhitespace = function(strD, iB, iE) {
                    if (SAXStrings.isEmpty(strD)) {
                        return -1;
                    }
                    iB = iB || 0;
                    iE = iE || strD.length;
                    for (var i = iB; i < iE; i++) {
                        if (SAXStrings.WHITESPACE.indexOf(strD.charAt(i)) == -1) {
                            return i;
                        }
                    }
                    return -1;
                };
                SAXStrings.indexOfWhitespace = function(strD, iB, iE) {
                    if (SAXStrings.isEmpty(strD)) {
                        return -1;
                    }
                    iB = iB || 0;
                    iE = iE || strD.length;
                    for (var i = iB; i < iE; i++) {
                        if (SAXStrings.WHITESPACE.indexOf(strD.charAt(i)) != -1) {
                            return i;
                        }
                    }
                    return -1;
                };
                SAXStrings.isEmpty = function(strD) {
                    return strD == null || strD.length == 0;
                };
                SAXStrings.lastIndexOfNonWhitespace = function(strD, iB, iE) {
                    if (SAXStrings.isEmpty(strD)) {
                        return -1;
                    }
                    iB = iB || 0;
                    iE = iE || strD.length;
                    for (var i = iE - 1; i >= iB; i--) {
                        if (SAXStrings.WHITESPACE.indexOf(strD.charAt(i)) == -1) {
                            return i;
                        }
                    }
                    return -1;
                };
                SAXStrings.replace = function(strD, iB, iE, strF, strR) {
                    if (SAXStrings.isEmpty(strD)) {
                        return "";
                    }
                    iB = iB || 0;
                    iE = iE || strD.length;
                    return strD.toString().substring(iB, iE).split(strF).join(strR);
                };
                var Stack = function() {
                    this.m_arr = new Array();
                };
                Stack.prototype.clear = function() {
                    this.m_arr = new Array();
                };
                Stack.prototype.count = function() {
                    return this.m_arr.length;
                };
                Stack.prototype.destroy = function() {
                    this.m_arr = null;
                };
                Stack.prototype.peek = function() {
                    if (this.m_arr.length == 0) {
                        return null;
                    }
                    return this.m_arr[this.m_arr.length - 1];
                };
                Stack.prototype.pop = function() {
                    if (this.m_arr.length == 0) {
                        return null;
                    }
                    var o = this.m_arr[this.m_arr.length - 1];
                    this.m_arr.length--;
                    return o;
                };
                Stack.prototype.push = function(o) {
                    this.m_arr[this.m_arr.length] = o;
                };
                function isEmpty(str) {
                    return str == null || str.length == 0;
                }
                function trim(trimString, leftTrim, rightTrim) {
                    if (isEmpty(trimString)) {
                        return "";
                    }
                    if (leftTrim == null) {
                        leftTrim = true;
                    }
                    if (rightTrim == null) {
                        rightTrim = true;
                    }
                    var left = 0;
                    var right = 0;
                    var i = 0;
                    var k = 0;
                    if (leftTrim == true) {
                        while (i < trimString.length && whitespace.indexOf(trimString.charAt(i++)) != -1) {
                            left++;
                        }
                    }
                    if (rightTrim == true) {
                        k = trimString.length - 1;
                        while (k >= left && whitespace.indexOf(trimString.charAt(k--)) != -1) {
                            right++;
                        }
                    }
                    return trimString.substring(left, trimString.length - right);
                }
                function __escapeString(str) {
                    var escAmpRegEx = /&/g;
                    var escLtRegEx = /</g;
                    var escGtRegEx = />/g;
                    var quotRegEx = /"/g;
                    var aposRegEx = /'/g;
                    str = str.replace(escAmpRegEx, "&amp;");
                    str = str.replace(escLtRegEx, "&lt;");
                    str = str.replace(escGtRegEx, "&gt;");
                    str = str.replace(quotRegEx, "&quot;");
                    str = str.replace(aposRegEx, "&apos;");
                    return str;
                }
                function __unescapeString(str) {
                    var escAmpRegEx = /&amp;/g;
                    var escLtRegEx = /&lt;/g;
                    var escGtRegEx = /&gt;/g;
                    var quotRegEx = /&quot;/g;
                    var aposRegEx = /&apos;/g;
                    str = str.replace(escAmpRegEx, "&");
                    str = str.replace(escLtRegEx, "<");
                    str = str.replace(escGtRegEx, ">");
                    str = str.replace(quotRegEx, '"');
                    str = str.replace(aposRegEx, "'");
                    return str;
                }
                exports.SaxParser = SaxParser;
            })();
            __m["g"].sts = 1;
        }.bind(this)
    };
    __m["h"] = {
        sts: null,
        mod: {
            exports: {}
        },
        load: function() {
            var module = __m["h"].mod;
            var exports = module.exports;
            var require = function(name) {
                var namemap = {
                    "node-xml": "g",
                    "./http": "d",
                    "./url": "b",
                    "./assert": "e"
                };
                var k = namemap[name];
                return k ? __m.__r(k) : __m.__sr(name);
            };
            require.resolve = __m.__sr.resolve;
            __m["h"].sts = 0;
            var xmlParser = require("node-xml"), http = require("./http"), url = require("./url"), assert = require("./assert");
            var Primitives = {
                string: 1,
                boolean: 1,
                decimal: 1,
                float: 1,
                double: 1,
                anyType: 1,
                byte: 1,
                int: 1,
                long: 1,
                short: 1,
                unsignedByte: 1,
                unsignedInt: 1,
                unsignedLong: 1,
                unsignedShort: 1,
                duration: 0,
                dateTime: 0,
                time: 0,
                date: 0,
                gYearMonth: 0,
                gYear: 0,
                gMonthDay: 0,
                gDay: 0,
                gMonth: 0,
                hexBinary: 0,
                base64Binary: 0,
                anyURI: 0,
                QName: 0,
                NOTATION: 0
            };
            function splitNSName(nsName) {
                var i = nsName != null ? nsName.indexOf(":") : -1;
                return i < 0 ? {
                    namespace: null,
                    name: nsName
                } : {
                    namespace: nsName.substring(0, i),
                    name: nsName.substring(i + 1)
                };
            }
            function xmlEscape(obj) {
                if (typeof obj === "string") {
                    return obj.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
                }
                return obj;
            }
            var trimLeft = /^[\s\xA0]+/;
            var trimRight = /[\s\xA0]+$/;
            function trim(text) {
                return text.replace(trimLeft, "").replace(trimRight, "");
            }
            function extend(base, obj) {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        base[key] = obj[key];
                    }
                }
                return base;
            }
            function findKey(obj, val) {
                for (var n in obj) if (obj[n] === val) return n;
            }
            var Element = function(nsName, attrs) {
                var parts = splitNSName(nsName);
                this.nsName = nsName;
                this.namespace = parts.namespace;
                this.name = parts.name;
                this.children = [];
                this.xmlns = {};
                for (var key in attrs) {
                    var match = /^xmlns:?(.*)$/.exec(key);
                    if (match) {
                        this.xmlns[match[1]] = attrs[key];
                    } else {
                        this["$" + key] = attrs[key];
                    }
                }
            };
            Element.prototype.deleteFixedAttrs = function() {
                this.children && this.children.length === 0 && delete this.children;
                this.xmlns && Object.keys(this.xmlns).length === 0 && delete this.xmlns;
                delete this.nsName;
                delete this.namespace;
                delete this.name;
            };
            Element.prototype.allowedChildren = [];
            Element.prototype.startElement = function(stack, nsName, attrs) {
                if (!this.allowedChildren) return;
                var childClass = this.allowedChildren[splitNSName(nsName).name], element = null;
                if (childClass) {
                    stack.push(new childClass(nsName, attrs));
                } else {
                    this.unexpected(nsName);
                }
            };
            Element.prototype.endElement = function(stack, nsName) {
                if (this.nsName === nsName) {
                    if (stack.length < 2) return;
                    var parent = stack[stack.length - 2];
                    if (this !== stack[0]) {
                        extend(stack[0].xmlns, this.xmlns);
                        parent.children.push(this);
                        parent.addChild(this);
                    }
                    stack.pop();
                }
            };
            Element.prototype.addChild = function(child) {
                return;
            };
            Element.prototype.unexpected = function(name) {
                throw new Error("Found unexpected element (" + name + ") inside " + this.nsName);
            };
            Element.prototype.description = function(definitions) {
                return this.$name || this.name;
            };
            Element.prototype.init = function() {};
            Element.createSubClass = function() {
                var root = this;
                var subElement = function() {
                    root.apply(this, arguments);
                    this.init();
                };
                subElement.prototype.__proto__ = root.prototype;
                return subElement;
            };
            var ElementElement = Element.createSubClass();
            var InputElement = Element.createSubClass();
            var OutputElement = Element.createSubClass();
            var SimpleTypeElement = Element.createSubClass();
            var RestrictionElement = Element.createSubClass();
            var EnumerationElement = Element.createSubClass();
            var ComplexTypeElement = Element.createSubClass();
            var SequenceElement = Element.createSubClass();
            var AllElement = Element.createSubClass();
            var MessageElement = Element.createSubClass();
            var SchemaElement = Element.createSubClass();
            var TypesElement = Element.createSubClass();
            var OperationElement = Element.createSubClass();
            var PortTypeElement = Element.createSubClass();
            var BindingElement = Element.createSubClass();
            var PortElement = Element.createSubClass();
            var ServiceElement = Element.createSubClass();
            var DefinitionsElement = Element.createSubClass();
            var ElementTypeMap = {
                types: [ TypesElement, "schema" ],
                schema: [ SchemaElement, "element complexType simpleType include import" ],
                element: [ ElementElement, "annotation complexType" ],
                simpleType: [ SimpleTypeElement, "restriction" ],
                restriction: [ RestrictionElement, "enumeration" ],
                enumeration: [ EnumerationElement, "" ],
                complexType: [ ComplexTypeElement, "annotation sequence all" ],
                sequence: [ SequenceElement, "element" ],
                all: [ AllElement, "element" ],
                service: [ ServiceElement, "port documentation" ],
                port: [ PortElement, "address" ],
                binding: [ BindingElement, "_binding SecuritySpec operation" ],
                portType: [ PortTypeElement, "operation" ],
                message: [ MessageElement, "part documentation" ],
                operation: [ OperationElement, "documentation input output fault _operation" ],
                input: [ InputElement, "body SecuritySpecRef documentation header" ],
                output: [ OutputElement, "body SecuritySpecRef documentation header" ],
                fault: [ Element, "_fault" ],
                definitions: [ DefinitionsElement, "types message portType binding service" ]
            };
            function mapElementTypes(types) {
                var types = types.split(" ");
                var rtn = {};
                types.forEach(function(type) {
                    rtn[type.replace(/^_/, "")] = (ElementTypeMap[type] || [ Element ])[0];
                });
                return rtn;
            }
            for (var n in ElementTypeMap) {
                var v = ElementTypeMap[n];
                v[0].prototype.allowedChildren = mapElementTypes(v[1]);
            }
            MessageElement.prototype.init = function() {
                this.element = null;
                this.parts = null;
            };
            SchemaElement.prototype.init = function() {
                this.complexTypes = {};
                this.types = {};
                this.elements = {};
                this.includes = [];
            };
            TypesElement.prototype.init = function() {
                this.schemas = {};
            };
            OperationElement.prototype.init = function() {
                this.input = null;
                this.output = null;
                this.inputSoap = null;
                this.outputSoap = null;
                this.style = "";
                this.soapAction = "";
            };
            PortTypeElement.prototype.init = function() {
                this.methods = {};
            };
            BindingElement.prototype.init = function() {
                this.transport = "";
                this.style = "";
                this.methods = {};
            };
            PortElement.prototype.init = function() {
                this.location = null;
            };
            ServiceElement.prototype.init = function() {
                this.ports = {};
            };
            DefinitionsElement.prototype.init = function() {
                if (this.name !== "definitions") this.unexpected(nsName);
                this.messages = {};
                this.portTypes = {};
                this.bindings = {};
                this.services = {};
                this.schemas = {};
            };
            SchemaElement.prototype.addChild = function(child) {
                if (child.$name in Primitives) return;
                if (child.name === "include" || child.name === "import") {
                    var location = child.$schemaLocation || child.$location;
                    if (location) {
                        this.includes.push({
                            namespace: child.$namespace || child.$targetNamespace || this.$targetNamespace,
                            location: location
                        });
                    }
                } else if (child.name === "complexType") {
                    this.complexTypes[child.$name] = child;
                } else if (child.name === "element") {
                    this.elements[child.$name] = child;
                } else if (child.$name) {
                    this.types[child.$name] = child;
                }
                this.children.pop();
            };
            TypesElement.prototype.addChild = function(child) {
                assert(child instanceof SchemaElement);
                if (child.$targetNamespace) this.schemas[child.$targetNamespace] = child; else this.schemas[child.includes[0].namespace] = child;
            };
            InputElement.prototype.addChild = function(child) {
                if (child.name === "body") {
                    this.use = child.$use;
                    if (this.use === "encoded") {
                        this.encodingStyle = child.$encodingStyle;
                    }
                    this.children.pop();
                }
            };
            OutputElement.prototype.addChild = function(child) {
                if (child.name === "body") {
                    this.use = child.$use;
                    if (this.use === "encoded") {
                        this.encodingStyle = child.$encodingStyle;
                    }
                    this.children.pop();
                }
            };
            OperationElement.prototype.addChild = function(child) {
                if (child.name === "operation") {
                    this.soapAction = child.$soapAction || "";
                    this.style = child.$style || "";
                    this.children.pop();
                }
            };
            BindingElement.prototype.addChild = function(child) {
                if (child.name === "binding") {
                    this.transport = child.$transport;
                    this.style = child.$style;
                    this.children.pop();
                }
            };
            PortElement.prototype.addChild = function(child) {
                if (child.name === "address" && typeof child.$location !== "undefined") {
                    this.location = child.$location;
                }
            };
            DefinitionsElement.prototype.addChild = function(child) {
                var self = this;
                if (child instanceof TypesElement) {
                    self.schemas = child.schemas;
                } else if (child instanceof MessageElement) {
                    self.messages[child.$name] = child;
                } else if (child instanceof PortTypeElement) {
                    self.portTypes[child.$name] = child;
                } else if (child instanceof BindingElement) {
                    if (child.transport === "http://schemas.xmlsoap.org/soap/http" || child.transport === "http://www.w3.org/2003/05/soap/bindings/HTTP/") self.bindings[child.$name] = child;
                } else if (child instanceof ServiceElement) {
                    self.services[child.$name] = child;
                } else {
                    assert(false, "Invalid child type");
                }
                this.children.pop();
            };
            MessageElement.prototype.postProcess = function(definitions) {
                var part = null, child, children = this.children || [];
                for (var i in children) {
                    if ((child = children[i]).name === "part") {
                        part = child;
                        break;
                    }
                }
                if (!part) return;
                if (part.$element) {
                    delete this.parts;
                    var nsName = splitNSName(part.$element);
                    var ns = nsName.namespace;
                    this.element = definitions.schemas[definitions.xmlns[ns]].elements[nsName.name];
                    this.element.targetNSAlias = ns;
                    this.element.targetNamespace = definitions.xmlns[ns];
                    this.children.splice(0, 1);
                } else {
                    this.parts = {};
                    delete this.element;
                    for (var i = 0, part; part = this.children[i]; i++) {
                        assert(part.name === "part", "Expected part element");
                        var nsName = splitNSName(part.$type);
                        var ns = definitions.xmlns[nsName.namespace];
                        var type = nsName.name;
                        var schemaDefinition = definitions.schemas[ns];
                        if (typeof schemaDefinition !== "undefined") {
                            this.parts[part.$name] = definitions.schemas[ns].types[type] || definitions.schemas[ns].complexTypes[type];
                        } else {
                            this.parts[part.$name] = part.$type;
                        }
                        this.parts[part.$name].namespace = nsName.namespace;
                        this.parts[part.$name].xmlns = ns;
                        this.children.splice(i--, 1);
                    }
                }
                this.deleteFixedAttrs();
            };
            OperationElement.prototype.postProcess = function(definitions, tag) {
                var children = this.children;
                for (var i = 0, child; child = children[i]; i++) {
                    if (child.name !== "input" && child.name !== "output") continue;
                    if (tag === "binding") {
                        this[child.name] = child;
                        children.splice(i--, 1);
                        continue;
                    }
                    var messageName = splitNSName(child.$message).name;
                    var message = definitions.messages[messageName];
                    message.postProcess(definitions);
                    if (message.element) {
                        definitions.messages[message.element.$name] = message;
                        this[child.name] = message.element;
                    } else {
                        this[child.name] = message;
                    }
                    children.splice(i--, 1);
                }
                this.deleteFixedAttrs();
            };
            PortTypeElement.prototype.postProcess = function(definitions) {
                var children = this.children;
                if (typeof children === "undefined") return;
                for (var i = 0, child; child = children[i]; i++) {
                    if (child.name != "operation") continue;
                    child.postProcess(definitions, "portType");
                    this.methods[child.$name] = child;
                    children.splice(i--, 1);
                }
                delete this.$name;
                this.deleteFixedAttrs();
            };
            BindingElement.prototype.postProcess = function(definitions) {
                var type = splitNSName(this.$type).name, portType = definitions.portTypes[type], style = this.style, children = this.children;
                portType.postProcess(definitions);
                this.methods = portType.methods;
                for (var i = 0, child; child = children[i]; i++) {
                    if (child.name != "operation") continue;
                    child.postProcess(definitions, "binding");
                    children.splice(i--, 1);
                    child.style || (child.style = style);
                    var method = this.methods[child.$name];
                    method.style = child.style;
                    method.soapAction = child.soapAction;
                    method.inputSoap = child.input || null;
                    method.outputSoap = child.output || null;
                    method.inputSoap && method.inputSoap.deleteFixedAttrs();
                    method.outputSoap && method.outputSoap.deleteFixedAttrs();
                }
                delete this.$name;
                delete this.$type;
                this.deleteFixedAttrs();
            };
            ServiceElement.prototype.postProcess = function(definitions) {
                var children = this.children, bindings = definitions.bindings;
                for (var i = 0, child; child = children[i]; i++) {
                    if (child.name != "port") continue;
                    var bindingName = splitNSName(child.$binding).name;
                    var binding = bindings[bindingName];
                    if (binding) {
                        binding.postProcess(definitions);
                        this.ports[child.$name] = {
                            location: child.location,
                            binding: binding
                        };
                        children.splice(i--, 1);
                    }
                }
                delete this.$name;
                this.deleteFixedAttrs();
            };
            SimpleTypeElement.prototype.description = function(definitions) {
                var children = this.children;
                for (var i = 0, child; child = children[i]; i++) {
                    if (child instanceof RestrictionElement) return this.$name + "|" + child.description();
                }
                return {};
            };
            RestrictionElement.prototype.description = function() {
                var base = this.$base ? this.$base + "|" : "";
                return base + this.children.map(function(child) {
                    return child.description();
                }).join(",");
            };
            EnumerationElement.prototype.description = function() {
                return this.$value;
            };
            ComplexTypeElement.prototype.description = function(definitions) {
                var children = this.children;
                for (var i = 0, child; child = children[i]; i++) {
                    if (child instanceof SequenceElement || child instanceof AllElement) {
                        return child.description(definitions);
                    }
                }
                return {};
            };
            ElementElement.prototype.description = function(definitions) {
                var element = {}, name = this.$name, schema;
                if (this.$minOccurs !== this.$maxOccurs) {
                    name += "[]";
                }
                if (this.$type) {
                    var typeName = splitNSName(this.$type).name, ns = definitions.xmlns[splitNSName(this.$type).namespace], schema = definitions.schemas[ns], typeElement = schema && (schema.complexTypes[typeName] || schema.types[typeName]);
                    if (typeElement && !(typeName in Primitives)) {
                        element[name] = typeElement.description(definitions);
                    } else element[name] = this.$type;
                } else {
                    var children = this.children;
                    element[name] = {};
                    for (var i = 0, child; child = children[i]; i++) {
                        if (child instanceof ComplexTypeElement) element[name] = child.description(definitions);
                    }
                }
                return element;
            };
            AllElement.prototype.description = SequenceElement.prototype.description = function(definitions) {
                var children = this.children;
                var sequence = {};
                for (var i = 0, child; child = children[i]; i++) {
                    var description = child.description(definitions);
                    for (var key in description) {
                        sequence[key] = description[key];
                    }
                }
                return sequence;
            };
            MessageElement.prototype.description = function(definitions) {
                if (this.element) {
                    return this.element && this.element.description(definitions);
                }
                var desc = {};
                desc[this.$name] = this.parts;
                return desc;
            };
            PortTypeElement.prototype.description = function(definitions) {
                var methods = {};
                for (var name in this.methods) {
                    var method = this.methods[name];
                    methods[name] = method.description(definitions);
                }
                return methods;
            };
            OperationElement.prototype.description = function(definitions) {
                var inputDesc = this.input.description(definitions);
                var outputDesc = this.output.description(definitions);
                return {
                    input: inputDesc && inputDesc[Object.keys(inputDesc)[0]],
                    output: outputDesc && outputDesc[Object.keys(outputDesc)[0]]
                };
            };
            BindingElement.prototype.description = function(definitions) {
                var methods = {};
                for (var name in this.methods) {
                    var method = this.methods[name];
                    methods[name] = method.description(definitions);
                }
                return methods;
            };
            ServiceElement.prototype.description = function(definitions) {
                var ports = {};
                for (var name in this.ports) {
                    var port = this.ports[name];
                    ports[name] = port.binding.description(definitions);
                }
                return ports;
            };
            var WSDL = function(definition, uri, options) {
                var self = this, fromFunc;
                this.uri = uri;
                this.callback = function() {};
                this.options = options || {};
                if (typeof definition === "string") {
                    fromFunc = this._fromXML;
                } else if (typeof definition === "object") {
                    fromFunc = this._fromServices;
                } else {
                    throw new Error("WSDL constructor takes either an XML string or service definition");
                }
                setTimeout(function() {
                    fromFunc.call(self, definition);
                    self.processIncludes(function(err) {
                        self.definitions.deleteFixedAttrs();
                        var services = self.services = self.definitions.services;
                        if (services) {
                            for (var name in services) {
                                services[name].postProcess(self.definitions);
                            }
                        }
                        var complexTypes = self.definitions.complexTypes;
                        if (complexTypes) {
                            for (var name in complexTypes) {
                                complexTypes[name].deleteFixedAttrs();
                            }
                        }
                        var bindings = self.definitions.bindings;
                        for (var bindingName in bindings) {
                            var binding = bindings[bindingName];
                            if (binding.style !== "document") continue;
                            var methods = binding.methods;
                            var topEls = binding.topElements = {};
                            for (var methodName in methods) {
                                var inputName = methods[methodName].input.$name;
                                var outputName = methods[methodName].output.$name;
                                topEls[inputName] = {
                                    methodName: methodName,
                                    outputName: outputName
                                };
                            }
                        }
                        self.xmlnsInEnvelope = self._xmlnsMap();
                        self.callback(err, self);
                    });
                }, 0);
            };
            WSDL.prototype.onReady = function(callback) {
                if (callback) this.callback = callback;
            };
            WSDL.prototype._processNextInclude = function(includes, callback) {
                var self = this, include = includes.shift();
                if (!include) return callback();
                open_wsdl(url.resolve(self.uri, include.location), function(err, wsdl) {
                    self.definitions.schemas[include.namespace || wsdl.definitions.$targetNamespace] = wsdl.definitions;
                    self._processNextInclude(includes, function(err) {
                        callback(err);
                    });
                });
            };
            WSDL.prototype.processIncludes = function(callback) {
                var schemas = this.definitions.schemas, includes = [];
                for (var ns in schemas) {
                    var schema = schemas[ns];
                    includes = includes.concat(schema.includes || []);
                }
                this._processNextInclude(includes, callback);
            };
            WSDL.prototype.describeServices = function() {
                var services = {};
                for (var name in this.services) {
                    var service = this.services[name];
                    services[name] = service.description(this.definitions);
                }
                return services;
            };
            WSDL.prototype.toXML = function() {
                return this.xml || "";
            };
            WSDL.prototype.xmlToObject = function(xml) {
                var self = this, pHandler, p = new xmlParser.SaxParser(function(cb) {
                    pHandler = cb;
                }), objectName = null, root = {}, schema = {
                    Envelope: {
                        Header: {
                            Security: {
                                UsernameToken: {
                                    Username: "string",
                                    Password: "string"
                                }
                            }
                        },
                        Body: {
                            Fault: {
                                faultcode: "string",
                                faultstring: "string",
                                detail: "string"
                            }
                        }
                    }
                }, stack = [ {
                    name: null,
                    object: root,
                    schema: schema
                } ];
                var refs = {}, id;
                pHandler.onStartElementNS(function(nsName, attrs, prefix, uri, namespaces) {
                    nsName = prefix ? prefix + ":" + nsName : nsName;
                    var oldattrs = attrs;
                    attrs = attrs.reduce(function(res, value, index) {
                        res[value[0]] = value[1];
                        return res;
                    }, {});
                    namespaces.forEach(function(e) {
                        var nsName = e[0], nsUrl = e[1];
                        attrs["xmlns" + (nsName ? ":" : "") + nsName] = nsUrl;
                    });
                    var name = splitNSName(nsName).name, top = stack[stack.length - 1], topSchema = top.schema, obj = {};
                    var originalName = name;
                    if (!objectName && top.name === "Body" && name !== "Fault") {
                        var message = self.definitions.messages[name];
                        if (!message) {
                            var isInput = false;
                            var isOutput = false;
                            if (/Response$/.test(name)) {
                                isOutput = true;
                                name = name.replace(/Response$/, "");
                            } else if (/Request$/.test(name)) {
                                isInput = true;
                                name = name.replace(/Request$/, "");
                            } else if (/Solicit$/.test(name)) {
                                isInput = true;
                                name = name.replace(/Solicit$/, "");
                            }
                            var portTypes = self.definitions.portTypes;
                            var portTypeNames = Object.keys(portTypes);
                            var portType = portTypes[portTypeNames[0]];
                            if (isInput) name = portType.methods[name].input.$name; else name = portType.methods[name].output.$name;
                            message = self.definitions.messages[name];
                            self.definitions.messages[originalName] = self.definitions.messages[name];
                        }
                        topSchema = message.description(self.definitions);
                        objectName = originalName;
                    }
                    if (attrs.href) {
                        id = attrs.href.substr(1);
                        if (!refs[id]) refs[id] = {
                            hrefs: [],
                            obj: null
                        };
                        refs[id].hrefs.push({
                            par: top.object,
                            key: name
                        });
                    }
                    if (id = attrs.id) {
                        if (!refs[id]) refs[id] = {
                            hrefs: [],
                            obj: null
                        };
                    }
                    if (topSchema && topSchema[name + "[]"]) name = name + "[]";
                    stack.push({
                        name: originalName,
                        object: obj,
                        schema: topSchema && topSchema[name],
                        id: attrs.id
                    });
                });
                pHandler.onEndElementNS(function(nsName, prefix, uri) {
                    nsName = prefix ? prefix + ":" + nsName : nsName;
                    var cur = stack.pop(), obj = cur.object, top = stack[stack.length - 1], topObject = top.object, topSchema = top.schema, name = splitNSName(nsName).name;
                    if (topSchema && topSchema[name + "[]"] && typeof topSchema[name + "[]"] !== "string") {
                        if (!topObject[name]) topObject[name] = [];
                        topObject[name].push(obj);
                    } else if (name in topObject) {
                        if (!Array.isArray(topObject[name])) {
                            topObject[name] = [ topObject[name] ];
                        }
                        topObject[name].push(obj);
                    } else {
                        topObject[name] = obj;
                    }
                    if (cur.id) {
                        refs[cur.id].obj = obj;
                    }
                });
                pHandler.onCharacters(function(text) {
                    text = trim(text);
                    if (!text.length) return;
                    var top = stack[stack.length - 1];
                    var name = splitNSName(top.schema).name, value;
                    if (name === "int") {
                        value = parseInt(text, 10);
                    } else if (name === "dateTime") {
                        value = new Date(text);
                    } else {
                        if (typeof top.object !== "string") {
                            value = text;
                        } else {
                            value = top.object + text;
                        }
                    }
                    top.object = value;
                });
                if (p.parseString(xml)) {}
                for (var n in refs) {
                    var ref = refs[n];
                    var obj = ref.obj;
                    ref.hrefs.forEach(function(href) {
                        href.par[href.key] = obj;
                    });
                }
                var body = root.Envelope.Body;
                if (body.Fault) {}
                return root.Envelope;
            };
            WSDL.prototype.objectToDocumentXML = function(name, params, ns, xmlns) {
                var args = {};
                args[name] = params;
                return this.objectToXML(args, null, ns, xmlns);
            };
            WSDL.prototype.objectToRpcXML = function(name, params, namespace, xmlns) {
                var self = this, parts = [], defs = this.definitions, namespace = namespace || findKey(defs.xmlns, xmlns), xmlns = xmlns || defs.xmlns[namespace], nsAttrName = "_xmlns";
                parts.push([ "<", namespace, ":", name, ">" ].join(""));
                for (var key in params) {
                    if (key != nsAttrName) {
                        var value = params[key];
                        parts.push([ "<", namespace, ":", key, ">" ].join(""));
                        parts.push(typeof value === "object" ? this.objectToXML(value) : xmlEscape(value));
                        parts.push([ "</", namespace, ":", key, ">" ].join(""));
                    }
                }
                parts.push([ "</", namespace, ":", name, ">" ].join(""));
                return parts.join("");
            };
            WSDL.prototype.objectToXML = function(obj, name, namespace, xmlns) {
                var self = this, parts = [], xmlnsAttrib = false ? " xmlns:" + namespace + '="' + xmlns + '"' + ' xmlns="' + xmlns + '"' : "", ns = namespace ? namespace + ":" : "";
                if (Array.isArray(obj)) {
                    for (var i = 0, item; item = obj[i]; i++) {
                        if (i > 0) {
                            parts.push([ "</", ns, name, ">" ].join(""));
                            parts.push([ "<", ns, name, xmlnsAttrib, ">" ].join(""));
                        }
                        parts.push(self.objectToXML(item, name));
                    }
                } else if (typeof obj === "object") {
                    for (var name in obj) {
                        var child = obj[name];
                        parts.push([ "<", ns, name, xmlnsAttrib, ">" ].join(""));
                        parts.push(self.objectToXML(child, name, namespace));
                        parts.push([ "</", ns, name, ">" ].join(""));
                    }
                } else if (obj) {
                    parts.push(xmlEscape(obj));
                }
                return parts.join("");
            };
            WSDL.prototype._parse = function(xml) {
                var self = this, pHandler, p = new xmlParser.SaxParser(function(cb) {
                    pHandler = cb;
                }), stack = [], root = null;
                pHandler.onStartElementNS(function(nsName, attrs, prefix, uri, namespaces) {
                    nsName = prefix ? prefix + ":" + nsName : nsName;
                    var oldattrs = attrs;
                    attrs = attrs.reduce(function(res, value, index) {
                        res[value[0]] = value[1];
                        return res;
                    }, {});
                    namespaces.forEach(function(e) {
                        var nsName = e[0], nsUrl = e[1];
                        attrs["xmlns" + (nsName ? ":" : "") + nsName] = nsUrl;
                    });
                    var top = stack[stack.length - 1];
                    if (top) {
                        try {
                            top.startElement(stack, nsName, attrs);
                        } catch (e) {
                            if (self.options.strict) {
                                throw e;
                            } else {
                                stack.push(new Element(nsName, attrs));
                            }
                        }
                    } else {
                        var name = splitNSName(nsName).name;
                        if (name === "definitions") {
                            root = new DefinitionsElement(nsName, attrs);
                        } else if (name === "schema") {
                            root = new SchemaElement(nsName, attrs);
                        } else {
                            throw new Error("Unexpected root element of WSDL or include");
                        }
                        stack.push(root);
                    }
                });
                pHandler.onEndElementNS(function(name, prefix, uri) {
                    name = prefix ? prefix + ":" + name : name;
                    var top = stack[stack.length - 1];
                    assert(top, "Unmatched close tag: " + name);
                    top.endElement(stack, name);
                });
                pHandler.onWarning(function(msg) {
                    console.log("<WARNING>" + msg + "</WARNING>");
                });
                pHandler.onError(function(msg) {
                    console.log("<ERROR>" + JSON.stringify(msg) + "</ERROR>");
                });
                if (p.parseString(xml)) {}
                return root;
            };
            WSDL.prototype._fromXML = function(xml) {
                this.definitions = this._parse(xml);
                this.xml = xml;
            };
            WSDL.prototype._fromServices = function(services) {};
            WSDL.prototype._xmlnsMap = function() {
                var xmlns = this.definitions.xmlns;
                var str = "";
                for (var alias in xmlns) {
                    if (alias === "") continue;
                    var ns = xmlns[alias];
                    switch (ns) {
                      case "http://xml.apache.org/xml-soap":
                      case "http://schemas.xmlsoap.org/wsdl/":
                      case "http://schemas.xmlsoap.org/wsdl/soap/":
                      case "http://schemas.xmlsoap.org/soap/encoding/":
                      case "http://www.w3.org/2001/XMLSchema":
                        continue;
                    }
                    if (~ns.indexOf("http://schemas.xmlsoap.org/")) continue;
                    if (~ns.indexOf("http://www.w3.org/")) continue;
                    if (~ns.indexOf("http://xml.apache.org/")) continue;
                    str += " xmlns:" + alias + '="' + ns + '"';
                }
                return str;
            };
            function open_wsdl(uri, options, callback) {
                if (typeof options === "function") {
                    callback = options;
                    options = {};
                }
                var wsdl;
                http.request(uri, null, function(err, response, definition) {
                    if (err) {
                        callback(err);
                    } else if (response && response.statusCode == 200) {
                        wsdl = new WSDL(definition, uri, options);
                        wsdl.onReady(callback);
                    } else {
                        callback(new Error("Invalid WSDL URL: " + uri));
                    }
                });
                return wsdl;
            }
            exports.open_wsdl = open_wsdl;
            exports.WSDL = WSDL;
            __m["h"].sts = 1;
        }.bind(this)
    };
    __m["i"] = {
        sts: null,
        mod: {
            exports: {}
        },
        load: function() {
            var module = __m["i"].mod;
            var exports = module.exports;
            var require = function(name) {
                var namemap = {
                    "./client": "f",
                    "./wsdl": "h",
                    crypto: "crypto",
                    "./wsdl": "h"
                };
                var k = namemap[name];
                return k ? __m.__r(k) : __m.__sr(name);
            };
            require.resolve = __m.__sr.resolve;
            __m["i"].sts = 0;
            var Client = require("./client").Client, open_wsdl = require("./wsdl").open_wsdl, crypto = require("crypto"), WSDL = require("./wsdl").WSDL;
            var _wsdlCache = {};
            function _requestWSDL(url, options, callback) {
                if (typeof options === "function") {
                    callback = options;
                    options = {};
                }
                var wsdl = _wsdlCache[url];
                if (wsdl) {
                    callback(null, wsdl);
                } else {
                    open_wsdl(url, options, function(err, wsdl) {
                        if (err) return callback(err); else _wsdlCache[url] = wsdl;
                        callback(null, wsdl);
                    });
                }
            }
            function createClient(url, options, callback, endpoint) {
                if (typeof options === "function") {
                    endpoint = callback;
                    callback = options;
                    options = {};
                }
                endpoint = options.endpoint || endpoint;
                _requestWSDL(url, options, function(err, wsdl) {
                    callback(err, wsdl && new Client(wsdl, endpoint));
                });
            }
            function BasicAuthSecurity(username, password) {
                this._username = username;
                this._password = password;
            }
            BasicAuthSecurity.prototype.addHeaders = function(headers) {
                headers["Authorization"] = "Basic " + btoa(this._username + ":" + this._password);
            };
            BasicAuthSecurity.prototype.toXML = function() {
                return "";
            };
            function WSSecurity(username, password, passwordType) {
                this._username = username;
                this._password = password;
                this._passwordType = passwordType || "PasswordText";
            }
            var passwordDigest = function(nonce, created, password) {
                var pwHash = crypto.createHash("sha1");
                var rawNonce = btoa(nonce);
                pwHash.update(rawNonce + created + password);
                var passwordDigest = pwHash.digest("base64");
                return passwordDigest;
            };
            WSSecurity.prototype.toXML = function() {
                function getDate(d) {
                    function pad(n) {
                        return n < 10 ? "0" + n : n;
                    }
                    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
                }
                var now = new Date();
                var created = getDate(now);
                var expires = getDate(new Date(now.getTime() + 1e3 * 600));
                var nHash = crypto.createHash("sha1");
                nHash.update(created + Math.random());
                var nonce = nHash.digest("base64");
                return '<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">' + '<wsu:Timestamp wsu:Id="Timestamp-' + created + '">' + "<wsu:Created>" + created + "</wsu:Created>" + "<wsu:Expires>" + expires + "</wsu:Expires>" + "</wsu:Timestamp>" + '<wsse:UsernameToken xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" wsu:Id="SecurityToken-' + created + '">' + "<wsse:Username>" + this._username + "</wsse:Username>" + (this._passwordType === "PasswordText" ? "<wsse:Password>" + this._password + "</wsse:Password>" : '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest">' + passwordDigest(nonce, created, this._password) + "</wsse:Password>") + '<wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">' + nonce + "</wsse:Nonce>" + "<wsu:Created>" + created + "</wsu:Created>" + "</wsse:UsernameToken>" + "</wsse:Security>";
            };
            exports.BasicAuthSecurity = BasicAuthSecurity;
            exports.WSSecurity = WSSecurity;
            exports.createClient = createClient;
            exports.passwordDigest = passwordDigest;
            exports.WSDL = WSDL;
            __m["i"].sts = 1;
        }.bind(this)
    };
    __m["j"] = {
        sts: null,
        mod: {
            exports: {}
        },
        load: function() {
            var module = __m["j"].mod;
            var exports = module.exports;
            var require = function(name) {
                var namemap = {
                    "./lib/soap": "i"
                };
                var k = namemap[name];
                return k ? __m.__r(k) : __m.__sr(name);
            };
            require.resolve = __m.__sr.resolve;
            __m["j"].sts = 0;
            module.exports = require("./lib/soap");
            __m["j"].sts = 1;
        }.bind(this)
    };
    return __m.__r("j");
}, this);

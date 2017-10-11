(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, l, l.exports, e, t, n, r)
    }
    return n[o].exports
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
  1: [function(require, module, exports) {
    function EventEmitter() {
      this._events = this._events || {};
      this._maxListeners = this._maxListeners || undefined
    }
    module.exports = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.prototype.setMaxListeners = function(n) {
      if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
      this._maxListeners = n;
      return this
    };
    EventEmitter.prototype.emit = function(type) {
      var er, handler, len, args, i, listeners;
      if (!this._events) this._events = {};
      if (type === "error") {
        if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
          er = arguments[1];
          if (er instanceof Error) {
            throw er
          } else {
            var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
            err.context = er;
            throw err
          }
        }
      }
      handler = this._events[type];
      if (isUndefined(handler)) return false;
      if (isFunction(handler)) {
        switch (arguments.length) {
          case 1:
            handler.call(this);
            break;
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          default:
            args = Array.prototype.slice.call(arguments, 1);
            handler.apply(this, args)
        }
      } else if (isObject(handler)) {
        args = Array.prototype.slice.call(arguments, 1);
        listeners = handler.slice();
        len = listeners.length;
        for (i = 0; i < len; i++) listeners[i].apply(this, args)
      }
      return true
    };
    EventEmitter.prototype.addListener = function(type, listener) {
      var m;
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      if (!this._events) this._events = {};
      if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
      if (!this._events[type]) this._events[type] = listener;
      else if (isObject(this._events[type])) this._events[type].push(listener);
      else this._events[type] = [this._events[type], listener];
      if (isObject(this._events[type]) && !this._events[type].warned) {
        if (!isUndefined(this._maxListeners)) {
          m = this._maxListeners
        } else {
          m = EventEmitter.defaultMaxListeners
        }
        if (m && m > 0 && this._events[type].length > m) {
          this._events[type].warned = true;
          console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
          if (typeof console.trace === "function") {
            console.trace()
          }
        }
      }
      return this
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function(type, listener) {
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      var fired = false;

      function g() {
        this.removeListener(type, g);
        if (!fired) {
          fired = true;
          listener.apply(this, arguments)
        }
      }
      g.listener = listener;
      this.on(type, g);
      return this
    };
    EventEmitter.prototype.removeListener = function(type, listener) {
      var list, position, length, i;
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      if (!this._events || !this._events[type]) return this;
      list = this._events[type];
      length = list.length;
      position = -1;
      if (list === listener || isFunction(list.listener) && list.listener === listener) {
        delete this._events[type];
        if (this._events.removeListener) this.emit("removeListener", type, listener)
      } else if (isObject(list)) {
        for (i = length; i-- > 0;) {
          if (list[i] === listener || list[i].listener && list[i].listener === listener) {
            position = i;
            break
          }
        }
        if (position < 0) return this;
        if (list.length === 1) {
          list.length = 0;
          delete this._events[type]
        } else {
          list.splice(position, 1)
        }
        if (this._events.removeListener) this.emit("removeListener", type, listener)
      }
      return this
    };
    EventEmitter.prototype.removeAllListeners = function(type) {
      var key, listeners;
      if (!this._events) return this;
      if (!this._events.removeListener) {
        if (arguments.length === 0) this._events = {};
        else if (this._events[type]) delete this._events[type];
        return this
      }
      if (arguments.length === 0) {
        for (key in this._events) {
          if (key === "removeListener") continue;
          this.removeAllListeners(key)
        }
        this.removeAllListeners("removeListener");
        this._events = {};
        return this
      }
      listeners = this._events[type];
      if (isFunction(listeners)) {
        this.removeListener(type, listeners)
      } else if (listeners) {
        while (listeners.length) this.removeListener(type, listeners[listeners.length - 1])
      }
      delete this._events[type];
      return this
    };
    EventEmitter.prototype.listeners = function(type) {
      var ret;
      if (!this._events || !this._events[type]) ret = [];
      else if (isFunction(this._events[type])) ret = [this._events[type]];
      else ret = this._events[type].slice();
      return ret
    };
    EventEmitter.prototype.listenerCount = function(type) {
      if (this._events) {
        var evlistener = this._events[type];
        if (isFunction(evlistener)) return 1;
        else if (evlistener) return evlistener.length
      }
      return 0
    };
    EventEmitter.listenerCount = function(emitter, type) {
      return emitter.listenerCount(type)
    };

    function isFunction(arg) {
      return typeof arg === "function"
    }

    function isNumber(arg) {
      return typeof arg === "number"
    }

    function isObject(arg) {
      return typeof arg === "object" && arg !== null
    }

    function isUndefined(arg) {
      return arg === void 0
    }
  }, {}],
  2: [function(require, module, exports) {
    "use strict";

    function __export(m) {
      for (var p in m)
        if (!exports.hasOwnProperty(p)) exports[p] = m[p]
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    __export(require("./lib/IxUxSecureClient"))
  }, {
    "./lib/IxUxSecureClient": 3
  }],
  3: [function(require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Utils = require("./utils");
    var events_1 = require("events");
    var SECURE_LOCATION = "/secure.html";
    var SECURE_ORIGIN = Utils.determineOrigin(SECURE_LOCATION) || "";
    var FRAME_ID_PREFIX = "__ix_uxsec_";
    var CSS_CLASS_PREFIX = "__ix-uxsec-";
    var NOOP = function() {};
    var apiKey;
    var frames = {};
    var forms = {};
    var spans = {};
    var requests = {};
    var pendingFonts;
    var commonOptions;
    var SecureClient = {
      init: function(publicApiKey, options) {
        if (!publicApiKey || typeof publicApiKey !== "string") {
          throw new Error("Public API key required and should be a string")
        }
        if (apiKey) {
          throw new Error("UX security already initialised. You can only initialise once")
        }
        options = Utils.copyProperties(options, ["fonts"]);
        apiKey = publicApiKey;
        action("INIT", {
          apiKey: apiKey
        }, NOOP, function(e) {
          throw e
        });
        var fonts = options.fonts || [];
        var fontsNoCssSrc = fonts.filter(function(font) {
          return !font["cssSrc"] || typeof font["cssSrc"] != "string"
        });
        var fontsWithCssSrc = fonts.filter(function(font) {
          return font["cssSrc"] && typeof font["cssSrc"] == "string"
        });
        commonOptions = Utils.assign({}, options, {
          fonts: fontsNoCssSrc || []
        });
        if (fontsWithCssSrc.length) {
          action("FETCH_FONT", fontsWithCssSrc, function(fonts) {
            if (fonts.length) {
              commonOptions.fonts = commonOptions.fonts.concat(fonts);
              sendOrQueueFrameMessage(rootFrame, {
                action: "ix-uxsec-ready",
                payload: {}
              })
            }
          }, function(e) {
            window.console && console.error(e.message);
            sendOrQueueFrameMessage(rootFrame, {
              action: "ix-uxsec-ready",
              payload: {}
            })
          })
        } else {
          sendOrQueueFrameMessage(rootFrame, {
            action: "ix-uxsec-ready",
            payload: {}
          })
        }
      },
      associate: function(authToken, resolve, reject) {
        if (!apiKey) {
          throw new Error("UX security not initialised. call init(apikey)")
        }
        if (authToken && typeof authToken !== "string") {
          throw new Error("associate requires string authToken")
        }
        action("ASSOCIATE", {
          authToken: authToken
        }, resolve, reject)
      },
      form: function() {
        if (!apiKey) {
          throw new Error("UX security not initialised. call init(apikey)")
        }
        return new SecureForm
      },
      span: function(path, token, options) {
        if (!apiKey) {
          throw new Error("UX security not initialised. call init(apikey)")
        }
        if (!path || typeof path !== "string") {
          throw new Error("Span requires string path")
        }
        if (!token || typeof token !== "string") {
          throw new Error("Span requires string token")
        }
        options = Utils.copyProperties(options, ["className", "style"]);
        var span = createSpan(path, token, Utils.assign({}, options, commonOptions, {
          wait: !!pendingFonts
        }));
        spans[span.id] = span;
        span.eventEmitter.on("destroy", function() {
          delete spans[span.id]
        });
        return new SecureSpan(span.id)
      }
    };

    function action(type, data, resolve, reject) {
      var nonce = Utils.nextId(type);
      requests[nonce] = {
        resolve: resolve,
        reject: reject
      };
      sendOrQueueFrameMessage(rootFrame, {
        action: "ix-uxsec-root-action",
        payload: {
          type: type,
          nonce: nonce,
          data: data || {}
        }
      })
    }

    function report(event, data) {
      sendOrQueueFrameMessage(rootFrame, {
        action: "ix-uxsec-root-report",
        payload: {
          event: event,
          data: data || {}
        }
      })
    }
    var SecureForm = function() {
      function SecureForm() {
        this._id = Utils.nextId("form");
        forms[this._id] = {}
      }
      SecureForm.prototype.input = function(name, path, options) {
        var _this = this;
        if (!name || typeof name !== "string") {
          throw new Error("Input requires string name")
        }
        if (!path || typeof path !== "string") {
          throw new Error("Input requires string path")
        }
        if (forms[this._id][path]) {
          throw new Error("Input with path " + path + " already created for this form")
        }
        options = Utils.copyProperties(options, ["classNames", "placeholder", "style"]);
        var input = createInput(this._id, path, Utils.assign({}, options, commonOptions, {
          formId: this._id,
          name: name,
          wait: !!pendingFonts
        }));
        forms[this._id][path] = input;
        input.eventEmitter.on("destroy", function() {
          delete forms[_this._id][path]
        });
        return new SecureInput(this, path)
      };
      SecureForm.prototype.tokenize = function(resolve, reject) {
        action("TOKENIZE", {
          formId: this._id
        }, resolve, reject)
      };
      SecureForm.prototype.destroy = function() {
        if (Object.keys(forms[this._id]).length) {
          throw new Error("Destroy inputs before destroying form")
        }
        delete forms[this._id];
        return this
      };
      return SecureForm
    }();
    exports.SecureForm = SecureForm;

    function createFrame(id, type, path, options) {
      var origin = Utils.determineOrigin(window.location.toString()) || "";
      var queryString = Utils.urlEncodeQueryString(Utils.assign({}, options, {
        type: type,
        path: path,
        origin: origin
      }));
      var iframe = document.createElement("iframe");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowTransparency", "true");
      iframe.setAttribute("scrolling", "no");
      iframe.setAttribute("name", id);
      iframe.src = SECURE_LOCATION + "#" + queryString;
      var eventEmitter = new events_1.EventEmitter;
      eventEmitter.setMaxListeners(0);
      var frame = {
        id: id,
        loaded: false,
        queuedMessages: [],
        iframe: iframe,
        eventEmitter: eventEmitter
      };
      eventEmitter.on("load", function() {
        frame.loaded = true;
        ensureFrameMounted(frame);
        if (frame.loaded) {
          frame.queuedMessages.forEach(function(message) {
            return sendOrQueueFrameMessage(frame, message)
          });
          frame.queuedMessages = []
        }
      });
      return frame
    }

    function ensureFrameMounted(frame) {
      isFrameMounted(frame) || unmountFrame(frame)
    }

    function appendFrameTo(frame, el) {
      el.appendChild(frame.iframe)
    }

    function unmountFrame(frame) {
      frame.loaded = false;
      frame.eventEmitter.emit("unload")
    }

    function isFrameMounted(frame) {
      return !!document.body && document.body.contains(frame.iframe)
    }

    function handle(message) {
      switch (message.action) {
        case "ix-uxsec-element-event":
          var frame = frames[message.id];
          frame && frame.eventEmitter.emit(message.payload.event, message.payload.data);
          break;
        case "ix-uxsec-element-error":
          throw new Error(message.payload.error);
        case "ix-uxsec-root-load":
          rootFrame.eventEmitter.emit("load");
          Object.keys(frames).forEach(function(key) {
            return sendOrQueueFrameMessage(frames[key], {
              action: "ix-uxsec-root-load",
              payload: {}
            })
          });
          break;
        case "ix-uxsec-root-action-complete":
          var crequest = requests[message.payload.nonce];
          if (crequest) {
            delete requests[message.payload.nonce];
            crequest.resolve && crequest.resolve(message.payload.result)
          }
          break;
        case "ix-uxsec-root-action-error":
          var erequest = requests[message.payload.nonce];
          if (erequest) {
            delete requests[message.payload.nonce];
            erequest.reject && erequest.reject(new Error(message.payload.error))
          }
          break
      }
    }

    function sendOrQueueFrameMessage(frame, message) {
      ensureFrameMounted(frame);
      if (frame.loaded) {
        var origin = SECURE_ORIGIN;
        frame.iframe.contentWindow.postMessage(JSON.stringify(Utils.assign({}, message, {
          id: frame.id,
          __ixSecV1: true
        })), origin)
      } else {
        frame.queuedMessages.push(message)
      }
    }

    function parseReceivedFrameMessage(message) {
      try {
        var parsed = typeof message === "string" ? JSON.parse(message) : message;
        return parsed.__ixSecV1 ? Utils.copyProperties(parsed, ["id", "action", "payload"]) : null
      } catch (e) {
        return null
      }
    }
    var ROOT_FRAME_STYLE = {
      border: "none",
      margin: "0",
      padding: "0",
      width: "1px",
      "min-width": "100%",
      overflow: "hidden",
      display: "block",
      visibility: "hidden",
      position: "fixed",
      height: "1px",
      "pointer-events": "none"
    };

    function createRootFrame() {
      var frame = createFrame(FRAME_ID_PREFIX + "root", "root", "root");
      frame.iframe.setAttribute("aria-hidden", "true");
      frame.iframe.setAttribute("tabIndex", "-1");
      applyStyleImportant(frame.iframe, ROOT_FRAME_STYLE);
      if (document.readyState === "complete") {
        ensureRootFrameMounted()
      } else {
        document.addEventListener("DOMContentLoaded", ensureRootFrameMounted);
        window.addEventListener("load", ensureRootFrameMounted)
      }
      window.addEventListener("message", function(message) {
        var parsed = parseReceivedFrameMessage(message.data);
        parsed && Utils.compareOrigins(SECURE_ORIGIN, message.origin) && handle(parsed)
      });
      return frame
    }

    function ensureRootFrameMounted() {
      ensureFrameMounted(rootFrame);
      if (!isFrameMounted(rootFrame)) {
        if (document.body) {
          appendFrameTo(rootFrame, document.body)
        } else if ("complete" === document.readyState || "interactive" === document.readyState) {
          throw new Error("No <body> element found.")
        }
      }
    }

    function setupElementFrame(frame) {
      frame.eventEmitter.on("unload", function() {
        sendOrQueueFrameMessage(rootFrame, {
          action: "ix-uxsec-frame-unload",
          payload: {
            frameId: frame.id
          }
        })
      });
      frame.eventEmitter.on("load", function() {
        sendOrQueueFrameMessage(rootFrame, {
          action: "ix-uxsec-frame-load",
          payload: {
            frameId: frame.id
          }
        });
        rootFrame.loaded && sendOrQueueFrameMessage(frame, {
          action: "ix-uxsec-root-load",
          payload: {}
        })
      });
      return frame
    }
    var ELEMENT_FRAME_STYLE = {
      border: "none",
      margin: "0",
      padding: "0",
      width: "1px",
      "min-width": "100%",
      overflow: "hidden",
      display: "block"
    };

    function createElementFrame(type, path, options) {
      var id = Utils.nextId(FRAME_ID_PREFIX);
      var bodyStyle = document.body && window.getComputedStyle(document.body);
      var rtl = !!bodyStyle && bodyStyle.getPropertyValue("direction") === "rtl";
      var frame = createFrame(id, type, path, Utils.assign({
        rtl: rtl
      }, options));
      frame.iframe.setAttribute("title", "Secure " + type + " frame");
      applyStyleImportant(frame.iframe, ELEMENT_FRAME_STYLE);
      frames[id] = frame;
      return frame
    }

    function updateElementFrame(frame, payload) {
      sendOrQueueFrameMessage(frame, {
        action: "ix-uxsec-update",
        payload: payload
      })
    }

    function updateElementFrameStyle(frame, style) {
      Object.keys(style).forEach(function(key) {
        return frame.iframe.style[key] = style[key]
      })
    }

    function focusElementFrame(frame) {
      frame.loaded && sendOrQueueFrameMessage(frame, {
        action: "ix-uxsec-focus",
        payload: {}
      })
    }

    function blurElementFrame(frame) {
      if (frame.loaded) {
        frame.iframe.contentWindow.blur();
        frame.iframe.blur()
      }
    }

    function clearElementFrame(frame) {
      sendOrQueueFrameMessage(frame, {
        action: "ix-uxsec-clear",
        payload: {}
      })
    }
    var ELEMENT_DIV_STYLE = {
      margin: "0",
      padding: "0",
      border: "none",
      display: "block",
      background: "transparent",
      position: "relative",
      opacity: "1"
    };

    function checkElementDestroyed(elem) {
      if (elem.destroyed) {
        throw new Error("Element already destroyed")
      }
    }

    function isElementMounted(elem) {
      return !!document.body && document.body.contains(elem.component)
    }

    function determineElementContainer(elem, el) {
      checkElementDestroyed(elem);
      if (!el) {
        throw new Error("Either element or xpath required")
      }
      var container;
      if (typeof el == "string") {
        var matches = document.querySelectorAll(el);
        if (matches.length > 1) {
          window.console && console.warn("Found " + matches.length + " matches - using first")
        } else if (!matches.length) {
          throw new Error("Found 0 matches")
        }
        container = matches[0]
      } else {
        if (!el.appendChild) {
          throw new Error("Either element or xpath required")
        }
        container = el
      }
      if ("INPUT" === container.nodeName) {
        throw new Error("Can only mount in elements that can contain child elements e.g. div")
      }
      if (container.children.length) {
        window.console && console.warn("Mounted to an element that contains child nodes which will be removed")
      }
      return container
    }

    function registerElementDimensionsListener(elem) {
      elem.frame.eventEmitter.on("dimensions", function(event) {
        if (elem.parent) {
          var parentStyle = window.getComputedStyle(elem.parent);
          if (parentStyle) {
            var height = parseFloat(parentStyle.getPropertyValue("height"));
            if ("border-box" === parentStyle.getPropertyValue("box-sizing")) {
              var paddingTop = parseFloat(parentStyle.getPropertyValue("padding-top"));
              var paddingBottom = parseFloat(parentStyle.getPropertyValue("padding-bottom"));
              var borderTop = parseFloat(parentStyle.getPropertyValue("border-top"));
              var borderBottom = parseFloat(parentStyle.getPropertyValue("border-bottom"));
              height = height - borderTop - borderBottom - paddingTop - paddingBottom
            }
            if (height !== 0 && parseFloatFixed(height) < parseFloatFixed(event.height)) {
              report("wrapper_height_mismatch", {
                height: event.height,
                outer_height: height
              })
            }
            var componentheight = elem.component.getBoundingClientRect().height;
            if (componentheight !== 0 && event.height !== 0 && parseFloatFixed(componentheight) !== parseFloatFixed(event.height)) {
              updateElementFrameStyle(elem.frame, {
                height: event.height + "px"
              });
              report("iframe_height_update", {
                height: event.height,
                calculated_height: componentheight
              })
            }
          }
        }
      })
    }

    function updateElementFrameHeight(elem, style, force) {
      style = style || {};
      var height = typeof style.height == "string" && style.height;
      var lineHeight = typeof style.lineHeight == "string" && style.lineHeight;
      var fontSize = typeof style.fontSize == "string" && style.fontSize;
      if (force || height || lineHeight || fontSize) {
        var determinedHeight = height || Utils.determineHeight(lineHeight || elem.lastHeight, fontSize || elem.lastFontSize);
        updateElementFrameStyle(elem.frame, {
          height: determinedHeight
        });
        elem.lastFontSize = fontSize || elem.lastFontSize;
        elem.lastHeight = lineHeight || elem.lastHeight
      }
    }

    function mountElementTo(elem, el) {
      var elStyle = window.getComputedStyle(el);
      var rtl = !!elStyle && "rtl" === elStyle.getPropertyValue("direction");
      elem.parent = el;
      while (el.firstChild) {
        el.removeChild(el.firstChild)
      }
      el.appendChild(elem.component);
      sendOrQueueFrameMessage(elem.frame, {
        action: "ix-uxsec-mount",
        payload: {
          rtl: rtl
        }
      })
    }
    var INPUT_DEFAULT_CSS_CLASS_NAMES = {
      base: "ix-uxsec-input",
      focus: "ix-uxsec-input--focus",
      valid: "ix-uxsec-input--valid",
      invalid: "ix-uxsec-input--invalid",
      empty: "ix-uxsec-input--empty",
      autofill: "ix-uxsec-input--autofill"
    };
    var ELEMENT_INPUT_STYLE = {
      border: "none",
      display: "block",
      position: "absolute",
      height: "1px",
      top: "0",
      left: "0",
      padding: "0",
      margin: "0",
      width: "100%",
      opacity: "0",
      background: "transparent",
      pointerEvents: "none"
    };

    function setupInputFrame(frame, formId) {
      sendOrQueueFrameMessage(rootFrame, {
        action: "ix-uxsec-newinput",
        payload: {
          frameId: frame.id,
          formId: formId
        }
      });
      setupElementFrame(frame)
    }

    function createInput(formId, path, options) {
      var input = {
        formId: formId,
        path: path,
        eventEmitter: new events_1.EventEmitter,
        classes: Utils.assign({}, INPUT_DEFAULT_CSS_CLASS_NAMES),
        destroyed: false,
        focused: false,
        empty: true,
        invalid: false,
        valid: false,
        autofilled: false
      };
      input.eventEmitter.setMaxListeners(0);
      input.eventEmitter.on("submit", inputFormSubmit.bind(null, input));
      input.focusListener = focusInput.bind(null, input);
      var div = document.createElement("div");
      div.className = CSS_CLASS_PREFIX + "input";
      var fakeInput = document.createElement("input");
      fakeInput.type = "text";
      fakeInput.className = CSS_CLASS_PREFIX + "input__fake";
      applyStyleImportant(div, ELEMENT_DIV_STYLE);
      applyStyleImportant(fakeInput, ELEMENT_INPUT_STYLE);
      fakeInput.setAttribute("aria-hidden", "true");
      fakeInput.disabled = true;
      var frame = createElementFrame("input", path, options);
      setupInputFrame(frame, formId);
      frame.eventEmitter.on("load", function() {
        return fakeInput.disabled = false
      });
      fakeInput.addEventListener("focus", function() {
        return focusElementFrame(frame)
      });
      appendFrameTo(frame, div);
      div.appendChild(fakeInput);
      input.component = div;
      input.fakeInput = fakeInput;
      input.frame = frame;
      input.frame.eventEmitter.on("redirectfocus", function(event) {
        var focusTarget = findFocusTarget(input.component, event.focusDirection);
        focusTarget && focusTarget.focus()
      });
      input.frame.eventEmitter.on("focus", function() {
        input.focused = true;
        updateInputClasses(input);
        input.eventEmitter.emit("focus")
      });
      input.frame.eventEmitter.on("blur", function() {
        input.focused = false;
        updateInputClasses(input);
        input.eventEmitter.emit("blur")
      });
      input.frame.eventEmitter.on("keyup", function(event) {
        input.eventEmitter.emit("keyup", {
          key: event.key,
          preventDefault: function() {}
        })
      });
      input.frame.eventEmitter.on("ready", function() {
        input.eventEmitter.emit("ready")
      });
      input.frame.eventEmitter.on("change", function(event) {
        input.eventEmitter.emit("change", {
          error: event.error,
          empty: event.empty,
          valid: event.valid,
          extra: event.extra
        });
        input.empty = event.empty;
        input.invalid = !!event.error;
        input.valid = event.valid;
        updateInputClasses(input)
      });
      registerElementDimensionsListener(input);
      input.frame.eventEmitter.on("autofill", function() {
        if (input.parent) {
          var parentBgColor = input.parent.style.backgroundColor;
          var isDefaultAutofillColor = parentBgColor === "#faffbd" || parentBgColor === "rgb(250, 255, 189)";
          input.lastBackgroundColor = isDefaultAutofillColor ? input.lastBackgroundColor : parentBgColor;
          input.parent.style.backgroundColor = "#faffbd";
          input.autofilled = true;
          updateInputClasses(input)
        }
      });
      input.frame.eventEmitter.on("autofill-cleared", function() {
        input.autofilled = false;
        input.parent && (input.parent.style.backgroundColor = input.lastBackgroundColor || "");
        updateInputClasses(input)
      });
      updateInputFrameHeight(input, options, true);
      changeInputClasses(input, options.classNames);
      return input
    }

    function inputFormSubmit(input) {
      var form = input.component.parentElement;
      while (form && form.nodeName !== "FORM") {
        form = form.parentElement
      }
      if (form) {
        var event_1 = document.createEvent("Event");
        event_1.initEvent("submit", true, true);
        form.dispatchEvent(event_1)
      }
    }

    function mountInputTo(input, el) {
      mountElementTo(input, el);
      findPossibleInputLabel(input);
      updateInputClasses(input)
    }

    function updateInputClasses(input) {
      input.parent && Utils.applyClasses(input.parent, [
        [input.classes.base, true],
        [input.classes.empty, input.empty],
        [input.classes.focus, input.focused],
        [input.classes.valid, input.valid],
        [input.classes.invalid, input.invalid],
        [input.classes.autofill, input.autofilled]
      ])
    }

    function removeInputClasses(input) {
      input.parent && Utils.applyClasses(input.parent, [
        [input.classes.base, false],
        [input.classes.empty, false],
        [input.classes.focus, false],
        [input.classes.valid, false],
        [input.classes.invalid, false],
        [input.classes.autofill, false]
      ])
    }

    function findPossibleInputLabel(input) {
      if (input.parent) {
        var parentId = input.parent.getAttribute("id");
        var label = void 0;
        if (parentId) {
          label = document.querySelector("label[for=" + parentId + "]")
        }
        if (label) {
          input.parent.addEventListener("click", input.focusListener)
        } else {
          label = input.parent.parentElement;
          while (label && label.nodeName !== "LABEL") {
            label = label.parentElement
          }
          if (label) {
            input.label = label;
            label.addEventListener("click", input.focusListener)
          } else {
            input.parent.addEventListener("click", input.focusListener)
          }
        }
      }
    }

    function changeInputClasses(input, classNames) {
      if (classNames) {
        var parsed_1 = {};
        Object.keys(classNames).forEach(function(cl) {
          if (!INPUT_DEFAULT_CSS_CLASS_NAMES[cl]) {
            throw new Error(cl + " is not in " + Object.keys(INPUT_DEFAULT_CSS_CLASS_NAMES).join(", "))
          }
          parsed_1[cl] = classNames[cl]
        });
        input.classes = Utils.assign({}, input.classes, parsed_1)
      }
    }

    function updateInputFrameHeight(input, options, force) {
      updateElementFrameHeight(input, options && options.style && options.style.base, force)
    }

    function mountInput(input, el) {
      var container = determineElementContainer(input, el);
      if (container === input.component.parentElement) {
        if (!isElementMounted(input)) {
          unmountInput(input);
          mountInputTo(input, container)
        }
      } else if (input.component.parentElement) {
        if (!isElementMounted(input)) {
          unmountInput(input);
          mountInputTo(input, container)
        } else {
          throw new Error("Already mounted - unmount() before re-mounting.")
        }
      } else {
        mountInputTo(input, container)
      }
    }

    function updateInput(input, options) {
      checkElementDestroyed(input);
      if (options) {
        changeInputClasses(input, options && options.classNames);
        updateInputFrameHeight(input, options);
        var updateInFrame = Utils.copyPropertiesExcept(options, ["classNames"]);
        Object.keys(updateInFrame).length && updateElementFrame(input.frame, updateInFrame)
      }
    }

    function focusInput(input) {
      checkElementDestroyed(input);
      event && event.preventDefault();
      focusElementFrame(input.frame)
    }

    function blurInput(input) {
      checkElementDestroyed(input);
      blurElementFrame(input.frame);
      input.fakeInput.blur()
    }

    function clearInput(input) {
      checkElementDestroyed(input);
      clearElementFrame(input.frame)
    }

    function unmountInput(input) {
      checkElementDestroyed(input);
      var parent = input.component.parentElement;
      if (parent) {
        parent.removeChild(input.component);
        parent.removeEventListener("click", input.focusListener);
        removeInputClasses(input)
      }
      input.parent = null;
      if (input.label) {
        input.label.removeEventListener("click", input.focusListener);
        input.label = null
      }
      input.fakeInput.disabled = true;
      unmountFrame(input.frame)
    }

    function destroyInput(input) {
      unmountInput(input);
      input.destroyed = true;
      input.eventEmitter.emit("destroy")
    }
    var SecureInput = function() {
      function SecureInput(form, path) {
        this._form = form;
        this._path = path
      }
      SecureInput.prototype.update = function(options) {
        options = Utils.copyProperties(options, ["classNames", "placeholder", "style"]);
        var input = forms[this._form._id][this._path];
        updateInput(input);
        return this
      };
      SecureInput.prototype.focus = function(event) {
        var input = forms[this._form._id][this._path];
        focusInput(input);
        return this
      };
      SecureInput.prototype.blur = function() {
        var input = forms[this._form._id][this._path];
        blurInput(input);
        return this
      };
      SecureInput.prototype.mount = function(el) {
        var input = forms[this._form._id][this._path];
        mountInput(input, el);
        return this
      };
      SecureInput.prototype.clear = function() {
        var input = forms[this._form._id][this._path];
        clearInput(input);
        return this
      };
      SecureInput.prototype.unmount = function() {
        var input = forms[this._form._id][this._path];
        unmountInput(input);
        return this
      };
      SecureInput.prototype.destroy = function() {
        var input = forms[this._form._id][this._path];
        destroyInput(input);
        return this
      };
      SecureInput.prototype.addListener = function(event, listener) {
        var input = forms[this._form._id][this._path];
        input.eventEmitter.addListener(event, listener);
        return this
      };
      SecureInput.prototype.on = function(event, listener) {
        return this.addListener(event, listener)
      };
      SecureInput.prototype.removeListener = function(event, listener) {
        var input = forms[this._form._id][this._path];
        input.eventEmitter.removeListener(event, listener);
        return this
      };
      SecureInput.prototype.off = function(event, listener) {
        return this.removeListener(event, listener)
      };
      SecureInput.prototype.removeAllListeners = function(event) {
        var input = forms[this._form._id][this._path];
        input.eventEmitter.removeAllListeners(event);
        return this
      };
      return SecureInput
    }();
    exports.SecureInput = SecureInput;
    var SPAN_DEFAULT_CSS_CLASS_NAME = "ix-uxsec-span";

    function setupSpanFrame(frame, path, token) {
      sendOrQueueFrameMessage(rootFrame, {
        action: "ix-uxsec-newspan",
        payload: {
          frameId: frame.id,
          path: path,
          token: token
        }
      });
      setupElementFrame(frame)
    }

    function createSpan(path, token, options) {
      var span = {
        id: Utils.nextId("span"),
        path: path,
        eventEmitter: new events_1.EventEmitter,
        className: SPAN_DEFAULT_CSS_CLASS_NAME,
        destroyed: false
      };
      span.eventEmitter.setMaxListeners(0);
      var div = document.createElement("div");
      div.className = CSS_CLASS_PREFIX + "span";
      applyStyleImportant(div, ELEMENT_DIV_STYLE);
      var frame = createElementFrame("span", path, options);
      setupSpanFrame(frame, path, token);
      appendFrameTo(frame, div);
      span.component = div;
      span.frame = frame;
      registerElementDimensionsListener(span);
      updateElementFrameHeight(span, options.style, true);
      changeSpanClass(span, options.className);
      return span
    }

    function mountSpanTo(span, el) {
      mountElementTo(span, el);
      updateSpanClass(span)
    }

    function updateSpanClass(span) {
      span.parent && Utils.applyClasses(span.parent, [
        [span.className, true]
      ])
    }

    function removeSpanClass(span) {
      span.parent && Utils.applyClasses(span.parent, [
        [span.className, false]
      ])
    }

    function changeSpanClass(span, className) {
      if (className) {
        span.className = className
      }
    }

    function mountSpan(span, el) {
      var container = determineElementContainer(span, el);
      if (container === span.component.parentElement) {
        if (!isElementMounted(span)) {
          unmountSpan(span);
          mountSpanTo(span, container)
        }
      } else if (span.component.parentElement) {
        if (!isElementMounted(span)) {
          unmountSpan(span);
          mountSpanTo(span, container)
        } else {
          throw new Error("Already mounted - unmount() before re-mounting")
        }
      } else {
        mountSpanTo(span, container)
      }
    }

    function updateSpan(span, options) {
      checkElementDestroyed(span);
      if (options) {
        changeSpanClass(span, options && options.className);
        updateElementFrameHeight(span, options.style);
        var updateInFrame = Utils.copyPropertiesExcept(options, ["className"]);
        Object.keys(updateInFrame).length && updateElementFrame(span.frame, updateInFrame)
      }
    }

    function unmountSpan(span) {
      checkElementDestroyed(span);
      var parent = span.component.parentElement;
      if (parent) {
        parent.removeChild(span.component);
        removeSpanClass(span)
      }
      span.parent = null;
      unmountFrame(span.frame)
    }

    function destroySpan(span) {
      unmountSpan(span);
      span.destroyed = true;
      span.eventEmitter.emit("destroy")
    }
    var SecureSpan = function() {
      function SecureSpan(id) {
        this._id = id
      }
      SecureSpan.prototype.update = function(options) {
        var span = spans[this._id];
        updateSpan(span);
        return this
      };
      SecureSpan.prototype.mount = function(el) {
        var span = spans[this._id];
        mountSpan(span, el);
        return this
      };
      SecureSpan.prototype.unmount = function() {
        var span = spans[this._id];
        unmountSpan(span);
        return this
      };
      SecureSpan.prototype.destroy = function() {
        var span = spans[this._id];
        destroySpan(span);
        return this
      };
      SecureSpan.prototype.addListener = function(event, listener) {
        var span = spans[this._id];
        span.eventEmitter.addListener(event, listener);
        return this
      };
      SecureSpan.prototype.on = function(event, listener) {
        return this.addListener(event, listener)
      };
      SecureSpan.prototype.removeListener = function(event, listener) {
        var span = spans[this._id];
        span.eventEmitter.removeListener(event, listener);
        return this
      };
      SecureSpan.prototype.off = function(event, listener) {
        return this.removeListener(event, listener)
      };
      SecureSpan.prototype.removeAllListeners = function(event) {
        var span = spans[this._id];
        span.eventEmitter.removeAllListeners(event);
        return this
      };
      return SecureSpan
    }();
    exports.SecureSpan = SecureSpan;

    function findFocusTarget(element, direction) {
      var enabledFocusable = Array.prototype.slice.call(document.querySelectorAll("a[href], area[href], input:not([disabled]),\n  select:not([disabled]), textarea:not([disabled]), button:not([disabled]),\n  object, embed, *[tabindex], *[contenteditable]"));
      var elementsInTabOrder = [];
      enabledFocusable.forEach(function(el) {
        var tabIndex = el.getAttribute("tabindex");
        var posOrNoTabIndex = !tabIndex || parseInt(tabIndex, 10) >= 0;
        var rect = el.getBoundingClientRect();
        var hasSize = rect.width > 0 && rect.height > 0;
        if (posOrNoTabIndex && hasSize) {
          elementsInTabOrder.push(el)
        }
      });
      var index = -1;
      for (var i = 0; i < elementsInTabOrder.length; i++) {
        if (elementsInTabOrder[i] === element || element.contains(elementsInTabOrder[i])) {
          index = i;
          break
        }
      }
      return elementsInTabOrder[index + ("previous" === direction ? -1 : 1)]
    }

    function applyStyleImportant(element, style) {
      element.style.cssText = Object.keys(style).map(function(key) {
        return key + ": " + style[key] + " !important;"
      }).join(" ")
    }

    function parseFloatFixed(value) {
      return parseFloat(value.toFixed(1))
    }
    var rootFrame = createRootFrame();
    var protocol = window.location.protocol;
    var isHttpsOrFile = ["https:", "file:"].indexOf(protocol) !== -1;
    var isLocal = ["localhost", "127.0.0.1", "0.0.0.0"].indexOf(window.location.hostname) !== -1;
    if (!isHttpsOrFile) {
      if (isLocal) {
        window.console && console.warn("Live UX security only available over HTTPS. Switch to HTTPS outside of testing")
      } else {
        throw new Error("UX security only available over HTTPS")
      }
    }
    if (window.IxUxSecureClient) {
      window.console && console.warn("Ixaris UxSecurity client.js loaded multiple times")
    } else {
      window.IxUxSecureClient = SecureClient
    }
  }, {
    "./utils": 4,
    events: 1
  }],
  4: [function(require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.assign = typeof Object["assign"] == "function" ? Object["assign"] : function assign(target) {
      if (target == null) {
        throw new TypeError("Cannot convert undefined or null to object")
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    };

    function merge() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i]
      }
      var merged = Array.isArray(args[0]) ? [] : {};
      args.forEach(function(arg) {
        arg && Object.keys(arg).forEach(function(key) {
          var isObjectOrArray = merged[key] && typeof merged[key] == "object" && (merged[key].constructor === Object || merged[key].constructor === Array);
          if (isObjectOrArray && typeof arg[key] == "object") {
            merged[key] = merge(merged[key], arg[key])
          } else if (arg[key]) {
            merged[key] = arg[key]
          }
        })
      });
      return merged
    }
    exports.merge = merge;

    function copyProperties(source, toKeep) {
      var target = {};
      for (var key in source) {
        if (source.hasOwnProperty(key) && toKeep.indexOf(key) >= 0) {
          target[key] = source[key]
        }
      }
      return target
    }
    exports.copyProperties = copyProperties;

    function copyPropertiesExcept(source, toRemove) {
      var target = {};
      for (var key in source) {
        if (source.hasOwnProperty(key) && toRemove.indexOf(key) < 0) {
          target[key] = source[key]
        }
      }
      return target
    }
    exports.copyPropertiesExcept = copyPropertiesExcept;

    function equals(left, right) {
      if (typeof left != "object" || typeof right != "object") {
        return left === right
      }
      if (null === left || null === right) {
        return left === right
      }
      var leftisArray = Array.isArray(left);
      if (leftisArray !== Array.isArray(right)) {
        return false
      }
      var leftIsObject = "[object Object]" === Object.prototype.toString.call(left);
      if (leftIsObject !== ("[object Object]" === Object.prototype.toString.call(right))) {
        return false
      }
      if (!leftIsObject && !leftisArray) {
        return false
      }
      var leftKeys = Object.keys(left);
      var rightKeys = Object.keys(right);
      if (leftKeys.length !== rightKeys.length) {
        return false
      }
      var union = {};
      for (var i = 0; i < leftKeys.length; i++) {
        union[leftKeys[i]] = true
      }
      for (var i = 0; i < rightKeys.length; i++) {
        union[rightKeys[i]] = true
      }
      var unionKeys = Object.keys(union);
      if (unionKeys.length !== leftKeys.length) {
        return false
      }
      return unionKeys.every(function(key) {
        return equals(left[key], right[key])
      })
    }
    exports.equals = equals;

    function determineOrigin(url) {
      var a = document.createElement("a");
      a.href = url;
      var protocol = a.protocol;
      var host = a.host;
      if ("http:" === protocol) {
        host = host.replace(/:80$/, "")
      } else if ("https:" === protocol) {
        host = host.replace(/:443$/, "")
      }
      return protocol + "//" + host
    }
    exports.determineOrigin = determineOrigin;

    function compareOrigins(url1, url2) {
      var o1 = determineOrigin(url1);
      var o2 = determineOrigin(url2);
      return o1 && o2 && o1 === o2
    }
    exports.compareOrigins = compareOrigins;

    function urlEncodeQueryString(o, name) {
      var queryParts = [];
      Object.keys(o).forEach(function(key) {
        var val = o[key];
        var nested = name ? name + "[" + key + "]" : key;
        if (val) {
          if (typeof val === "object") {
            var encoded = urlEncodeQueryString(val, nested);
            if (encoded !== "") {
              queryParts.push(encoded)
            }
          } else {
            queryParts.push(nested + "=" + encodeURIComponent(String(val)))
          }
        }
      });
      return queryParts.join("&").replace(/%20/g, "+")
    }
    exports.urlEncodeQueryString = urlEncodeQueryString;

    function determineHeight(cssLineHeight, cssFontSize) {
      cssLineHeight = cssLineHeight || "1.2em";
      if (/^[0-9.]+px$/.test(cssLineHeight)) {
        return cssLineHeight
      }
      var BODY_FONT_SIZE = "14px";
      cssFontSize = cssFontSize || BODY_FONT_SIZE;
      var numberLineHeight = parseFloat(cssLineHeight.toString().replace(/[^0-9.]/g, ""));
      var numberFontSize = parseFloat(cssFontSize.toString().replace(/[^0-9.]/g, ""));
      if (!/^[0-9.]+px$/.test(cssFontSize)) {
        numberFontSize *= parseFloat(BODY_FONT_SIZE.replace(/[^0-9.]/g, ""))
      }
      var calculated = numberLineHeight * numberFontSize + "px";
      return /^[0-9.]+px$/.test(calculated) ? calculated : "100%"
    }
    exports.determineHeight = determineHeight;

    function applyClasses(el, classes) {
      var classesMap = {};
      classes.forEach(function(cls) {
        return cls[0].split(/\s+/).forEach(function(cl) {
          return cl && (classesMap[cl] = classesMap[cl] || cls[1])
        })
      });
      el.className = mergeClassNames(el.className, classesMap)
    }
    exports.applyClasses = applyClasses;

    function mergeClassNames() {
      var cls = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        cls[_i] = arguments[_i]
      }
      var all = [];
      for (var len = arguments.length, i = 0; i < len; i++) {
        all[i] = arguments[i]
      }
      var classesMap = mergeClassesArray({}, all);
      var classes = [];
      for (var key in classesMap) {
        classesMap[key] && classes.push(key)
      }
      return classes.join(" ")
    }
    exports.mergeClassNames = mergeClassNames;

    function mergeClassesArray(map, classes) {
      for (var len = classes.length, i = 0; i < len; ++i) {
        if (classes[i]) {
          var type = typeof classes[i];
          if (type == "string") {
            for (var cl = classes[i].split(/\s+/), len = cl.length, i = 0; i < len; i++) {
              map[cl[i]] = true
            }
          } else if (Array.isArray(classes[i])) {
            mergeClassesArray(map, classes[i])
          } else if (type == "object") {
            for (var key in classes[i]) {
              classes[i].hasOwnProperty(key) && (map[key] = !!classes[i][key])
            }
          } else if (type == "number") {
            map[classes[i]] = true
          }
        }
      }
      return map
    }
    var uid = 0;

    function nextId(prefix) {
      return "" + prefix + uid++
    }
    exports.nextId = nextId
  }, {}]
}, {}, [2]);

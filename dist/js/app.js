/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/*! exports provided: Headers, Request, Response, DOMException, fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global)

var support = {
  searchParams: 'URLSearchParams' in global,
  iterable: 'Symbol' in global && 'iterator' in Symbol,
  blob:
    'FileReader' in global &&
    'Blob' in global &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in global,
  arrayBuffer: 'ArrayBuffer' in global
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    this.bodyUsed = this.bodyUsed
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this)
        if (isConsumed) {
          return isConsumed
        }
        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          )
        } else {
          return Promise.resolve(this._bodyArrayBuffer)
        }
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }

  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/
      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime())
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime()
      }
    }
  }
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    var parts = line.split(':')
    var key = parts.shift().trim()
    if (key) {
      var value = parts.join(':').trim()
      headers.append(key, value)
    }
  })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : ''
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = global.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      setTimeout(function() {
        resolve(new Response(body, options))
      }, 0)
    }

    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException('Aborted', 'AbortError'))
      }, 0)
    }

    function fixUrl(url) {
      try {
        return url === '' && global.location.href ? global.location.href : url
      } catch (e) {
        return url
      }
    }

    xhr.open(request.method, fixUrl(request.url), true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob'
      } else if (
        support.arrayBuffer &&
        request.headers.get('Content-Type') &&
        request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
      ) {
        xhr.responseType = 'arraybuffer'
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]))
      })
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!global.fetch) {
  global.fetch = fetch
  global.Headers = Headers
  global.Request = Request
  global.Response = Response
}


/***/ }),

/***/ "./src/js/formHandler.js":
/*!*******************************!*\
  !*** ./src/js/formHandler.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class FormHander {
	constructor(form) {
		this.form = form
		this.formControls = this.form.querySelectorAll('.form-control')
		this.action = this.form.getAttribute('action')
		this.formData = new FormData(this.form)
		this.dataObj = {}
	}
	validation() {
		const invalidFields = []
		const rules = {
			fullname: {
				pattern: new RegExp('(^[а-яё -]{3,50})', 'ig'),
				errorMessage: 'error fullname'
			},
			email: {
				pattern: new RegExp('[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}', 'ig'),
				errorMessage: 'error email'
			},
			message: {
				pattern: new RegExp('(^[а-яё]{3,500})', 'igm'),
				errorMessage: 'error message'
			}
		}

		this.formData.forEach((val, key) => {
			if (!val.match(rules[key].pattern)) {
				const errorMessage = rules[key].errorMessage
				invalidFields.push({ key, errorMessage });
			}
		})

		if (invalidFields.length !== 0) {
			this.setNotValidStyle(invalidFields)
			return false
		} else {
			this.getDataObj()
			return true
		}
	}
	getDataObj() {
		new FormData(this.form).forEach((val, key) => {
			this.dataObj[key] = val
		})
	}
	sendForm() {
		return fetch(this.action, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.dataObj)
		})
	}
	removeNotValidStyle() {
		this.formControls.forEach(elem => { elem.classList.remove('form-control--not-valid') })
	}
	setNotValidStyle(invalidFields) {
		invalidFields.forEach(elem => {
			this.form.querySelector(`input[name="${elem.key}"], textarea[name="${elem.key}"]`)
				.classList.add('form-control--not-valid');
		})
	}
	submitForm() {
		event.preventDefault()
		this.removeNotValidStyle()
		return this.validation()
	}
}
/* harmony default export */ __webpack_exports__["default"] = (FormHander);

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webp */ "./src/js/webp.js");
/* harmony import */ var _formHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formHandler */ "./src/js/formHandler.js");
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");




Object(_webp__WEBPACK_IMPORTED_MODULE_0__["default"])(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp')
	} else {
		document.querySelector('body').classList.add('no-webp')
	}
})

const btnOpenForm = document.querySelector('.open-form')
const popup = document.querySelector('.popup')
const form = document.querySelector('.form')
const popupClose = document.querySelector('.popup__close')
const popupMessage = document.querySelector('.popup-message-wrap')
const popupMessageText = document.querySelector('.popup-message__text')
const errorMessage = 'Something went wrong...'
const successMessage = 'Thanks! Your application is accepted'
const loadMessage = 'Loading...'

const togglePopup = () => {
	popup.classList.toggle('popup--openly')
}

btnOpenForm.addEventListener('click', () => {
	togglePopup()
	form.style.display = `block`
})
popup.addEventListener('click', e => {
	const { target } = e
	if (target.matches('.popup-overlay') || target.matches('.popup__close')) togglePopup();
})
form.addEventListener('submit', (e) => {
	const { target } = e
	const formHandler = new _formHandler__WEBPACK_IMPORTED_MODULE_1__["default"](target)
	if (formHandler.submitForm()) {
		target.style.display = `none`
		popupMessage.style.display = `flex`
		popupMessageText.textContent = loadMessage
		formHandler.sendForm()
			.then(response => {
				if (response.status !== 200) throw new Error('status network not 200')
				target.reset()
				popupMessageText.textContent = successMessage
			})
			.catch(err => console.log(err))
			.finally(() => {
				const hidePopup = setTimeout(() => {
					togglePopup()
					popupMessage.style.display = `none`
					clearTimeout(hidePopup)
				}, 3000)
			})
	}
})

/***/ }),

/***/ "./src/js/webp.js":
/*!************************!*\
  !*** ./src/js/webp.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2)
	}
	webP.src =
		"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

/* harmony default export */ __webpack_exports__["default"] = (testWebP);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3doYXR3Zy1mZXRjaC9mZXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZm9ybUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NjcmlwdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvd2VicC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGlCQUFpQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JELE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUCw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLHFCQUFxQjtBQUNqRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLHFDQUFxQywwQkFBMEI7QUFDL0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCQUE2QiwwQkFBMEIsZUFBZTtBQUN0RTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwbEJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLEtBQUs7QUFDekM7QUFDQSxJQUFJO0FBQ0o7QUFDQSwyREFBMkQsSUFBSTtBQUMvRDtBQUNBLElBQUk7QUFDSjtBQUNBLGtDQUFrQyxNQUFNO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxxQ0FBcUMsbURBQW1EO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxTQUFTLHFCQUFxQixTQUFTO0FBQ2pGO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2UseUU7Ozs7Ozs7Ozs7OztBQ3JFZjtBQUFBO0FBQUE7QUFBQTtBQUE2QjtBQUNVO0FBQ2xCOztBQUVyQixxREFBUTs7QUFFUjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsUUFBUSxTQUFTO0FBQ2pCO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsUUFBUSxTQUFTO0FBQ2pCLHlCQUF5QixvREFBVztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBLENBQUMsQzs7Ozs7Ozs7Ozs7O0FDekREO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjs7QUFFZSx1RSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9zY3JpcHQuanNcIik7XG4iLCJ2YXIgZ2xvYmFsID1cbiAgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWxUaGlzKSB8fFxuICAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYpIHx8XG4gICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwpXG5cbnZhciBzdXBwb3J0ID0ge1xuICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIGdsb2JhbCxcbiAgaXRlcmFibGU6ICdTeW1ib2wnIGluIGdsb2JhbCAmJiAnaXRlcmF0b3InIGluIFN5bWJvbCxcbiAgYmxvYjpcbiAgICAnRmlsZVJlYWRlcicgaW4gZ2xvYmFsICYmXG4gICAgJ0Jsb2InIGluIGdsb2JhbCAmJlxuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSkoKSxcbiAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gZ2xvYmFsLFxuICBhcnJheUJ1ZmZlcjogJ0FycmF5QnVmZmVyJyBpbiBnbG9iYWxcbn1cblxuZnVuY3Rpb24gaXNEYXRhVmlldyhvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG59XG5cbmlmIChzdXBwb3J0LmFycmF5QnVmZmVyKSB7XG4gIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICBdXG5cbiAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID1cbiAgICBBcnJheUJ1ZmZlci5pc1ZpZXcgfHxcbiAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICBuYW1lID0gU3RyaW5nKG5hbWUpXG4gIH1cbiAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXl9gfH4hXS9pLnRlc3QobmFtZSkgfHwgbmFtZSA9PT0gJycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpXG4gIH1cbiAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKVxuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG4vLyBCdWlsZCBhIGRlc3RydWN0aXZlIGl0ZXJhdG9yIGZvciB0aGUgdmFsdWUgbGlzdFxuZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgdmFyIGl0ZXJhdG9yID0ge1xuICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgfVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaXRlcmF0b3Jcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICB0aGlzLm1hcCA9IHt9XG5cbiAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSlcbiAgICB9LCB0aGlzKVxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24oaGVhZGVyKSB7XG4gICAgICB0aGlzLmFwcGVuZChoZWFkZXJbMF0sIGhlYWRlclsxXSlcbiAgICB9LCB0aGlzKVxuICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgfSwgdGhpcylcbiAgfVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICB2YXIgb2xkVmFsdWUgPSB0aGlzLm1hcFtuYW1lXVxuICB0aGlzLm1hcFtuYW1lXSA9IG9sZFZhbHVlID8gb2xkVmFsdWUgKyAnLCAnICsgdmFsdWUgOiB2YWx1ZVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbFxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHJldHVybiB0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVOYW1lKG5hbWUpKVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLm1hcCkge1xuICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzLm1hcFtuYW1lXSwgbmFtZSwgdGhpcylcbiAgICB9XG4gIH1cbn1cblxuSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaXRlbXMgPSBbXVxuICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICBpdGVtcy5wdXNoKG5hbWUpXG4gIH0pXG4gIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbn1cblxuSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpdGVtcyA9IFtdXG4gIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIGl0ZW1zLnB1c2godmFsdWUpXG4gIH0pXG4gIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbn1cblxuSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaXRlbXMgPSBbXVxuICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pXG4gIH0pXG4gIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbn1cblxuaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbn1cblxuZnVuY3Rpb24gY29uc3VtZWQoYm9keSkge1xuICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcbiAgfVxuICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxufVxuXG5mdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpXG4gICAgfVxuICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZWplY3QocmVhZGVyLmVycm9yKVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgcmV0dXJuIHByb21pc2Vcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gIHJldHVybiBwcm9taXNlXG59XG5cbmZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYpXG4gIHZhciBjaGFycyA9IG5ldyBBcnJheSh2aWV3Lmxlbmd0aClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSlcbiAgfVxuICByZXR1cm4gY2hhcnMuam9pbignJylcbn1cblxuZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gIGlmIChidWYuc2xpY2UpIHtcbiAgICByZXR1cm4gYnVmLnNsaWNlKDApXG4gIH0gZWxzZSB7XG4gICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWYpKVxuICAgIHJldHVybiB2aWV3LmJ1ZmZlclxuICB9XG59XG5cbmZ1bmN0aW9uIEJvZHkoKSB7XG4gIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gIHRoaXMuX2luaXRCb2R5ID0gZnVuY3Rpb24oYm9keSkge1xuICAgIC8qXG4gICAgICBmZXRjaC1tb2NrIHdyYXBzIHRoZSBSZXNwb25zZSBvYmplY3QgaW4gYW4gRVM2IFByb3h5IHRvXG4gICAgICBwcm92aWRlIHVzZWZ1bCB0ZXN0IGhhcm5lc3MgZmVhdHVyZXMgc3VjaCBhcyBmbHVzaC4gSG93ZXZlciwgb25cbiAgICAgIEVTNSBicm93c2VycyB3aXRob3V0IGZldGNoIG9yIFByb3h5IHN1cHBvcnQgcG9sbHlmaWxscyBtdXN0IGJlIHVzZWQ7XG4gICAgICB0aGUgcHJveHktcG9sbHlmaWxsIGlzIHVuYWJsZSB0byBwcm94eSBhbiBhdHRyaWJ1dGUgdW5sZXNzIGl0IGV4aXN0c1xuICAgICAgb24gdGhlIG9iamVjdCBiZWZvcmUgdGhlIFByb3h5IGlzIGNyZWF0ZWQuIFRoaXMgY2hhbmdlIGVuc3VyZXNcbiAgICAgIFJlc3BvbnNlLmJvZHlVc2VkIGV4aXN0cyBvbiB0aGUgaW5zdGFuY2UsIHdoaWxlIG1haW50YWluaW5nIHRoZVxuICAgICAgc2VtYW50aWMgb2Ygc2V0dGluZyBSZXF1ZXN0LmJvZHlVc2VkIGluIHRoZSBjb25zdHJ1Y3RvciBiZWZvcmVcbiAgICAgIF9pbml0Qm9keSBpcyBjYWxsZWQuXG4gICAgKi9cbiAgICB0aGlzLmJvZHlVc2VkID0gdGhpcy5ib2R5VXNlZFxuICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxuICAgIGlmICghYm9keSkge1xuICAgICAgdGhpcy5fYm9keVRleHQgPSAnJ1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYmxvYiAmJiBCbG9iLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHlcbiAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgIHRoaXMuX2JvZHlGb3JtRGF0YSA9IGJvZHlcbiAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgc3VwcG9ydC5ibG9iICYmIGlzRGF0YVZpZXcoYm9keSkpIHtcbiAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKVxuICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gbmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pXG4gICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIChBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSB8fCBpc0FycmF5QnVmZmVyVmlldyhib2R5KSkpIHtcbiAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KVxuICAgIH1cblxuICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcbiAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyBibG9iJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICB2YXIgaXNDb25zdW1lZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChpc0NvbnN1bWVkKSB7XG4gICAgICAgICAgcmV0dXJuIGlzQ29uc3VtZWRcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyLmJ1ZmZlci5zbGljZShcbiAgICAgICAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyLmJ5dGVPZmZzZXQsXG4gICAgICAgICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlci5ieXRlT2Zmc2V0ICsgdGhpcy5fYm9keUFycmF5QnVmZmVyLmJ5dGVMZW5ndGhcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVhZEFycmF5QnVmZmVyQXNUZXh0KHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikpXG4gICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICB9XG4gIH1cblxuICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcbiAgICB9XG4gIH1cblxuICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG52YXIgbWV0aG9kcyA9IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnLCAnUE9TVCcsICdQVVQnXVxuXG5mdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgcmV0dXJuIG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xID8gdXBjYXNlZCA6IG1ldGhvZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVxdWVzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQbGVhc2UgdXNlIHRoZSBcIm5ld1wiIG9wZXJhdG9yLCB0aGlzIERPTSBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLicpXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keVxuXG4gIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgfVxuICAgIHRoaXMudXJsID0gaW5wdXQudXJsXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IGlucHV0LmNyZWRlbnRpYWxzXG4gICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpXG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZVxuICAgIHRoaXMuc2lnbmFsID0gaW5wdXQuc2lnbmFsXG4gICAgaWYgKCFib2R5ICYmIGlucHV0Ll9ib2R5SW5pdCAhPSBudWxsKSB7XG4gICAgICBib2R5ID0gaW5wdXQuX2JvZHlJbml0XG4gICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpXG4gIH1cblxuICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdzYW1lLW9yaWdpbidcbiAgaWYgKG9wdGlvbnMuaGVhZGVycyB8fCAhdGhpcy5oZWFkZXJzKSB7XG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICB9XG4gIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKVxuICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcbiAgdGhpcy5zaWduYWwgPSBvcHRpb25zLnNpZ25hbCB8fCB0aGlzLnNpZ25hbFxuICB0aGlzLnJlZmVycmVyID0gbnVsbFxuXG4gIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb2R5IG5vdCBhbGxvd2VkIGZvciBHRVQgb3IgSEVBRCByZXF1ZXN0cycpXG4gIH1cbiAgdGhpcy5faW5pdEJvZHkoYm9keSlcblxuICBpZiAodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpIHtcbiAgICBpZiAob3B0aW9ucy5jYWNoZSA9PT0gJ25vLXN0b3JlJyB8fCBvcHRpb25zLmNhY2hlID09PSAnbm8tY2FjaGUnKSB7XG4gICAgICAvLyBTZWFyY2ggZm9yIGEgJ18nIHBhcmFtZXRlciBpbiB0aGUgcXVlcnkgc3RyaW5nXG4gICAgICB2YXIgcmVQYXJhbVNlYXJjaCA9IC8oWz8mXSlfPVteJl0qL1xuICAgICAgaWYgKHJlUGFyYW1TZWFyY2gudGVzdCh0aGlzLnVybCkpIHtcbiAgICAgICAgLy8gSWYgaXQgYWxyZWFkeSBleGlzdHMgdGhlbiBzZXQgdGhlIHZhbHVlIHdpdGggdGhlIGN1cnJlbnQgdGltZVxuICAgICAgICB0aGlzLnVybCA9IHRoaXMudXJsLnJlcGxhY2UocmVQYXJhbVNlYXJjaCwgJyQxXz0nICsgbmV3IERhdGUoKS5nZXRUaW1lKCkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGEgbmV3ICdfJyBwYXJhbWV0ZXIgdG8gdGhlIGVuZCB3aXRoIHRoZSBjdXJyZW50IHRpbWVcbiAgICAgICAgdmFyIHJlUXVlcnlTdHJpbmcgPSAvXFw/L1xuICAgICAgICB0aGlzLnVybCArPSAocmVRdWVyeVN0cmluZy50ZXN0KHRoaXMudXJsKSA/ICcmJyA6ICc/JykgKyAnXz0nICsgbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHtib2R5OiB0aGlzLl9ib2R5SW5pdH0pXG59XG5cbmZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKClcbiAgYm9keVxuICAgIC50cmltKClcbiAgICAuc3BsaXQoJyYnKVxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKVxuICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgICAgIH1cbiAgICB9KVxuICByZXR1cm4gZm9ybVxufVxuXG5mdW5jdGlvbiBwYXJzZUhlYWRlcnMocmF3SGVhZGVycykge1xuICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgLy8gUmVwbGFjZSBpbnN0YW5jZXMgb2YgXFxyXFxuIGFuZCBcXG4gZm9sbG93ZWQgYnkgYXQgbGVhc3Qgb25lIHNwYWNlIG9yIGhvcml6b250YWwgdGFiIHdpdGggYSBzcGFjZVxuICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMCNzZWN0aW9uLTMuMlxuICB2YXIgcHJlUHJvY2Vzc2VkSGVhZGVycyA9IHJhd0hlYWRlcnMucmVwbGFjZSgvXFxyP1xcbltcXHQgXSsvZywgJyAnKVxuICBwcmVQcm9jZXNzZWRIZWFkZXJzLnNwbGl0KC9cXHI/XFxuLykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCkudHJpbSgpXG4gICAgaWYgKGtleSkge1xuICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiBoZWFkZXJzXG59XG5cbkJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuZXhwb3J0IGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXNwb25zZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQbGVhc2UgdXNlIHRoZSBcIm5ld1wiIG9wZXJhdG9yLCB0aGlzIERPTSBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLicpXG4gIH1cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1cyA9PT0gdW5kZWZpbmVkID8gMjAwIDogb3B0aW9ucy5zdGF0dXNcbiAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMFxuICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICcnXG4gIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xuICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbn1cblxuQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcblxuUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcbiAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxuICAgIHVybDogdGhpcy51cmxcbiAgfSlcbn1cblxuUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgcmVzcG9uc2UudHlwZSA9ICdlcnJvcidcbiAgcmV0dXJuIHJlc3BvbnNlXG59XG5cbnZhciByZWRpcmVjdFN0YXR1c2VzID0gWzMwMSwgMzAyLCAzMDMsIDMwNywgMzA4XVxuXG5SZXNwb25zZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKHVybCwgc3RhdHVzKSB7XG4gIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCBzdGF0dXMgY29kZScpXG4gIH1cblxuICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbn1cblxuZXhwb3J0IHZhciBET01FeGNlcHRpb24gPSBnbG9iYWwuRE9NRXhjZXB0aW9uXG50cnkge1xuICBuZXcgRE9NRXhjZXB0aW9uKClcbn0gY2F0Y2ggKGVycikge1xuICBET01FeGNlcHRpb24gPSBmdW5jdGlvbihtZXNzYWdlLCBuYW1lKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZVxuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB2YXIgZXJyb3IgPSBFcnJvcihtZXNzYWdlKVxuICAgIHRoaXMuc3RhY2sgPSBlcnJvci5zdGFja1xuICB9XG4gIERPTUV4Y2VwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSlcbiAgRE9NRXhjZXB0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IERPTUV4Y2VwdGlvblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2goaW5wdXQsIGluaXQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG5cbiAgICBpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5zaWduYWwuYWJvcnRlZCkge1xuICAgICAgcmV0dXJuIHJlamVjdChuZXcgRE9NRXhjZXB0aW9uKCdBYm9ydGVkJywgJ0Fib3J0RXJyb3InKSlcbiAgICB9XG5cbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgIGZ1bmN0aW9uIGFib3J0WGhyKCkge1xuICAgICAgeGhyLmFib3J0KClcbiAgICB9XG5cbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMudXJsID0gJ3Jlc3BvbnNlVVJMJyBpbiB4aHIgPyB4aHIucmVzcG9uc2VVUkwgOiBvcHRpb25zLmhlYWRlcnMuZ2V0KCdYLVJlcXVlc3QtVVJMJylcbiAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH0sIDApXG4gICAgfVxuXG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9LCAwKVxuICAgIH1cblxuICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9LCAwKVxuICAgIH1cblxuICAgIHhoci5vbmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IERPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgICB9LCAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpeFVybCh1cmwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB1cmwgPT09ICcnICYmIGdsb2JhbC5sb2NhdGlvbi5ocmVmID8gZ2xvYmFsLmxvY2F0aW9uLmhyZWYgOiB1cmxcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHVybFxuICAgICAgfVxuICAgIH1cblxuICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCBmaXhVcmwocmVxdWVzdC51cmwpLCB0cnVlKVxuXG4gICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICB9IGVsc2UgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdvbWl0Jykge1xuICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhocikge1xuICAgICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBzdXBwb3J0LmFycmF5QnVmZmVyICYmXG4gICAgICAgIHJlcXVlc3QuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpICYmXG4gICAgICAgIHJlcXVlc3QuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpLmluZGV4T2YoJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpICE9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGluaXQgJiYgdHlwZW9mIGluaXQuaGVhZGVycyA9PT0gJ29iamVjdCcgJiYgIShpbml0LmhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSkge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaW5pdC5oZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgbm9ybWFsaXplVmFsdWUoaW5pdC5oZWFkZXJzW25hbWVdKSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdC5zaWduYWwpIHtcbiAgICAgIHJlcXVlc3Quc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRYaHIpXG5cbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gRE9ORSAoc3VjY2VzcyBvciBmYWlsdXJlKVxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICByZXF1ZXN0LnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcbiAgfSlcbn1cblxuZmV0Y2gucG9seWZpbGwgPSB0cnVlXG5cbmlmICghZ2xvYmFsLmZldGNoKSB7XG4gIGdsb2JhbC5mZXRjaCA9IGZldGNoXG4gIGdsb2JhbC5IZWFkZXJzID0gSGVhZGVyc1xuICBnbG9iYWwuUmVxdWVzdCA9IFJlcXVlc3RcbiAgZ2xvYmFsLlJlc3BvbnNlID0gUmVzcG9uc2Vcbn1cbiIsImNsYXNzIEZvcm1IYW5kZXIge1xyXG5cdGNvbnN0cnVjdG9yKGZvcm0pIHtcclxuXHRcdHRoaXMuZm9ybSA9IGZvcm1cclxuXHRcdHRoaXMuZm9ybUNvbnRyb2xzID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtLWNvbnRyb2wnKVxyXG5cdFx0dGhpcy5hY3Rpb24gPSB0aGlzLmZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKVxyXG5cdFx0dGhpcy5mb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzLmZvcm0pXHJcblx0XHR0aGlzLmRhdGFPYmogPSB7fVxyXG5cdH1cclxuXHR2YWxpZGF0aW9uKCkge1xyXG5cdFx0Y29uc3QgaW52YWxpZEZpZWxkcyA9IFtdXHJcblx0XHRjb25zdCBydWxlcyA9IHtcclxuXHRcdFx0ZnVsbG5hbWU6IHtcclxuXHRcdFx0XHRwYXR0ZXJuOiBuZXcgUmVnRXhwKCcoXlvQsC3Rj9GRIC1dezMsNTB9KScsICdpZycpLFxyXG5cdFx0XHRcdGVycm9yTWVzc2FnZTogJ2Vycm9yIGZ1bGxuYW1lJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbWFpbDoge1xyXG5cdFx0XHRcdHBhdHRlcm46IG5ldyBSZWdFeHAoJ1tBLVowLTkuXyUrLV0rQFtBLVowLTktXSsuKy5bQS1aXXsyLDR9JywgJ2lnJyksXHJcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiAnZXJyb3IgZW1haWwnXHJcblx0XHRcdH0sXHJcblx0XHRcdG1lc3NhZ2U6IHtcclxuXHRcdFx0XHRwYXR0ZXJuOiBuZXcgUmVnRXhwKCcoXlvQsC3Rj9GRXXszLDUwMH0pJywgJ2lnbScpLFxyXG5cdFx0XHRcdGVycm9yTWVzc2FnZTogJ2Vycm9yIG1lc3NhZ2UnXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvcm1EYXRhLmZvckVhY2goKHZhbCwga2V5KSA9PiB7XHJcblx0XHRcdGlmICghdmFsLm1hdGNoKHJ1bGVzW2tleV0ucGF0dGVybikpIHtcclxuXHRcdFx0XHRjb25zdCBlcnJvck1lc3NhZ2UgPSBydWxlc1trZXldLmVycm9yTWVzc2FnZVxyXG5cdFx0XHRcdGludmFsaWRGaWVsZHMucHVzaCh7IGtleSwgZXJyb3JNZXNzYWdlIH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cclxuXHRcdGlmIChpbnZhbGlkRmllbGRzLmxlbmd0aCAhPT0gMCkge1xyXG5cdFx0XHR0aGlzLnNldE5vdFZhbGlkU3R5bGUoaW52YWxpZEZpZWxkcylcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmdldERhdGFPYmooKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXREYXRhT2JqKCkge1xyXG5cdFx0bmV3IEZvcm1EYXRhKHRoaXMuZm9ybSkuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcclxuXHRcdFx0dGhpcy5kYXRhT2JqW2tleV0gPSB2YWxcclxuXHRcdH0pXHJcblx0fVxyXG5cdHNlbmRGb3JtKCkge1xyXG5cdFx0cmV0dXJuIGZldGNoKHRoaXMuYWN0aW9uLCB7XHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGFPYmopXHJcblx0XHR9KVxyXG5cdH1cclxuXHRyZW1vdmVOb3RWYWxpZFN0eWxlKCkge1xyXG5cdFx0dGhpcy5mb3JtQ29udHJvbHMuZm9yRWFjaChlbGVtID0+IHsgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdmb3JtLWNvbnRyb2wtLW5vdC12YWxpZCcpIH0pXHJcblx0fVxyXG5cdHNldE5vdFZhbGlkU3R5bGUoaW52YWxpZEZpZWxkcykge1xyXG5cdFx0aW52YWxpZEZpZWxkcy5mb3JFYWNoKGVsZW0gPT4ge1xyXG5cdFx0XHR0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT1cIiR7ZWxlbS5rZXl9XCJdLCB0ZXh0YXJlYVtuYW1lPVwiJHtlbGVtLmtleX1cIl1gKVxyXG5cdFx0XHRcdC5jbGFzc0xpc3QuYWRkKCdmb3JtLWNvbnRyb2wtLW5vdC12YWxpZCcpO1xyXG5cdFx0fSlcclxuXHR9XHJcblx0c3VibWl0Rm9ybSgpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHRcdHRoaXMucmVtb3ZlTm90VmFsaWRTdHlsZSgpXHJcblx0XHRyZXR1cm4gdGhpcy52YWxpZGF0aW9uKClcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRm9ybUhhbmRlciIsImltcG9ydCB0ZXN0V2ViUCBmcm9tICcuL3dlYnAnXHJcbmltcG9ydCBGb3JtSGFuZGxlciBmcm9tICcuL2Zvcm1IYW5kbGVyJ1xyXG5pbXBvcnQgXCJ3aGF0d2ctZmV0Y2hcIlxyXG5cclxudGVzdFdlYlAoZnVuY3Rpb24gKHN1cHBvcnQpIHtcclxuXHJcblx0aWYgKHN1cHBvcnQgPT0gdHJ1ZSkge1xyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5hZGQoJ3dlYnAnKVxyXG5cdH0gZWxzZSB7XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmFkZCgnbm8td2VicCcpXHJcblx0fVxyXG59KVxyXG5cclxuY29uc3QgYnRuT3BlbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3Blbi1mb3JtJylcclxuY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKVxyXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0nKVxyXG5jb25zdCBwb3B1cENsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19jbG9zZScpXHJcbmNvbnN0IHBvcHVwTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1tZXNzYWdlLXdyYXAnKVxyXG5jb25zdCBwb3B1cE1lc3NhZ2VUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLW1lc3NhZ2VfX3RleHQnKVxyXG5jb25zdCBlcnJvck1lc3NhZ2UgPSAnU29tZXRoaW5nIHdlbnQgd3JvbmcuLi4nXHJcbmNvbnN0IHN1Y2Nlc3NNZXNzYWdlID0gJ1RoYW5rcyEgWW91ciBhcHBsaWNhdGlvbiBpcyBhY2NlcHRlZCdcclxuY29uc3QgbG9hZE1lc3NhZ2UgPSAnTG9hZGluZy4uLidcclxuXHJcbmNvbnN0IHRvZ2dsZVBvcHVwID0gKCkgPT4ge1xyXG5cdHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwLS1vcGVubHknKVxyXG59XHJcblxyXG5idG5PcGVuRm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHR0b2dnbGVQb3B1cCgpXHJcblx0Zm9ybS5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYFxyXG59KVxyXG5wb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG5cdGNvbnN0IHsgdGFyZ2V0IH0gPSBlXHJcblx0aWYgKHRhcmdldC5tYXRjaGVzKCcucG9wdXAtb3ZlcmxheScpIHx8IHRhcmdldC5tYXRjaGVzKCcucG9wdXBfX2Nsb3NlJykpIHRvZ2dsZVBvcHVwKCk7XHJcbn0pXHJcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuXHRjb25zdCB7IHRhcmdldCB9ID0gZVxyXG5cdGNvbnN0IGZvcm1IYW5kbGVyID0gbmV3IEZvcm1IYW5kbGVyKHRhcmdldClcclxuXHRpZiAoZm9ybUhhbmRsZXIuc3VibWl0Rm9ybSgpKSB7XHJcblx0XHR0YXJnZXQuc3R5bGUuZGlzcGxheSA9IGBub25lYFxyXG5cdFx0cG9wdXBNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSBgZmxleGBcclxuXHRcdHBvcHVwTWVzc2FnZVRleHQudGV4dENvbnRlbnQgPSBsb2FkTWVzc2FnZVxyXG5cdFx0Zm9ybUhhbmRsZXIuc2VuZEZvcm0oKVxyXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XHJcblx0XHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoJ3N0YXR1cyBuZXR3b3JrIG5vdCAyMDAnKVxyXG5cdFx0XHRcdHRhcmdldC5yZXNldCgpXHJcblx0XHRcdFx0cG9wdXBNZXNzYWdlVGV4dC50ZXh0Q29udGVudCA9IHN1Y2Nlc3NNZXNzYWdlXHJcblx0XHRcdH0pXHJcblx0XHRcdC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcclxuXHRcdFx0LmZpbmFsbHkoKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGhpZGVQb3B1cCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0dG9nZ2xlUG9wdXAoKVxyXG5cdFx0XHRcdFx0cG9wdXBNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSBgbm9uZWBcclxuXHRcdFx0XHRcdGNsZWFyVGltZW91dChoaWRlUG9wdXApXHJcblx0XHRcdFx0fSwgMzAwMClcclxuXHRcdFx0fSlcclxuXHR9XHJcbn0pIiwiZnVuY3Rpb24gdGVzdFdlYlAoY2FsbGJhY2spIHtcclxuXHJcblx0dmFyIHdlYlAgPSBuZXcgSW1hZ2UoKTtcclxuXHR3ZWJQLm9ubG9hZCA9IHdlYlAub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGNhbGxiYWNrKHdlYlAuaGVpZ2h0ID09IDIpXHJcblx0fVxyXG5cdHdlYlAuc3JjID1cclxuXHRcdFwiZGF0YTppbWFnZS93ZWJwO2Jhc2U2NCxVa2xHUmpvQUFBQlhSVUpRVmxBNElDNEFBQUN5QWdDZEFTb0NBQUlBTG1rMG1rMGlJaUlpSWdCb1N5Z0FCYzZXV2dBQS92ZWZmLzBQUDhiQS8vTHdZQUFBXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRlc3RXZWJQIl0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMM2RvWVhSM1p5MW1aWFJqYUM5bVpYUmphQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZabTl5YlVoaGJtUnNaWEl1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2YzNKakwycHpMM05qY21sd2RDNXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXpjbU12YW5NdmQyVmljQzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzFGQlFVRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN096dFJRVWRCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVN3d1EwRkJNRU1zWjBOQlFXZERPMUZCUXpGRk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPMUZCUTBFc2QwUkJRWGRFTEd0Q1FVRnJRanRSUVVNeFJUdFJRVU5CTEdsRVFVRnBSQ3hqUVVGak8xRkJReTlFT3p0UlFVVkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRU3g1UTBGQmVVTXNhVU5CUVdsRE8xRkJRekZGTEdkSVFVRm5TQ3h0UWtGQmJVSXNSVUZCUlR0UlFVTnlTVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJMREpDUVVFeVFpd3dRa0ZCTUVJc1JVRkJSVHRSUVVOMlJDeHBRMEZCYVVNc1pVRkJaVHRSUVVOb1JEdFJRVU5CTzFGQlEwRTdPMUZCUlVFN1VVRkRRU3h6UkVGQmMwUXNLMFJCUVN0RU96dFJRVVZ5U0R0UlFVTkJPenM3VVVGSFFUdFJRVU5CT3pzN096czdPenM3T3pzN08wRkRiRVpCTzBGQlFVRTdRVUZCUVR0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMR05CUVdNN1FVRkRaRHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGVHp0QlFVTlFPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVEN4SFFVRkhPMEZCUTBnN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFRDeEhRVUZITzBGQlEwZzdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUVzYVVKQlFXbENMR2xDUVVGcFFqdEJRVU5zUXp0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkhPMEZCUTBnN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTEV0QlFVczdRVUZEVER0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRU3hMUVVGTE8wRkJRMHc3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc2NVUkJRWEZFTzBGQlEzSkVMRTlCUVU4N1FVRkRVRHRCUVVOQkxFOUJRVTg3UVVGRFVDdzBSVUZCTkVVN1FVRkROVVU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEVzVDBGQlR6dEJRVU5RTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRk5CUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTEV0QlFVczdRVUZEVER0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZQTzBGQlExQTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFc05FSkJRVFJDTEhGQ1FVRnhRanRCUVVOcVJEczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFUczdRVUZGUVRzN1FVRkZUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEczdRVUZGUVR0QlFVTkJMSEZEUVVGeFF5d3dRa0ZCTUVJN1FVRkRMMFE3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJMRFpDUVVFMlFpd3dRa0ZCTUVJc1pVRkJaVHRCUVVOMFJUczdRVUZGVHp0QlFVTlFPMEZCUTBFN1FVRkRRU3hEUVVGRE8wRkJRMFE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZQTzBGQlExQTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVURzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVER0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hQUVVGUE8wRkJRMUFzUzBGQlN6dEJRVU5NTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRWRCUVVjN1FVRkRTRHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3pzN096czdPenM3T3pzN1FVTndiRUpCTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2IwTkJRVzlETEV0QlFVczdRVUZEZWtNN1FVRkRRU3hKUVVGSk8wRkJRMG83UVVGRFFTd3lSRUZCTWtRc1NVRkJTVHRCUVVNdlJEdEJRVU5CTEVsQlFVazdRVUZEU2p0QlFVTkJMR3REUVVGclF5eE5RVUZOTzBGQlEzaERPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4M1FrRkJkMElzYjBKQlFXOUNPMEZCUXpWRE8wRkJRMEVzUjBGQlJ6czdRVUZGU0R0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1NVRkJTVHRCUVVOS08wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdRVUZEUVN4eFEwRkJjVU1zYlVSQlFXMUVPMEZCUTNoR08wRkJRMEU3UVVGRFFUdEJRVU5CTERCRFFVRXdReXhUUVVGVExIRkNRVUZ4UWl4VFFVRlRPMEZCUTJwR08wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMlVzZVVVN096czdPenM3T3pzN096dEJRM0pGWmp0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVFMlFqdEJRVU5WTzBGQlEyeENPenRCUVVWeVFpeHhSRUZCVVRzN1FVRkZVanRCUVVOQk8wRkJRMEVzUlVGQlJUdEJRVU5HTzBGQlEwRTdRVUZEUVN4RFFVRkRPenRCUVVWRU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUTBGQlF6dEJRVU5FTzBGQlEwRXNVVUZCVVN4VFFVRlRPMEZCUTJwQ08wRkJRMEVzUTBGQlF6dEJRVU5FTzBGQlEwRXNVVUZCVVN4VFFVRlRPMEZCUTJwQ0xIbENRVUY1UWl4dlJFRkJWenRCUVVOd1F6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEpRVUZKTzBGQlEwbzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTEVsQlFVazdRVUZEU2p0QlFVTkJMRU5CUVVNc1F6czdPenM3T3pzN096czdPMEZEZWtSRU8wRkJRVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHMUNRVUZ0UWp0QlFVTnVRanM3UVVGRlpTeDFSU0lzSW1acGJHVWlPaUl4TmpCa09UVTRZelppTkRNM01qbG1NbVJtT1M1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaUJjZEM4dklGUm9aU0J0YjJSMWJHVWdZMkZqYUdWY2JpQmNkSFpoY2lCcGJuTjBZV3hzWldSTmIyUjFiR1Z6SUQwZ2UzMDdYRzVjYmlCY2RDOHZJRlJvWlNCeVpYRjFhWEpsSUdaMWJtTjBhVzl1WEc0Z1hIUm1kVzVqZEdsdmJpQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLRzF2WkhWc1pVbGtLU0I3WEc1Y2JpQmNkRngwTHk4Z1EyaGxZMnNnYVdZZ2JXOWtkV3hsSUdseklHbHVJR05oWTJobFhHNGdYSFJjZEdsbUtHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZEtTQjdYRzRnWEhSY2RGeDBjbVYwZFhKdUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtVjRjRzl5ZEhNN1hHNGdYSFJjZEgxY2JpQmNkRngwTHk4Z1EzSmxZWFJsSUdFZ2JtVjNJRzF2WkhWc1pTQW9ZVzVrSUhCMWRDQnBkQ0JwYm5SdklIUm9aU0JqWVdOb1pTbGNiaUJjZEZ4MGRtRnlJRzF2WkhWc1pTQTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRJRDBnZTF4dUlGeDBYSFJjZEdrNklHMXZaSFZzWlVsa0xGeHVJRngwWEhSY2RHdzZJR1poYkhObExGeHVJRngwWEhSY2RHVjRjRzl5ZEhNNklIdDlYRzRnWEhSY2RIMDdYRzVjYmlCY2RGeDBMeThnUlhobFkzVjBaU0IwYUdVZ2JXOWtkV3hsSUdaMWJtTjBhVzl1WEc0Z1hIUmNkRzF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbU5oYkd3b2JXOWtkV3hsTG1WNGNHOXlkSE1zSUcxdlpIVnNaU3dnYlc5a2RXeGxMbVY0Y0c5eWRITXNJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThwTzF4dVhHNGdYSFJjZEM4dklFWnNZV2NnZEdobElHMXZaSFZzWlNCaGN5QnNiMkZrWldSY2JpQmNkRngwYlc5a2RXeGxMbXdnUFNCMGNuVmxPMXh1WEc0Z1hIUmNkQzh2SUZKbGRIVnliaUIwYUdVZ1pYaHdiM0owY3lCdlppQjBhR1VnYlc5a2RXeGxYRzRnWEhSY2RISmxkSFZ5YmlCdGIyUjFiR1V1Wlhod2IzSjBjenRjYmlCY2RIMWNibHh1WEc0Z1hIUXZMeUJsZUhCdmMyVWdkR2hsSUcxdlpIVnNaWE1nYjJKcVpXTjBJQ2hmWDNkbFluQmhZMnRmYlc5a2RXeGxjMTlmS1Z4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV0SUQwZ2JXOWtkV3hsY3p0Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdVZ1kyRmphR1ZjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVZeUE5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE03WEc1Y2JpQmNkQzh2SUdSbFptbHVaU0JuWlhSMFpYSWdablZ1WTNScGIyNGdabTl5SUdoaGNtMXZibmtnWlhod2IzSjBjMXh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWtJRDBnWm5WdVkzUnBiMjRvWlhod2IzSjBjeXdnYm1GdFpTd2daMlYwZEdWeUtTQjdYRzRnWEhSY2RHbG1LQ0ZmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG04b1pYaHdiM0owY3l3Z2JtRnRaU2twSUh0Y2JpQmNkRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dibUZ0WlN3Z2V5QmxiblZ0WlhKaFlteGxPaUIwY25WbExDQm5aWFE2SUdkbGRIUmxjaUI5S1R0Y2JpQmNkRngwZlZ4dUlGeDBmVHRjYmx4dUlGeDBMeThnWkdWbWFXNWxJRjlmWlhOTmIyUjFiR1VnYjI0Z1pYaHdiM0owYzF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV5SUQwZ1puVnVZM1JwYjI0b1pYaHdiM0owY3lrZ2UxeHVJRngwWEhScFppaDBlWEJsYjJZZ1UzbHRZbTlzSUNFOVBTQW5kVzVrWldacGJtVmtKeUFtSmlCVGVXMWliMnd1ZEc5VGRISnBibWRVWVdjcElIdGNiaUJjZEZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnVTNsdFltOXNMblJ2VTNSeWFXNW5WR0ZuTENCN0lIWmhiSFZsT2lBblRXOWtkV3hsSnlCOUtUdGNiaUJjZEZ4MGZWeHVJRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dKMTlmWlhOTmIyUjFiR1VuTENCN0lIWmhiSFZsT2lCMGNuVmxJSDBwTzF4dUlGeDBmVHRjYmx4dUlGeDBMeThnWTNKbFlYUmxJR0VnWm1GclpTQnVZVzFsYzNCaFkyVWdiMkpxWldOMFhHNGdYSFF2THlCdGIyUmxJQ1lnTVRvZ2RtRnNkV1VnYVhNZ1lTQnRiMlIxYkdVZ2FXUXNJSEpsY1hWcGNtVWdhWFJjYmlCY2RDOHZJRzF2WkdVZ0ppQXlPaUJ0WlhKblpTQmhiR3dnY0hKdmNHVnlkR2xsY3lCdlppQjJZV3gxWlNCcGJuUnZJSFJvWlNCdWMxeHVJRngwTHk4Z2JXOWtaU0FtSURRNklISmxkSFZ5YmlCMllXeDFaU0IzYUdWdUlHRnNjbVZoWkhrZ2JuTWdiMkpxWldOMFhHNGdYSFF2THlCdGIyUmxJQ1lnT0h3eE9pQmlaV2hoZG1VZ2JHbHJaU0J5WlhGMWFYSmxYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuUWdQU0JtZFc1amRHbHZiaWgyWVd4MVpTd2diVzlrWlNrZ2UxeHVJRngwWEhScFppaHRiMlJsSUNZZ01Ta2dkbUZzZFdVZ1BTQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLSFpoYkhWbEtUdGNiaUJjZEZ4MGFXWW9iVzlrWlNBbUlEZ3BJSEpsZEhWeWJpQjJZV3gxWlR0Y2JpQmNkRngwYVdZb0tHMXZaR1VnSmlBMEtTQW1KaUIwZVhCbGIyWWdkbUZzZFdVZ1BUMDlJQ2R2WW1wbFkzUW5JQ1ltSUhaaGJIVmxJQ1ltSUhaaGJIVmxMbDlmWlhOTmIyUjFiR1VwSUhKbGRIVnliaUIyWVd4MVpUdGNiaUJjZEZ4MGRtRnlJRzV6SUQwZ1QySnFaV04wTG1OeVpXRjBaU2h1ZFd4c0tUdGNiaUJjZEZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXlLRzV6S1R0Y2JpQmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHNXpMQ0FuWkdWbVlYVnNkQ2NzSUhzZ1pXNTFiV1Z5WVdKc1pUb2dkSEoxWlN3Z2RtRnNkV1U2SUhaaGJIVmxJSDBwTzF4dUlGeDBYSFJwWmlodGIyUmxJQ1lnTWlBbUppQjBlWEJsYjJZZ2RtRnNkV1VnSVQwZ0ozTjBjbWx1WnljcElHWnZjaWgyWVhJZ2EyVjVJR2x1SUhaaGJIVmxLU0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1Rb2JuTXNJR3RsZVN3Z1puVnVZM1JwYjI0b2EyVjVLU0I3SUhKbGRIVnliaUIyWVd4MVpWdHJaWGxkT3lCOUxtSnBibVFvYm5Wc2JDd2dhMlY1S1NrN1hHNGdYSFJjZEhKbGRIVnliaUJ1Y3p0Y2JpQmNkSDA3WEc1Y2JpQmNkQzh2SUdkbGRFUmxabUYxYkhSRmVIQnZjblFnWm5WdVkzUnBiMjRnWm05eUlHTnZiWEJoZEdsaWFXeHBkSGtnZDJsMGFDQnViMjR0YUdGeWJXOXVlU0J0YjJSMWJHVnpYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtNGdQU0JtZFc1amRHbHZiaWh0YjJSMWJHVXBJSHRjYmlCY2RGeDBkbUZ5SUdkbGRIUmxjaUE5SUcxdlpIVnNaU0FtSmlCdGIyUjFiR1V1WDE5bGMwMXZaSFZzWlNBL1hHNGdYSFJjZEZ4MFpuVnVZM1JwYjI0Z1oyVjBSR1ZtWVhWc2RDZ3BJSHNnY21WMGRYSnVJRzF2WkhWc1pWc25aR1ZtWVhWc2RDZGRPeUI5SURwY2JpQmNkRngwWEhSbWRXNWpkR2x2YmlCblpYUk5iMlIxYkdWRmVIQnZjblJ6S0NrZ2V5QnlaWFIxY200Z2JXOWtkV3hsT3lCOU8xeHVJRngwWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtUW9aMlYwZEdWeUxDQW5ZU2NzSUdkbGRIUmxjaWs3WEc0Z1hIUmNkSEpsZEhWeWJpQm5aWFIwWlhJN1hHNGdYSFI5TzF4dVhHNGdYSFF2THlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd4Y2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YnlBOUlHWjFibU4wYVc5dUtHOWlhbVZqZEN3Z2NISnZjR1Z5ZEhrcElIc2djbVYwZFhKdUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHZZbXBsWTNRc0lIQnliM0JsY25SNUtUc2dmVHRjYmx4dUlGeDBMeThnWDE5M1pXSndZV05yWDNCMVlteHBZMTl3WVhSb1gxOWNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNDQTlJRndpWENJN1hHNWNibHh1SUZ4MEx5OGdURzloWkNCbGJuUnllU0J0YjJSMWJHVWdZVzVrSUhKbGRIVnliaUJsZUhCdmNuUnpYRzRnWEhSeVpYUjFjbTRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHloZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuTWdQU0JjSWk0dmMzSmpMMnB6TDNOamNtbHdkQzVxYzF3aUtUdGNiaUlzSW5aaGNpQm5iRzlpWVd3Z1BWeHVJQ0FvZEhsd1pXOW1JR2RzYjJKaGJGUm9hWE1nSVQwOUlDZDFibVJsWm1sdVpXUW5JQ1ltSUdkc2IySmhiRlJvYVhNcElIeDhYRzRnSUNoMGVYQmxiMllnYzJWc1ppQWhQVDBnSjNWdVpHVm1hVzVsWkNjZ0ppWWdjMlZzWmlrZ2ZIeGNiaUFnS0hSNWNHVnZaaUJuYkc5aVlXd2dJVDA5SUNkMWJtUmxabWx1WldRbklDWW1JR2RzYjJKaGJDbGNibHh1ZG1GeUlITjFjSEJ2Y25RZ1BTQjdYRzRnSUhObFlYSmphRkJoY21GdGN6b2dKMVZTVEZObFlYSmphRkJoY21GdGN5Y2dhVzRnWjJ4dlltRnNMRnh1SUNCcGRHVnlZV0pzWlRvZ0oxTjViV0p2YkNjZ2FXNGdaMnh2WW1Gc0lDWW1JQ2RwZEdWeVlYUnZjaWNnYVc0Z1UzbHRZbTlzTEZ4dUlDQmliRzlpT2x4dUlDQWdJQ2RHYVd4bFVtVmhaR1Z5SnlCcGJpQm5iRzlpWVd3Z0ppWmNiaUFnSUNBblFteHZZaWNnYVc0Z1oyeHZZbUZzSUNZbVhHNGdJQ0FnS0daMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJQ0FnYm1WM0lFSnNiMklvS1Z4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZEhKMVpWeHVJQ0FnSUNBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdabUZzYzJWY2JpQWdJQ0FnSUgxY2JpQWdJQ0I5S1NncExGeHVJQ0JtYjNKdFJHRjBZVG9nSjBadmNtMUVZWFJoSnlCcGJpQm5iRzlpWVd3c1hHNGdJR0Z5Y21GNVFuVm1abVZ5T2lBblFYSnlZWGxDZFdabVpYSW5JR2x1SUdkc2IySmhiRnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnBjMFJoZEdGV2FXVjNLRzlpYWlrZ2UxeHVJQ0J5WlhSMWNtNGdiMkpxSUNZbUlFUmhkR0ZXYVdWM0xuQnliM1J2ZEhsd1pTNXBjMUJ5YjNSdmRIbHdaVTltS0c5aWFpbGNibjFjYmx4dWFXWWdLSE4xY0hCdmNuUXVZWEp5WVhsQ2RXWm1aWElwSUh0Y2JpQWdkbUZ5SUhacFpYZERiR0Z6YzJWeklEMGdXMXh1SUNBZ0lDZGJiMkpxWldOMElFbHVkRGhCY25KaGVWMG5MRnh1SUNBZ0lDZGJiMkpxWldOMElGVnBiblE0UVhKeVlYbGRKeXhjYmlBZ0lDQW5XMjlpYW1WamRDQlZhVzUwT0VOc1lXMXdaV1JCY25KaGVWMG5MRnh1SUNBZ0lDZGJiMkpxWldOMElFbHVkREUyUVhKeVlYbGRKeXhjYmlBZ0lDQW5XMjlpYW1WamRDQlZhVzUwTVRaQmNuSmhlVjBuTEZ4dUlDQWdJQ2RiYjJKcVpXTjBJRWx1ZERNeVFYSnlZWGxkSnl4Y2JpQWdJQ0FuVzI5aWFtVmpkQ0JWYVc1ME16SkJjbkpoZVYwbkxGeHVJQ0FnSUNkYmIySnFaV04wSUVac2IyRjBNekpCY25KaGVWMG5MRnh1SUNBZ0lDZGJiMkpxWldOMElFWnNiMkYwTmpSQmNuSmhlVjBuWEc0Z0lGMWNibHh1SUNCMllYSWdhWE5CY25KaGVVSjFabVpsY2xacFpYY2dQVnh1SUNBZ0lFRnljbUY1UW5WbVptVnlMbWx6Vm1sbGR5QjhmRnh1SUNBZ0lHWjFibU4wYVc5dUtHOWlhaWtnZTF4dUlDQWdJQ0FnY21WMGRYSnVJRzlpYWlBbUppQjJhV1YzUTJ4aGMzTmxjeTVwYm1SbGVFOW1LRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVkRzlUZEhKcGJtY3VZMkZzYkNodlltb3BLU0ErSUMweFhHNGdJQ0FnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ1YjNKdFlXeHBlbVZPWVcxbEtHNWhiV1VwSUh0Y2JpQWdhV1lnS0hSNWNHVnZaaUJ1WVcxbElDRTlQU0FuYzNSeWFXNW5KeWtnZTF4dUlDQWdJRzVoYldVZ1BTQlRkSEpwYm1jb2JtRnRaU2xjYmlBZ2ZWeHVJQ0JwWmlBb0wxdGVZUzE2TUMwNVhGd3RJeVFsSmljcUt5NWVYMkI4ZmlGZEwya3VkR1Z6ZENodVlXMWxLU0I4ZkNCdVlXMWxJRDA5UFNBbkp5a2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9KMGx1ZG1Gc2FXUWdZMmhoY21GamRHVnlJR2x1SUdobFlXUmxjaUJtYVdWc1pDQnVZVzFsSnlsY2JpQWdmVnh1SUNCeVpYUjFjbTRnYm1GdFpTNTBiMHh2ZDJWeVEyRnpaU2dwWEc1OVhHNWNibVoxYm1OMGFXOXVJRzV2Y20xaGJHbDZaVlpoYkhWbEtIWmhiSFZsS1NCN1hHNGdJR2xtSUNoMGVYQmxiMllnZG1Gc2RXVWdJVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnZG1Gc2RXVWdQU0JUZEhKcGJtY29kbUZzZFdVcFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhaaGJIVmxYRzU5WEc1Y2JpOHZJRUoxYVd4a0lHRWdaR1Z6ZEhKMVkzUnBkbVVnYVhSbGNtRjBiM0lnWm05eUlIUm9aU0IyWVd4MVpTQnNhWE4wWEc1bWRXNWpkR2x2YmlCcGRHVnlZWFJ2Y2tadmNpaHBkR1Z0Y3lrZ2UxeHVJQ0IyWVhJZ2FYUmxjbUYwYjNJZ1BTQjdYRzRnSUNBZ2JtVjRkRG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNCMllYSWdkbUZzZFdVZ1BTQnBkR1Z0Y3k1emFHbG1kQ2dwWEc0Z0lDQWdJQ0J5WlhSMWNtNGdlMlJ2Ym1VNklIWmhiSFZsSUQwOVBTQjFibVJsWm1sdVpXUXNJSFpoYkhWbE9pQjJZV3gxWlgxY2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCcFppQW9jM1Z3Y0c5eWRDNXBkR1Z5WVdKc1pTa2dlMXh1SUNBZ0lHbDBaWEpoZEc5eVcxTjViV0p2YkM1cGRHVnlZWFJ2Y2wwZ1BTQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnBkR1Z5WVhSdmNseHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCcGRHVnlZWFJ2Y2x4dWZWeHVYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdTR1ZoWkdWeWN5aG9aV0ZrWlhKektTQjdYRzRnSUhSb2FYTXViV0Z3SUQwZ2UzMWNibHh1SUNCcFppQW9hR1ZoWkdWeWN5QnBibk4wWVc1alpXOW1JRWhsWVdSbGNuTXBJSHRjYmlBZ0lDQm9aV0ZrWlhKekxtWnZja1ZoWTJnb1puVnVZM1JwYjI0b2RtRnNkV1VzSUc1aGJXVXBJSHRjYmlBZ0lDQWdJSFJvYVhNdVlYQndaVzVrS0c1aGJXVXNJSFpoYkhWbEtWeHVJQ0FnSUgwc0lIUm9hWE1wWEc0Z0lIMGdaV3h6WlNCcFppQW9RWEp5WVhrdWFYTkJjbkpoZVNob1pXRmtaWEp6S1NrZ2UxeHVJQ0FnSUdobFlXUmxjbk11Wm05eVJXRmphQ2htZFc1amRHbHZiaWhvWldGa1pYSXBJSHRjYmlBZ0lDQWdJSFJvYVhNdVlYQndaVzVrS0dobFlXUmxjbHN3WFN3Z2FHVmhaR1Z5V3pGZEtWeHVJQ0FnSUgwc0lIUm9hWE1wWEc0Z0lIMGdaV3h6WlNCcFppQW9hR1ZoWkdWeWN5a2dlMXh1SUNBZ0lFOWlhbVZqZEM1blpYUlBkMjVRY205d1pYSjBlVTVoYldWektHaGxZV1JsY25NcExtWnZja1ZoWTJnb1puVnVZM1JwYjI0b2JtRnRaU2tnZTF4dUlDQWdJQ0FnZEdocGN5NWhjSEJsYm1Rb2JtRnRaU3dnYUdWaFpHVnljMXR1WVcxbFhTbGNiaUFnSUNCOUxDQjBhR2x6S1Z4dUlDQjlYRzU5WEc1Y2JraGxZV1JsY25NdWNISnZkRzkwZVhCbExtRndjR1Z1WkNBOUlHWjFibU4wYVc5dUtHNWhiV1VzSUhaaGJIVmxLU0I3WEc0Z0lHNWhiV1VnUFNCdWIzSnRZV3hwZW1WT1lXMWxLRzVoYldVcFhHNGdJSFpoYkhWbElEMGdibTl5YldGc2FYcGxWbUZzZFdVb2RtRnNkV1VwWEc0Z0lIWmhjaUJ2YkdSV1lXeDFaU0E5SUhSb2FYTXViV0Z3VzI1aGJXVmRYRzRnSUhSb2FYTXViV0Z3VzI1aGJXVmRJRDBnYjJ4a1ZtRnNkV1VnUHlCdmJHUldZV3gxWlNBcklDY3NJQ2NnS3lCMllXeDFaU0E2SUhaaGJIVmxYRzU5WEc1Y2JraGxZV1JsY25NdWNISnZkRzkwZVhCbFd5ZGtaV3hsZEdVblhTQTlJR1oxYm1OMGFXOXVLRzVoYldVcElIdGNiaUFnWkdWc1pYUmxJSFJvYVhNdWJXRndXMjV2Y20xaGJHbDZaVTVoYldVb2JtRnRaU2xkWEc1OVhHNWNia2hsWVdSbGNuTXVjSEp2ZEc5MGVYQmxMbWRsZENBOUlHWjFibU4wYVc5dUtHNWhiV1VwSUh0Y2JpQWdibUZ0WlNBOUlHNXZjbTFoYkdsNlpVNWhiV1VvYm1GdFpTbGNiaUFnY21WMGRYSnVJSFJvYVhNdWFHRnpLRzVoYldVcElEOGdkR2hwY3k1dFlYQmJibUZ0WlYwZ09pQnVkV3hzWEc1OVhHNWNia2hsWVdSbGNuTXVjSEp2ZEc5MGVYQmxMbWhoY3lBOUlHWjFibU4wYVc5dUtHNWhiV1VwSUh0Y2JpQWdjbVYwZFhKdUlIUm9hWE11YldGd0xtaGhjMDkzYmxCeWIzQmxjblI1S0c1dmNtMWhiR2w2WlU1aGJXVW9ibUZ0WlNrcFhHNTlYRzVjYmtobFlXUmxjbk11Y0hKdmRHOTBlWEJsTG5ObGRDQTlJR1oxYm1OMGFXOXVLRzVoYldVc0lIWmhiSFZsS1NCN1hHNGdJSFJvYVhNdWJXRndXMjV2Y20xaGJHbDZaVTVoYldVb2JtRnRaU2xkSUQwZ2JtOXliV0ZzYVhwbFZtRnNkV1VvZG1Gc2RXVXBYRzU5WEc1Y2JraGxZV1JsY25NdWNISnZkRzkwZVhCbExtWnZja1ZoWTJnZ1BTQm1kVzVqZEdsdmJpaGpZV3hzWW1GamF5d2dkR2hwYzBGeVp5a2dlMXh1SUNCbWIzSWdLSFpoY2lCdVlXMWxJR2x1SUhSb2FYTXViV0Z3S1NCN1hHNGdJQ0FnYVdZZ0tIUm9hWE11YldGd0xtaGhjMDkzYmxCeWIzQmxjblI1S0c1aGJXVXBLU0I3WEc0Z0lDQWdJQ0JqWVd4c1ltRmpheTVqWVd4c0tIUm9hWE5CY21jc0lIUm9hWE11YldGd1cyNWhiV1ZkTENCdVlXMWxMQ0IwYUdsektWeHVJQ0FnSUgxY2JpQWdmVnh1ZlZ4dVhHNUlaV0ZrWlhKekxuQnliM1J2ZEhsd1pTNXJaWGx6SUQwZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUhaaGNpQnBkR1Z0Y3lBOUlGdGRYRzRnSUhSb2FYTXVabTl5UldGamFDaG1kVzVqZEdsdmJpaDJZV3gxWlN3Z2JtRnRaU2tnZTF4dUlDQWdJR2wwWlcxekxuQjFjMmdvYm1GdFpTbGNiaUFnZlNsY2JpQWdjbVYwZFhKdUlHbDBaWEpoZEc5eVJtOXlLR2wwWlcxektWeHVmVnh1WEc1SVpXRmtaWEp6TG5CeWIzUnZkSGx3WlM1MllXeDFaWE1nUFNCbWRXNWpkR2x2YmlncElIdGNiaUFnZG1GeUlHbDBaVzF6SUQwZ1cxMWNiaUFnZEdocGN5NW1iM0pGWVdOb0tHWjFibU4wYVc5dUtIWmhiSFZsS1NCN1hHNGdJQ0FnYVhSbGJYTXVjSFZ6YUNoMllXeDFaU2xjYmlBZ2ZTbGNiaUFnY21WMGRYSnVJR2wwWlhKaGRHOXlSbTl5S0dsMFpXMXpLVnh1ZlZ4dVhHNUlaV0ZrWlhKekxuQnliM1J2ZEhsd1pTNWxiblJ5YVdWeklEMGdablZ1WTNScGIyNG9LU0I3WEc0Z0lIWmhjaUJwZEdWdGN5QTlJRnRkWEc0Z0lIUm9hWE11Wm05eVJXRmphQ2htZFc1amRHbHZiaWgyWVd4MVpTd2dibUZ0WlNrZ2UxeHVJQ0FnSUdsMFpXMXpMbkIxYzJnb1cyNWhiV1VzSUhaaGJIVmxYU2xjYmlBZ2ZTbGNiaUFnY21WMGRYSnVJR2wwWlhKaGRHOXlSbTl5S0dsMFpXMXpLVnh1ZlZ4dVhHNXBaaUFvYzNWd2NHOXlkQzVwZEdWeVlXSnNaU2tnZTF4dUlDQklaV0ZrWlhKekxuQnliM1J2ZEhsd1pWdFRlVzFpYjJ3dWFYUmxjbUYwYjNKZElEMGdTR1ZoWkdWeWN5NXdjbTkwYjNSNWNHVXVaVzUwY21sbGMxeHVmVnh1WEc1bWRXNWpkR2x2YmlCamIyNXpkVzFsWkNoaWIyUjVLU0I3WEc0Z0lHbG1JQ2hpYjJSNUxtSnZaSGxWYzJWa0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUZCeWIyMXBjMlV1Y21WcVpXTjBLRzVsZHlCVWVYQmxSWEp5YjNJb0owRnNjbVZoWkhrZ2NtVmhaQ2NwS1Z4dUlDQjlYRzRnSUdKdlpIa3VZbTlrZVZWelpXUWdQU0IwY25WbFhHNTlYRzVjYm1aMWJtTjBhVzl1SUdacGJHVlNaV0ZrWlhKU1pXRmtlU2h5WldGa1pYSXBJSHRjYmlBZ2NtVjBkWEp1SUc1bGR5QlFjbTl0YVhObEtHWjFibU4wYVc5dUtISmxjMjlzZG1Vc0lISmxhbVZqZENrZ2UxeHVJQ0FnSUhKbFlXUmxjaTV2Ym14dllXUWdQU0JtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUhKbGMyOXNkbVVvY21WaFpHVnlMbkpsYzNWc2RDbGNiaUFnSUNCOVhHNGdJQ0FnY21WaFpHVnlMbTl1WlhKeWIzSWdQU0JtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUhKbGFtVmpkQ2h5WldGa1pYSXVaWEp5YjNJcFhHNGdJQ0FnZlZ4dUlDQjlLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlaV0ZrUW14dllrRnpRWEp5WVhsQ2RXWm1aWElvWW14dllpa2dlMXh1SUNCMllYSWdjbVZoWkdWeUlEMGdibVYzSUVacGJHVlNaV0ZrWlhJb0tWeHVJQ0IyWVhJZ2NISnZiV2x6WlNBOUlHWnBiR1ZTWldGa1pYSlNaV0ZrZVNoeVpXRmtaWElwWEc0Z0lISmxZV1JsY2k1eVpXRmtRWE5CY25KaGVVSjFabVpsY2loaWJHOWlLVnh1SUNCeVpYUjFjbTRnY0hKdmJXbHpaVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnlaV0ZrUW14dllrRnpWR1Y0ZENoaWJHOWlLU0I3WEc0Z0lIWmhjaUJ5WldGa1pYSWdQU0J1WlhjZ1JtbHNaVkpsWVdSbGNpZ3BYRzRnSUhaaGNpQndjbTl0YVhObElEMGdabWxzWlZKbFlXUmxjbEpsWVdSNUtISmxZV1JsY2lsY2JpQWdjbVZoWkdWeUxuSmxZV1JCYzFSbGVIUW9ZbXh2WWlsY2JpQWdjbVYwZFhKdUlIQnliMjFwYzJWY2JuMWNibHh1Wm5WdVkzUnBiMjRnY21WaFpFRnljbUY1UW5WbVptVnlRWE5VWlhoMEtHSjFaaWtnZTF4dUlDQjJZWElnZG1sbGR5QTlJRzVsZHlCVmFXNTBPRUZ5Y21GNUtHSjFaaWxjYmlBZ2RtRnlJR05vWVhKeklEMGdibVYzSUVGeWNtRjVLSFpwWlhjdWJHVnVaM1JvS1Z4dVhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnZG1sbGR5NXNaVzVuZEdnN0lHa3JLeWtnZTF4dUlDQWdJR05vWVhKelcybGRJRDBnVTNSeWFXNW5MbVp5YjIxRGFHRnlRMjlrWlNoMmFXVjNXMmxkS1Z4dUlDQjlYRzRnSUhKbGRIVnliaUJqYUdGeWN5NXFiMmx1S0NjbktWeHVmVnh1WEc1bWRXNWpkR2x2YmlCaWRXWm1aWEpEYkc5dVpTaGlkV1lwSUh0Y2JpQWdhV1lnS0dKMVppNXpiR2xqWlNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJpZFdZdWMyeHBZMlVvTUNsY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCMllYSWdkbWxsZHlBOUlHNWxkeUJWYVc1ME9FRnljbUY1S0dKMVppNWllWFJsVEdWdVozUm9LVnh1SUNBZ0lIWnBaWGN1YzJWMEtHNWxkeUJWYVc1ME9FRnljbUY1S0dKMVppa3BYRzRnSUNBZ2NtVjBkWEp1SUhacFpYY3VZblZtWm1WeVhHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdRbTlrZVNncElIdGNiaUFnZEdocGN5NWliMlI1VlhObFpDQTlJR1poYkhObFhHNWNiaUFnZEdocGN5NWZhVzVwZEVKdlpIa2dQU0JtZFc1amRHbHZiaWhpYjJSNUtTQjdYRzRnSUNBZ0x5cGNiaUFnSUNBZ0lHWmxkR05vTFcxdlkyc2dkM0poY0hNZ2RHaGxJRkpsYzNCdmJuTmxJRzlpYW1WamRDQnBiaUJoYmlCRlV6WWdVSEp2ZUhrZ2RHOWNiaUFnSUNBZ0lIQnliM1pwWkdVZ2RYTmxablZzSUhSbGMzUWdhR0Z5Ym1WemN5Qm1aV0YwZFhKbGN5QnpkV05vSUdGeklHWnNkWE5vTGlCSWIzZGxkbVZ5TENCdmJseHVJQ0FnSUNBZ1JWTTFJR0p5YjNkelpYSnpJSGRwZEdodmRYUWdabVYwWTJnZ2IzSWdVSEp2ZUhrZ2MzVndjRzl5ZENCd2IyeHNlV1pwYkd4eklHMTFjM1FnWW1VZ2RYTmxaRHRjYmlBZ0lDQWdJSFJvWlNCd2NtOTRlUzF3YjJ4c2VXWnBiR3dnYVhNZ2RXNWhZbXhsSUhSdklIQnliM2g1SUdGdUlHRjBkSEpwWW5WMFpTQjFibXhsYzNNZ2FYUWdaWGhwYzNSelhHNGdJQ0FnSUNCdmJpQjBhR1VnYjJKcVpXTjBJR0psWm05eVpTQjBhR1VnVUhKdmVIa2dhWE1nWTNKbFlYUmxaQzRnVkdocGN5QmphR0Z1WjJVZ1pXNXpkWEpsYzF4dUlDQWdJQ0FnVW1WemNHOXVjMlV1WW05a2VWVnpaV1FnWlhocGMzUnpJRzl1SUhSb1pTQnBibk4wWVc1alpTd2dkMmhwYkdVZ2JXRnBiblJoYVc1cGJtY2dkR2hsWEc0Z0lDQWdJQ0J6WlcxaGJuUnBZeUJ2WmlCelpYUjBhVzVuSUZKbGNYVmxjM1F1WW05a2VWVnpaV1FnYVc0Z2RHaGxJR052Ym5OMGNuVmpkRzl5SUdKbFptOXlaVnh1SUNBZ0lDQWdYMmx1YVhSQ2IyUjVJR2x6SUdOaGJHeGxaQzVjYmlBZ0lDQXFMMXh1SUNBZ0lIUm9hWE11WW05a2VWVnpaV1FnUFNCMGFHbHpMbUp2WkhsVmMyVmtYRzRnSUNBZ2RHaHBjeTVmWW05a2VVbHVhWFFnUFNCaWIyUjVYRzRnSUNBZ2FXWWdLQ0ZpYjJSNUtTQjdYRzRnSUNBZ0lDQjBhR2x6TGw5aWIyUjVWR1Y0ZENBOUlDY25YRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaDBlWEJsYjJZZ1ltOWtlU0E5UFQwZ0ozTjBjbWx1WnljcElIdGNiaUFnSUNBZ0lIUm9hWE11WDJKdlpIbFVaWGgwSUQwZ1ltOWtlVnh1SUNBZ0lIMGdaV3h6WlNCcFppQW9jM1Z3Y0c5eWRDNWliRzlpSUNZbUlFSnNiMkl1Y0hKdmRHOTBlWEJsTG1selVISnZkRzkwZVhCbFQyWW9ZbTlrZVNrcElIdGNiaUFnSUNBZ0lIUm9hWE11WDJKdlpIbENiRzlpSUQwZ1ltOWtlVnh1SUNBZ0lIMGdaV3h6WlNCcFppQW9jM1Z3Y0c5eWRDNW1iM0p0UkdGMFlTQW1KaUJHYjNKdFJHRjBZUzV3Y205MGIzUjVjR1V1YVhOUWNtOTBiM1I1Y0dWUFppaGliMlI1S1NrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTVmWW05a2VVWnZjbTFFWVhSaElEMGdZbTlrZVZ4dUlDQWdJSDBnWld4elpTQnBaaUFvYzNWd2NHOXlkQzV6WldGeVkyaFFZWEpoYlhNZ0ppWWdWVkpNVTJWaGNtTm9VR0Z5WVcxekxuQnliM1J2ZEhsd1pTNXBjMUJ5YjNSdmRIbHdaVTltS0dKdlpIa3BLU0I3WEc0Z0lDQWdJQ0IwYUdsekxsOWliMlI1VkdWNGRDQTlJR0p2WkhrdWRHOVRkSEpwYm1jb0tWeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb2MzVndjRzl5ZEM1aGNuSmhlVUoxWm1abGNpQW1KaUJ6ZFhCd2IzSjBMbUpzYjJJZ0ppWWdhWE5FWVhSaFZtbGxkeWhpYjJSNUtTa2dlMXh1SUNBZ0lDQWdkR2hwY3k1ZlltOWtlVUZ5Y21GNVFuVm1abVZ5SUQwZ1luVm1abVZ5UTJ4dmJtVW9ZbTlrZVM1aWRXWm1aWElwWEc0Z0lDQWdJQ0F2THlCSlJTQXhNQzB4TVNCallXNG5kQ0JvWVc1a2JHVWdZU0JFWVhSaFZtbGxkeUJpYjJSNUxseHVJQ0FnSUNBZ2RHaHBjeTVmWW05a2VVbHVhWFFnUFNCdVpYY2dRbXh2WWloYmRHaHBjeTVmWW05a2VVRnljbUY1UW5WbVptVnlYU2xjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLSE4xY0hCdmNuUXVZWEp5WVhsQ2RXWm1aWElnSmlZZ0tFRnljbUY1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzVwYzFCeWIzUnZkSGx3WlU5bUtHSnZaSGtwSUh4OElHbHpRWEp5WVhsQ2RXWm1aWEpXYVdWM0tHSnZaSGtwS1NrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTVmWW05a2VVRnljbUY1UW5WbVptVnlJRDBnWW5WbVptVnlRMnh2Ym1Vb1ltOWtlU2xjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2RHaHBjeTVmWW05a2VWUmxlSFFnUFNCaWIyUjVJRDBnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzUwYjFOMGNtbHVaeTVqWVd4c0tHSnZaSGtwWEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0NGMGFHbHpMbWhsWVdSbGNuTXVaMlYwS0NkamIyNTBaVzUwTFhSNWNHVW5LU2tnZTF4dUlDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCaWIyUjVJRDA5UFNBbmMzUnlhVzVuSnlrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1obFlXUmxjbk11YzJWMEtDZGpiMjUwWlc1MExYUjVjR1VuTENBbmRHVjRkQzl3YkdGcGJqdGphR0Z5YzJWMFBWVlVSaTA0SnlsY2JpQWdJQ0FnSUgwZ1pXeHpaU0JwWmlBb2RHaHBjeTVmWW05a2VVSnNiMklnSmlZZ2RHaHBjeTVmWW05a2VVSnNiMkl1ZEhsd1pTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtaGxZV1JsY25NdWMyVjBLQ2RqYjI1MFpXNTBMWFI1Y0dVbkxDQjBhR2x6TGw5aWIyUjVRbXh2WWk1MGVYQmxLVnh1SUNBZ0lDQWdmU0JsYkhObElHbG1JQ2h6ZFhCd2IzSjBMbk5sWVhKamFGQmhjbUZ0Y3lBbUppQlZVa3hUWldGeVkyaFFZWEpoYlhNdWNISnZkRzkwZVhCbExtbHpVSEp2ZEc5MGVYQmxUMllvWW05a2VTa3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NW9aV0ZrWlhKekxuTmxkQ2duWTI5dWRHVnVkQzEwZVhCbEp5d2dKMkZ3Y0d4cFkyRjBhVzl1TDNndGQzZDNMV1p2Y20wdGRYSnNaVzVqYjJSbFpEdGphR0Z5YzJWMFBWVlVSaTA0SnlsY2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCcFppQW9jM1Z3Y0c5eWRDNWliRzlpS1NCN1hHNGdJQ0FnZEdocGN5NWliRzlpSUQwZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQjJZWElnY21WcVpXTjBaV1FnUFNCamIyNXpkVzFsWkNoMGFHbHpLVnh1SUNBZ0lDQWdhV1lnS0hKbGFtVmpkR1ZrS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCeVpXcGxZM1JsWkZ4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCcFppQW9kR2hwY3k1ZlltOWtlVUpzYjJJcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlGQnliMjFwYzJVdWNtVnpiMngyWlNoMGFHbHpMbDlpYjJSNVFteHZZaWxjYmlBZ0lDQWdJSDBnWld4elpTQnBaaUFvZEdocGN5NWZZbTlrZVVGeWNtRjVRblZtWm1WeUtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQlFjbTl0YVhObExuSmxjMjlzZG1Vb2JtVjNJRUpzYjJJb1czUm9hWE11WDJKdlpIbEJjbkpoZVVKMVptWmxjbDBwS1Z4dUlDQWdJQ0FnZlNCbGJITmxJR2xtSUNoMGFHbHpMbDlpYjJSNVJtOXliVVJoZEdFcElIdGNiaUFnSUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZGpiM1ZzWkNCdWIzUWdjbVZoWkNCR2IzSnRSR0YwWVNCaWIyUjVJR0Z6SUdKc2IySW5LVnh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlGQnliMjFwYzJVdWNtVnpiMngyWlNodVpYY2dRbXh2WWloYmRHaHBjeTVmWW05a2VWUmxlSFJkS1NsY2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0IwYUdsekxtRnljbUY1UW5WbVptVnlJRDBnWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNCcFppQW9kR2hwY3k1ZlltOWtlVUZ5Y21GNVFuVm1abVZ5S1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJwYzBOdmJuTjFiV1ZrSUQwZ1kyOXVjM1Z0WldRb2RHaHBjeWxjYmlBZ0lDQWdJQ0FnYVdZZ0tHbHpRMjl1YzNWdFpXUXBJSHRjYmlBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYVhORGIyNXpkVzFsWkZ4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lHbG1JQ2hCY25KaGVVSjFabVpsY2k1cGMxWnBaWGNvZEdocGN5NWZZbTlrZVVGeWNtRjVRblZtWm1WeUtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJRY205dGFYTmxMbkpsYzI5c2RtVW9YRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbDlpYjJSNVFYSnlZWGxDZFdabVpYSXVZblZtWm1WeUxuTnNhV05sS0Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOWliMlI1UVhKeVlYbENkV1ptWlhJdVlubDBaVTltWm5ObGRDeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVmWW05a2VVRnljbUY1UW5WbVptVnlMbUo1ZEdWUFptWnpaWFFnS3lCMGFHbHpMbDlpYjJSNVFYSnlZWGxDZFdabVpYSXVZbmwwWlV4bGJtZDBhRnh1SUNBZ0lDQWdJQ0FnSUNBZ0tWeHVJQ0FnSUNBZ0lDQWdJQ2xjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnVUhKdmJXbHpaUzV5WlhOdmJIWmxLSFJvYVhNdVgySnZaSGxCY25KaGVVSjFabVpsY2lsY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVZbXh2WWlncExuUm9aVzRvY21WaFpFSnNiMkpCYzBGeWNtRjVRblZtWm1WeUtWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lIUm9hWE11ZEdWNGRDQTlJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJSFpoY2lCeVpXcGxZM1JsWkNBOUlHTnZibk4xYldWa0tIUm9hWE1wWEc0Z0lDQWdhV1lnS0hKbGFtVmpkR1ZrS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnY21WcVpXTjBaV1JjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvZEdocGN5NWZZbTlrZVVKc2IySXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnlaV0ZrUW14dllrRnpWR1Y0ZENoMGFHbHpMbDlpYjJSNVFteHZZaWxjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLSFJvYVhNdVgySnZaSGxCY25KaGVVSjFabVpsY2lrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUZCeWIyMXBjMlV1Y21WemIyeDJaU2h5WldGa1FYSnlZWGxDZFdabVpYSkJjMVJsZUhRb2RHaHBjeTVmWW05a2VVRnljbUY1UW5WbVptVnlLU2xjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLSFJvYVhNdVgySnZaSGxHYjNKdFJHRjBZU2tnZTF4dUlDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RqYjNWc1pDQnViM1FnY21WaFpDQkdiM0p0UkdGMFlTQmliMlI1SUdGeklIUmxlSFFuS1Z4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z1VISnZiV2x6WlM1eVpYTnZiSFpsS0hSb2FYTXVYMkp2WkhsVVpYaDBLVnh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR2xtSUNoemRYQndiM0owTG1admNtMUVZWFJoS1NCN1hHNGdJQ0FnZEdocGN5NW1iM0p0UkdGMFlTQTlJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdWRHVjRkQ2dwTG5Sb1pXNG9aR1ZqYjJSbEtWeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lIUm9hWE11YW5OdmJpQTlJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TG5SbGVIUW9LUzUwYUdWdUtFcFRUMDR1Y0dGeWMyVXBYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdkR2hwYzF4dWZWeHVYRzR2THlCSVZGUlFJRzFsZEdodlpITWdkMmh2YzJVZ1kyRndhWFJoYkdsNllYUnBiMjRnYzJodmRXeGtJR0psSUc1dmNtMWhiR2w2WldSY2JuWmhjaUJ0WlhSb2IyUnpJRDBnV3lkRVJVeEZWRVVuTENBblIwVlVKeXdnSjBoRlFVUW5MQ0FuVDFCVVNVOU9VeWNzSUNkUVQxTlVKeXdnSjFCVlZDZGRYRzVjYm1aMWJtTjBhVzl1SUc1dmNtMWhiR2w2WlUxbGRHaHZaQ2h0WlhSb2IyUXBJSHRjYmlBZ2RtRnlJSFZ3WTJGelpXUWdQU0J0WlhSb2IyUXVkRzlWY0hCbGNrTmhjMlVvS1Z4dUlDQnlaWFIxY200Z2JXVjBhRzlrY3k1cGJtUmxlRTltS0hWd1kyRnpaV1FwSUQ0Z0xURWdQeUIxY0dOaGMyVmtJRG9nYldWMGFHOWtYRzU5WEc1Y2JtVjRjRzl5ZENCbWRXNWpkR2x2YmlCU1pYRjFaWE4wS0dsdWNIVjBMQ0J2Y0hScGIyNXpLU0I3WEc0Z0lHbG1JQ2doS0hSb2FYTWdhVzV6ZEdGdVkyVnZaaUJTWlhGMVpYTjBLU2tnZTF4dUlDQWdJSFJvY205M0lHNWxkeUJVZVhCbFJYSnliM0lvSjFCc1pXRnpaU0IxYzJVZ2RHaGxJRndpYm1WM1hDSWdiM0JsY21GMGIzSXNJSFJvYVhNZ1JFOU5JRzlpYW1WamRDQmpiMjV6ZEhKMVkzUnZjaUJqWVc1dWIzUWdZbVVnWTJGc2JHVmtJR0Z6SUdFZ1puVnVZM1JwYjI0dUp5bGNiaUFnZlZ4dVhHNGdJRzl3ZEdsdmJuTWdQU0J2Y0hScGIyNXpJSHg4SUh0OVhHNGdJSFpoY2lCaWIyUjVJRDBnYjNCMGFXOXVjeTVpYjJSNVhHNWNiaUFnYVdZZ0tHbHVjSFYwSUdsdWMzUmhibU5sYjJZZ1VtVnhkV1Z6ZENrZ2UxeHVJQ0FnSUdsbUlDaHBibkIxZEM1aWIyUjVWWE5sWkNrZ2UxeHVJQ0FnSUNBZ2RHaHliM2NnYm1WM0lGUjVjR1ZGY25KdmNpZ25RV3h5WldGa2VTQnlaV0ZrSnlsY2JpQWdJQ0I5WEc0Z0lDQWdkR2hwY3k1MWNtd2dQU0JwYm5CMWRDNTFjbXhjYmlBZ0lDQjBhR2x6TG1OeVpXUmxiblJwWVd4eklEMGdhVzV3ZFhRdVkzSmxaR1Z1ZEdsaGJITmNiaUFnSUNCcFppQW9JVzl3ZEdsdmJuTXVhR1ZoWkdWeWN5a2dlMXh1SUNBZ0lDQWdkR2hwY3k1b1pXRmtaWEp6SUQwZ2JtVjNJRWhsWVdSbGNuTW9hVzV3ZFhRdWFHVmhaR1Z5Y3lsY2JpQWdJQ0I5WEc0Z0lDQWdkR2hwY3k1dFpYUm9iMlFnUFNCcGJuQjFkQzV0WlhSb2IyUmNiaUFnSUNCMGFHbHpMbTF2WkdVZ1BTQnBibkIxZEM1dGIyUmxYRzRnSUNBZ2RHaHBjeTV6YVdkdVlXd2dQU0JwYm5CMWRDNXphV2R1WVd4Y2JpQWdJQ0JwWmlBb0lXSnZaSGtnSmlZZ2FXNXdkWFF1WDJKdlpIbEpibWwwSUNFOUlHNTFiR3dwSUh0Y2JpQWdJQ0FnSUdKdlpIa2dQU0JwYm5CMWRDNWZZbTlrZVVsdWFYUmNiaUFnSUNBZ0lHbHVjSFYwTG1KdlpIbFZjMlZrSUQwZ2RISjFaVnh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjBhR2x6TG5WeWJDQTlJRk4wY21sdVp5aHBibkIxZENsY2JpQWdmVnh1WEc0Z0lIUm9hWE11WTNKbFpHVnVkR2xoYkhNZ1BTQnZjSFJwYjI1ekxtTnlaV1JsYm5ScFlXeHpJSHg4SUhSb2FYTXVZM0psWkdWdWRHbGhiSE1nZkh3Z0ozTmhiV1V0YjNKcFoybHVKMXh1SUNCcFppQW9iM0IwYVc5dWN5NW9aV0ZrWlhKeklIeDhJQ0YwYUdsekxtaGxZV1JsY25NcElIdGNiaUFnSUNCMGFHbHpMbWhsWVdSbGNuTWdQU0J1WlhjZ1NHVmhaR1Z5Y3lodmNIUnBiMjV6TG1obFlXUmxjbk1wWEc0Z0lIMWNiaUFnZEdocGN5NXRaWFJvYjJRZ1BTQnViM0p0WVd4cGVtVk5aWFJvYjJRb2IzQjBhVzl1Y3k1dFpYUm9iMlFnZkh3Z2RHaHBjeTV0WlhSb2IyUWdmSHdnSjBkRlZDY3BYRzRnSUhSb2FYTXViVzlrWlNBOUlHOXdkR2x2Ym5NdWJXOWtaU0I4ZkNCMGFHbHpMbTF2WkdVZ2ZId2diblZzYkZ4dUlDQjBhR2x6TG5OcFoyNWhiQ0E5SUc5d2RHbHZibk11YzJsbmJtRnNJSHg4SUhSb2FYTXVjMmxuYm1Gc1hHNGdJSFJvYVhNdWNtVm1aWEp5WlhJZ1BTQnVkV3hzWEc1Y2JpQWdhV1lnS0NoMGFHbHpMbTFsZEdodlpDQTlQVDBnSjBkRlZDY2dmSHdnZEdocGN5NXRaWFJvYjJRZ1BUMDlJQ2RJUlVGRUp5a2dKaVlnWW05a2VTa2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9KMEp2WkhrZ2JtOTBJR0ZzYkc5M1pXUWdabTl5SUVkRlZDQnZjaUJJUlVGRUlISmxjWFZsYzNSekp5bGNiaUFnZlZ4dUlDQjBhR2x6TGw5cGJtbDBRbTlrZVNoaWIyUjVLVnh1WEc0Z0lHbG1JQ2gwYUdsekxtMWxkR2h2WkNBOVBUMGdKMGRGVkNjZ2ZId2dkR2hwY3k1dFpYUm9iMlFnUFQwOUlDZElSVUZFSnlrZ2UxeHVJQ0FnSUdsbUlDaHZjSFJwYjI1ekxtTmhZMmhsSUQwOVBTQW5ibTh0YzNSdmNtVW5JSHg4SUc5d2RHbHZibk11WTJGamFHVWdQVDA5SUNkdWJ5MWpZV05vWlNjcElIdGNiaUFnSUNBZ0lDOHZJRk5sWVhKamFDQm1iM0lnWVNBblh5Y2djR0Z5WVcxbGRHVnlJR2x1SUhSb1pTQnhkV1Z5ZVNCemRISnBibWRjYmlBZ0lDQWdJSFpoY2lCeVpWQmhjbUZ0VTJWaGNtTm9JRDBnTHloYlB5WmRLVjg5VzE0bVhTb3ZYRzRnSUNBZ0lDQnBaaUFvY21WUVlYSmhiVk5sWVhKamFDNTBaWE4wS0hSb2FYTXVkWEpzS1NrZ2UxeHVJQ0FnSUNBZ0lDQXZMeUJKWmlCcGRDQmhiSEpsWVdSNUlHVjRhWE4wY3lCMGFHVnVJSE5sZENCMGFHVWdkbUZzZFdVZ2QybDBhQ0IwYUdVZ1kzVnljbVZ1ZENCMGFXMWxYRzRnSUNBZ0lDQWdJSFJvYVhNdWRYSnNJRDBnZEdocGN5NTFjbXd1Y21Wd2JHRmpaU2h5WlZCaGNtRnRVMlZoY21Ob0xDQW5KREZmUFNjZ0t5QnVaWGNnUkdGMFpTZ3BMbWRsZEZScGJXVW9LU2xjYmlBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQzh2SUU5MGFHVnlkMmx6WlNCaFpHUWdZU0J1WlhjZ0oxOG5JSEJoY21GdFpYUmxjaUIwYnlCMGFHVWdaVzVrSUhkcGRHZ2dkR2hsSUdOMWNuSmxiblFnZEdsdFpWeHVJQ0FnSUNBZ0lDQjJZWElnY21WUmRXVnllVk4wY21sdVp5QTlJQzljWEQ4dlhHNGdJQ0FnSUNBZ0lIUm9hWE11ZFhKc0lDczlJQ2h5WlZGMVpYSjVVM1J5YVc1bkxuUmxjM1FvZEdocGN5NTFjbXdwSUQ4Z0p5WW5JRG9nSno4bktTQXJJQ2RmUFNjZ0t5QnVaWGNnUkdGMFpTZ3BMbWRsZEZScGJXVW9LVnh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnZlZ4dWZWeHVYRzVTWlhGMVpYTjBMbkJ5YjNSdmRIbHdaUzVqYkc5dVpTQTlJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQnlaWFIxY200Z2JtVjNJRkpsY1hWbGMzUW9kR2hwY3l3Z2UySnZaSGs2SUhSb2FYTXVYMkp2WkhsSmJtbDBmU2xjYm4xY2JseHVablZ1WTNScGIyNGdaR1ZqYjJSbEtHSnZaSGtwSUh0Y2JpQWdkbUZ5SUdadmNtMGdQU0J1WlhjZ1JtOXliVVJoZEdFb0tWeHVJQ0JpYjJSNVhHNGdJQ0FnTG5SeWFXMG9LVnh1SUNBZ0lDNXpjR3hwZENnbkppY3BYRzRnSUNBZ0xtWnZja1ZoWTJnb1puVnVZM1JwYjI0b1lubDBaWE1wSUh0Y2JpQWdJQ0FnSUdsbUlDaGllWFJsY3lrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnYzNCc2FYUWdQU0JpZVhSbGN5NXpjR3hwZENnblBTY3BYRzRnSUNBZ0lDQWdJSFpoY2lCdVlXMWxJRDBnYzNCc2FYUXVjMmhwWm5Rb0tTNXlaWEJzWVdObEtDOWNYQ3N2Wnl3Z0p5QW5LVnh1SUNBZ0lDQWdJQ0IyWVhJZ2RtRnNkV1VnUFNCemNHeHBkQzVxYjJsdUtDYzlKeWt1Y21Wd2JHRmpaU2d2WEZ3ckwyY3NJQ2NnSnlsY2JpQWdJQ0FnSUNBZ1ptOXliUzVoY0hCbGJtUW9aR1ZqYjJSbFZWSkpRMjl0Y0c5dVpXNTBLRzVoYldVcExDQmtaV052WkdWVlVrbERiMjF3YjI1bGJuUW9kbUZzZFdVcEtWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwcFhHNGdJSEpsZEhWeWJpQm1iM0p0WEc1OVhHNWNibVoxYm1OMGFXOXVJSEJoY25ObFNHVmhaR1Z5Y3loeVlYZElaV0ZrWlhKektTQjdYRzRnSUhaaGNpQm9aV0ZrWlhKeklEMGdibVYzSUVobFlXUmxjbk1vS1Z4dUlDQXZMeUJTWlhCc1lXTmxJR2x1YzNSaGJtTmxjeUJ2WmlCY1hISmNYRzRnWVc1a0lGeGNiaUJtYjJ4c2IzZGxaQ0JpZVNCaGRDQnNaV0Z6ZENCdmJtVWdjM0JoWTJVZ2IzSWdhRzl5YVhwdmJuUmhiQ0IwWVdJZ2QybDBhQ0JoSUhOd1lXTmxYRzRnSUM4dklHaDBkSEJ6T2k4dmRHOXZiSE11YVdWMFppNXZjbWN2YUhSdGJDOXlabU0zTWpNd0kzTmxZM1JwYjI0dE15NHlYRzRnSUhaaGNpQndjbVZRY205alpYTnpaV1JJWldGa1pYSnpJRDBnY21GM1NHVmhaR1Z5Y3k1eVpYQnNZV05sS0M5Y1hISS9YRnh1VzF4Y2RDQmRLeTluTENBbklDY3BYRzRnSUhCeVpWQnliMk5sYzNObFpFaGxZV1JsY25NdWMzQnNhWFFvTDF4Y2NqOWNYRzR2S1M1bWIzSkZZV05vS0daMWJtTjBhVzl1S0d4cGJtVXBJSHRjYmlBZ0lDQjJZWElnY0dGeWRITWdQU0JzYVc1bExuTndiR2wwS0NjNkp5bGNiaUFnSUNCMllYSWdhMlY1SUQwZ2NHRnlkSE11YzJocFpuUW9LUzUwY21sdEtDbGNiaUFnSUNCcFppQW9hMlY1S1NCN1hHNGdJQ0FnSUNCMllYSWdkbUZzZFdVZ1BTQndZWEowY3k1cWIybHVLQ2M2SnlrdWRISnBiU2dwWEc0Z0lDQWdJQ0JvWldGa1pYSnpMbUZ3Y0dWdVpDaHJaWGtzSUhaaGJIVmxLVnh1SUNBZ0lIMWNiaUFnZlNsY2JpQWdjbVYwZFhKdUlHaGxZV1JsY25OY2JuMWNibHh1UW05a2VTNWpZV3hzS0ZKbGNYVmxjM1F1Y0hKdmRHOTBlWEJsS1Z4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z1VtVnpjRzl1YzJVb1ltOWtlVWx1YVhRc0lHOXdkR2x2Ym5NcElIdGNiaUFnYVdZZ0tDRW9kR2hwY3lCcGJuTjBZVzVqWlc5bUlGSmxjM0J2Ym5ObEtTa2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9KMUJzWldGelpTQjFjMlVnZEdobElGd2libVYzWENJZ2IzQmxjbUYwYjNJc0lIUm9hWE1nUkU5TklHOWlhbVZqZENCamIyNXpkSEoxWTNSdmNpQmpZVzV1YjNRZ1ltVWdZMkZzYkdWa0lHRnpJR0VnWm5WdVkzUnBiMjR1SnlsY2JpQWdmVnh1SUNCcFppQW9JVzl3ZEdsdmJuTXBJSHRjYmlBZ0lDQnZjSFJwYjI1eklEMGdlMzFjYmlBZ2ZWeHVYRzRnSUhSb2FYTXVkSGx3WlNBOUlDZGtaV1poZFd4MEoxeHVJQ0IwYUdsekxuTjBZWFIxY3lBOUlHOXdkR2x2Ym5NdWMzUmhkSFZ6SUQwOVBTQjFibVJsWm1sdVpXUWdQeUF5TURBZ09pQnZjSFJwYjI1ekxuTjBZWFIxYzF4dUlDQjBhR2x6TG05cklEMGdkR2hwY3k1emRHRjBkWE1nUGowZ01qQXdJQ1ltSUhSb2FYTXVjM1JoZEhWeklEd2dNekF3WEc0Z0lIUm9hWE11YzNSaGRIVnpWR1Y0ZENBOUlDZHpkR0YwZFhOVVpYaDBKeUJwYmlCdmNIUnBiMjV6SUQ4Z2IzQjBhVzl1Y3k1emRHRjBkWE5VWlhoMElEb2dKeWRjYmlBZ2RHaHBjeTVvWldGa1pYSnpJRDBnYm1WM0lFaGxZV1JsY25Nb2IzQjBhVzl1Y3k1b1pXRmtaWEp6S1Z4dUlDQjBhR2x6TG5WeWJDQTlJRzl3ZEdsdmJuTXVkWEpzSUh4OElDY25YRzRnSUhSb2FYTXVYMmx1YVhSQ2IyUjVLR0p2WkhsSmJtbDBLVnh1ZlZ4dVhHNUNiMlI1TG1OaGJHd29VbVZ6Y0c5dWMyVXVjSEp2ZEc5MGVYQmxLVnh1WEc1U1pYTndiMjV6WlM1d2NtOTBiM1I1Y0dVdVkyeHZibVVnUFNCbWRXNWpkR2x2YmlncElIdGNiaUFnY21WMGRYSnVJRzVsZHlCU1pYTndiMjV6WlNoMGFHbHpMbDlpYjJSNVNXNXBkQ3dnZTF4dUlDQWdJSE4wWVhSMWN6b2dkR2hwY3k1emRHRjBkWE1zWEc0Z0lDQWdjM1JoZEhWelZHVjRkRG9nZEdocGN5NXpkR0YwZFhOVVpYaDBMRnh1SUNBZ0lHaGxZV1JsY25NNklHNWxkeUJJWldGa1pYSnpLSFJvYVhNdWFHVmhaR1Z5Y3lrc1hHNGdJQ0FnZFhKc09pQjBhR2x6TG5WeWJGeHVJQ0I5S1Z4dWZWeHVYRzVTWlhOd2IyNXpaUzVsY25KdmNpQTlJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQjJZWElnY21WemNHOXVjMlVnUFNCdVpYY2dVbVZ6Y0c5dWMyVW9iblZzYkN3Z2UzTjBZWFIxY3pvZ01Dd2djM1JoZEhWelZHVjRkRG9nSnlkOUtWeHVJQ0J5WlhOd2IyNXpaUzUwZVhCbElEMGdKMlZ5Y205eUoxeHVJQ0J5WlhSMWNtNGdjbVZ6Y0c5dWMyVmNibjFjYmx4dWRtRnlJSEpsWkdseVpXTjBVM1JoZEhWelpYTWdQU0JiTXpBeExDQXpNRElzSURNd015d2dNekEzTENBek1EaGRYRzVjYmxKbGMzQnZibk5sTG5KbFpHbHlaV04wSUQwZ1puVnVZM1JwYjI0b2RYSnNMQ0J6ZEdGMGRYTXBJSHRjYmlBZ2FXWWdLSEpsWkdseVpXTjBVM1JoZEhWelpYTXVhVzVrWlhoUFppaHpkR0YwZFhNcElEMDlQU0F0TVNrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCU1lXNW5aVVZ5Y205eUtDZEpiblpoYkdsa0lITjBZWFIxY3lCamIyUmxKeWxjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJ1WlhjZ1VtVnpjRzl1YzJVb2JuVnNiQ3dnZTNOMFlYUjFjem9nYzNSaGRIVnpMQ0JvWldGa1pYSnpPaUI3Ykc5allYUnBiMjQ2SUhWeWJIMTlLVnh1ZlZ4dVhHNWxlSEJ2Y25RZ2RtRnlJRVJQVFVWNFkyVndkR2x2YmlBOUlHZHNiMkpoYkM1RVQwMUZlR05sY0hScGIyNWNiblJ5ZVNCN1hHNGdJRzVsZHlCRVQwMUZlR05sY0hScGIyNG9LVnh1ZlNCallYUmphQ0FvWlhKeUtTQjdYRzRnSUVSUFRVVjRZMlZ3ZEdsdmJpQTlJR1oxYm1OMGFXOXVLRzFsYzNOaFoyVXNJRzVoYldVcElIdGNiaUFnSUNCMGFHbHpMbTFsYzNOaFoyVWdQU0J0WlhOellXZGxYRzRnSUNBZ2RHaHBjeTV1WVcxbElEMGdibUZ0WlZ4dUlDQWdJSFpoY2lCbGNuSnZjaUE5SUVWeWNtOXlLRzFsYzNOaFoyVXBYRzRnSUNBZ2RHaHBjeTV6ZEdGamF5QTlJR1Z5Y205eUxuTjBZV05yWEc0Z0lIMWNiaUFnUkU5TlJYaGpaWEIwYVc5dUxuQnliM1J2ZEhsd1pTQTlJRTlpYW1WamRDNWpjbVZoZEdVb1JYSnliM0l1Y0hKdmRHOTBlWEJsS1Z4dUlDQkVUMDFGZUdObGNIUnBiMjR1Y0hKdmRHOTBlWEJsTG1OdmJuTjBjblZqZEc5eUlEMGdSRTlOUlhoalpYQjBhVzl1WEc1OVhHNWNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQm1aWFJqYUNocGJuQjFkQ3dnYVc1cGRDa2dlMXh1SUNCeVpYUjFjbTRnYm1WM0lGQnliMjFwYzJVb1puVnVZM1JwYjI0b2NtVnpiMngyWlN3Z2NtVnFaV04wS1NCN1hHNGdJQ0FnZG1GeUlISmxjWFZsYzNRZ1BTQnVaWGNnVW1WeGRXVnpkQ2hwYm5CMWRDd2dhVzVwZENsY2JseHVJQ0FnSUdsbUlDaHlaWEYxWlhOMExuTnBaMjVoYkNBbUppQnlaWEYxWlhOMExuTnBaMjVoYkM1aFltOXlkR1ZrS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnY21WcVpXTjBLRzVsZHlCRVQwMUZlR05sY0hScGIyNG9KMEZpYjNKMFpXUW5MQ0FuUVdKdmNuUkZjbkp2Y2ljcEtWeHVJQ0FnSUgxY2JseHVJQ0FnSUhaaGNpQjRhSElnUFNCdVpYY2dXRTFNU0hSMGNGSmxjWFZsYzNRb0tWeHVYRzRnSUNBZ1puVnVZM1JwYjI0Z1lXSnZjblJZYUhJb0tTQjdYRzRnSUNBZ0lDQjRhSEl1WVdKdmNuUW9LVnh1SUNBZ0lIMWNibHh1SUNBZ0lIaG9jaTV2Ym14dllXUWdQU0JtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUhaaGNpQnZjSFJwYjI1eklEMGdlMXh1SUNBZ0lDQWdJQ0J6ZEdGMGRYTTZJSGhvY2k1emRHRjBkWE1zWEc0Z0lDQWdJQ0FnSUhOMFlYUjFjMVJsZUhRNklIaG9jaTV6ZEdGMGRYTlVaWGgwTEZ4dUlDQWdJQ0FnSUNCb1pXRmtaWEp6T2lCd1lYSnpaVWhsWVdSbGNuTW9lR2h5TG1kbGRFRnNiRkpsYzNCdmJuTmxTR1ZoWkdWeWN5Z3BJSHg4SUNjbktWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2IzQjBhVzl1Y3k1MWNtd2dQU0FuY21WemNHOXVjMlZWVWt3bklHbHVJSGhvY2lBL0lIaG9jaTV5WlhOd2IyNXpaVlZTVENBNklHOXdkR2x2Ym5NdWFHVmhaR1Z5Y3k1blpYUW9KMWd0VW1WeGRXVnpkQzFWVWt3bktWeHVJQ0FnSUNBZ2RtRnlJR0p2WkhrZ1BTQW5jbVZ6Y0c5dWMyVW5JR2x1SUhob2NpQS9JSGhvY2k1eVpYTndiMjV6WlNBNklIaG9jaTV5WlhOd2IyNXpaVlJsZUhSY2JpQWdJQ0FnSUhObGRGUnBiV1Z2ZFhRb1puVnVZM1JwYjI0b0tTQjdYRzRnSUNBZ0lDQWdJSEpsYzI5c2RtVW9ibVYzSUZKbGMzQnZibk5sS0dKdlpIa3NJRzl3ZEdsdmJuTXBLVnh1SUNBZ0lDQWdmU3dnTUNsY2JpQWdJQ0I5WEc1Y2JpQWdJQ0I0YUhJdWIyNWxjbkp2Y2lBOUlHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdjMlYwVkdsdFpXOTFkQ2htZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2NtVnFaV04wS0c1bGR5QlVlWEJsUlhKeWIzSW9KMDVsZEhkdmNtc2djbVZ4ZFdWemRDQm1ZV2xzWldRbktTbGNiaUFnSUNBZ0lIMHNJREFwWEc0Z0lDQWdmVnh1WEc0Z0lDQWdlR2h5TG05dWRHbHRaVzkxZENBOUlHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdjMlYwVkdsdFpXOTFkQ2htZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2NtVnFaV04wS0c1bGR5QlVlWEJsUlhKeWIzSW9KMDVsZEhkdmNtc2djbVZ4ZFdWemRDQm1ZV2xzWldRbktTbGNiaUFnSUNBZ0lIMHNJREFwWEc0Z0lDQWdmVnh1WEc0Z0lDQWdlR2h5TG05dVlXSnZjblFnUFNCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lITmxkRlJwYldWdmRYUW9ablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGFtVmpkQ2h1WlhjZ1JFOU5SWGhqWlhCMGFXOXVLQ2RCWW05eWRHVmtKeXdnSjBGaWIzSjBSWEp5YjNJbktTbGNiaUFnSUNBZ0lIMHNJREFwWEc0Z0lDQWdmVnh1WEc0Z0lDQWdablZ1WTNScGIyNGdabWw0VlhKc0tIVnliQ2tnZTF4dUlDQWdJQ0FnZEhKNUlIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIVnliQ0E5UFQwZ0p5Y2dKaVlnWjJ4dlltRnNMbXh2WTJGMGFXOXVMbWh5WldZZ1B5Qm5iRzlpWVd3dWJHOWpZWFJwYjI0dWFISmxaaUE2SUhWeWJGeHVJQ0FnSUNBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkWEpzWEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdlR2h5TG05d1pXNG9jbVZ4ZFdWemRDNXRaWFJvYjJRc0lHWnBlRlZ5YkNoeVpYRjFaWE4wTG5WeWJDa3NJSFJ5ZFdVcFhHNWNiaUFnSUNCcFppQW9jbVZ4ZFdWemRDNWpjbVZrWlc1MGFXRnNjeUE5UFQwZ0oybHVZMngxWkdVbktTQjdYRzRnSUNBZ0lDQjRhSEl1ZDJsMGFFTnlaV1JsYm5ScFlXeHpJRDBnZEhKMVpWeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb2NtVnhkV1Z6ZEM1amNtVmtaVzUwYVdGc2N5QTlQVDBnSjI5dGFYUW5LU0I3WEc0Z0lDQWdJQ0I0YUhJdWQybDBhRU55WldSbGJuUnBZV3h6SUQwZ1ptRnNjMlZjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvSjNKbGMzQnZibk5sVkhsd1pTY2dhVzRnZUdoeUtTQjdYRzRnSUNBZ0lDQnBaaUFvYzNWd2NHOXlkQzVpYkc5aUtTQjdYRzRnSUNBZ0lDQWdJSGhvY2k1eVpYTndiMjV6WlZSNWNHVWdQU0FuWW14dllpZGNiaUFnSUNBZ0lIMGdaV3h6WlNCcFppQW9YRzRnSUNBZ0lDQWdJSE4xY0hCdmNuUXVZWEp5WVhsQ2RXWm1aWElnSmlaY2JpQWdJQ0FnSUNBZ2NtVnhkV1Z6ZEM1b1pXRmtaWEp6TG1kbGRDZ25RMjl1ZEdWdWRDMVVlWEJsSnlrZ0ppWmNiaUFnSUNBZ0lDQWdjbVZ4ZFdWemRDNW9aV0ZrWlhKekxtZGxkQ2duUTI5dWRHVnVkQzFVZVhCbEp5a3VhVzVrWlhoUFppZ25ZWEJ3YkdsallYUnBiMjR2YjJOMFpYUXRjM1J5WldGdEp5a2dJVDA5SUMweFhHNGdJQ0FnSUNBcElIdGNiaUFnSUNBZ0lDQWdlR2h5TG5KbGMzQnZibk5sVkhsd1pTQTlJQ2RoY25KaGVXSjFabVpsY2lkY2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0JwWmlBb2FXNXBkQ0FtSmlCMGVYQmxiMllnYVc1cGRDNW9aV0ZrWlhKeklEMDlQU0FuYjJKcVpXTjBKeUFtSmlBaEtHbHVhWFF1YUdWaFpHVnljeUJwYm5OMFlXNWpaVzltSUVobFlXUmxjbk1wS1NCN1hHNGdJQ0FnSUNCUFltcGxZM1F1WjJWMFQzZHVVSEp2Y0dWeWRIbE9ZVzFsY3locGJtbDBMbWhsWVdSbGNuTXBMbVp2Y2tWaFkyZ29ablZ1WTNScGIyNG9ibUZ0WlNrZ2UxeHVJQ0FnSUNBZ0lDQjRhSEl1YzJWMFVtVnhkV1Z6ZEVobFlXUmxjaWh1WVcxbExDQnViM0p0WVd4cGVtVldZV3gxWlNocGJtbDBMbWhsWVdSbGNuTmJibUZ0WlYwcEtWeHVJQ0FnSUNBZ2ZTbGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnY21WeGRXVnpkQzVvWldGa1pYSnpMbVp2Y2tWaFkyZ29ablZ1WTNScGIyNG9kbUZzZFdVc0lHNWhiV1VwSUh0Y2JpQWdJQ0FnSUNBZ2VHaHlMbk5sZEZKbGNYVmxjM1JJWldGa1pYSW9ibUZ0WlN3Z2RtRnNkV1VwWEc0Z0lDQWdJQ0I5S1Z4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNoeVpYRjFaWE4wTG5OcFoyNWhiQ2tnZTF4dUlDQWdJQ0FnY21WeGRXVnpkQzV6YVdkdVlXd3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25ZV0p2Y25RbkxDQmhZbTl5ZEZob2NpbGNibHh1SUNBZ0lDQWdlR2h5TG05dWNtVmhaSGx6ZEdGMFpXTm9ZVzVuWlNBOUlHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdJQ0F2THlCRVQwNUZJQ2h6ZFdOalpYTnpJRzl5SUdaaGFXeDFjbVVwWEc0Z0lDQWdJQ0FnSUdsbUlDaDRhSEl1Y21WaFpIbFRkR0YwWlNBOVBUMGdOQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lISmxjWFZsYzNRdWMybG5ibUZzTG5KbGJXOTJaVVYyWlc1MFRHbHpkR1Z1WlhJb0oyRmliM0owSnl3Z1lXSnZjblJZYUhJcFhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNWNiaUFnSUNCNGFISXVjMlZ1WkNoMGVYQmxiMllnY21WeGRXVnpkQzVmWW05a2VVbHVhWFFnUFQwOUlDZDFibVJsWm1sdVpXUW5JRDhnYm5Wc2JDQTZJSEpsY1hWbGMzUXVYMkp2WkhsSmJtbDBLVnh1SUNCOUtWeHVmVnh1WEc1bVpYUmphQzV3YjJ4NVptbHNiQ0E5SUhSeWRXVmNibHh1YVdZZ0tDRm5iRzlpWVd3dVptVjBZMmdwSUh0Y2JpQWdaMnh2WW1Gc0xtWmxkR05vSUQwZ1ptVjBZMmhjYmlBZ1oyeHZZbUZzTGtobFlXUmxjbk1nUFNCSVpXRmtaWEp6WEc0Z0lHZHNiMkpoYkM1U1pYRjFaWE4wSUQwZ1VtVnhkV1Z6ZEZ4dUlDQm5iRzlpWVd3dVVtVnpjRzl1YzJVZ1BTQlNaWE53YjI1elpWeHVmVnh1SWl3aVkyeGhjM01nUm05eWJVaGhibVJsY2lCN1hISmNibHgwWTI5dWMzUnlkV04wYjNJb1ptOXliU2tnZTF4eVhHNWNkRngwZEdocGN5NW1iM0p0SUQwZ1ptOXliVnh5WEc1Y2RGeDBkR2hwY3k1bWIzSnRRMjl1ZEhKdmJITWdQU0IwYUdsekxtWnZjbTB1Y1hWbGNubFRaV3hsWTNSdmNrRnNiQ2duTG1admNtMHRZMjl1ZEhKdmJDY3BYSEpjYmx4MFhIUjBhR2x6TG1GamRHbHZiaUE5SUhSb2FYTXVabTl5YlM1blpYUkJkSFJ5YVdKMWRHVW9KMkZqZEdsdmJpY3BYSEpjYmx4MFhIUjBhR2x6TG1admNtMUVZWFJoSUQwZ2JtVjNJRVp2Y20xRVlYUmhLSFJvYVhNdVptOXliU2xjY2x4dVhIUmNkSFJvYVhNdVpHRjBZVTlpYWlBOUlIdDlYSEpjYmx4MGZWeHlYRzVjZEhaaGJHbGtZWFJwYjI0b0tTQjdYSEpjYmx4MFhIUmpiMjV6ZENCcGJuWmhiR2xrUm1sbGJHUnpJRDBnVzExY2NseHVYSFJjZEdOdmJuTjBJSEoxYkdWeklEMGdlMXh5WEc1Y2RGeDBYSFJtZFd4c2JtRnRaVG9nZTF4eVhHNWNkRngwWEhSY2RIQmhkSFJsY200NklHNWxkeUJTWldkRmVIQW9KeWhlVzlDd0xkR1AwWkVnTFYxN015dzFNSDBwSnl3Z0oybG5KeWtzWEhKY2JseDBYSFJjZEZ4MFpYSnliM0pOWlhOellXZGxPaUFuWlhKeWIzSWdablZzYkc1aGJXVW5YSEpjYmx4MFhIUmNkSDBzWEhKY2JseDBYSFJjZEdWdFlXbHNPaUI3WEhKY2JseDBYSFJjZEZ4MGNHRjBkR1Z5YmpvZ2JtVjNJRkpsWjBWNGNDZ25XMEV0V2pBdE9TNWZKU3N0WFN0QVcwRXRXakF0T1MxZEt5NHJMbHRCTFZwZGV6SXNOSDBuTENBbmFXY25LU3hjY2x4dVhIUmNkRngwWEhSbGNuSnZjazFsYzNOaFoyVTZJQ2RsY25KdmNpQmxiV0ZwYkNkY2NseHVYSFJjZEZ4MGZTeGNjbHh1WEhSY2RGeDBiV1Z6YzJGblpUb2dlMXh5WEc1Y2RGeDBYSFJjZEhCaGRIUmxjbTQ2SUc1bGR5QlNaV2RGZUhBb0p5aGVXOUN3TGRHUDBaRmRlek1zTlRBd2ZTa25MQ0FuYVdkdEp5a3NYSEpjYmx4MFhIUmNkRngwWlhKeWIzSk5aWE56WVdkbE9pQW5aWEp5YjNJZ2JXVnpjMkZuWlNkY2NseHVYSFJjZEZ4MGZWeHlYRzVjZEZ4MGZWeHlYRzVjY2x4dVhIUmNkSFJvYVhNdVptOXliVVJoZEdFdVptOXlSV0ZqYUNnb2RtRnNMQ0JyWlhrcElEMCtJSHRjY2x4dVhIUmNkRngwYVdZZ0tDRjJZV3d1YldGMFkyZ29jblZzWlhOYmEyVjVYUzV3WVhSMFpYSnVLU2tnZTF4eVhHNWNkRngwWEhSY2RHTnZibk4wSUdWeWNtOXlUV1Z6YzJGblpTQTlJSEoxYkdWelcydGxlVjB1WlhKeWIzSk5aWE56WVdkbFhISmNibHgwWEhSY2RGeDBhVzUyWVd4cFpFWnBaV3hrY3k1d2RYTm9LSHNnYTJWNUxDQmxjbkp2Y2sxbGMzTmhaMlVnZlNrN1hISmNibHgwWEhSY2RIMWNjbHh1WEhSY2RIMHBYSEpjYmx4eVhHNWNkRngwYVdZZ0tHbHVkbUZzYVdSR2FXVnNaSE11YkdWdVozUm9JQ0U5UFNBd0tTQjdYSEpjYmx4MFhIUmNkSFJvYVhNdWMyVjBUbTkwVm1Gc2FXUlRkSGxzWlNocGJuWmhiR2xrUm1sbGJHUnpLVnh5WEc1Y2RGeDBYSFJ5WlhSMWNtNGdabUZzYzJWY2NseHVYSFJjZEgwZ1pXeHpaU0I3WEhKY2JseDBYSFJjZEhSb2FYTXVaMlYwUkdGMFlVOWlhaWdwWEhKY2JseDBYSFJjZEhKbGRIVnliaUIwY25WbFhISmNibHgwWEhSOVhISmNibHgwZlZ4eVhHNWNkR2RsZEVSaGRHRlBZbW9vS1NCN1hISmNibHgwWEhSdVpYY2dSbTl5YlVSaGRHRW9kR2hwY3k1bWIzSnRLUzVtYjNKRllXTm9LQ2gyWVd3c0lHdGxlU2tnUFQ0Z2UxeHlYRzVjZEZ4MFhIUjBhR2x6TG1SaGRHRlBZbXBiYTJWNVhTQTlJSFpoYkZ4eVhHNWNkRngwZlNsY2NseHVYSFI5WEhKY2JseDBjMlZ1WkVadmNtMG9LU0I3WEhKY2JseDBYSFJ5WlhSMWNtNGdabVYwWTJnb2RHaHBjeTVoWTNScGIyNHNJSHRjY2x4dVhIUmNkRngwYldWMGFHOWtPaUFuVUU5VFZDY3NYSEpjYmx4MFhIUmNkR2hsWVdSbGNuTTZJSHRjY2x4dVhIUmNkRngwWEhRblEyOXVkR1Z1ZEMxVWVYQmxKem9nSjJGd2NHeHBZMkYwYVc5dUwycHpiMjRuWEhKY2JseDBYSFJjZEgwc1hISmNibHgwWEhSY2RHSnZaSGs2SUVwVFQwNHVjM1J5YVc1bmFXWjVLSFJvYVhNdVpHRjBZVTlpYWlsY2NseHVYSFJjZEgwcFhISmNibHgwZlZ4eVhHNWNkSEpsYlc5MlpVNXZkRlpoYkdsa1UzUjViR1VvS1NCN1hISmNibHgwWEhSMGFHbHpMbVp2Y20xRGIyNTBjbTlzY3k1bWIzSkZZV05vS0dWc1pXMGdQVDRnZXlCbGJHVnRMbU5zWVhOelRHbHpkQzV5WlcxdmRtVW9KMlp2Y20wdFkyOXVkSEp2YkMwdGJtOTBMWFpoYkdsa0p5a2dmU2xjY2x4dVhIUjlYSEpjYmx4MGMyVjBUbTkwVm1Gc2FXUlRkSGxzWlNocGJuWmhiR2xrUm1sbGJHUnpLU0I3WEhKY2JseDBYSFJwYm5aaGJHbGtSbWxsYkdSekxtWnZja1ZoWTJnb1pXeGxiU0E5UGlCN1hISmNibHgwWEhSY2RIUm9hWE11Wm05eWJTNXhkV1Z5ZVZObGJHVmpkRzl5S0dCcGJuQjFkRnR1WVcxbFBWd2lKSHRsYkdWdExtdGxlWDFjSWwwc0lIUmxlSFJoY21WaFcyNWhiV1U5WENJa2UyVnNaVzB1YTJWNWZWd2lYV0FwWEhKY2JseDBYSFJjZEZ4MExtTnNZWE56VEdsemRDNWhaR1FvSjJadmNtMHRZMjl1ZEhKdmJDMHRibTkwTFhaaGJHbGtKeWs3WEhKY2JseDBYSFI5S1Z4eVhHNWNkSDFjY2x4dVhIUnpkV0p0YVhSR2IzSnRLQ2tnZTF4eVhHNWNkRngwWlhabGJuUXVjSEpsZG1WdWRFUmxabUYxYkhRb0tWeHlYRzVjZEZ4MGRHaHBjeTV5WlcxdmRtVk9iM1JXWVd4cFpGTjBlV3hsS0NsY2NseHVYSFJjZEhKbGRIVnliaUIwYUdsekxuWmhiR2xrWVhScGIyNG9LVnh5WEc1Y2RIMWNjbHh1ZlZ4eVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCR2IzSnRTR0Z1WkdWeUlpd2lhVzF3YjNKMElIUmxjM1JYWldKUUlHWnliMjBnSnk0dmQyVmljQ2RjY2x4dWFXMXdiM0owSUVadmNtMUlZVzVrYkdWeUlHWnliMjBnSnk0dlptOXliVWhoYm1Sc1pYSW5YSEpjYm1sdGNHOXlkQ0JjSW5kb1lYUjNaeTFtWlhSamFGd2lYSEpjYmx4eVhHNTBaWE4wVjJWaVVDaG1kVzVqZEdsdmJpQW9jM1Z3Y0c5eWRDa2dlMXh5WEc1Y2NseHVYSFJwWmlBb2MzVndjRzl5ZENBOVBTQjBjblZsS1NCN1hISmNibHgwWEhSa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2RpYjJSNUp5a3VZMnhoYzNOTWFYTjBMbUZrWkNnbmQyVmljQ2NwWEhKY2JseDBmU0JsYkhObElIdGNjbHh1WEhSY2RHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSjJKdlpIa25LUzVqYkdGemMweHBjM1F1WVdSa0tDZHVieTEzWldKd0p5bGNjbHh1WEhSOVhISmNibjBwWEhKY2JseHlYRzVqYjI1emRDQmlkRzVQY0dWdVJtOXliU0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTV2Y0dWdUxXWnZjbTBuS1Z4eVhHNWpiMjV6ZENCd2IzQjFjQ0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTV3YjNCMWNDY3BYSEpjYm1OdmJuTjBJR1p2Y20wZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdVptOXliU2NwWEhKY2JtTnZibk4wSUhCdmNIVndRMnh2YzJVZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdWNHOXdkWEJmWDJOc2IzTmxKeWxjY2x4dVkyOXVjM1FnY0c5d2RYQk5aWE56WVdkbElEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2lnbkxuQnZjSFZ3TFcxbGMzTmhaMlV0ZDNKaGNDY3BYSEpjYm1OdmJuTjBJSEJ2Y0hWd1RXVnpjMkZuWlZSbGVIUWdQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3VjRzl3ZFhBdGJXVnpjMkZuWlY5ZmRHVjRkQ2NwWEhKY2JtTnZibk4wSUdWeWNtOXlUV1Z6YzJGblpTQTlJQ2RUYjIxbGRHaHBibWNnZDJWdWRDQjNjbTl1Wnk0dUxpZGNjbHh1WTI5dWMzUWdjM1ZqWTJWemMwMWxjM05oWjJVZ1BTQW5WR2hoYm10eklTQlpiM1Z5SUdGd2NHeHBZMkYwYVc5dUlHbHpJR0ZqWTJWd2RHVmtKMXh5WEc1amIyNXpkQ0JzYjJGa1RXVnpjMkZuWlNBOUlDZE1iMkZrYVc1bkxpNHVKMXh5WEc1Y2NseHVZMjl1YzNRZ2RHOW5aMnhsVUc5d2RYQWdQU0FvS1NBOVBpQjdYSEpjYmx4MGNHOXdkWEF1WTJ4aGMzTk1hWE4wTG5SdloyZHNaU2duY0c5d2RYQXRMVzl3Wlc1c2VTY3BYSEpjYm4xY2NseHVYSEpjYm1KMGJrOXdaVzVHYjNKdExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyTnNhV05ySnl3Z0tDa2dQVDRnZTF4eVhHNWNkSFJ2WjJkc1pWQnZjSFZ3S0NsY2NseHVYSFJtYjNKdExuTjBlV3hsTG1ScGMzQnNZWGtnUFNCZ1lteHZZMnRnWEhKY2JuMHBYSEpjYm5CdmNIVndMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMk5zYVdOckp5d2daU0E5UGlCN1hISmNibHgwWTI5dWMzUWdleUIwWVhKblpYUWdmU0E5SUdWY2NseHVYSFJwWmlBb2RHRnlaMlYwTG0xaGRHTm9aWE1vSnk1d2IzQjFjQzF2ZG1WeWJHRjVKeWtnZkh3Z2RHRnlaMlYwTG0xaGRHTm9aWE1vSnk1d2IzQjFjRjlmWTJ4dmMyVW5LU2tnZEc5bloyeGxVRzl3ZFhBb0tUdGNjbHh1ZlNsY2NseHVabTl5YlM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkemRXSnRhWFFuTENBb1pTa2dQVDRnZTF4eVhHNWNkR052Ym5OMElIc2dkR0Z5WjJWMElIMGdQU0JsWEhKY2JseDBZMjl1YzNRZ1ptOXliVWhoYm1Sc1pYSWdQU0J1WlhjZ1JtOXliVWhoYm1Sc1pYSW9kR0Z5WjJWMEtWeHlYRzVjZEdsbUlDaG1iM0p0U0dGdVpHeGxjaTV6ZFdKdGFYUkdiM0p0S0NrcElIdGNjbHh1WEhSY2RIUmhjbWRsZEM1emRIbHNaUzVrYVhOd2JHRjVJRDBnWUc1dmJtVmdYSEpjYmx4MFhIUndiM0IxY0UxbGMzTmhaMlV1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJR0JtYkdWNFlGeHlYRzVjZEZ4MGNHOXdkWEJOWlhOellXZGxWR1Y0ZEM1MFpYaDBRMjl1ZEdWdWRDQTlJR3h2WVdSTlpYTnpZV2RsWEhKY2JseDBYSFJtYjNKdFNHRnVaR3hsY2k1elpXNWtSbTl5YlNncFhISmNibHgwWEhSY2RDNTBhR1Z1S0hKbGMzQnZibk5sSUQwK0lIdGNjbHh1WEhSY2RGeDBYSFJwWmlBb2NtVnpjRzl1YzJVdWMzUmhkSFZ6SUNFOVBTQXlNREFwSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduYzNSaGRIVnpJRzVsZEhkdmNtc2dibTkwSURJd01DY3BYSEpjYmx4MFhIUmNkRngwZEdGeVoyVjBMbkpsYzJWMEtDbGNjbHh1WEhSY2RGeDBYSFJ3YjNCMWNFMWxjM05oWjJWVVpYaDBMblJsZUhSRGIyNTBaVzUwSUQwZ2MzVmpZMlZ6YzAxbGMzTmhaMlZjY2x4dVhIUmNkRngwZlNsY2NseHVYSFJjZEZ4MExtTmhkR05vS0dWeWNpQTlQaUJqYjI1emIyeGxMbXh2WnlobGNuSXBLVnh5WEc1Y2RGeDBYSFF1Wm1sdVlXeHNlU2dvS1NBOVBpQjdYSEpjYmx4MFhIUmNkRngwWTI5dWMzUWdhR2xrWlZCdmNIVndJRDBnYzJWMFZHbHRaVzkxZENnb0tTQTlQaUI3WEhKY2JseDBYSFJjZEZ4MFhIUjBiMmRuYkdWUWIzQjFjQ2dwWEhKY2JseDBYSFJjZEZ4MFhIUndiM0IxY0UxbGMzTmhaMlV1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJR0J1YjI1bFlGeHlYRzVjZEZ4MFhIUmNkRngwWTJ4bFlYSlVhVzFsYjNWMEtHaHBaR1ZRYjNCMWNDbGNjbHh1WEhSY2RGeDBYSFI5TENBek1EQXdLVnh5WEc1Y2RGeDBYSFI5S1Z4eVhHNWNkSDFjY2x4dWZTa2lMQ0ptZFc1amRHbHZiaUIwWlhOMFYyVmlVQ2hqWVd4c1ltRmpheWtnZTF4eVhHNWNjbHh1WEhSMllYSWdkMlZpVUNBOUlHNWxkeUJKYldGblpTZ3BPMXh5WEc1Y2RIZGxZbEF1YjI1c2IyRmtJRDBnZDJWaVVDNXZibVZ5Y205eUlEMGdablZ1WTNScGIyNGdLQ2tnZTF4eVhHNWNkRngwWTJGc2JHSmhZMnNvZDJWaVVDNW9aV2xuYUhRZ1BUMGdNaWxjY2x4dVhIUjlYSEpjYmx4MGQyVmlVQzV6Y21NZ1BWeHlYRzVjZEZ4MFhDSmtZWFJoT21sdFlXZGxMM2RsWW5BN1ltRnpaVFkwTEZWcmJFZFNhbTlCUVVGQ1dGSlZTbEZXYkVFMFNVTTBRVUZCUTNsQlowTmtRVk52UTBGQlNVRk1iV3N3Yldzd2FVbHBTV2xKWjBKdlUzbG5RVUpqTmxkWFowRkJMM1psWm1Zdk1GQlFPR0pCTHk5TWQxbEJRVUZjSWp0Y2NseHVmVnh5WEc1Y2NseHVaWGh3YjNKMElHUmxabUYxYkhRZ2RHVnpkRmRsWWxBaVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOSJ9

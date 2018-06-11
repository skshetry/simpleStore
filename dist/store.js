(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "regenerator-runtime"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("regenerator-runtime"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regeneratorRuntime);
    global.store = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Store = function () {
    function Store(key, init_func) {
      _classCallCheck(this, Store);

      this._data = undefined;
      this.key = key;
      this._connectedComponents = [];
      Store.instances = _extends({}, Store.instances, _defineProperty({}, key, this));
      if (typeof init_func === "function") init_func();
    }

    _createClass(Store, [{
      key: "get",
      value: function get() {
        // Should check for `undefined` by the receiver
        if (Array.isArray(this._data)) return [].concat(_toConsumableArray(this._data));
        if (_typeof(this._data) === "object") return _extends({}, this._data);
        return this._data;
      }
    }, {
      key: "connect",
      value: function connect(component, callback) {
        if (!this._connectedComponents.includes(component)) this._connectedComponents = [].concat(_toConsumableArray(this._connectedComponents), [component]);
        // initialize state if it isn't
        component.state = component.state || {};
        if (typeof callback === "function") callback();
      }
    }, {
      key: "set",
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee(data) {
          return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(this._data !== data)) {
                    _context.next = 4;
                    break;
                  }

                  this._data = data;
                  _context.next = 4;
                  return this._syncState();

                case 4:
                  return _context.abrupt("return", this._data);

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function set(_x) {
          return _ref.apply(this, arguments);
        }

        return set;
      }()
    }, {
      key: "disconnect",
      value: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee2(component) {
          return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this._connectedComponents.filter(function (connectedComponent) {
                    return component !== connectedComponent;
                  });

                case 2:
                  this._connectedComponents = _context2.sent;

                  console.warn("Disconnected.");

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function disconnect(_x2) {
          return _ref2.apply(this, arguments);
        }

        return disconnect;
      }()
    }, {
      key: "connections",
      value: function connections() {
        // list connections
        return this._connectedComponents;
      }
    }, {
      key: "_syncState",
      value: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee4() {
          var _this = this;

          return _regeneratorRuntime2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return Promise.all(this._connectedComponents.map(function () {
                    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee3(component) {
                      return _regeneratorRuntime2.default.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              component.setState(_defineProperty({}, _this.key, _this._data));

                            case 1:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, _callee3, _this);
                    }));

                    return function (_x3) {
                      return _ref4.apply(this, arguments);
                    };
                  }()));

                case 2:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function _syncState() {
          return _ref3.apply(this, arguments);
        }

        return _syncState;
      }()
    }], [{
      key: "list",
      value: function list(key) {
        if (key) return Store.instances[key]; // check for undefined in case the key doesn't
        return Store.instances;
      }
    }]);

    return Store;
  }();

  exports.default = Store;
});

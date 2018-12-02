"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _autobindDecorator = _interopRequireDefault(require("autobind-decorator"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _codemirror = _interopRequireDefault(require("codemirror"));

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function normalizeLineEndings(str) {
  if (!str) return str;
  return str.replace(/\r\n|\r/g, '\n');
}

var CodeMirrorComponent = (_class =
/*#__PURE__*/
function (_Component) {
  _inherits(CodeMirrorComponent, _Component);

  function CodeMirrorComponent(props) {
    var _this;

    _classCallCheck(this, CodeMirrorComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CodeMirrorComponent).call(this, props));
    _this.textareaNode = _react.default.createRef();
    _this.state = {
      isFocused: false
    };
    return _this;
  }

  _createClass(CodeMirrorComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          options = _this$props.options,
          value = _this$props.value;
      var textareaNode = this.textareaNode.current;

      var instance = _codemirror.default.fromTextArea(textareaNode, options);

      instance.on('change', this.handleChange);
      instance.on('cursorActivity', this.handleCursorActivity);
      instance.on('focus', this.handleFocus);
      instance.on('blur', this.handleBlur);
      instance.on('scroll', this.handleScroll);
      instance.setValue(value || '');
      this.instance = instance;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.instance) {
        this.instance.toTextArea();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var _this$props2 = this.props,
          value = _this$props2.value,
          preserveScrollPosition = _this$props2.preserveScrollPosition,
          options = _this$props2.options;
      var instance = this.instance;

      if (instance && value !== undefined && value !== prevProps.value && normalizeLineEndings(instance.getValue()) !== normalizeLineEndings(value)) {
        instance.setValue(value);

        if (preserveScrollPosition) {
          var prevScrollPosition = instance.getScrollInfo();
          instance.scrollTo(prevScrollPosition.left, prevScrollPosition.top);
        }
      }

      if (_typeof(options) === 'object') {
        for (var optionName in options) {
          if (options.hasOwnProperty(optionName)) {
            this.setOptionIfChanged(optionName, options[optionName]);
          }
        }
      }
    }
  }, {
    key: "setOptionIfChanged",
    value: function setOptionIfChanged(optionName, newValue) {
      var instance = this.instance;
      var oldValue = instance.getOption(optionName);

      if (!(0, _lodash.default)(oldValue, newValue)) {
        instance.setOption(optionName, newValue);
      }
    }
  }, {
    key: "getCodeMirror",
    value: function getCodeMirror() {
      return this.instance;
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.instance) {
        this.instance.focus();
      }
    }
  }, {
    key: "focusChanged",
    value: function focusChanged(focused) {
      var onFocusChange = this.props.onFocusChange;
      this.setState({
        isFocused: focused
      });

      if (onFocusChange) {
        onFocusChange(focused);
      }
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {
      this.focusChanged(true);
    }
  }, {
    key: "handleBlur",
    value: function handleBlur() {
      this.focusChanged(false);
    }
  }, {
    key: "handleCursorActivity",
    value: function handleCursorActivity(cm) {
      var onCursorActivity = this.props.onCursorActivity;

      if (onCursorActivity) {
        onCursorActivity(cm);
      }
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(cm) {
      var onScroll = this.props.onScroll;

      if (onScroll) {
        onScroll(cm.getScrollInfo());
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(doc, change) {
      if (this.props.onChange && change.origin !== 'setValue') {
        this.props.onChange(doc.getValue(), change);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isFocused = this.state.isFocused;
      var _this$props3 = this.props,
          className = _this$props3.className,
          name = _this$props3.name,
          value = _this$props3.value,
          autoFocus = _this$props3.autoFocus;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('ReactCodemirror', className, {
          'focused': isFocused
        })
      }, _react.default.createElement("textarea", {
        ref: this.textareaNode,
        name: name,
        defaultValue: value,
        autoFocus: autoFocus
      }));
    }
  }]);

  return CodeMirrorComponent;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, "handleFocus", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "handleFocus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleBlur", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "handleBlur"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleCursorActivity", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "handleCursorActivity"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleScroll", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "handleScroll"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleChange", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "handleChange"), _class.prototype)), _class);
CodeMirrorComponent.propTypes = {
  autoFocus: _propTypes.default.bool,
  className: _propTypes.default.any,
  codeMirrorInstance: _propTypes.default.func,
  defaultValue: _propTypes.default.string,
  name: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onCursorActivity: _propTypes.default.func,
  onFocusChange: _propTypes.default.func,
  onScroll: _propTypes.default.func,
  options: _propTypes.default.object,
  path: _propTypes.default.string,
  value: _propTypes.default.string,
  preserveScrollPosition: _propTypes.default.bool
};
var _default = CodemirrorComponent;
exports.default = _default;
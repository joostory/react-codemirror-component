import React, {Component, Fragment} from 'react'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import codemirror from 'codemirror'

function normalizeLineEndings(str) {
  if (!str) return str;
  return str.replace(/\r\n|\r/g, '\n');
}

class CodeMirrorComponent extends Component {

  constructor(props) {
    super(props);

    this.textareaNode = React.createRef()

    this.state = {
      isFocused: false
    }
  }

  componentDidMount() {
    const { options, value } = this.props
    const textareaNode = this.textareaNode.current

    const instance = codemirror.fromTextArea(textareaNode, options);
    instance.on('change', this.handleChange);
    instance.on('cursorActivity', this.handleCursorActivity);
    instance.on('focus', this.handleFocus);
    instance.on('blur', this.handleBlur);
    instance.on('scroll', this.handleScroll);
    instance.setValue(value || '');

    this.instance = instance
  }

  componentWillUnmount() {
    if (this.instance) {
      this.instance.toTextArea();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { value, preserveScrollPosition, options } = this.props
    const instance = this.instance

    if (instance && value !== undefined && value !== prevProps.value && normalizeLineEndings(instance.getValue()) !== normalizeLineEndings(value)) {
      instance.setValue(value);
      if (preserveScrollPosition) {
        const prevScrollPosition = instance.getScrollInfo();
        instance.scrollTo(prevScrollPosition.left, prevScrollPosition.top);
      }
    }

    if (typeof options === 'object') {
      for (var optionName in options) {
        if (options.hasOwnProperty(optionName)) {
          this.setOptionIfChanged(optionName, options[optionName]);
        }
      }
    }
  }

  setOptionIfChanged(optionName, newValue) {
    const instance = this.instance
    const oldValue = instance.getOption(optionName);
    if (!isEqual(oldValue, newValue)) {
      instance.setOption(optionName, newValue);
    }
  }

  getCodeMirror() {
    return this.instance;
  }

  focus() {
    if (this.instance) {
      this.instance.focus();
    }
  }

  focusChanged(focused) {
    const { onFocusChange } = this.props
    this.setState({
      isFocused: focused
    });
    if (onFocusChange) {
      onFocusChange(focused)
    }
  }

  @autobind
  handleFocus() {
    this.focusChanged(true)
  }

  @autobind
  handleBlur() {
    this.focusChanged(false)
  }

  @autobind
  handleCursorActivity(cm) {
    const { onCursorActivity } = this.props
    if (onCursorActivity) {
      onCursorActivity(cm)
    }
  }

  @autobind
  handleScroll(cm) {
    const { onScroll } = this.props
    if (onScroll) {
      onScroll(cm.getScrollInfo())
    }
  }

  @autobind
  handleChange(doc, change) {
    if (this.props.onChange && change.origin !== 'setValue') {
      this.props.onChange(doc.getValue(), change);
    }
  }

  render() {
    const { isFocused } = this.state
    const { className, name, value, autoFocus } = this.props

    return (
      <div className={classnames('ReactCodemirror', className, {
        'focused': isFocused
      })}>
        <textarea ref={this.textareaNode} name={name} defaultValue={value} autoFocus={autoFocus} />
      </div>
    )
  }
}

CodeMirrorComponent.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.any,
  codeMirrorInstance: PropTypes.func,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onCursorActivity: PropTypes.func,
  onFocusChange: PropTypes.func,
  onScroll: PropTypes.func,
  options: PropTypes.object,
  path: PropTypes.string,
  value: PropTypes.string,
  preserveScrollPosition: PropTypes.bool
}

export default CodemirrorComponent

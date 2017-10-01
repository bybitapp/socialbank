var React = require('react')
var PropTypes = require('prop-types')

function shallowEqual (a, b) {
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  return keysA.length === keysB.length && keysA.every(key => b.hasOwnProperty(key) && b[key] === a[key])
}

function init (apiKey, options) {
  window.IxUxSecureClient.init(apiKey, options)
}

function associate (token, resolve, reject) {
  window.IxUxSecureClient.associate(token, resolve, reject)
}

class Form extends React.Component {
    static childContextTypes = {
      form: PropTypes.object
    }

    constructor () {
      super(...arguments)
      this.form = window.IxUxSecureClient.form()
    }

    getChildContext () {
      return {
        form: this
      }
    }

    shouldComponentUpdate () {
      return false
    }

    componentWillUnmount () {
      Object.keys(this._inputs).forEach(key => {
        this._inputs[key].destroy()
        delete this._inputs[key]
      })
      this.form.destroy()
    }

    render () {
      return React.Children.only(this.props.children)
    }

    input (name, path, options) {
      this._inputs = this._inputs || {}
      if (!this._inputs[name] && path) {
        this._inputs[name] = this.form.input(name, path, options)
      }
      return this._inputs[name]
    }

    tokenize (resolve, reject) {
      this.form.tokenize(resolve, reject)
    }
}

function extractInputOptions (props) {
  const {
    name,
    path,
    className,
    onChange,
    onSubmit,
    onFocus,
    onBlur,
    onReady,
    baseStyle,
    emptyStyle,
    validStyle,
    invalidStyle,
    ...options
  } = props

  if (baseStyle || emptyStyle || validStyle || invalidStyle) {
    options.style = {}
    baseStyle && (options.style.base = baseStyle)
    emptyStyle && (options.style.empty = emptyStyle)
    validStyle && (options.style.valid = validStyle)
    invalidStyle && (options.style.invalid = invalidStyle)
  }

  return options
}

class Input extends React.Component {
    static propTypes = {
      name: PropTypes.string,
      path: PropTypes.string,
      className: PropTypes.string,
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
      onReady: PropTypes.func
    };

    static defaultProps = {
      className: ''
    };

    static contextTypes = {
      form: PropTypes.object.isRequired
    };

    constructor (props, context) {
      super(props, context)
      this._options = extractInputOptions(this.props)
      const input = this.context.form.input(this.props.name, this.props.path, this._options)
      this._addListeners(input)
    }

    shouldComponentUpdate () {
      return false
    }

    componentDidMount () {
      const input = this.context.form.input(this.props.name)
      input && input.mount(this._ref)
    }

    componentWillReceiveProps (nextProps) {
      const options = extractInputOptions(nextProps)
      if (Object.keys(options).length !== 0 && !shallowEqual(options, this._options)) {
        this._options = options
        const input = this.context.form.input(this.props.name)
        input && input.update(options)
      }
    }

    componentWillUnmount () {
      const input = this.context.form.input(this.props.name)
      if (input) {
        this._removeListeners(input)
        input.unmount()
      }
    }

    render () {
      return <div className={this.props.className} ref={(ref) => { this._ref = ref }} />
    }

    _addListeners (input) {
      input.on('ready', () => this.props.onReady && this.props.onReady())
      input.on('change', e => this.props.onChange && this.props.onChange(e))
      input.on('keyup', e => this.props.onKeyUp && this.props.onKeyUp(e))
      input.on('blur', () => this.props.onBlur && this.props.onBlur())
      input.on('focus', () => this.props.onFocus && this.props.onFocus())
    }

    _removeListeners (input) {
      input.off('ready')
      input.off('change')
      input.off('keyup')
      input.off('blur')
      input.off('focus')
    }
}

function extractSpanOptions (props) {
  const {
    path,
    token,
    className,
    onReady,
    baseStyle,
    ...options
  } = props

  baseStyle && (options.style = baseStyle)

  return options
}

class Span extends React.Component {
    static propTypes = {
      path: PropTypes.string,
      token: PropTypes.string,
      className: PropTypes.string,
      onReady: PropTypes.func
    };

    static defaultProps = {
      className: ''
    };

    constructor (props, context) {
      super(props, context)
      const options = extractSpanOptions(this.props)
      this._span = window.IxUxSecureClient.span(this.props.path, this.props.token, options)
      this._setupEventListeners()
      this._options = options
    }

    shouldComponentUpdate () {
      return false
    }

    componentDidMount () {
      this._span.mount(this._ref)
    }

    componentWillReceiveProps (nextProps) {
      const options = extractSpanOptions(nextProps)
      if (Object.keys(options).length !== 0 && !shallowEqual(options, this._options)) {
        this._options = options
        this._span.update(options)
      }
    }

    componentWillUnmount () {
      this._span.destroy()
    }

    render () {
      return <div className={this.props.className} ref={(ref) => { this._ref = ref }} />
    }

    _setupEventListeners () {
      this._span.on('ready', () => {
        this.props.onReady && this.props.onReady()
      })
    }
}

module.exports = {
  init: init,
  associate: associate,
  Form: Form,
  Input: Input,
  Span: Span
}

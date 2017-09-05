import React, {Component} from 'react'
import T from 'prop-types'

export default class DraggableHandle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dragging: false,
      initialWidth: null,
      startingFromX: null,
      mouseDelta: null,
      clientX: null
    }
  }

  start (e) {
    let mouseDelta = e.clientX - e.target.offsetLeft
    if (this.props.scrollable) {
      mouseDelta = e.clientX - (e.target.offsetLeft - e.target.parentNode.parentNode.parentNode.parentNode.scrollLeft)
    }

    this.setState({
      dragging: true,
      initialWidth: e.target.parentNode.offsetWidth,
      startingFromX: e.clientX,
      mouseDelta: mouseDelta
    })
  }

  resize (clientX, isEnd = false) {
    if (clientX === 0 || this.state.clientX === clientX) {
      return
    }

    this.setState({ clientX })

    let mouseDelta = isEnd ? this.state.mouseDelta : (this.props.scrollable ? 0 : this.state.mouseDelta)

    let diff = clientX + mouseDelta - this.state.startingFromX
    let resizeTo = this.state.initialWidth + diff
    if (resizeTo < 100) {
      resizeTo = 100
    }

    if (resizeTo > 500) {
      resizeTo = 500
    }

    this.props.resize(resizeTo)
  }

  end (e) {
    this.setState({ dragging: false })
    this.resize(e.clientX, true)
  }

  render () {
    return (
      <div
        className="draggable-handler"
        draggable
        onDrag={(e) => this.resize(e.clientX)}
        onDragStart={(e) => this.start(e)}
        onDragEnd={(e) => this.end(e)}
      >
        &nbsp;
      </div>
    )
  }
}

DraggableHandle.propTypes = {
  scrollable: T.bool,
  resize: T.func
}

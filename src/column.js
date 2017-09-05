import _ from 'lodash'
import React, {Component, createElement} from 'react'
import T from 'prop-types'

import DraggableHandle from './draggable-handle'

export default class Column extends Component {
  constructor (props) {
    super(props)

    this.state = {
      width: `100px`
    }
  }

  resize (resizeTo) {
    this.setState({
      width: `${resizeTo}px`
    })
  }

  render () {
    const c = this.props.columnDef
    const { data, scrollable, classesForAllCells } = this.props
    const style = this.state.width ? { width: this.state.width } : {}

    return (
      <div key={c.label} className="column" style={style}>
        <div
          className="cell header"
          style={style}
        >
          <span>{c.label}</span>
          <DraggableHandle scrollable={scrollable} resize={(resizeTo) => this.resize(resizeTo)}/>
        </div>
        {data.map((row, index) => {
          let value = _.get(row, c.field)
          let classes = (_.isString(c.classes) && c.classes) || ''
          classes = _.isFunction(c.classes) ? c.classes(row) : classes

          if (c.formatter && _.isFunction(c.formatter)) {
            value = c.formatter(value)
          }

          return (
            <div
              key={row.id || index}
              style={style}
              className={`cell ${classesForAllCells && classesForAllCells(row)} ${classes}`}
            >
              {c.component ? createElement(c.component, { value, row, field: c.field }) : (<span>{value}</span>)}
            </div>
          )
        })}
      </div>
    )
  }
}

Column.propTypes = {
  columnDef: T.object.isRequired,
  data: T.array.isRequired,
  scrollable: T.bool,
  classesForAllCells: T.func
}

import React, {Component} from 'react'
import T from 'prop-types'

import Column from './column'

export default class Matrix extends Component {
  render () {
    const {
      columnDefinitions,
      data,
      classesForAllCells
    } = this.props

    return (
      <div className="react-matrix-grid">
        <div className="blocked">
          {columnDefinitions.filter(c => c.fixed).map(c => {
            return <Column
              key={c.label}
              classesForAllCells={classesForAllCells}
              columnDef={c}
              data={data}
            />
          })}
        </div>
        <div className="scrollable">
          <div className="react-matrix-grid">
            {columnDefinitions.filter(c => !c.fixed).map(c => {
              return <Column
                scrollable
                key={c.label}
                classesForAllCells={classesForAllCells}
                columnDef={c}
                data={data}
              />
            })}
          </div>
        </div>
      </div>
    )
  }
}

Matrix.propTypes = {
  columnDefinitions: T.array.isRequired,
  data: T.array.isRequired,
  classesForAllCells: T.func
}

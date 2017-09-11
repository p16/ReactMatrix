# ReactMatrix

This component wants to be a very simple and slim implementation of a exel like table component that will enable you to have:

- resizable columns
- fixed (left) columns
- abililty to customize what is rendered in each cell:
    - using react components
    - passing a formatting function
    - passsing a function that will return which CSS class(es) should be applied to the cell

![example](https://github.com/p16/ReactMatrix/blob/master/ezgif-4-0d78b04fe8.gif?raw=true)

# API

```javascript
import Matrix from 'react-matrix'

const data = [
  {
    flightDetails: {
      code: '...',
      date: '...'
    },
    user: {
      details: {
        firstName: '...',
        lastName: '...',
      }
    }
    ...
  }
  ...
]

function classesForAllCells (row) {
  if (row.id === 101010) {
    return 'show-it-red'
  }

  return 'show-it-blue'
}

const columnDefinitions = [
  { label: 'Flight', field: 'flightDetails.code', fixed: true, component: TextCell },
  { label: 'Date', field: 'flightDetails.date', fixed: true, component: DateCell },
  { label: 'First name', field: 'user.details.firstName', component: TextCell },
  { label: 'Last name', field: 'user.details.lastName', component: TextCell },
  { label: 'Something', field: 'someField', formatter: someFormatter },
  { label: 'DOB', field: 'birthday', component: DateCell },
  { label: 'Age', field: 'birthday', component: AgeCell },
]

<Matrix
  data={data}
  columnDefinitions={columnDefinitions}
  classesForAllCells={classesForAllCells}
/>

```

## prop `data`

It is an array of objects (rows) that will be displayed in the matrix

## prop `columnDefinitions`

The `columnDefinitions` is an array of objects, each object can have the following properties:

- `label`: the string to be show in the table header row
- `field`: path of the field holding the value to show
- `fixed`: if `true` the column will be rendered as a fixed column on the left of the matrix
- `formatter`: function to which will be passed the value to render, whatever this will return will be rendered instead
- `classes`: function to which is passed the entire row (object) and should return the cell CSS class(es)
- `component`: react component to be rendered, it will receive the following props:
    - `value`: whatever the value for the column is
    - `row`: the object representing the row that is being rendered
    - `field`: the same string given in the `columnDefinitions` for this column

## prop `classesForAllCells`

This is a function should return which CSS class(es) should be applied to all cells. It will be called for each object in `data` passing the current object.


# Style

You can add the grid style by importing

```javascript
import 'react-matrix/css/style.css'
```

# Limitations

- the header cells cannot be resized to less then 100px and more than 500px
- fixed columns are on the left only
- the matrix is rendered all at the same time

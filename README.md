# react-window-calendar

Currently under development. inspired by [react-window](https://github.com/bvaughn/react-window)

[documentation](https://bluewings.github.io/react-window-calendar/) (in progress)


```jsx
import { WindowCalendar } from 'react-window-calendar';

const Cell = ({ rowIndex, columnIndex, className, style }) => (
  <div className={className} style={style}>
    {rowIndex} , {columnIndex}
  </div>
);

const Sample = () => (
  <WindowCalendar.Core
    height={300}
    rowCount={100}
    rowHeight={40}
    columnCount={100}
    columnWidth={100}
    fixedTopCount={1}
    fixedRightCount={1}
    fixedBottomCount={1}
    fixedLeftCount={1}
  >
    {Cell}
  </WindowCalendar.Core>
);
```

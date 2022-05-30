import React, { useState } from 'react';

type RowData = {
  isSelected: boolean;
  name: string;
  age: string;
  email: string;
}

const App = () => {


  const generateData = (totalRows = 5) => {
    let rows = [];
    for (let i = 0; i < totalRows; i++) {
      rows.push({
        isSelected: 'false',
        age: `age + ${i}`,
        name: `name + ${i}`,
        email: `email + ${i}`,
      });
    }

    return {
      data: rows,
      columns: Object.keys(rows[0])
    };
  };

  const { columns, data } = generateData(5);
  const [cols, setCols] = useState<string[]>(columns);
  const [rows, setRows] = useState(data);
  const [dragOver, setDragOver] = useState("");
  const handleSelectRow = React.useCallback((idx: number) => {
    setRows((prevState) => prevState.map((item: any, index: number) => {
      if (idx === index) {
        return {
          ...item,
          isSelected: !item.isSelected
        }
      } else {
        return item
      }
    }))
  }, [])
  const handleDragStart = (e: { target: any; dataTransfer: any }) => {
    const { id } = e.target;
    const idx = cols.indexOf(id);
    e.dataTransfer.setData("colIdx", idx);
  };

  const handleDragOver = (e: { preventDefault: () => any; }) => {
    return e.preventDefault();
  };
  const handleDragEnter = (e: { target: any }) => {
    const { id } = e.target;
    setDragOver(id);
  };

  const handleOnDrop = (e: any) => {
    const { id } = e.target;
    const droppedColIdx = cols.indexOf(id);
    const draggedColIdx = e.dataTransfer.getData("colIdx");
    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];
    setCols(tempCols);
    setDragOver("");
    const test = rows.map((item) => {
      const arrayChild = Object.entries(item);
      const result = swap(arrayChild, draggedColIdx, droppedColIdx);
      return result;
    })
    const test2 = test.map((item) => item.reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {}))
    console.log('droppedColIdx', droppedColIdx)
    console.log('draggedColIdx', draggedColIdx)
    console.log('test2', test2)
    setRows(test2);
  };
  const swap = (arr: any[], from: number, to: any) => {
    const result = [...arr];
    result.splice(from, 1, result.splice(to, 1, result[from])[0]);
    return result
  }
  const rowData = React.useMemo(() => {
    return rows.map((row, index) => (
      <tr key={index}>
        {Object.entries(row).map(([key, value], idx) => {
          return (
            <td key={value} style={{ border: '1px solid black' }}>
              {
                key === 'isSelected'
                  ? (<input type="checkbox" name={`input[${idx}]${key}`} />)
                  : (<input type="text" name={`input[${idx}]${key}`} />)
              }
              {/* defaultValue={row[cols[idx] as keyof RowData]} */}
            </td>
          );
        })}
      </tr>
    ))
  }, [rows])
  return (
    <div>
      <form>
        <table>
          <thead>
            <tr>
              {cols.map(col => (
                <th
                  id={col}
                  key={col}
                  draggable
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleOnDrop}
                  onDragEnter={handleDragEnter}
                // dragOver={col === dragOver}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              rowData.map((item) => {
                return item
              })
            }
          </tbody>
        </table>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App
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
    console.log('handleDragStart')
  };

  const handleDragOver = (e: { preventDefault: () => any; }) => {
    console.log('handleDragOver')
    return e.preventDefault();
  };
  const handleDragEnter = (e: { target: any }) => {
    const { id } = e.target;
    setDragOver(id);
    console.log('handleDragEnter', id)
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
    console.log('handleOnDrop', id)
    console.log('rows', rows)
    const test = rows.map((item) => {
      const arrayChild = Object.entries(item);
      const result = swap(arrayChild, 2, 1);
      return result;
    })
    console.log('test', test);
  };

  const swap = (arr: any[], from: number, to: any) => {
    const result = [...arr]; 
    result.splice(from, 1, result.splice(to, 1, result[from])[0]); 
    return result
  }
  const rowData = React.useMemo(() => {
    return rows.map((row, index) => (
      <tr key={index}>
        {/* <td>
          <input type="checkbox" checked={row.isSelected} onClick={() => handleSelectRow(index)}/>
        </td> */}
        {Object.entries(row).map(([k, v], idx) => {
          return (
            <td key={v} style={{ border: '1px solid black' }}>
              {row[cols[idx] as keyof RowData]}
            </td>
          );
        })}
      </tr>
    ))
  }, [rows])
  return (
    <div>
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
    </div>
  )
}

export default App
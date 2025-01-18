import React from 'react';

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th
              key={idx}
              className="text-left py-3 px-4 bg-gray-100 font-bold border-b border-gray-200"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {row.map((cell, cellIdx) => (
              <td key={cellIdx} className="py-3 px-4 border-b border-gray-200">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

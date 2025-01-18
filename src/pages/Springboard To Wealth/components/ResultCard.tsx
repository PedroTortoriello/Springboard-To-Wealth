import React from 'react';

interface ResultCardProps {
  title: string;
  results: { label: string; value: string }[];
}

const ResultCard: React.FC<ResultCardProps> = ({ title, results }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <table className="w-full border-collapse">
        <tbody>
          {results.map((result, idx) => (
            <tr key={idx}>
              <td className="py-3 px-4 border-b border-gray-200">{result.label}</td>
              <td className="py-3 px-4 border-b border-gray-200 font-bold text-gray-700">
                {result.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultCard;

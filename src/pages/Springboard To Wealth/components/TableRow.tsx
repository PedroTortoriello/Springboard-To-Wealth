interface TableRowProps {
  label: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditable?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ label, value, onChange, isEditable }) => (
  <tr>
    <td className="py-3 px-4 border-b border-gray-200">{label}</td>
    <td className="py-3 px-4 border-b border-gray-200">
      {isEditable ? (
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="$"
        />
      ) : (
        <span className="font-bold text-gray-700">${value}</span>
      )}
    </td>
  </tr>
);

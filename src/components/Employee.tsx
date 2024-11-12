import React from 'react';
import { EmployeeType } from '../types';

interface EmployeeNodeProps {
  employee: EmployeeType;
  employees: EmployeeType[];
  onRemove: (id: string) => void;
}

const EmployeeNode: React.FC<EmployeeNodeProps> = ({ employee, employees, onRemove }) => {
  const subordinates = employees.filter(e => e.managerId === employee.id);

  return (
    <div style={{ marginLeft: 20 }}>
      <strong>{employee.name}</strong> - {employee.role}
      <button onClick={() => onRemove(employee.id)} style={{ marginLeft: '10px' }}>
        Remove
      </button>
      {subordinates.map(sub => (
        <EmployeeNode key={sub.id} employee={sub} employees={employees} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default EmployeeNode;

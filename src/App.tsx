import React, { useState, useEffect } from 'react';
import { EmployeeType } from './types';
import EmployeeNode from './components/Employee';

const initialEmployees: EmployeeType[] = [
  { id: '1', name: 'David', role: 'CEO', managerId: null },
  { id: '2', name: 'Linda', role: 'CTO', managerId: '1' },
  { id: '3', name: 'Lisette', role: 'Developer', managerId: '1' },
  { id: '4', name: 'Max', role: 'Manager', managerId: '2' },
];

const App: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>(initialEmployees);

  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeRole, setNewEmployeeRole] = useState('');
  const [newEmployeeManagerId, setNewEmployeeManagerId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Organization Structure';
  }, []);

  const addEmployee = () => {
    if (newEmployeeName && newEmployeeRole) {
      const newEmployee: EmployeeType = {
        id: (employees.length + 1).toString(),
        name: newEmployeeName,
        role: newEmployeeRole,
        managerId: newEmployeeManagerId,
      };

      setEmployees([...employees, newEmployee]);

      setNewEmployeeName('');
      setNewEmployeeRole('');
      setNewEmployeeManagerId(null);

      console.log('New Employee Added:', newEmployee);
    } else {
      console.log('Please fill out both name and role.');
    }
  };

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  return (
    <div>
      <h1>Organization Structure</h1>
      <EmployeeNode employee={employees.find(e => e.managerId === null)!} employees={employees} onRemove={removeEmployee} />

      <h2>Add New Employee</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Role:
          <input
            type="text"
            value={newEmployeeRole}
            onChange={(e) => setNewEmployeeRole(e.target.value)}
          />
        </label>
        <br />
        <label>
          Manager ID:
          <input
            type="text"
            value={newEmployeeManagerId || ''}
            onChange={(e) => setNewEmployeeManagerId(e.target.value || null)}
          />
        </label>
        <br />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
    </div>
  );
};

export default App;

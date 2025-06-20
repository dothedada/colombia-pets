import { useState } from 'react';
import '../styles/App.css';

const DepartmentDropdown = ({ departments, onDepartmentChange }) => {
    const [selectedDepartment, setSelectedDepartment] = useState('');

    const handleChange = (event) => {
        const department = event.target.value;
        setSelectedDepartment(department);
        onDepartmentChange(department);
    };

    return (
        <div className="shared-dropdown">
            <label htmlFor="departments">Selecciona un departamento:</label>
            <select id="departments" value={selectedDepartment} onChange={handleChange}>
                <option value="">COLOMBIA</option>
                {departments && departments.map((department) => (
                    <option key={department.id} value={department.name}>
                        {department.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DepartmentDropdown;
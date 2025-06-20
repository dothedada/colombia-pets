import '../styles/App.css';

const YearDropdown = ({ years, selectedYear, onYearChange }) => {
    return (
        <div className="shared-dropdown">
            <label htmlFor="year-select">Selecciona un año:</label>
            <select
                id="year-select"
                value={selectedYear}
                onChange={e => onYearChange(Number(e.target.value))}
            >
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );
};

export default YearDropdown;

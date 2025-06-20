import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import DepartmentDropdown from "./DepartmentDropdown.jsx";
import YearDropdown from "./YearDropdown.jsx";
import StatisticsGraph from "./StatisticsGraph.jsx";
import ColombiaMap from "./ColombiaMap.jsx";
import DepartmentInfo from "./DepartmentInfo.jsx";
import CountryInfo from "./CountryInfo.jsx";
import "../styles/App.css";

const App = () => {
  const yearOptions = [2000, 2005, 2010, 2015, 2020, 2025];
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [statistics, setStatistics] = useState([]);
  const [countryInfo, setCountryInfo] = useState([]);
  const [loadingCountryInfo, setLoadingCountryInfo] = useState(false);
  const [countryInfoError, setCountryInfoError] = useState(null);
  const [departmentInfo, setDepartmentInfo] = useState(null);
  const [loadingDepartmentInfo, setLoadingDepartmentInfo] = useState(false);
  const [departmentInfoError, setDepartmentInfoError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(
    yearOptions[yearOptions.length - 1],
  );

  const [petsByDepartment, setPetsByDepartment] = useState([]);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:3000/departments");
        if (!response.ok) throw new Error("Failed to fetch departments");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error(error);
        setDepartments([]);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    setLoadingCountryInfo(true);
    setCountryInfoError(null);
    fetch(`http://localhost:3000/pets-summary?year=${currentYear}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch country info");
        return res.json();
      })
      .then((data) => setCountryInfo(data))
      .catch((err) => setCountryInfoError(err.message))
      .finally(() => setLoadingCountryInfo(false));
  }, [currentYear]);

  const handleDepartmentChange = async (departmentName) => {
    const department = departments.find((dep) => dep.name === departmentName);
    setSelectedDepartment(department);
    if (department) {
      setStatistics(null);
    } else {
      setStatistics(null);
    }
  };

  useEffect(() => {
    if (!selectedDepartment) {
      setDepartmentInfo(null);
      setPetsByDepartment([]);
      setStatistics([]);
      return;
    }
    setLoadingDepartmentInfo(true);
    setDepartmentInfoError(null);

    fetch(
      `http://localhost:3000/pets-list?departmentId=${selectedDepartment.id}&year=${selectedYear}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("algo algo");
        return res.json();
      })
      .then((data) => setPetsByDepartment(data))
      .catch((err) => setDepartmentInfoError(err.message))
      .finally(() => setLoadingDepartmentInfo(false));

    fetch(`http://localhost:3000/departments/${selectedDepartment.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch department info");
        return res.json();
      })
      .then((data) => {
        return setDepartmentInfo(data);
      })
      .catch((err) => setDepartmentInfoError(err.message))
      .finally(() => setLoadingDepartmentInfo(false));

    fetch(
      `http://localhost:3000/pets-info?departmentId=${selectedDepartment.id}&year=${selectedYear}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pets info");
        return res.json();
      })
      .then((data) => {
        data.map((item) => {
          item.name = item.name.charAt(0).toUpperCase() + item.name.slice(1);
          return item;
        });
      })
      .catch((err) => console.error(err.message));

    fetch(
      `http://localhost:3000/pets-group-by-year?departmentId=${selectedDepartment.id}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("algo algo");
        return res.json();
      })
      .then((data) => setStatistics(data))
      .catch((err) => setDepartmentInfoError(err.message))
      .finally(() => setLoadingDepartmentInfo(false));
  }, [selectedDepartment, selectedYear]);

  return (
    <div className="app">
      <Header />
      <div className="main-layout">
        <div className="left-section">
          <CountryInfo
            countryInfo={countryInfo}
            loading={loadingCountryInfo}
            error={countryInfoError}
          />
          <DepartmentDropdown
            departments={departments}
            onDepartmentChange={handleDepartmentChange}
          />
          <YearDropdown
            years={yearOptions}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
          <DepartmentInfo
            info={{ ...departmentInfo, pets: petsByDepartment }}
            loading={loadingDepartmentInfo}
            error={departmentInfoError}
          />
        </div>
        <div className="right-section">
          <ColombiaMap selectedDepartment={departmentInfo} />
          {selectedDepartment && <StatisticsGraph data={statistics} />}
        </div>
      </div>
    </div>
  );
};

export default App;

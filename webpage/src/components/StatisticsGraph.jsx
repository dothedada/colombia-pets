import { ResponsiveBar } from "@nivo/bar";
import "../styles/StatisticsGraph.css";

const StatisticsGraph = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="statistics-graph">
        <h2>Gráfico</h2>
        <p>No hay información disponible para el departamento seleccionado.</p>
      </div>
    );
  }

  const cleanData = data.map((depData) => {
    const pets = depData.pets.reduce((acc, cur) => {
      acc[cur.name] = cur.count;
      return acc;
    }, {});
    return {
      year: depData.year,
      ...pets,
    };
  });

  const keys = Object.keys(cleanData[0]).filter((key) => key !== "year");

  return (
    <div className="statistics-graph">
      <h2>Gráfico</h2>
      <div style={{ height: 300 }}>
        <ResponsiveBar
          data={cleanData}
          indexBy="year"
          keys={keys}
          labelSkipWidth={12}
          labelSkipHeight={12}
          colors={{ scheme: "accent" }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              translateX: 120,
              itemsSpacing: 3,
              itemWidth: 100,
              itemHeight: 16,
            },
          ]}
          axisBottom={{ legend: "Años", legendOffset: 32 }}
          axisLeft={{ legend: "Mascotas", legendOffset: -40 }}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        />
      </div>
    </div>
  );
};

export default StatisticsGraph;

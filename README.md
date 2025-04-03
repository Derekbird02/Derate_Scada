// Pie Chart Data for Site Counts
const siteCounts = filteredData.reduce((acc, item) => {
  acc[item.park_name] = (acc[item.park_name] || 0) + 1;
  return acc;
}, {});

const topSites = Object.entries(siteCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .map(([name, value]) => ({ id: name, value, label: name }));

// Updated Pie Charts Section
<div className="grid grid-cols-3 gap-6 mt-6">
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-center font-semibold mb-2">Top 15 Variables</h3>
    <PieChart series={[{ data: topVariables, innerRadius: 50, outerRadius: 100 }]} width={300} height={300} />
  </div>

  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-center font-semibold mb-2">Top 15 Devices</h3>
    <PieChart series={[{ data: topDevices, innerRadius: 50, outerRadius: 100 }]} width={300} height={300} />
  </div>

  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-center font-semibold mb-2">Top 15 Sites</h3>
    <PieChart series={[{ data: topSites, innerRadius: 50, outerRadius: 100 }]} width={300} height={300} />
  </div>
</div>

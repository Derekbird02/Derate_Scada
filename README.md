// Pie Chart Data - Devices
const deviceCounts = filteredData.reduce((acc, item) => {
    const key = `${item.device_name} (${item.park_name})`; // Combine device name and park name
    acc[key] = (acc[key] || 0) + 1;
    return acc;
}, {});

const topDevices = Object.entries(deviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([name, value]) => ({ id: name, value, label: name }));


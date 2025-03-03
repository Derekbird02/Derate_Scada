import { useEffect, useState } from "react";

const DataDisplay = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const username = "yourUsername";
      const password = "yourPassword";
      const credentials = btoa(`${username}:${password}`);

      try {
        const response = await fetch("https://powertools.api/your-endpoint", {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        });

        const result = await response.json();
        console.log("API Response:", result); // Debugging log
        
        if (Array.isArray(result.data)) {
          setData(result.data);
        } else {
          console.error("Unexpected data format:", result);
          setData([]); // Prevent errors by setting an empty array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Handle fetch errors by setting an empty array
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Outage ID</th>
              <th className="p-3 text-left">Element</th>
              <th className="p-3 text-left">Parent</th>
              <th className="p-3 text-left">Data Points</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{item.identifier || "N/A"}</td>
                  <td className="p-3">{item.element || "N/A"}</td>
                  <td className="p-3">{item.parent || "N/A"}</td>
                  <td className="p-3">
                    {Array.isArray(item.dataPoints) && item.dataPoints.length > 0 ? (
                      item.dataPoints.map((point, i) => (
                        <div key={i} className="mb-2">
                          <span className="font-semibold">{point.keyName}:</span>{" "}
                          {point.values?.[0]?.data?.[0]?.value || "N/A"}
                        </div>
                      ))
                    ) : (
                      "No Data Points"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataDisplay;


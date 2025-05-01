const fetchData = async () => {
        const today = new Date().toISOString().split("T")[0];
        const fetchURL = `https://api.ptp.energy/v1/markets/operations/endpoints/Outage-Summary/data?definitions=Ticket%20Item&begin=${today}&end=${today}`;
        console.log(fetchURL);
        const userName = "test@test.com"
        const passwrod = "test123"
        const credentials = btoa(`${userName}:${passwrod}`);

        
  
        try {
          const response = await fetch(fetchURL, {
            headers: {
              Authorization: `Basic ${credentials}`,
            },
          });
  
          const result = await response.json();
        console.log("API Response:", result); // Debugging log

        if (Array.isArray(result.data)) {
          // Filter for items where at least one dataPoint has keyName "Status" and value "Active"
          const filteredData = result.data.filter(item =>
            Array.isArray(item.dataPoints) &&
            !item.dataPoints.some(point => 
              (point.keyName === "TPSStatus" && point.values?.[0]?.data?.[0]?.value === "Completed") ||
              (point.keyName === "ResourceType" && ["Transmission", "Storage"].includes(point.values?.[0]?.data?.[0]?.value))
            )
          );

          setData(filteredData);
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

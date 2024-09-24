import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlatformCodes = () => {
  const [platformData, setPlatformData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/platform-codes')
      .then(response => {
        const data = response.data;

        // Group by platform and sort codes
        const groupedData = data.reduce((acc, { platform, code }) => {
          if (!acc[platform]) {
            acc[platform] = [];
          }
          acc[platform].push(code);
          return acc;
        }, {});

        // Sort codes for each platform
        Object.keys(groupedData).forEach(platform => {
          groupedData[platform].sort((a, b) => a.localeCompare(b));
        });

        setPlatformData(groupedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Platform Codes</h1>
      <div className="grid grid-cols-4 gap-4">
        {Object.keys(platformData).map(platform => (
          <div key={platform} className="border p-4">
            <h2 className="font-semibold mb-2">{platform}</h2>
            <ul>
              {platformData[platform].map(code => (
                <li key={code} className="text-sm">{code}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformCodes;

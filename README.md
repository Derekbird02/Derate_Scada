import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlatformCodes = () => {
  const [platformData, setPlatformData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');  // Search query state

  useEffect(() => {
    axios.get('http://localhost:5000/platform-codes')
      .then(response => {
        const data = response.data;

        // Group by platform and sort codes
        const groupedData = data.reduce((acc, { platform, id, code }) => {
          if (!acc[platform]) {
            acc[platform] = [];
          }
          acc[platform].push({ id, code });
          return acc;
        }, {});

        // Sort codes for each platform as numbers
        Object.keys(groupedData).forEach(platform => {
          groupedData[platform].sort((a, b) => a.code - b.code);
        });

        setPlatformData(groupedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Handle the search query input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter platformData based on search query
  const filteredPlatformData = Object.keys(platformData).reduce((acc, platform) => {
    const filteredCodes = platformData[platform].filter(({ code }) =>
      code.toString().includes(searchQuery) // Check if code includes search query
    );
    
    if (filteredCodes.length > 0) {
      acc[platform] = filteredCodes;
    }
    
    return acc;
  }, {});

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Platform Codes</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search codes..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-6 p-2 border rounded w-full"
      />

      <div className="grid grid-cols-4 gap-4">
        {Object.keys(filteredPlatformData).map(platform => (
          <div key={platform} className="border p-4">
            <h2 className="font-semibold mb-2">{platform}</h2>
            <ul>
              {filteredPlatformData[platform].map(({ id, code }) => (
                <div key={id} className="flex justify-between items-center">
                  <li className="text-sm">{code}</li>
                  <button 
                    onClick={() => handleDelete(id, code)} 
                    className="text-red-500 hover:text-red-700 ml-4">
                    X
                  </button>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformCodes;
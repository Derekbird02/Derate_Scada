import React, { useState } from 'react';

const AddCodeModal = ({ platforms, platformData, onAddCode, onClose }) => {
  const [newCode, setNewCode] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); // Track multiple selected platforms

  // Check if the new code exists on any platform
  const isCodeOnPlatform = (platform) => {
    return platformData[platform]?.some(({ code }) => code.toString() === newCode);
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  // Handle adding the code
  const handleAddCode = () => {
    if (!selectedPlatforms.length || !newCode) return;

    // Call the onAddCode function for each selected platform
    selectedPlatforms.forEach(platform => {
      onAddCode(platform, newCode);
    });

    setNewCode(''); // Reset the input field
    setSelectedPlatforms([]); // Reset the platform selection
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Add New Code</h2>

        {/* Input for new code */}
        <input
          type="text"
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
          placeholder="Enter new code"
          className="w-full p-2 border rounded mb-4"
        />

        {/* Checkboxes for platforms */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Select Platforms</h3>
          {platforms.map((platform) => (
            <label key={platform} className="block mb-2">
              <input
                type="checkbox"
                value={platform}
                onChange={() => handleCheckboxChange(platform)}
                disabled={isCodeOnPlatform(platform)}  // Disable if the code exists on this platform
              />
              <span className={isCodeOnPlatform(platform) ? 'text-gray-400' : ''}>
                {platform} {isCodeOnPlatform(platform) && "(Code exists)"}
              </span>
            </label>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 mr-2 bg-gray-300 rounded">Cancel</button>
          <button
            onClick={handleAddCode}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${!selectedPlatforms.length || !newCode ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!selectedPlatforms.length || !newCode}  // Disable if no platform selected or no code entered
          >
            Add Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCodeModal;
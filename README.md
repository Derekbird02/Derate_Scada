import React, { useState } from 'react';

const AddCodeModal = ({ platforms, platformData, onAddCode, onClose }) => {
  const [newCode, setNewCode] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');

  // Check if the new code exists on any platform
  const isCodeOnPlatform = (platform) => {
    return platformData[platform]?.some(({ code }) => code.toString() === newCode);
  };

  // Handle adding the code
  const handleAddCode = () => {
    if (!selectedPlatform || !newCode) return;
    
    // Call the onAddCode function passed from the parent to actually add the code
    onAddCode(selectedPlatform, newCode);
    setNewCode(''); // Reset the input field
    setSelectedPlatform(''); // Reset the platform selection
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

        {/* Radio buttons for platforms */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Select Platform</h3>
          {platforms.map((platform) => (
            <label key={platform} className="block mb-2">
              <input
                type="radio"
                name="platform"
                value={platform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
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
            className={`px-4 py-2 bg-blue-500 text-white rounded ${!selectedPlatform || !newCode ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!selectedPlatform || !newCode}  // Disable if no platform selected or no code entered
          >
            Add Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCodeModal;
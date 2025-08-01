import { useState } from 'react';

export default function RequestAccess() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    idQuality: '' // New field for radio group
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // or send to backend
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Request Access</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="reason"
          placeholder="Why do you need access?"
          value={formData.reason}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border rounded"
        />

        {/* ✅ New Radio Group */}
        <div>
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Identification Quality</h3>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {["Invalid", "Correct", "Moderate", "Low"].map((option, index) => (
              <li
                key={option}
                className={`w-full ${index !== 3 ? "border-b sm:border-b-0 sm:border-r" : ""} border-gray-200 dark:border-gray-600`}
              >
                <div className="flex items-center ps-3">
                  <input
                    id={`radio-${option.toLowerCase()}`}
                    type="radio"
                    name="idQuality"
                    value={option}
                    checked={formData.idQuality === option}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={`radio-${option.toLowerCase()}`}
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {option}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}

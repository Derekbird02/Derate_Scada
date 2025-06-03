import { useState, useEffect } from "react";
import axios from "axios";

const FrequencyEditModal = ({ onClose, frequencyData, asset={}, mode,fetchData }) => {
  const [dayFreq, setDayFreq] = useState(mode === "add" ? 0 : asset.one_day);
  const [weekFreq, setWeekFreq] = useState(mode === "add" ? 0 : asset.one_week);
  const [emcode, setEmcode] = useState(mode === "add" ? "" : asset.emcode || "");
  const [platform, setPlatform] = useState(mode === "add" ? "" : asset.platform || "");

  const allPlatforms = ["GE 1.X ESS", "GE Sierra 3.X-140 (DC)", "1x BEC", "GE Cypress 4-6.X-158,164", "2x BEC", "GE 2.X-107,116,127,132", "GE Sierra 3.X-154 (AC)", "GE DFIG 2-4.X-100,103,117,120,130,137"];

  const existsAlready = frequencyData.some(
    (entry) => entry.emcode === Number(emcode) && entry.platform === platform
  );
  
  useEffect(() => {
    if (mode === "edit" && asset) {
      setDayFreq(asset.one_day);
      setWeekFreq(asset.one_week);
      setEmcode(asset.emcode);
      setPlatform(asset.platform);
    }
  }, [asset, mode]);

  const handleOptionDayChange = (e) => setDayFreq(Number(e.target.value));
  const handleOptionWeekChange = (e) => setWeekFreq(Number(e.target.value));

  const sendData = async (action) => {
    const data = {emcode: emcode, platform: platform, one_day:dayFreq, one_week: weekFreq}
    const addUrl = import.meta.env.VITE_API_FREQUENCY_CRUD;
    console.log("Here");
    try{
        await axios.post(addUrl, {
            action,
            payload: data,
        });
    }catch (error){
        console.error(error);
    }
    console.log("Also Here");
    fetchData();
    onClose();
  };

  const isUpdateDisabled = dayFreq === asset?.one_day && weekFreq === asset?.one_week;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative border border-gray-400 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-600">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {mode === "add" ? "Add EM Frequency" : "Change/Remove EM Frequency"}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              ✕
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            {/* EM Code */}
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">EM Code</span>
              {mode === "add" ? (
                <input
                  type="number"
                  className="w-1/2 text-sm p-2 rounded border dark:bg-gray-700 dark:text-white"
                  value={emcode}
                  onChange={(e) => setEmcode(e.target.value)}
                  required
                />
              ) : (
                <span className="text-gray-500 dark:text-gray-400">{emcode}</span>
              )}
            </div>

            {/* Platform */}
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">Platform</span>
              {mode === "add" ? (
                <select
                  className="w-1/2 text-sm p-2 rounded border dark:bg-gray-700 dark:text-white"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  required
                >
                  <option value="" disabled>Select</option>
                  {allPlatforms.map((p, index) => (
                    <option value={p} key={index}>{p}</option>
                  ))}
                </select>
              ) : (
                <span className="text-gray-500 dark:text-gray-400">{platform}</span>
              )}
            </div>

            {/* Day Frequency */}
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">One Day</span>
              <select
                className="w-1/2 text-sm p-2 rounded border dark:bg-gray-700 dark:text-white"
                value={dayFreq}
                onChange={handleOptionDayChange}
              >
                {[...Array(41).keys()].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Week Frequency */}
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">One Week</span>
              <select
                className="w-1/2 text-sm p-2 rounded border dark:bg-gray-700 dark:text-white"
                value={weekFreq}
                onChange={handleOptionWeekChange}
              >
                {[...Array(41).keys()].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full gap-4 pt-2">
              {mode === "add" ? (
                <button
                  type="button"
                  className={`w-full  text-white font-medium rounded-lg text-sm px-5 py-2.5 
                    ${ existsAlready || !emcode || !platform
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-700 hover:bg-green-800"
                    }`}
                  onClick={() => sendData("add")}
                  disabled={existsAlready || !emcode || !platform}
                >
                  {existsAlready ? "Code/Platform Exist" : "Add"}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => sendData("update")}
                    disabled={isUpdateDisabled}
                    className={`w-1/2 font-medium rounded-lg text-sm px-5 py-2.5 text-white ${
                      isUpdateDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => sendData("delete")}
                    className="w-1/2 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequencyEditModal;

import { useEffect, useState } from "react";
import { useAuth } from "../../useAuth";
import DnrListAddModal from "./DnrListAddModal";
import DnrListDeleteModal from "./DnrListDeleteModal";
import ConversionModal from "./ConversionModal";
import LoadingPage from "./LoadingPage";
import axios from "axios";
import ExcelJS from "exceljs";

const DnrListMain = () => {
  const { user } = useAuth();
  const [platformData, setPlatformData] = useState({});
  const [conversionTableData, setConversionTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConversionModalOpen, setIsConversionModalOpen] = useState(false);
  const [shownList, setShownList] = useState("DNR");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [deleteData, setDeleteData] = useState({
    emcode: null,
    platform: null,
  });

  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const fetchURL = import.meta.env.VITE_API_DNRLIST;
    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      const {emcodes, conversiontable} = data;

      const mergedData = emcodes.reduce((acc, { platform, emcode }) => {
        if (!acc[platform]) {
          acc[platform] = [];
        }
        acc[platform].push({ emcode });
        return acc;
      }, {});
      Object.keys(mergedData).forEach((platform) => {
        mergedData[platform].sort((a, b) => a.emcode - b.emcode);
      });
      //console.log(mergedData);
      setPlatformData(mergedData);
      setConversionTableData(conversiontable);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };


  const filteredPlatformData = Object.keys(platformData).reduce(
    (acc, platform) => {
      const filteredCodes = platformData[platform].filter(({ emcode }) =>
        emcode.toString().includes(searchQuery)
      );
      acc[platform] = filteredCodes;
      return acc;
    },
    {}
  );

  const exportToExcel = async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("DNR Data");
  
      // Define the columns for the Excel sheet
      worksheet.addRow(["Platform", "EM Codes"]);


  
      // Add rows to the worksheet based on filtered data
      Object.entries(platformData).filter(([platform]) => platform !== "No Second Looks" && platform !== "Exceptions").forEach(([platform,emcode]) => {
        const formattedCodes = emcode.map(code => code.emcode).join(",");
          worksheet.addRow([platform, formattedCodes]);
      });

      const todayDate = new Date().toLocaleDateString("en-US", {
        month:"2-digit",
        day: "2-digit",
        year: "numeric",
      });
      const formattedFilename = `DnrList-${todayDate}`;
  
      // Write to buffer and trigger the download
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = formattedFilename;
        link.click();
      });
    };



  const getColorClass = (platform) => {
    switch (platform) {
      case "GE 1.X ESS":
        return "dark:text-orange-400";
      case "GE 2.X-107,116,127,132":
        return "dark:text-blue-600";
      case "GE Cypress 4-6.X-158,164":
        return "dark:text-gray-400";
      case "GE DFIG 2-4.X-100,103,117,120,130,137":
        return "dark:text-yellow-400";
      case "GE Sierra 3.X-140 (DC)":
        return "dark:text-blue-300";
      case "GE Sierra 3.X-154 (AC)":
        return "dark:text-green-400";
      case "1x BEC":
        return "dark:text-purple-400";
      case "2x BEC":
        return "dark:text-red-400";
      default:
        return "dark:text-gray-400";
    }
  };

  const handleAddCode = async (newCode, selectedPlatforms, notificationStatus) => {
    const addUrl = import.meta.env.VITE_API_DNR_ADD;
    try {
      await axios.post(addUrl, {
        emcode: newCode,
        platforms: selectedPlatforms,
        user:user.fullname,
        list: shownList,
        sendEmail: notificationStatus,
      });
      fetchData();
    } catch (error) {
      console.error("Error adding DNR code: ", error);
    }
  };

  const openDeleteModal = (emcode, platform) => {
    setDeleteData([emcode, platform]);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async (emcode, platform, notificationStatus) => {
    const deleteUrl = import.meta.env.VITE_API_DNR_DELETE;
    try {
      await axios.post(deleteUrl, {
        delEm: emcode,
        delPlatform: platform,
        user:user.fullname,
        list: shownList,
        sendEmail: notificationStatus,
      });
      fetchData();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting DNR code: ", error);
    }
  };
  const platforms = Object.keys(platformData);
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col min-h-screen max-w-[1250px] mx-auto">
      <main className="flex-grow container mx-auto py-10">
        <div className="mb-6 rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 bg-white dark:bg-gray-800">
          <ul
            className="-mb-px grid grid-cols-3 flex-wrap gap-4 text-center text-sm font-medium md:grid-cols-3"
            role="tablist"
          >
            <li role="presentation">
              <button
                className={`inline-flex w-full items-center justify-center rounded-lg py-3 ${
                  shownList === "DNR"
                    ? "bg-primary-700 text-white"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                onClick={() => setShownList("DNR")}
                type="button"
              >
                Platform Specific DNR Codes
              </button>
            </li>
            <li role="presentation">
              <button
                className={`inline-flex w-full items-center justify-center rounded-lg py-3 ${
                  shownList === "Exceptions"
                    ? "bg-primary-700 text-white"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                onClick={() => setShownList("Exceptions")}
                type="button"
              >
                Exception List
              </button>
            </li>

            <li role="presentation">
              <button
                className={`inline-flex w-full items-center justify-center rounded-lg py-3 ${
                  shownList === "No Second Looks"
                    ? "bg-primary-700 text-white"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                onClick={() => setShownList("No Second Looks")}
                type="button"
              >
                No Second Looks
              </button>
            </li>
          </ul>
        </div>

        <div className="flex justify-between">
          <div className="w-1/2">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                id="simple-search"
                className="block mb-6 w-[50%] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search EM Codes..."
                value={searchQuery}
                onChange={handleSearch}
                required
              />
            </div>
          </div>

          <div className="flex">
          
          {(shownList === "DNR") && (
            <>
            <div>
            <button
              type="button"
              className="mr-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
              title="View Chart"
              onClick={() => setIsConversionModalOpen(true)}
            >
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12v4m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
              </svg>



              <span className="sr-only">View</span>
            </button>
          </div>
          <div>
              <button
                type="button"
                className="mr-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
                title="Export"
                onClick={exportToExcel}
              >
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 10V4a1 1 0 0 0-1-1H9.914a1 1 0 0 0-.707.293L5.293 7.207A1 1 0 0 0 5 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2M10 3v4a1 1 0 0 1-1 1H5m5 6h9m0 0-2-2m2 2-2 2"/>
                </svg>

                <span className="sr-only">Export</span>
              </button>
            </div>
            </>
            )}
          {[
            "L3: Global Fleet Support Engineer",
            "Fleet Management",
            "Development Team",
          ].includes(user.role) && (
            <div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="mr-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
                title="Add Code"
              >
                <svg className="w-5 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1v12M1 7h12" />
                </svg>
                <span className="sr-only">Create Alert</span>
              </button>
            </div>
          )}
          </div>
        </div>

        {isModalOpen && (
          <div
            id="select-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-40 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative border border-spacing-1 border-gray-400 dark:border-gray-600 bg-white rounded-lg shadow dark:bg-gray-800">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <div className="shrink-0">
                    <img src="/GELOGO.png" className="mr-3 h-8" alt="GE Logo" />
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeModal}
                  >
                    <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 md:p-5">
                  <div className="flow-root">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      <dl className="pb-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                        <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                          SM (Status Message)
                        </dt>
                        <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                          124
                        </dd>
                      </dl>

                      <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                        <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                          SM Description
                        </dt>
                        <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                          Min Pitch Limit Switch Triggered (about 0 deg)
                        </dd>
                      </dl>

                      <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                        <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                          Platform
                        </dt>
                        <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                          1x BEC
                        </dd>
                      </dl>

                      <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                        <dt className="whitespace-nowrap text-base font-semibold text-gray-900 dark:text-white">
                          FHP Box Link
                        </dt>
                        <dd className="text-gray-500 dark:text-gray-400 sm:text-right">
                          <svg className="w-6 h-6 focus:ring-4 focus:ring-primary-300 hover:text-primary-400 dark:hover:text-primary-400 focus:outline-none dark:focus:ring-primary-400 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 24" >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 17V2a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H3a2 2 0 002 2Zm0 0a2 2 0 002 2h12M5 15V1m8 18v-4" />
                          </svg>{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-8 justify-center gap-2">
          {Object.keys(filteredPlatformData)
            .filter((platform) => {
              if (shownList === "DNR") {
                return platform !== "Exceptions" && platform !== "No Second Looks" && platform !== "TCC";
              } else if (shownList === "Exceptions"){
                return platform === "Exceptions" || platform === "TCC";
              } else if (shownList === "No Second Looks"){
                return platform === "No Second Looks";
              }
            })
            .map((platform) => (
              <div key={platform} className="border p-4 rounded-md">
                <h2 title={platform} className="mb-2 text-sm text-white content-center text-center border-b border-gray-700 break-words h-16 w-full">
                  {platform}
                </h2>
                <div>
                  {filteredPlatformData[platform].map(({ emcode }, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 ${getColorClass(
                        platform
                      )}`}
                      role="alert"
                    >
                       {/* onClick={openModal} v */}
                      <svg className="flex-shrink-0 inline w-4 h-4 me-3 cursor-pointer dark:hover:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">{emcode}</span>
                      </div>
                      {[
                        "L3: Global Fleet Support Engineer",
                        "Fleet Management",
                        "Development Team",
                      ].includes(user.role) && (
                        <button
                          onClick={() => openDeleteModal(emcode, platform)}
                          type="button"
                          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                          data-dismiss-target="#toast-default"
                          aria-label="Close"
                        >
                          <span className="sr-only">Close</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        {isAddModalOpen && (
          <DnrListAddModal
            platforms={platforms}
            platformData={platformData}
            onAddCode={handleAddCode}
            shownList={shownList}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
        {isDeleteModalOpen && (
          <DnrListDeleteModal
            isOpen={isDeleteModalOpen}
            deleteData={deleteData}
            onDeleteCode={handleDelete}
            onClose={() => setIsDeleteModalOpen(false)}
          />
        )}

        {isConversionModalOpen && (
          <ConversionModal
            isConversionModalOpen={isConversionModalOpen}
            setIsConversionModalOpen={setIsConversionModalOpen}
            conversionTableData={conversionTableData}
          />
        )}
      </main>
    </div>
  );
};
export default DnrListMain;

import React, { useState } from 'react';
import Drawer from './Scada/SiteDrawer';
import Table from './Scada/Table';
import Navbar from './Components/Navbar';
import AlertModal from './Scada/CreateAlertModal';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  const [createAlertModal, setCreateAlertModal] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const handleRowClick = (site) => {
    setSelectedSite(site);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedSite(null);
  };

  const [assetData, setAssetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the asset data from your backend
    fetch('/api/your-endpoint') // Replace with your actual endpoint
      .then((response) => response.json())
      .then((data) => {
        setAssetData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="dark:bg-gray-900 bg-gray-50 min-h-screen">
      <Navbar className="mb-8" darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <section className="">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <Table onRowClick={handleRowClick} />
          </div>
        </section>
        
        {isDrawerOpen && (
        <Drawer site={selectedSite} onClose={handleCloseDrawer} setCreateAlertModal={setCreateAlertModal}/>
        )}  
        {createAlertModal && (
          <AlertModal setCreateAlertModal={setCreateAlertModal} site={selectedSite}/>
        )}
    </div>
    </div>
  );
}

export default App;

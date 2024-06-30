import React, { useState, useEffect } from 'react';
import Drawer from './Scada/SiteDrawer';
import Table from './Scada/Table';
import Navbar from './Components/Navbar';
import AlertModal from './Scada/CreateAlertModal';
import LoadingPage from './Components/LoadingPage';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [insertTime, setInsertTime] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  const [createAlertModal, setCreateAlertModal] = useState(false);

  const [relatedAssets, setRelatedAssets] = useState([]);
  const [assetData, setAssetData] = useState([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const handleRowClick = (site) => {
    const findAssets = assetData.filter(asset => asset.siteid === site.siteId);
    setRelatedAssets(findAssets);
    setSelectedSite(site);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedSite(null);
  };

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  }

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  

  // const fetchData = async () => {
  //   try{
  //     const response = await fetch('http://localhost:3000/hubcracks', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     if(!response.ok){
  //       throw new Error(`Network response was not ok: ${response.statusText}`);
  //     }
  //     const mergedData = await response.json();
  //     console.log("FETCHED DATA");

  //     const firstAsset = mergedData.length > 0 ? mergedData[0] : null;
  //     const time = firstAsset ? firstAsset.insert_date : null;
  //     setInsertTime(time);

  //     setAssetData(mergedData);
  //     setLoading(false);
  //     setRefreshing(false);
  //   }catch(error){
  //     setError(error);
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // };


  // useEffect(() => {
  //   fetchData();
  // }, []);

  // if(loading){
  //   return <LoadingPage/>;
  // }

  // if (error){
  //   return <p>Error: {error.message}</p>;
  // }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="dark:bg-gray-900 bg-gray-50 min-h-screen">
      <Navbar className="mb-8" darkMode={darkMode} toggleDarkMode={toggleDarkMode} handleRefresh={handleRefresh} refreshing={refreshing}/>
        <section className="">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <Table selectedSite={selectedSite} onRowClick={handleRowClick} assetData={assetData} insertTime={insertTime}/>
          </div>
        </section>
        
        {isDrawerOpen && (
        <Drawer site={selectedSite} relatedAssets={relatedAssets} onClose={handleCloseDrawer} setCreateAlertModal={setCreateAlertModal}/>
        )}  
        {createAlertModal && (
          <AlertModal setCreateAlertModal={setCreateAlertModal} site={selectedSite}/>
        )}
    </div>
    </div>
  );
}

export default App;

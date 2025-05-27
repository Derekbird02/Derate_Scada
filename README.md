const updatedSelectedSite = updatedSiteData.find(
      (site) => site.site_name === editSite.site_name
    );
    setSelectedSite(updatedSelectedSite);
    setEditSite(updatedSelectedSite);

    // Close edit mode
    setEditState(false);

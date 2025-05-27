const response = await fetch(import.meta.env.APP_CALL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const updatedSiteData = await response.json();
    setSiteData(updatedSiteData);

    // Update the currently selected site
    const updatedSelectedSite = updatedSiteData.find(
      (site) => site.site_name === editSite.site_name
    );
    setSelectedSite(updatedSelectedSite);
    setEditSite(updatedSelectedSite);

    // Close edit mode
    setEditState(false);

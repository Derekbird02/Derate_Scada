const [siteOfftakers, setSiteOfftakers] = useState(
    [currentSiteData.ba, currentSiteData.rc, currentSiteData.tou]
      .filter(Boolean)
      .join("\n")
  );

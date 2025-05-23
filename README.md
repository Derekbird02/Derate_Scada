const options = [
  { label: "All", value: "all", type: "all" },
  ...unitOptions,
  ...feederOptions
];


if (value === "all") {
  if (checked) {
    // Add all unique feeders (avoid duplicates)
    const allFeeders = [
      ...new Map(
        SiteFeeders
          .filter(d => d.siteid === currentSiteData.site_id)
          .map(d => [`${d.feedername}||${d.unitnumber}`, {
            feedername: d.feedername,
            unitnumber: d.unitnumber
          }])
      ).values()
    ];

    newSelected = allFeeders;
  } else {
    // Uncheck everything
    newSelected = [];
  }
}


if (opt.type === "all") {
  const allFeeders = SiteFeeders.filter(d => d.siteid === currentSiteData.site_id);
  return allFeeders.every(f =>
    valueToPercent.some(v =>
      v.feedername === f.feedername && v.unitnumber === f.unitnumber
    )
  );
}

if (opt.type === "unit") {
  const unitnumber = opt.value.split("||")[1];
  const unitFeeders = data.filter(d => d.siteid === siteid && d.unitnumber === unitnumber);
  return unitFeeders.every(f =>
    valueToPercent.some(v => v.feedername === f.feedername && v.unitnumber === f.unitnumber)
  );
}

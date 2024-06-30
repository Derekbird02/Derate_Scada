const sortByState = (a, b) => {
  // Place quality === 0 at the end
  if (a.quality === 0 && b.quality !== 0) return 1;
  if (a.quality !== 0 && b.quality === 0) return -1;

  // For assets with quality === 3, sort according to stateOrder
  if (a.quality === 3 && b.quality === 3) {
    const stateA = stateOrder[a.ieccode] || 99;
    const stateB = stateOrder[b.ieccode] || 99;
    return stateA - stateB;
  }

  // If one of the assets has quality !== 3, do not change their relative order
  if (a.quality === 3 && b.quality !== 3) return -1;
  if (a.quality !== 3 && b.quality === 3) return 1;

  // If both assets do not have quality === 3, maintain their relative order
  return 0;
};

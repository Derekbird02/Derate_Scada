{allPlatforms.map((p, index) => {
  const platformTaken = frequencyData.some(
    (entry) => entry.emcode === Number(emcode) && entry.platform === p
  );
  return (
    <option
      key={index}
      value={p}
      disabled={platformTaken}
    >
      {p}{platformTaken ? " (Taken)" : ""}
    </option>
  );
})}

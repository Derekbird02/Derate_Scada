// Outside the component
const initialFeederArray = (() => {
  const feederArray = {};

  Object.keys(organizedData).forEach(unitnumber => {
    Object.keys(organizedData[unitnumber]).forEach(feedernumber => {
      feederArray[feedernumber] = 'or';
    });
  });

  return feederArray;
})();

// Inside the component
const MyComponent = () => {
  const [feederArray, setFeederArray] = useState(initialFeederArray);

  // Rest of your component logic
};

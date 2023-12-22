export function findUniqueAndNonUniqueServiceIds(data, property) {
  const propertyCounts = {};
  const uniqueArrayOfObjects = [];
  let nonUniqueValues = [];

  data.forEach((item) => {
    const value = String(item[property]); // Convert to string
    propertyCounts[value] = (propertyCounts[value] || 0) + 1;
  });

  for (const item of data) {
    const value = String(item[property]);
    if (propertyCounts[value] === 1) {
      uniqueArrayOfObjects.push(item);
    } else {
      nonUniqueValues.push(value);
    }
  }

  nonUniqueValues = new Set(nonUniqueValues);

  return { uniqueArrayOfObjects, nonUniqueValues: [...nonUniqueValues] };
}

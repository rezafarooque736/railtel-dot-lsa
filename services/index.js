export async function getLSAData(state) {
  const res = await fetch(`http://localhost:3000/api/lsa/${state}/view`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data /api/lsa/${state}/view`);
  }

  const { data } = await res.json();
  return data;
}

export async function updateLSAData(data) {
  console.log(data);
  const res = await fetch("/api/lsa/update-data", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to update data /api/lsa/update-data`);
  }

  const resData = await res.json();
  return resData;
}

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

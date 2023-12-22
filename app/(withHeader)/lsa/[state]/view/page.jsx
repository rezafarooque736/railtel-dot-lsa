import { lsaColumns } from "@/components/table/Columns";
import { DataTable } from "@/components/table/DataTable";
import Title from "@/components/ui/title";
import { getLSAData } from "@/services";

export default async function Page({ params: { state } }) {
  const lsaData = await getLSAData(state);
  return (
    <div className="w-screen h-full px-10">
      <div className="h-full">
        <DataTable
          columns={lsaColumns}
          data={lsaData}
          tableHeaderText="Customer List of Internet Lease Line"
        />
      </div>
    </div>
  );
}

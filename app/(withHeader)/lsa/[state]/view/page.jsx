import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { getLSAData } from "@/services";

export default async function Page({ params: { state } }) {
  const lsaData = await getLSAData(state);
  return (
    <div className="w-screen h-full px-10">
      <div className="h-full">
        <DataTable
          columns={columns}
          data={lsaData}
          tableHeaderText="RailTel IBW Customer list"
        />
      </div>
    </div>
  );
}

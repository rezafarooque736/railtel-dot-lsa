import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadCloudIcon from "../icons/upload-cloud-icon";
import DocumentArrowUpIcon from "../icons/document-arrow-up";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function UploadExcelSeet() {
  const [file, setFile] = useState(null);
  const excelFileRef = useRef(null);

  const handleExcelFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleExcelFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const formData = new FormData();
      formData.set("file", file);

      const res = await fetch("/api/lsa/upload/excel", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast[data.type](data.message, {
          autoClose: 12000,
        });
      } else {
        console.error("data not uploaded");
        toast[data.type](data.message);
      }

      setFile(null);
      excelFileRef.current.value = null;
    } catch (error) {
      console.error("Error during uploading of file", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="items-center px-3 py-2 text-sm font-semibold uppercase border hover:rounded-lg bg-zinc-100 text-slate-800 hover:text-slate-800 hover:bg-white hover:border-slate-400"
        >
          Upload Excel Sheet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] pb-3">
        <DialogHeader>
          <DialogTitle>Upload Excel Sheet</DialogTitle>
          <DialogDescription>
            Only .xlsx file can be uploaded here, not csv file.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleExcelFileSubmit}>
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center">
                    <UploadCloudIcon />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <h3 className="text-lg font-medium">{file?.name}</h3>
                  </div>
                  <input
                    ref={excelFileRef}
                    type="file"
                    accept=".xlsx"
                    id="dropzone-file"
                    onChange={handleExcelFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              <Button type="submit" className="gap-3 hover:bg-primary-hover">
                <DocumentArrowUpIcon /> Upload
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

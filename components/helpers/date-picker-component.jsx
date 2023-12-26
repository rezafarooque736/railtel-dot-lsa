import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerComponent({ date, setDate }) {
  return (
    <DatePicker
      className="flex w-full px-3 py-1 text-sm transition-colors bg-transparent border rounded-md shadow-sm h-9 border-slate-300 border-r-sky-500 border-b-sky-500 focus-visible:border-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      selected={date}
      onChange={(date) => setDate(date)}
    />
  );
}

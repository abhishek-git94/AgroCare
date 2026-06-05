import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Calendar({ selected, onSelect }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <DayPicker mode="single" selected={selected} onSelect={onSelect} />
    </div>
  );
}

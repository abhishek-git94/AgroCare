import { Mic } from "lucide-react";
import { useState } from "react";

export default function VoiceFAB() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Voice assistant"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-green-600 shadow-lg"
      >
        <Mic className="h-6 w-6 text-white" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 w-[90%] max-w-md mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-6">
                <Mic className="h-8 w-8 text-green-600" />
              </div>

              <h2 className="mt-4 text-lg font-bold">Listening...</h2>

              <p className="text-gray-500 text-sm mt-2">
                Ask about crops, prices, soil or weather
              </p>

              <button
                onClick={() => setOpen(false)}
                className="mt-6 px-4 py-2 border rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

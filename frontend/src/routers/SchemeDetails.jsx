import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Landmark,
  CheckCircle,
  AlertTriangle,
  Upload,
  FileText,
} from "lucide-react";

const schemes = {
  pmkisan: {
    name: "PM-KISAN",
    amount: "₹6,000/year",
    description:
      "Direct income support of ₹6,000 per year to eligible farmer families.",
    documents: [
      "Aadhaar Card",
      "Bank Passbook",
      "Land Record",
      "Passport Photo",
    ],
  },

  pmfby: {
    name: "PM Fasal Bima Yojana",
    amount: "Up to ₹2 Lakh",
    description: "Crop insurance scheme protecting farmers against crop loss.",
    documents: [
      "Aadhaar Card",
      "Land Record",
      "Bank Account",
      "Sowing Certificate",
    ],
  },

  kcc: {
    name: "Kisan Credit Card",
    amount: "Loan up to ₹3 Lakh",
    description: "Provides affordable credit to farmers for agriculture needs.",
    documents: ["Aadhaar Card", "PAN Card", "Land Record", "Passport Photo"],
  },

  smam: {
    name: "SMAM Machinery Subsidy",
    amount: "40% Subsidy",
    description: "Financial assistance for purchasing agricultural machinery.",
    documents: ["Aadhaar Card", "Bank Passbook", "Quotation", "Land Record"],
  },

  pkvy: {
    name: "Paramparagat Krishi Vikas Yojana",
    amount: "₹50,000/ha",
    description: "Supports organic farming and organic certification.",
    documents: [
      "Aadhaar Card",
      "Soil Report",
      "Land Record",
      "Organic Certificate",
    ],
  },
};

export default function SchemeDetails() {
  const { id } = useParams();

  const scheme = schemes[id];

  const [uploadedDocs, setUploadedDocs] = useState([]);

  if (!scheme) {
    return (
      <div className="bg-slate-50 min-h-screen p-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Scheme Not Found</h2>

        <Link
          to="/schemes"
          className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl font-bold hover:bg-emerald-100 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Schemes
        </Link>
      </div>
    );
  }

  const toggleDoc = (doc) => {
    if (uploadedDocs.includes(doc)) {
      setUploadedDocs(uploadedDocs.filter((d) => d !== doc));
    } else {
      setUploadedDocs([...uploadedDocs, doc]);
    }
  };

  const allUploaded = uploadedDocs.length === scheme.documents.length;

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-blue-50/50 min-h-screen pb-10">
      <div className="p-4 space-y-5 relative z-10 max-w-lg mx-auto">
        {/* Back Button */}
        <Link
          to="/schemes"
          className="inline-flex items-center gap-2 mb-2 px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-xl text-slate-600 font-bold hover:bg-white hover:text-emerald-600 transition-colors shadow-sm"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* Scheme Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
            <Landmark size={120} />
          </div>
          
          <div className="flex items-center gap-4 relative z-10 mb-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <Landmark size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black leading-tight tracking-tight">{scheme.name}</h1>
              <p className="text-emerald-200 font-bold mt-1 bg-black/20 px-2 py-0.5 rounded-lg w-fit text-sm shadow-inner">{scheme.amount}</p>
            </div>
          </div>

          <p className="text-emerald-50 font-medium leading-relaxed relative z-10 text-sm">{scheme.description}</p>
        </div>

        {/* Eligibility */}
        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <div className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg">
              <CheckCircle size={18} />
            </div>
            Eligibility
          </h2>

          <ul className="space-y-3">
            <li className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-3 rounded-xl">
              <div className="bg-emerald-100 text-emerald-600 rounded-full p-1"><CheckCircle size={14} /></div>
              <span className="font-bold text-slate-700 text-sm">Indian Farmer</span>
            </li>

            <li className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-3 rounded-xl">
              <div className="bg-emerald-100 text-emerald-600 rounded-full p-1"><CheckCircle size={14} /></div>
              <span className="font-bold text-slate-700 text-sm">Aadhaar Linked</span>
            </li>

            <li className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-3 rounded-xl">
              <div className="bg-emerald-100 text-emerald-600 rounded-full p-1"><CheckCircle size={14} /></div>
              <span className="font-bold text-slate-700 text-sm">Valid Bank Account</span>
            </li>
          </ul>
        </div>

        {/* Documents */}
        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
              <FileText size={20} />
            </div>
            <h2 className="font-bold text-lg text-slate-800">Required Documents</h2>
          </div>

          <div className="space-y-3">
            {scheme.documents.map((doc) => (
              <div
                key={doc}
                className={`flex justify-between items-center border p-3 rounded-2xl transition-colors ${
                  uploadedDocs.includes(doc) 
                    ? 'border-emerald-200 bg-emerald-50' 
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${uploadedDocs.includes(doc) ? 'bg-emerald-200 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                    <FileText size={16} />
                  </div>
                  <span className={`font-bold text-sm ${uploadedDocs.includes(doc) ? 'text-emerald-800' : 'text-slate-700'}`}>{doc}</span>
                </div>

                <button
                  onClick={() => toggleDoc(doc)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    uploadedDocs.includes(doc) 
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm" 
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                  }`}
                >
                  {uploadedDocs.includes(doc) ? <><CheckCircle size={14}/> Uploaded</> : <><Upload size={14}/> Upload</>}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Section */}
        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
          <h2 className="font-bold text-lg text-slate-800 mb-3">Application Status</h2>

          {allUploaded ? (
            <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 border border-emerald-100 p-3 rounded-xl font-bold text-sm">
              <div className="bg-emerald-200 text-emerald-600 rounded-full p-1">
                <CheckCircle size={16} />
              </div>
              All documents uploaded.
            </div>
          ) : (
            <div className="flex items-center gap-3 text-amber-700 bg-amber-50 border border-amber-100 p-3 rounded-xl font-bold text-sm">
              <div className="bg-amber-200 text-amber-600 rounded-full p-1">
                <AlertTriangle size={16} />
              </div>
              Upload all required documents.
            </div>
          )}

          <button
            disabled={!allUploaded}
            className={`mt-5 w-full py-3.5 rounded-2xl font-bold transition-all shadow-md flex justify-center items-center gap-2 ${
              allUploaded
                ? "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            }`}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

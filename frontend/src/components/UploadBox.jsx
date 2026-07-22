import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCamera, FaTrash } from "react-icons/fa";

function UploadBox() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto detect meal type
  const getDefaultMealType = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 11) return "Breakfast";
    if (hour >= 11 && hour < 16) return "Lunch";
    if (hour >= 16 && hour < 19) return "Snack";
    return "Dinner";
  };

  const [mealType, setMealType] = useState(getDefaultMealType());

  const inputRef = useRef();
  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", image.file);

      const response = await axios.post(
  "https://nutrilens-ai-igp4.onrender.com/analyze-meal",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      // Current meal
      localStorage.setItem(
        "mealAnalysis",
        JSON.stringify(response.data)
      );

      // History
      const history =
        JSON.parse(localStorage.getItem("mealHistory")) || [];

      history.unshift({
        ...response.data,
        mealType,
        date: new Date().toLocaleString(),
      });

      localStorage.setItem(
        "mealHistory",
        JSON.stringify(history)
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to analyze meal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 w-full max-w-2xl rounded-3xl border border-cyan-500/20 bg-slate-900 p-8 shadow-lg shadow-cyan-500/10">
      {!image ? (
        <div className="flex flex-col items-center">
          <FaCamera className="text-6xl text-cyan-400" />

          <h2 className="mt-4 text-2xl font-semibold">
            Upload Your Meal
          </h2>

          <p className="mt-2 text-gray-400">
            JPG, PNG or JPEG
          </p>

          <button
            onClick={() => inputRef.current.click()}
            className="mt-8 rounded-xl bg-cyan-500 px-8 py-3 font-semibold transition hover:bg-cyan-400"
          >
            Choose Image
          </button>

          <input
            ref={inputRef}
            hidden
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={image.preview}
            alt="Meal Preview"
            className="h-80 w-full rounded-2xl object-cover"
          />

          {/* Meal Type */}
          <div className="mt-6 w-full">
            <label className="block mb-2 text-left text-sm text-gray-400">
              Meal Type
            </label>

            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full rounded-xl border border-cyan-500/20 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Snack</option>
              <option>Dinner</option>
            </select>
          </div>

          <div className="mt-8 flex gap-5">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Meal"}
            </button>

            <button
              onClick={() => setImage(null)}
              className="rounded-xl bg-red-500 px-5 py-3 transition hover:bg-red-400"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadBox;
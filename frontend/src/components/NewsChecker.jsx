import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsChecker = () => {
  const [newsText, setNewsText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!newsText.trim()) {
      toast.warn("Please enter news text!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://fake-news-detection-backend-hfa0.onrender.com/predict", {
        text: newsText,
      });
      console.log("Response from backend:", response.data.result);
      if (response.data.result === "fake") {
        toast.error("The news is fake.❌");
      } else if (response.data.result === "true") {
        toast.success("The news is real.️");
      }
      setResult(response.data.result);
    } catch (err) {
      console.error(err);
      toast.error("Error while predicting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <textarea
        placeholder="Enter your text here.."
        className="w-full max-w-md px-6 py-3 rounded-2xl text-black text-lg shadow-lg bg-white outline-none focus:outline focus:outline-black focus:outline-2 resize-none"
        rows="4"
        value={newsText}
        onChange={(e) => setNewsText(e.target.value)}
      />
      <button
        onClick={handleCheck}
        className="mt-4 w-full max-w-md px-6 py-3 bg-red-500 text-white font-semibold rounded-full shadow hover:bg-gray-800 transition"
      >
        {loading ? "Checking..." : "Predict"}
      </button>
  
      <ToastContainer position="top-center" autoClose={3000} />

    </div>
  );  
};

export default NewsChecker;

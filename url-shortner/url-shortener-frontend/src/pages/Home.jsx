import { useState } from "react";
import API from "../services/api";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      const res = await API.post("/api/url/shorten", { originalUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">Shorten Your URL</h1>

      <form onSubmit={handleSubmit} className="flex gap-3 justify-center mb-5">
        <input
          type="text"
          placeholder="Enter your URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="border border-gray-300 px-4 py-3 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition">
          {loading ? "..." : "Shorten"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {shortUrl && (
        <div className="bg-gray-100 p-4 rounded shadow text-left">
          <p className="font-semibold">Short URL:</p>

          <a
            href={shortUrl}
            target="_blank"
            className="text-blue-600 underline break-words"
          >
            {shortUrl}
          </a>

          <button
            onClick={() => navigator.clipboard.writeText(shortUrl)}
            className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Copy URL
          </button>
        </div>
      )}
    </div>
  );
}

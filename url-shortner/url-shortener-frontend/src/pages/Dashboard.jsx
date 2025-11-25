import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    const res = await API.get("/api/url/user-urls");
    setUrls(res.data.urls);
    setLoading(false);
  };

  const deleteUrl = async (id) => {
    if (!confirm("Delete this URL?")) return;

    await API.delete(`/api/url/delete/${id}`);
    fetchUrls();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUrls();
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6">Your URLs</h2>

      {urls.length === 0 && (
        <p className="text-gray-600 text-lg">No URLs yet.</p>
      )}

      {urls.map((url) => (
        <div
          key={url._id}
          className="border p-4 rounded-md shadow-sm bg-white mb-4"
        >
          <p>
            <b>Original:</b> {url.originalUrl}
          </p>
          <p>
            <b>Short:</b>{" "}
            <a
              href={`http://localhost:5000/${url.shortId}`}
              target="_blank"
              className="text-blue-600 underline break-all"
            >
              http://localhost:5000/{url.shortId}
            </a>
          </p>
          <p>
            <b>Clicks:</b> {url.clicks}
          </p>

          <div className="flex gap-3 mt-3">
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `http://localhost:5000/${url.shortId}`
                )
              }
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Copy
            </button>

            <button
              onClick={() => deleteUrl(url._id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

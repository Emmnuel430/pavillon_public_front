import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { cleanHTML } from "../utils/cleanHtml";
import LayoutPublic from "../components/public_layout/LayoutPublic";
import Loader from "../components/Layout/Loader";

export default function SubsectionDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { type } = location.state || { type: "subsection" }; // 🔹 défaut : sous-section
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const LINK = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setLoading(true);
    const endpoint =
      type === "blog"
        ? `${LINK}/api/blogs-public/${id}`
        : `${LINK}/api/subsections/${id}`;

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id, LINK, type]);

  return (
    <LayoutPublic>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : !item ? (
        <p className="text-center text-red-500">Contenu introuvable.</p>
      ) : (
        <div className="max-w-4xl mt-[11rem] mb-3 mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
          {/* 🔹 Titre */}
          <h2 className="text-3xl font-semibold text-gray-800">{item.title}</h2>

          {/* 🔹 Date */}
          {(item.publish_at || item.date || item.created_at) && (
            <p className="text-sm text-gray-500">
              📅{" "}
              {new Date(
                item.publish_at || item.date || item.created_at
              ).toLocaleDateString()}
            </p>
          )}

          {/* 🔹 Image */}
          {item.image && (
            <div className="overflow-hidden rounded-lg shadow-md">
              <img
                src={`${LINK}/storage/${item.image}`}
                alt={item.title}
                className="w-full max-h-[60vh] object-cover"
              />
            </div>
          )}

          {/* 🔹 Contenu HTML */}
          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{
              __html: item.content ? cleanHTML(item.content) : "",
            }}
          />
        </div>
      )}
    </LayoutPublic>
  );
}

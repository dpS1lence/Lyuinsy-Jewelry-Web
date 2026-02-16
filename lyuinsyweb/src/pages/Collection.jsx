import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ScrollAnimation from "../components/ScrollAnimation";
import OptimizedImage from "../components/OptimizedImage";
import { getOneCollectionBySlug } from "../lib/appwrite";

const Collection = () => {
  const { id } = useParams(); // Extract collection ID from URL
  const [collection, setCollection] = useState(null); // Initialize state for collection
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCollection = async () => {
      try {
        const data = await getOneCollectionBySlug(id); // Await the promise
        setCollection(data);
      } catch (error) {
        console.error("Failed to fetch collection:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Зареждане...</p>
      </div>
    );
  }

  if (!collection) {
    return <div>Not found</div>; // Show if collection is null
  }

  const { name, description, items } = collection;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 relative">
          <h2 className="text-3xl font-serif mb-4 text-text">{name}</h2>
          <p className="text-text">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items
            .filter((item) => !item["upsellOffer"])
            .map((item) => {
              const {
                $id,
                name,
                description,
                image,
                oldPrice,
                actualPrice,
                specialOffer,
                quantity,
                slug,
              } = item;

              return (
                <div
                  key={$id}
                  className={`group bg-background shadow-sm overflow-hidden ${
                    quantity === 0 ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <Link
                    to={quantity === 0 ? "#" : `/item/${item.slug}`}
                    className={quantity === 0 ? "pointer-events-none" : ""}
                  >
                    <div className="relative">
                      <OptimizedImage
                        src={image}
                        alt={name}
                        className={`w-full h-64 object-cover ${
                          quantity === 0 ? "filter grayscale" : ""
                        }`}
                      />
                      {quantity === 0 && (
                        <div className="absolute inset-0 bg-accentbackground opacity-50 flex items-center justify-center">
                          <span className="text-black text-4xl font-bold">
                            Изчерпана
                          </span>
                        </div>
                      )}
                      {specialOffer && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-discount text-white px-4 py-1 rounded-full text-sm font-bold">
                            Специална Оферта
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif mb-2 text-text">
                        {name}
                      </h3>
                      <p className=" mb-4 h-28 text-gray-500 overflow-hidden">
                        {description.length > 100
                          ? `${description.slice(0, 200)}...`
                          : description}
                      </p>
                      <div className="flex flex-col md:flex-row justify-between items-start">
                        <div className="flex flex-col items-start justify-center gap-1">
                          {oldPrice ? (
                            <>
                              <span className="text-sm font-light line-through text-gray-500">
                                {oldPrice.toFixed(2)}€
                              </span>
                              <span className="text-2xl font-thin text-discount">
                                {actualPrice.toFixed(2)}€
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-thin text-text">
                              {actualPrice.toFixed(2)}€
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className="text-center mt-12">
          <Link
            className="bg-black text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors"
            to="/collections"
          >
            Виж всички
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Collection;

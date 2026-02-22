import React, { useState } from "react";
import { useApiGet } from "../hook/Apis hooks/useApi";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import { FiEye, FiX } from "react-icons/fi";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image_url: string;
  in_stock: boolean;
}

const StorePage: React.FC = () => {
  const { data, isLoading, isError, error } = useApiGet("/products", {}, ["products"]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsList = data?.products ?? [];

  if (isLoading) return <LoadingScreen message="جاري تحميل المنتجات..." />;
  if (isError) return <ErrorScreen statusCode={(error as any)?.status} />;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-5 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-emerald-700 mb-10">
          متجر ثانية
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsList.map((product: Product, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 duration-300 flex flex-col
                ${product.in_stock
                  ? "hover:shadow-[0_15px_30px_-5px_rgba(16,185,129,0.35)]"
                  : "hover:shadow-[0_15px_30px_-5px_rgba(239,68,68,0.35)]"
                }`} >
              <div className="h-52 bg-white flex items-center justify-center p-4">
                <motion.img
                  src={product.image_url}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-emerald-700"> {product.title} </h3>

                <p className="text-gray-600 text-sm mt-2 flex-grow line-clamp-3"> {product.description} </p>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-800"> {product.price} {product.currency} </p>

                  <button onClick={() => setSelectedProduct(product)} className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-md hover:shadow-emerald-400 text-xl">
                    <FiEye />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl w-[90%] max-w-md p-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl"
              >
                <FiX />
              </button>

              <div className="h-56 flex items-center justify-center">
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.title}
                  className="max-h-full max-w-full object-contain rounded-2xl"
                />
              </div>

              <h3 className="text-xl font-bold text-emerald-700 mt-4">
                {selectedProduct.title}
              </h3>

              <p className="text-gray-600 mt-2 whitespace-pre-line break-words">
                {selectedProduct.description}
              </p>

              <p className="mt-4 text-lg font-bold text-gray-800">
                {selectedProduct.price} {selectedProduct.currency}
              </p>

              <p
                className={`mt-2 font-semibold ${
                  selectedProduct.in_stock
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {selectedProduct.in_stock ? "متوفر حالياً" : "غير متوفر"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StorePage;
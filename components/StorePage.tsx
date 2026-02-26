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

  const { data, isLoading, isError, error } =
    useApiGet("/products", {}, ["products"]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productsList = data?.products ?? [];

  if (isLoading)
    return <LoadingScreen message="جاري تحميل المنتجات..." />;

  if (isError)
    return <ErrorScreen statusCode={(error as any)?.status} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-all duration-500 px-4 sm:px-10 py-12">

      <div className="max-w-7xl mx-auto space-y-14">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">
            متجر ثانية
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            استعرض المنتجات الطبية المتاحة داخل المتجر مع تجربة عرض احترافية وسلسة.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {productsList.map((product: Product, index: number) => (

            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative flex flex-col bg-white dark:bg-gray-800 rounded-[36px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >

              {/* Image Section */}
              <div className="h-64 bg-gray-50 dark:bg-gray-700/30 flex items-center justify-center p-8">

                <img
                  src={product.image_url || "/placeholder.png"}
                  alt={product.title}
                  loading="lazy"
                  className="object-contain max-h-full w-full rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/placeholder.png";
                  }}
                />

              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-grow space-y-6">

                <div className="space-y-3 flex-grow">

                  <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 line-clamp-2">
                    {product.title}
                  </h2>

                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">

                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.price} {product.currency}
                    </p>

                    <span className={`text-sm font-semibold ${
                      product.in_stock
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-500 dark:text-red-400"
                    }`}>
                      {product.in_stock ? "متوفر حالياً" : "غير متوفر"}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-14 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg hover:shadow-emerald-400/50 transition-all duration-300 text-xl"
                  >
                    <FiEye />
                  </button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>

        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-2xl p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative w-full max-w-xl bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl overflow-hidden"
            >

              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 text-gray-500 hover:text-red-500 text-2xl z-20"
              >
                <FiX />
              </button>

              <div className="h-72 bg-gray-50 dark:bg-gray-700/30 flex items-center justify-center p-10">
                <img
                  src={selectedProduct.image_url || "/placeholder.png"}
                  alt={selectedProduct.title}
                  loading="lazy"
                  className="object-contain max-h-full w-full rounded-3xl"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/placeholder.png";
                  }}
                />
              </div>

              <div className="p-8 space-y-6">

                <h3 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                  {selectedProduct.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line break-words">
                  {selectedProduct.description}
                </p>

                <div className="pt-5 border-t border-gray-100 dark:border-gray-700">

                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedProduct.price} {selectedProduct.currency}
                  </p>

                  <p className={`mt-2 font-semibold ${
                    selectedProduct.in_stock
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}>
                    {selectedProduct.in_stock ? "متوفر حالياً" : "غير متوفر"}
                  </p>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default StorePage;
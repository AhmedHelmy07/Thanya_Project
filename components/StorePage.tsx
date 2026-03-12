import React, { useState } from "react";
import { useApiGet, useApiPost} from "../hook/Apis hooks/useApi";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import {FiEye,FiX,FiShoppingCart,FiPlus,FiMinus,FiTrash2,} from "react-icons/fi";


interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image_url: string;
  in_stock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const StorePage: React.FC = () => {
  const { data, isLoading, isError, error } = useApiGet("/products",{},["products"]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<{message: string; type: "success" | "error"  | "warning";} | null>(null);
  const orderMutation = useApiPost("/orders");
  const productsList = data?.products ?? [];

  if (isLoading) return <LoadingScreen message="جاري تحميل المنتجات..." />;
  if (isError) return <ErrorScreen statusCode={(error as any)?.status} />;


  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increase = (id: string) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrease = (id: string) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
          : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const checkout = () => {
    orderMutation.mutate(  {path: "/api/orders",
      data: cart},
      {
      onSuccess: () => {
        setCart([]);
        setCartOpen(false);
        setToast({message: "تم تسجيل الطلب بنجاح!",type: "success",});
        setTimeout(() => setToast(null), 5000);
      },
      onError: () => {
        setToast({message: "حدث خطأ أثناء تسجيل الطلب!",type: "error",});
        setTimeout(() => setToast(null), 5000);
      },
    });
  };
  return (
  <div className="relative overflow-hidden py-24 px-6 lg:px-20 rounded-3xl bg-gradient-to-r from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">

      <div
        className="absolute top-0 left-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      ></div>
      <div
        className="absolute top-1/3 right-0 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      ></div>
      <div
        className="absolute bottom-0 left-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      ></div>
    <div className="max-w-7xl mx-auto p-6 sm:p-10">
      <div className="space-y-6 text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">
          متجر ثانية
        </h1>

        <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
          استعرض المنتجات الطبية المتاحة داخل المتجر مع تجربة عرض احترافية وسلسة.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsList.map((product: Product, index: number) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -8, transition: { duration: 0.15 } }}
            className={`relativebg-gradient-to-r from-emerald-400 to-emerald-50 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col
            ${
              product.in_stock
                ? "hover:shadow-[0_15px_30px_-5px_rgba(16,185,129,0.35)]"
                : "hover:shadow-[0_15px_30px_-5px_rgba(239,68,68,0.35)]"
            }`}>
            <div className="h-52 bg-white/80 dark:bg-gray-900/60 flex items-center justify-center p-4">
              <motion.img
                src={product.image_url}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                {product.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 flex-grow line-clamp-3">
                {product.description}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {product.price} {product.currency}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (!product.in_stock) {
                        setToast({
                          message: "المنتج غير متوفر حالياً",
                          type: "error",
                        });
                        setTimeout(() => setToast(null), 4000);
                        return;
                      }

                      const exists = cart.find(item => item.id === product.id);

                      if (exists) {
                        setToast({
                          message: "المنتج موجود بالفعل في السلة",
                          type: "warning",
                        });
                        setTimeout(() => setToast(null), 4000);
                        return;
                      }

                      addToCart(product);

                      setToast({
                        message: "تم إضافة المنتج إلى السلة",
                        type: "success",
                      });

                      setTimeout(() => setToast(null), 4000);
                    }}
                    className={`p-3 rounded-full text-white transition shadow-md
                    ${
                      product.in_stock
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FiShoppingCart />
                  </button>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-md"
                  >
                    <FiEye />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>

    <AnimatePresence>
      {selectedProduct && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <motion.div
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >

            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl"
            >
              <FiX />
            </button>

            <img
              src={selectedProduct.image_url}
              alt={selectedProduct.title}
              className="h-56 mx-auto object-contain"
            />

            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mt-4">
              {selectedProduct.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {selectedProduct.description}
            </p>

            <p className="mt-4 text-lg font-bold text-gray-800 dark:text-gray-200">
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
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white/90 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl z-50 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">السلة</h2>
                <button onClick={() => setCartOpen(false)}>
                  <span className="text-gray-600 dark:text-gray-300 hover:text-red-500">
                  <FiX size={22}/>
                  </span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">السلة فارغة</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 mb-5 border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center p-2 shadow">
                        <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.price} {item.currency}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => decrease(item.id)} className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg">
                            <FiMinus size={14} />
                          </button>

                          <span className="text-gray-900 dark:text-gray-100">{item.quantity}</span>

                          <button onClick={() => increase(item.id)} className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg">
                            <FiPlus size={14} />
                          </button>

                          <button onClick={() => removeItem(item.id)} className="text-red-500 ml-auto">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                        {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    الإجمالي: {totalPrice.toFixed(2)}
                  </p>

                  <button
                    onClick={checkout}
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl transition shadow-md"
                  >
                    إتمام الشراء
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!cartOpen && (
          <motion.button
            onClick={() => setCartOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50 bg-emerald-700/60 backdrop-blur-sm text-white p-3 rounded-full shadow-lg border border-emerald-400/20 hover:bg-emerald-600 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] " >
            <div className="relative">
              <FiShoppingCart size={18} />

              {cart.length > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full shadow" >
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-20 right-10 text-white text-sm px-4 py-2 rounded-lg shadow-md z-50
              ${
                toast.type === "success"
                  ? "bg-emerald-600"
                  : toast.type === "error"
                  ? "bg-red-500"
                  : "bg-yellow-500 text-black"
              }`} >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StorePage;
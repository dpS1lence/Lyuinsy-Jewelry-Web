import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingBasket } from 'lucide-react';

export default function CheckoutButton({ checkoutRef }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });

  useEffect(() => {
    if (checkoutRef?.current) {
      ref(checkoutRef.current);
    }
  }, [checkoutRef, ref]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!inView);
  }, [inView]);

  const scrollToCheckout = () => {
    checkoutRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="sticky z-20 bottom-10 left-0 right-0 flex justify-center"
    >
        <motion.button
            onClick={scrollToCheckout}
            className="w-11/12 max-w-52 bg-pink-400 flex flex-row items-center justify-center gap-1 text-white font-bold text-xl py-3 rounded-full shadow-lg hover:bg-pink-600"
            animate={{
                scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
            ><ShoppingBasket />
            Грабни!
        </motion.button>

    </motion.div>
  );
}

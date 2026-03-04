import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingBasket } from "lucide-react";

export default function CheckoutButton({ checkoutRef }) {
  const { ref: formRef, inView: formInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const { ref: footerRef, inView: footerInView } = useInView({
    threshold: 0.05,
    triggerOnce: false,
  });

  useEffect(() => {
    if (checkoutRef?.current) {
      formRef(checkoutRef.current);
    }
  }, [checkoutRef, formRef]);

  useEffect(() => {
    const footerEl = document.querySelector("footer");
    if (footerEl) footerRef(footerEl);
  }, [footerRef]);

  const visible = !formInView && !footerInView;

  const scrollToCheckout = () => {
    checkoutRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed z-50 bottom-0 left-0 right-0 md:hidden px-4 pb-4 pt-2 bg-gradient-to-t from-white via-white/95 to-transparent"
    >
      <motion.button
        onClick={scrollToCheckout}
        className="w-full bg-discount flex flex-row items-center justify-center gap-2 text-white font-bold text-lg py-4 rounded-2xl shadow-2xl active:scale-95 transition-transform"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <ShoppingBasket className="w-5 h-5" />
        Поръчай сега
      </motion.button>
    </motion.div>
  );
}

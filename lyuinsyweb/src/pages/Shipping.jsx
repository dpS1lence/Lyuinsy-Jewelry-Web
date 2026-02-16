import { useEffect } from "react";

const Shipping = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col items-center bg-background p-4 md:p-8">
      <div className="md:w-3/4 text-text">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Доставка</h1>
        <h2 className="text-2xl md:text-3xl font-serif mb-4">
          Цени на доставка
        </h2>
        <p className="mb-4">
          Доставка: 3.99€ (домашен адрес), 2.99€ (офис на Еконт или Спиди)
        </p>
        <p className="mb-4">БЕЗПЛАТНА доставка за поръчки над 30€</p>
        <p className="mb-4">Всички пратки се изпращат с опция ПРЕГЛЕД.</p>
        <p className="mb-4">
          Ако желаете да се възползвате от условията ни за връщане, нужно е да
          се свържете с нас на . След това подгответе продукта в търговски вид,
          като следва да сте запазили всички найлончета, кутийки, сертификати,
          картички и т.н. с които е пристигнал. Също така бижуто не трябва да е
          носено или употребявано.
        </p>
        <p className="mb-8">
          Куриерските разходи за връщане на продукт са за ваша сметка.
        </p>
        <p className="mb-4 italic font-light">
          "МАРСИ ЕООД" има правото да променя тези условия по всяко време.
        </p>
      </div>
    </div>
  );
};

export default Shipping;

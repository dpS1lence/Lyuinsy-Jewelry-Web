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
        <p className="mb-1">
          При поръчки над 60.00€, цената за доставка (независимо дали до личен
          адрес или до офис на Еконт/Спиди) ще бъде БЕЗПЛАТНА!
        </p>
        <p className="mb-4">
          За поръчки под 60.00€. цената за доставка е 4,99€. до офис на Еконт
          или Спиди.
        </p>
        <p className="mb-4">Цената за доставка до личен адрес е 6,99€.</p>
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

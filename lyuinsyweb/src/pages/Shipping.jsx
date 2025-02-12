 
import { useEffect } from "react";

const Shipping = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex flex-col items-center bg-background p-4 md:p-8">
      <div className="md:w-3/4 text-text">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Доставка</h1>
        <h2 className="text-2xl md:text-3xl font-serif mb-4">Цени на доставка</h2>
        <p className="mb-4">Поръчвай без разходи за доставка!</p>
        <p className="mb-4">За поръчки над 100.00лв доставката е напълно БЕЗПЛАТНА до офис на Еконт.</p>
        <p className="mb-4">За поръчки под 100.00лв. цената за доставка е 4,99лв. до офис на Еконт.</p>
        <p className="mb-4">Цената за доставка до личен адрес е 6,99лв.</p>
        <p className="mb-4">Всички пратки се изпращат с опция ПРЕГЛЕД.</p>
        <p className="mb-4">Ако желаете да се възползвате от условията ни за връщане, нужно е да се свържете с нас на . След това подгответе продукта в търговски вид, като следва да сте запазили всички найлончета, кутийки, сертификати, картички и т.н. с които е пристигнал. Също така бижуто не трябва да е носено или употребявано.</p>
        <p className="mb-8">Куриерските разходи за връщане на продукт са за Ваша сметка.</p>
      </div>
    </div>
  );
};

export default Shipping;
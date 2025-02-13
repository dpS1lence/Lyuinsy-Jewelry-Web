import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="md:w-3/4">
        <h1 className="text-3xl md:text-4xl font-serif mb-4 text-text">
          Защита на личните данни
        </h1>
        <p className="text-base md:text-lg text-text mb-6">
          От 25 май 2018 г. в сила е новият регламент за защита на личните данни (GDPR) в Европейския съюз. Lyuinsy Jewelry събира и обработва лични данни единствено във връзка с направените поръчки – ние не поддържаме потребителски профили. Данните се обработват по начин, който гарантира сигурността, прозрачността и законосъобразността на процеса.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif mb-4 text-text">
          Информация за администратора на данни
        </h2>
        <p className="text-base md:text-lg text-text mb-6">
          <strong>Наименование:</strong> Lyuinsy Jewelry
          <br />
          <strong>ЕИК/Рег. номер:</strong> [Вашият ЕИК/Рег. номер]
          <br />
          <strong>Адрес:</strong> [Вашият адрес]
          <br />
          <strong>E-mail:</strong> info@lyuinsyjewelry.com
        </p>

        <h2 className="text-2xl md:text-3xl font-serif mb-4 text-text">
          Компетентен надзорен орган
        </h2>
        <p className="text-base md:text-lg text-text mb-6">
          <strong>Наименование:</strong> Комисия за защита на личните данни
          <br />
          <strong>Адрес:</strong> гр. София, бул. "Проф. Цветан Лазаров" 2
          <br />
          <strong>Телефон:</strong> 02 915 3 518
          <br />
          <strong>E-mail:</strong> kzld@government.bg, kzld@cpdp.bg
          <br />
          <strong>Уебсайт:</strong> www.cpdp.bg
        </p>

        <h2 className="text-2xl md:text-3xl font-serif mb-4 text-text">
          Обработка на лични данни
        </h2>
        <p className="text-base md:text-lg text-text mb-6">
          Lyuinsy Jewelry обработва лични данни само когато извършвате поръчка. Събраните данни се използват за:
        </p>
        <ul className="list-disc list-inside mb-6 text-base md:text-lg text-text">
          <li>Изпълнение на договорни задължения</li>
          <li>Обработка на плащания и доставка на закупените продукти</li>
          <li>Издаване на фактури и разписки</li>
          <li>Спазване на законови изисквания</li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-serif mb-4 text-text">
          Съхранение на данни
        </h2>
        <p className="text-base md:text-lg text-text mb-6">
          Съхраняваме вашите лични данни за необходимия период, за да изпълним нашите договорни и законови задължения. След изтичане на определения срок, данните ще бъдат изтрити или анонимизирани.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif mb-4 text-text">
          Вашите права
        </h2>
        <p className="text-base md:text-lg text-text mb-6">
          Вие имате право да получите достъп до, коригирате или изтриете вашите лични данни, както и да ограничите обработката им или да възразите срещу нея. За да упражните тези права, моля свържете се с нас на:{" "}
          <a href="mailto:info@lyuinsyjewelry.com" className="text-link underline">
            info@lyuinsyjewelry.com
          </a>
          .
        </p>

        <h2 className="text-2xl md:text-3xl font-serif mb-4 text-text">
          Използване на бисквитки
        </h2>
        <p className="text-base md:text-lg text-text mb-6">
          Нашият уебсайт използва бисквитки за подобряване на функционалността и потребителското изживяване. С посещението на сайта, вие приемате използването на тези бисквитки.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif mb-4 text-text">
          Мерки за сигурност
        </h2>
        <p className="text-base md:text-lg text-text mb-6">
          Защитата на вашите лични данни е от първостепенно значение за нас. Използваме модерни технологии и организационни мерки, за да осигурим висок стандарт на сигурност при обработката и съхранението на данните.
        </p>

        <h2 className="text-2xl md:text-3xl font-serif mb-4 text-text">
          Контакти
        </h2>
        <p className="text-base md:text-lg text-text mb-6">
          Ако имате въпроси относно нашата политика за защита на личните данни или искате да упражните вашите права, моля свържете се с нас на:{" "}
          <a href="mailto:info@lyuinsyjewelry.com" className="text-link underline">
            info@lyuinsyjewelry.com
          </a>
          .
        </p>
        <p className="text-base md:text-lg text-text mb-6">
          Lyuinsy Jewelry спазва всички изисквания на GDPR и другите приложими закони, като обработва лични данни единствено с цел изпълнение на поръчките.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import ScrollAnimation from "../components/ScrollAnimation";

const Contact = () => {

  return (
    <ScrollAnimation>
        <div className="max-w-4xl mx-auto bg-background p-6 md:p-8">
            <h1 className="text-4xl font-serif mb-6 text-text">Контакти</h1>
            <p className="text-lg text-text mb-4">Свържете се с нас чрез следните канали:</p>
            <ul className="list-disc list-inside mb-8">
                <li>Имейл: <a href="mailto:info@example.com" className="text-discount">info@example.com</a></li>
                <li>Фейсбук: <a href="mailto:info@example.com" className="text-discount">info@example.com</a></li>
            </ul>
        </div>
    </ScrollAnimation>
  )};

export default Contact;
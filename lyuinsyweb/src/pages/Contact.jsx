import ScrollAnimation from "../components/ScrollAnimation";

const Contact = () => {

  return (
    <ScrollAnimation>
        <div className="max-w-4xl mx-auto min-h-screen bg-background p-6 md:p-8">
            <h1 className="text-4xl font-serif mb-6 text-text">Контакти</h1>
            <p className="text-lg text-text mb-4">Свържете се с нас чрез следните канали:</p>
            <ul className="list-disc list-inside mb-8">
                <li>Телефон: <a href="tel:+359123456789" className="text-discount">+359 123 456 789</a></li>
                <li>Имейл: <a href="mailto:info@example.com" className="text-discount">info@example.com</a></li>
                <li>Адрес: ул. Примерна 123, София, България</li>
            </ul>
            <h2 className="text-2xl font-serif mb-4 text-text">Карта</h2>
            <div className="mb-8">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509123!2d144.9537353153164!3d-37.81627997975157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11f3b3%3A0x5045675218ceed30!2sExample%20Address!5e0!3m2!1sen!2sbg!4v1616161616161!5m2!1sen!2sbg"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    </ScrollAnimation>
  )};

export default Contact;
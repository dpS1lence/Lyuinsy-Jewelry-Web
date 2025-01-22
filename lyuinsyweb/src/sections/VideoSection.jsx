import video1 from "../../src/assets/videos/swarowski.webm"

export default function VideoSection() {

    return (
        <div className="bg-white flex flex-col lg:flex-row-reverse items-stretch">
            <div className="lg:w-1/2">
                <video className="w-full h-full object-cover" autoPlay loop muted>
                    <source src={video1} type="video/mp4" />
                    Вашият браузър не поддържа видео таг.
                </video>
            </div>
            <div className="lg:w-1/2 lg:pl-32 p-8 flex flex-col justify-center items-start">
                <h2 className="text-3xl font-serif mb-2">Елегантността на перлите</h2>
                <p className="text-lg text-text leading-relaxed">
                    Перлите символизират изящество и женственост.
                </p>
                <button className="bg-black border border-black text-white px-4 py-2 mt-16 transition-colors hover:bg-white hover:text-black">
                    Научете повече
                </button>
            </div>
        </div>
    );
};
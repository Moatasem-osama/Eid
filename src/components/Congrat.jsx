import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import domtoimage from "dom-to-image";

export default function Congrat() {
  const [searchParams] = useSearchParams();
  const [sender, setSender] = useState("المرسل");
  const [receiver, setReceiver] = useState("المستلم");
  const [isSender, setIsSender] = useState(false);
  const cardRef = useRef(null);
  const audioRef = useRef(null);
  const [showPlayButton, setShowPlayButton] = useState(true);

  // مقطع تكبيرات العيد (ممكن تغيّره)
  const AUDIO_URL = "https://download.tvquran.com/download/selections/180/5820b1da065e5.mp3";

  const handlePlay = () => {
    audioRef.current.play()
      .then(() => setShowPlayButton(false))
      .catch(e => console.log("تعذر التشغيل:", e));
  };

  useEffect(() => {
    const urlSender = searchParams.get("sender");
    const urlReceiver = searchParams.get("receiver");

    setIsSender(!urlSender && !urlReceiver);

    setSender(urlSender || localStorage.getItem("sender") || "المرسل");
    setReceiver(urlReceiver || localStorage.getItem("receiver") || "المستلم");

    if (urlSender) localStorage.setItem("sender", urlSender);
    if (urlReceiver) localStorage.setItem("receiver", urlReceiver);

    if (urlReceiver && audioRef.current) {
      audioRef.current.play().catch(e => console.log("تعذر التشغيل التلقائي:", e));
    }

    const handleUserInteraction = () => {
      if (urlReceiver && showPlayButton) {
        handlePlay();
      }
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [searchParams, showPlayButton]);

  const handleReset = () => {
    localStorage.clear();
  };

  const downloadImage = () => {
    if (cardRef.current) {
      domtoimage.toPng(cardRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "congratulation.png";
          link.click();
        })
        .catch((error) => console.error("فشل تحميل الصورة:", error));
    }
  };
const shareLink = `${window.location.origin}${window.location.pathname}#/congrat?sender=${encodeURIComponent(sender)}&receiver=${encodeURIComponent(receiver)}`;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-50 via-green-50 to-yellow-100 text-center p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-8">

        {/* مشغل صوت تكبيرات العيد */}
        {searchParams.get("receiver") && (
          <div className="audio-player w-full">
            <audio ref={audioRef} src={AUDIO_URL} controls className="w-full rounded" />
            <p className="text-sm text-gray-500 mt-2">تكبيرات عيد الأضحى</p>
          </div>
        )}

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 to-green-600 animate-pulse">
          تهنئة من {sender} إلى {receiver} بمناسبة عيد الأضحى المبارك
        </h1>

        {/* بطاقة التهنئة */}
        <div ref={cardRef} className="bg-gradient-to-br from-white to-yellow-50 border border-yellow-300 rounded-2xl p-6 shadow-md space-y-5 text-right font-[Cairo], sans-serif">
          <div className="flex justify-center mb-4">
          <img src="https://hager192819.github.io/Eid/images/sheep.png" alt="خروف العيد" className="w-28 h-28" />
          </div>

          <div className="text-xl sm:text-2xl leading-9 space-y-4 text-yellow-900">
            <h1 className="text-3xl font-extrabold">🎉 تهنئة عيد الأضحى 🎉</h1>
            <p>إلى <span className="text-red-600 font-semibold">{receiver}</span>، عيدك مبارك وسعيد! 🐑🌙</p>
            <p>كل عام وأنت بخير بمناسبة عيد الأضحى المبارك! 🕋✨</p>
            <p>تقبل الله منا ومنكم صالح الأعمال، وأعاد الله عليكم العيد بالخير والبركات. 💖🎉</p>
            <p>أسأل الله أن يجعل أيامك كلها فرح وسعادة، وأن يرزقك من الخير الوفير. 🌟💫</p>
            <p>مرسل التهنئة: <span className="text-red-600 font-semibold">{sender}</span> 🙌🎈</p>
          </div>
        </div>

        {/* رابط النسخ إذا أنت المرسل */}
        {isSender && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">تم إنشاء التهنئة بنجاح! أرسل الرابط إلى {receiver}</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-grow p-3 border rounded-lg shadow-inner text-sm text-left"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareLink)
                    .then(() => alert("تم نسخ الرابط!"))
                    .catch(() => alert("فشل نسخ الرابط"));
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-4 py-2 text-sm"
              >
                نسخ الرابط
              </button>
            </div>
          </div>
        )}

        {/* أزرار تحميل و إنشاء جديدة */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={downloadImage}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-lg shadow"
          >
            تحميل التهنئة <i className="fa-solid fa-download text-white px-1"></i>
          </button>

          <Link
            to="/"
            onClick={handleReset}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg shadow"
          >
            إنشاء تهنئة جديدة
          </Link>
        </div>

        {/* مسجات التهنئة */}
        <div className="mt-8 p-4 border-2 border-yellow-400 rounded-lg text-right space-y-4 bg-yellow-50">
          <h2 className="text-center text-2xl font-bold border-y-4 border-red-600 py-2">مسجات تهنئة عيد الأضحى المبارك</h2>
          <p className="text-lg leading-relaxed">مع اقتراب عيد الأضحى المبارك، أعاده الله عليك بالخير والبركات، إليك مجموعة من رسائل التهنئة:</p>
          <ul className="list-disc pl-8 space-y-2 text-right text-base leading-7 text-yellow-900">
            <li>أدام الله عليك الأعياد دهور وألبسك من تقواه نور عيدك مبارك.</li>
            <li>أمانينا تسبق تهانينا وفرحتنا تسبق ليالينا وعيد مبارك عليك وعلينا.</li>
            <li>العيد علينا هل، وبأحلى فرحة طل، يا رب تسعد الكل.</li>
            <li>أهديك عطر الورد وألوانه وأرسل جواب أنت عنوانه.</li>
            <li>أهنيك بقدوم العيد وأيامه وكل عام وأنت بخير.</li>
            <li>كل عيد والخير دربك وممشاك، والبسمة دوم ما تفارق شفاك، وجنة ربي هي سكناك.</li>
            <li>تقبل الله صيامكم وأسعد أيامكم، وكل عام وأنتم بخير.</li>
            <li>أحلى ما في العيد ثلاثة: كثرة الخيرات، وتبادل الزيارات، وقارئ هذه العبارات.</li>
            <li>سلة بخور وعود، وعيد الأضحى عليك يعود معطر بريحان وورود.</li>
            <li>هنَّأك الله بالقبول، وأسكنك الجنة مع الرسول، ورزقك بالعيد بهجة لا تزول.</li>
          </ul>
        </div>

        <footer className="mt-8 text-gray-600 text-sm border-t pt-4">
          تم التطوير بواسطة <strong>المعتصم بالله أسامة</strong>
        </footer>
      </div>
    </div>
  );
}

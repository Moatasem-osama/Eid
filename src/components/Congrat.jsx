
import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import domtoimage from "dom-to-image";
export default function Congrat() {
  const [searchParams] = useSearchParams();
  const [sender, setSender] = useState("المرسل");
  const [receiver, setReceiver] = useState("المستلم");
  const [sound, setSound] = useState("");
  const [isSender, setIsSender] = useState(false);
  const cardRef = useRef(null);
  const audioRef = useRef(null);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const seoData = {
    title: `تهنئة عيد الفطر من ${sender} إلى ${receiver}`,
    description: `بطاقة تهنئة بمناسبة عيد الفطر من ${sender} إلى ${receiver}`,
    keywords: "تهنئة عيد, بطاقات معايدة, عيد الفطر",
    imageUrl: {}
  };

  // const AUDIO_URL = "https://download.tvquran.com/download/selections/180/5820b1da065e5.mp3";
  const AUDIO_URL = "https://cdn1.esm3.com//music/7754/m222505.mp3";
  const handlePlay = () => {
    audioRef.current.play()
      .then(() => {
        setShowPlayButton(false);
      })
      .catch(e => {
        console.log("تعذر التشغيل:", e);
      });
  };
  useEffect(() => {
    const urlSender = searchParams.get("sender");
    const urlReceiver = searchParams.get("receiver");
    const urlSound = searchParams.get("sound");

    // إذا كان هناك بيانات في الرابط، فهذا يعني أن المستخدم هو المستقبل
    setIsSender(!urlSender && !urlReceiver);

    // تحديث البيانات من الرابط أو localStorage
    setSender(urlSender || localStorage.getItem("sender") || "المرسل");
    setReceiver(urlReceiver || localStorage.getItem("receiver") || "المستلم");
    setSound(urlSound || localStorage.getItem("sound") || "");

    // حفظ البيانات الجديدة في localStorage إذا كانت موجودة في الرابط
    if (urlSender) localStorage.setItem("sender", urlSender);
    if (urlReceiver) localStorage.setItem("receiver", urlReceiver);
    if (urlSound) localStorage.setItem("sound", urlSound);
    if (searchParams.get("receiver") && audioRef.current) {
      audioRef.current.play().catch(e => console.log("تعذر التشغيل التلقائي:", e));
    }
    const handleUserInteraction = () => {
      if (searchParams.get("receiver") && showPlayButton) {
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
    localStorage.removeItem("sender");
    localStorage.removeItem("receiver");
    localStorage.removeItem("sound");
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
        .catch((error) => {
          console.error("فشل تحميل الصورة:", error);
        });
    }
  };

  return (
    <>
    <div className="min-h-screen bg-green-100 text-center p-6">
          <div className=" p-10 mx-auto bg-white shadow-lg rounded-4xl flex flex-col items-center justify-center">
    {searchParams.get("receiver") && (
        <div className="audio-player w-full mb-4">
          <audio
            ref={audioRef}
            src={AUDIO_URL}
            controls
            className="w-full mt-4"
          />
          <p className="text-sm text-gray-500">تكبيرات العيد</p>
        </div>
      )}

       <h1 className="bg-gradient-to-r from-[#149b23] to-[#f4c430] bg-clip-text p-4 animate-bounce text-transparent leading-16 text-5xl font-bold text-center">
           تهنئة من {sender} إلى {receiver} بمناسبة عيد الفطر المبارك
         </h1>

         <div 
          ref={cardRef} 
          className="mx-auto shadow-lg relative p-6 m-4 rounded-3xl border border-gray-300 w-full"
          style={{ background: "linear-gradient(135deg, #fff7e6, #f0fff0)" }}
        >
          <p className="text-left text-5xl">🌟</p>
          <div className="text-3xl space-y-5">
            <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 تهنئة عيد الفطر 🎉</h1>
            <h2 className="p-5">إلى <span className="text-red-600">{receiver}</span> ، عيدك مبارك وسعيد! 🎊🌸</h2>
            <h2 className="p-5">كل عام وأنتم بخير بمناسبة عيد الفطر المبارك! 🌙✨</h2>
            <h2 className="p-5">تقبل الله منا ومنكم صالح الأعمال، وأعاد الله عليكم الأعياد بالخير والبركات. 💖🎉</h2>
            <h3 className="p-5">أسأل الله أن يجعل أيامك كلها فرحًا وسعادة، وأن يحقق لك كل ما تتمنى. 🌟💫</h3>
            <h4 className="p-5">مرسل التهنئة: <span className="text-red-600">{sender}</span> 🙌🎈</h4>
          </div>
        </div>
      {isSender && (
        <div className="mx-auto shadow-lg relative p-6 m-4 rounded-2xl border border-gray-300 bg-yellow-200 w-full">
          <h2 className="text-2xl font-bold">تم إنشاء التهنئة بنجاح أرسلها الآن إلى {receiver}</h2>
          
          <div className="mt-4">
            <p className="text-lg font-bold">رابط المشاركة:</p>
            <div className="flex items-center">
              <input
                type="text"
                value={`${window.location.href}/?sender=${encodeURIComponent(sender)}&receiver=${encodeURIComponent(receiver)}`}
                readOnly
                className="p-2 border rounded-l-lg flex-grow"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.href}/?sender=${encodeURIComponent(sender)}&receiver=${encodeURIComponent(receiver)}`
                  );
                  alert('تم نسخ الرابط!');
                }}
                className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
              >
                نسخ
              </button>
            </div>
          </div>

        </div>
      )}
      <button
        onClick={downloadImage}
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition"
      >
      تحميل التهنئة
        <i className="fa-solid fa-download text-white px-1"></i>
      </button>

      <Link
        to="/"
        onClick={handleReset}
        className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg text-lg hover:bg-green-600 transition"
      >
        إنشاء تهنئة جديدة
      </Link>
        <div className="p-2 w-full mx-auto my-5 text-right border-2 border-gray-400 rounded-lg text-2xl font-medium">
    
    <div className="text-center p-3 border-b-red-700 border-t-red-700 border-b-4 border-t-4 ">
مسجات تهنئة عيد الفطر المباركـ
     </div>
     <h1 className="mb-4 leading-10">مع اقتراب عيد الفطر المبارك، أعاده الله عليك بالخير والبركات، قد ترغب في إرسال تهنئة مميزة لأصدقائك وأقاربك. لذلك، أقدم لك اليوم مجموعة رائعة من رسائل المعايدة التي يمكنك إرسالها عبر الرسائل النصية، واتساب، فيسبوك، أو أي وسيلة تواصل أخرى.</h1>
    <ul className="list-disc p-7 leading-9 space-y-3">
 	<li>أدام الله عليك الأعياد دهور وألبسك من تقواه نور عيدك مبارك.</li>
 	<li>أمانينا تسبق تهانينا وفرحتنا تسبق ليالينا وعيد مبارك عليك وعلينا.</li>
 	<li>العيد علينا هل، وبأحلى فرحة طل، يا رب تسعد الكل.</li>
 	<li>أهديك عطر الورد وألوانه وأرسل جواب أنت عنوانه.</li>
 	<li>أهنيك بقدوم العيد وأيامه وكل عام وأنت بخير.</li>
 	<li>بارك الله لكم في أعمالكم وأعماركم… واعادكم على امثاله.</li>
 	<li>كل عآم ولا يسكن قلبك سواي… كل عام وأنت النبض بدآخلي.</li>
 	<li>أدام الله لكم الأعياد دهورا… وألبسكم من تقواه نوراً… عيدكم مبارك.</li>
 	<li>بالعود والبخور… برشات العطور… بأسمى آيات السرور نبارك لك بعيد الفطر السعيد.</li>
 	<li>حلاة العيد شوفتكم… حلاته نلتقي معكم… عساكم دوم عواده… وأسعد ناس بأعياده.</li>
 	<li>يسعدك ربي يا سيد الكل… وعيد الفطر عليك بالفرحة يطل…وتهنئة خاصة لك قبل الكل.</li>
 	<li>عسى عيدك مبارك… وكل لحظاتك تبارك… وجنة الخلد داري ودارك… والنبي جاري وجارك.</li>
 	<li>أسأل من أعاد العيد وطوى الشهر الفقيد، أن يمدك بعمر مديد ويجعل حياتك كلها عيد.</li>
 	<li>هنَّأك الله بالقبول، وأسكنك الجنة مع الرسول، ورزقك بالعيد بهجة لا تزول.</li>
 	<li>إذا سبقتموني بالمعايدة فهذا لاهتمامكم وفضلكم، وإن سبقتكم فهذا لحقكم وقدركم، لكم المحبة كلها كل عام وأنتم بخير.</li>
 	<li>سلة بخور وعود، وعيد الفطر عليك يعود معطر بريحان وورود.</li>
 	<li>أدام الله لكم الأعياد دهوراً وألبسكم من تقواه نوراً، عيدكم مبارك.</li>
 	<li>تقبل الله صيامكم وأسعد أيامكم، وكل عام وأنتم بخير.</li>
 	<li>أسأل من أعاد العيد وطوى الشهر الفقيد، أن يمدك بعمر مديد ويجعل حياتك عيد × عيد.</li>
 	<li>أمانينا تسبق تهانينا وفرحتنا تسبق ليالينا، وعيد مبارك عليكم وعلينا.</li>
 	<li>كل عام وأنت إلى الله أقرب ولفعل الطاعات أرغب وللجنة أسبق.</li>
 	<li>تهنئة من الوريد إلى الوريد، وقبل الزحمة والمواعيد عيد سعيد وعمر مديد.</li>
 	<li>أحلى ما في العيد ثلاثة: كثرة الخيرات، وتبادل الزيارات، وقارئ هذه العبارات.</li>
 	<li>في قلبي حطيتك وبالتهاني خصيتك وعلى الناس أغليتك وبحلول عيد الفطر هنيتك.</li>
 	<li>بأنوار رسول الله أمسيك وبعيد الفطر أهنيك وأدعو الله من الكوثر يسقيني ويسقيك إن شاء الله.</li>
 	<li>كل عيد والخير دربك وممشاك، والبسمة دوم ما تفارق شفاك، وجنة ربي هي سكناك.</li>
 	<li>اللهم زد هذا الوجه نوراً، واجعله دائماً مأجوراً، وبلِّغه العيد مسروراً، تقبل الله طاعتكم وعساكم من عواده.</li>
</ul>    
      </div>
  
      <footer>
        <h2>تم التطوير بواسطة المعتصم بالله أسامة</h2>
      </footer>
      </div>
    </div>
     </>
  );
}
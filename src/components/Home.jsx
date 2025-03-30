import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

// مكون منفصل لحقل الإدخال لتجنب إعادة التصيير غير الضرورية
const InputField = ({ label, id, name, value, onChange, type = "text" }) => {
  return (
    <div>
      <label htmlFor={id} className="text-xl md:text-2xl py-4 block">
        {label}
      </label>
      <input
        required
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border-2 md:border-4 rounded-xl md:rounded-2xl p-3 md:p-5 transition-all duration-200 border-[#f4c430] focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>
  );
};

// مكون منفصل لقائمة الاختيار
const SelectField = ({ label, id, name, value, onChange, options }) => {
  return (
    <div>
      <label htmlFor={id} className="text-xl md:text-2xl py-4 block">
        {label}
      </label>
      <select
        required
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border-2 md:border-4 rounded-xl md:rounded-2xl p-3 md:p-5 transition-all duration-200 border-[#f4c430] focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200 cursor-pointer appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function Home() {
    const [formData, setFormData] = useState({
        sender: "",
        receiver: "",
        sound: ""
    });
    const navigate = useNavigate();

    // تحميل البيانات الأولية باستخدام useCallback للتحسين
    const loadInitialData = useCallback(() => {
        const savedData = {
            sender: localStorage.getItem("sender") || "",
            receiver: localStorage.getItem("receiver") || "",
            sound: localStorage.getItem("sound") || ""
        };
        setFormData(savedData);
    }, []);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    // معالجة تغيير الحقول باستخدام useCallback
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    // معالجة إرسال النموذج باستخدام useCallback
    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (!formData.sender || !formData.receiver || !formData.sound) {
            alert("يرجى إدخال جميع البيانات");
            return;
        }

        // حفظ البيانات بكفاءة
        localStorage.setItem("sender", formData.sender);
        localStorage.setItem("receiver", formData.receiver);
        localStorage.setItem("sound", formData.sound);

        navigate("/congrat");
    }, [formData, navigate]);

    // خيارات الصوت
    const soundOptions = [
        { value: "", label: "اختر صوت التهنئة" },
        { value: "sound1", label: "تكبيرات العيد" },
        { value: "sound2", label: "أغنية العيد" },
        { value: "sound3", label: "تهنئة صوتية" }
    ];

    return (
        <>
            <Helmet>
                <title>إنشاء تهنئة عيد الفطر</title>
                <meta name="description" content="أنشئ بطاقة تهنئة مخصصة بمناسبة عيد الفطر المبارك" />
                <meta property="og:title" content="منشئ تهنئات عيد الفطر" />
                <meta property="og:description" content="صمم تهنئتك الخاصة وأرسلها لأحبابك" />
            </Helmet>

            <header className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 via-green-200 to-green-300 w-full m-0">
                <div className="w-full md:w-3/4 my-6 bg-white mx-auto rounded-2xl p-4 md:p-6 shadow-lg">
                    <h1 className="bg-gradient-to-r from-[#149b23] to-[#f4c430] bg-clip-text p-4 animate-bounce text-transparent text-3xl md:text-4xl font-bold text-center">
                        إنشاء تهنئة لأحبائك بمناسبة عيد الفطر المبارك
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField
                            label="اسمك (اسم المُرسل)"
                            id="sender"
                            name="sender"
                            value={formData.sender}
                            onChange={handleChange}
                        />

                        <InputField
                            label="اسم الشخص الذي تود إهداءه"
                            id="receiver"
                            name="receiver"
                            value={formData.receiver}
                            onChange={handleChange}
                        />

                        <SelectField
                            label="اختر صوت التهنئة:"
                            id="sound"
                            name="sound"
                            value={formData.sound}
                            onChange={handleChange}
                            options={soundOptions}
                        />

                        <button
                            type="submit"
                            className="hover:scale-105 hover:bg-[#f4c430] bg-[#149b23] text-white text-xl md:text-2xl px-5 my-2 py-3 cursor-pointer text-center mx-auto rounded-2xl block transition-all duration-300 hover:shadow-lg w-full md:w-auto"
                        >
                            <i className="fa-solid fa-gift ml-2"></i> إنشاء التهنئة
                        </button>
                    </form>
                </div>
            </header>
        </>
    );
}
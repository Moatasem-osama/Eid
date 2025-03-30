import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer () {
  return (
    <footer className="bg-gradient-to-r from-[#D4AF37] to-[#F4C430] text-white py-3 shadow-lg">
      <div className="container mx-auto px-4">
      
        <p className="text-center text-lg font-arabic mb-2">
          أنشأ بكل ❤️ بواسطة <span className="font-bold">المعتصم بالله الهواري</span>
        </p>
        
        {/* روابط التواصل */}
        <div className="flex justify-center space-x-4 text-2xl">
          
          <a 
            href="https://www.facebook.com/profile.php?id=100082166351071" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#f4c430] transition-colors"
            aria-label="فيسبوك"
          >
           <i className="fa-brands fa-facebook text-blue-500" ></i>
          </a>
          
          <a 
            href="https://github.com/Moatasem-osama" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#f4c430] transition-colors"
            aria-label="جيت هاب"
          >
           <i className="fa-brands fa-github text-gray-800" ></i>

          </a>
          
          <a 
            href="https://www.linkedin.com/in/moatasem-osama-202378330/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#f4c430] transition-colors"
            aria-label="لينكد إن"
            
          >
           <i className="fa-brands fa-linkedin text-blue-500" ></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

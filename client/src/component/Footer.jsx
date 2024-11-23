function Footer() {
    return (
      <div className="bg-purple-800 text-white py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center gap-12 items-center">
            {/* Left side: Copyright */}
            <div className="text-center md:text-left mb-4 md:mb-0 font-semibold">
              <p>&copy; 2024 Tino Abraham Reji.   All Rights Reserved.</p>
            </div>
  
            {/* Right side: Links */}
            <div className="flex space-x-4 font-sans font-bold">
              <a href="https://github.com/TINOREJI" className="hover:text-purple-400 transition-all duration-300">Github</a>
              <a href="https://www.linkedin.com/in/tinoreji/" className="hover:text-purple-400 transition-all duration-300">Linkedin</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Footer;
  
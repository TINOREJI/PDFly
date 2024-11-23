import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-r min-h-screen flex flex-col items-center justify-center text-purple-800 px-4 py-12">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight">About Me</h1>
        <p className="mt-6 text-xl leading-relaxed">
          Hi, I'm Tino Abraham Reji. I'm passionate about coding and creating innovative solutions to complex problems. I specialize in web development and continuously evolve my skills.
        </p>
        <div className="mt-8 flex justify-center space-x-6">
          <a 
            href="https://github.com/your-github" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/your-linkedin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <footer className="mt-12 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} [Your Name]. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;

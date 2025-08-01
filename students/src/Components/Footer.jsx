import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SocialIcon } from "./Icons";
import ProfileModal from "./ProfileModal";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export default function Footer() {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  
  return (
    <footer className="bg-slate-900 text-white py-12 sm:py-16 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

        <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-12 mb-12 sm:mb-16">

          <div className="md:w-1/2 text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 leading-snug">
              New to StudyHub?
            </h3>
            <p className="text-base sm:text-lg text-white/90 mb-4 leading-relaxed font-medium">
              StudyHub connects students with top peer tutors for personalized
              academic support in a trusted, collaborative environment.
            </p>
            <blockquote className="italic border-l-4 border-blue-400 pl-4 text-white/80 font-semibold mb-4">
              “Education is the most powerful weapon which you can use to change
              the world.” — Nelson Mandela
            </blockquote>
            <p className="text-lg font-semibold">
              Join us and unlock your learning potential.
            </p>
          </div>


          <div className="flex flex-col sm:flex-row gap-12 md:w-1/2 justify-between">

            <div className="text-left min-w-[160px]">
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Quick Links</h4>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                {[
                  { name: "home", section: "home" },
                  { name: "tutors", href: "/search" },
                  { name: "messages", href: "/messages" },
                  { name: "profile", action: "profile" }
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.section ? `#${item.section}` : "#"}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.action === "profile") {
                          setShowProfile(true);
                        } else if (item.href) {
                          navigate(item.href);
                        } else if (item.section) {
                          const el = document.getElementById(item.section);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="group flex items-center gap-2 hover:text-blue-400 transition-all duration-300"
                    >
                      <span className="text-sm opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">
                        →
                      </span>
                      <span className="uppercase group-hover:translate-x-2 transition-transform">
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>


            <div className="min-w-[280px] text-right">
              <h4 className="text-xl font-bold text-white mb-6">Contact</h4>
              <ul className="space-y-4 text-base text-white">

                <li className="flex items-center justify-between gap-6">
                  <span className="text-sm text-white/60 font-medium w-20">
                    Phone:
                  </span>
                  <a 
                    href="tel:+233501121908"
                    className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <FaPhone className="text-blue-400" />
                    +233 50 112 1908
                  </a>
                </li>


                <li className="flex items-center justify-between gap-6">
                  <span className="text-sm text-white/60 font-medium w-20">
                    Email:
                  </span>
                  <a 
                    href="mailto:doreentechie@gmail.com"
                    className="flex items-center gap-2 break-all hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <FaEnvelope className="text-blue-400" />
                    doreentechie@gmail.com
                  </a>
                </li>


                <li className="flex items-center justify-between gap-6">
                  <span className="text-sm text-white/60 font-medium w-20">
                    Address:
                  </span>
                  <a 
                    href="https://maps.google.com/?q=Kumasi,+Ashanti+Region,+Ghana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-right hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <FaMapMarkerAlt className="text-blue-400" />
                    Kumasi, Ashanti Region, Ghana.
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>


        <div className="flex justify-center gap-6 mb-10">
          <SocialIcon icon="facebook" href="https://facebook.com" />
          <SocialIcon icon="instagram" href="https://instagram.com" />
          <SocialIcon
            icon="linkedin"
            href="https://www.linkedin.com/in/doreen-techie-140303280/"
          />
        </div>


        <p className="text-sm text-center text-white opacity-70">
          Built with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/doreen-techie-140303280/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            Doreen Techie
          </a>
          . All rights reserved.
        </p>
      </div>
      
      <ProfileModal 
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </footer>
  );
}

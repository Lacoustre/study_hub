import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const iconMap = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  youtube: FaYoutube,
};

export function SocialIcon({ icon, href, size = 20, className = '' }) {
  const IconComponent = iconMap[icon];
  
  if (!IconComponent) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-all hover:scale-110 ${className}`}
    >
      <IconComponent size={size} />
    </a>
  );
}

export function Icon({ icon, size = 20, className = '' }) {
  const IconComponent = iconMap[icon];
  
  if (!IconComponent) return null;

  return <IconComponent size={size} className={className} />;
}

export default SocialIcon;
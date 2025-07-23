import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const socialMedia = [
    { name: 'Facebook', icon: faFacebookF, url: 'https://facebook.com' },
    { name: 'Twitter', icon: faTwitter, url: 'https://twitter.com' },
    { name: 'Instagram', icon: faInstagram, url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: faLinkedinIn, url: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-base-100 border-t border-base-300 text-base-content py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-4">NikahForever</h3>
          <p className="leading-relaxed text-sm">
            At Nikah Forever, we are committed to helping you find the one you are destined to spend the rest of your life with. Our goal is to make Muslim matrimony a journey of compassion and trust. As a Muslim matrimony site, we are attentive to the concerns of our Muslim brothers and sisters.
          </p>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-primary">About Us</a></li>
            <li><a href="/career" className="hover:text-primary">Career</a></li>
            <li><a href="/contact" className="hover:text-primary">Contact Us</a></li>
            <li><a href="/child-safety" className="hover:text-primary">Child Safety Standards Policy</a></li>
          </ul>
        </div>

        {/* Help + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">HELP</h3>
          <ul className="space-y-2 text-sm mb-4">
            <li><a href="/faqs" className="hover:text-primary">FAQs</a></li>
            <li><a href="/terms" className="hover:text-primary">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">RESOURCES</h3>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm hover:text-red-600"
          >
            <FontAwesomeIcon icon={faYoutube} className="mr-2" />
            YouTube
          </a>

          <div className="flex gap-4 mt-4">
            {socialMedia.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-base-content hover:text-primary transition-colors"
                aria-label={platform.name}
              >
                <FontAwesomeIcon icon={platform.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

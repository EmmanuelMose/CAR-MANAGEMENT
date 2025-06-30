
import facebook from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
//import instagram from '../../assets/images/instagram.png';
// import linkedin from '../../assets/images/linkedin.png';
// import watsup from '../../assets/images/whatsapp.png';
import telegram from '../../assets/images/telegram.png';
import youtube from '../../assets/images/youtube.png';
const Footer = () => {
  return (
    <div>
      <footer className="mt-[50px] bg-gray-100 text-gray-700 p-10 rounded-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-left">
          
          
          <div>
            <h6 className="text-lg font-semibold mb-4">SERVICES</h6>
            <ul className="space-y-2">
              <li><a className="hover:underline" href="#">Branding</a></li>
              <li><a className="hover:underline" href="#">Design</a></li>
              <li><a className="hover:underline" href="#">Marketing</a></li>
              <li><a className="hover:underline" href="#">Advertisement</a></li>
            </ul>
          </div>

          
          <div>
            <h6 className="text-lg font-semibold mb-4">COMPANY</h6>
            <ul className="space-y-2">
              <li><a className="hover:underline" href="#">About us</a></li>
              <li><a className="hover:underline" href="#">Contact</a></li>
              <li><a className="hover:underline" href="#">Jobs</a></li>
              <li><a className="hover:underline" href="#">Press kit</a></li>
            </ul>
          </div>

          
<div>
  <h6 className="text-lg font-semibold mb-4">SOCIAL</h6>
  <div className="flex space-x-6">
    <a href="#" aria-label="Twitter">
      <img
        src={twitter}
        alt="Twitter"
        className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
      />
    </a>
    <a href="#" aria-label="YouTube">
      <img
        src={youtube}
        alt="YouTube"
        className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
      />
    </a>
    <a href="#" aria-label="Facebook">
      <img
        src={facebook}
        alt="Facebook"
        className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
      />
    </a>
    <a href="#" aria-label="Telegram">
      <img
        src={telegram}
        alt="Telegram"
        className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
      />
    </a>
  </div>
</div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;

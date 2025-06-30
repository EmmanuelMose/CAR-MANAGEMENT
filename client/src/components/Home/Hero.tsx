import homeIMG from '../../assets/images/home.jpg';
import facebook from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
// import instagram from '../../assets/images/instagram.png';
// import linkedin from '../../assets/images/linkedin.png';
// import watsup from '../../assets/images/whatsapp.png';
import telegram from '../../assets/images/telegram.png';
import youtube from '../../assets/images/youtube.png';


function Home() {
  return (
    <main className="mt-5">
      <section id="welcome" className="flex flex-col lg:flex-row justify-evenly gap-5 px-5">
        
       
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl md:text-4xl text-center text-blue-600 font-bold py-5">
            Discover Trusted Automotive Solutions
          </h1>
          <p className="text-xl italic underline text-center pb-5">
            Quality service, repairs, and maintenance — all in one place.
          </p>
          <p className="text-lg md:text-xl px-4 mb-4">
            Our platform connects you with reliable experts for diagnostics, maintenance, and upgrades. 
            We ensure your vehicle stays safe, efficient, and road-ready.
            <br />
            From oil changes to major repairs, we’ve got your car covered.
          </p>

          
          <div className="flex justify-center items-center gap-5 my-5">
            <button className="px-5 py-2 bg-blue-300 hover:bg-green-600 hover:text-white rounded text-lg">
              Learn More
            </button>
            <button className="px-5 py-2 bg-blue-300 hover:bg-green-600 hover:text-white rounded text-lg">
              Get Started
            </button>
          </div>

          
          <div className="flex justify-center gap-3">
            <img
              src={facebook}
              alt="Facebook"
              className="w-10 h-10 bg-gray-300 p-2 hover:bg-green-600 rounded cursor-pointer"
            />
            <img
              src={youtube}
              alt="YouTube"
              className="w-10 h-10 bg-gray-300 p-2 hover:bg-green-600 rounded cursor-pointer"
            />
            <img
              src={telegram}
              alt="Telegram"
              className="w-10 h-10 bg-gray-300 p-2 hover:bg-green-600 rounded cursor-pointer"
            />
            <img
              src={twitter}
              alt="Twitter"
              className="w-10 h-10 bg-gray-300 p-2 hover:bg-green-600 rounded cursor-pointer"
            />
          </div>
        </div>

        
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img src={homeIMG} alt="hero" className="w-4/5" />
        </div>

      </section>
    </main>
  );
}

export default Home;

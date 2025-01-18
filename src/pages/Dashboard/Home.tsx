import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";

const Header = ({ onCurrencyChange }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("EUR");
  const currencies = ["EUR", "USD", "BRL"];
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [officeType, setOfficeType] = useState("");

  const navigate = useNavigate();

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    onCurrencyChange(newCurrency);
  };

  return (
    <header className="flex flex-col space-y-6 bg-gradient-to-r to-sky-600 from-white text-white shadow-md sticky top-0 z-10 p-6">
      <div className="flex justify-between items-center">
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-900 text-4xl font-bold">WorkSpacePro</div>

        <div className="flex flex-wrap items-center space-x-6 p-4 bg-gray-50 rounded-xl shadow-md">
  {/* Select de Localização com Ícone */}
  <div className="relative">
    <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
      🌍
    </span>
    <select
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="pl-10 border border-gray-300 rounded-full px-4 py-2 bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="">Selecionar Localização</option>
      <option value="Lisboa">Lisboa</option>
      <option value="Barcelona">Barcelona</option>
      <option value="Madrid">Madrid</option>
    </select>
  </div>

  {/* DatePicker de Data de Início */}
  <DatePicker
    selected={checkIn}
    onChange={(date) => setCheckIn(date)}
    placeholderText="Data de Início"
    className="w-40 rounded-full px-4 py-2 bg-white text-black shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />

  {/* DatePicker de Data de Término */}
  <DatePicker
    selected={checkOut}
    onChange={(date) => setCheckOut(date)}
    placeholderText="Data de Término"
    className="w-40 rounded-full px-4 py-2 bg-white text-black shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />

  {/* Select de Moeda */}
  <select
    value={currency}
    onChange={(e) => handleCurrencyChange(e.target.value)}
    className="border border-gray-300 rounded-full px-4 py-2 bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    {currencies.map((cur) => (
      <option key={cur} value={cur}>
        {cur}
      </option>
    ))}
  </select>

  {/* Menu de Perfil */}
  <div className="relative">
    <button
      className="flex items-center text-black hover:text-indigo-500 transition focus:outline-none"
      onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
    >
      👤
    </button>
    {isProfileMenuOpen && (
      <ul className="absolute right-0 mt-10 w-60 bg-white text-black border border-gray-300 rounded-xl shadow-xl overflow-hidden transition-all transform origin-top-right scale-95 animate-fadeIn">
        <li
          className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 cursor-pointer transition flex items-center gap-2"
          onClick={() => alert("Entrar")}
        >
          <span className="material-icons">login</span>
          Entrar
        </li>
        <li
          className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 cursor-pointer transition flex items-center gap-2"
          onClick={() => alert("Cadastrar-se")}
        >
          <span className="material-icons">person_add</span>
          Cadastrar-se
        </li>
        <li
          onClick={() => navigate("/RegisterOffice")}
          className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 cursor-pointer transition flex items-center gap-2"
        >
          <span className="material-icons">add_business</span>
          Anunciar Escritório
        </li>
      </ul>
    )}
  </div>
</div>

      </div>
    </header>
  );
};

const Home = () => {
  const [currency, setCurrency] = useState("EUR");
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedTypes, setSelectedTypes] = useState([]);

  const offices = [
    { name: "Sala Privada Lisboa", location: "Lisboa, Portugal", type: "Sala Privada", price: 600, rating: 4.7 },
    { name: "Open Space Barcelona", location: "Barcelona, Espanha", type: "Open Space", price: 400, rating: 4.5 },
    { name: "CoWorking Madrid", location: "Madrid, Espanha", type: "CoWorking", price: 360, rating: 4.6 },
  ];

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangeratesapi.io/v1/latest?access_key=93a13b554f9c7e44f621ffdadd98a262"
        );
        const data = await response.json();

        if (data.success) {
          setExchangeRates(data.rates);
        } else {
          console.error("Erro ao buscar as taxas de câmbio:", data.error);
        }
      } catch (error) {
        console.error("Falha ao buscar as taxas de câmbio:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const toggleType = (type) => {
    setSelectedTypes((prevTypes) =>
      prevTypes.includes(type) ? prevTypes.filter((t) => t !== type) : [...prevTypes, type]
    );
  };

  const filteredOffices = offices.filter((office) => {
    return selectedTypes.length === 0 || selectedTypes.includes(office.type);
  });

  const convertedPrice = (price) => {
    if (!exchangeRates[currency]) {
      return price.toFixed(2);
    }
    const rate = exchangeRates[currency];
    return (price * rate).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCurrencyChange={(newCurrency) => setCurrency(newCurrency)} />

      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
  <div className="flex space-x-6">
    {[
      { type: "CoWorking", icon: "business_center" },
      { type: "Open Space", icon: "place" },
      { type: "Sala Privada", icon: "meeting_room" },
    ].map(({ type, icon }) => (
      <button
        key={type}
        onClick={() => toggleType(type)}
        className={`flex items-center space-x-2 px-6 py-3 rounded-full shadow-md transition-all transform ${
          selectedTypes.includes(type)
            ? "bg-indigo-500 text-white shadow-lg scale-105"
            : "bg-white border text-gray-700 hover:bg-gray-200"
        }`}
      >
        <span className="material-icons">{icon}</span>
        <span>{type}</span>
      </button>
    ))}
  </div>
</div>


      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {filteredOffices.map((office) => (
            <Link
              key={office.name}
              to={"/escritorio"}
              className="block"
            >
              <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
                <img
                  src="https://via.placeholder.com/300"
                  alt={office.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg truncate text-gray-800">{office.name}</h3>
                  <p className="text-gray-500 text-sm">{office.location}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-700 font-bold">
                      {convertedPrice(office.price)} {currency}
                    </p>
                    <p className="text-yellow-500 font-medium text-sm">⭐ {office.rating}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="text-center p-6 bg-gray-900 text-gray-200">
        <p className="text-sm">© 2025 WorkSpacePro. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;

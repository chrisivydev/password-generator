import {useState, useEffect} from "react";

const App = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolsChars = "!@#$%^&*()_+{}[]<>?";

  const generatePassword = () => {
    let chars = "";

    if (includeUpper) chars += upperChars;
    if (includeLower) chars += lowerChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolsChars;

    if (!chars) {
      setPassword("");
      return;
    }

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(generated);
  };

  useEffect(() => {
    generatePassword();
  }, [
    length,
    includeUpper,
    includeLower,
    includeNumbers,
    includeSymbols,
  ]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (includeUpper) score++;
    if (includeLower) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    if (length >= 16) score++;

    if (score <= 2)
      return {text: "Weak", color: "bg-red-500", width: "33%"};
    if (score <= 4)
      return {text: "Medium", color: "bg-yellow-500", width: "66%"};
    return {text: "Strong", color: "bg-green-500", width: "100%"};
  };

  const strength = getStrength();

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 text-gray-200 w-full max-w-md p-6 rounded-2xl shadow-xl border-gray-800">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Password Generator
        </h1>

        {/* password display */}
        <div className="flex mb-4">
          <input
            type="text"
            value={password}
            placeholder="Generated Password"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 rounded-r-lg transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* strength indicator */}
        <div className="mb-4">
          <div className="h-2 bg-gray-800 rounded">
            <div
              className={`h-2 rounded ${strength.color}`}
              style={{width: strength.width}}
            ></div>
          </div>
          <p className="text-sm mt-1">{strength.text}</p>
        </div>

        {/* password length */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value) || 0)}
            className="w-full accent-indigo-600"
          />
        </div>

        {/* options */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center justify-between cursor-pointer">
            <span>Include Uppercase</span>
            <input
              type="checkbox"
              checked={includeUpper}
              className="accent-indigo-600"
              onChange={() => setIncludeUpper(!includeUpper)}
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span>Include Lowercase</span>
            <input
              type="checkbox"
              checked={includeLower}
              className="accent-indigo-600"
              onChange={() => setIncludeLower(!includeLower)}
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span>Include Numbers</span>
            <input
              type="checkbox"
              checked={includeNumbers}
              className="accent-indigo-600"
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span>Include Symbols</span>
            <input
              type="checkbox"
              checked={includeSymbols}
              className="accent-indigo-600"
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
          </label>
        </div>

        {/* Generate Button */}
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg2 font-semibold transition cursor-pointer">
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default App;
//cdi

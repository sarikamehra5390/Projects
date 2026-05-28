import { useState, useCallback, useEffect, useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  //useRef hook

  const passwordRef = useRef(null)

  //useCallBack : is a react hook that lets you cache a function defination between re-renders
  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[](){}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101)
    window.navigator.clipboard.writeText(Password)

    setCopied(true)

    setTimeout(() =>{
      setCopied(false)
    }, 2000 )
  }, [Password])

 //useEffect is a react hook that lets synchronize a component with an external system 

 useEffect(() => {
  PasswordGenerator()
 }, [length, numberAllowed, charAllowed, PasswordGenerator])
   
  return (
    <>
      <div className="w-full text-center max-w-md mx-auto shadow-md rounded-lg px-4 my-10 py-4 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
<div className="flex shadow rounded-lg mb-4">
  <input
    type="text"
    value={Password}
    className="outline-none flex-1 py-2 px-3 bg-white text-black"
    placeholder="Password"
    readOnly
    ref={passwordRef}
  />

  <div className="relative flex items-center">
    <button
      onClick={copyPasswordToClipboard}
      className="h-full bg-blue-700 text-white px-4 flex items-center justify-center active:bg-sky-700 active:scale-95 transition-all duration-150"
    >
      Copy
    </button>

    {copied && (
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-green-400 text-xs bg-white-500 px-2 py-1 rounded whitespace-nowrap shadow-lg">
        Copied!
      </span>
    )}
  </div>
</div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                // it is used to flip the values like if there is true then it will be false and vice-versa
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                // it is used to flip the values like if there is true then it will be false and vice-versa
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

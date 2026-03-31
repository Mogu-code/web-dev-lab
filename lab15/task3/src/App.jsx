import { useState, useEffect, useRef } from "react";
import { UserContext } from "./UserContext";
import Child from "./Child";

// ---------- Props Demo ----------
function Greeting({ name, message }) {
  return (
    <div style={{ border: "1px solid #aaa", padding: "10px", margin: "8px", borderRadius: "5px" }}>
      <strong>Props →</strong> Hello, {name}! — {message}
    </div>
  );
}

// ---------- Main App ----------
function App() {
  // useState
  const [count, setCount] = useState(0);

  // useEffect
  useEffect(() => {
    console.log("useEffect: count changed to", count);
  }, [count]);

  useEffect(() => {
    console.log("useEffect: Component mounted (runs once)");
  }, []);

  // useRef
  const inputRef = useRef(null);
  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", fontFamily: "Arial" }}>
      <h2>Task 3 — React Hooks & Props</h2>

      {/* Props */}
      <h3>1. Props</h3>
      <Greeting name="Alice" message="Welcome to React!" />
      <Greeting name="Bob" message="Props are read-only!" />

      {/* useState */}
      <h3>2. useState</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: "10px" }}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>

      {/* useEffect — check browser console */}
      <h3>3. useEffect</h3>
      <p style={{ color: "gray" }}>Open browser console (F12) — useEffect logs appear there when count changes.</p>

      {/* useRef */}
      <h3>4. useRef</h3>
      <input ref={inputRef} placeholder="Click button to focus me" style={{ padding: "8px" }} />
      <button onClick={focusInput} style={{ marginLeft: "10px", padding: "8px" }}>Focus Input</button>

      {/* useContext */}
      <h3>5. useContext</h3>
      <UserContext.Provider value="Mokshdaa">
        <Child />
      </UserContext.Provider>
    </div>
  );
}

export default App;
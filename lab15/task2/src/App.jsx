import { useState } from "react";

const buttons = [
  ["C", "DEL", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["00", "0", ".", "="],
];

const operatorStyle = {
  background: "#f0a500",
  color: "white",
  fontWeight: "500",
};

const specialStyle = {
  background: "#e0e0e0",
  color: "#333",
};

function App() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [justEvaluated, setJustEvaluated] = useState(false);

  const handleButton = (val) => {
    if (val === "C") {
      setDisplay("0");
      setExpression("");
      setJustEvaluated(false);
      return;
    }

    if (val === "DEL") {
      if (display.length > 1) setDisplay(display.slice(0, -1));
      else setDisplay("0");
      return;
    }

    if (val === "=") {
      try {
        const expr = expression + display;
        // replace % with /100
        const sanitized = expr.replace(/(\d+)%/g, "($1/100)");
        const result = Function('"use strict"; return (' + sanitized + ")")();
        const rounded = parseFloat(result.toFixed(10)).toString();
        setDisplay(rounded);
        setExpression("");
        setJustEvaluated(true);
      } catch {
        setDisplay("Error");
        setExpression("");
      }
      return;
    }

    const isOperator = ["+", "-", "*", "/"].includes(val);

    if (isOperator) {
      setExpression(expression + display + val);
      setDisplay("0");
      setJustEvaluated(false);
      return;
    }

    if (val === "%") {
      setExpression(expression + display + "%");
      setDisplay("0");
      setJustEvaluated(false);
      return;
    }

    // number or dot
    if (justEvaluated) {
      setDisplay(val === "." ? "0." : val);
      setJustEvaluated(false);
      return;
    }

    if (val === "." && display.includes(".")) return;
    if (display === "0" && val !== ".") setDisplay(val);
    else setDisplay(display + val);
  };

  const getButtonStyle = (val) => {
    if (val === "=") return { ...operatorStyle, background: "#e67e00" };
    if (["/", "*", "-", "+"].includes(val)) return operatorStyle;
    if (["C", "DEL", "%"].includes(val)) return specialStyle;
    return {};
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#1a1a2e",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
    }}>
      <div style={{
        background: "#16213e",
        borderRadius: "20px",
        padding: "20px",
        width: "320px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      }}>
        {/* Display */}
        <div style={{
          background: "#0f3460",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "16px",
          textAlign: "right",
          minHeight: "90px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}>
          <div style={{ color: "#aaa", fontSize: "14px", minHeight: "20px", wordBreak: "break-all" }}>
            {expression}
          </div>
          <div style={{
            color: "white",
            fontSize: display.length > 12 ? "22px" : "36px",
            fontWeight: "300",
            wordBreak: "break-all",
            marginTop: "4px",
          }}>
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          {buttons.flat().map((btn, i) => (
            <button
              key={i}
              onClick={() => handleButton(btn)}
              style={{
                padding: "18px 0",
                borderRadius: "12px",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                background: "#1a1a2e",
                color: "white",
                transition: "transform 0.1s, opacity 0.1s",
                ...getButtonStyle(btn),
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
              onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {btn === "*" ? "×" : btn === "/" ? "÷" : btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
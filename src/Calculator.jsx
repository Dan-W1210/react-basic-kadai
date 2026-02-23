import { useState } from "react";
import "./App.css";

export default function Calculator() {
  const [display, setDisplay] = useState("");

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', 'C', '=', '+'
  ];

  const calculate = (expression) => {
    const validExpression = /^(\d+)([+\-*/])(\d+)$/;
    const match = expression.match(validExpression);

    if (!match) {
      throw new Error("無効な式");
    }

    const num1 = Number(match[1]);
    const operator = match[2];
    const num2 = Number(match[3]);

    switch (operator) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': return num1 / num2;
      default: throw new Error("不明な演算子");
    }
  };

  const handleClick = (btn) => {
    if (btn === "C") {
      setDisplay("");
      return;
    }

    if (btn === "=") {
      try {
        const result = calculate(display);
        setDisplay(String(result));
      } catch {
        setDisplay("エラー");
      }
      return;
    }

    setDisplay((prev) => prev + btn);
  };

  return (
    <div className="calculator-container">
      <h2>電卓アプリ</h2>

      <div className="display">
        {display || "0"}
      </div>

      <div className="button-grid">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
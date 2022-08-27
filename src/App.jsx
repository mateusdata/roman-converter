import { useState } from "react";

const romans = {
  1: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
  2: ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
  3: ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
  4: ['M', 'MM', 'MMM']
}

const romanLetters = { "I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "M": 1000, "D":500 }

function App() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const formHandler = (event) => {
    event.preventDefault();

    if (!isNaN(Number(input)) && (+input < 1 || +input > 3999)) {
      setError("Valor inválido! Informe um valor entre 1 e 3999!")
      return
    }

    setError("")
    getNumber()
  }

  const getNumber = () => {
    let output = ""

    if (isNaN(Number(input))) {
      output = 0
      const array = input.toLocaleUpperCase().split("")

      for (let index = 0; index < array.length; index++) {
        let currentValue = +romanLetters[array[index]]
        let nextValue = +romanLetters[array[index + 1]]
        if (currentValue < nextValue) {
          output += nextValue - currentValue
          index++
        }

        else {
          output += currentValue
        }
      }

      setOutput(output);
      return
    }

    input.split("")
      .reverse()
      .forEach((number, index) => {
        if (+number === 0) return

        output = romans[index + 1][number - 1] + output
      });

    setOutput(output);
  }


  return (
    <div className="container">
        <h1>Conevrsor de número</h1>
        <span>É possível converter de número arábico para romano e o contrários!</span>
      <form onSubmit={formHandler}>
          <input style={{borderColor: error ? "#a01818" : ""}} type="text" name="number" placeholder="Informe um valor" onChange={el => setInput(el.target.value)} />
          <button type="submit">Converter</button>
      </form>

      <p className="text-error">{error}</p> <br /> <br />

      {output && <div className="result">
        <p>Resultado</p>
        <h3>{output}</h3>
      </div>}
    </div>
  );
}

export default App;

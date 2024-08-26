"use client";
import { useEffect, useState, useRef } from "react";
import { TiDelete } from "react-icons/ti";
import { FaCopy } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { v4 } from "uuid";
import extenso from "extenso";

export function CardLayout() {
  const [taskInput, setTaskinput] = useState("");
  const [todos, setTodos] = useState([...data]);
  const [showCopyButton, setShowCopyButton] = useState(false);

  function HandleNewtask() {
    const newTodo = {
      uuid: v4(),
      taskInput,
      completed: false,
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setTaskinput(""); // Limpar o input após adicionar a tarefa

    console.log(todos);
  }

  const toggleTask = (uuid) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.uuid === uuid ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteById = (uuid) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.uuid !== uuid));
  };


  const [inputExtense, setInputExtense] = useState(0);
  const [mode, setMode] = useState("number");
  const [result, setResult] = useState();

  function DisplayExtense() {
    setResult(extenso(inputExtense, { mode: mode }));
    setShowCopyButton(true); // Mostrar o botão "Copiar"
  }

  const [copyButtonText, setCopyButtonText] = useState(<FaCopy />);

  const resultRef = useRef(null);

  const copyToClipboard = () => {
    // Verificar se o botão "Copiar" deve ser acionado
    if (showCopyButton && result) {
      // Criar uma área de transferência temporária
      const tempInput = document.createElement("input");
      tempInput.value = result.toUpperCase();

      // Adicionar a área de transferência ao DOM
      document.body.appendChild(tempInput);

      // Selecionar o texto na área de transferência
      tempInput.select();
      tempInput.setSelectionRange(0, 99999); // Para dispositivos móveis

      // Executar o comando de cópia
      document.execCommand("copy");

      // Remover a área de transferência temporária do DOM
      document.body.removeChild(tempInput);

      // Atualizar o estado para mostrar o botão "Copiado"
      setCopyButtonText(<IoMdDoneAll />);
    }
  };

  useEffect(() => {
    // Limpar o texto do botão após um curto período
    const timeoutId = setTimeout(() => {
      setCopyButtonText(<FaCopy />);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [copyButtonText]);

  return (
    <div className="gap-20 flex max-xl:gap-5 max-md:flex-col items-center">
      <div className="bg-drk900 w-2/3 rounded-3xl h-80 border  border-cnz700 shadow-xl py-6 max-xl:w-1/2 max-md:w-full">
        <div className="w-full pb-6  border-b border-cnz700 items-center relative flex">
          <input
            value={taskInput}
            onChange={(e) => setTaskinput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                // Chama a função ao pressionar "Enter"
                HandleNewtask();
              }
            }}
            type="text"
            placeholder="Digite sua tarefa..."
            className="w-full h-10 ml-6 mr-6 shadow-lg outline-none bg-drk900 border border-cnz700 pl-4 rounded-3xl"
          />
          <button
            onClick={HandleNewtask}
            className="absolute mr-6 right-0 bg-grn500 px-4 h-10 rounded-tl-[42px] rounded-tr-[42px] rounded-br-[42px] transition-all hover:bg-opacity-70"
          >
            Adicionar
          </button>
        </div>
        <ul className="px-6 mt-2 h-48 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-drk950 scrollbar-thumb-grn500 ">
          {todos.map((item) => (
            <li
              className={`text-sm gap-2 py-1 px-3 rounded-2xl flex items-start justify-between hover:border border-cnz700 hover:shadow-xl ${
                item.completed ? "line-through" : ""
              }`}
              key={item.id}
            >
              <input
                onChange={() => toggleTask(item.uuid)}
                type="checkbox"
                className="accent-grn500 mt-1 cursor-pointer"
                checked={item.completed}
              />
              <span className="text-start w-full whitespace-normal text-[#999]">
                {item.taskInput}
              </span>
              <button onClick={() => deleteById(item.uuid)}>
                <TiDelete className=" w-5 h-5 text-[#f06464]/40 hover:text-[#f06464]" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-drk900 w-1/3 rounded-3xl h-80 border flex flex-col border-cnz700 shadow-xl py-6 max-xl:w-1/2 max-md:w-full">
        <div className="w-full pb-6   items-center  flex">
          <input
            type="text"
            onChange={(e) => setInputExtense(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                // Chama a função ao pressionar "Enter"
                DisplayExtense();
              }
            }}
            placeholder="Digite um valor..."
            className="w-full h-10 ml-6 mr-6 shadow-lg outline-none bg-drk900 border border-cnz700 pl-4 rounded-3xl"
          />
        </div>

        <div className="flex mx-6 justify-between relative">
          <div>
            <div className="flex items-center">
              <input
                checked={mode === "number"} // Verifica se o modo é 'number'
                onChange={() => setMode("number")} // Define o modo como 'number'
                type="radio"
                name="number"
                id="number"
                className="accent-grn500 mr-2 cursor-pointer bg-drk900"
              />
              <label htmlFor="number" className="cursor-pointer opacity-70 ">
                Numerico
              </label>
            </div>

            <div className="flex items-center">
              <input
                checked={mode === "currency"} // Verifica se o modo é 'currency'
                onChange={() => setMode("currency")} // Define o modo como 'currency'
                type="radio"
                name="number"
                id="monetary"
                className="accent-grn500 mr-2 cursor-pointer"
              />

              <label htmlFor="monetary" className="cursor-pointer opacity-70">
                Monetário
              </label>
            </div>
          </div>

          <button
            onClick={DisplayExtense}
            className=" right-0 bg-grn500 px-7 h-10 rounded-tl-[42px] rounded-tr-[42px] rounded-br-[42px] transition-all hover:bg-opacity-70"
          >
            Converter
          </button>
        </div>
        <hr className="text-cnz700  mt-6" />
        <div className=" relative overflow-y-hidden h-full">
          <div className="p-6 scrollbar-thin scrollbar-track-drk950 mr-5 scrollbar-thumb-grn500">
            <p className="uppercase" ref={resultRef}>
              {result}
            </p>
            <button
              onClick={copyToClipboard}
              className="bg-drk950 absolute top-0 right-6 px-2 text-grn500 py-2 rounded opacity-50 transition-all text-white mt-4 hover:opacity-100"
            >
              {copyButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

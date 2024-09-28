"use client";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaCalendarDays } from "react-icons/fa6";
const Home = () => {
  const [todo, settodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [iteration, setIteration] = useState(1);
  const [showFinished, setShowFinished] = useState(true);
  const [DueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const add = useRef();
  const InpRef = useRef();
  useEffect(() => {
    const todoStr = localStorage.getItem("todos");
    if (todoStr) {
      const todos = JSON.parse(todoStr);
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    if (iteration == 0) saveToLC();
    setIteration(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const saveToLC = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  let addTodo = () => {
    if (todo.length <= 0) {
      return alert("Kindly Add Todo");
    }
    setTodos([...todos, { todo, isCompleted: false, description, DueDate }]);
    settodo("");
    setDueDate("");
    setDescription("");
    add.current.textContent = "Add";
  };

  let editTodo = (e) => {
    const value = JSON.parse(e.target.value)
    settodo(value.todo);
    setDescription(value.description)
    setDueDate(value.DueDate)
    add.current.textContent = "Save";
    InpRef.current.focus();
    const Updated_todoslist = todos.filter((i) => i.todo != value.todo);
    setTodos(Updated_todoslist)
  };

  let deleteTodo = (e) => {
    const Updated_todoslist = todos.filter((i) => i.todo != e.target.value);
    setTodos(Updated_todoslist);
  };

  let isCheck = (e) => {
    let index = todos.findIndex((val) => val.todo == e.target.value);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  let renderTask = (
    <h2 className="text-2xl m-auto text-gray-500 ">No Todos Here</h2>
  );

  if (todos.length > 0) {
    renderTask = todos.map((todo) => {
      return (
        (showFinished || !todo.isCompleted) && (
          <div
            key={uuidv4()}
            className="flex items-center w-[100%] justify-between"
          >
            <div className="flex text-wrap">
              <input
                type="checkbox"
                name="checkbox"
                onChange={isCheck}
                className="mt-4 mx-4"
                value={todo.todo}
                checked={todo.isCompleted}
              />
              <div className="flex flex-col">
                <div
                  className={
                    todo.isCompleted
                      ? "todo w-[100%] px-2   mt-4 line-through font-bold italic"
                      : "todo w-[95%] px-2   mt-4  font-bold italic "
                  }
                >
                  {todo.todo}
                </div>
                <ul className="flex gap-2 items-center justify-center">
                  <li className="text-gray-500 text-sm pl-2">
                    {todo.description}
                  </li>
                  <li className="text-gray-500 text-sm list-disc list-inside">
                    {todo.DueDate}
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="edit mt-4 bg-blue-500 px-2 py-1 rounded-xl"
                onClick={editTodo}
                value={JSON.stringify(todo)}
              >
                Edit
              </button>
              <button
                className="delete mt-4 bg-blue-500 px-2 py-1 rounded-xl mr-2"
                onClick={deleteTodo}
                value={todo.todo}
              >
                Delete
              </button>
            </div>
          </div>
        )
      );
    });
  }

  let handleFinish = () => {
    setShowFinished(!showFinished);
  };

  let dueDate = (e) => {
    setDueDate(e.target.value);
  };

  return (
    <>
      <div className="main w-1/2 min-w-60 h-[90vh]  bg-[#eff1f2] mx-auto mt-12 rounded-2xl border-2 border-blue-400 text-black">
        <h1 className="text-4xl font-bold italic font-sans mx-5 my-2 ">
          Your Todos
        </h1>

        <div className="input flex gap-2">
          <input
            type="text"
            name="your todos"
            className="w-1/3 border-2 border-black ml-4 px-2 text-xl rounded-md "
            placeholder="Enter Your Todo."
            value={todo}
            onChange={(e) => settodo(e.target.value)}
            onKeyDown={(e) => (e.key == "Enter" ? addTodo() : null)}
            ref={InpRef}
            autoFocus
          />

          <div className="dueDate relative w-6 h-6 overflow-hidden">
            <input
              type="date"
              name="dueDate"
              className="dueDate absolute top-0 left-0 opacity-0 z-10 w-6 h-6"
              title="set due date"
              onChange={dueDate}
            />
            <FaCalendarDays
              className="w-6 h-6 absolute top-0 left-0"
              title="set due date"
            />
          </div>

          <button
            className="add text-xl bg-blue-500 px-2 rounded-xl border-black border-2"
            onClick={addTodo}
            ref={add}
          >
            Add
          </button>
        </div>

        <input
          type="text"
          name="description"
          id="description"
          className="w-1/2 border-2 border-gray-500 mx-4 my-2 px-2 text-xl rounded-md"
          placeholder="Enter description(optional)"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <div className="flex">
          <div className="text-lg ml-4 mt-1">ShowFinished</div>
          <input
            type="checkbox"
            name="showfinished"
            className="showfinished ml-1 mt-1"
            checked={showFinished}
            onChange={handleFinish}
          />
        </div>
        <div className="todos w-[95%] h-[65%] bg-white border-2 border-[#000000a3] mx-auto mt-2 rounded-md flex items-start gap-2 flex-col overflow-y-auto">
          {renderTask}
        </div>
      </div>
    </>
  );
};

export default Home;

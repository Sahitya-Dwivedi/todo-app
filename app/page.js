"use client"
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
const home = () => {
  const [todo, settodo] = useState("")
  const [todos, setTodos] = useState([])
  const [iteration, setIteration] = useState(1)
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    const todoStr = localStorage.getItem("todos")
    if (todoStr) {
      const todos = JSON.parse(todoStr)
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    if (iteration == 0)
      saveToLC()
    setIteration(0)
  }, [todos])

  const saveToLC = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  let addTodo = () => {
    if (todo.length <= 0) {
      return alert("Kindly Add Todo")
    }
    setTodos([...todos, { "todo": todo, "isCompleted": false }])
    settodo("")
  }

  let InputChange = (e) => {
    settodo(e.target.value)
  }

  let editTodo = (e) => {
    settodo(e.target.value)
    deleteTodo(e)
  }

  let deleteTodo = (e) => {
    const Updated_todoslist = todos.filter((i) => i.todo != e.target.value)
    setTodos(Updated_todoslist)

  }

  let isCheck = (e) => {
    let index = todos.findIndex(val => val.todo == e.target.value)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  let renderTask = <h2 className='text-2xl m-auto text-gray-500 '>No Todos Here</h2>

  if (todos.length > 0) {
    renderTask = todos.map((todo) => {
      return ( (showFinished || !todo.isCompleted) &&
        <div key={uuidv4()} className='flex items-center gap-8 w-[95%] justify-between'>
          <div className='flex text-wrap'>
            <input type="checkbox" name="checkbox" onChange={isCheck} className="mt-4 mx-4" value={todo.todo} checked={todo.isCompleted} />
            <div className={todo.isCompleted ? "todo w-[95%] px-2 py-1  mt-4 text-center line-through" : "todo w-[95%] px-2 py-1  mt-4 text-center"}>{todo.todo}</div>
          </div>
          <div className='flex gap-2'>
            <button className="edit mt-4 bg-blue-500 px-2 py-1 rounded-xl" onClick={editTodo} value={todo.todo}>Edit</button>
            <button className="delete mt-4 bg-blue-500 px-2 py-1 rounded-xl" onClick={deleteTodo} value={todo.todo}>Delete</button>
          </div>
        </div>
      )
    }
    )
  }

  let handleFinish = () => {
    setShowFinished(!showFinished)
  }

  return (
    <>
      <div className="main w-1/2 min-w-60 h-[90vh]  bg-[#eff1f2] mx-auto mt-12 rounded-2xl border-2 border-blue-400 text-black">
        <h1 className="text-4xl font-bold italic font-sans mx-5 my-2 ">Your Todos</h1>
        <div className="input flex gap-2">
          <input type="text" name="your todos" className="w-1/3 border-2 border-black ml-4 px-2 text-xl rounded-xl " placeholder="Enter Your Todo." value={todo} onChange={InputChange} />
          <button className="add text-xl bg-blue-500 px-2 rounded-xl border-black border-2" onClick={addTodo}>Add</button>
        </div>
        <div className='flex'>
          <div className='text-lg ml-4 mt-1'>ShowFinished</div>
          <input type="checkbox" name="showfinished" className="showfinished ml-1 mt-1" checked={showFinished} onChange={handleFinish} />
        </div>
        <div className="todos w-[95%] h-[75%] bg-white border-2 border-[#000000a3] mx-auto mt-2 rounded-xl flex items-start gap-2 flex-col overflow-y-auto">
          {renderTask}
        </div>
      </div>
    </>
  )
}

export default home

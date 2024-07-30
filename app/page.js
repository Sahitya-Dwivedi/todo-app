"use client"
import React from 'react'
import { useState } from 'react'


const home = () => {
  let [todo, settodo] = useState()
  const [todos, setTodos] = useState([])

  let add = () => {
    setTodos([...todos, todo])
  }
  let InputChange = (e) => {
    settodo(e.target.value)
  }

  return (
    <div>
      <div className="main w-1/2 min-w-60 h-[90vh]  bg-[#eff1f2] mx-auto mt-12 rounded-2xl border-2 border-blue-400 text-black">
        <h1 className="text-4xl font-bold italic font-sans mx-5 my-2 ">Your Todos</h1>
        <div className="input flex gap-2">
          <input type="text" name="your todos" className="w-1/3 border-2 border-black ml-4 px-2 text-xl rounded-xl " placeholder="Enter Your Todo." defaultValue={todo} onChange={InputChange} />
          <button className="add text-xl bg-blue-500 px-2 rounded-xl border-black border-2" onClick={add}>add</button>
        </div>
        <div className="todos w-[95%] h-[80%] bg-white border-2 border-[#000000a3] mx-auto mt-2 rounded-xl flex items-start gap-2 flex-col">
          {
            todos.map((todo) => {
              return (
                <div className='flex items-center gap-1'>
                  <input type="checkbox" name="checkbox" className="mt-4 mx-4" />
                  <div className="todo w-[95%] px-2 py-1  mt-4 text-center">{todo}</div>
                </div>
              )
            }
            )
          }
        </div>
      </div>
    </div>
  )
}

export default home

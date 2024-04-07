import React, { useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import Modal from './Modal';
import Task from './Task';

const CreateTask = ({tasks, setTasks}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [editorValue, setEditorValue] = useState("");
    const [priorityValue, setPriorityValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const [error, setError] = useState('');



      const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!editorValue && !inputValue) {
          setError('Please enter title & description.');
          return;
        } else if (!inputValue) {
          setError('Please enter a title.');
          return;
        } else if (!editorValue) {
          setError('Please enter a description.');
          return;
        }
        const payload = {
          title: inputValue,
          desc: editorValue,
          Priority: priorityValue,
          Category: categoryValue
        };
      
        try {
          const response = await fetch('https://mern-todo-plum.vercel.app/shree/task', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          const data = await response.json()
          // Update state or fetch data again if needed
          const updatedTasks = [...tasks, data];
          setTasks(updatedTasks)
          setInputValue("");
          setEditorValue("");
          setPriorityValue("");
          setCategoryValue("");
          setModalOpen(false);
        } catch (error) {
          console.error('Error adding task:', error);
          setError('Failed to add task. Please try again.');
        }
      };
      
  return (
    <>
       <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add New Task
        <AiOutlinePlus size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <h3 className="font-bold text-lg">Add New Task</h3>
         
          <input
            className="input input-bordered w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Enter title here..."
          />
        
          <textarea
          className="textarea textarea-bordered textarea-md w-full"
          placeholder="Enter description here..." 
          onChange={(e) => setEditorValue(e.target.value)}>
          </textarea>

          {error && <p className="error text-red-500">{error}</p>}
<div className='flex gap-2'>  
   <select required
          className="select select-bordered w-full max-w-xs"
          // value={statusValue}
          onChange={(e) => setPriorityValue(e.target.value)}
        >
          <option className="" value="" disabled selected>Choose Priority</option>
          <option className="" value="Low">Low</option>
          <option className="" value="Medium">Medium</option>
          <option className="" value="High">High</option>
        </select>

        <select required
          className="select select-bordered w-full max-w-xs"
          // value={statusValue}
          onChange={(e) => setCategoryValue(e.target.value)}
        >
          <option className="" value="" disabled selected>Choose Category</option>
          <option className="" value="Work">Work</option>
          <option className="" value="Personal">Personal</option>
        </select>
        </div>
  
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </Modal>
    </div>
    </>
  )
}

export default CreateTask

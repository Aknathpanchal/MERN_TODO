import React, { useEffect, useState } from 'react'
import { FiEdit, FiTrash } from "react-icons/fi";
import Modal from "./Modal";
import { fetchData } from '../App';

const Task = ({ task, setTasks, index, modalOpenToDelete, setModalOpenToDelete }) => {
  const [modalOpenToEdit, setModalOpenToEdit] = useState(false);
  const [modalOpenToDetail, setModalOpenToDetail] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [editInputValue, setEditInputValue] = useState(task.title);
  const [editEditorValue, setEditEditorValue] = useState(task.desc);
  const [priorityValue, setPriorityValue] = useState(task.Priority);
  const [categoryValue, setCategoryValue] = useState(task.Category);
  const [singleValue, setSingleValue] = useState({});
  const [error, setError] = useState('');

console.log(singleValue)

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        if (!editEditorValue && !editInputValue) {
          setError('Please enter title & description.');
          return;
        }else if(!editInputValue) {
          setError('Please enter a title.');
          return;
        }else if(!editEditorValue) {
          setError('Please enter a description.');
          return;
        }
        setIsFormSubmitted(true);
        setModalOpenToEdit(false);
      };

    const handleEditorChange = (event) => {
        const newValue = event.target.value;
        setEditEditorValue(newValue);
        setIsFormSubmitted(false);
      };
    

        const handleDeleteTask = async (id) => {


          try {
            const response = await fetch(`https://mern-todo-plum.vercel.app/shree/task/${id}`, {
              method: 'DELETE'
            });
            const Data= response.json()
            fetchData(setTasks)
            setModalOpenToDelete(false);
          
          } catch (error) {
            console.error('Error deleting task:', error);
            setError('Failed to delete task. Please try again.');
          }
        };
    
    const handleTitleClick = async (id) => {
  try {
    const response = await fetch(`https://mern-todo-plum.vercel.app/shree/task/${id}`);

      const taskData = await response.json();
      setSingleValue(taskData);
      setModalOpenToDetail(true);
      setModalOpenToDelete(false);
 
  } catch (error) {
    console.error('Error fetching task:', error);
    setError('Failed to fetch task. Please try again.');
  }
};

    
    
      useEffect(() => {
        if (isFormSubmitted) {
          editTask();
        }
      }, [isFormSubmitted]);

      const editTask = async () => {
        try {
          const payload = {
            title: editInputValue,
            desc: editEditorValue,
            Priority: priorityValue,
            Category: categoryValue
          };
          const response = await fetch(`https://mern-todo-plum.vercel.app/shree/task/${task._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
      const data=response.json()
           await fetchData(setTasks)
        } catch (error) {
          console.error('Error editing task:', error);
          setError('Failed to edit task. Please try again.');
        }
      };
      

  return (
    <>
       <tr key={task._id}>
      <td className="text-center" onClick={() => handleTitleClick(task._id)}>
        {index + 1}
      </td>
      <td className="text-center" onClick={() => handleTitleClick(task._id)}>
        {task.title}
      </td>
      <td className="text-center">
      <div className={`badge ${task.Priority === 'Low' ? 'badge-success' : task.Priority === 'Medium' ? 'badge-warning' : task.Priority === 'High' ? 'badge-error' : ''} gap-2 text-white`}>
  {task.Priority}
      </div>
      </td>
      <td className="text-center">
      <div className={`badge ${task.Category === 'Work' ? 'badge-primary ' : task.Category === 'Personal' ? 'badge-secondary ' : ''} gap-2 badge-outline`}>
  {task.Category}
      </div>
      </td>
      <td className="flex gap-5 text-center items-center justify-center ">
        <FiEdit
          cursor="pointer"
          className="text-blue-500"
          size={45}
          onClick={() => setModalOpenToEdit(true)}
        />

        <Modal modalOpen={modalOpenToEdit} setModalOpen={setModalOpenToEdit}>
          <form onSubmit={handleEditFormSubmit} className="flex flex-col gap-5">
            <h3 className="font-bold text-lg">Edit Task</h3>
            
            <input
              required
              className="input input-bordered w-full"
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
              type="text"
              placeholder="Enter title here..."
            />

             <textarea
          className="textarea textarea-bordered textarea-md w-full"
          placeholder="Enter description here..." 
          value={editEditorValue}
          onChange={handleEditorChange}
          >
          </textarea>

          {error && <p className="error text-red-500">{error}</p>}
          <div className='flex gap-2'>  
   <select required
          className="select select-bordered w-full max-w-xs"
          value={priorityValue}
          onChange={(e) => setPriorityValue(e.target.value)}
        >
          <option className="" value="" disabled selected>Choose Priority</option>
          <option className="" value="Low">Low</option>
          <option className="" value="Medium">Medium</option>
          <option className="" value="High">High</option>
        </select>

        <select required
          className="select select-bordered w-full max-w-xs"
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
        >
          <option className="" value="" disabled selected>Choose Category</option>
          <option className="" value="Work">Work</option>
          <option className="" value="Personal">Personal</option>
        </select>
        </div>
            <button className="btn" type="submit">
              Update
            </button>
          </form>
        </Modal>

        <FiTrash
          cursor="pointer"
          className="text-red-500"
          size={45}
          onClick={() => handleDeleteTask(task._id)}
        />

        {/* <Modal
          modalOpen={modalOpenToDelete}
          setModalOpen={setModalOpenToDelete}
        >
          <h3 className="text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button className="btn" onClick={() => {
// handleDeleteTask(task._id)
console.log("ty:",singleId)
            }
              }>
              Yes
            </button>
          </div>
        </Modal> */}

        <Modal
          modalOpen={modalOpenToDetail}
          setModalOpen={setModalOpenToDetail}
        >
          <h3 className="text-lg">
            {/* {selectedTask?.title} */}
            { singleValue[0]?.title}
          </h3>
          <div
            className="modal-action justify-center"
            dangerouslySetInnerHTML={{
              __html: singleValue[0]?.desc,
            }}
          ></div>
        </Modal>
      </td>
    </tr>
    </>
  )
}

export default Task

import { useState } from "react";
import Task from "./Task";

const TodoList = ({ tasks, setTasks }) => {
  const [modalOpenToDelete, setModalOpenToDelete] = useState(false);

    return (
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th className="text-center">Sr.No.</th>
              <th className="text-center">Task</th>
              <th className="text-center">Priority</th>
              <th className="text-center">Category</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.map((task, taskIndex) => (
              <Task
                key={task._id}
                task={task}
                setTasks={setTasks}
                index={taskIndex}
                // handleDeleteTask={handleDeleteTask}
                modalOpenToDelete={modalOpenToDelete}
                setModalOpenToDelete={setModalOpenToDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TodoList;
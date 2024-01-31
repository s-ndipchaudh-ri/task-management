import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './TaskList.css'
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', description: '', status: '', dueDate: '' });
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    dueDate: ''
  });
  const [showNewTaskForm,setShowNewTaskForm] = useState(false)
  const navigate = useNavigate();

  
useEffect(()=>{
    setTriggerFetch(!triggerFetch)
},[])
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let config = {
          method: 'get',
          url: 'http://localhost:8001/task',
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        };

        const response = await axios.request(config);
        if (response.status === 200) {
         
          const tasksArray = Object.values(response.data.data);
          setTasks(tasksArray);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [triggerFetch]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowNewTaskForm(false)
    setEditFormData({ ...task });
  };

  const handleEditFormChange = (event) => {
    setEditFormData({ ...editFormData, [event.target.name]: event.target.value });
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const updatedTask = {
      id: selectedTask.id,
      title: editFormData.title,
      description: editFormData.description,
      status: editFormData.status,
      dueDate: editFormData.dueDate,
      
    };

    let config = {
      method: 'patch',
      url: 'http://localhost:8001/task',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
      data: JSON.stringify(updatedTask)
    };

    try {
      const response = await axios.request(config);
      if (response.status === 200) {
       
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
        setSelectedTask(null);
        setTriggerFetch(!triggerFetch);

      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  const handleDelete = async (taskId) => {
    try {
      let config = {
        method: 'delete',
        url: `http://localhost:8001/task`, 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        data: JSON.stringify({id : taskId})
      };
  
      const response = await axios.request(config);
      if (response.status === 200) {
       
        setTasks(tasks.filter(task => task.id !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  const handleNewTaskChange = (event) => {
    setNewTaskData({ ...newTaskData, [event.target.name]: event.target.value });
  };

  const handleAddTaskSubmit = async (event) => {
    event.preventDefault();
  
    let config = {
      method: 'post',
      url: 'http://localhost:8001/task',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
      data: JSON.stringify(newTaskData)
    };
  
    try {
      const response = await axios.request(config);
      if (response.status === 200) {
       
        setTasks([...tasks, response.data]);
     
        setNewTaskData({ title: '', description: '', status: 'To Do', dueDate: '' });
        setTriggerFetch(!triggerFetch)
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  

  return (
    <div className="task-management-container">
  <h1>Task Management</h1>
  <button className="add-button" onClick={()=> {setShowNewTaskForm(true);setSelectedTask(false)}}>Add</button>
  {
    showNewTaskForm && (
    <form onSubmit={handleAddTaskSubmit} className="add-task-form">
    <input
      type="text"
      name="title"
      placeholder="Title"
      value={newTaskData.title}
      onChange={handleNewTaskChange}
    />
    <input
      type="text"
      name="description"
      placeholder="Description"
      value={newTaskData.description}
      onChange={handleNewTaskChange}
    />
    <select
      name="status"
      value={newTaskData.status}
      onChange={handleNewTaskChange}
    >
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
    <input
      type="date"
      name="dueDate"
      value={newTaskData.dueDate}
      onChange={handleNewTaskChange}
    />
    <button type="submit">Add Task</button>
  </form>
    )
  }
  {selectedTask && (
  <form onSubmit={handleEditFormSubmit} className="edit-form">
  <input
            name="title"
            value={editFormData.title}
            onChange={handleEditFormChange}
          />
          <input
            name="description"
            value={editFormData.description}
            onChange={handleEditFormChange}
          />
          <select
            name="status"
            value={editFormData.status}
            onChange={handleEditFormChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={editFormData.dueDate}
            onChange={handleEditFormChange}
          />
          <button type="submit">Submit</button>
        </form>
      )}
  <table className="task-table">
    <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.user_id}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>
              <button className="button button-edit" onClick={() => handleEditClick(task)}>Edit</button>
              <button className="button button-delete" onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="logout-button" onClick={()=> {localStorage.setItem('accessToken','');navigate('/');}}>Logout</button>

    </div>
  );
};

export default TaskList;

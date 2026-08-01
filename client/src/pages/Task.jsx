import React, { useEffect, useState } from "react";

function Task() {

  const API_URL = process.env.REACT_APP_API_URL;

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // GET TASKS
  const fetchTasks = async () => {

    try {

      const response = await fetch(
        `${API_URL}/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]);
      }

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD / UPDATE TASK
  const saveTask = async () => {

    if (!title) {
      setMessage("Enter task title");
      return;
    }

    try {

      if (editId) {

        await fetch(
          `${API_URL}/api/tasks/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title,
            }),
          }
        );

        setEditId(null);

      } else {

        await fetch(
          `${API_URL}/api/tasks`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title,
              description: "",
              status: "Pending",
            }),
          }
        );

      }

      setTitle("");
      fetchTasks();

    } catch (error) {
      console.log(error);
    }

  };

  // EDIT TASK
  const editTask = (task) => {
    setTitle(task.title);
    setEditId(task._id);
  };

  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      await fetch(
        `${API_URL}/api/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="container mt-5">

      <h2>Task Management</h2>

      {message && <p>{message}</p>}

      <input
        className="form-control"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        className="btn btn-primary mt-3"
        onClick={saveTask}
      >
        {editId ? "Update Task" : "Add Task"}
      </button>

      {tasks.length === 0 ? (
        <h5 className="mt-3">No Tasks Available</h5>
      ) : (
        tasks.map((task) => (
          <div
            className="card p-3 mt-3"
            key={task._id}
          >
            <h5>{task.title}</h5>

            <p>Status: {task.status}</p>

            <button
              className="btn btn-warning me-2"
              onClick={() => editTask(task)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default Task;
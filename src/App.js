import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [formItems, setFormItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");


  useEffect(() => {
    const formItems = JSON.parse(localStorage.getItem("formItem")) || [];
    setFormItems(formItems);
  }, []);

  const createDate = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName} ${day} ${monthName}, ${year}`;
  };

  const createCalendar = () => {
    const today = new Date();
    return Array.from({ length: 8 }, (_, i) => {
      const next = new Date(today);
      next.setDate(today.getDate() + i);
      const formatted = createDate(next);

      const currentDay = `${next.getFullYear()}-${("0" + (next.getMonth() + 1)).slice(-2)}-${("0" + next.getDate()).slice(-2)}`;
      const tasks = formItems.filter((item) => item.start === currentDay);

      return { formatted, tasks, isToday: i === 0 };
    });
  };

  const highPriorityTasks = () => {
    return formItems.filter((item) => item.prio === "High");
  };

  const completedTasks = () => {
    return formItems.filter((item) => item.stat === "Completed");
  };

  function renderTasks (tasks) {
    return tasks.map((item, index) => (
      <button key={index}>
        <a href="screen2.html">
          <strong>Title:</strong> {item.ti} <br />
          {item.prio === "High" && <strong>Due Date:</strong>} {item.due || item.comp}
        </a>
      </button>
    ));
  };

  return (
    <html style={styles.html}>
      <body style={styles.body}>
        <div id="search-bar-container" style={styles["#search-bar-container"]}>
          <input 
            type="text" 
            id="search-bar" 
            placeholder="Search task" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            //oninput="searchTask()"
            style={styles["#search-bar"]}
          />
        </div>
        <br></br>
        <div>
          <button className="high" onClick={() => renderTasks(highPriorityTasks())}>Swipe Right</button>
          <button className="completed" onClick={() => renderTasks(completedTasks())}>Swipe Left</button>
        </div>
        <div id="uhhhh" style={styles["#uhhhh"]}>
          <div id="high-priority" style={styles["#high-priority, #completed-tasks"]}>
            <h1>High Priority Tasks</h1>
          </div>
          <div id="other-days">
            {createCalendar().map(({ formatted, tasks, isToday }, index) => (
              <div key={index}>
                <button className="preview-tasks" style={styles[".preview-tasks"]}>
                  {isToday ? <p style={styles["button > p"]}>Today's Date: {formatted}</p> : formatted}
                </button>
                <div className="tasks" style={styles[".tasks"]}>{renderTasks(tasks)}</div>
              </div>
            ))}
          </div>
          
          <div id="completed-tasks" style={styles["#high-priority, #completed-tasks"]}>
            <h1>Completed Tasks</h1>
            
          </div>
        </div>
      </body>
    </html>
  );
};

const styles = {
  html: { overflowX: "hidden" },
  body: { margin: "0", marginBottom: "10px" },
  "#search-bar-container": {
    position: "sticky",
    top: "0",
    backgroundColor: "#1d1d1d",
    padding: "10px"
  },
  "#search-bar": {
    width: "100%",
    padding: "10px",
    borderRadius: "20px",
    border: "none",
    fontSize: "16px"
  },
  "button > p": { fontWeight: "bold", fontSize: "large", margin: "0 0 5px 0" },
  "#uhhhh": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  "#high-priority, #completed-tasks": { padding: "10px" },
  "#other-days": {
    display: "flex",
    overflowY: "hidden",
    overflowX: "hidden",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%"
  },
  ".preview-tasks": {
    display: "block",
    backgroundColor: "blueviolet",
    color: "white",
    margin: "10px",
    marginBottom: "0",
    width: "100%",
    height: "100px",
    textAlign: "center",
    alignContent: "center",
    cursor: "pointer",
    transition: "0.4s",
    fontSize: "medium"
  },
  ".active, .preview-tasks:hover": { backgroundColor: "#ccc" },
  ".tasks": {
    padding: "20px",
    margin: "10px",
    marginTop: "0",
    width: "100%",
    backgroundColor: "aquamarine",
    textAlign: "center",
    display: "none",
    overflow: "hidden",
    maxHeight: "0",
    transition: "max-height 0.2s ease-out"
  },
  ".tasks p": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "0"
  },
  ".tasks button": { fontSize: "large", padding: "10px" },
  ".tasks button, #high-priority button, #completed-tasks button": {
    background: "none",
    border: "none",
    cursor: "pointer"
  },
  "a:link, a:visited": { color: "black", textDecoration: "none" },
  ".sortable button.hint": {
    border: "1px solid #ffc49a",
    background: "#feffb4"
  },
  ".sortable button.active": {
    border: "1px solid #ffa5a5",
    background: "#ffe7e7"
  }
}


export default Calendar;

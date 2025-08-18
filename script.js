document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".section").forEach(section => {
      const input = section.querySelector(".task-input");
      const addBtn = section.querySelector(".add-btn");
      const taskList = section.querySelector(".task-list");
  
      function renderTask(text, note = "", done = false) {
        const li = document.createElement("li");
        li.className = "task";
  
        const taskMain = document.createElement("div");
        taskMain.className = "task-main";
  
        const taskLeft = document.createElement("div");
        taskLeft.className = "task-left";
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = done;
  
        const span = document.createElement("span");
        span.textContent = text;
        if (done) span.style.textDecoration = "line-through";
  
        taskLeft.appendChild(checkbox);
        taskLeft.appendChild(span);
  
        const btnBox = document.createElement("div");
        const editBtn = document.createElement("button");
        editBtn.textContent = "編輯";
        editBtn.addEventListener("click", () => {
          const newText = prompt("修改待辦事項：", span.textContent);
          if (newText) span.textContent = newText;
        });
  
        const delBtn = document.createElement("button");
        delBtn.textContent = "刪除";
        delBtn.addEventListener("click", () => li.remove());
  
        btnBox.appendChild(editBtn);
        btnBox.appendChild(delBtn);
  
        taskMain.appendChild(taskLeft);
        taskMain.appendChild(btnBox);
  
        li.appendChild(taskMain);
  
        if (note) {
          const noteDiv = document.createElement("div");
          noteDiv.className = "note";
          noteDiv.textContent = "心得：" + note;
          li.appendChild(noteDiv);
        }
  
        checkbox.addEventListener("change", () => {
          if (checkbox.checked && !note) {
            const inputNote = prompt("請輸入評分及心得：");
            if (inputNote) {
              const noteDiv = document.createElement("div");
              noteDiv.className = "note";
              noteDiv.textContent = "心得：" + inputNote;
              li.appendChild(noteDiv);
            }
            span.style.textDecoration = "line-through";
          } else if (!checkbox.checked) {
            span.style.textDecoration = "none";
            const noteDiv = li.querySelector(".note");
            if (noteDiv) noteDiv.remove();
          }
        });
  
        taskList.appendChild(li);
      }
  
      function addTask() {
        const text = input.value.trim();
        if (!text) return;
        renderTask(text);
        input.value = "";
      }
  
      addBtn.addEventListener("click", addTask);
  
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
      });
    });
  });
  
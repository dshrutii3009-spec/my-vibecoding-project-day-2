const titleInput = document.getElementById("title");
const detailsInput = document.getElementById("details");
const createBtn = document.getElementById("createBtn");
const tasksEl = document.getElementById("tasks");

// Load all tasks and draw cards
async function loadTasks() {
  const res = await fetch("/api/tasks");
  const names = await res.json();

  tasksEl.innerHTML = "";
  names.forEach((name) => {
    const card = document.createElement("div");
    card.className = "card";

    const h3 = document.createElement("h3");
    h3.textContent = name;

    const link = document.createElement("a");
    link.textContent = "read more";

    const content = document.createElement("p");
    content.hidden = true;

    link.addEventListener("click", async () => {
      if (content.hidden) {
        const r = await fetch(`/api/tasks/${encodeURIComponent(name)}`);
        content.textContent = await r.text();
      }
      content.hidden = !content.hidden;
    });

    card.append(h3, link, content);
    tasksEl.appendChild(card);
  });
}

// Create a new task
createBtn.addEventListener("click", async () => {
  const title = titleInput.value.trim();
  const details = detailsInput.value;

  if (!title) return alert("Please enter a title");

  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, details }),
  });

  titleInput.value = "";
  detailsInput.value = "";
  loadTasks();
});

loadTasks();
async function getToken() {
  let status = localStorage.getItem("token");
  
  if (status) return status;

  let response = await fetch(`https://beacon-api-seven.vercel.app/api/auth/token`);
  let data = await response.json();
  
  localStorage.setItem("token", data.token);
  return data.token;
}

async function getEvents(token) {
  if (!token) return [];
  let response = await fetch(`https://beacon-api-seven.vercel.app/api/events?uuid=${token}`);
  let data = await response.json();
  return data;
}

function createEvent(token, event) {
  const data = {
    uuid: token,
    event: event
  }
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" })
  navigator.sendBeacon("https://beacon-api-seven.vercel.app/api/events", blob)
}

/**
 * Renders an array of items to the DOM (React .map() pattern in Vanilla JS)
 * @param {Array} items - Array of event objects from the server
 * @param {HTMLElement} container - Target container element
 */
function renderItems(items, container) {
  container.innerHTML = "";

  if (!items || items.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.textContent = "No hay eventos registrados";
    emptyState.classList.add("empty-state");
    container.appendChild(emptyState);
    return;
  }

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.event || item.name || JSON.stringify(item);
    
    if (item.createdAt) {
      const time = document.createElement("small");
      time.textContent = ` - ${new Date(item.createdAt).toLocaleString()}`;
      li.appendChild(time);
    }
    
    container.appendChild(li);
  });
}

const requestButton = document.getElementById("request_button");
const itemContainer = document.getElementById("item-container");

document.addEventListener('DOMContentLoaded', async () => {
  await getToken();
});

document.addEventListener('click', async (event) => {
  let token = await getToken();
  createEvent(token, "CLICK");
});

requestButton.onclick = async () => {
  let token = await getToken();
  let data = await getEvents(token);
  renderItems(data, itemContainer);
};

const STORAGE_KEY = "customWebsites";
function getFaviconUrl(url) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  } catch {
    return "";
  }
}
function loadWebsites() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const container = document.getElementById("tiles-container");
  container.innerHTML = "";
  data.forEach(({ title, url }, idx) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerHTML = `
      <button class="delete-btn" onclick="deleteWebsite(${idx})">×</button>
      <a href="${url}" target="_blank" rel="noopener">
        <div class="icon"><img src="${getFaviconUrl(url)}" alt="icon"></div>
        <div class="title">${title}</div>
      </a>`;
    container.appendChild(tile);
  });
}
function addWebsite() {
  const title = document.getElementById("site-title").value.trim();
  const url = document.getElementById("site-url").value.trim();
  if (!title || !url) return;
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  list.push({ title, url });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  document.getElementById("site-title").value = "";
  document.getElementById("site-url").value = "";
  loadWebsites();
}
function deleteWebsite(i) {
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  list.splice(i, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  loadWebsites();
}
window.addEventListener("DOMContentLoaded", loadWebsites);


// Sortable JS
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container'); // oder z. B. '#container'

    if (container) {
        new Sortable(container, {
            animation: 180,
            ghostClass: 'ghost',
            dragClass: 'dragging'
        });
    } else {
        console.error('SortableJS: .container wurde nicht gefunden.');
    }

    // Optional: Entfernen-Funktion für Delete-X Buttons
    const deleteButtons = document.querySelectorAll('.card-delete');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.parentElement.remove();
        });
    });
});

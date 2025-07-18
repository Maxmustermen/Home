const STORAGE_KEY = "customWebsites";

function getFaviconUrl(url) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  } catch (e) {
    return "";
  }
}

function loadWebsites() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const container = document.getElementById("tiles-container");
  container.innerHTML = "";

  data.forEach(({ title, url }, index) => {
    const tile = document.createElement("div");
    tile.className = "tile";

    tile.innerHTML = `
      <button class="delete-btn" onclick="deleteWebsite(${index})">🗑️</button>
      <a href="${url}" target="_blank">
        <div class="icon">
          <img src="${getFaviconUrl(url)}" alt="icon" />
        </div>
        <div class="title">${title}</div>
      </a>
    `;

    container.appendChild(tile);
  });
}

function addWebsite() {
  const titleInput = document.getElementById("site-title");
  const urlInput = document.getElementById("site-url");

  const title = titleInput.value.trim();
  const url = urlInput.value.trim();

  if (!title || !url) return;

  const websites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  websites.push({ title, url });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(websites));

  titleInput.value = "";
  urlInput.value = "";

  loadWebsites();
}

function deleteWebsite(index) {
  const websites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  websites.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(websites));
  loadWebsites();
}

window.addEventListener("DOMContentLoaded", loadWebsites);

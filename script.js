document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('cards-container');
  const addForm = document.getElementById('add-form');
  const titleInput = document.getElementById('title-input');
  const urlInput = document.getElementById('url-input');

  // SortableJS aktivieren
  new Sortable(container, {
    animation: 200,
    ghostClass: 'ghost',
  });

  // Hinzufügen neuer Karten
  addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();

    if (!title || !url) return;

    const domain = extractDomain(url);
    const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <button class="card-delete">×</button>
      <a href="${url}" target="_blank">
        <img src="${favicon}" alt="Favicon" class="icon" />
      </a>
      <div class="card-title">${title}</div>
    `;
    container.appendChild(card);

    titleInput.value = "";
    urlInput.value = "";
  });

  // Karten entfernen
  container.addEventListener('click', function (e) {
    if (e.target.classList.contains('card-delete')) {
      const card = e.target.closest('.card');
      card.remove();
    }
  });

  // Domain aus URL extrahieren
  function extractDomain(url) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      alert("Ungültige URL!");
      return '';
    }
  }
});

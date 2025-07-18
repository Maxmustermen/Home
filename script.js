document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('cards-container');
  const addForm = document.getElementById('add-form');
  const titleInput = document.getElementById('title-input');
  const urlInput = document.getElementById('url-input');

  // Drag & Drop mit SortableJS
  new Sortable(container, {
    animation: 200,
    ghostClass: 'ghost',
    dragClass: 'dragging'
  });

  // Löschen-Button Event Delegation
  container.addEventListener('click', function (e) {
    if (e.target.classList.contains('card-delete')) {
      const card = e.target.closest('.card');
      if (card) card.remove();
    }
  });

  // Karte hinzufügen (mit Favicon)
  addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();
    if (!title || !url) return;

    // Domain extrahieren für das Favicon (Google Service: www.google.com/s2/favicons)
    let domain;
    try {
      domain = (new URL(url)).hostname.replace(/^www\./, '');
    } catch {
      alert('Ungültige URL!');
      return;
    }
    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

    // Karte erzeugen
    const div = document.createElement('div');
    div.className = 'card';
    div.setAttribute('data-url', url);
    div.innerHTML = `
      <button class="card-delete" title="Entfernen">×</button>
      <a href="${url}" target="_blank" class="icon-link">
        <img class="icon" src="${faviconUrl}" alt="Favicon">
      </a>
      <div class="card-title">${title}</div>
    `;
    container.appendChild(div);

    // Felder zurücksetzen
    titleInput.value = '';
    urlInput.value = '';
  });
});

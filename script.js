document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');

  if (!container) {
    console.error('SortableJS: .container wurde nicht gefunden.');
    return;
  }

  // Init sortable
  new Sortable(container, {
    animation: 200,
    ghostClass: 'ghost',
    dragClass: 'dragging'
  });

  // Löschen-Buttons aktivieren
  container.addEventListener('click', function (e) {
    if (e.target.classList.contains('card-delete')) {
      const card = e.target.closest('.card');
      if (card) card.remove();
    }
  });
});

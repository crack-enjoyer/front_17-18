const noteInput = document.getElementById('note-input');
const addBtn = document.getElementById('add-btn');
const notesList = document.getElementById('notes-list');
const statusEl = document.getElementById('status');

// Показываем статус сети
function updateOnlineStatus() {
  if (navigator.onLine) {
    statusEl.style.display = 'none';
  } else {
    statusEl.style.display = 'block';
  }
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// Работа с localStorage
function loadNotes() {
  const data = localStorage.getItem('notes');
  return data ? JSON.parse(data) : [];
}

function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
  const notes = loadNotes();
  notesList.innerHTML = '';
  notes.forEach((text, idx) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    span.addEventListener('click', () => alert(text));

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Удалить';
    delBtn.addEventListener('click', () => {
      notes.splice(idx, 1);
      saveNotes(notes);
      renderNotes();
    });

    li.append(span, delBtn);
    notesList.append(li);
  });
}

addBtn.addEventListener('click', () => {
  const text = noteInput.value.trim();
  if (!text) return;
  const notes = loadNotes();
  notes.push(text);
  saveNotes(notes);
  noteInput.value = '';
  renderNotes();
});

// Инициализация
renderNotes();
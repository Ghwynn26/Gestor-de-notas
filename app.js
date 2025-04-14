document.addEventListener('DOMContentLoaded', () => {
    const noteText = document.getElementById('note-text');
    const categorySelect = document.getElementById('category-select');
    const addNoteBtn = document.getElementById('add-note');
    const exportNotesBtn = document.getElementById('export-notes');
    const notesList = document.getElementById('notes-list');
  
    // Cargar notas del almacenamiento local
    const loadNotes = () => {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notesList.innerHTML = ''; // Limpiar la lista
      notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');
        noteItem.innerHTML = `
          <p><strong>${note.category}:</strong> ${note.text}</p>
          <button data-index="${index}">Eliminar</button>
        `;
        notesList.appendChild(noteItem);
      });
    };
  
    // Añadir nueva nota con categoría
    const addNote = () => {
      const text = noteText.value.trim();
      const category = categorySelect.value;
      if (!text) return alert('La nota no puede estar vacía');
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.push({ text, category });
      localStorage.setItem('notes', JSON.stringify(notes));
      noteText.value = '';
      loadNotes();
    };
  
    // Eliminar una nota
    const deleteNote = (index) => {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      loadNotes();
    };
  
    // Exportar notas a un archivo de texto
    const exportNotes = () => {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      if (notes.length === 0) return alert('No hay notas para exportar');
      const content = notes.map(note => `${note.category}: ${note.text}`).join('\n');
      const blob = new Blob([content], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'notas.txt';
      a.click();
    };
  
    // Evento para añadir nota
    addNoteBtn.addEventListener('click', addNote);
  
    // Evento para eliminar nota
    notesList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const index = e.target.dataset.index;
        deleteNote(index);
      }
    });
  
    // Evento para exportar notas
    exportNotesBtn.addEventListener('click', exportNotes);
  
    // Cargar notas al iniciar
    loadNotes();
  });
  
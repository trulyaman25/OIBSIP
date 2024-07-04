document.addEventListener('DOMContentLoaded', function() {
    const noteContainer = document.getElementById('notes-container');
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('close-popup');
    const popupContent = document.getElementById('popup-content');

    loadNotes();

    addNoteBtn.addEventListener('click', function() {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            addNoteToStorage(noteText);
            addNoteToUI(noteText);
            noteInput.value = '';
        }
    });

    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => addNoteToUI(note));
    }

    function addNoteToStorage(noteText) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function addNoteToUI(noteText) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('col-md-4', 'mb-3');
        noteElement.innerHTML = `
            <div class="card">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <p class="card-text note-truncate">${noteText}</p>
                    <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" class="delete-note-btn"></lord-icon>
                </div>
            </div>
        `;

        noteElement.addEventListener('click', function() {
            showPopup(noteText);
        });

        noteContainer.appendChild(noteElement);
    }

    function showPopup(noteText) {
        modalOverlay.style.display = 'block';
        popup.style.display = 'block';
        popupContent.innerHTML = noteText;

        const deleteNoteBtn = document.getElementById('delete-note-btn');
        deleteNoteBtn.addEventListener('click', function() {
            deleteNoteFromStorage(noteText);
            deleteNoteFromUI(noteText);
            hidePopup();
        });
    }

    closePopupBtn.addEventListener('click', hidePopup);

    function hidePopup() {
        modalOverlay.style.display = 'none';
        popup.style.display = 'none';
    }

    function deleteNoteFromStorage(noteText) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note !== noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function deleteNoteFromUI(noteText) {
        const notes = Array.from(noteContainer.children);
        for (let note of notes) {
            if (note.querySelector('.card-text').textContent === noteText) {
                note.remove();
                break;
            }
        }
    }
});

// Selectors
const desc_box = document.getElementById('desc_box')
const add_btn = document.getElementById('add_note')
const card_container = document.querySelector('.card-container')
const clear_btn = document.getElementById('clear_note')

// Event Listeners
add_btn.addEventListener('click', addNote)
card_container.addEventListener('click', deleteNote)
document.addEventListener('DOMContentLoaded', updateDOM)
document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        addNote()
    }
})
clear_btn.addEventListener('click', clearNotes)

// *********** Functions *********

// Function to add note 
function addNote() {
    // Create card div
    const card_div = document.createElement('div')
    card_div.classList.add('card')
    card_div.style.width = '18rem'
    // Create card body
    const card_body = document.createElement('div')
    card_body.classList.add('card-body')
    card_div.appendChild(card_body)
    // Create card text
    const card_text = document.createElement('p')
    card_text.classList.add('card-text')
    card_text.innerHTML = desc_box.value
    card_div.appendChild(card_text)
    // Add notes to local storage
    saveNoteToLocalStorage(desc_box.value)
    // Create card delete icon / button
    const card_delete_btn = document.createElement('button')
    card_delete_btn.classList.add('btn-danger')
    // delete card styling
    card_delete_btn.style.background = '#dd0531'
    card_delete_btn.style.color = '#fff'
    card_delete_btn.style.padding = '.25rem'
    card_delete_btn.innerHTML = '<i class="fa-solid fa-trash"></i>'
    card_div.appendChild(card_delete_btn)
    // Append the card div in the cards container
    card_container.appendChild(card_div)

    desc_box.value = ''
}

// Function to delete note 
function deleteNote(e) {
    const note = e.target
    // console.log(note)
    if (note.classList[0] === 'btn-danger') {
        const note_card = note.parentNode
        note_card.classList.add('removeNote')
        removeNoteToLocalStorage(note)

        note_card.addEventListener('transitionend', () => {
            note_card.remove()
        })
    }
}

// Function add note to local storage 
function saveNoteToLocalStorage(note) {
    let notes

    if (localStorage.getItem('noteItem') === null) {
        notes = []
    }
    else {
        notes = JSON.parse(localStorage.getItem('noteItem'))
    }
    notes.push(note)
    localStorage.setItem('noteItem', JSON.stringify(notes))
}

// Function update the DOM from local storage 
function updateDOM() {
    let notes

    if (localStorage.getItem('noteItem') === null) {
        notes = []
    }
    else {
        notes = JSON.parse(localStorage.getItem('noteItem'))
    }

    notes.forEach(note => {
        const card_div = document.createElement('div')
        card_div.classList.add('card')
        card_div.style.width = '18rem'

        const card_body = document.createElement('div')
        card_body.classList.add('card-body')
        card_div.appendChild(card_body)

        const card_text = document.createElement('p')
        card_text.classList.add('card-text')
        card_text.innerHTML = note
        card_div.appendChild(card_text)

        const card_delete_btn = document.createElement('button')
        card_delete_btn.classList.add('btn-danger')

        card_delete_btn.style.background = '#dd0531'
        card_delete_btn.style.color = '#fff'
        card_delete_btn.style.padding = '.25rem'
        card_delete_btn.innerHTML = '<i class="fa-solid fa-trash"></i>'
        card_div.appendChild(card_delete_btn)

        card_container.appendChild(card_div)
    })
}

// Function to delete note from local storage
function removeNoteToLocalStorage(note) {
    let notes

    if (localStorage.getItem('noteItem') === null) {
        notes = []
    }
    else {
        notes = JSON.parse(localStorage.getItem('noteItem'))
    }
    const noteIndex = note.children[0].innerHTML
    notes.splice(notes.indexOf(noteIndex), 1)
    localStorage.setItem('noteItem', JSON.stringify(notes))
}

// Function to clear the notes 
function clearNotes() {
    card_container.innerHTML = ''
    localStorage.clear()
}

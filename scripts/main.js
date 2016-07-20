var notes = [],
	$addNote = $('#add-note'),  // add $ in front of variable to indicate that it is an dom object. instructor ki vani.
	addNoteForm = $addNote.find('form'),
	notesContainer = $('.note-container'),
	note_title = addNoteForm.find('input[name="note_title"]'),
	note_content = addNoteForm.find('textarea[name="note_content"]');

function appendSingleNote(data) {
	var content = data.content, title = data.title, id = data.id;
	var html = '<div class="note" id="' + (id ? id : '') + '">' + 
					'<button id="remove-button" onclick="removeNoteForm(' + id + ')"></button>' +
                    '<h3 class="note-title">' + title + '</h3>'+
                    '<p class="note-content" >'+ content + '</p>'+
                '</div>';
    notesContainer.append(html);
}

function storeNode(data) {
	notes.push(data);
	window.localStorage.setItem('notes', JSON.stringify(notes));
	appendSingleNote(data);
}

function init() {
	if (!!window.localStorage.getItem('notes')) {
		notes = JSON.parse(window.localStorage.getItem('notes'));
	} else {
		notes = [];
	}
	var i;
	for (i = 0; i < notes.length; ++i) {
		appendSingleNote(notes[i]);
	}
}

addNoteForm.on('submit', function(e) {
	e.preventDefault();
	var data = {title: note_title.val(), content: note_content.val(), id: new Date().getTime()};
	storeNode(data)
});

function removeNoteForm(id) {
	notes = notes.filter(function(e) {
		return e.id != id;
	});
	window.localStorage.setItem('notes', JSON.stringify(notes));
	var parent = document.getElementsByClassName('note-container')[0];
	var child = document.getElementById(id);
	parent.removeChild(child);
}

init();
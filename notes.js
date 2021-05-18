const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green.inverse('Your notes'));

    notes.forEach(element => {
        console.log(element.title);
    });
}

const addNote = (title, body) => {

    const notes = loadNotes();

    // using filter
    // const duplicateNotes = notes.filter(f => f.title === title);

    // using find
    const duplicateNote = notes.find(f => f.title === title);

    // debugger;

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNote(notes);
        console.log('New noted added');
    } else {
        console.log('Note title taken');
    }

};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataString = dataBuffer.toString();
        return JSON.parse(dataString);
        
    } catch {
        console.log('Flag1')
        return [];
    }
};

const saveNote = (notes) => {

    try {
        const dataJSON = JSON.stringify(notes);
        fs.writeFileSync('notes.json', dataJSON);
    } catch {}
};

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    saveNote(notesToKeep);
    return saveNote.length !== notes.length ?  true : false;
};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(n => n.title === title);
    if (!note) {
        console.log('Note not found with title ', title);
    } else {
        console.log('Title ', note.title);
        console.log('body ', note.body);
    }
}


module.exports = {
    addNote: addNote,
    loadNotes: loadNotes,
    removeNote: removeNote,
    getNotes: getNotes,
    readNote: readNote
};
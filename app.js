const validator = require('validator');
const notesLib = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');


// Setting up the version
yargs.version('1.1.0');

// Creating Add command

yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        description: {
            describe: 'Note description',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesLib.addNote(argv.title, argv.description);
    }
});

// Creating Remove command

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Title of the note that should be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const res = notesLib.removeNote(argv.title);
        if (res) {
            console.log(chalk.green('Note removed with title - ', argv.title));
        } else {
            console.log(chalk.red('No note removed'));
        }
    }
});

// Creating Read command

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Find a note with a specific title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notesLib.readNote(argv.title);
    }
});

// Creating List command

yargs.command({
    command: 'list',
    describe: 'Lists note',
    handler() {
        notesLib.getNotes()
    }
});

yargs.parse();

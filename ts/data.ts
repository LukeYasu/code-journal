const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

const $entryTitle = document.querySelector('#entry-title');
const $photoURL = document.querySelector('#photo-url');
if (!$entryTitle) throw new Error('$entryTitle query failed');
if (!$photoURL) throw new Error('$photoURL query failed');
console.log('aaaaaa');

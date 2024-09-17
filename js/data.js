'use strict';
/* exported writeData, readData */
const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
function writeData() {
  let formEntryArrayJSON = JSON.stringify(formEntryArray);
  localStorage.setItem('formEntryArrayJSON-storage', formEntryArrayJSON);
}
function readData() {
  const formEntryArrayStorage = localStorage.getItem('formEntryArray-storage');
  if (formEntryArrayStorage !== null) {
    return JSON.parse(formEntryArrayStorage);
  } else {
    return [];
  }
}

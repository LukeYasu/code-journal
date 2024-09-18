'use strict';
const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
function writeData() {
  const dataJSON = JSON.stringify(data.entries);
  localStorage.setItem('data-storage', dataJSON);
}
function readData() {
  const dataStorage = localStorage.getItem('data-storage');
  if (typeof dataStorage === typeof '' && dataStorage !== null) {
    return JSON.parse(dataStorage);
  } else {
    return [];
  }
}

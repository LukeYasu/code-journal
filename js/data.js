'use strict';
const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
function writeData() {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
  console.log('dataJSON', dataJSON);
}
function readData() {
  const dataStorage = localStorage.getItem('data-storage');
  if (typeof dataStorage === typeof '' && dataStorage !== null) {
    return JSON.parse(dataStorage);
  } else {
    return {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
    };
  }
}

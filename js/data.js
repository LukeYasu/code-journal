'use strict';
const data = {
  view: 'entry-form',
  entries: readData(),
  editing: null,
  nextEntryId: 1,
};
function writeData() {
  const dataJSON = JSON.stringify(data.entries);
  const dataViewJSON = JSON.stringify(data.view);
  localStorage.setItem('data-view', dataViewJSON);
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
function readViewData() {
  const dataView = localStorage.getItem('data-view');
  if (dataView !== null) {
    return JSON.parse(dataView);
  } else {
    return '';
  }
}

/* exported data, writeForm, readForm */
const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function writeData(): void {
  const formEntryArrayJSON = JSON.stringify(formEntryArray);
  localStorage.setItem('formEntryArrayJSON-storage', formEntryArrayJSON);
}
function readData(): string[] {
  const formEntryArrayStorage = localStorage.getItem('formEntryArray-storage');
  if (formEntryArrayStorage !== null) {
    return JSON.parse(formEntryArrayStorage);
  } else {
    return [];
  }
}

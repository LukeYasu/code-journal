/* exported data, writeData, readData */
interface DataInterface {
  view: string;
  entries: CodeJournalForm[];
  editing: null;
  nextEntryId: number;
}
let data: DataInterface = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

data = readData();

function writeData(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}

function readData(): DataInterface {
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

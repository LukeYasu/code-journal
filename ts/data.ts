/* exported data, writeData, readData */
interface DataInterface {
  view: string;
  entries: CodeJournalForm[];
  editing: null;
  nextEntryId: number;
}
const data: DataInterface = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function writeData(): void {
  const dataJSON = JSON.stringify(data.entries);
  localStorage.setItem('data-storage', dataJSON);
}

function readData(): string[] {
  const dataStorage = localStorage.getItem('data-storage');
  if (typeof dataStorage === typeof '' && dataStorage !== null) {
    return JSON.parse(dataStorage);
  } else {
    return [];
  }
}

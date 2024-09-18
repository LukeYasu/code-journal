/* exported data, writeData, readData */
interface dataInterface {
  view: string;
  entries: codeJournalForm[];
  editing: null;
  nextEntryId: number;
}
const data: dataInterface = {
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

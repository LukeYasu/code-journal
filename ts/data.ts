/* exported data, writeData, readData, readViewData */
interface DataInterface {
  view: string;
  entries: CodeJournalForm[];
  editing: null;
  nextEntryId: number;
}
const data: DataInterface = {
  view: 'entry-form',
  entries: readData(),
  editing: null,
  nextEntryId: 1,
};

function writeData(): void {
  const dataJSON = JSON.stringify(data.entries);
  const dataViewJSON = JSON.stringify(data.view);
  localStorage.setItem('data-view', dataViewJSON);
  localStorage.setItem('data-storage', dataJSON);
}

function readData(): CodeJournalForm[] {
  const dataStorage = localStorage.getItem('data-storage');
  if (typeof dataStorage === typeof '' && dataStorage !== null) {
    return JSON.parse(dataStorage);
  } else {
    return [];
  }
}
function readViewData(): string {
  const dataView = localStorage.getItem('data-view');
  if (dataView !== null) {
    return JSON.parse(dataView);
  } else {
    return '';
  }
}

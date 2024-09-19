/* global data, writeData */
const $entryTitle = document.querySelector('#entry-title') as HTMLFormElement;
const $photoURL = document.querySelector('#photo-url') as HTMLFormElement;
const $entryNotes = document.querySelector('#entry-notes') as HTMLFormElement;
const $img = document.querySelector('img');
const $form = document.querySelector('form') as HTMLFormElement;
const $ul = document.querySelector('.past-entries') as HTMLUListElement;
const $liNoEntries = document.querySelector('.no-entries') as HTMLElement;
const $divEntryForm = document.querySelector('.entry-form') as HTMLDivElement;
const $divEntries = document.querySelector('#entries') as HTMLDivElement;
const $headerBackground = document.querySelector(
  '.header-background',
) as HTMLHeadingElement;
const $entryHeader = document.querySelector(
  '.entry-header',
) as HTMLHeadingElement;
if (!$entryTitle) throw new Error('$entryTitle query failed');
if (!$photoURL) throw new Error('$photoURL query failed');
if (!$entryNotes) throw new Error('$entryNotes query failed');
if (!$img) throw new Error('$img query failed');
if (!$form) throw new Error('$form query failed');
if (!$ul) throw new Error('$ul query failed');
if (!$liNoEntries) throw new Error('$linoEntries query failed');
if (!$divEntryForm) throw new Error('$divEntryForm query failed');
if (!$divEntries) throw new Error('$divEntries query failed');
if (!$headerBackground) throw new Error('$entriesAnchor query failed');
if (!$entryHeader) throw new Error('$entryHeader query failed');

interface CodeJournalForm {
  entryId: number;
  title: string;
  photoURL: string;
  notes: string;
}

$form.addEventListener('submit', handleSubmit);
$photoURL.addEventListener('input', handleInput);

function handleInput(): void {
  const photoSRC = $photoURL.value;
  $img?.setAttribute('src', photoSRC);
}

function handleSubmit(event: SubmitEvent): void {
  event.preventDefault();
  if (data.editing !== null) {
    data.entries[data.editing.entryId] = data.editing;

    data.entries[data.editing.entryId].entryId = data.editing.entryId;

    console.log(
      'data.entries[data.editing.entryId].entryId',
      data.entries[data.editing.entryId].entryId,
    );
    renderEntry(data.entries[data.editing.entryId]);
  }
  const newFormEntry: CodeJournalForm = {
    entryId: data.nextEntryId,
    title: $entryTitle.value,
    photoURL: $photoURL.value,
    notes: $entryNotes.value,
  };
  data.nextEntryId += 1;
  data.entries.unshift(newFormEntry);

  toggleNoEntries();
  $img?.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form?.reset();
  writeData();
  $ul.prepend(renderEntry(newFormEntry));
  viewSwap('entries');
}
const storedData = readData();
Object.assign(data, storedData);

document.addEventListener('DOMContentLoaded', () => {
  if (data.entries.length > 0) {
    for (let i = 0; i < data.entries.length; i++) {
      $ul.append(renderEntry(data.entries[i]));
    }
  }
  toggleNoEntries();
  viewSwap(data.view);
});
console.log(data.entries);
function renderEntry(entry: CodeJournalForm): HTMLLIElement {
  const $list = document.createElement('li');
  $list.setAttribute('data-entry-id', `${entry.entryId}`);
  const $divRow = document.createElement('div');
  $divRow.className = 'row';
  const $divColumnHalfPhoto = document.createElement('div');
  $divColumnHalfPhoto.className = 'column-half entry-photo';
  const $divColumnHalfText = document.createElement('div');
  $divColumnHalfText.className = 'column-half entry-text';
  const $entryImg = document.createElement('img');
  $entryImg.src = entry.photoURL;
  const $entryHeader = document.createElement('h3');
  $entryHeader.textContent = entry.title;
  const $editPencil = document.createElement('i');
  $editPencil.className = 'fa-solid fa-pencil';
  const $p = document.createElement('p');
  $p.textContent = entry.notes;

  $list.append($divRow);
  $divRow.append($divColumnHalfPhoto);
  $divColumnHalfPhoto.append($entryImg);
  $divRow.append($divColumnHalfText);
  $divColumnHalfText.append($entryHeader);
  $entryHeader.append($editPencil);
  $divColumnHalfText.append($p);
  return $list;
}

function toggleNoEntries(): void {
  if (data.entries.length > 0) {
    $liNoEntries.className = 'hidden';
  } else {
    $liNoEntries.className = '';
  }
}

function viewSwap(viewChoice: string): void {
  if (viewChoice === 'entries') {
    data.view = 'entries';
    $divEntryForm.className = 'hidden';
    $divEntries.className = 'not-hidden';
    writeData();
  } else if (viewChoice === 'entry-form') {
    data.view = 'entry-form';
    $divEntries.className = 'hidden';
    $divEntryForm.className = 'not-hidden';
    writeData();
  }
}

$headerBackground.addEventListener('click', (event: Event): void => {
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.matches('.entries-anchor') && data.view === 'entry-form') {
    viewSwap('entries');
  }
});

$divEntries.addEventListener('click', (event: Event): void => {
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.matches('.new-entry-button') && data.view === 'entries') {
    viewSwap('entry-form');
  }
});

$ul.addEventListener('click', (event: Event): void => {
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.matches('.fa-pencil')) {
    const $li = eventTarget.closest('li');
    const entryId = $li?.getAttribute('data-entry-id');
    data.editing =
      data.entries[Math.abs(Number(entryId) - data.entries.length)];
    viewSwap('entry-form');
    $img.src = data.editing.photoURL;
    $photoURL.setAttribute('value', data.editing.photoURL);
    $entryTitle.setAttribute('value', data.editing.title);
    $entryNotes.textContent = data.editing.notes;
    $entryHeader.textContent = 'Edit Entry';
  }
});

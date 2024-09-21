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
const $deleteButton = document.querySelector('.delete-button') as HTMLElement;
const $openModal = document.querySelector('.open-modal') as HTMLDialogElement;
const $closeModal = document.querySelector('.close-modal') as HTMLDialogElement;
const $dialog = document.querySelector('dialog') as HTMLDialogElement;
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
if (!$deleteButton) throw new Error('$deleteButton query failed');
if (!$openModal) throw new Error('$openModal query failed');
if (!$closeModal) throw new Error('$closeModal query failed');
if (!$dialog) throw new Error('$dialog query failed');
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
    const entryIndex = data.entries.findIndex(
      (entry) => entry.entryId === data.editing!.entryId,
    );
    const editedData = {
      entryId: data.editing!.entryId,
      title: $entryTitle.value,
      photoURL: $photoURL.value,
      notes: $entryNotes.value,
    };

    data.entries[entryIndex] = editedData;

    const $li = $ul.querySelector(`li[data-entry-id="${editedData.entryId}"]`);
    $li?.replaceWith(renderEntry(editedData));

    if ($img) $img.src = 'images/placeholder-image-square.jpg';
    $form.reset();
    data.editing = null;
    $entryHeader.textContent = 'New Entry';

    viewSwap('entries');
    writeData();
  } else {
    const newFormEntry: CodeJournalForm = {
      entryId: data.nextEntryId,
      title: $entryTitle.value,
      photoURL: $photoURL.value,
      notes: $entryNotes.value,
    };
    data.nextEntryId += 1;
    data.entries.unshift(newFormEntry);

    toggleNoEntries();
    if ($img) $img.src = 'images/placeholder-image-square.jpg';
    $form?.reset();
    writeData();
    $ul.prepend(renderEntry(newFormEntry));
    viewSwap('entries');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (data.entries.length > 0) {
    for (let i = 0; i < data.entries.length; i++) {
      $ul.append(renderEntry(data.entries[i]));
    }
  }
  toggleNoEntries();
  viewSwap(data.view);
});
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
  if (eventTarget.matches('.entries-anchor')) {
    viewSwap('entries');
    if ($img) $img.src = 'images/placeholder-image-square.jpg';
    $form.reset();
    data.editing = null;
    $entryHeader.textContent = 'New Entry';
  }
});

$divEntries.addEventListener('click', (event: Event): void => {
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.matches('.new-entry-button') && data.view === 'entries') {
    viewSwap('entry-form');
    $deleteButton.className = 'display-hidden delete-button';
  }
});

$ul.addEventListener('click', (event: Event): void => {
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.matches('.fa-pencil')) {
    const $li = eventTarget.closest('li');
    const entryId = $li?.getAttribute('data-entry-id');
    const entryIdIndex = data.entries.findIndex(
      (entry) => entry.entryId === Number(entryId),
    );
    data.editing = data.entries[entryIdIndex];
    viewSwap('entry-form');
    $img.src = data.editing.photoURL;
    $photoURL.value = data.editing.photoURL;
    $entryTitle.value = data.editing.title;
    $entryNotes.value = data.editing.notes;
    $entryHeader.textContent = 'Edit Entry';
    $deleteButton.className = 'delete-button';
  }
});

$deleteButton.addEventListener('click', () => {
  $dialog.showModal();
});
$dialog.addEventListener('click', (event: Event) => {
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.matches('.delete-entry')) {
    const deleteIndex = data.entries.findIndex(
      (entry) => entry.entryId === data.editing?.entryId,
    );
    data.entries.splice(deleteIndex, 1);
    const $li = document.querySelector(
      `li[data-entry-id="${data.editing?.entryId}"]`,
    );
    if ($li) $li.remove();

    toggleNoEntries();
    viewSwap('entries');
    data.editing = null;
    $entryHeader.textContent = 'New Entry';
    writeData();
  }
  $dialog.close();
});

/* global writeData */
const $entryTitle = document.querySelector('#entry-title') as HTMLFormElement;
const $photoURL = document.querySelector('#photo-url') as HTMLFormElement;
const $entryNotes = document.querySelector('#entry-notes') as HTMLFormElement;
const $userInputs = document.querySelector('.user-inputs') as HTMLFormElement;
const $img = document.querySelector('img');
const $saveButton = document.querySelector('.save-button');
if (!$entryTitle) throw new Error('$entryTitle query failed');
if (!$photoURL) throw new Error('$photoURL query failed');
if (!$entryNotes) throw new Error('$entryNotes query failed');
if (!$userInputs) throw new Error('$userInputs query failed');
if (!$img) throw new Error('$img query failed');
if (!$saveButton) throw new Error('$saveButton query failed');

$saveButton.addEventListener('click', handleClick);
$photoURL.addEventListener('change', handleChange);

function handleChange(): void {
  const photoSRC = $photoURL.value;
  $img?.setAttribute('src', photoSRC);
}

interface codeJournalForm {
  entryId: number;
  nextEntryId: number;
  title: string;
  photoURL: string;
  notes: string;
}

let nextEntryIdNum = 1;
const formEntryArray: unknown[] = [];

function handleClick(event: Event): void {
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.matches('button')) {
    event.preventDefault();

    const newFormEntry: codeJournalForm = {
      entryId: nextEntryIdNum,
      nextEntryId: nextEntryIdNum + 1,
      title: $entryTitle.value,
      photoURL: $photoURL.value,
      notes: $entryNotes.value,
    };
    nextEntryIdNum = newFormEntry.entryId + 1;
    formEntryArray.unshift(newFormEntry);
    writeData();

    $img?.setAttribute('src', 'images/placeholder-image-square.jpg');
    $userInputs.reset();
    $entryNotes.value = '';
  }
}

/* global data, writeData */
const $entryTitle = document.querySelector('#entry-title') as HTMLFormElement;
const $photoURL = document.querySelector('#photo-url') as HTMLFormElement;
const $entryNotes = document.querySelector('#entry-notes') as HTMLFormElement;
const $img = document.querySelector('img');
const $form = document.querySelector('form') as HTMLFormElement;
if (!$entryTitle) throw new Error('$entryTitle query failed');
if (!$photoURL) throw new Error('$photoURL query failed');
if (!$entryNotes) throw new Error('$entryNotes query failed');
if (!$img) throw new Error('$img query failed');
if (!$form) throw new Error('$form query failed');

$form.addEventListener('submit', handleSubmit);
$photoURL.addEventListener('input', handleInput);

function handleInput(): void {
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

let nextEntryIdNum = data.nextEntryId;

function handleSubmit(event: SubmitEvent): void {
  event.preventDefault();
  const newFormEntry: codeJournalForm = {
    entryId: nextEntryIdNum,
    nextEntryId: nextEntryIdNum + 1,
    title: $entryTitle.value,
    photoURL: $photoURL.value,
    notes: $entryNotes.value,
  };
  nextEntryIdNum = newFormEntry.entryId + 1;
  data.entries.unshift(newFormEntry);

  $img?.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form?.reset();
  writeData();
}

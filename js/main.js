'use strict';
/* global writeData */
const $entryTitle = document.querySelector('#entry-title');
const $photoURL = document.querySelector('#photo-url');
const $entryNotes = document.querySelector('#entry-notes');
const $userInputs = document.querySelector('.user-inputs');
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
function handleChange() {
  const photoSRC = $photoURL.value;
  $img?.setAttribute('src', photoSRC);
}
let nextEntryIdNum = 1;
const formEntryArray = [];
function handleClick(event) {
  const eventTarget = event.target;
  if (eventTarget.matches('button')) {
    event.preventDefault();
    const newFormEntry = {
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

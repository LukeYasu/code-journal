'use strict';
/* global data, writeData, readViewData */
const $entryTitle = document.querySelector('#entry-title');
const $photoURL = document.querySelector('#photo-url');
const $entryNotes = document.querySelector('#entry-notes');
const $img = document.querySelector('img');
const $form = document.querySelector('form');
const $ul = document.querySelector('.past-entries');
const $liNoEntries = document.querySelector('.no-entries');
const $divEntryForm = document.querySelector('#entry-form');
const $divEntries = document.querySelector('#entries');
const $headerBackground = document.querySelector('.header-background');
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
$form.addEventListener('submit', handleSubmit);
$photoURL.addEventListener('input', handleInput);
function handleInput() {
  const photoSRC = $photoURL.value;
  $img?.setAttribute('src', photoSRC);
}
function handleSubmit(event) {
  event.preventDefault();
  const newFormEntry = {
    entryId: data.nextEntryId,
    title: $entryTitle.value,
    photoURL: $photoURL.value,
    notes: $entryNotes.value,
  };
  data.nextEntryId += 1;
  data.entries.unshift(newFormEntry);
  if (data.entries.length > 0) {
    toggleNoEntries();
  }
  window.location.reload();
  $img?.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form?.reset();
  writeData();
  renderEntry(data.entries[data.nextEntryId]);
  viewSwap('entries');
}
document.addEventListener('DOMContentLoaded', () => {
  const storedData = readData();
  if (storedData !== undefined) {
    for (let i = 0; i < storedData.length; i++) {
      $ul.append(renderEntry(storedData[i]));
    }
  }
  if (data.entries.length > 0) {
    toggleNoEntries();
  }
  viewSwap(readViewData());
});
function renderEntry(entry) {
  const $list = document.createElement('li');
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
  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  $ul.append($list);
  $list.append($divRow);
  $divRow.append($divColumnHalfPhoto);
  $divColumnHalfPhoto.append($entryImg);
  $divRow.append($divColumnHalfText);
  $divColumnHalfText.append($entryHeader);
  $divColumnHalfText.append($p);
  return $list;
}
function toggleNoEntries() {
  $liNoEntries.className = 'hidden';
}
function viewSwap(viewChoice) {
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
$headerBackground.addEventListener('click', (event) => {
  const eventTarget = event.target;
  if (eventTarget.matches('.entries-anchor') && data.view === 'entry-form') {
    viewSwap('entries');
  }
});
$divEntries.addEventListener('click', (event) => {
  const eventTarget = event.target;
  if (eventTarget.matches('.new-entry-button') && data.view === 'entries') {
    viewSwap('entry-form');
  }
});

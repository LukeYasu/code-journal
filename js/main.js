'use strict';
/* global data, writeData */
const $entryTitle = document.querySelector('#entry-title');
const $photoURL = document.querySelector('#photo-url');
const $entryNotes = document.querySelector('#entry-notes');
const $img = document.querySelector('img');
const $form = document.querySelector('form');
const $ul = document.querySelector('.past-entries');
const $liNoEntries = document.querySelector('.no-entries');
const $divEntryForm = document.querySelector('.entry-form');
const $divEntries = document.querySelector('#entries');
const $headerBackground = document.querySelector('.header-background');
const $entryHeader = document.querySelector('.entry-header');
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
$form.addEventListener('submit', handleSubmit);
$photoURL.addEventListener('input', handleInput);
function handleInput() {
  const photoSRC = $photoURL.value;
  $img?.setAttribute('src', photoSRC);
}
function handleSubmit(event) {
  event.preventDefault();
  if (data.editing !== null) {
    const entryIndex = data.entries.findIndex(
      (entry) => entry.entryId === data.editing.entryId,
    );
    data.entries[entryIndex] = {
      entryId: data.editing.entryId,
      title: $entryTitle.value,
      photoURL: $photoURL.value,
      notes: $entryNotes.value,
    };
    $form.reset();
    $img.src = 'images/placeholder-image-square.jpg';
    $entryNotes.textContent = '';
    data.editing = null;
    viewSwap('entries');
    $entryHeader.textContent = 'New Entry';
    clearList();
    for (const entry of data.entries) {
      $ul.append(renderEntry(entry));
    }
    console.log('running after edit');
  } else {
    const newFormEntry = {
      entryId: data.nextEntryId,
      title: $entryTitle.value,
      photoURL: $photoURL.value,
      notes: $entryNotes.value,
    };
    data.nextEntryId += 1;
    data.entries.unshift(newFormEntry);
    toggleNoEntries();
    $img.src = 'images/placeholder-image-square.jpg';
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
function renderEntry(entry) {
  console.log(entry.entryId);
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
function toggleNoEntries() {
  if (data.entries.length > 0) {
    $liNoEntries.className = 'hidden';
  } else {
    $liNoEntries.className = '';
  }
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
$ul.addEventListener('click', (event) => {
  const eventTarget = event.target;
  if (eventTarget.matches('.fa-pencil')) {
    const $li = eventTarget.closest('li');
    const entryId = $li?.getAttribute('data-entry-id');
    data.editing =
      data.entries[Math.abs(Number(entryId) - data.entries.length)];
    viewSwap('entry-form');
    $img.src = data.editing.photoURL;
    $photoURL.value = data.editing.photoURL;
    $entryTitle.value = data.editing.title;
    $entryNotes.textContent = data.editing.notes;
    $entryHeader.textContent = 'Edit Entry';
  }
});
function clearList() {
  while ($ul.firstChild) {
    $ul.removeChild($ul.firstChild);
  }
}

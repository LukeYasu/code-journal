'use strict';
/* global data, writeData */
const $entryTitle = document.querySelector('#entry-title');
const $photoURL = document.querySelector('#photo-url');
const $entryNotes = document.querySelector('#entry-notes');
const $img = document.querySelector('img');
const $form = document.querySelector('form');
if (!$entryTitle) throw new Error('$entryTitle query failed');
if (!$photoURL) throw new Error('$photoURL query failed');
if (!$entryNotes) throw new Error('$entryNotes query failed');
if (!$img) throw new Error('$img query failed');
if (!$form) throw new Error('$form query failed');
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
    nextEntryId: data.nextEntryId + 1,
    title: $entryTitle.value,
    photoURL: $photoURL.value,
    notes: $entryNotes.value,
  };
  data.nextEntryId += 1;
  data.entries.unshift(newFormEntry);
  $img?.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form?.reset();
  writeData();
}

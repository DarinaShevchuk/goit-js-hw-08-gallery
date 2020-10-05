import images from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const closeModal = document.querySelector('.lightbox__button');
const modalEl = document.querySelector('.lightbox');
const overlayEl = document.querySelector('.lightbox__overlay');
const modalImgEL = document.querySelector('.lightbox__image');

const cardsCollection = createImageGallery(images);
galleryContainer.insertAdjacentHTML('beforeend', cardsCollection);

galleryContainer.addEventListener('click', onOpenModal);
closeModal.addEventListener('click', onCloseModal);
overlayEl.addEventListener('click', onCloseModalOverlay);

function createImageGallery(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function onOpenModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  document.addEventListener('keydown', onCloseModalEsc);
  modalEl.classList.add('is-open');

  modalImgEL.src = event.target.dataset.source;
  modalImgEL.alt = event.target.alt;
}

function onCloseModal() {
  document.removeEventListener('keydown', onCloseModalEsc);
  modalEl.classList.remove('is-open');
  modalImgEL.src = '';
}

function onCloseModalOverlay(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onCloseModalEsc(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

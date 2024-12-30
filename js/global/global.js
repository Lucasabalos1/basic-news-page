const modalBackground = document.querySelector('.modal-background-cont');

const openModalBtn = document.querySelector('.open-modal-cont');

const closeModalBtn = document.getElementById('close-btn');

const toggleMenu = () => {
    modalBackground.classList.toggle('show-modal')
    document.body.style.overflow = (modalBackground.classList.contains("show-modal")) ? "hidden": "scroll";
}

openModalBtn.addEventListener('click', toggleMenu);

closeModalBtn.addEventListener('click', toggleMenu);
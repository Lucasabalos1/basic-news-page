const cookiesModal = document.querySelector('.cookies-modal-background-cont');
const acceptBtn = document.getElementById('accept-btn')
const denyBtn = document.getElementById('deny-btn');

const togleCookiesModal = () => {
    cookiesModal.classList.toggle('show-cookies')
    document.body.style.overflow = (cookiesModal.classList.contains('show-cookies')) ? 'hidden' : 'scroll';
}

const createCookie = (cookieName, duration) => {
    document.cookie = `${cookieName};expires=${duration}`
}

const obtainCookie = (cookieName) => {
    let cookies = document.cookie;
    cookies = cookies.split(";")
    for (let index = 0; index < cookies.length; index++) {
        let cookie = cookies[index].trim();
        if (cookie.startsWith(cookieName)) {
            return cookie.split("=")[1]
        }
    }
    return null;
}

document.addEventListener('DOMContentLoaded', () => { 
    const cookieValue = obtainCookie("usingCookies")
    
    if (!cookieValue) {
        setTimeout(togleCookiesModal, 2000);
    }else{
        cookiesModal.style.display = 'none';
    }

    acceptBtn.addEventListener('click', () => {
        createCookie('usingCookies=yes', 30)
        togleCookiesModal()
    })

    denyBtn.addEventListener('click', () => {
        createCookie('usingCookies=no', 30)
        togleCookiesModal()
    })
})
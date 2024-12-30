const noticeContainer = document.querySelector('.swiper-wrapper');

const moreNoticeContainer = document.querySelector('.notices-cont');

let newsCont = 0; 

const loadPrincipalNews = async () => {
  const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=4cca0f0af7aa43489b58577b937c2794';

  const resp = await fetch(url);

  const data = await resp.json();

  const result = data.articles;

  let fragment = document.createDocumentFragment()
  for (let index = 0; index < 4; index++) {
    const swiperSlide = document.createElement('DIV');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.innerHTML = `
                      <img src="${result[index].urlToImage}" alt="principal-notices">
                      <div class="info-swiper-cont">
                        <div class="title-notice-cont">
                          <span class="title-notice">${result[index].title}</span>
                        </div>
                        <div class="description-notice-cont">
                          <p>${result[index].description}</p>
                        </div>
                      </div>
    `
    fragment.appendChild(swiperSlide);
  }
  noticeContainer.appendChild(fragment);

  const swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000, 
    }
});
}


const loadMoreNews = (entries, obs) => {
  const entry = entries[0];
  if (entry.isIntersecting) {
    loadNews(3);
    obs.unobserve(entry.target); 
  }
}

const observer = new IntersectionObserver(loadMoreNews);


const loadNews = async(num) => {
  const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=4cca0f0af7aa43489b58577b937c2794';
  
  const resp = await fetch(url);

  const data = await resp.json();

  const result = data.articles;

  let documentFragment = document.createDocumentFragment();

  for (let index = 0; index < num; index++) {
    if (result[newsCont] != undefined) {
      const notice = document.createElement('DIV');

      notice.classList.add('notice');

      notice.innerHTML = `
        <img src="${result[newsCont].urlToImage}" alt="">
        <div class="notice-cont-background">
          <div class="title-more-notice-cont">
            <span class="title-more-notice">${result[newsCont].title}</span>
          </div>
        </div>
      
      `

      documentFragment.appendChild(notice);

      if (index === num - 1) {
        observer.observe(notice);
      }
      newsCont++;
    }else{
      const noMore = document.createElement('DIV');
      noMore.classList.add('no-more-cont')
      const message = document.createElement('H3')
      message.classList.add('no-more-message');
      message.textContent= 'No more notices'
      noMore.appendChild(message)
      documentFragment.appendChild(noMore)
      observer.disconnect()
      break
    }
  }
  moreNoticeContainer.appendChild(documentFragment);
}


document.addEventListener("DOMContentLoaded", () => {
  loadPrincipalNews();
  loadNews(3);
});




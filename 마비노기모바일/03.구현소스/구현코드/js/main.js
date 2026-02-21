// 메인 페이지 JS /////////////////

// const gnbMenu = document.querySelector(".gnb-menu");

// // 2. 상단영역 메뉴박스 - 마우스오버시 서브메뉴 보이기
// gnbMenu.addEventListener("mouseover", function (e) {
//   document.querySelector("#top-area").classList.add("on");
// });
// // 3. 상단영역 메뉴박스 - 마우스아웃시 서브메뉴 숨기기
// gnbMenu.addEventListener("mouseout", function (e) {
//   document.querySelector("#top-area").classList.remove("on");
// });

/****************** 인트로 이벤트 ******************/
const slideTarget = document.querySelector(".event-banner-part");

const slideBG = [
  "url(./image/event1bg.png)",
  "url(./image/event2bg.png)",
  "url(./image/event3bg.png)",
  "url(./image/event1bg.png)",
];
const swiper = new Swiper(".event-banner-group", {
  pagination: {
    el: ".event-banner-group .swiper-pagination",
    clickable: true,
  },
  loop: true,
  watchSlidesProgress: true,
  slidesPerView: 3,
});

swiper.on("slideChange", function () {
  console.log("slide changed", swiper.realIndex);
  slideTarget.style.backgroundImage = slideBG[swiper.realIndex];

  // 모든 슬라이드에 on 클래스 제거
  swiper.slides.forEach((el) => {
    el.classList.remove("on", "aft", "bfo");
  });

  // 현재 활성화된 슬라이드에만 'on' 클래스 추가
  // 활성화된 슬라이드는 첫번째 순번이니까 우리는 두번째 슬라이드(중앙)
  // 여기에 on을 넣을거니까 활성화된 슬라이드 순번 +1임!
  swiper.slides[swiper.activeIndex + 1].classList.add("on");
  swiper.slides[swiper.activeIndex].classList.add("bfo");
  swiper.slides[swiper.activeIndex + 2].classList.add("aft");
});

/****************** 사이드 메뉴 ******************/
// 페이지 로드 시 GNB 메뉴를 사이드로 복사
document.addEventListener("DOMContentLoaded", function () {
  const gnbMenu = document.querySelector(".gnb-menu > ul");
  const sidebarNav = document.querySelector(".sidebar-nav");
  const sidebarFooter = document.querySelector(".sidebar-footer");

  if (gnbMenu && sidebarNav && sidebarFooter) {
    // GNB 메뉴를 복사해서 사이드에 넣기
    const clonedMenu = gnbMenu.cloneNode(true);
    sidebarNav.appendChild(clonedMenu);

    // 푸터를 nav 안으로 이동 (스크롤 가능하게)
    sidebarNav.appendChild(sidebarFooter);
  }
});

const mobileMenuBtn = document.querySelector(".mobile-menu");
const sidebarMenu = document.querySelector(".sidebar-menu");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const sidebarClose = document.querySelector(".sidebar-close");
let scrollPosition = 0;

// 햄버거 버튼 클릭
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", function () {
    mobileMenuBtn.classList.toggle("active");
    sidebarMenu.classList.toggle("active");
    sidebarOverlay.classList.toggle("active");

    // body에 클래스 추가/제거로 스크롤 방지
    if (sidebarMenu.classList.contains("active")) {
      // 현재 스크롤 위치 저장
      scrollPosition = window.pageYOffset;
      document.body.classList.add("sidebar-open");

      // 모든 하위 메뉴 닫기
      closeAllSubmenus();
    } else {
      document.body.classList.remove("sidebar-open");
      // 저장된 스크롤 위치로 복원
      window.scrollTo(0, scrollPosition);
    }
  });
}

// 모든 하위 메뉴 닫기 함수
function closeAllSubmenus() {
  document.querySelectorAll(".sidebar-nav .smenu.active").forEach((menu) => {
    menu.classList.remove("active");
  });
}

// 닫기 버튼 클릭
if (sidebarClose) {
  sidebarClose.addEventListener("click", closeSidebar);
}

// 오버레이 클릭
if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", closeSidebar);
}

// 사이드 닫기 함수
function closeSidebar() {
  mobileMenuBtn.classList.remove("active");
  sidebarMenu.classList.remove("active");
  sidebarOverlay.classList.remove("active");
  document.body.classList.remove("sidebar-open");
  // 저장된 스크롤 위치로 복원
  window.scrollTo(0, scrollPosition);

  // 모든 하위 메뉴 닫기
  closeAllSubmenus();
}

// 화면 크기 변경 시 사이드 자동 닫기
window.addEventListener("resize", function () {
  if (window.innerWidth > 1280) {
    closeSidebar();
  }
});

// 사이드 메뉴 아코디언 (이벤트 위임 방식)
document.addEventListener("click", function (e) {
  // 사이드 내의 메인 메뉴 링크를 클릭했을 때
  if (e.target.closest(".sidebar-nav > ul > li > a")) {
    e.preventDefault();

    const link = e.target.closest(".sidebar-nav > ul > li > a");
    const parentLi = link.parentElement;
    const submenu = parentLi.querySelector(".smenu");

    if (submenu) {
      // 다른 열린 서브메뉴 닫기
      document.querySelectorAll(".sidebar-nav .smenu").forEach((menu) => {
        if (menu !== submenu) {
          menu.classList.remove("active");
        }
      });

      // 현재 서브메뉴 토글
      submenu.classList.toggle("active");
    }
  }
});

/****************** 메인 배너 ******************/
const mainBanner = new Swiper(".banner-group", {
  loop: true, // 무한 반복
  autoplay: {
    delay: 3000, // 3초마다 자동 넘김
    disableOnInteraction: false, // 사용자가 조작해도 자동 재생 유지
    pauseOnMouseEnter: true, // 마우스 올리면 일시정지
  },
  speed: 800, // 슬라이드 전환 속도 0.8초
  pagination: {
    el: ".banner-group .swiper-pagination",
    clickable: true,
  },
  resizeObserver: false, // resize 감지 비활성화 (흔들림 방지)
  observer: false, // DOM 변경 감지 비활성화 (흔들림 방지)
  observeParents: false, // 부모 요소 변경 감지 비활성화 (흔들림 방지)
  on: {
    slideChangeTransitionStart: function () {
      // 슬라이드 전환 시작될 때 실행
      const activeSlide = this.slides[this.activeIndex]; // 현재 활성화된 슬라이드
      if (activeSlide) {
        // 텍스트 요소들 선택 (.banner-type, .title p, .sub-title p)
        const textElements = activeSlide.querySelectorAll(
          ".banner-type, .title p, .sub-title p",
        );
        textElements.forEach((el) => {
          el.style.animation = "none"; // 기존 애니메이션 제거
          setTimeout(() => {
            el.style.animation = ""; // CSS text-ani 재적용
          }, 10); // 10ms 후 재시작 (리플로우 강제 실행)
        });
      }
    },
  },
});

// 화면 크기 변경 시 배너 흔들림 방지
let resizeTimeout;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout); // 이전 타이머 제거
  resizeTimeout = setTimeout(function () {
    mainBanner.update(); // 300ms 후 스와이퍼 업데이트
  }, 300); // 디바운스: 연속된 resize 이벤트 중 마지막만 실행
});

/****************** 에린소식 타입 버튼 클릭 설정 ******************/
const btnNews = document.querySelectorAll(".news-type button");
const newsList = document.querySelectorAll(".news-list");

btnNews.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    // 클릭된 버튼의 data-type 가져오기
    const clickedType = this.getAttribute("data-type");
    console.log("클릭된 타입:", clickedType);

    // 모든 버튼의 on 클래스 제거
    btnNews.forEach((btn) => {
      btn.classList.remove("on");
    });

    // 클릭된 버튼에 on 클래스 추가
    this.classList.add("on");

    // 모든 뉴스 리스트 숨김
    newsList.forEach((list) => {
      list.classList.remove("show");
    });

    // 해당하는 data-type의 뉴스 리스트만 표시
    const targetList = document.querySelector(
      `.news-list[data-type="${clickedType}"]`,
    );
    console.log("타겟 리스트:", targetList);

    if (targetList) {
      targetList.classList.add("show");
    }
  });
});

/****************** 커뮤니티 하위메뉴 + 버튼 클릭 설정 ******************/
const communityButtons = document.querySelectorAll(".community-type button");
const communityLists = document.querySelectorAll(
  ".community-part .community-list",
);

/* 기본 상태 : 길드모집 */
if (communityLists.length > 0) {
  communityLists[0].classList.add("show");
}

communityButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    const targetType = this.getAttribute("data-type");

    // 모든 버튼 비활성화
    communityButtons.forEach((btn) => btn.classList.remove("on"));

    // 클릭한 버튼 활성화
    this.classList.add("on");

    // 모든 리스트 숨기기
    communityLists.forEach((list) => {
      list.classList.remove("show");
    });

    // 해당 타입 리스트만 표시
    const targetList = document.querySelector(
      `.community-part .community-list[data-type="${targetType}"]`,
    );
    if (targetList) {
      targetList.classList.add("show");
    }
  });
});

/****************** 클래스 아이콘 이미지 오버시 색 변경 ******************/
// 1280px 이상에서만 적용
document.querySelectorAll(".class-list a").forEach((item) => {
  item.addEventListener("mouseenter", function (e) {
    // 현재 화면 크기가 1280px 이상일 때만 효과 적용
    if (window.innerWidth > 1280) {
      e.preventDefault();
      let cimg = item.querySelector("img");
      let cname = cimg.getAttribute("src");
      item
        .querySelector("img")
        .setAttribute("src", cname.replace("icon", "hover"));
      cimg.style.transform = "scale(1.4)";
    }
  });
  item.addEventListener("mouseleave", function (e) {
    // 현재 화면 크기가 1280px 이상일 때만 효과 적용
    if (window.innerWidth > 1280) {
      e.preventDefault();
      let cimg = item.querySelector("img");
      let cname = cimg.getAttribute("src");
      item
        .querySelector("img")
        .setAttribute("src", cname.replace("hover", "icon"));
      cimg.style.transform = "scale(1)";
    }
  });
});

/****************** 공식영상 스와이퍼 ******************/
const videoSwiper = new Swiper(".video-group", {
  slidesPerView: "auto",
  spaceBetween: 31,
  pagination: {
    el: ".video-title-group .swiper-pagination",
    clickable: true,
  },

  // 화면 크기별 스와이퍼 슬라이드 개수
  // Responsive breakpoints
  // breakpoints: {
  //   100: {
  //     slidesPerView: 1,
  //     spaceBetween: "10vw",
  //     slidesPerGroup: 1,
  //   },
  //   1100: {
  //     slidesPerView: 2,
  //     spaceBetween: "30vw",
  //     slidesPerGroup: 2,
  //   },
  //   1500: {
  //     slidesPerView: 3,
  //     spaceBetween: "40vw",
  //     slidesPerGroup: 3,
  //   },
  // },
});

/****************** youTube 모달 기능 ******************/
const videoModal = document.getElementById("videoModal");
const modalClose = document.querySelector(".modal-close");
const youtubePlayer = document.getElementById("youtubePlayer");
const videoSlides = document.querySelectorAll(".video-group .swiper-slide");
const videoTitle = document.querySelector(".video-title");

// 비디오 슬라이드 클릭 이벤트
videoSlides.forEach((slide) => {
  slide.addEventListener("click", function () {
    const videoId = this.getAttribute("data-video-id");
    const titleText = this.querySelector(".text span").textContent;

    if (videoId && videoId !== 'Youtubeë¹„ë""ì˜¤ID') {
      // autoplay=1 제거 (자동재생 방지)
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      youtubePlayer.src = embedUrl;
      videoTitle.textContent = titleText;
      videoModal.classList.add("active");
      // body 스크롤 방지
      document.body.style.overflow = "hidden";
    }
  });
});

// 모달 닫기 버튼
if (modalClose) {
  modalClose.addEventListener("click", function (e) {
    e.preventDefault(); // 기본 동작 방지
    e.stopPropagation(); // 이벤트 전파 방지
    closeVideoModal();
  });
}

// 모달 배경 클릭시 닫기
videoModal.addEventListener("click", function (e) {
  if (e.target === videoModal) {
    closeVideoModal();
  }
});

// ESC 키로 닫기
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && videoModal.classList.contains("active")) {
    closeVideoModal();
  }
});

// 모달 닫기 함수
function closeVideoModal() {
  videoModal.classList.remove("active");
  youtubePlayer.src = ""; // 영상 정지 및 초기화
  // body 스크롤 복원
  document.body.style.overflow = "";
}

/****************** 가이드 스와이퍼 ******************/
const guideSwiper = new Swiper(".guide-group", {
  slidesPerView: "auto",
  spaceBetween: 80,
  pagination: {
    el: ".guide-title-group .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    // 800px 이하일 때
    100: {
      spaceBetween: 30,
    },
    // 800px 초과일 때
    801: {
      spaceBetween: 80,
    },
  },

  // 화면 크기별 스와이퍼 슬라이드 개수
  // Responsive breakpoints
  // breakpoints: {
  //   // 600: {
  //   //   slidesPerView: 2,

  //   //   slidesPerGroup: 2,
  //   // },
  //   // 950: {
  //   //   slidesPerView: 3,

  //   //   slidesPerGroup: 3,
  //   // },
  //   // 1200: {
  //   //   slidesPerView: 4,

  //   //   slidesPerGroup: 4,
  //   // },
  //   // 1360: {
  //   //   slidesPerView: 5,
  //   //   slidesPerGroup: 5,
  //   // },
  //   1280: {
  //     slidesPerView: "auto",
  //     spaceBetween: 80,
  //   },
  // },
});

/****************** 사이드 스크롤 버튼 ******************/
const scrollBtn = document.querySelector(".scroll-btn");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const scrollBottomBtn = document.getElementById("scrollBottomBtn");

if (scrollBtn && scrollTopBtn) {
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 150) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  // 위로 가기
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 아래로 가기
  scrollBottomBtn.addEventListener("click", function () {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });
}

/****************** 사이드 광고 배너  ******************/
// 1. 쿠키 함수들
function setCookie(name, value, hours) {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cookieName = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

// 2. 배너 닫기 함수
function closeBannerToday() {
  console.log("closeBannerToday 함수 실행됨");
  const banner = document.querySelector(".float-banner");

  console.log("배너 요소:", banner);

  if (banner) {
    banner.style.display = "none";
    console.log("배너 숨김 완료");

    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );
    const hoursUntilMidnight = (tomorrow - now) / (1000 * 60 * 60);

    setCookie("hideBanner", "true", hoursUntilMidnight);
    console.log("쿠키 설정 완료");
  } else {
    console.log("배너를 찾을 수 없습니다!");
  }
}

// 3. 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  const floatBanner = document.querySelector(".float-banner");

  if (!floatBanner) {
    console.log("배너 요소를 찾을 수 없습니다.");
    return;
  }

  // 쿠키 확인하여 배너 숨김 처리
  if (getCookie("hideBanner") === "true") {
    floatBanner.style.display = "none";
    console.log("쿠키에 의해 배너 숨김");
    return;
  }

  // 배너 설정
  const initialTopPercent = 45;
  const stickyTop = 120; // 고정될 위치 120px
  let bannerInitialTop = 0;
  let currentTop = 0;
  let targetTop = 0;
  let ticking = false;

  function updateBannerInitialPosition() {
    bannerInitialTop = (window.innerHeight * initialTopPercent) / 100;
    currentTop = bannerInitialTop;
  }

  updateBannerInitialPosition();
  window.addEventListener("resize", updateBannerInitialPosition);

  // 부드러운 애니메이션 함수
  function smoothUpdate() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 목표 위치 계산
    if (scrollTop > bannerInitialTop - stickyTop) {
      targetTop = stickyTop;
    } else {
      targetTop = bannerInitialTop - scrollTop;
    }

    // 부드럽게 이동 (easing)
    currentTop += (targetTop - currentTop) * 0.1;

    // 위치 적용
    floatBanner.style.top = currentTop + "px";

    // 목표에 거의 도달하면 정확한 값으로 설정
    if (Math.abs(targetTop - currentTop) > 0.5) {
      requestAnimationFrame(smoothUpdate);
    } else {
      floatBanner.style.top = targetTop + "px";
      currentTop = targetTop;
      ticking = false;
    }
  }

  // 스크롤 이벤트
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(smoothUpdate);
    }
  });
});

// 말머리 데이터 (카테고리별)
const prefixData = {
  all: [""],
  notice: ["안내", "점검", "완료"],
  event: ["진행중", "지난이벤트", "결과안내"],
  update: [
    "콘텐츠&퀘스트",
    "아이템",
    "패션 장비",
    "편의성",
    "클래스&스킬",
    "성장",
    "커뮤니티&길드",
    "기타",
  ],
  note: ["개발자노트", "CM노트"],
  issue: ["확인중인현상"],
  guide: ["시작하기", "퀘스트", "성장", "던전", "사냥터", "시스템", "콘텐츠"],
  free: ["전사", "궁수", "마법사", "힐러", "음유시인", "도적"],
  class: ["전사", "궁수", "마법사", "힐러", "음유시인", "도적"],
  strategy: ["클래스", "퀘스트", "성장", "던전", "전투필드", "기타"],
  qna: ["질문", "답변"],
  friend: ["친구 모집"],
  guild: ["길드 모집"],
  art: ["아트"],
  writing: ["작문"],
  screenshot: ["스크린샷"],
  video: ["영상"],
  image: ["이미지"],
  music: ["음악"],
  goods: ["디지털 굿즈"],
  creator: ["안내", "이벤트"],
  faq: [
    "FAQ",
    "광고 문자 수신 동의 철회",
    "설치 / 실행",
    "계정",
    "결제",
    "이벤트",
    "게임이용",
    "크리에이터즈",
  ],
  policy: ["정책"],
};

// 드롭다운 기능
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown");
  const categoryDropdown = document.querySelector(".type-all");
  const prefixDropdown = document.querySelector(".type-category");
  const prefixMenu = document.getElementById("prefix-menu");

  // 말머리 업데이트 함수
  function updatePrefixMenu(category) {
    const prefixes = prefixData[category] || [];
    prefixMenu.innerHTML = "";

    // "말머리 선택" 기본 옵션 추가
    const defaultLi = document.createElement("li");
    const defaultA = document.createElement("a");
    defaultA.href = "#";
    defaultA.textContent = "말머리 선택";
    defaultA.dataset.prefix = "all";
    defaultLi.appendChild(defaultA);
    prefixMenu.appendChild(defaultLi);

    // 클릭 이벤트
    defaultA.addEventListener("click", function (e) {
      e.preventDefault();
      prefixDropdown.querySelector(".selected-text").textContent =
        this.textContent;
      prefixDropdown.classList.remove("active");
    });

    // 카테고리별 말머리 추가
    prefixes.forEach((prefix) => {
      if (prefix === "") return; // 빈 값 스킵

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = prefix;
      a.dataset.prefix = prefix;
      li.appendChild(a);
      prefixMenu.appendChild(li);

      // 클릭 이벤트
      a.addEventListener("click", function (e) {
        e.preventDefault();
        prefixDropdown.querySelector(".selected-text").textContent =
          this.textContent;
        prefixDropdown.classList.remove("active");
      });
    });
  }

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".dropdown-btn");
    const menu = dropdown.querySelector(".dropdown-menu");
    const menuItems = dropdown.querySelectorAll(".dropdown-menu a");

    // 버튼 클릭시 드롭다운 토글
    btn.addEventListener("click", function (e) {
      e.stopPropagation();

      // 다른 드롭다운 닫기
      dropdowns.forEach((other) => {
        if (other !== dropdown) {
          other.classList.remove("active");
        }
      });

      // 현재 드롭다운 토글
      dropdown.classList.toggle("active");
    });

    // 메뉴 아이템 클릭시
    menuItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const text = this.textContent;
        btn.querySelector(".selected-text").textContent = text;
        dropdown.classList.remove("active");

        // 카테고리 선택시 말머리 업데이트
        if (dropdown === categoryDropdown) {
          const category = this.dataset.category;
          if (category) {
            updatePrefixMenu(category);
            prefixDropdown.querySelector(".selected-text").textContent =
              "말머리 선택";
          }
        }
      });
    });
  });

  // 외부 클릭시 드롭다운 닫기
  document.addEventListener("click", function () {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  });

  // 초기 말머리 설정
  updatePrefixMenu("all");
});
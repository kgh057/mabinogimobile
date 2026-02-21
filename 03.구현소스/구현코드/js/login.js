// 🆕 탭 전환 기능
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-type button");
  const loginInput = document.querySelector(".login-input");
  const loginFind = document.querySelector(".login-find");
  const otherLogin = document.querySelector(".other-login");
  const otpContent = document.querySelector(".otp-content");
  const qrContent = document.querySelector(".qr-content");

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      // 모든 탭 비활성화
      tabButtons.forEach((btn) => {
        btn.parentElement.classList.remove("nexon");
      });

      // 클릭한 탭 활성화
      this.parentElement.classList.add("nexon");

      // 모든 컨텐츠 숨기기
      loginInput.classList.add("hidden");
      loginFind.classList.add("hidden");
      otherLogin.classList.add("hidden");
      otpContent.classList.remove("active");
      qrContent.classList.remove("active");

      // 선택된 탭에 따라 컨텐츠 표시
      if (index === 0) {
        // 넥슨ID 로그인
        loginInput.classList.remove("hidden");
        loginFind.classList.remove("hidden");
        otherLogin.classList.remove("hidden");
      } else if (index === 1) {
        // 일회용 로그인
        otpContent.classList.add("active");
      } else if (index === 2) {
        // QR 로그인
        qrContent.classList.add("active");
      }
    });
  });
});

// 로그인 버튼 클릭 이벤트
document
  .querySelector(".login-btn button")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const userIdInput = document.getElementById("user-id");
    const userPwInput = document.getElementById("user-pw");
    const idError = document.getElementById("id-error");
    const pwError = document.getElementById("pw-error");

    const userId = userIdInput.value.trim();
    const userPw = userPwInput.value.trim();

    // 에러 초기화
    idError.textContent = "";
    idError.classList.remove("show");
    pwError.textContent = "";
    pwError.classList.remove("show");
    userIdInput.classList.remove("error");
    userPwInput.classList.remove("error");

    // 유효성 검사
    if (!userId) {
      idError.textContent = "넥슨ID (아이디 또는 이메일)를 입력해주세요.";
      idError.classList.add("show");
      userIdInput.classList.add("error");
      userIdInput.focus();
      return;
    }

    if (!userPw) {
      pwError.textContent = "비밀번호를 입력해주세요.";
      pwError.classList.add("show");
      userPwInput.classList.add("error");
      userPwInput.focus();
      return;
    }

    // 여기에 실제 로그인 처리 로직을 추가하세요
    console.log("로그인 시도:", userId);
  });

// Enter 키로 로그인
document.getElementById("user-pw").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.querySelector(".login-btn button").click();
  }
});

// 입력 시 에러 메시지 제거
document.getElementById("user-id").addEventListener("input", function () {
  const idError = document.getElementById("id-error");
  idError.classList.remove("show");
  this.classList.remove("error");
});

document.getElementById("user-pw").addEventListener("input", function () {
  const pwError = document.getElementById("pw-error");
  pwError.classList.remove("show");
  this.classList.remove("error");
});

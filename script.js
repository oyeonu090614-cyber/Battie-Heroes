// Firebase 초기화
const firebaseConfig = {
    apiKey: "AIzaSyBmySw6nUx09DnQrBs2eAEgXcZl2Y3deaI",
    authDomain: "battle-herose.firebaseapp.com",
    projectId: "battle-herose",
    storageBucket: "battle-herose.firebasestorage.app",
    messagingSenderId: "342535104562",
    appId: "1:342535104562:web:d3490c9be942691706742b",
    measurementId: "G-YLNHRFF8P4"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const analytics = firebase.analytics();

// DOM이 로드된 후 실행
window.addEventListener('load', () => {
    // 화면 요소들
    const mainMenuScreen = document.getElementById('main-menu-screen');
    const loadingScreen1 = document.getElementById('loading-screen-1');
    const loadingScreen2 = document.getElementById('loading-screen-2');
    const loginScreen = document.getElementById('login-screen');
    const gameScreen = document.getElementById('game-screen');

    // 버튼 요소들
    const gameStartBtn = document.getElementById('game-start-btn');
    const loginBtn = document.getElementById('login-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const backToMenuBtn = document.getElementById('back-to-menu');
    const logoutBtn = document.getElementById('logout-btn');

    console.log('버튼 요소들:', gameStartBtn, loginBtn, settingsBtn, backToMenuBtn, logoutBtn);

    // 화면 전환 함수
    function showScreen(screenToShow) {
        // 모든 화면 숨기기
        mainMenuScreen.classList.add('hidden');
        loadingScreen1.classList.add('hidden');
        loadingScreen2.classList.add('hidden');
        loginScreen.classList.add('hidden');
        gameScreen.classList.add('hidden');

        // 선택한 화면 보이기
        screenToShow.classList.remove('hidden');
    }

    // 메인 메뉴 버튼들
    gameStartBtn.addEventListener('click', () => {
        showScreen(loadingScreen1);

        // 3초 후 로그인 화면으로 이동
        setTimeout(() => {
            showScreen(loginScreen);
        }, 3000);
    });

    loginBtn.addEventListener('click', () => {
        showScreen(loginScreen);
    });

    settingsBtn.addEventListener('click', () => {
        alert('설정 기능은 아직 구현 중입니다!');
    });

    // 메뉴로 돌아가기 버튼
    backToMenuBtn.addEventListener('click', () => {
        showScreen(mainMenuScreen);
    });

    // Google 로그인 버튼
    const googleLoginBtn = document.getElementById('google-login-btn');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            try {
                const result = await auth.signInWithPopup(provider);
                const user = result.user;
                console.log('로그인 성공:', user);
            } catch (error) {
                console.error('로그인 실패:', error);
                alert('로그인에 실패했습니다: ' + error.message);
            }
        });
    }

    // Firebase 인증 상태 감지
    auth.onAuthStateChanged((user) => {
        if (user) {
            // 로그인 상태
            console.log('로그인된 사용자:', user);
            document.getElementById('display-username').textContent = user.displayName || '플레이어';

            // 사용자 데이터 로드 (Firebase에서 가져오거나 초기화)
            const userData = {
                level: 1,
                gold: 0,
                diamonds: 100,
                energy: 100
            };
            document.getElementById('display-level').textContent = userData.level;
            document.getElementById('display-gold').textContent = userData.gold;
            document.getElementById('display-diamonds').textContent = userData.diamonds;
            document.getElementById('display-energy').textContent = userData.energy;

            // 로딩 화면 후 게임 화면으로 이동
            showScreen(loadingScreen2);
            setTimeout(() => {
                showScreen(gameScreen);
            }, 2000);
        } else {
            // 로그아웃 상태
            console.log('로그아웃됨');
            showScreen(loginScreen);
        }
    });

    // 로그아웃
    logoutBtn.addEventListener('click', async () => {
        try {
            await auth.signOut();
            console.log('로그아웃 성공');
        } catch (error) {
            console.error('로그아웃 실패:', error);
            alert('로그아웃에 실패했습니다: ' + error.message);
        }
    });

    // 메뉴 버튼들 (현재는 경고만 표시)
    const menuBtns = document.querySelectorAll('.menu-btn');
    menuBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('이 기능은 아직 구현 중입니다!');
        });
    });

    // 하단 메뉴 버튼들
    const menuIcons = document.querySelectorAll('.menu-icon');
    menuIcons.forEach(btn => {
        btn.addEventListener('click', () => {
            const menuType = btn.getAttribute('data-menu');
            alert(`${menuType} 메뉴는 아직 구현 중입니다!`);
        });
    });
});
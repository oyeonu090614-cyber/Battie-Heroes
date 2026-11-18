const { createApp } = Vue;

createApp({
    data() {
        return {
            // 인증 관련
            isLoggedIn: false,
            isLoginMode: true,
            username: '',
            password: '',
            confirmPassword: '',
            
            // 게임 상태
            currentScreen: 'menu',
            myCharacters: [],
            pulledCharacter: null,
            diamonds: 0,
            showStarterSelection: false,
            selectedItem: null,
            tickets: 0,
            totalPulls: 0,
            mailbox: [],
            
            // 아이템 데이터
            items: [
                { id: 1, name: '⚔️ 기본 검', type: '무기', price: 50, power: 5, rank: '일반' },
                { id: 2, name: '🛡️ 기본 방패', type: '방어구', price: 50, power: 5, rank: '일반' },
                { id: 3, name: '💊 체력 포션', type: '소모품', price: 20, power: 0, rank: '일반' },
                { id: 4, name: '⚔️ 희귀 검', type: '무기', price: 150, power: 15, rank: '희귀' },
                { id: 5, name: '🛡️ 희귀 방패', type: '방어구', price: 150, power: 15, rank: '희귀' },
                { id: 6, name: '⚔️ 에픽 검', type: '무기', price: 300, power: 30, rank: '에픽' },
                { id: 7, name: '🛡️ 에픽 방패', type: '방어구', price: 300, power: 30, rank: '에픽' }
            ],
            
            // 펫 데이터
            pets: {
                일반: [
                    { id: 1, name: '설표', type: '지원형', power: 3, emoji: '🐕' },
                    { id: 2, name: '미니 드래곤', type: '공격형', power: 3, emoji: '🐉' },
                    { id: 3, name: '루미', type: '지원형', power: 3, emoji: '✨' },
                    { id: 4, name: '그리폰', type: '방어형', power: 3, emoji: '🦅' },
                    { id: 5, name: '쿠로', type: '공격형', power: 3, emoji: '�' },
                    { id: 6, name: '아이스 폭스', type: '공격형', power: 3, emoji: '🦊' },
                    { id: 7, name: '판다', type: '방어형', power: 3, emoji: '🐼' },
                    { id: 8, name: '호크', type: '공격형', power: 3, emoji: '🦅' },
                    { id: 9, name: '젤리', type: '지원형', power: 3, emoji: '🟢' },
                    { id: 10, name: '스노우 페어리', type: '지원형', power: 3, emoji: '❄️' },
                    { id: 11, name: '리오', type: '공격형', power: 3, emoji: '�' },
                    { id: 12, name: '문나', type: '지원형', power: 3, emoji: '🌙' },
                    { id: 13, name: '토르', type: '공격형', power: 3, emoji: '⚡' },
                    { id: 14, name: '세라피나', type: '지원형', power: 3, emoji: '👼' },
                    { id: 15, name: '코기', type: '지원형', power: 3, emoji: '🐕' }
                ],
                희귀: [
                    { id: 1, name: '프레온', type: '방어형', power: 5, emoji: '🐺' },
                    { id: 2, name: '블레이즈', type: '공격형', power: 5, emoji: '🔥' },
                    { id: 3, name: '루미엘', type: '지원형', power: 5, emoji: '✨' },
                    { id: 4, name: '가이아', type: '방어형', power: 5, emoji: '�' },
                    { id: 5, name: '루나', type: '지원형', power: 5, emoji: '🌙' },
                    { id: 6, name: '모찌', type: '지원형', power: 5, emoji: '🐰' },
                    { id: 7, name: '그리폰', type: '방어형', power: 5, emoji: '🦅' },
                    { id: 8, name: '아이스피', type: '공격형', power: 5, emoji: '❄️' },
                    { id: 9, name: '설화', type: '지원형', power: 5, emoji: '�' },
                    { id: 10, name: '대나무', type: '방어형', power: 5, emoji: '🐼' },
                    { id: 11, name: '아쿠아', type: '지원형', power: 5, emoji: '🌊' },
                    { id: 12, name: '나이트', type: '공격형', power: 5, emoji: '🌑' },
                    { id: 13, name: '솔라', type: '방어형', power: 5, emoji: '☀️' }
                ],
                에픽: [
                    { id: 1, name: '스카이 드래곤', type: '공격형', power: 8, emoji: '🐉' },
                    { id: 2, name: '나이트 블레이즈', type: '공격형', power: 8, emoji: '🔥' },
                    { id: 3, name: '스톤 골렘', type: '방어형', power: 8, emoji: '🗿' },
                    { id: 4, name: '볼레이징 피닉스', type: '공격형', power: 8, emoji: '🔥' },
                    { id: 5, name: '세이지 캣', type: '지원형', power: 8, emoji: '🐱' },
                    { id: 6, name: '바다거북 크라챈', type: '방어형', power: 8, emoji: '🐢' },
                    { id: 7, name: '에인션트 그리핀', type: '지원형', power: 8, emoji: '�' },
                    { id: 8, name: '여우령', type: '공격형', power: 8, emoji: '🦊' },
                    { id: 9, name: '메카 드로그', type: '공격형', power: 8, emoji: '🤖' },
                    { id: 10, name: '엘프리니', type: '지원형', power: 8, emoji: '🧝' }
                ],
                전설: [
                    { id: 1, name: '바람의 용신 룬', type: '공격형', power: 12, emoji: '🐉' },
                    { id: 2, name: '지옥의 마신 카이로스', type: '공격형', power: 12, emoji: '👹' },
                    { id: 3, name: '대지의 수호자 테라스', type: '방어형', power: 12, emoji: '🗿' },
                    { id: 4, name: '달빛의 여왕 세레나', type: '지원형', power: 12, emoji: '�' },
                    { id: 5, name: '불멸의 화신 피닉스', type: '공격형', power: 12, emoji: '🔥' },
                    { id: 6, name: '심해의 수호자 아쿠아', type: '방어형', power: 12, emoji: '🌊' },
                    { id: 7, name: '숲의 정령 엘리나', type: '지원형', power: 12, emoji: '🧚' }
                ],
                신화: [
                    { id: 1, name: '태양의 제왕 루미엘', type: '공격형', power: 15, emoji: '☀️' },
                    { id: 2, name: '달의 지배자 세레나스', type: '공격형', power: 15, emoji: '🌙' },
                    { id: 3, name: '대지의 정령 엘리시아', type: '지원형', power: 15, emoji: '🌿' }
                ],
                초월: [
                    { id: 1, name: '시간의 지배자 크로노스', type: '공격형', power: 20, emoji: '⏰' },
                    { id: 2, name: '공간의 여왕 아우라', type: '지원형', power: 20, emoji: '🌌' },
                    { id: 3, name: '창조의 신 아르테미스', type: '방어형', power: 20, emoji: '🌟' }
                ]
            },
            myPets: [],
            
            // 전투 관련
            battleResult: null,
            isFighting: false,
            
            // 시작 캐릭터 선택용
            starterCharacters: [
                { id: 'male', name: '남자 병사', image: '초반에 주는 일반 병사.png', type: '딜러' },
                { id: 'female', name: '여자 병사', image: '초반 일반 병사 2.png', type: '딜러' }
            ],
            
            // 뽑기용 일반 병사 데이터
            generalSoldiers: {
                힐러: [
                    { id: 1, name: '세라', emoji: '💚' },
                    { id: 2, name: '릴리아', emoji: '💚' },
                    { id: 3, name: '에린', emoji: '💚' },
                    { id: 4, name: '리안', emoji: '💚' },
                    { id: 5, name: '노아', emoji: '💚' }
                ],
                딜러: [
                    { id: 6, name: '카엘', emoji: '⚔️' },
                    { id: 7, name: '세라핀', emoji: '⚔️' },
                    { id: 8, name: '루인', emoji: '⚔️' },
                    { id: 9, name: '제나', emoji: '⚔️' },
                    { id: 10, name: '브랜', emoji: '⚔️' }
                ],
                탱커: [
                    { id: 11, name: '디온', emoji: '🛡️' },
                    { id: 12, name: '알렌', emoji: '🛡️' },
                    { id: 13, name: '바르그', emoji: '🛡️' },
                    { id: 14, name: '헨리', emoji: '🛡️' },
                    { id: 15, name: '루나', emoji: '🛡️' }
                ]
            },
            
            // 희귀 병사 데이터 (13명)
            rareSoldiers: {
                힐러: [
                    { id: 1, name: '아델린', emoji: '💚' },
                    { id: 2, name: '미레아', emoji: '💚' },
                    { id: 3, name: '엘로디', emoji: '💚' },
                    { id: 4, name: '로제타', emoji: '💚' }
                ],
                딜러: [
                    { id: 5, name: '카이든', emoji: '⚔️' },
                    { id: 6, name: '레온하르트', emoji: '⚔️' },
                    { id: 7, name: '아론', emoji: '⚔️' },
                    { id: 8, name: '베르칸', emoji: '⚔️' },
                    { id: 9, name: '이그니스', emoji: '⚔️' }
                ],
                탱커: [
                    { id: 10, name: '가르온', emoji: '🛡️' },
                    { id: 11, name: '테오도르', emoji: '🛡️' },
                    { id: 12, name: '막시온', emoji: '🛡️' },
                    { id: 13, name: '로데릭', emoji: '🛡️' }
                ]
            },
            
            // 에픽 병사 데이터 (10명)
            epicSoldiers: {
                힐러: [
                    { id: 1, name: '세레나', emoji: '💙' },
                    { id: 2, name: '엘리시아', emoji: '💙' },
                    { id: 3, name: '노바', emoji: '💙' }
                ],
                딜러: [
                    { id: 4, name: '카이론', emoji: '❤️' },
                    { id: 5, name: '세르반', emoji: '❤️' },
                    { id: 6, name: '이그니스', emoji: '❤️' },
                    { id: 7, name: '라그나르', emoji: '❤️' }
                ],
                탱커: [
                    { id: 8, name: '아르곤', emoji: '🛡️' },
                    { id: 9, name: '브라키스', emoji: '🛡️' },
                    { id: 10, name: '에드윈', emoji: '🛡️' }
                ]
            },
            
            // 전설 병사 데이터 (9명)
            legendarySoldiers: {
                힐러: [
                    { id: 1, name: '세라피나', emoji: '✨' },
                    { id: 2, name: '엘리제', emoji: '✨' },
                    { id: 3, name: '노엘', emoji: '✨' }
                ],
                딜러: [
                    { id: 4, name: '아르덴', emoji: '⚡' },
                    { id: 5, name: '벨리카', emoji: '⚡' },
                    { id: 6, name: '레오네스', emoji: '⚡' }
                ],
                탱커: [
                    { id: 7, name: '카이로스', emoji: '👑' },
                    { id: 8, name: '발렌', emoji: '👑' },
                    { id: 9, name: '세라프', emoji: '👑' }
                ]
            },
            
            // 신화 병사 데이터 (6명)
            mythicSoldiers: {
                힐러: [
                    { id: 1, name: '리엘리나', emoji: '🌟' },
                    { id: 2, name: '세레네', emoji: '🌟' }
                ],
                딜러: [
                    { id: 3, name: '세라핀', emoji: '🔥' },
                    { id: 4, name: '카이든', emoji: '🔥' }
                ],
                탱커: [
                    { id: 5, name: '발렌티온', emoji: '🛡️' },
                    { id: 6, name: '론다르', emoji: '🛡️' }
                ]
            },
            
            // 초월 병사 데이터 (3명)
            transcendentSoldiers: {
                힐러: [
                    { id: 1, name: '에스텔라', emoji: '💫' }
                ],
                딜러: [
                    { id: 2, name: '세라핀', emoji: '🌙' },
                    { id: 3, name: '벨레노아', emoji: '🌙' }
                ],
                탱커: []
            },
            
            // 데이터 저장소 (로컬 스토리지에서 불러옴)
            users: JSON.parse(localStorage.getItem('battleHeroesUsers')) || {},
            currentUser: null
        }
    },
    methods: {
        toggleMode() {
            this.isLoginMode = !this.isLoginMode;
            this.username = '';
            this.password = '';
            this.confirmPassword = '';
        },
        
        handleSubmit() {
            if (this.isLoginMode) {
                this.login();
            } else {
                this.register();
            }
        },
        
        register() {
            if (this.password !== this.confirmPassword) {
                alert('비밀번호가 일치하지 않습니다!');
                return;
            }
            
            if (this.users[this.username]) {
                alert('이미 존재하는 아이디입니다!');
                return;
            }
            
            if (this.username.length < 3) {
                alert('아이디는 3글자 이상이어야 합니다!');
                return;
            }
            
            if (this.password.length < 4) {
                alert('비밀번호는 4글자 이상이어야 합니다!');
                return;
            }
            
            // 사용자 등록
            this.users[this.username] = {
                password: this.password,
                characters: [],
                diamonds: 100,
                tickets: 5,
                pets: [],
                totalPulls: 0,
                mailbox: [
                    { id: 1, title: '환영합니다!', content: '시작 보상으로 다이아 100개와 캐릭터 뽑기 티켓 5장을 드립니다!', type: 'reward', claimed: false }
                ],
                isNewUser: true,
                createdAt: new Date().toISOString()
            };
            
            this.saveUsers();
            alert('회원가입이 완료되었습니다! 로그인해주세요.');
            this.toggleMode();
        },
        
        login() {
            if (!this.users[this.username]) {
                alert('존재하지 않는 아이디입니다!');
                return;
            }
            
            if (this.users[this.username].password !== this.password) {
                alert('비밀번호가 틀렸습니다!');
                return;
            }
            
            this.isLoggedIn = true;
            this.currentUser = this.username;
            this.myCharacters = this.users[this.username].characters || [];
            this.diamonds = this.users[this.username].diamonds || 0;
            this.myPets = this.users[this.username].pets || [];
            this.tickets = this.users[this.username].tickets || 0;
            this.totalPulls = this.users[this.username].totalPulls || 0;
            this.mailbox = this.users[this.username].mailbox || [];
            
            // 신규 유저면 시작 캐릭터 선택 화면 표시
            if (this.users[this.username].isNewUser) {
                this.showStarterSelection = true;
                this.currentScreen = 'starter';
            } else {
                alert(`${this.username}님 환영합니다!`);
            }
        },
        
        logout() {
            this.isLoggedIn = false;
            this.currentUser = null;
            this.myCharacters = [];
            this.myPets = [];
            this.tickets = 0;
            this.totalPulls = 0;
            this.mailbox = [];
            this.currentScreen = 'menu';
            this.username = '';
            this.password = '';
        },
        
        saveUsers() {
            localStorage.setItem('battleHeroesUsers', JSON.stringify(this.users));
        },
        
        saveUserData() {
            if (this.currentUser) {
                this.users[this.currentUser].characters = this.myCharacters;
                this.users[this.currentUser].diamonds = this.diamonds;
                this.users[this.currentUser].pets = this.myPets;
                this.users[this.currentUser].tickets = this.tickets;
                this.users[this.currentUser].totalPulls = this.totalPulls;
                this.users[this.currentUser].mailbox = this.mailbox;
                this.saveUsers();
            }
        },
        
        pullCharacter() {
            if (this.tickets < 1) {
                alert('캐릭터 뽑기 티켓이 부족합니다! 우편함을 확인하세요.');
                return;
            }
            
            this.tickets -= 1;
            this.totalPulls += 1;
            
            // 캐릭터 데이터 (등급별)
            const characterData = {
                일반: {
                    emoji: '🧑',
                    chance: 0.54,
                    useGeneralSoldiers: true
                },
                희귀: {
                    emoji: '🧙',
                    chance: 0.25,
                    useRareSoldiers: true
                },
                에픽: {
                    emoji: '🧝',
                    chance: 0.12,
                    useEpicSoldiers: true
                },
                전설: {
                    emoji: '👑',
                    chance: 0.05,
                    useLegendarySoldiers: true
                },
                신화: {
                    emoji: '🌟',
                    chance: 0.03,
                    useMythicSoldiers: true
                },
                초월: {
                    emoji: '💫',
                    chance: 0.01,
                    useTranscendentSoldiers: true
                }
            };
            
            // 등급 결정
            const random = Math.random();
            let rank;
            if (random < characterData.일반.chance) {
                rank = '일반';
            } else if (random < characterData.일반.chance + characterData.희귀.chance) {
                rank = '희귀';
            } else if (random < characterData.일반.chance + characterData.희귀.chance + characterData.에픽.chance) {
                rank = '에픽';
            } else if (random < characterData.일반.chance + characterData.희귀.chance + characterData.에픽.chance + characterData.전설.chance) {
                rank = '전설';
            } else if (random < characterData.일반.chance + characterData.희귀.chance + characterData.에픽.chance + characterData.전설.chance + characterData.신화.chance) {
                rank = '신화';
            } else {
                rank = '초월';
            }
            
            const rankData = characterData[rank];
            let characterName, characterType, characterEmoji;
            
            if (rank === '일반' && rankData.useGeneralSoldiers) {
                // 일반 등급이면 15명의 일반 병사 중에서 랜덤 선택
                const allSoldiers = [
                    ...this.generalSoldiers.힐러.map(s => ({...s, type: '힐러'})),
                    ...this.generalSoldiers.딜러.map(s => ({...s, type: '딜러'})),
                    ...this.generalSoldiers.탱커.map(s => ({...s, type: '탱커'}))
                ];
                const randomSoldier = allSoldiers[Math.floor(Math.random() * allSoldiers.length)];
                characterName = randomSoldier.name;
                characterType = randomSoldier.type;
                characterEmoji = randomSoldier.emoji;
            } else if (rank === '희귀' && rankData.useRareSoldiers) {
                // 희귀 등급이면 13명의 희귀 병사 중에서 랜덤 선택
                const allSoldiers = [
                    ...this.rareSoldiers.힐러.map(s => ({...s, type: '힐러'})),
                    ...this.rareSoldiers.딜러.map(s => ({...s, type: '딜러'})),
                    ...this.rareSoldiers.탱커.map(s => ({...s, type: '탱커'}))
                ];
                const randomSoldier = allSoldiers[Math.floor(Math.random() * allSoldiers.length)];
                characterName = randomSoldier.name;
                characterType = randomSoldier.type;
                characterEmoji = randomSoldier.emoji;
            } else if (rank === '에픽' && rankData.useEpicSoldiers) {
                // 에픽 등급이면 10명의 에픽 병사 중에서 랜덤 선택
                const allSoldiers = [
                    ...this.epicSoldiers.힐러.map(s => ({...s, type: '힐러'})),
                    ...this.epicSoldiers.딜러.map(s => ({...s, type: '딜러'})),
                    ...this.epicSoldiers.탱커.map(s => ({...s, type: '탱커'}))
                ];
                const randomSoldier = allSoldiers[Math.floor(Math.random() * allSoldiers.length)];
                characterName = randomSoldier.name;
                characterType = randomSoldier.type;
                characterEmoji = randomSoldier.emoji;
            } else if (rank === '전설' && rankData.useLegendarySoldiers) {
                // 전설 등급이면 9명의 전설 병사 중에서 랜덤 선택
                const allSoldiers = [
                    ...this.legendarySoldiers.힐러.map(s => ({...s, type: '힐러'})),
                    ...this.legendarySoldiers.딜러.map(s => ({...s, type: '딜러'})),
                    ...this.legendarySoldiers.탱커.map(s => ({...s, type: '탱커'}))
                ];
                const randomSoldier = allSoldiers[Math.floor(Math.random() * allSoldiers.length)];
                characterName = randomSoldier.name;
                characterType = randomSoldier.type;
                characterEmoji = randomSoldier.emoji;
            } else if (rank === '신화' && rankData.useMythicSoldiers) {
                // 신화 등급이면 6명의 신화 병사 중에서 랜덤 선택
                const allSoldiers = [
                    ...this.mythicSoldiers.힐러.map(s => ({...s, type: '힐러'})),
                    ...this.mythicSoldiers.딜러.map(s => ({...s, type: '딜러'})),
                    ...this.mythicSoldiers.탱커.map(s => ({...s, type: '탱커'}))
                ];
                const randomSoldier = allSoldiers[Math.floor(Math.random() * allSoldiers.length)];
                characterName = randomSoldier.name;
                characterType = randomSoldier.type;
                characterEmoji = randomSoldier.emoji;
            } else if (rank === '초월' && rankData.useTranscendentSoldiers) {
                // 초월 등급이면 3명의 초월 병사 중에서 랜덤 선택
                const allSoldiers = [
                    ...this.transcendentSoldiers.힐러.map(s => ({...s, type: '힐러'})),
                    ...this.transcendentSoldiers.딜러.map(s => ({...s, type: '딜러'})),
                    ...this.transcendentSoldiers.탱커.map(s => ({...s, type: '탱커'}))
                ];
                const randomSoldier = allSoldiers[Math.floor(Math.random() * allSoldiers.length)];
                characterName = randomSoldier.name;
                characterType = randomSoldier.type;
                characterEmoji = randomSoldier.emoji;
            } else {
                // 다른 등급은 기존 방식대로
                const randomName = rankData.names[Math.floor(Math.random() * rankData.names.length)];
                const jobs = ['탱커', '힐러', '딜러'];
                characterType = jobs[Math.floor(Math.random() * jobs.length)];
                characterName = randomName;
                characterEmoji = rankData.emoji;
            }
            
            this.pulledCharacter = {
                name: `${characterEmoji} ${rank} ${characterName}`,
                rank: rank,
                level: 1,
                exp: 0,
                expToLevel: 100,
                type: characterType,
                equipment: {
                    weapon: null,
                    armor: null,
                    pet: null
                }
            };
            
            // 내 캐릭터에 추가
            this.myCharacters.push(this.pulledCharacter);
            
            // 뽑기 횟수 보상 확인
            this.checkPullRewards();
            
            this.saveUserData();
        },
        
        checkPullRewards() {
            if (this.totalPulls === 300) {
                // 전설 캐릭터 보장
                const legendaryChar = this.legendarySoldiers.힐러[0];
                const guaranteedCharacter = {
                    name: `${legendaryChar.emoji} 전설 ${legendaryChar.name}`,
                    rank: '전설',
                    level: 1,
                    exp: 0,
                    expToLevel: 100,
                    type: '힐러',
                    equipment: { weapon: null, armor: null, pet: null }
                };
                this.myCharacters.push(guaranteedCharacter);
                this.mailbox.push({
                    id: Date.now(),
                    title: '🎉 300회 뽑기 보상!',
                    content: '전설 캐릭터를 지급했습니다!',
                    type: 'reward',
                    claimed: false
                });
                alert('🎉 300회 뽑기 달성! 전설 캐릭터를 지급했습니다!');
            } else if (this.totalPulls === 500) {
                // 신화 캐릭터 보장
                const mythicChar = this.mythicSoldiers.힐러[0];
                const guaranteedCharacter = {
                    name: `${mythicChar.emoji} 신화 ${mythicChar.name}`,
                    rank: '신화',
                    level: 1,
                    exp: 0,
                    expToLevel: 100,
                    type: '힐러',
                    equipment: { weapon: null, armor: null, pet: null }
                };
                this.myCharacters.push(guaranteedCharacter);
                this.mailbox.push({
                    id: Date.now(),
                    title: '🎉 500회 뽑기 보상!',
                    content: '신화 캐릭터를 지급했습니다!',
                    type: 'reward',
                    claimed: false
                });
                alert('🎉 500회 뽑기 달성! 신화 캐릭터를 지급했습니다!');
            } else if (this.totalPulls === 600) {
                // 초월 캐릭터 보장
                const transcendentChar = this.transcendentSoldiers.힐러[0];
                const guaranteedCharacter = {
                    name: `${transcendentChar.emoji} 초월 ${transcendentChar.name}`,
                    rank: '초월',
                    level: 1,
                    exp: 0,
                    expToLevel: 100,
                    type: '힐러',
                    equipment: { weapon: null, armor: null, pet: null }
                };
                this.myCharacters.push(guaranteedCharacter);
                this.mailbox.push({
                    id: Date.now(),
                    title: '🎉 600회 뽑기 보상!',
                    content: '초월 캐릭터를 지급했습니다!',
                    type: 'reward',
                    claimed: false
                });
                alert('🎉 600회 뽑기 달성! 초월 캐릭터를 지급했습니다!');
            }
        },
        
        pullPet() {
            if (this.diamonds < 50) {
                alert('다이아가 부족합니다! (필요: 💎 50)');
                return;
            }
            
            this.diamonds -= 50;
            
            // 펫 확률
            const petData = {
                일반: { chance: 0.54, pets: this.pets.일반 },
                희귀: { chance: 0.25, pets: this.pets.희귀 },
                에픽: { chance: 0.12, pets: this.pets.에픽 },
                전설: { chance: 0.05, pets: this.pets.전설 },
                신화: { chance: 0.03, pets: this.pets.신화 },
                초월: { chance: 0.01, pets: this.pets.초월 }
            };
            
            const random = Math.random();
            let rank;
            if (random < petData.일반.chance) {
                rank = '일반';
            } else if (random < petData.일반.chance + petData.희귀.chance) {
                rank = '희귀';
            } else if (random < petData.일반.chance + petData.희귀.chance + petData.에픽.chance) {
                rank = '에픽';
            } else if (random < petData.일반.chance + petData.희귀.chance + petData.에픽.chance + petData.전설.chance) {
                rank = '전설';
            } else if (random < petData.일반.chance + petData.희귀.chance + petData.에픽.chance + petData.전설.chance + petData.신화.chance) {
                rank = '신화';
            } else {
                rank = '초월';
            }
            
            const rankPets = petData[rank].pets;
            const randomPet = rankPets[Math.floor(Math.random() * rankPets.length)];
            
            this.myPets.push(randomPet);
            this.saveUserData();
            
            alert(`🎉 ${randomPet.emoji} ${randomPet.name}을(를) 얻었습니다! (${rank})`);
        },
        
        startBattle() {
            if (this.myCharacters.length === 0) {
                alert('전투할 캐릭터가 없습니다! 캐릭터를 뽑으세요.');
                return;
            }
            
            this.isFighting = true;
            this.battleResult = null;
            
            // 전투 시뮬레이션 (랜덤 승패)
            setTimeout(() => {
                const playerPower = this.myCharacters.reduce((sum, char) => {
                    const powerMap = { '일반': 10, '희귀': 20, '에픽': 35, '전설': 50, '신화': 70, '초월': 100 };
                    let charPower = (powerMap[char.rank] || 10) * char.level;
                    
                    // 장비 파워 추가
                    if (char.equipment.weapon) charPower += char.equipment.weapon.power;
                    if (char.equipment.armor) charPower += char.equipment.armor.power;
                    if (char.equipment.pet) charPower += char.equipment.pet.power;
                    
                    return sum + charPower;
                }, 0);
                
                const monsterPower = Math.floor(Math.random() * 100) + 50;
                
                const win = playerPower > monsterPower || Math.random() > 0.4;
                
                this.battleResult = {
                    win: win,
                    playerPower: playerPower,
                    monsterPower: monsterPower,
                    reward: win ? Math.floor(Math.random() * 30) + 20 : Math.floor(Math.random() * 10) + 5,
                    ticketReward: false
                };
                
                if (win) {
                    this.diamonds += this.battleResult.reward;
                    
                    // 가끔 티켓 보상
                    if (Math.random() < 0.3) {
                        this.tickets += 1;
                        this.battleResult.ticketReward = true;
                    }
                    
                    // 경험치 지급
                    const expGain = 50;
                    this.myCharacters.forEach(char => {
                        char.exp += expGain;
                        if (char.exp >= char.expToLevel) {
                            char.level += 1;
                            char.exp = 0;
                            char.expToLevel = Math.floor(char.expToLevel * 1.5);
                        }
                    });
                    
                    this.saveUserData();
                }
                
                this.isFighting = false;
            }, 2000);
        },
        
        buyItem(item) {
            if (this.diamonds < item.price) {
                alert('다이아가 부족합니다!');
                return;
            }
            
            this.diamonds -= item.price;
            alert(`${item.name}을(를) 구매했습니다!`);
            this.saveUserData();
        },
        
        equipItem(characterIndex, item, slot) {
            if (item.type === '소모품') {
                alert('소모품은 장착할 수 없습니다!');
                return;
            }
            
            if (item.type === '무기' && slot !== 'weapon') {
                alert('무기는 무기 슬롯에만 장착할 수 있습니다!');
                return;
            }
            
            if (item.type === '방어구' && slot !== 'armor') {
                alert('방어구는 방어구 슬롯에만 장착할 수 있습니다!');
                return;
            }
            
            this.myCharacters[characterIndex].equipment[slot] = item;
            this.saveUserData();
            alert(`${item.name}을(를) 장착했습니다!`);
        },
        
        unequipItem(characterIndex, slot) {
            this.myCharacters[characterIndex].equipment[slot] = null;
            this.saveUserData();
            alert('장착을 해제했습니다!');
        },
        
        equipPet(characterIndex, petIndex) {
            this.myCharacters[characterIndex].equipment.pet = this.myPets[petIndex];
            this.saveUserData();
            alert(`${this.myPets[petIndex].name}을(를) 장착했습니다!`);
        },
        
        unequipPet(characterIndex) {
            this.myCharacters[characterIndex].equipment.pet = null;
            this.saveUserData();
            alert('펫 장착을 해제했습니다!');
        },
        
        equipToCharacter(pet, petIndex) {
            if (this.myCharacters.length === 0) {
                alert('캐릭터가 없습니다!');
                return;
            }
            
            // 첫 번째 캐릭터에 장착 (나중에 개선 가능)
            this.myCharacters[0].equipment.pet = pet;
            this.saveUserData();
            alert(`${pet.name}을(를) ${this.myCharacters[0].name}에게 장착했습니다!`);
        },
        
        claimMail(mailIndex) {
            const mail = this.mailbox[mailIndex];
            if (mail.claimed) {
                alert('이미 수령한 우편입니다.');
                return;
            }
            
            if (mail.type === 'reward') {
                // 기본 보상 (다이아나 티켓 등)
                this.diamonds += 50;
                this.tickets += 2;
            }
            
            mail.claimed = true;
            this.saveUserData();
            alert('보상을 수령했습니다!');
        }
        
        selectStarterCharacter(soldier) {
            const starterCharacter = {
                name: soldier.name,
                rank: '일반',
                level: 1,
                exp: 0,
                expToLevel: 100,
                type: soldier.type,
                image: soldier.image,
                equipment: {
                    weapon: null,
                    armor: null,
                    pet: null
                }
            };
            
            this.myCharacters.push(starterCharacter);
            this.users[this.currentUser].isNewUser = false;
            this.saveUserData();
            
            this.showStarterSelection = false;
            this.currentScreen = 'menu';
            
            alert(`${this.username}님, ${starterCharacter.name}을(를) 선택했습니다! 게임을 시작합니다!`);
        },
    }
}).mount('#app');
document.addEventListener('DOMContentLoaded', () => {

    // === EFEK HUJAN ===
    function buatHujan(containerId) {
        const box = document.getElementById(containerId);
        if (!box) return;
        box.innerHTML = '';
        for (let i = 0; i < 35; i++) {
            const drop = document.createElement('div');
            drop.classList.add('drop');
            drop.style.left = Math.random() * 100 + '%';
            drop.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
            drop.style.animationDelay = Math.random() * 2 + 's';
            box.appendChild(drop);
        }
    }
    buatHujan('rain-box-1');
    buatHujan('rain-box-2');

    // === FUNGSI PERPINDAHAN SCENE ===
    function switchScene(fromSceneId, toSceneId) {
        const fromScene = document.getElementById(fromSceneId);
        const toScene = document.getElementById(toSceneId);

        if (fromScene) fromScene.classList.remove('active', 'fade-out');
        if (toScene) toScene.classList.add('active');
    }

    // === SCENE 1: PIN CARD (PIN: 1005) ===
    let pinInput = "";
    const pinBenar = "1005";
    const dots = document.querySelectorAll('.dot');
    const numBtns = document.querySelectorAll('.num-btn');
    const btnDel = document.getElementById('btn-del');
    const btnEnter = document.getElementById('btn-enter');

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index < pinInput.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
    }

    numBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (pinInput.length < 4) {
                pinInput += btn.getAttribute('data-val');
                updateDots();
            }
        });
    });

    if (btnDel) {
        btnDel.addEventListener('click', () => {
            pinInput = pinInput.slice(0, -1);
            updateDots();
        });
    }

    if (btnEnter) {
        btnEnter.addEventListener('click', () => {
            if (pinInput.length === 4) {
                if (pinInput === pinBenar) {
                    switchScene('scene-1', 'scene-2');
                } else {
                    alert("PIN salah sayangkuu cintaa, coba lagi ya!");
                    pinInput = "";
                    updateDots();
                }
            } else {
                alert("Masukkan 4 digit dulu bos");
            }
        });
    }

    // === SCENE 2: MUSIC PLAYER ===
    const btnPlay = document.getElementById('btn-play');
    const audioUltah = document.getElementById('lagu-ultah');
    const audioGame = document.getElementById('lagu-game');
    const playerCard = document.getElementById('player-card');
    const barFill = document.getElementById('bar-fill');
    const currTimeText = document.getElementById('curr-time');
    const durTimeText = document.getElementById('dur-time');
    const btnSkip = document.getElementById('btn-skip');
    const btnBackScene2 = document.getElementById('btn-back-scene-2');

    function formatTime(sec) {
        if (isNaN(sec)) return "0:00";
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    if (btnPlay && audioUltah) {
        btnPlay.addEventListener('click', () => {
            if (audioUltah.paused) {
                audioUltah.play().catch(() => {});
                btnPlay.textContent = '⏸';
                playerCard.classList.add('playing');
            } else {
                audioUltah.pause();
                btnPlay.textContent = '▶';
                playerCard.classList.remove('playing');
            }
        });

        audioUltah.addEventListener('timeupdate', () => {
            if (audioUltah.duration) {
                const percent = (audioUltah.currentTime / audioUltah.duration) * 100;
                barFill.style.width = percent + '%';
                currTimeText.textContent = formatTime(audioUltah.currentTime);
                durTimeText.textContent = formatTime(audioUltah.duration);
            }
        });
    }

    if (btnBackScene2) {
        btnBackScene2.addEventListener('click', () => {
            switchScene('scene-2', 'scene-1');
        });
    }

    if (btnSkip) {
        btnSkip.addEventListener('click', () => {
            if (audioUltah && audioUltah.paused) audioUltah.play().catch(() => {});
            switchScene('scene-2', 'scene-3');
        });
    }

    // === SCENE 3: KUE ULANG TAHUN ===
    const lilin = document.getElementById('lilin');
    const apiLilin = document.getElementById('api-lilin');
    const scene3 = document.getElementById('scene-3');
    const areaKue = document.getElementById('area-kue');
    const objekKue = document.getElementById('objek-kue');
    const petunjukKue = document.getElementById('petunjuk-kue');
    const crumbsKue = document.getElementById('crumbs-kue');
    const btnLanjut = document.getElementById('btn-lanjut');
    const btnBackScene3 = document.getElementById('btn-back-scene-3');

    let lilinPadam = false;
    let biteCount = 0;

    if (lilin) {
        lilin.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!lilinPadam) {
                lilinPadam = true;
                apiLilin.classList.remove('menyala');
                scene3.classList.add('dark-mode');
                petunjukKue.textContent = "🍰 Yey! sekarang mam kuenyaa";
            }
        });
    }

    if (areaKue) {
        areaKue.addEventListener('click', () => {
            if (!lilinPadam) {
                alert("Tiup lilinnya dulu ya wuubii!");
                return;
            }

            if (biteCount < 3) {
                biteCount++;
                if (biteCount === 1) objekKue.classList.add('bite-1');
                else if (biteCount === 2) objekKue.classList.add('bite-2');
                else if (biteCount === 3) {
                    objekKue.classList.add('bite-3');
                    crumbsKue.classList.add('show');
                    petunjukKue.textContent = "✨ wow kuenya habis, lapar ya kak? wahaha ayo lanjut!";
                }
            }
        });
    }

    if (btnBackScene3) {
        btnBackScene3.addEventListener('click', () => {
            switchScene('scene-3', 'scene-2');
        });
    }

    if (btnLanjut) {
        btnLanjut.addEventListener('click', () => {
            switchScene('scene-3', 'scene-4');
        });
    }

    // === SCENE 4: VINTAGE NOTE ===
    const btnNextStage = document.getElementById('btn-next-stage');
    const btnBackScene4 = document.getElementById('btn-back-scene-4');

    if (btnBackScene4) {
        btnBackScene4.addEventListener('click', () => {
            switchScene('scene-4', 'scene-3');
        });
    }

    if (btnNextStage) {
        btnNextStage.addEventListener('click', () => {
            const scene4 = document.getElementById('scene-4');
            scene4.classList.add('fade-out');

            setTimeout(() => {
                switchScene('scene-4', 'scene-5');
            }, 500);
        });
    }

    // === SCENE 5: SCRAPBOOK (3 HALAMAN & AMPLOP SURAT) ===
    const bookContainer = document.getElementById('book-scrapbook');
    const btnBackScene5P1 = document.getElementById('btn-back-scene-5-p1');
    const btnNext1 = document.getElementById('btn-next-page-1');
    const btnPrev2 = document.getElementById('btn-prev-page-2');
    const btnNext2 = document.getElementById('btn-next-page-2');
    const btnPrev3 = document.getElementById('btn-prev-page-3');

    if (btnBackScene5P1) {
        btnBackScene5P1.addEventListener('click', () => {
            switchScene('scene-5', 'scene-4');
        });
    }

    if (btnNext1) btnNext1.addEventListener('click', () => bookContainer.className = 'book-container page-2-active');
    if (btnPrev2) btnPrev2.addEventListener('click', () => bookContainer.className = 'book-container');
    if (btnNext2) btnNext2.addEventListener('click', () => bookContainer.className = 'book-container page-3-active');
    if (btnPrev3) btnPrev3.addEventListener('click', () => bookContainer.className = 'book-container page-2-active');

    // KLIK AMPLOP UNTUK BUKA MODAL SURAT
    const envelopeBtn = document.getElementById('envelope-btn');
    const letterModal = document.getElementById('letter-modal');
    const btnStartGame = document.getElementById('btn-start-game');

    if (envelopeBtn) {
        envelopeBtn.addEventListener('click', () => {
            letterModal.classList.add('active');
        });
    }

    // TOMBOL DARI SURAT MASUK KE GAME (GANTI MUSIK KE marioo.mp3)
    if (btnStartGame) {
        btnStartGame.addEventListener('click', () => {
            letterModal.classList.remove('active');
            switchScene('scene-5', 'scene-6');

            if (audioUltah) audioUltah.pause();
            if (audioGame) {
                audioGame.currentTime = 0;
                audioGame.play().catch(() => {});
            }

            startMarioGame();
        });
    }

    // === SCENE 6: GAME MARIO BROS / CHICKEN RUN ===
    let gameInterval = null;
    let failCount = 0;
    const btnBackScene6 = document.getElementById('btn-back-scene-6');

    if (btnBackScene6) {
        btnBackScene6.addEventListener('click', () => {
            if (gameInterval) cancelAnimationFrame(gameInterval);
            if (audioGame) audioGame.pause();
            if (audioUltah) audioUltah.play().catch(() => {});
            switchScene('scene-6', 'scene-5');
        });
    }

    function startMarioGame() {
        const canvas = document.getElementById('mario-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let player = { x: 30, y: 140, w: 22, h: 22, vy: 0, grounded: false, speed: 2.8 };
        let cameraX = 0;
        let isDead = false;

        const groundY = 175;
        const levelLength = 1000;
        const pipes = [{ x: 180, w: 26, h: 32 }, { x: 420, w: 26, h: 42 }, { x: 700, w: 26, h: 35 }];
        const goombas = [{ x: 300, y: 161, dir: -1, alive: true }, { x: 550, y: 161, dir: -1, alive: true }];
        const flagPole = { x: 920, y: 50, w: 6, h: 125 };

        let keys = { left: false, right: false };

        function performJump(e) {
            if (e) e.preventDefault();
            if (player.grounded && !isDead) {
                player.vy = -8.8;
                player.grounded = false;
            }
        }

        const btnLeft = document.getElementById('mario-left');
        const btnRight = document.getElementById('mario-right');
        const btnJump = document.getElementById('mario-jump');

        btnLeft.ontouchstart = (e) => { e.preventDefault(); keys.left = true; };
        btnLeft.ontouchend = (e) => { e.preventDefault(); keys.left = false; };
        btnLeft.onmousedown = () => keys.left = true;
        btnLeft.onmouseup = () => keys.left = false;

        btnRight.ontouchstart = (e) => { e.preventDefault(); keys.right = true; };
        btnRight.ontouchend = (e) => { e.preventDefault(); keys.right = false; };
        btnRight.onmousedown = () => keys.right = true;
        btnRight.onmouseup = () => keys.right = false;

        btnJump.ontouchstart = performJump;
        btnJump.onmousedown = performJump;

        function resetPlayer() {
            player.x = 30; player.y = 140; player.vy = 0; cameraX = 0; isDead = false;
        }

        function drawChickenCharacter(x, y, isJumping) {
            ctx.fillStyle = "#ffeaa7"; ctx.fillRect(x + 2, y + 4, 16, 14);
            ctx.fillStyle = "#fdcb6e"; ctx.fillRect(x + (isJumping ? 0 : 2), y + 8, 6, 6);
            ctx.fillStyle = "#e17055"; ctx.fillRect(x + 16, y + 8, 5, 4);
            ctx.fillStyle = "#d63031"; ctx.fillRect(x + 6, y, 6, 4);
            ctx.fillStyle = "#2d3436"; ctx.fillRect(x + 12, y + 6, 3, 3);
            ctx.fillStyle = "#e17055";
            if (isJumping) {
                ctx.fillRect(x + 4, y + 17, 4, 3); ctx.fillRect(x + 12, y + 17, 4, 3);
            } else {
                ctx.fillRect(x + 5, y + 18, 3, 4); ctx.fillRect(x + 12, y + 18, 3, 4);
            }
        }

        function gameLoop() {
            if (!isDead) {
                if (keys.left && player.x > 5) player.x -= player.speed;
                if (keys.right) player.x += player.speed;

                player.vy += 0.42;
                player.y += player.vy;

                if (player.y + player.h >= groundY) {
                    player.y = groundY - player.h;
                    player.vy = 0;
                    player.grounded = true;
                }

                if (player.x - cameraX > 150) cameraX = player.x - 150;

                pipes.forEach(p => {
                    if (player.x + player.w > p.x && player.x < p.x + p.w && player.y + player.h > groundY - p.h) {
                        player.x = p.x - player.w;
                    }
                });

                goombas.forEach(g => {
                    if (g.alive) {
                        g.x += g.dir * 0.8;
                        if (g.x < 100 || g.x > 800) g.dir *= -1;

                        if (player.x + player.w > g.x && player.x < g.x + 16 && player.y + player.h > g.y) {
                            die();
                        }
                    }
                });

                if (player.x >= flagPole.x) {
                    win();
                    return;
                }
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(-cameraX, 0);

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(100, 30, 40, 15); ctx.fillRect(400, 40, 50, 18); ctx.fillRect(750, 25, 45, 15);

            ctx.fillStyle = "#c84c0c"; ctx.fillRect(0, groundY, levelLength, 45);
            ctx.fillStyle = "#fcb498"; ctx.fillRect(0, groundY, levelLength, 4);

            pipes.forEach(p => {
                ctx.fillStyle = "#00a800"; ctx.fillRect(p.x, groundY - p.h, p.w, p.h);
                ctx.fillStyle = "#80d010"; ctx.fillRect(p.x + 2, groundY - p.h, 4, p.h);
            });

            goombas.forEach(g => {
                if (g.alive) {
                    ctx.fillStyle = "#a81000"; ctx.fillRect(g.x, g.y, 16, 12);
                    ctx.fillStyle = "#ffffff"; ctx.fillRect(g.x + 2, g.y + 3, 3, 3); ctx.fillRect(g.x + 10, g.y + 3, 3, 3);
                }
            });

            ctx.fillStyle = "#fcb498"; ctx.fillRect(flagPole.x, flagPole.y, flagPole.w, flagPole.h);
            ctx.fillStyle = "#00a800"; ctx.beginPath(); ctx.arc(flagPole.x + 3, flagPole.y, 8, 0, Math.PI * 2); ctx.fill();

            drawChickenCharacter(player.x, player.y, !player.grounded);
            ctx.restore();

            gameInterval = requestAnimationFrame(gameLoop);
        }

        function die() {
            isDead = true;
            failCount++;
            document.getElementById('mario-lives').textContent = "❤️".repeat(Math.max(0, 3 - failCount));

            if (failCount >= 3) {
                showWinOrFailPopup("✨ gapapa sayang sudah berusaha, walau nub heheheehe. Coba lagi yukzz", true);
            } else {
                showWinOrFailPopup("Oh nooo! 💥", `Coba lagi yaa! (Percobaan ${failCount}/3)`, false);
            }
        }

        function win() {
            cancelAnimationFrame(gameInterval);
            showWinOrFailPopup("hebatt, ini love dari aku 💖", "Maacii sudah nak mainkan game simple iniii(⁠つ⁠≧⁠▽⁠≦⁠)⁠つ", true);
        }

        resetPlayer();
        gameLoop();
    }

    const marioPopup = document.getElementById('mario-popup');
    const marioPopupTitle = document.getElementById('mario-popup-title');
    const marioPopupSub = document.getElementById('mario-popup-sub');
    const btnMarioReplay = document.getElementById('btn-mario-replay');
    const btnMarioNext = document.getElementById('btn-mario-next');

    function showWinOrFailPopup(title, sub, isWinState) {
        marioPopupTitle.textContent = title;
        marioPopupSub.textContent = sub;
        marioPopup.classList.add('active');

        if (isWinState) {
            btnMarioReplay.style.display = "block";
            btnMarioNext.style.display = "block";

            btnMarioReplay.onclick = () => {
                marioPopup.classList.remove('active');
                failCount = 0;
                document.getElementById('mario-lives').textContent = "❤️❤️❤️";
                startMarioGame();
            };

            btnMarioNext.onclick = () => {
                marioPopup.classList.remove('active');
                switchScene('scene-6', 'scene-7');
            };
        } else {
            btnMarioReplay.style.display = "block";
            btnMarioNext.style.display = "none";
            btnMarioReplay.textContent = "Coba Lagi 🔄";

            btnMarioReplay.onclick = () => {
                marioPopup.classList.remove('active');
                startMarioGame();
            };
        }
    }

    // === SCENE 7 & SCENE 8 NAVIGASI ===
    const btnBackScene7 = document.getElementById('btn-back-scene-7');
    const btnToScene8 = document.getElementById('btn-to-scene-8');
    const btnBackScene8 = document.getElementById('btn-back-scene-8');

    if (btnBackScene7) {
        btnBackScene7.addEventListener('click', () => {
            switchScene('scene-7', 'scene-6');
        });
    }

    if (btnToScene8) {
        btnToScene8.addEventListener('click', () => {
            switchScene('scene-7', 'scene-8');
        });
    }

    if (btnBackScene8) {
        btnBackScene8.addEventListener('click', () => {
            switchScene('scene-8', 'scene-7');
        });
    }
});

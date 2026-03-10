const animator = animaster();
addListeners();
let heartBeatingAnimation = null;

function addListeners() {
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animator.fadeIn(block, 5000);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animator.fadeOut(block, 5000);
        });
    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animator.addMove(500, {x:20, y:20}).play(block);
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animator.scale(block, 1000, 1.25);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animator.moveAndHide(block, 1000);
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animator.showAndHide(block, 1000);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');

            if (heartBeatingAnimation) {
                heartBeatingAnimation.stop();
            }

            heartBeatingAnimation = animator.heartBeating(block, 1000);
        });

    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            if (heartBeatingAnimation) {
                heartBeatingAnimation.stop();
                heartBeatingAnimation = null;
            }
        });

    document.getElementById('moveAndHideReset')
    .addEventListener('click', function () {
        const block = document.getElementById('moveAndHideBlock');
        animator.resetMoveAndHide(block);
    });
}

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}

function animaster() {
    const _steps = []

    function addMove(duration, translation) {
        _steps.push({
            type: 'move',
            duration: duration,
            translation: translation
        });
        return this;
    }

    function play(element) {
        let delay = 0;
        for(const step of _steps) {
            setTimeout(() => {
                if(step.type === 'move') {
                    move(element, step.duration, step.translation);
                }
            });
            delay += step.duration;
        }
    }

    let moveAndHideTimer = null;

    function move(element, duration, translation) {
        element.style.transitionDuration = `${duration}ms`;
        element.style.transform = getTransform(translation, null);
    }

    /**
     * Блок плавно появляется из прозрачного.
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     */
    function fadeIn(element, duration) {
        element.style.transitionDuration = `${duration}ms`;
        element.classList.remove('hide');
        element.classList.add('show');
    }

    function fadeOut(element, duration) {
        element.style.transitionDuration = `${duration}ms`;
        element.classList.remove('show');
        element.classList.add('hide');
    }

    /**
     * Функция, увеличивающая/уменьшающая элемент
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
     */
    function scale(element, duration, ratio) {
        element.style.transitionDuration = `${duration}ms`;
        element.style.transform = getTransform(null, ratio);
    }

    function moveAndHide(element, duration) {

        const moveDuration = duration * 2 / 5;

        move(element, moveDuration, {x: 100, y: 20});

        moveAndHideTimer = setTimeout(() => {
            fadeOut(element, duration * 3 / 5);
        }, moveDuration);
    }

    function showAndHide(element, duration) {
        this.fadeIn(element, duration / 3);
        setTimeout(() => {
            fadeOut(element, duration / 3);
        }, duration * 2 / 3);
    }

    function heartBeating(element, duration) {
        const beat = () => {
            scale(element, duration / 2, 1.4);

            setTimeout(() => {
                scale(element, duration / 2, 1);
            }, duration / 2);
        };

        beat();
        const intervalId = setInterval(beat, duration);

        return {
            stop() {
                clearInterval(intervalId);
            }
        };
    }

    function resetFadeIn(element) {
        element.style.transitionDuration = null;
        element.classList.remove('show');
    }

    function resetFadeOut(element) {
        element.style.transitionDuration = null;
        element.classList.remove('hide');
    }

    function resetMoveAndScale(element) {
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    function resetMoveAndHide(element) {
        clearTimeout(moveAndHideTimer);
        resetMoveAndScale(element);
        resetFadeOut(element);
    }

    return {
        showAndHide,
        heartBeating,
        _steps,
        move,
        fadeIn,
        fadeOut,
        scale,
        moveAndHide,
        resetMoveAndHide,
        addMove,
        play,
    }
}

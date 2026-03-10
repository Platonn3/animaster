const animator = animaster();
addListeners();

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
            animator.scale(block, 1000, 1.25);
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

    /* ---------- RESET FUNCTIONS ---------- */

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

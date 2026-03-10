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

    const _steps = [];

    function addMove(duration, translation) {
        _steps.push({
            type: 'move',
            duration,
            translation
        });
        return this;
    }

    function addScale(duration, ratio) {
        _steps.push({
            type: 'scale',
            duration,
            ratio
        });
        return this;
    }

    function addFadeIn(duration) {
        _steps.push({
            type: 'fadeIn',
            duration
        });
        return this;
    }

    function addFadeOut(duration) {
        _steps.push({
            type: 'fadeOut',
            duration
        });
        return this;
    }
    function addColor(duration, red, green, blue) {
        _steps.push({
            type: 'color',
            duration
        });
        return this;
    }

    function addDelay(duration) {
        _steps.push({
            type: 'delay',
            duration
        });
        return this;
    }

    function play(element, cycled = false) {

        let delay = 0;
        const timers = [];

        const run = () => {

            delay = 0;

            for (const step of _steps) {

                const timer = setTimeout(() => {

                    if (step.type === 'move') {
                        element.style.transitionDuration = `${step.duration}ms`;
                        element.style.transform = getTransform(step.translation, null);
                    }

                    else if (step.type === 'scale') {
                        element.style.transitionDuration = `${step.duration}ms`;
                        element.style.transform = getTransform(null, step.ratio);
                    }

                    else if (step.type === 'fadeIn') {
                        element.style.transitionDuration = `${step.duration}ms`;
                        element.classList.remove('hide');
                        element.classList.add('show');
                    }

                    else if (step.type === 'fadeOut') {
                        element.style.transitionDuration = `${step.duration}ms`;
                        element.classList.remove('show');
                        element.classList.add('hide');
                    }
                    else if (step.type === 'addColor') {
                        element.style.backgroundColor =`rgb(${step.red} ${green} ${blue})`;
                        element.style.transitionDuration = `${step.duration}ms`;
                        element.classList.remove('show');
                        element.classList.add('hide');
                    }

                }, delay);

                timers.push(timer);
                delay += step.duration;
            }

            if (cycled) {
                const cycleTimer = setTimeout(run, delay);
                timers.push(cycleTimer);
            }
        };

        run();

        return {
            stop() {
                timers.forEach(clearTimeout);
            }
        };
    }

    function move(element, duration, translation) {
        return animaster()
            .addMove(duration, translation)
            .play(element);
    }

    function scale(element, duration, ratio) {
        return animaster()
            .addScale(duration, ratio)
            .play(element);
    }

    function fadeIn(element, duration) {
        return animaster()
            .addFadeIn(duration)
            .play(element);
    }

    function fadeOut(element, duration) {
        return animaster()
            .addFadeOut(duration)
            .play(element);
    }

    function moveAndHide(element, duration) {
        return animaster()
            .addMove(duration * 2 / 5, { x: 100, y: 20 })
            .addFadeOut(duration * 3 / 5)
            .play(element);
    }

    function showAndHide(element, duration) {
        return animaster()
            .addFadeIn(duration / 3)
            .addDelay(duration / 3)
            .addFadeOut(duration / 3)
            .play(element);
    }

    function heartBeating(element, duration) {
        return animaster()
            .addScale(duration / 2, 1.4)
            .addScale(duration / 2, 1)
            .play(element, true);
    }

    function heartBeating(element, duration) {
        return animaster()
            .addScale(duration / 2, 1.4)
            .addColor(red, green, blue);
            .addScale(duration / 2, 1)
            .play(element, true);
    }
    function colorChanging(element, duration) {
        particle.style.backgroundColor =
  `rgb(${red} ${green} ${blue})`;
        return animaster()
            .addScale(duration / 2, 1.4)
            .addFadeOut(duration / 2)
            .addScale(duration / 2, 1)
            .addFadeIn(duration / 2)
            .play(element, true);
    }


    return {
        _steps,
        addMove,
        addScale,
        addFadeIn,
        addFadeOut,
        addDelay,
        play,
        move,
        scale,
        fadeIn,
        fadeOut,
        moveAndHide,
        showAndHide,
        heartBeating,
        colorChanging
    };
}

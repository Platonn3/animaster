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
            animaster()
                .addMove(500, { x: 20, y: 20 })
                .play(block);
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
            }

        });

    document.getElementById('heartBeatingReset')
        .addEventListener('click', function () {
            if (heartBeatingAnimation) {
                heartBeatingAnimation.reset();
                heartBeatingAnimation = null;
            }
        });
    document.getElementById('moveAndHideReset')
    .addEventListener('click', function () {
        const block = document.getElementById('moveAndHideBlock');
        animator.resetMoveAndHide(block);
    });

    document.getElementById('moyaANimatSIA')
    .addEventListener('click', function () {
        const block = document.getElementById('moyaANimatSIABlock');
        animator.colorChanging(block, 1000);
    });
}

function getTransform(translation, ratio) {
    const result = [];

    if (translation) {
        result.push(`translate(${translation.x}px, ${translation.y}px)`);
    }

    if (ratio !== null && ratio !== undefined) {
        result.push(`scale(${ratio})`);
    }

    return result.join(' ');
}

function animaster() {
    const steps = [];

    function addMove(duration, translation) {
        steps.push({
            type: 'move',
            duration,
            translation
        });
        return this;
    }

    function addScale(duration, ratio) {
        steps.push({
            type: 'scale',
            duration,
            ratio
        });
        return this;
    }

    function addFadeIn(duration) {
        steps.push({
            type: 'fadeIn',
            duration
        });
        return this;
    }

    function addFadeOut(duration) {
        steps.push({
            type: 'fadeOut',
            duration
        });
        return this;
    }
<<<<<<< HEAD
=======

    function addColor(duration, red, green, blue) {
        _steps.push({
            type: 'color',
            duration,
            color: `rgb(${red}, ${green}, ${blue})`
        });
        return this;
    }
>>>>>>> 319dc14 (added color)

    function addDelay(duration) {
        steps.push({
            type: 'delay',
            duration
        });
        return this;
    }

    function addColor(duration, red, green, blue) {
        steps.push({
            type: 'color',
            duration,
            red,
            green,
            blue
        });
        return this;
    }

    function play(element, cycled = false) {
        const initialState = {
            transitionDuration: element.style.transitionDuration,
            transform: element.style.transform,
            backgroundColor: element.style.backgroundColor,
            className: element.className
        };

        const timers = [];
        let isStopped = false;

        function applyStep(step) {
            if (step.type === 'move') {
                element.style.transitionDuration = `${step.duration}ms`;
                element.style.transform = getTransform(step.translation, null);
            } else if (step.type === 'scale') {
                element.style.transitionDuration = `${step.duration}ms`;
                element.style.transform = getTransform(null, step.ratio);
            } else if (step.type === 'fadeIn') {
                element.style.transitionDuration = `${step.duration}ms`;
                element.classList.remove('hide');
                element.classList.add('show');
            } else if (step.type === 'fadeOut') {
                element.style.transitionDuration = `${step.duration}ms`;
                element.classList.remove('show');
                element.classList.add('hide');
            } else if (step.type === 'color') {
                element.style.transitionDuration = `${step.duration}ms`;
                element.style.backgroundColor = `rgb(${step.red}, ${step.green}, ${step.blue})`;
            }
        }

        function run() {
            if (isStopped) {
                return;
            }

            let delay = 0;

<<<<<<< HEAD
            for (const step of steps) {
                const timerId = setTimeout(() => {
                    if (isStopped) {
                        return;
=======
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
                    else if (step.type === 'color') {
                        element.style.transitionDuration = `${step.duration}ms`;
                        element.style.transitionProperty = 'background-color';
                        element.style.backgroundColor = step.color;
>>>>>>> 319dc14 (added color)
                    }

                    applyStep(step);
                }, delay);

                timers.push(timerId);
                delay += step.duration;
            }

            if (cycled) {
                const cycleTimerId = setTimeout(() => {
                    run();
                }, delay);

                timers.push(cycleTimerId);
            }
        }

        run();

        const controller = {
            stop() {
                isStopped = true;
                timers.forEach((timerId) => clearTimeout(timerId));
            },

            reset() {
                this.stop();
                element.style.transitionDuration = initialState.transitionDuration;
                element.style.transform = initialState.transform;
                element.style.backgroundColor = initialState.backgroundColor;
                element.className = initialState.className;
            }
        };

        _steps.length = 0;

        return controller;
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
<<<<<<< HEAD

    function colorChanging(element, duration) {
        return animaster()
            .addColor(duration / 2, 255, 0, 0)
            .addColor(duration / 2, 0, 0, 255)
=======
    function colorChanging(element, duration) {
        return animaster()
            .addMove(duration, {x:50,y:0})
            .addColor(duration,255,0,0)

            .addMove(duration, {x:50,y:50})
            .addColor(duration,0,255,0)

            .addMove(duration, {x:0,y:50})
            .addColor(duration,0,0,255)

            .addMove(duration, {x:0,y:0})
            .addColor(duration,255,255,0)

>>>>>>> 319dc14 (added color)
            .play(element, true);
    }

    return {
        addMove,
        addScale,
        addFadeIn,
        addFadeOut,
        addDelay,
        addColor,
        play,
        move,
        scale,
        fadeIn,
        fadeOut,
        moveAndHide,
        showAndHide,
        heartBeating,
        colorChanging,
        addColor
    };
}

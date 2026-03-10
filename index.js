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

            for (const step of steps) {
                const timerId = setTimeout(() => {
                    if (isStopped) {
                        return;
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

        return {
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

    function colorChanging(element, duration) {
        return animaster()
            .addColor(duration / 2, 255, 0, 0)
            .addColor(duration / 2, 0, 0, 255)
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
        colorChanging
    };
}
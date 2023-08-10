$(document).ready(function () {
    const area = $('.arrow');
    const arrow = $('#arrowObj');
    const bow = $('#bow');
    const bubbles = [$('.bubble'), $('.bubble1'), $('.bubble2')];
    let xAxis = 0;
    let yAxis = 0;

    setInterval(createBubbles, 2000);
    area.on('mousemove', bowArrowMove);

    area.on('click', function () {
        area.off('mousemove');
        const intervalId = setInterval(() => {
            const hit = checkHit();
            if (hit) {
                clearInterval(intervalId);
            }
        });
        arrow.animate({ left: '1050px' }, 1000, function () {
            arrow.css({ left: xAxis + 99, top: yAxis + 56 });
            area.on('mousemove', bowArrowMove);
        });
    });

    function checkHit() {
        bow.css({ left: xAxis, top: yAxis });
    
        const movingArrow = $('.movingArrow');
        let hit = false;
    
        for (const bubble of bubbles) {
            if (
                movingArrow.offset().left + movingArrow.width() >= bubble.offset().left &&
                movingArrow.offset().left <= bubble.offset().left + bubble.width()
            ) {
                if (
                    movingArrow.offset().top >= bubble.offset().top &&
                    movingArrow.offset().top <= bubble.offset().top + bubble.height()
                ) {
                    bubble.hide();
                    hit = true; // Indicate that at least one bubble was hit
                }
            } else if (movingArrow.offset().left + movingArrow.width() > bubble.offset().left + bubble.width()) {
                hit = true; // Indicate that the arrow has moved beyond this bubble
            }
        }
    
        return hit;
    }
    
    function bowArrowMove(event) {
        xAxis = event.pageX - 40;
        yAxis = event.pageY;
        bow.css({ left: xAxis, top: yAxis });
        arrow.css({ left: xAxis + 99, top: yAxis + 56 });
    }

    function createBubbles() {
        const positions = [400, 600, 800];
        bubbles.forEach((bubble, index) => {
            const p = positions[index];
            bubble.css({
                left: `${p}px`,
                top: `${p - 200}px`,
            });
            bubble.animate({ top: '50px' }, p * 5).animate({ top: `${p - 200}px` }, p * 10);
        });
    }
});

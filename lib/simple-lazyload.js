(function (window) {
    var images = Array.prototype.slice.call(document.querySelectorAll('img[data-original]'));
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    function elementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight));
    }

    function processImages() {
        for (var i = 0, len = images.length; i < len; i++) {
            if (elementInViewport(images[i])) {
                images[i].src = images[i].getAttribute('data-original');
                images[i].onload = function (e) {
                    var target = e.target || e.path[0];
                    if (target.width > windowWidth / 2) {
                        if (windowWidth <= 768) {
                            target.style.maxWidth = '100%';
                        } else {
                            target.style.maxWidth = '50%';
                        }
                    }
                }
                images.splice(i, 1);
                len = images.length;
                i--;
            }
        }
    }

    function throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(context);
        }, 500);
    }

    processImages();

    window.addEventListener('scroll', function () {
        throttle(processImages, window);
    }, false);

})(this)

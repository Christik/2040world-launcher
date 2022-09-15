/*===============================
  Parallax
  ===============================*/

const bgForestElement = document.querySelector('.page-bg');
const gabyElement = document.querySelector('.gaby');

if (bgForestElement) {
    mouseParallax(bgForestElement, 20, 0);
}

if (gabyElement) {
    mouseParallax(gabyElement, 50, 0);
}

function mouseParallax(obj, x, y) {
    if (!document.body.classList.contains('is-error')) {
        document.body.addEventListener('mousemove', (evt) => {
            obj.style.marginTop =  `${evt.pageY/y}px`;
            obj.style.marginLeft =  `${evt.pageX/x}px`;
        });
    }
}

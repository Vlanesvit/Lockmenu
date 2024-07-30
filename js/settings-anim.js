/*
Документация: 
https://gsap.com/
https://gsap.com/docs/v3/Plugins/ScrollTrigger/
https://gsap.com/docs/v3/Plugins/ScrollToPlugin
*/

gsap.registerPlugin(
	ScrollTrigger,
	// drawSVGPlugin,
);
// console.clear();

window.addEventListener('load', function () {
	setTimeout(() => {
		ScrollTrigger.refresh();
		breakpointGsapAnimChecker();
		window.scrollTo(0, 0);
	}, 100);
})

//========================================================================================================================================================
/* REVEAL ANIMATION */
function showContentOnScroll(elem, duration, delay, direction) {
	if (document.querySelectorAll(elem)) {
		const elems = gsap.utils.toArray(elem);
		elems.forEach((item, i) => {
			let anim;

			switch (true) {
				case direction === 'bottom-up':
					anim = gsap.fromTo(item, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay, duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'right-left':
					anim = gsap.fromTo(item, { autoAlpha: 0, x: 50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay, duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'up-bottom':
					anim = gsap.fromTo(item, { autoAlpha: 0, y: -50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay, duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'left-right':
					anim = gsap.fromTo(item, { autoAlpha: 0, x: -50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay, duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'fade':
					anim = gsap.fromTo(item, { autoAlpha: 0 }, { autoAlpha: 1, delay: delay, duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'scale':
					anim = gsap.fromTo(item, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, delay: delay, duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'bottom-up--every':
					anim = gsap.fromTo(item, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay * (i + 1), duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'right-left--every':
					anim = gsap.fromTo(item, { autoAlpha: 0, x: 50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay * (i + 1), duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'up-bottom--every':
					anim = gsap.fromTo(item, { autoAlpha: 0, y: -50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay * (i + 1), duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'left-right--every':
					anim = gsap.fromTo(item, { autoAlpha: 0, x: -50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay * (i + 1), duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'fade--every':
					anim = gsap.fromTo(item, { autoAlpha: 0 }, { autoAlpha: 1, delay: delay * (i + 1), duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'scale--every':
					anim = gsap.fromTo(item, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, delay: delay * (i + 1), duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'width-100':
					anim = gsap.fromTo(item, { width: 0 + '%' }, { width: 100 + '%', delay: delay, duration: duration, ease: 'cubic-1', });
					break;

				default:
					break;
			}

			ScrollTrigger.create({
				trigger: item,
				animation: anim,
				once: true,
				// scrub: true,
				// markers: 1,

				onEnter: () => function () { },
				onLeave: () => function () { },
				onEnterBack: () => function () { },
				onLeaveBack: () => function () { },
			});
		});
	}
}

function strokeTextAnimation(elem) {
	const text = document.querySelector(elem);
	const lines = text.innerHTML.split("<br>");
	text.innerHTML = lines.map(line => `<div class="line">${line.trim()}</div>`).join("");
	gsap.to(".line", {
		duration: 1,
		opacity: 1,
		y: 0,
		stagger: 0.5,
		ease: "power2.out",
		visibility: "visible",
		startAt: { y: 50, opacity: 0 }
	});
}

//========================================================================================================================================================
function animDesktop() {
	gsap.utils.toArray('.rs-features__block').forEach(card => {
		gsap.from(card, {
			scrollTrigger: {
				trigger: '.rs-features',
				start: "top-=30% top",
				end: "bottom+=30% bottom",
				scrub: true,
				// markers: 1
			},
			y: 500,
		});
	});
}

function animMobile() {
}

function animCommon() {
	/* REVEAL ANIMATION */
	showContentOnScroll('section .section-header', 0.5, 0.1, 'bottom-up');

	// showContentOnScroll('.rs-banner__text', 0.5, 0, 'scale');
	// showContentOnScroll('.rs-banner__text h1', 0.5, 0.3, 'bottom-up');
	strokeTextAnimation('.rs-banner__text h1');
	showContentOnScroll('.rs-banner__text h5', 0.5, 0.6, 'bottom-up');
	showContentOnScroll('.rs-banner__img', 0.5, 1, 'bottom-up');
	showContentOnScroll('.rs-banner__links', 0.5, 1.5, 'right-left');

	showContentOnScroll('.rs-features__img', 0.5, 0.5, 'right-left');

	showContentOnScroll('.rs-about__item', 0.5, 0.1, 'bottom-up--every');

	showContentOnScroll('.rs-function__item', 0.5, 0.1, 'bottom-up--every');

	showContentOnScroll('.rs-tariff__item', 0.5, 0.1, 'bottom-up--every');
	showContentOnScroll('.rs-tariff__logo', 0.5, 0.1, 'bottom-up');

	showContentOnScroll('.rs-faq__spollers_item', 0.5, 0.1, 'bottom-up--every');
}

// Проверка ширины экрана для вызова отдельных анимаций
const breakpoint = window.matchMedia('(min-width: 991.98px)');
const breakpointGsapAnimChecker = function () {

	animCommon()
	if (breakpoint.matches === true) {
		return animDesktop();
	} else if (breakpoint.matches === false) {
		return animMobile();
	}
};
breakpoint.addListener(breakpointGsapAnimChecker);
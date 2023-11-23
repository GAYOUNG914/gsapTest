gsap.registerPlugin(ScrollTrigger);

(function() {
	const $wrap = document.getElementById('wrap');

	let scroller;
	if (location.search.indexOf('scroller') > -1) {
		scroller = window._scroller($wrap);
	}


	window.addEventListener('load', function() {

		// gsap animation
		const $sectionGsap = $wrap.querySelector('.section-gsap');
		gsap.to($sectionGsap.querySelector('.box'), {
			rotation: 360,
			scale: 2,
			backgroundColor: '#f60',
			ease: 'cubic.inOut',
			scrollTrigger: {
				trigger: $sectionGsap,
				start: 'top top',
				end: 'bottom bottom',
				scrub: true,
				// markers: true,
				id: 'section-gsap',
				// onUpdate: function(self) {
				// 	console.log(self);
				// }
			}
		});


		// timeline
		const $sectionTimeline = $wrap.querySelector('.section-timeline');
		const $sectionTimelineBoxes = $sectionTimeline.querySelectorAll('.box');
		gsap.set($sectionTimelineBoxes[0], {x: -100, lineHeight: 0});
		gsap.set($sectionTimelineBoxes[1], {x: 100});

		const timeline = gsap.timeline({paused: true});
		timeline.to($sectionTimelineBoxes[0], {x: 0, duration: 1, ease: 'cubic.out'});
		timeline.to($sectionTimelineBoxes[1], {x: 0, duration: 1, ease: 'cubic.out'}, 0);
		timeline.to($sectionTimelineBoxes[0], {x: 100, rotation: 180, duration: 1, ease: 'back.out(2)'});
		timeline.to($sectionTimelineBoxes[0], {borderRadius: '50%', backgroundColor: '#05d', duration: 1, ease: 'cubic.out'}, 1);
		timeline.to($sectionTimelineBoxes[1], {x: -100, rotation: -180, duration: 1, ease: 'back.out(2)'}, 1);
		timeline.to($sectionTimelineBoxes[1], {borderRadius: '50%', backgroundColor: '#5d0', duration: 1, ease: 'cubic.out'}, 1);
		timeline.fromTo($sectionTimelineBoxes[0], {lineHeight: 0}, {lineHeight: 100, duration: 1, ease: 'cubic.out', onUpdate: function() {
			const progress = $sectionTimelineBoxes[0].style.lineHeight / 100;
			const angle = -Math.PI / 2;
			gsap.set($sectionTimelineBoxes[0], {
				x: Math.cos(progress * angle) * 100,
				y: Math.sin(progress * angle) * 100
			});
			gsap.set($sectionTimelineBoxes[1], {
				x: Math.cos(progress * angle + Math.PI) * 100,
				y: Math.sin(progress * angle + Math.PI) * 100
			});
		}});
		timeline.to($sectionTimelineBoxes[0], {y: 0, opacity: 0.5, duration: 1, ease: 'cubic.out'}, 'endFrame');
		timeline.to($sectionTimelineBoxes[1], {y: 0, opacity: 0.5, duration: 1, ease: 'cubic.out'}, 'endFrame');
		ScrollTrigger.create({
			animation: timeline,
			trigger: $sectionTimeline,
			scrub: 1,
			start: 'top top',
			end: 'bottom bottom',
			// onUpdate: function(self) {
			// 	animation.goToAndStop(self.progress * (animation.totalFrames - 1), true);
			// }
		});


		// lottie
		const $sectionLottie = $wrap.querySelector('.section-lottie');
		const animation = lottie.loadAnimation({
			container: $sectionLottie.querySelector('.sticky'),
			path: './resources/125505-animation-success-back.json',
			renderer: 'svg',
			loop: false,
			autoplay: false
		});
		ScrollTrigger.create({
			trigger: $sectionLottie,
			scrub: 2,
			start: 'top top',
			end: 'bottom bottom',
			onUpdate: function(self) {
				animation.goToAndStop(self.progress * (animation.totalFrames - 1), true);
			}
		});


		// horizontal scroll
		const $sectionHorizontal = $wrap.querySelector('.section-horizontal');
		const $sectionHorizontalInwrap = $sectionHorizontal.querySelector('.inwrap');
		const sectionHorizontalInwrapMoveValue = $sectionHorizontal.querySelector('.inwrap').scrollWidth - $wrap.offsetWidth;
		$sectionHorizontal.style.height = window.innerHeight + sectionHorizontalInwrapMoveValue + 'px';
		gsap.to($sectionHorizontalInwrap, {
			x: -sectionHorizontalInwrapMoveValue,
			ease: 'linear',
			scrollTrigger: {
				trigger: $sectionHorizontal,
				start: 'top top',
				end: 'bottom bottom',
				scrub: true,
				// markers: true,
				id: 'section-horizontal',
				// onUpdate: function(self) {
				// 	console.log(self);
				// }
			}
		});
	});


	// var stats = new Stats();
	// document.body.appendChild(stats.dom);
	// gsap.ticker.add(function() {
	// 	stats.update();
	// });
})();
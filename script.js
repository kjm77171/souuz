document.addEventListener('DOMContentLoaded', () => {
    /* ===========================
       PROJECT SLIDER
    =========================== */
    const slides = [...document.querySelectorAll('.slide')];
    const current = document.querySelector('.current');
    const title = document.querySelector('.project-info h1');
    const locationText = document.querySelector('.location');

    let activeIndex = 0;
    let autoPlay = null;

    function showSlide(index){
        if(!slides.length) return;
        activeIndex =             (index + slides.length) % slides.length;

        slides.forEach((slide,i)=>{
            slide.classList.toggle(
                'is-active',
                i === activeIndex
            );
        });

        const active = slides[activeIndex];

        if(current){
            current.textContent = String(activeIndex + 1).padStart(2,'0');
        }

        if(title){
            title.textContent = active.dataset.title || '';
        }

        if(locationText){
            locationText.textContent = active.dataset.location || '';
        }
    }

    function restartAutoPlay(){
        if(!slides.length) return;

        clearInterval(autoPlay);

        autoPlay = setInterval(()=>{
            showSlide(activeIndex + 1);
        },6000);
    }

    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    if(nextButton){
        nextButton.addEventListener('click', ()=>{
                showSlide(activeIndex + 1);
                restartAutoPlay();
        });
    }

    if(prevButton){
        prevButton.addEventListener('click', ()=>{
                showSlide(activeIndex - 1);
                restartAutoPlay();
        });
    }

    const total = document.querySelector('.total');

    if(total){
        total.textContent = String(slides.length).padStart(2,'0');
    }

    if(slides.length){
        restartAutoPlay();
    }

    /* ===========================
       MOBILE MENU
    =========================== */
    const menuButton = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.main-nav');

    if(menuButton && menu){
        menuButton.addEventListener('click', ()=>{
			const isOpen = menuButton.getAttribute('aria-expanded') === "true";

			menuButton.setAttribute(
				'aria-expanded',
				String(!isOpen)
			);

			menu.classList.toggle(
				'is-open',
				!isOpen
			);
		});

        menu.addEventListener('click', (event)=>{
	        if(event.target.closest("a")){
				menuButton.setAttribute(
					'aria-expanded',
					'false'
				);

				menu.classList.remove(
					"is-open"
				);
            }
        });
    }

    /* ===========================
       KEYBOARD
    =========================== */
    document.addEventListener('keydown', (event)=>{

		if(event.key==='ArrowRight' && slides.length){
			showSlide(activeIndex+1);
			restartAutoPlay();
		}

		if(event.key==='ArrowLeft' && slides.length){
			showSlide(activeIndex-1);
			restartAutoPlay();
		}

		if(event.key==='Escape' && menuButton && menu){
			menuButton.setAttribute(
				'aria-expanded',
				'false'
			);

			menu.classList.remove(
				"is-open"
			);
		}
	});
});
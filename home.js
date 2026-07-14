    "use strict";

/*=========================================================
  HOME PAGE
=========================================================*/

const Home = {

    /*=========================================
      INITIALIZER
    =========================================*/

    init(){

        HeroSlider.init();

    }

};

/*=========================================================
  HERO SLIDER
=========================================================*/

const HeroSlider = {

    current:0,

    interval:null,

    autoplay:5000,

    slides:[],

    dots:[],

    slider:null,

    init(){

        this.slider=document.querySelector(".hero-slider");

        if(!this.slider) return;

        this.slides=[

            ...document.querySelectorAll(".hero-slide")

        ];

        this.dots=[

            ...document.querySelectorAll(".dot")

        ];

        this.prevButton=document.querySelector(".slider-btn.prev");

        this.nextButton=document.querySelector(".slider-btn.next");

        if(this.slides.length===0) return;

        this.show(0);

        this.events();

        this.start();

    },

    /*=========================================
      SHOW SLIDE
    =========================================*/

    show(index){

        this.current=index;

        this.slides.forEach((slide,i)=>{

            slide.classList.toggle(

                "active",

                i===index

            );

        });

        this.dots.forEach((dot,i)=>{

            dot.classList.toggle(

                "active",

                i===index

            );

        });

    },

    /*=========================================
      NEXT
    =========================================*/

    next(){

        this.current++;

        if(this.current>=this.slides.length){

            this.current=0;

        }

        this.show(this.current);

    },

    /*=========================================
      PREVIOUS
    =========================================*/

    previous(){

        this.current--;

        if(this.current<0){

            this.current=this.slides.length-1;

        }

        this.show(this.current);

    },

    /*=========================================
      AUTOPLAY
    =========================================*/

    start(){

        this.stop();

        this.interval=setInterval(()=>{

            this.next();

        },this.autoplay);

    },

    stop(){

        clearInterval(this.interval);

    },

    /*=========================================
      EVENTS
    =========================================*/

    events(){

        this.prevButton?.addEventListener("click",()=>{

            this.previous();

            this.start();

        });

        this.nextButton?.addEventListener("click",()=>{

            this.next();

            this.start();

        });

        this.dots.forEach((dot,index)=>{

            dot.addEventListener("click",()=>{

                this.show(index);

                this.start();

            });

        });

        this.slider.addEventListener("mouseenter",()=>{

            this.stop();

        });

        this.slider.addEventListener("mouseleave",()=>{

            this.start();

        });

    }

};

/*=========================================================
  START HOME
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Home.init();

    }

);

/*=========================================================
  REVEAL ANIMATION
=========================================================*/


/*=========================================================
  COUNTER
=========================================================*/

const Counter = {

    init(){

        const counters = document.querySelectorAll(".counter");

        if(!counters.length) return;

        const observer = new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                this.animate(entry.target);

                observer.unobserve(entry.target);

            });

        },{

            threshold:0.5

        });

        counters.forEach(counter=>{

            observer.observe(counter);

        });

    },

    animate(counter){

        const target = Number(counter.dataset.target);

        const suffix = counter.dataset.suffix || "";

        let current = 0;

        const increment = Math.ceil(target / 80);

        const update = ()=>{

            current += increment;

            if(current >= target){

                counter.textContent = target + suffix;

                return;

            }

            counter.textContent = current + suffix;

            requestAnimationFrame(update);

        };

        update();

    }

};

/*=========================================================
  CONTACT FORM
=========================================================*/

const Contact = {

    init(){

        const form = document.getElementById("contactForm");

        if(!form) return;

        form.addEventListener("submit",(event)=>{

            event.preventDefault();

            const name = document.getElementById("fullname")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const subject = document.getElementById("subject")?.value.trim();
            const message = document.getElementById("message")?.value.trim();

            if(!name || !email || !subject || !message){

                if(typeof showToast === "function"){

                    showToast(
                        "Incomplete Form",
                        "Please complete all required fields.",
                        "error"
                    );

                }

                return;

            }

            if(typeof showToast === "function"){

                showToast(
                    "Message Sent",
                    "Thank you! Your message has been received.",
                    "success"
                );

            }

            form.reset();

        });

    }

};

/*=========================================================
  HOME INITIALIZATION
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    Home.init();

    Reveal.init();

    Counter.init();

    Contact.init();

});
"use strict";

/*=========================================================
  ABOUT PAGE
=========================================================*/

const About = {

    init(){

        Timeline.init();

        Partners.init();

        CTA.init();

    }

};

/*=========================================================
  TIMELINE
=========================================================*/

const Timeline = {

    init(){

        const items = document.querySelectorAll(".timeline-item");

        if(!items.length) return;

        const observer = new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },{

            threshold:0.25

        });

        items.forEach(item=>{

            observer.observe(item);

        });

    }

};

/*=========================================================
  PARTNER LOGOS
=========================================================*/

const Partners = {

    init(){

        const cards = document.querySelectorAll(".partner-card");

        if(!cards.length) return;

        const observer = new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                cards.forEach((card,index)=>{

                    setTimeout(()=>{

                        card.classList.add("active");

                    },index*150);

                });

                observer.disconnect();

            });

        },{

            threshold:0.3

        });

        observer.observe(cards[0]);

    }

};

/*=========================================================
  CTA
=========================================================*/

const CTA = {

    init(){

        const buttons = document.querySelectorAll(".about-cta .btn");

        if(!buttons.length) return;

        buttons.forEach(button=>{

            button.addEventListener("mouseenter",()=>{

                button.style.transform="translateY(-5px)";

            });

            button.addEventListener("mouseleave",()=>{

                button.style.transform="";

            });

        });

    }

};

/*=========================================================
  START
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    About.init();

});
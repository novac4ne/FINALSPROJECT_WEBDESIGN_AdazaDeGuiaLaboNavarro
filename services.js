"use strict";

/*=========================================================
  SERVICES PAGE
=========================================================*/

const Services = {

    init(){

        FAQ.init();

        Registration.init();

    }

};

/*=========================================================
  FAQ ACCORDION
=========================================================*/

const FAQ = {

    init(){

        const items = document.querySelectorAll(".faq-item");

        if(!items.length) return;

        items.forEach(item=>{

            const question = item.querySelector(".faq-question");

            if(!question) return;

            question.addEventListener("click",()=>{

                items.forEach(other=>{

                    if(other!==item){

                        other.classList.remove("active");

                    }

                });

                item.classList.toggle("active");

            });

        });

    }

};

/*=========================================================
  REGISTRATION SECTION
=========================================================*/

const Registration = {

    init(){

        const cards = document.querySelectorAll(".process-card");

        if(!cards.length) return;

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

        cards.forEach(card=>{

            observer.observe(card);

        });

    }

};

/*=========================================================
  START SERVICES
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    Services.init();

});
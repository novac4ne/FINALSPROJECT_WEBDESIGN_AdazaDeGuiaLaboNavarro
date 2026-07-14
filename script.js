"use strict";

/*=========================================================
  PNVSCA WEBSITE
  Global Script
=========================================================*/

const App = {

    /*=========================================
      DOM CACHE
    =========================================*/

    dom:{

        body:document.body,

        loader:document.querySelector(".loader"),

        navbar:document.querySelector(".navbar"),

        progress:document.querySelector(".scroll-progress"),

        scrollTop:document.getElementById("scrollTop"),

        themeToggle:document.getElementById("themeToggle"),

        menuToggle:document.getElementById("menuToggle"),

        closeMenu:document.getElementById("closeMenu"),

        mobileMenu:document.querySelector(".mobile-menu"),

        mobileOverlay:document.querySelector(".mobile-overlay"),

        pstClock:document.getElementById("pstClock"),

        pstDate:document.getElementById("pstDate"),

        toast:document.getElementById("toast"),

        toastTitle:document.getElementById("toastTitle"),

        toastMessage:document.getElementById("toastMessage")

    },

    /*=========================================
      CONFIGURATION
    =========================================*/

    config:{

        scrollOffset:120,

        toastDuration:3500

    },

    /*=========================================
      UTILITIES
    =========================================*/

    qs(selector,parent=document){

        return parent.querySelector(selector);

    },

    qsa(selector,parent=document){

        return [...parent.querySelectorAll(selector)];

    },

    has(element){

        return element !== null;

    },

    on(element,event,callback){

        if(!element) return;

        element.addEventListener(event,callback);

    },

    addClass(element,className){

        if(!element) return;

        element.classList.add(className);

    },

    removeClass(element,className){

        if(!element) return;

        element.classList.remove(className);

    },

    toggleClass(element,className){

        if(!element) return;

        element.classList.toggle(className);

    },

    /*=========================================
      INITIALIZER
    =========================================*/

    init(){

        Loader.init();

        Navigation.init();

        Theme.init();

        Scroll.init();

        Clock.init();

    }

};

/*=========================================================
  LOADER
=========================================================*/

const Loader={

    init(){

        const loader=App.dom.loader;

        if(!loader) return;

        window.addEventListener("load",()=>{

            loader.classList.add("hidden");

            setTimeout(()=>{

                loader.remove();

            },800);

        });

    }

};

/*=========================================================
  SCROLL FEATURES
=========================================================*/

const Scroll={

    init(){

        this.progress();

        this.scrollButton();

    },

    progress(){

        const progress=App.dom.progress;

        if(!progress) return;

        window.addEventListener("scroll",()=>{

            const scrollTop=window.scrollY;

            const height=document.documentElement.scrollHeight-window.innerHeight;

            const percent=(scrollTop/height)*100;

            progress.style.width=`${percent}%`;

        });

    },

    scrollButton(){

        const button=App.dom.scrollTop;

        if(!button) return;

        window.addEventListener("scroll",()=>{

            if(window.scrollY>500){

                button.classList.add("show");

            }

            else{

                button.classList.remove("show");

            }

        });

        button.addEventListener("click",()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    }

};

/*=========================================================
  NAVIGATION
=========================================================*/

const Navigation={

    init(){

        this.mobileMenu();

        this.navbarScroll();

    },

    mobileMenu(){

        const{

            menuToggle,
            closeMenu,
            mobileMenu,
            mobileOverlay

        }=App.dom;

        if(!menuToggle||!mobileMenu||!mobileOverlay) return;

        const openMenu=()=>{

            mobileMenu.classList.add("active");

            mobileOverlay.classList.add("active");

            document.body.style.overflow="hidden";

        };

        const close=()=>{

            mobileMenu.classList.remove("active");

            mobileOverlay.classList.remove("active");

            document.body.style.overflow="";

        };

        App.on(menuToggle,"click",openMenu);

        App.on(closeMenu,"click",close);

        App.on(mobileOverlay,"click",close);

        document.addEventListener("keydown",(event)=>{

            if(event.key==="Escape"){

                close();

            }

        });

    },

    navbarScroll(){

        const navbar=App.dom.navbar;

        if(!navbar) return;

        window.addEventListener("scroll",()=>{

            navbar.classList.toggle(

                "scrolled",

                window.scrollY>50

            );

        });

    }

};

/*=========================================================
  THEME
=========================================================*/

const Theme={

    init(){

        const button=App.dom.themeToggle;

        if(!button) return;

        const savedTheme=

            localStorage.getItem("theme");

        if(savedTheme==="dark"){

            document.body.classList.add("dark-mode");

            this.updateIcon(true);

        }

        App.on(button,"click",()=>{

            document.body.classList.toggle("dark-mode");

            const dark=

                document.body.classList.contains("dark-mode");

            localStorage.setItem(

                "theme",

                dark?"dark":"light"

            );

            this.updateIcon(dark);

        });

    },

    updateIcon(isDark){

        const icon=

            App.dom.themeToggle?.querySelector("i");

        if(!icon) return;

        icon.className=isDark

        ? "bi bi-sun-fill"

        : "bi bi-moon-stars-fill";

    }

};

/*=========================================================
  PHILIPPINE STANDARD TIME
=========================================================*/

const Clock={

    init(){

        if(!App.dom.pstClock||!App.dom.pstDate) return;

        this.update();

        setInterval(()=>{

            this.update();

        },1000);

    },

    update(){

        const now=new Date();

        App.dom.pstClock.textContent=

            now.toLocaleTimeString("en-PH",{

                hour:"2-digit",

                minute:"2-digit",

                second:"2-digit",

                hour12:true

            });

        App.dom.pstDate.textContent=

            now.toLocaleDateString("en-PH",{

                weekday:"long",

                year:"numeric",

                month:"long",

                day:"numeric"

            });

    }

};

/*=========================================================
  APPLICATION
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        App.init();
        {
            Reveal.init();
        }

    }

);

const Reveal = {

    init(){

        const elements = document.querySelectorAll(".reveal");

        if(!elements.length) return;

        const observer = new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },{

            threshold:0.15

        });

        elements.forEach(element=>{

            observer.observe(element);

        });

    }

};

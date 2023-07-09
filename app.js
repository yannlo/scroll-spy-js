import { debounce } from "./functions/delay.js";

class ScrollSpy {


    #ratio = 0.6;

    #windowH;

    /** @type {IntersectionObserver} */
    #observer = null

    /** @type {HTMLElement[]} */
    #spied;

    /**
     * 
     * @param {HTMLElement[]} spied
     */
    constructor(spied) {
        this.#spied = spied;
        this.#startObservation()

        this.#windowH = window.innerHeight;
        window.addEventListener('resize', debounce(
            () =>  this.#windowH !== window.innerHeight ? this.#startObservation(): null,
            500
        ))
        
    }


    #startObservation = () => {
        if(this.#observer !== null){
            this.#observer.disconnect();
        }
        const y = Math.round(window.innerHeight * this.#ratio)
        this.#observer = new IntersectionObserver(this.#scrollSpy, {
            rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`,
        })

        this.#spied.forEach(spy => {
            this.#observer.observe(spy)
        });
    }

    /**
     * 
     * @param {HTMLElement} link 
     */
    #active = (link) =>{
        link
        .parentElement
        .querySelector('.active')?.classList
        .remove("active");
        link.classList.add('active')
    }

    /**
     * 
     * @param {IntersectionObserverEntry[]} entries 
     */
    #scrollSpy = (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                this.#active(
                    document
                        .querySelector(
                            `nav a[href="#${entry.target.getAttribute('id')}"]`
                        )
                )
            }
        }
    }
}



const spies = document.querySelectorAll('[data-spy]')
if(spies.length > 0){
    new ScrollSpy(spies)
}














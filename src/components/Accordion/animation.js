import gsap from "gsap"

export const accordionAnimation = {
    content: {
        open: {
            height: "auto",
            opacity: 1,
            transition: {
                height: {
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                },
                opacity: {
                    duration: 0.4,
                    delay: 0.1,
                },
            },
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: {
                height: {
                    duration: 0.4,
                    ease: [0.33, 0, 0.67, 0],
                },
                opacity: {
                    duration: 0.25,
                },
            },
        },
    },

    staggerChildren: {
        open: {
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.1,
            },
        },
        closed: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    },

    contentItem: {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.4, ease: "easeOut" },
            },
        },
        closed: {
            y: 20,
            opacity: 0,
            transition: {
                y: { duration: 0.3, ease: "easeIn" },
                opacity: { duration: 0.3, ease: "easeIn" },
            },
        },
    },

    headerHover: {
        rest: {
            scale: 1,
            transition: { duration: 0.2, ease: "easeOut" },
        },
        hover: {
            scale: 1.01,
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        },
    },

    numberIndicator: {
        rest: {
            x: 0,
            transition: { duration: 0.2, ease: "easeOut" },
        },
        hover: {
            x: -5,
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        },
        active: {
            x: -8,
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        },
    },

    scrollReveal: {
        initial: {
            y: 30,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    },
}

// Locomotive Scroll integration (to be called from a parent component or useEffect)
export const initLocomotiveScrollAnimation = (locomotiveScroll, accordionRef) => {
    if (!locomotiveScroll || !accordionRef.current) return

    const updateScroll = () => {
        requestAnimationFrame(() => {
            locomotiveScroll.update()
        })
    }

    let timeout
    locomotiveScroll.on("scroll", () => {
        clearTimeout(timeout)
        timeout = setTimeout(updateScroll, 50)
    })

    const items = accordionRef.current.querySelectorAll(".accordionItem")
    items.forEach((item, index) => {
        locomotiveScroll.registerEffect(item, {
            speed: 0.95 - index * 0.05,
            lerp: 0.08,
            translate: { y: 15 },
            opacity: [0.8, 1],
            repeat: false,
        })
    })

    const headers = accordionRef.current.querySelectorAll(".accordionHeader")
    headers.forEach((header) => {
        locomotiveScroll.registerTrigger(header, {
            start: "top 80%",
            end: "bottom 20%",
            onEnter: (el) => {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.1,
                })
            },
            onLeave: (el) => {
                gsap.to(el, {
                    opacity: 0.7,
                    duration: 0.4,
                })
            },
        })
    })

    return {
        update: updateScroll,
    }
}

// GSAP content reveal animation
export const gsapContentReveal = (element, isOpen) => {
    if (!element) return

    if (isOpen) {
        return gsap.timeline().fromTo(
            element.querySelectorAll("p, .dateContainer"),
            {
                opacity: 0,
                y: 15,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
                clearProps: "all",
            }
        )
    } else {
        return gsap.timeline().to(element.querySelectorAll("p, .dateContainer"), {
            opacity: 0,
            y: -10,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in",
        })
    }
}

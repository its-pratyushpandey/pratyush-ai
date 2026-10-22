export const opacity = {
    initial: {
        opacity: 0,
        y: 12
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
    },
    exit: {
        opacity: 0,
        y: -16,
        transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] }
    }
};

export const slideUp = {
    initial: {
        top: 0
    },
    exit: {
        top: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
};

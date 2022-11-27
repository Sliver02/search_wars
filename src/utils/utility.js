export const getId = (string) => {
    if (!!string) {
        return string.replace(/[^0-9]/g, '');
    }
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const createRefs = (ref, panel, index) => {
    ref.current[index] = panel;
};

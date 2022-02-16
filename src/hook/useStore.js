import create from 'zustand';

const useStore = create(set => ({
    slideIndex: 0,
    nextPage: () => set(state => ({ slideIndex: state.slideIndex + 1 })),
    prevPage: () => set(state => ({ slideIndex: state.slideIndex - 1 })),
    setPage: (pageIndex) => set(state => ({ slideIndex: pageIndex })),

    cursorRef: null,
    setCursorRef: (ref) => set(state => ({ cursorRef: ref })),
}));

export default useStore;
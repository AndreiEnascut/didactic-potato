import debounce from 'lodash.debounce';
import Vue from 'vue';

export const Events = {
    WINDOW_RESIZE: "window-resize",
    REVIEW_SUBMITTED:"review-submitted"
}

export const EventBus = new Vue({
    created: () => {
        window.addEventListener("resize", debounce(() => EventBus.$emit(Events.WINDOW_RESIZE), 200));
    }
})



import {Directive} from "vue";

export type EventCallbackType = (event: Event) => void;

export interface IClickedOutsideElement extends HTMLElement {
    clickOutsideEvent: EventCallbackType,
};

const clickOutside: Directive<IClickedOutsideElement, EventCallbackType> = {
    beforeMount(el, binding): void {
        el.clickOutsideEvent = function (event: Event): void {
            const target = event.target as HTMLElement;

            if (!(el === target || el.contains(target))) {
                binding.value(event);
            }
        }

        document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el: IClickedOutsideElement): void {
        document.removeEventListener('click', el.clickOutsideEvent);
    },
};

export default clickOutside;
import {describe, it, expect, vi} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import {SettingsModal} from "../SettingsModal";
import type {LayoutDirection} from "../../utils/dagreLayout";
import type {Metric} from "@sdr/shared";

function renderModal(over: Partial<React.ComponentProps<typeof SettingsModal>> = {}): {
  onChange: ReturnType<typeof vi.fn>; onChangeMetric: ReturnType<typeof vi.fn>; onClose: ReturnType<typeof vi.fn>;
} {
    const onChange = vi.fn();
    const onChangeMetric = vi.fn();
    const onClose = vi.fn();
    render(
        <SettingsModal
            open
            layoutDirection={"vertical" as LayoutDirection}
            onChangeLayoutDirection={onChange}
            metric={"syllables" as Metric}
            onChangeMetric={onChangeMetric}
            onClose={onClose}
            {...over}
        />,
    );
    return {
        onChange,
        onChangeMetric,
        onClose
    };
}

describe("SettingsModal", () => {
    it("renders nothing when closed", () => {
        const {container} = render(
            <SettingsModal
                open={false}
                layoutDirection="vertical"
                onChangeLayoutDirection={() => {}}
                metric="syllables"
                onChangeMetric={() => {}}
                onClose={() => {}}
            />,
        );
        expect(container).toBeEmptyDOMElement();
    });

    it("opens a labelled dialog, takes focus, and reflects the current direction", () => {
        renderModal();
        const dialog = screen.getByRole("dialog", {name: "Options"});
        expect(dialog).toHaveFocus();
        expect(screen.getByRole("radio", {name: "Vertical"})).toHaveAttribute("aria-checked", "true");
        expect(screen.getByRole("radio", {name: "Horizontal"})).toHaveAttribute("aria-checked", "false");
    });

    it("fires onChangeLayoutDirection when an option is picked", () => {
        const {onChange} = renderModal();
        fireEvent.click(screen.getByRole("radio", {name: "Horizontal"}));
        expect(onChange).toHaveBeenCalledWith("horizontal");
    });

    it("defaults to Syllables and fires onChangeMetric when Characters is picked", () => {
        const {onChangeMetric} = renderModal();
        expect(screen.getByRole("radio", {name: "Syllables"})).toHaveAttribute("aria-checked", "true");
        expect(screen.getByRole("radio", {name: "Characters"})).toHaveAttribute("aria-checked", "false");
        fireEvent.click(screen.getByRole("radio", {name: "Characters"}));
        expect(onChangeMetric).toHaveBeenCalledWith("chars");
    });

    it("closes via the close button", () => {
        const {onClose} = renderModal();
        fireEvent.click(screen.getByRole("button", {name: "Close options"}));
        expect(onClose).toHaveBeenCalled();
    });

    it("closes on Escape but not on other keys", () => {
        const {onClose} = renderModal();
        fireEvent.keyDown(document, {key: "a"});
        expect(onClose).not.toHaveBeenCalled();
        fireEvent.keyDown(document, {key: "Escape"});
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("closes when the backdrop is clicked but not when the dialog body is", () => {
        const {onClose} = renderModal();
        fireEvent.mouseDown(screen.getByRole("dialog")); // inside the modal → no close
        expect(onClose).not.toHaveBeenCalled();
        fireEvent.mouseDown(document.querySelector(".modal-overlay") as HTMLElement); // backdrop → close
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});

import {describe, it, expect, vi} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import {ControlBar} from "../ControlBar";
import type {ScriptMeta} from "@sdr/shared";

const scripts: ScriptMeta[] = [{
    id: "g/e1",
    game: "g",
    episode: "e1",
    nodeCount: 10
}];
const props = (over = {}): React.ComponentProps<typeof ControlBar> => ({
    scripts,
    selectedId: "",
    onSelectScript: (): void => {},
    onTraverse: (): void => {},
    onOpenSettings: (): void => {},
    hasGraph: false,
    ...over,
});

describe("ControlBar", () => {
    it("lists scripts and fires onSelectScript on change", () => {
        const onSelectScript = vi.fn();
        render(<ControlBar {...props({onSelectScript})} />);
        expect(screen.getByRole("option", {name: /g \/ e1 \(10 nodes\)/})).toBeInTheDocument();
        fireEvent.change(screen.getByRole("combobox"), {target: {value: "g/e1"}});
        expect(onSelectScript).toHaveBeenCalledWith("g/e1");
    });

    it("disables the button without a graph, enables and fires onTraverse with one", () => {
        const onTraverse = vi.fn();
        const {rerender} = render(<ControlBar {...props({
            onTraverse,
            hasGraph: false
        })} />);
        expect(screen.getByRole("button", {name: "Find Shortest Path"})).toBeDisabled();
        rerender(<ControlBar {...props({
            onTraverse,
            hasGraph: true
        })} />);
        fireEvent.click(screen.getByRole("button", {name: "Find Shortest Path"}));
        expect(onTraverse).toHaveBeenCalled();
    });

    it("fires onOpenSettings when the cog is clicked", () => {
        const onOpenSettings = vi.fn();
        render(<ControlBar {...props({onOpenSettings})} />);
        fireEvent.click(screen.getByRole("button", {name: "Options"}));
        expect(onOpenSettings).toHaveBeenCalled();
    });
});

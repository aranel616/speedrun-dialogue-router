import {useEffect, useRef} from "react";
import type {LayoutDirection} from "../utils/dagreLayout";
import type {Metric} from "@sdr/shared";

interface Props {
  open: boolean;
  layoutDirection: LayoutDirection;
  onChangeLayoutDirection: (d: LayoutDirection)=> void;
  metric: Metric;
  onChangeMetric: (m: Metric)=> void;
  onClose: ()=> void;
}

const DIRECTIONS: {value: LayoutDirection; label: string}[] = [
    {
        value: "vertical",
        label: "Vertical"
    },
    {
        value: "horizontal",
        label: "Horizontal"
    },
];

const METRICS: {value: Metric; label: string}[] = [
    {
        value: "syllables",
        label: "Syllables"
    },
    {
        value: "chars",
        label: "Characters"
    },
];

export function SettingsModal({open, layoutDirection, onChangeLayoutDirection, metric, onChangeMetric, onClose}: Props): JSX.Element | null {
    const ref = useRef<HTMLDivElement>(null);

    // Move focus into the dialog on open and let Escape dismiss it.
    useEffect(() => {
        if (!open) {return;}
        ref.current?.focus();
        const onKey = (e: KeyboardEvent): void => {
            if (e.key === "Escape") {onClose();}
        };
        document.addEventListener("keydown", onKey);
        return (): void => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) {return null;}

    return (
        // Backdrop closes only when clicked directly (not on a child); Escape and
        // the close button are the keyboard/AT paths, so the rule doesn't apply.
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) {onClose();} }}>
            <div
                ref={ref}
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-title"
                tabIndex={-1}
            >
                <div className="modal-header">
                    <h2 id="settings-title" className="modal-title">Options</h2>
                    <button className="close-btn" onClick={onClose} aria-label="Close options">✕</button>
                </div>

                <div className="modal-body">
                    <div className="setting-row">
                        <span className="setting-label" id="layout-dir-label">Graph layout</span>
                        <div className="segmented" role="radiogroup" aria-labelledby="layout-dir-label">
                            {DIRECTIONS.map((d) => (
                                <button
                                    key={d.value}
                                    type="button"
                                    role="radio"
                                    aria-checked={layoutDirection === d.value}
                                    className={`segmented-option${layoutDirection === d.value ? " active" : ""}`}
                                    onClick={() => onChangeLayoutDirection(d.value)}
                                >
                                    {d.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="setting-row">
                        <span className="setting-label" id="routing-metric-label">Route by</span>
                        <div className="segmented" role="radiogroup" aria-labelledby="routing-metric-label">
                            {METRICS.map((m) => (
                                <button
                                    key={m.value}
                                    type="button"
                                    role="radio"
                                    aria-checked={metric === m.value}
                                    className={`segmented-option${metric === m.value ? " active" : ""}`}
                                    onClick={() => onChangeMetric(m.value)}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

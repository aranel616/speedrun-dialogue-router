import type {TraverseResponse} from "../types";

interface Props {
  result: TraverseResponse | null;
}

export function ContextInspector({result}: Props) {
    if (!result) {return null;}

    const contextEntries = Object.entries(result.context);

    return (
        <div className="context-inspector">
            <div className="inspector-header">
                <span className="inspector-title">Shortest Path</span>
                <span className="inspector-length">{result.length} chars</span>
            </div>

            <div className="inspector-path">
                {result.path.map((step, i) => (
                    <span key={i} className="path-step">{step}</span>
        ))}
            </div>

            {contextEntries.length > 0 && (
            <div className="inspector-context">
                <div className="inspector-subtitle">Final Context</div>
                <table className="context-table">
                    <tbody>
                        {contextEntries.map(([key, val]) => (
                            <tr key={key}>
                                <td className="ctx-key">{key}</td>
                                <td className="ctx-val">{String(val)}</td>
                            </tr>
              ))}
                    </tbody>
                </table>
            </div>
      )}
        </div>
    );
}

// Presentation layer: turn a Script into the graph + traversal data the UI
// renders. Pure — depends only on @sdr/engine and the shared view types.
export {buildGraph, isSingleVariableFork} from "./graphBuilder";
export {runTraverse} from "./traverse";

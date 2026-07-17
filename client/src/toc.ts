// Curated table-of-contents outlines per script. The dialogue data has no scene
// or "importance" metadata, so scene headers and the major branch decisions are
// listed here in story order. Entries whose nodeId isn't present in the loaded
// graph are skipped, so partial/renamed scripts degrade gracefully.

export interface TocEntry {
  title: string;
  nodeId: string;
  kind: "scene" | "decision";
}

export const TOC: Record<string, TocEntry[]> = {
  "lifeisstrange/episode1": [
    { title: "Jefferson's Class", nodeId: "start", kind: "scene" },
    { title: "Hallway & Principal Wells", nodeId: "david_hallway", kind: "scene" },
    { title: "Report Nathan?", nodeId: "wells_1", kind: "decision" },
    { title: "Make fun of Victoria?", nodeId: "victoria_1", kind: "decision" },
    { title: "Dorm: Juliet", nodeId: "juliet_1", kind: "scene" },
    { title: "Photograph Kate?", nodeId: "kate_1", kind: "decision" },
    { title: "Warren", nodeId: "warren_1", kind: "scene" },
    { title: "Nathan Confrontation", nodeId: "nathan_1", kind: "scene" },
    { title: "Chloe's House", nodeId: "chloe_1", kind: "scene" },
    { title: "David & Chloe", nodeId: "david_hide", kind: "scene" },
    { title: "Blame Chloe or take the blame?", nodeId: "david_exposed", kind: "decision" },
    { title: "Lighthouse (ending)", nodeId: "lighthouse_2", kind: "scene" },
  ],
  "lifeisstrange/episode2": [
    { title: "Girls' Dormitories", nodeId: "start", kind: "scene" },
    { title: "Showers", nodeId: "showers_1", kind: "scene" },
    { title: "Kate's Room", nodeId: "kateroom_1", kind: "scene" },
    { title: "Police or find proof?", nodeId: "kateroom_13", kind: "decision" },
    { title: "Dormitories: Warren", nodeId: "dorm_warren_1", kind: "scene" },
    { title: "Two Whales Diner", nodeId: "diner_bridge", kind: "scene" },
    { title: "American Rust Junkyard", nodeId: "junkyard_1", kind: "scene" },
    { title: "Railroad", nodeId: "railroad_1", kind: "scene" },
    { title: "Main Campus", nodeId: "campus_1", kind: "scene" },
    { title: "Hallway: David", nodeId: "david_1", kind: "scene" },
    { title: "Science Lab", nodeId: "sciencelab_1", kind: "scene" },
    { title: "Jefferson's Class", nodeId: "jeff_1", kind: "scene" },
    { title: "Kate on the Roof", nodeId: "dorm2_bridge", kind: "scene" },
    { title: "Talk Kate down?", nodeId: "roof_1", kind: "decision" },
    { title: "Principal's Office", nodeId: "principal_1", kind: "scene" },
    { title: "Who to blame?", nodeId: "principal_3", kind: "decision" },
    { title: "With Warren", nodeId: "warren_end_1", kind: "scene" },
    { title: "Epilogue", nodeId: "epilogue", kind: "scene" },
  ],
};

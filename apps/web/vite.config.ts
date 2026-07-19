import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 5175,
        // Dev server is reached by various LAN hostnames; allow any rather than
        // pinning a machine-specific name.
        allowedHosts: true,
    },
    build: {
        outDir: "dist",
    },
});

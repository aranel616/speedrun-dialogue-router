import {defineConfig} from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "happy-dom",
        globals: true,
        setupFiles: ["./vitest.setup.ts"],
        include: ["src/**/*.test.{ts,tsx}"],
        // @sdr/* are TypeScript-source workspace packages; inline them so Vitest
        // transforms them instead of treating them as pre-built externals.
        server: {deps: {inline: [/^@sdr\//]}},
        coverage: {
            provider: "v8",
            include: ["src/**/*.{ts,tsx}"],
            exclude: ["src/main.tsx", "src/**/*.d.ts"],
            reporter: ["text", "text-summary", "html"],
        },
    },
});

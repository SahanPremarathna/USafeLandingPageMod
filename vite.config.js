import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                howItWorks: resolve(__dirname, "how-it-works.html"),
                team: resolve(__dirname, "team.html"),
                contact: resolve(__dirname, "contact.html")
            }
        }
    }
});

import { defineConfig } from "vite";
export default defineConfig({
test:{
   environment:"jsdom",
    include: ['**/*.test.jsx'],
    globals: true
}

})

import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    {path: '/polygon', component: 'svg/index'},
    {path: '/polygon1', component: 'svg/index1'}
  ],
  npmClient: 'pnpm',
});

import fs from "fs/promises";
import { exec } from "child_process";

const postDir = "src/content/posts/";
(async function main() {
  const glob = await fs.glob(`${postDir}/**/*.md`);
  for await (const file of glob) {
    const content = await fs.readFile(file, "utf-8");
    if (
      content.includes("conference.astro") ||
      content.includes("video.astro")
    ) {
      const newPath = file.replace("/posts/", "/lfts/");
      console.log("👋 moving", file, newPath);
      const dir = newPath.split("/").slice(0, -1).join("/");
      await fs.mkdir(dir, { recursive: true });
      exec(`mv ${file} ${newPath}`);
    }
  }
})();

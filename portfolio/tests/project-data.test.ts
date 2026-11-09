import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { projectCaseStudies } from "../src/features/projects/projectData.ts";

test("case-study slugs are unique and media has complete accessible provenance", () => {
  const slugs = projectCaseStudies.map((project) => project.slug);
  assert.equal(new Set(slugs).size, slugs.length);

  for (const project of projectCaseStudies) {
    assert.ok(project.name);
    assert.ok(project.summary);
    assert.ok(project.status);
    assert.ok(project.technologies.length > 0);
    assert.ok(project.repository.url.startsWith("https://"));
    for (const media of project.media) {
      assert.ok(media.id);
      assert.ok(media.width > 0 && media.height > 0);
      assert.ok(media.source === undefined || media.source.url.startsWith("https://"));
      if (media.type === "video") {
        assert.ok(media.title);
        assert.ok(media.caption);
      } else {
        assert.ok(media.alt);
        assert.ok(media.caption);
        assert.ok(media.source.url.startsWith("https://"));
      }
    }
  }
});

test("Guiding Hands remains honest about missing video, role and clinical validation", () => {
  const project = projectCaseStudies.find(({ slug }) => slug === "guiding-hands");
  assert.ok(project);
  assert.equal(project.demo, null);
  assert.match(project.teamContext, /does not assign Marc individual responsibilities/);
  assert.ok(project.sections.some((section) => section.paragraphs.join(" ").includes("Therapeutic effectiveness has not been established")));
  assert.ok(project.sections.some((section) => section.title === "Questions for the next build"));
});

test("the archived Guiding Hands still matches its recorded source provenance", () => {
  const imagePath = new URL("../public/images/guiding-hands/forest-motion-prototype.png", import.meta.url);
  const recordPath = new URL("../public/images/guiding-hands/provenance.json", import.meta.url);
  const image = readFileSync(imagePath);
  const provenance = JSON.parse(readFileSync(recordPath, "utf8")) as { bytes: number; sha256: string };
  assert.equal(image.byteLength, provenance.bytes);
  assert.equal(createHash("sha256").update(image).digest("hex"), provenance.sha256);
});

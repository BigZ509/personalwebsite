export type ProjectImage = {
  id: string;
  type: "image" | "screenshot" | "diagram";
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  source: { label: string; url: string; note?: string };
};

export type ProjectVideo = {
  id: string;
  type: "video";
  src: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  poster?: ProjectImage;
  source?: { label: string; url: string };
};

export type ProjectMedia = ProjectImage | ProjectVideo;

export type ProjectSection =
  | {
      id: string;
      title: string;
      layout: "prose";
      paragraphs: readonly string[];
    }
  | {
      id: string;
      title: string;
      layout: "flow" | "editorial";
      paragraphs: readonly string[];
      items: readonly { label: string; description: string }[];
    };

export type ProjectCaseStudy = {
  slug: string;
  name: string;
  category: string;
  focus: string;
  summary: string;
  status: string;
  teamContext: string;
  technologies: readonly string[];
  repository: { label: string; url: string };
  demo: { label: string; url: string } | null;
  demoUnavailableNote: string;
  mediaContext: string;
  heroMediaId: string;
  media: readonly ProjectMedia[];
  sections: readonly ProjectSection[];
};

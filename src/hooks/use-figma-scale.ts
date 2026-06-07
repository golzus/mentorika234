import { useEffect, useState } from "react";

export const FIGMA_WIDTH = 1650;
export const FIGMA_HEIGHT = 870;

/** Below this viewport size: fit width + allow vertical scroll */
const COMPACT_MAX_WIDTH = 1400;
const COMPACT_MAX_HEIGHT = 750;

export type FigmaLayout = {
  scale: number;
  compact: boolean;
  scaledWidth: number;
  scaledHeight: number;
};

export function useFigmaLayout(): FigmaLayout {
  const [layout, setLayout] = useState<FigmaLayout>({
    scale: 1,
    compact: false,
    scaledWidth: FIGMA_WIDTH,
    scaledHeight: FIGMA_HEIGHT,
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scaleW = w / FIGMA_WIDTH;
      const scaleH = h / FIGMA_HEIGHT;
      const compact = w < COMPACT_MAX_WIDTH || h < COMPACT_MAX_HEIGHT;

      if (compact) {
        const scale = scaleW;
        setLayout({
          scale,
          compact: true,
          scaledWidth: FIGMA_WIDTH * scale,
          scaledHeight: FIGMA_HEIGHT * scale,
        });
      } else {
        const scale = Math.min(scaleW, scaleH);
        setLayout({
          scale,
          compact: false,
          scaledWidth: FIGMA_WIDTH * scale,
          scaledHeight: FIGMA_HEIGHT * scale,
        });
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return layout;
}

export function useFigmaCompactClass(compact: boolean) {
  useEffect(() => {
    document.documentElement.classList.toggle("dashboard-compact", compact);
    return () => document.documentElement.classList.remove("dashboard-compact");
  }, [compact]);
}

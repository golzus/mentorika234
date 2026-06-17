import { useEffect, useState } from "react";

export const FIGMA_WIDTH = 1650;
export const FIGMA_HEIGHT = 870;

const COMPACT_MAX_WIDTH = 768;
const SAFE_MARGIN = 0;

export type FigmaLayout = {
  scale: number;
  scaleX: number;
  scaleY: number;
  compact: boolean;
  scaledWidth: number;
  scaledHeight: number;
};

function calculateLayout(width: number, height: number): FigmaLayout {
  const availableWidth = Math.max(0, width - SAFE_MARGIN * 2);
  const availableHeight = Math.max(0, height - SAFE_MARGIN * 2);

  // Below tablet width: scale to fit width only (allow vertical scroll).
  if (width < COMPACT_MAX_WIDTH) {
    const scale = availableWidth / FIGMA_WIDTH;
    return {
      scale,
      scaleX: scale,
      scaleY: scale,
      compact: true,
      scaledWidth: FIGMA_WIDTH * scale,
      scaledHeight: FIGMA_HEIGHT * scale,
    };
  }

  // Tablet and up: uniform scale to fit within viewport (preserve aspect ratio).
  const scale = Math.min(
    availableWidth / FIGMA_WIDTH,
    availableHeight / FIGMA_HEIGHT,
  );

  return {
    scale,
    scaleX: scale,
    scaleY: scale,
    compact: false,
    scaledWidth: FIGMA_WIDTH * scale,
    scaledHeight: FIGMA_HEIGHT * scale,
  };
}

function isSameLayout(a: FigmaLayout, b: FigmaLayout) {
  return (
    a.compact === b.compact &&
    Math.abs(a.scale - b.scale) < 0.001 &&
    Math.abs(a.scaleX - b.scaleX) < 0.001 &&
    Math.abs(a.scaleY - b.scaleY) < 0.001 &&
    Math.abs(a.scaledWidth - b.scaledWidth) < 0.5 &&
    Math.abs(a.scaledHeight - b.scaledHeight) < 0.5
  );
}

export function useFigmaLayout(): FigmaLayout {
  const [layout, setLayout] = useState<FigmaLayout>({
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    compact: false,
    scaledWidth: FIGMA_WIDTH,
    scaledHeight: FIGMA_HEIGHT,
  });

  useEffect(() => {
    let frameId: number | null = null;

    const update = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        const next = calculateLayout(window.innerWidth, window.innerHeight);
        setLayout((current) => (isSameLayout(current, next) ? current : next));
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return layout;
}

export function useFigmaCompactClass(active: boolean) {
  useEffect(() => {
    document.documentElement.classList.toggle("dashboard-compact", active);
    return () => document.documentElement.classList.remove("dashboard-compact");
  }, [active]);
}

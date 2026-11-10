"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ImageAsset } from "@/lib/images";

type ImageRevealProps = {
  asset: ImageAsset;
  /** Wrapper classes — set the aspect ratio / sizing here. */
  className?: string;
  /** Responsive `sizes` hint for the image loader. */
  sizes?: string;
  priority?: boolean;
  /** Slow zoom-out + curtain reveal on enter. */
  reveal?: boolean;
  /** Subtle vertical parallax in % (0 disables). */
  parallax?: number;
  /**
   * `cover` fills the frame and crops the overflow; `contain` shows the whole
   * photograph inside the frame. Use `contain` where every architectural detail
   * must stay visible, and give the frame the photograph's own aspect ratio so
   * no empty bands appear.
   */
  fit?: "cover" | "contain";
  /** CSS object-position for cropping control. */
  objectPosition?: string;
  /**
   * Optimiser quality (1–100). Omit to use Next.js' default; raise it for
   * full-bleed hero frames where compression artefacts would be visible.
   */
  quality?: number;
  /** Extra classes for the <img> element. */
  imgClassName?: string;
};

/**
 * The single image primitive used across the site.
 *
 * Combines: an optional parallax layer, a slow cinematic zoom-out, a curtain
 * reveal and a Next.js optimised image. Reduced-motion users get a static,
 * fully-visible image.
 */
export function ImageReveal({
  asset,
  className = "",
  sizes = "100vw",
  priority = false,
  reveal = true,
  parallax = 0,
  fit = "cover",
  objectPosition,
  quality,
  imgClassName = "",
}: ImageRevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const animate = !reduce;

  // Hold the image at zero opacity over the warm `.media` placeholder surface
  // until the browser has decoded it, then fade it in. Images already cached
  // before hydration never emit onLoad on the client, so settle those on mount.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);

  return (
    <div ref={ref} className={`media ${className}`}>
      <motion.div
        className={
          parallax > 0 ? "absolute inset-x-0 -top-[12%] -bottom-[12%]" : "absolute inset-0"
        }
        style={parallax > 0 && animate ? { y } : undefined}
      >
        <motion.div
          className="absolute inset-0"
          initial={animate && reveal ? { scale: 1.1 } : false}
          whileInView={animate && reveal ? { scale: 1 } : undefined}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <Image
            ref={imgRef}
            src={asset.src}
            alt={asset.alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={quality}
            loading={priority ? undefined : "lazy"}
            onLoad={() => setLoaded(true)}
            className={`${fit === "contain" ? "object-contain" : "object-cover"} ${imgClassName}`}
            style={{
              ...(objectPosition ? { objectPosition } : undefined),
              // Revealed only once decoded (or immediately for reduced motion),
              // over the same-sized placeholder — so there is no layout shift.
              opacity: loaded || reduce ? 1 : 0,
              transition: reduce ? undefined : "opacity 0.9s var(--ease-silk)",
            }}
          />
        </motion.div>
      </motion.div>

      {animate && reveal && (
        <motion.span
          aria-hidden
          className="absolute inset-0 z-[3] origin-bottom bg-stone-soft"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        />
      )}
    </div>
  );
}

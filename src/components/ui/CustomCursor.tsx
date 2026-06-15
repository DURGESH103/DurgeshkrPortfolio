'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only activate on fine-pointer (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    // Skip when user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setMounted(true);

    const dot_  = dot.current!;
    const ring_ = ring.current!;

    const move = ({ clientX: x, clientY: y }: MouseEvent) => {
      dot_.style.left  = `${x}px`;
      dot_.style.top   = `${y}px`;
      ring_.style.left = `${x}px`;
      ring_.style.top  = `${y}px`;
    };

    const grow = () => {
      ring_.style.width        = '44px';
      ring_.style.height       = '44px';
      ring_.style.borderColor  = 'rgba(59,130,246,0.55)';
    };
    const shrink = () => {
      ring_.style.width        = '28px';
      ring_.style.height       = '28px';
      ring_.style.borderColor  = 'rgba(59,130,246,0.35)';
    };

    const attachHover = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    };

    window.addEventListener('mousemove', move, { passive: true });
    attachHover();

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, []);

  // Server render nothing; client renders hidden divs revealed only when mounted+valid
  if (!mounted) return null;

  return (
    <>
      <div ref={dot}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

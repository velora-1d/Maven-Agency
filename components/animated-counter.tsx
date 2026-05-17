"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  text: string;
  duration?: number;
  className?: string;
};

export function AnimatedCounter({
  text,
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const match = text.match(/^([^0-9]*)([0-9,.]+)([^0-9]*)$/);
  const prefix = match ? match[1] : "";
  const numStr = match ? match[2].replace(/,/g, "") : "0";
  const suffix = match ? match[3] : text;
  const targetValue = parseFloat(numStr) || 0;
  const isFloat = numStr.includes(".");

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (!isVisible || targetValue === 0) return;

    let startTime: number | null = null;
    const startValue = 0;
    const endValue = targetValue;

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOut = progress * (2 - progress); // easeOutQuad
      const currentCount = easeOut * (endValue - startValue) + startValue;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    const animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, targetValue, duration]);

  if (!match || targetValue === 0) {
    return <span ref={ref} className={className}>{text}</span>;
  }

  const formatNumber = (val: number) => {
    if (isFloat) {
      return val.toFixed(1);
    }
    return Math.floor(val).toLocaleString();
  };

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

import React from "react";

interface GalleryProps {
  className?: string;
}

export default function Gallery(props: GalleryProps) {
  const { className } = props;
  const imageStyles = "rounded-xl bg-secondary";
  return (
    <section className={className}>
      <div className="container">
        <div className="min-h-[540px] grid grid-cols-[6fr_4fr] gap-2">
          <div className={imageStyles}></div>
          <div className="grid grid-cols-1 gap-2">
            <div className={imageStyles}></div>
            <div className="grid grid-cols-2 gap-2">
              <div className={imageStyles}></div>
              <div className={imageStyles}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

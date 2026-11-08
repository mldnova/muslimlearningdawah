import Image from "next/image";

type Photo = { src: string; alt: string; width: number; height: number };

/** Slim row of photos that drifts sideways on a loop; scrolls by hand for reduced motion. */
export function PhotoStrip({ photos }: { photos: readonly Photo[] }) {
  return (
    <div className="photo-strip overflow-hidden" role="group" aria-label="Photos from our events">
      <div className="photo-strip-track flex w-max">
        {/* Second copy makes the loop seamless */}
        {[false, true].map((copy) => (
          <ul key={String(copy)} aria-hidden={copy} className="flex gap-4 pr-4 pb-4">
            {photos.map((photo) => (
              <li
                key={photo.src}
                className="relative h-56 shrink-0 overflow-hidden rounded-2xl shadow-lg shadow-navy-950/15 sm:h-72 lg:h-80"
              >
                <Image
                  src={photo.src}
                  alt={copy ? "" : photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width:640px) 340px, 480px"
                  className="h-full w-auto"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

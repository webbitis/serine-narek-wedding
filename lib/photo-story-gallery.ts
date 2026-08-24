export type GalleryPhotoSide = "left" | "right";

export type GalleryPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  side: GalleryPhotoSide;
  /** Mobile + desktop width/alignment — irregular on purpose. */
  frameClass: string;
  marginTop: number;
};

/**
 * Invitation photo story — vertical asymmetric sequence.
 * Order: 1 → 6. Odd = left, even = right.
 */
export const PHOTO_STORY_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: "/narek-serine/images/1.jpeg",
    alt: "Նարեկ և Սերինե",
    width: 3808,
    height: 5712,
    side: "left",
    frameClass: "w-[92%] max-w-full md:w-[68%] ml-0 mr-auto",
    marginTop: 0,
  },
  {
    src: "/narek-serine/images/2.jpeg",
    alt: "Նարեկ և Սերինե",
    width: 3808,
    height: 5712,
    side: "right",
    frameClass: "w-[78%] max-w-full md:w-[54%] ml-auto mr-[2%] md:mr-[4%]",
    marginTop: 4,
  },
  {
    src: "/narek-serine/images/sweet.jpg",
    alt: "Նարեկ և Սերինե",
    width: 4000,
    height: 6000,
    side: "left",
    frameClass: "w-[88%] max-w-full md:w-[62%] ml-[6%] md:ml-[9%] mr-auto",
    marginTop: 2,
  },
  {
    src: "/narek-serine/images/4.jpeg",
    alt: "Նարեկ և Սերինե",
    width: 1080,
    height: 1620,
    side: "right",
    frameClass: "w-[94%] max-w-full md:w-[70%] ml-auto mr-0 md:mr-[-2%]",
    marginTop: -4,
  },
  {
    src: "/narek-serine/images/5.jpeg",
    alt: "Նարեկ և Սերինե",
    width: 1440,
    height: 2160,
    side: "left",
    frameClass: "w-[72%] max-w-full md:w-[48%] ml-[4%] md:ml-[7%] mr-auto",
    marginTop: 4,
  },
  {
    src: "/narek-serine/images/6.jpeg",
    alt: "Նարեկ և Սերինե",
    width: 1439,
    height: 1947,
    side: "right",
    frameClass: "w-[88%] max-w-full md:w-[62%] ml-auto mr-[4%] md:mr-[7%]",
    marginTop: -6,
  },
];

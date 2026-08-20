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
    src: "/images/1.jpeg",
    alt: "Սերինե և Նարեկ",
    width: 3808,
    height: 5712,
    side: "left",
    frameClass: "w-[82%] max-w-full md:w-[56%] ml-0 mr-auto",
    marginTop: 0,
  },
  {
    src: "/images/2.jpeg",
    alt: "Սերինե և Նարեկ",
    width: 3808,
    height: 5712,
    side: "right",
    frameClass: "w-[62%] max-w-full md:w-[40%] ml-auto mr-[4%] md:mr-[6%]",
    marginTop: 52,
  },
  {
    src: "/images/3.jpeg",
    alt: "Սերինե և Նարեկ",
    width: 4000,
    height: 6000,
    side: "left",
    frameClass: "w-[74%] max-w-full md:w-[48%] ml-[10%] md:ml-[12%] mr-auto",
    marginTop: 72,
  },
  {
    src: "/images/4.jpeg",
    alt: "Սերինե և Նարեկ",
    width: 1080,
    height: 1620,
    side: "right",
    frameClass: "w-[84%] max-w-full md:w-[55%] ml-auto mr-0 md:mr-[-1%]",
    marginTop: 42,
  },
  {
    src: "/images/5.jpeg",
    alt: "Սերինե և Նարեկ",
    width: 1440,
    height: 2160,
    side: "left",
    frameClass: "w-[58%] max-w-full md:w-[36%] ml-[5%] md:ml-[8%] mr-auto",
    marginTop: 76,
  },
  {
    src: "/images/6.jpeg",
    alt: "Սերինե և Նարեկ",
    width: 1439,
    height: 1947,
    side: "right",
    frameClass: "w-[76%] max-w-full md:w-[50%] ml-auto mr-[7%] md:mr-[10%]",
    marginTop: 50,
  },
];

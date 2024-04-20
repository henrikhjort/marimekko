import type BrandImage from "../../../types/BrandImage";

export const images: BrandImage[] = [
  {
    src: "/brandImages/juhlissaUnikko/juhlissa_unikko_1.png",
    alt: "Juhlissa Unikko 1",
    productId: "093469-099",
  },
  {
    src: "/brandImages/juhlissaUnikko/juhlissa_unikko_2.jpg",
    alt: "Juhlissa Unikko 2",
    productId: "093469-099",
  },
  {
    src: "/brandImages/juhlissaUnikko/juhlissa_unikko_3.jpg",
    alt: "Juhlissa Unikko 3",
    productId: "093469-099",
  },
  {
    src: "/brandImages/juhlissaUnikko/juhlissa_unikko_2.jpg",
    alt: "Juhlissa Unikko 4",
    productId: "093469-099",
  },
  {
    src: "/brandImages/juhlissaUnikko/juhlissa_unikko_2.jpg",
    alt: "Juhlissa Unikko 5",
    productId: "093469-099",
  },
  {
    src: "/brandImages/kumarrusUnikko/kumarrus_unikko_1.jpg",
    alt: "Kumarrus Unikko 1",
    productId: "093471-033",
  },
  {
    src: "/brandImages/kumarrusUnikko/kumarrus_unikko_2.jpg",
    alt: "Kumarrus Unikko 2",
    productId: "093471-033",
  },
  {
    src: "/brandImages/kumarrusUnikko/kumarrus_unikko_3.jpg",
    alt: "Kumarrus Unikko 3",
    productId: "093471-033",
  },
  {
    src: "/brandImages/kumarrusUnikko/kumarrus_unikko_4.jpg",
    alt: "Kumarrus Unikko 4",
    productId: "093471-033",
  },
  {
    src: "/brandImages/kumarrusUnikko/kumarrus_unikko_4.jpg",
    alt: "Kumarrus Unikko 5",
    productId: "093471-033",
  },
  {
    src: "/brandImages/pikkuinenUnikko/pikkuinen_unikko_1.jpg",
    alt: "Pikkuinen Unikko 1",
    productId: "093441-219",
  },
  {
    src: "/brandImages/pikkuinenUnikko/pikkuinen_unikko_2.jpg",
    alt: "Pikkuinen Unikko 2",
    productId: "093441-219",
  },
  {
    src: "/brandImages/pikkuinenUnikko/pikkuinen_unikko_2.jpg",
    alt: "Pikkuinen Unikko 3",
    productId: "093441-219",
  },
  {
    src: "/brandImages/pikkuinenUnikko/pikkuinen_unikko_2.jpg",
    alt: "Pikkuinen Unikko 4",
    productId: "093441-219",
  },
  {
    src: "/brandImages/pikkuinenUnikko/pikkuinen_unikko_2.jpg",
    alt: "Pikkuinen Unikko 5",
    productId: "093441-219",
  },
];

export function getImagesForProduct(productId: string): BrandImage[] {
  return images.filter((image) => image.productId === productId);
}

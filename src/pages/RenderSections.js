// Variants des sections
import {
  HeroDefault,
  HeroMinimal,
  HeroInfo,
  HeroInfoInverse,
  HeroTwoCols,
  HeroContent,
  HeroAds,
  HeroAdsWithContent,
} from "../components/sections/HeroVariants";
import {
  GridColumns,
  GridIcons,
  GridCards,
  GridThreeIcon,
  GridRows,
  GridWithoutTitle,
  CategoryGrid,
  GalerieGrid,
  GridImages,
  GridBlogCards,
  GridCardsExpertise,
} from "../components/sections/GridVariants";
import { FaqAccordion, FaqList } from "../components/sections/FaqVariants";
import {
  CtaCentered,
  CtaContact,
  CtaNewsletter,
  CtaTwoCols,
} from "../components/sections/CallToActionVariants";
import CarouselDetails, {
  CarouselProduits,
  CarouselSimple,
  CarouselYTB,
} from "../components/sections/CarouelsVariants";
import {
  TwoColsContact,
  TwoColsImageGrid,
  TwoColsTwoImages,
  TwoColsWithoutSS,
  TwoColsWithoutSSInverse,
  TwoColsWithSS,
} from "../components/sections/TwoCols";

// Fonction d'affichage selon le type + variant
export function RenderSection(section, settings) {
  const { type, variant, id } = section;

  const map = {
    hero: {
      default: HeroDefault,
      minimal: HeroMinimal,
      info: HeroInfo,
      "info-inverse": HeroInfoInverse,
      "2-cols": HeroTwoCols,
      content: HeroContent,
      ads: HeroAds,
      "ads-with-content": HeroAdsWithContent,
    },
    grid: {
      columns: GridColumns,
      icons: GridIcons,
      cards: GridCards,
      "three-icons": GridThreeIcon,
      rows: GridRows,
      images: GridImages,
      "without-title": GridWithoutTitle,
      expertise: GridCardsExpertise,
      categorie: CategoryGrid,
      galeries: GalerieGrid,
      "blog-cards": GridBlogCards,
    },
    calltoaction: {
      centered: CtaCentered,
      newsletter: CtaNewsletter,
      contact: CtaContact,
      "2-col": CtaTwoCols,
    },
    carousel: {
      simple: CarouselSimple,
      link: CarouselYTB,
      details: CarouselDetails,
      produits: CarouselProduits,
    },
    faq: {
      accordeon: FaqAccordion,
      list: FaqList,
    },
    "2-col": {
      "with-ss": TwoColsWithSS,
      "without-ss": TwoColsWithoutSS,
      "without-ss-inverse": TwoColsWithoutSSInverse,
      partners: TwoColsImageGrid,
      contact: TwoColsContact,
      "2-images": TwoColsTwoImages,
    },
  };

  const Component = map[type]?.[variant];
  return Component ? (
    <Component key={id} section={section} settings={settings} />
  ) : null;
}

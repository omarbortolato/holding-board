import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getBrand } from "../config/brands";

export type DataDrivenPromoProps = {
  brandKey: string;
  title: string;
  subtitle: string;
  ctaText: string;
  // Path relativi a assets/products/, es. "herbalife/foto1.png".
  // Se presenti, sostituiscono lo sfondo a tinta unita dopo l'intro con una
  // carrellata di foto prodotto in dissolvenza incrociata.
  productImages?: string[];
};

export const dataDrivenPromoSchema = {
  brandKey: "herbalife",
  title: "Titolo del video",
  subtitle: "Sottotitolo o claim",
  ctaText: "Scopri di più",
} satisfies DataDrivenPromoProps;

const TITLE_IN = [20, 40] as const;
const TITLE_OUT = [90, 110] as const;
const PRODUCT_CROSSFADE = 15;

const ProductShowcase: React.FC<{
  images: string[];
  from: number;
  durationInFrames: number;
}> = ({ images, from, durationInFrames }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - from;
  const perImage = durationInFrames / images.length;

  return (
    <AbsoluteFill>
      {images.map((src, i) => {
        const imgStart = i * perImage;
        const imgEnd = imgStart + perImage;
        const opacity = interpolate(
          localFrame,
          [
            imgStart,
            imgStart + PRODUCT_CROSSFADE,
            imgEnd - PRODUCT_CROSSFADE,
            imgEnd,
          ],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const scale = interpolate(localFrame, [imgStart, imgEnd], [1, 1.08], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <AbsoluteFill key={src} style={{ opacity }}>
            <Img
              src={staticFile(`products/${src}`)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform: `scale(${scale})`,
              }}
            />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};

// Video parametrico: logo intro -> titolo/sottotitolo -> (opzionale: carrellata
// prodotti) -> CTA outro. Pensato per promo brevi (15-30s) generati a partire
// da un brief testuale. Un progetto nuovo si aggiunge in src/config/brands.ts,
// non serve toccare questo file.
export const DataDrivenPromo: React.FC<DataDrivenPromoProps> = ({
  brandKey,
  title,
  subtitle,
  ctaText,
  productImages,
}) => {
  const brand = getBrand(brandKey);
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const hasProducts = Boolean(productImages && productImages.length > 0);

  const logoScale = spring({ frame, fps, config: { damping: 200 } });

  const titleOpacity = hasProducts
    ? interpolate(
        frame,
        [...TITLE_IN, ...TITLE_OUT],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : interpolate(frame, [...TITLE_IN], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  const ctaOpacity = interpolate(
    frame,
    [durationInFrames - 40, durationInFrames - 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const productsFrom = TITLE_OUT[1];
  const productsDuration = durationInFrames - 10 - productsFrom;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.primaryColor,
        fontFamily: brand.fontFamily,
      }}
    >
      {hasProducts ? (
        <Sequence from={productsFrom} durationInFrames={productsDuration}>
          <ProductShowcase
            images={productImages!}
            from={productsFrom}
            durationInFrames={productsDuration}
          />
        </Sequence>
      ) : null}

      <Sequence from={0} durationInFrames={durationInFrames}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {brand.logoPath ? (
            <Img
              src={staticFile(brand.logoPath)}
              style={{
                width: 160,
                transform: `scale(${logoScale})`,
                position: "absolute",
                top: 60,
              }}
            />
          ) : null}

          <div
            style={{
              opacity: titleOpacity,
              textAlign: "center",
              padding: "0 80px",
            }}
          >
            <h1 style={{ color: brand.textColor, fontSize: 72, margin: 0 }}>
              {title}
            </h1>
            <h2
              style={{
                color: brand.secondaryColor,
                fontSize: 40,
                marginTop: 20,
              }}
            >
              {subtitle}
            </h2>
          </div>

          <div
            style={{
              opacity: ctaOpacity,
              position: "absolute",
              bottom: 80,
              backgroundColor: brand.secondaryColor,
              padding: "20px 50px",
              borderRadius: 50,
            }}
          >
            <span style={{ color: brand.textColor, fontSize: 32 }}>
              {ctaText}
            </span>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

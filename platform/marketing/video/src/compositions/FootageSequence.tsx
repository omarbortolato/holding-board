import React from "react";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import { getBrand } from "../config/brands";

export type FootageClip = {
  type: "video" | "image";
  src: string; // path relativo a assets/footage/, es. "eventi/clip1.mp4"
  durationInFrames: number; // per le immagini è la durata mostrata; per i video deve combaciare con la clip
  caption?: string;
};

export type FootageSequenceProps = {
  brandKey: string;
  clips: FootageClip[];
};

export const footageSequenceSchema = {
  brandKey: "herbalife",
  clips: [
    { type: "image", src: "eventi/foto1.jpg", durationInFrames: 90 },
  ],
} satisfies FootageSequenceProps;

// Compone clip/foto già esistenti (girato reale) in sequenza, con caption
// opzionale sovrimpressa. Non fa editing avanzato (niente taglio automatico,
// color grading, transizioni complesse) — è pensato per montaggi semplici
// tipo "carrellata eventi" o "testimonial + intro/outro brand".
export const FootageSequence: React.FC<FootageSequenceProps> = ({
  brandKey,
  clips,
}) => {
  const brand = getBrand(brandKey);

  let startFrame = 0;
  const sequences = clips.map((clip, index) => {
    const from = startFrame;
    startFrame += clip.durationInFrames;
    return { clip, from, key: `${clip.src}-${index}` };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {sequences.map(({ clip, from, key }) => (
        <Sequence key={key} from={from} durationInFrames={clip.durationInFrames}>
          <AbsoluteFill>
            {clip.type === "video" ? (
              <OffthreadVideo
                src={staticFile(`footage/${clip.src}`)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Img
                src={staticFile(`footage/${clip.src}`)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            {clip.caption ? (
              <div
                style={{
                  position: "absolute",
                  bottom: 60,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    backgroundColor: brand.secondaryColor,
                    color: brand.textColor,
                    fontFamily: brand.fontFamily,
                    fontSize: 36,
                    padding: "12px 30px",
                    borderRadius: 12,
                  }}
                >
                  {clip.caption}
                </span>
              </div>
            ) : null}
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

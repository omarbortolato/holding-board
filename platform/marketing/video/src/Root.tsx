import React from "react";
import { Composition } from "remotion";
import {
  DataDrivenPromo,
  dataDrivenPromoSchema,
} from "./compositions/DataDrivenPromo";
import {
  FootageSequence,
  footageSequenceSchema,
} from "./compositions/FootageSequence";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DataDrivenPromo"
        component={DataDrivenPromo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={dataDrivenPromoSchema}
      />
      <Composition
        id="FootageSequence"
        component={FootageSequence}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={footageSequenceSchema}
        calculateMetadata={({ props }) => ({
          durationInFrames: props.clips.reduce(
            (total, clip) => total + clip.durationInFrames,
            0
          ),
        })}
      />
    </>
  );
};

"use client";

import { FC } from "react";
import TypewriterComponent from "typewriter-effect";

interface TypeWriterTitleProps {}

const TypeWriterTitle: FC<TypeWriterTitleProps> = ({}) => {
  return (
    <TypewriterComponent
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Elevate Your Ideas")
          .pauseFor(1000)
          .deleteAll()
          .typeString("The Future of Note-Taking")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Unleash Creativity with AI")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Where Ideas Come to Life")
          .pauseFor(1000)
          .start();
      }}
    />
  );
};

export default TypeWriterTitle;

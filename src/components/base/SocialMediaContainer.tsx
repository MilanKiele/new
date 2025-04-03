/*
File: Social Media Button Container
Description: Creates an array of social media buttons.
*/

import React from "react";
import { GithubLink, YoutubeLink } from "@/constants";
import ItemButton from "./ItemButton";

const SocialMediaContainer = ({ size = 32 }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <ItemButton
        size={size}
        link={YoutubeLink}
        src="/icons/youtube.svg"
        alt="YouTube"
        id="youtube-icon"
      />
      <ItemButton
        size={size}
        link={GithubLink}
        src="/icons/github.svg"
        alt="Github"
        id="github-icon"
      />
    </div>
  );
};

export default SocialMediaContainer;

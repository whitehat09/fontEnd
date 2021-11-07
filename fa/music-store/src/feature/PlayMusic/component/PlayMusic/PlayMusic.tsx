import React, { useEffect, useRef } from "react";
import "./style.css";

export const PlayMusic = (props: any) => {
  const audioRef = useRef<any>();
  const urlRef = useRef<any>(props.dataTracksAction);
  if (audioRef.current) {
    if (urlRef.current !== props.dataTracksAction) {
      urlRef.current = props.dataTracksAction;
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }
  const renderAudio = (url: any) => {
    return (
      <div className="col d-flex justify-content-center">
        <div className="play-music ">
          <audio controls ref={audioRef}>
            <source src={url} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    );
  };
  return (
    <div className="row ">
      <div className="col">
        {renderAudio(props.dataTracksAction)}
      </div>
    </div>
  );
};

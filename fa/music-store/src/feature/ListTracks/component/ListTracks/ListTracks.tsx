import React from "react";
import "./style.css";
export const ListTracks = (props: any) => {
  return (
    <div className="row mt-4">
      <div className="col list-tracks">
        <div className="list-group ">
          {props.tracks.map((item: any, index: any) => (
            <a
              key={index}
              className="list-group-item  list-group-tracks"
              onClick={() => props.handleTracksAction(item.preview_url)}
            >
              <img
                className="list-img-tracks "
                src={item.album.images[0].url}
              />
              <span className="pl-2"> {item.name} </span>
              <span className="float-right pr-5">
                {" "}
                {item.album.release_date}{" "}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

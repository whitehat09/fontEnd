import React from "react";
import "./style.css";
const url =
  "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png";

export const ListArtists = (props: any) => {
  return (
    <div className="row">
      {props.artist.map((item: any, index: number) => (
        <div
          className="col-4 mt-4"
          key={index}
          onClick={() => props.handleIdArtist(item.id)}
        >
          <div className="card card-custom" >
            <img
              className="card-img-top card-img-top-size"
              src={item.images[0] ? item.images[0].url : url}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Popularity: {item.popularity}</p>
              <p className="card-text card-text-hide">
                Genres: {item.genres.map((genre: any) => genre)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

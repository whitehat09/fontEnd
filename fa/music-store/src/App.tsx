import React, { useState, useEffect, useMemo } from "react";
import SearchArtists from "./feature/Search/component/SearchArtists";
import ListArtists from "./feature/ListArtists/component/SearchArtists";
import ListTracks from "./feature/ListTracks/component/ListTracks";
import PlayMusic from "./feature/PlayMusic/component/PlayMusic";

import axios from "axios";
function App() {
  const [token, setToken] = useState(""); //token
  const [artist, setArtist] = useState([]); //nghệ sỹ
  const [filter, setFilter] = useState(""); // giá trị tìm kiếm
  const [idArtist, setIdArtist] = useState(""); // id nghệ sĩ khi ân vào
  const [tracks, setTracks] = useState([]); // danh sách bài hát
  const [tracksAction, setTracksAction] = useState(""); //  bài hát
  const [checkTracksAction, setCheckTracksAction] = useState(false); //

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(
            "996aee2d8d3e4abda099ce53e59e663b" +
              ":" +
              "c15ff4a7b23b42d4a08c1f5ada347cc7"
          ).toString("base64"),
      },
      data: "grant_type=client_credentials",
    })
      .then((tokenresponse) => {
        setToken(tokenresponse.data.access_token);
        if (filter) {
          axios(
            `https://api.spotify.com/v1/search?q=${filter}&type=artist&offset=0&limit=6`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + token,
              },
            }
          )
            .then((trackresponse) => {
              if (idArtist) {
                axios(
                  `https://api.spotify.com/v1/artists/${idArtist}/top-tracks?market=us`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                      Authorization: "Bearer " + token,
                    },
                  }
                )
                  .then((trackresponse) => {
                    setTracks(trackresponse.data.tracks);
                  })
                  .catch((err) => {
                    setTracks([]);
                  });
              }
              setArtist(trackresponse.data.artists.items);
            })
            .catch((error) => {
              setArtist([]);
            });
        }
      })
      .catch((error) => console.log(error));
  }, [filter, idArtist]);
  const dataSearch = (valueSearch: string) => {
    setFilter(valueSearch);
    setArtist([]);
    setTracks([]);
    setIdArtist("");
  };
  const handleIdArtist = (data: any) => {
    setIdArtist(data);
  };
  const handleTracksAction = (data: any) => {
    setTracksAction(data);
    setCheckTracksAction(true);
  };
  const dataTracksAction = useMemo(() => {
    let data = tracksAction;
    return data;
  }, [tracksAction]);

  return (
    <div className="container ">
      <SearchArtists dataSearch={dataSearch} />
      <ListArtists handleIdArtist={handleIdArtist} artist={artist} />
      <ListTracks handleTracksAction={handleTracksAction} tracks={tracks} />
      {checkTracksAction ? (
        <PlayMusic dataTracksAction={dataTracksAction} />
      ) : null}
    </div>
  );
}

export default App;

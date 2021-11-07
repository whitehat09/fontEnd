import React, { useRef  } from "react";

export const SearchArtists = (props: any) => {
  const ref = useRef<any>();
  const handleSetOnchange = (e: any) => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      props.dataSearch(e.target.value.trim());
    }, 500);
  };
  return (
    <div className="row ">
      <div className="col">
          <div className="form-group d-flex mt-5 ">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Type to search for an artists"
              onChange={handleSetOnchange}
            />
          </div>
      </div>
    </div>
  );
};
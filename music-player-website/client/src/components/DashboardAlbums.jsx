
import React, { useEffect, useState } from "react";
import { UseStateValue } from "../context/StateProvider";

import { actionType } from "../context/reducer";
import { getAllAlbums } from "../api";

const DashboardAlbums = () => {
  const [{ allAlbums }, dispatch] = UseStateValue()
  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.data });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
        {allAlbums &&
          allAlbums.map((data, index) => (
            <>
              <AlbumCard key={index} data={data} index={index} />
            </>
          ))}

      </div>
    </div>
  );
};


export const AlbumCard = ({ data, index }) => {

}



export default DashboardAlbums;
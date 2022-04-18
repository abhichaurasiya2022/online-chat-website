import React from "react";


import VideoPlayer from "./Videoplayer/VideoPlayer";
import Options from "./Options/Options";
import Notifications from "./Options/Notifications";



const RegApp = () => {

    return (
        <div>

            <h3 variant="h2" align="center">Video Chat </h3>

            <VideoPlayer />
            <Options>
                <Notifications />
            </Options>
        </div>
    )
}

export default RegApp;

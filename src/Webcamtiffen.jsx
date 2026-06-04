import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function Webcamtiffin() {

    const webcamRef = useRef(null);
    const [image, setimage] = useState(null);

    function Change() {
        const screenshot = webcamRef.current.getScreenshot();
        setimage(screenshot);
    }

    async function sendimage(e) {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("image", image);

        let result= await fetch(`http://localhost:2000/webcam`,
            {

                method:"POST",
                body:formdata
            }
        )

        result= await result.json();

        console.log(result)
    }

    return (
        <>
            <h1>Webcam Page</h1>

            <form onSubmit={sendimage}>
                {!image &&
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        className="cam-video"
                    />
                }

                <button type="submit">Send</button>
            </form>

            <button onClick={Change}>Capture</button>

            {image &&
                <img src={image} alt="not found" width="200px" />
            }
        </>
    );
}

export default Webcamtiffin;
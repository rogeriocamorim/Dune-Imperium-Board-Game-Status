import "./cardsList.css";
import Cards from "../../components/Cards";
import {useEffect, useRef} from "react";

export const CardsListRoute = () => {
    const iframeRef = useRef(null);

    useEffect(() => {
        // Set up a message listener on the window to receive the iframe's height
        const handleIframeMessage = (event) => {
            if (typeof event.data === "number") {
                if (iframeRef.current) {
                    iframeRef.current.style.height = `${event.data}px`;
                }
            }
        };

        window.addEventListener("message", handleIframeMessage);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener("message", handleIframeMessage);
        };
    }, []);

    return (
        <iframe
            ref={iframeRef}
            src="https://dune-imperium-db-1.glitch.me/"
            style={{ width: '100%', border: 'none', overflow: 'hidden' }}
            title="External Content"
        ></iframe>
    );
};

export default CardsListRoute;

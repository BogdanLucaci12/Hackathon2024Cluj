import React, { useState } from "react";
import { EachStoryContainer, VoiceIcon } from "./story.styles";
import { AiFillSound } from "react-icons/ai";

const StoryContent = ({ content, onClick }) => {
    const [audio, setAudio] = useState(null);
    const [voiceOn, setVoiceOn] = useState(false);
    const handleClickAudio = async () => {
        if(audio!=null){
            audio.pause(); // Oprește redarea audio-ului existent
            audio.currentTime = 0; // Resetează timpul de redare
            setVoiceOn(false);
        }
          
        try {
            setVoiceOn(true)
            const response = await fetch("http://localhost:3002/api/convert-text-to-speech", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: content })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const newAudio = new Audio(url);
            newAudio.onended = () => setVoiceOn(false); 
            setAudio(newAudio);
            newAudio.play();
        } catch (error) {
            console.error("Failed to convert text to speech:", error);
        }
    };

    return (
        <EachStoryContainer onClick={onClick}>
            <VoiceIcon>
                <AiFillSound
                    style={{ fontSize: "1.5em" }}
                    onClick={handleClickAudio}
                />
            {voiceOn && <div>Voice in progress...</div>}
            </VoiceIcon>
            <div>
                {content}
            </div>
        </EachStoryContainer>
    );
};

export default StoryContent;

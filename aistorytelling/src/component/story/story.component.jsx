import StoryContent from "./contentOfStory.component";
import { useState, useContext, Fragment, useEffect } from "react";
import { StoryContainerClass } from "./story.styles";
import { ShowStoryContext } from "../../context/story.context";

const defaultStatusObject={
    firstStory:true,
    secondStory:true,
    thirdStory:true
}
   
const StoryContainer = () => {
    const [defaultStatus, setDefaultStatus] = useState(defaultStatusObject)
    const { showStory, story } = useContext(ShowStoryContext)
    const [all3Story, setAll3Story] = useState({story1:"", story2:"", story3:""})
    const {story1, story2, story3} = all3Story
    const handleClickOnAStory = (type) => {
        const newStatus = Object.keys(defaultStatus).reduce((acc, key) => {
            acc[key] = key === type;
            return acc;
        }, {});
        setDefaultStatus(newStatus);
    };
   useEffect(()=>{
       if (story){
           console.log('showStory:', story);
           const showStoryString = String(story);
           console.log('showStoryString:', showStoryString);
           const storyParts = showStoryString.split(/\d+\.\s/);
           console.log('storyParts:', storyParts);
           const filteredStoryParts = storyParts.filter(Boolean);
           console.log('filteredStoryParts:', filteredStoryParts);
           const story1 = filteredStoryParts[0] ? filteredStoryParts[0].trim() : '';
           const story2 = filteredStoryParts[1] ? filteredStoryParts[1].trim() : '';
           const story3 = filteredStoryParts[2] ? filteredStoryParts[2].trim() : '';
           setAll3Story({ story1, story2, story3 });
       }
   }, [story])
    return (
         < Fragment >
         {
                showStory && (
                    <StoryContainerClass>
                        {defaultStatus.firstStory && (
                            <StoryContent
                                content={story1}
                                onClick={() => handleClickOnAStory('firstStory')}
                            />
                        )}
                        {defaultStatus.secondStory && (
                            <StoryContent
                                content={story2}
                                onClick={() => handleClickOnAStory('secondStory')}
                            />
                        )}
                        {defaultStatus.thirdStory && (
                            <StoryContent
                                content={story3}
                                onClick={() => handleClickOnAStory('thirdStory')}
                            />
                        )}
                    </StoryContainerClass>
                )
         }
      
            </ Fragment >
           
        
        
    )
}
export default StoryContainer;
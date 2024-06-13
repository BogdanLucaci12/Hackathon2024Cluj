import { Fragment, useState, useContext, useEffect } from "react"
import InputProvider from "./inputProvider.component"
import { ShowStoryButton } from "../button/button.styles"
import { ShowStoryContext } from "../../context/story.context"
import { toast } from "react-toastify"


const objectForInput={
    age:"",
    storyType:"",
}

const Input = () => {
    const { setShowStory, showStory, setLoading, setStory } = useContext(ShowStoryContext)
    const [handleObject, setHandleObject] = useState(objectForInput)
   
    const {age, storyType}=handleObject
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setHandleObject({ ...handleObject, [name]: value });
    };
    
  const handleClickShowStory=async ()=>{
    setShowStory()
    if(handleObject.age==="" || handleObject.age===undefined){
        toast.warn("No age selected for user")
        return
    }
    else if (handleObject.storyType==="" || handleObject.storyType===undefined){
        toast.warn("No story selected for user")
        console.log(handleObject.storyType, handleObject.age)
        return
    }
    else{
            try {
                setLoading(true)
                const response = await fetch("http://localhost:3001/generate-text", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        age: handleObject.age,
                        storyType: handleObject.storyType
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                var result = '';
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    result += decoder.decode(value, { stream: true });
                  
                }
                
               
            } catch (error) {
                console.log(error)
                toast.error("Failed to fetch the story");
               
            }
            finally{
                setLoading(false);
                setShowStory(!showStory);
                setStory(result)
            }
     
    }
  }
    return (
        <Fragment>
           
            <InputProvider 
                textBox="Age"
                name="age"
                value={age}
                input={handleChangeInput} />
            <InputProvider 
                textBox="Type of Story"
                name="storyType"
                value={storyType}
                input={handleChangeInput} 
            />
            <ShowStoryButton 
                onClick={handleClickShowStory}>
                Show the story
            </ShowStoryButton>
        </Fragment>
    )
}
export default Input
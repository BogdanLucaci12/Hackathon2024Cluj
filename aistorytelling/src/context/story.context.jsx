import { Children, createContext, useContext, useState } from "react";

const string=""

export const ShowStoryContext=createContext({
    showStory:false,
    setShowStory:()=>{},
    loading:false,
    setLoading:()=>{},
    story:"",
    setStory:()=>{},
})

export const ShowStoryProvider = ({ children })=>{
    const [showStory, setShowStory]=useState(false)
    const [loading, setLoading] = useState(false)
    const [story, setStory]=useState("")
    console.log(story)
    const value = { showStory, setShowStory, loading, setLoading, story, setStory }
return (
    <ShowStoryContext.Provider value={value}>{children}</ShowStoryContext.Provider>
)
}
import { Fragment, useState } from "react"
import { DropdownClass, HiddedDropdown, LanguageOption } from "./dropdown.styles"
import { ShowStoryButton } from "../button/button.styles"
const arrayLanguage=["Romanian", "English", "French"]
const Dropdown=()=>{
    const [on, setOn]=useState(false)
    return (
        <DropdownClass>
            <ShowStoryButton onClick={()=>setOn(!on)}>Language</ShowStoryButton>
           {on &&           
            <HiddedDropdown >
                {arrayLanguage.map(l=>
                    <LanguageOption onClick={()=>setOn(!on)}>{l}</LanguageOption>
                )}
            </HiddedDropdown>
           }
        </DropdownClass>
    ) 
}
export default Dropdown
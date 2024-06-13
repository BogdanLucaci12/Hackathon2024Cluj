import styled from "styled-components";

export const DropdownClass=styled.div`
position: absolute;
top:1em;
left:1em;
display: flex;
`
export const HiddedDropdown=styled.div`
display: flex;
flex-direction: column;
gap:.4em;

`

export const LanguageOption=styled.div`
box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 12px 7px;
  cursor: pointer;
  background-color:rgba(255,255,255,.9);
    border-radius: 1em;
    text-align: center;
    width:10em;
    &:hover{
        background-color:black;
        color:white;
    }
`
import styled from 'styled-components';

export const EachStoryContainer = styled.div`
position: relative;
  width: 25em;
  height: 56vh;
  border-radius: 1em;
  margin: 1em;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 12px 7px;
  cursor: pointer;
  background-color:rgba(255,255,255,.9);
transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

export const StoryContainerClass = styled.div`
display: flex;
@media only screen and (max-width: 600px) {
  display:block;
  width: 100vw;
}
`
export const VoiceIcon=styled.div`
position:absolute;
top:26em;
left:1em;
display: flex;
gap:1em;
`
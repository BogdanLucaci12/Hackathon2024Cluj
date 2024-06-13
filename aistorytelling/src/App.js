import Input from "./component/input/input.component";
import { AppClass } from "./app.styles";
import StoryContainer from "./component/story/story.component";
import { Fragment, useContext } from "react";
import { useState } from "react";
import WarningMessage from "./component/message/warning.component";
import Notification from "./component/notification/notification.component";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ShowStoryContext } from "./context/story.context";
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from "./component/dropdown/dropdown.component";
const App=()=> {
  const [warning, setWarning]=useState(true)
  const {loading}=useContext(ShowStoryContext)
  const handleClickWarningMessage=()=>{
    setWarning(!warning)
  }
  return (
    <AppClass>
      <h4 style={{position:"absolute", top:"1em"}}>AI StoryTeller</h4>
      {warning ? (<WarningMessage
      click={handleClickWarningMessage}
      />):
        (  
        <Fragment>
            <Dropdown />
          <Input/>
            {loading ? (<Spinner animation="border" variant="dark" />) : <StoryContainer />}
        </Fragment>)
      }
   <Notification/>
    </AppClass>
  );
}

export default App;

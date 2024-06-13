import { Fragment } from "react"
import { WarningMessageClass } from "./warning.styles"
const WarningMessage = ({ click }) => {

    return (
        <WarningMessageClass>
            <div style={{display:"flex", flexDirection:"column", gap:"1em"}}>
                <h4>
                    To be able to use the website, please review the  <i style={{ cursor: "pointer" }}>terms and conditions.</i>
                </h4>
                <h4>
                    Confirm that you are indeed the parent of the child.
                </h4>
            </div>
            <div style={{ display: "flex", gap: "2em", marginTop:"5em"}}>
                <label htmlFor="">
                    <h5>
                        Check the box
                    </h5>
                </label>
                <input
                    type="radio"
                    onClick={click}
                />
            </div>
        </WarningMessageClass>
    )
}
export default WarningMessage


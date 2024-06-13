import { Fragment } from "react"
import { InputProviderClass } from "./input.styles"
const InputProvider = ({ textBox, name, value, input })=>{
    return (
        <InputProviderClass>
                <div>
                    {textBox}
                </div>
                <div>
                    <input 
                    name={name}
                    value={value}
                    onChange={input}
                    />
                </div>
        </InputProviderClass>
    )
}
export default InputProvider
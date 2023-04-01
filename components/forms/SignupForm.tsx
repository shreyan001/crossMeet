import { useState, ChangeEvent, useContext } from "react";
import { ISignupInput } from "../../types";
import SignupBtn from "../buttons/SignupBtn";
import { AuthContext } from "../../context/auth";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const SignupForm : React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [signupInput, setSignupInput] = useState<ISignupInput>({
        handle: "",
        name: "",
        bio: "",
        operator: "",
        avatar:""
    });


    const { indexingProfiles, setIndexingProfiles, connectWallet, checkNetwork } =
		useContext(AuthContext);


    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setSignupInput({
            ...signupInput,
            [name]: value
        });
    };

    if(!isOpen){return null};

    return (<div className="popup">
        <div className="form popup-content ">
            <h2>Create profile</h2>
            <div>
                <label>Handle (w/o @)</label>
                <input
                    name="handle"
                    value={signupInput.handle}
                    onChange={handleOnChange}
                ></input>
            </div>
            <div>
                <label>Avatar URL</label>
                <input
                    name="avatar"
                    value={signupInput.avatar}
                    onChange={handleOnChange}
                    placeholder="https://"
                ></input>
            </div>
            <div>
                <label>Name</label>
                <input
                    name="name"
                    value={signupInput.name}
                    onChange={handleOnChange}
                ></input>
            </div>
            <div>
                <label>Bio</label>
                <input
                    name="bio"
                    value={signupInput.bio}
                    onChange={handleOnChange}
                ></input>
            </div>
            <div>
                <label>Operator address (optional)</label>
                <input
                    name="operator"
                    value={signupInput.operator}
                    onChange={handleOnChange}
                    placeholder="0x..."
                ></input>
            </div>
            <div className="form-note"><strong>Note:</strong> For empty fields we will randomly generate values.</div>
            <SignupBtn {...signupInput} />
            <button className="button1" onClick={()=>{onClose()}}>Close</button>
        </div>
   </div> );
};

export default SignupForm;

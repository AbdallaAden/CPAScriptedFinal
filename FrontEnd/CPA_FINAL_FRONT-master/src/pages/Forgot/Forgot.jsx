import "./forgot.css"

export default function Forgot() {
  return (
    <div className="forgot">
        <div className="forgotWrapper">
            <div className="forgotLeft">
                <h3 className="forgotLogo">CPA SCRIPTED</h3>
                <span className="forgotDesc">Forgot Password</span>
            </div>
            <div className="forgotRight">
                <div className="forgotBox">
                
                    <input placeholder="Email" className="forgotInput" />
                    
                    <button className="verifyButton">Send CODE to your email</button>
                    <input placeholder="Verification Code" className="forgotInput" />
                    <button className="forgotButton">Submit</button>
                    
                    
                </div>
            </div>
        </div>
    </div>
  )
}

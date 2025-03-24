

function CharFeatureInput({onFeatureChange})
{

    return(
        <>
        <label className="createLabel">Character Features & Traits</label>
        <textarea type="text" className="featureInput" id="features" placeholder="Enter the features and traits of your character"  
            onChange={(e) => onFeatureChange(e.target.value)} 
        ></textarea>
        
        </>
    )

}
export default CharFeatureInput;
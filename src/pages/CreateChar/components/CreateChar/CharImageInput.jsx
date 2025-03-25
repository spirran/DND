function CharImageInput({selectedImage,onImageChange})
{

    return(
        <>
        <section className="imageSection">
        <img src={selectedImage} alt="charImage" className="charImage"></img>
        <input type="text" className="imageInput" id="image" placeholder="Enter the URL of your character image"
        value = {selectedImage ?? null} 
            onChange={(e) => onImageChange(e.target.value)}
        ></input>

        </section>
        
        </>
    )

}
export default CharImageInput;
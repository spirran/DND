/**
 * CharImageInput React Component
 * 
 * This is a component that provides an input field for the user to input a custom image URL for their character
 * 
 * @component
 * @param {Object} props - The component props object.
 * @param {string} props.selectedImage - The currently selected image URL.
 * @param {Function} props.onImageChange - Event handler prop from the parent component for when the image URL is updated.
 * 
 * @returns {JSX.Element} The CharImageInput component.
 * 
 */


function CharImageInput({ selectedImage, onImageChange }) {

    return (
        <>
            <section className="imageSection">
                <img src={selectedImage} alt="charImage" className="charImage"></img>
                <input type="text" className="imageInput" id="image" placeholder="Enter the URL of your character image"
                    value={selectedImage ?? null}
                    onChange={(e) => onImageChange(e.target.value)}
                ></input>

            </section>

        </>
    )

}
export default CharImageInput;
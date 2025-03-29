
/**
 * SelectAttrCheckbox React component
 * 
 * This component provides a checkbox for the user to select whether to use the standard array method for 
 * selecting Dungeons and Dragons character attributes.
 * 
 * @component
 * @param {Object} props - The component props object.
 * @param {Function} props.onSelectChange - Event handler prop from the parent component for when the checkbox state changes.
 * 
 * @returns {JSX.Element} The SelectAttrCheckbox component.
 */

function SelectAttrCheckbox({ onSelectChange }) {

    return (
        <>
            <label className="selectAttrCheckLabel">Use standard array?</label>
            <input
                type="checkbox"
                className="selectAttrCheck"
                defaultChecked={false}
                onChange={(e) => onSelectChange(e.target.checked)}
            />
        </>
    )

}
export default SelectAttrCheckbox;
function SelectAttrCheckbox({onSelectChange, useStandard})
{

    return(
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
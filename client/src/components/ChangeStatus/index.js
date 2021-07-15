import React from 'react';
import './style.css';
import Select from 'react-select';

const options = [
    {value:"0", label:"Watching"},
    {value:"2", label:"Want to Watch"},
    {value:"4", label:"Complete"}
]
export default function ChangeStatus() {
    return (
        <React.Fragment>
            <div className='changeStatus'>
            <Select 
                value={options.value}
                options={options}
                placeholder={"Add to my list:"}
            />
            </div>
        </React.Fragment>
    );
}

import React from 'react';

export default function ChangeStatus() {
    return (
        <React.Fragment>
            <select class="changeStatus">
                <option value="default" selected disabled hidden>
                    Add to my list:
                </option>
                <option value="0">Watching</option>
                <option value="2">Want to Watch</option>
                <option value="4">Complete</option>
            </select>
        </React.Fragment>
    );
}

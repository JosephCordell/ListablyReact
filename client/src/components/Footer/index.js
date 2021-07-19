import React from "react"; 
import './style.css';


    export default function Footer() {
        return (
            <React.Fragment>
                <div className='footer'>If you have any questions, comments or issues, please submit an <a href="https://github.com/JosephCordell/ListablyReact/issues">issue</a> on Github
                <div className='credits'> Source data provided by The Movie DB & JustWatch</div>
                </div>
            </React.Fragment>
        )
    }
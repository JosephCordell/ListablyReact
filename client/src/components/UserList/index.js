import React from 'react';

export default function UserList({ mediaArr }) {
    return (
        <React.Fragment>
            { mediaArr && mediaArr.map(media => (
            <div className={`card-container ${media.mediatype}`}>
                <div
                    className="card-info"
                    data-title={media.title}
                    data-poster={media.poster_path}
                    data-id={media.id}
                    data-type="media"
                    data-description={media.overview}
                    data-todo={media.todo}
                >
                    <img src={media.poster_path} alt={media.mediatype} className="card-image" />

                    <div className="card-title">{media.title}</div>

                    <select className="changeStatusUser">
                        <option value="0" selected={media.todo0}>
                            Watching
                        </option>
                        <option value="2" selected={media.todo2}>
                            Want to Watch
                        </option>
                        <option value="4" selected={media.todo4} >
                            Completed
                        </option>
                        <option value="6" selected={media.todo6}>
                            Dropped
                        </option>
                    </select>
                </div>
            </div>
))}
            { !mediaArr && (<div className="empty-list">Nothing added yet. Add to your list by searching or looking at trending</div>) }
        </React.Fragment>
    );
}

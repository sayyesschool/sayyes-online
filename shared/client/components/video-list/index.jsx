import React from 'react';
import {
    Icon,
    List
} from 'mdc-react';

export default function VideoList({ videos, selectedVideo, onClick }) {
    return (
        <List className="video-list" twoLine>
            {videos.map(video =>
                <List.Item
                    key={video.id}
                    primaryText={video.title}
                    secondaryText={video.filename}
                    meta={video.duration}
                    activated={video === selectedVideo}
                    onClick={() => onClick(video)}
                />
            )}
        </List>
    );
}
import Button from 'shared/ui-components/button';
import List from 'shared/ui-components/list';

export default function VideoList({ videos, selectedVideo, onClick, onDelete }) {
    return (
        <List className="video-list">
            {videos.map(video =>
                <List.Item
                    key={video.id}
                    header={video.title}
                    content={video.duration}
                    activated={video === selectedVideo}
                    endMedia={
                        <Button
                            icon={<Icon>delete</Icon>}
                            onClickCapture={() => onDelete(video)}
                        />
                    }
                    onClick={() => onClick(video)}
                />
            )}
        </List>
    );
}
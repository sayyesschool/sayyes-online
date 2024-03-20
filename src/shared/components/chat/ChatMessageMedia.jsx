export default function ChatMessageMedia({ media }) {
    const handleClick = () => {
        media.getContentTemporaryUrl().then(url => {
            const anchorEl = document.createElement('a');

            anchorEl.href = url;
            anchorEl.target = '_blank';
            anchorEl.rel = 'noopener';

            // setTimeout is needed in order to open files in iOS Safari.
            setTimeout(() => {
                anchorEl.click();
            });
        });
    };

    return (
        <div className="ChatMessageMedia" onClick={handleClick}>
            <Icon name="download" />

            <div className="ChatMessageMedia__info">
                <p className={classes.filename}>{media.filename}</p>
                <p className={classes.size}>{formatFileSize(media.size)} - Click to open</p>
            </div>
        </div>
    );
}

function formatFileSize(bytes, suffixIndex = 0) {
    const suffixes = ['байт', 'Кб', 'Мб', 'Гб'];
    if (bytes < 1000) return +bytes.toFixed(2) + ' ' + suffixes[suffixIndex];
    return formatFileSize(bytes / 1024, suffixIndex + 1);
}
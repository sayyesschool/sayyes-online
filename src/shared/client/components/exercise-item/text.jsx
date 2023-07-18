import TextContent from 'shared/components/text-content';

export default function TextItem({ content, className }) {
    return (
        <div className={className}>
            <TextContent
                content={content}
            />
        </div>
    );
}
import Content from 'shared/components/content';

export default function TextItem({ content, className }) {
    return (
        <div className={className}>
            <Content content={content} html />
        </div>
    );
}
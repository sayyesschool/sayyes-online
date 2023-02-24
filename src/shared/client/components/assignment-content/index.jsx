import './index.scss';

export default function AssignmentContent({ assignment }) {
    return (
        <article
            className="assignment-content"
            dangerouslySetInnerHTML={{ __html: assignment.content }}
        />
    );
}
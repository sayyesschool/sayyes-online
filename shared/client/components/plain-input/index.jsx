import './index.scss';

export default function PlainInput({
    value,
    ...props
}) {
    return (
        <span className="plain-input">
            <span>{value}</span>

            <input
                value={value}
                {...props}
            />
        </span>
    );
}
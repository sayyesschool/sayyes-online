import './index.scss';

export default function Breadcrumbs({ items }) {
    return (
        <div className="breadcrumbs">
            {React.Children.map(items, item =>
                React.isValidElement(item) ?
                    React.cloneElement(item, { className: 'breadcrumbs__item' }) :
                    <span className="breadcrumbs__item">{item}</span>
            )}
        </div>
    );
}
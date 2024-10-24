import classnames from 'shared/utils/classnames';

export default function PageContent({ className, ...props }) {
    const classNames = classnames('PageContent', className);

    return (
        <div className={classNames} {...props} />
    );
}
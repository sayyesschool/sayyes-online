import NavBar from 'shared/components/nav-bar';

import './index.scss';

export default function AppBar({
    user,
    items,
    ...props
}) {
    return (
        <div className="app-bar" {...props}>
            <NavBar items={items} />
        </div>
    );
}
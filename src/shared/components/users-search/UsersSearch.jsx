import { Link } from 'react-router-dom';

import SearchForm from 'shared/components/search-form';
import { ListItem } from 'shared/ui-components';

export default function UsersSearch({ params }) {
    console.log('UsersSearch params:', params);

    return (
        <SearchForm
            url="/api/users"
            params={params}
            getOptionLabel={option => option?.fullname ?? ''}
            renderResult={result =>
                <ListItem
                    as={Link}
                    to={result.data.url}
                    content={result.data.fullname}
                />
            }
        />
    );
}
import { Link } from 'react-router-dom';

import SearchForm from 'shared/components/search-form';
import { ListItem } from 'shared/ui-components';

const defaultParams = {
    role: 'learner'
};

export default function LearnersSearchForm() {
    return (
        <SearchForm
            url="/api/users"
            params={defaultParams}
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
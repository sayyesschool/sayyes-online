import Page from 'shared/components/page';
import CoursesGrid from 'shared/components/courses-grid';
import MaterialsGrid from 'shared/components/materials-grid';
import { Heading } from 'shared/ui-components';

import { useStore } from 'app/store';

import './index.scss';

export default function HomePage() {
    const [courses] = useStore('courses.list');
    const [materials] = useStore('materials.list');

    return (
        <Page className="HomePage">
            <Page.Header title="Главная" />

            <Page.Content>
                <Heading type="h6" content="Курсы" />
                <CoursesGrid
                    courses={courses}
                />

                <Heading type="h6" content="Материалы" />
                <MaterialsGrid
                    materials={materials}
                />
            </Page.Content>
        </Page>
    );
}
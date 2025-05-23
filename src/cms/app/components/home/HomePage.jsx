import CoursesGrid from 'shared/components/courses-grid';
import MaterialsGrid from 'shared/components/materials-grid';
import Page from 'shared/components/page';
import VocabulariesGrid from 'shared/components/vocabularies-grid';
import { useVocabularies } from 'shared/hooks/vocabularies';

import { useStore } from 'cms/store';

export default function HomePage() {
    const [courses] = useStore('courses.list');
    const [materials] = useStore('materials.list');
    const [vocabularies] = useVocabularies();

    return (
        <Page className="HomePage">
            <Page.Content>
                <Page.Section
                    title="Курсы"
                    compact
                    plain
                >
                    <CoursesGrid
                        courses={courses}
                    />
                </Page.Section>

                <Page.Section
                    title="Материалы"
                    compact
                    plain
                >
                    <MaterialsGrid
                        materials={materials}
                    />
                </Page.Section>

                <Page.Section
                    title="Словари"
                    compact
                    plain
                >
                    <VocabulariesGrid
                        vocabularies={vocabularies}
                    />
                </Page.Section>
            </Page.Content>
        </Page>
    );
}
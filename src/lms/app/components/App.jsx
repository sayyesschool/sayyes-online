import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Switch } from 'react-router-dom';

import AppContent from 'shared/components/app-content';
import AppHeader from 'shared/components/app-header';
import AppNav from 'shared/components/app-nav';
import AppNotification from 'shared/components/app-notification';
import AppShell from 'shared/components/app-shell';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useUser } from 'shared/hooks/user';

import Assignments from 'lms/components/assignments';
import Courses from 'lms/components/courses';
import Enrollments from 'lms/components/enrollments';
import { LearnerHomePage, TeacherHomePage } from 'lms/components/home';
import Vocabularies from 'lms/components/vocabulary';
import navItems from 'lms/data/nav';

import styles from './App.module.scss';

const PageHomeByRole = {
    learner: LearnerHomePage,
    teacher: TeacherHomePage
};

export default function App() {
    const [user] = useUser();

    if (!user) return <LoadingIndicator fullscreen />;

    return (
        <DndProvider backend={HTML5Backend}>
            <AppShell className={styles.root}>
                <AppHeader user={user}>
                    <AppNav
                        items={navItems}
                        orientation="horizontal"
                        invertedColors
                    />
                </AppHeader>

                <AppContent>
                    <Switch>
                        <Route
                            path="/"
                            component={PageHomeByRole[user.role]}
                            exact
                        />

                        <Route
                            path="/assignments"
                            component={Assignments}
                        />

                        <Route
                            path="/courses"
                            component={Courses}
                        />

                        <Route
                            path="/enrollments"
                            component={Enrollments}
                        />

                        <Route
                            path="/vocabulary"
                            component={Vocabularies}
                        />

                        {/* <Route path="/materials" component={Materials} /> */}
                    </Switch>
                </AppContent>

                <AppNotification />
            </AppShell>
        </DndProvider>
    );
}
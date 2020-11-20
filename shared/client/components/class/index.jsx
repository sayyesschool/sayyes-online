import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { useSelector } from 'shared/hooks/store';
import { useEnrollment } from 'shared/hooks/enrollment';
import LoadingIndicator from 'shared/components/loading-indicator';
import PageSideSheet from 'shared/components/page-side-sheet';
import Conversation from 'shared/components/conversation';

import Enrollment from './enrollment-page';
import Course from './course-page';
import Unit from './unit-page';
import Material from './material-page';

import './index.scss';

export default function ClassRouter({ match }) {
    const user = useSelector(state => state.user);
    const enrollments = useSelector(store => store.enrollments.list);
    const [enrollment] = useEnrollment(match.params.id);

    if (!match.params.id) {
        if (!enrollments) return <LoadingIndicator />;
        else return <Redirect exact from="/class" to={`/class/${enrollments[0].id}`} />;
    } else if (match.params.id && !enrollment) {
        return <LoadingIndicator />;
    }

    return (
        <div className="class">
            <Route path="/class/:enrollmentId">
                <PageSideSheet
                    className="class-side-sheet"
                    appContentSelector=".class-content"
                >
                    <Conversation
                        name={enrollment.id}
                        localParticipant={user}
                        remoteParticipant={user.role === 'teacher' ? enrollment.client : enrollment.teacher}
                    />
                </PageSideSheet>
            </Route>

            <div className="class-content">
                <Switch>
                    <Route exact path="/class/:enrollmentId" component={Enrollment} />
                    <Route exact path="/class/:enrollmentId/course/:courseId" component={Course} />
                    <Route exact path="/class/:enrollmentId/course/:courseId/unit/:unitId" component={Unit} />
                    <Route exact path="/class/:enrollmentId/materials/:materialId" component={Unit} />
                </Switch>
            </div>
        </div>
    );
}
import Home from 'app/components/home';
import Clients from 'app/components/clients';
import Courses from 'app/components/courses';
import Lessons from 'app/components/lessons';
import Managers from 'app/components/managers';
import Materials from 'app/components/materials';
import Meetings from 'app/components/meetings';
import Packs from 'app/components/packs';
import Payments from 'app/components/payments';
import Requests from 'app/components/requests';
import Teachers from 'app/components/teachers';

export default [
    { path: '/', exact: true, component: Home },
    { path: '/clients', exact: false, component: Clients },
    { path: '/courses', exact: false, component: Courses },
    { path: '/lessons', exact: false, component: Lessons },
    { path: '/managers', exact: false, component: Managers },
    { path: '/materials', exact: false, component: Materials },
    { path: '/meetings', exact: false, component: Meetings },
    { path: '/packs', exact: false, component: Packs },
    { path: '/payments', exact: false, component: Payments },
    { path: '/requests', exact: false, component: Requests },
    { path: '/teachers', exact: false, component: Teachers }
];
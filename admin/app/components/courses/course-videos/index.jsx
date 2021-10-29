import PageFAB from 'shared/components/page-fab';

import VideoList from 'shared/components/video-list';

export default function CourseVideos({ course }) {
    return (
        <section className="course-videos">
            <VideoList
                videos={course.videos}
            />

            <PageFAB
                icon="add"
            />
        </section>
    );
}
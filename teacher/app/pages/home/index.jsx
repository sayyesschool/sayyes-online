import React, { useState, useCallback } from 'react';
import {
    Banner,
    Button,
    Icon,
    LayoutGrid, LayoutGridCell,
    Typography
} from 'mdc-react';

import { useSelector } from 'shared/hooks/store';

import LessonCard from 'app/components/lessons/lesson-card';

import './index.scss';

export default function HomePage() {
    const account = useSelector(store => store.account);
    const lessons = useSelector(store => store.lessons);

    return (
        <main id="home-page" className="page">
            <header>
                <Typography element="h1" type="headline4">Привет, {account.firstname}! 👋</Typography>
                <Typography>На встречах разговорного клуба Вас ждут живое общение на английском языке, интересные темы для обсуждения и новые знакомства. Вы наконец-то сможете сломать языковой барьер!</Typography>
            </header>

            <section>
                <LayoutGrid>
                    <LayoutGridCell span="12">
                        <Typography element="h2" type="headline6" noMargin>Мои уроки</Typography>

                        {lessons && lessons.map(lesson =>
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                            />
                        )}
                    </LayoutGridCell>
                </LayoutGrid>
            </section>
        </main>
    );
}
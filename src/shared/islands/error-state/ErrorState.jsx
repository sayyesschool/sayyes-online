export default function ErrorState({ error }) {
    const subject = encodeURIComponent('Ошибка на сайте');
    const body = encodeURIComponent(error?.message ?? '');
    const href = `mailto:help@sayyes.school?subject=${subject}&body=${body}`;

    return (
        <div className="error-state">
            <img src="https://static.sayes.ru/images/cat/cat-sad.png" alt="" />
            <h2 className="heading-3">Ошибка на сайте</h2>
            <p className="text--body1 w-100 mb-s">Что-то пошло не так. Попробуйте выполнить действие еще раз. Если вновь будет ошибка, <a href={href}>напишите нам на почту</a>, мы исправим её как можно быстрее.</p>

            <div className="text--body2 w-100">
                <p>Техническое описание:</p>
                <code>{error?.message}</code>
            </div>
        </div>
    );
}
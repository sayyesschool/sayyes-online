import { Flex, IconButton, Input } from 'shared/ui-components';

export default function SettingForm({
    data = { key: '', value: '' },
    buttonContent = 'Сохранить',
    onSubmit,
    ...props
}) {
    const handleSubmit = event => {
        event.preventDefault();

        onSubmit(new FormData(event.target), event.target);
    };

    return (
        <form onSubmit={handleSubmit} {...props}>
            <Flex gap="s" align="flex-end">
                <Input
                    name="value"
                    placeholder="Название"
                    defaultValue={data?.value}
                    required
                />

                <Input
                    name="key"
                    placeholder="Значение"
                    defaultValue={data?.key}
                    required
                />

                <IconButton
                    type="submit"
                    icon="save"
                    variant="outlined"
                />
            </Flex>
        </form>
    );
}
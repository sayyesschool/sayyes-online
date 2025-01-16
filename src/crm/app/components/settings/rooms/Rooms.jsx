import { useCallback, useEffect, useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import PageSection from 'shared/components/page-section';
import { useBoolean } from 'shared/hooks/state';
import Surface from 'shared/ui-components/surface';

import RoomForm from 'crm/components/rooms/room-form';
import RoomsTable from 'crm/components/rooms/rooms-table';
import { useStore } from 'crm/store';

export default function Rooms() {
    const [rooms, actions] = useStore('rooms.list');
    const [room, setRoom] = useState();

    const [isFormOpen, toggleFormOpen] = useBoolean(false);
    const [isConfirmDialogOpen, toggleConfirmDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getRooms();
    }, []);

    const createRoom = useCallback(data => {
        return actions.createRoom(data)
            .then(() => toggleFormOpen(false));
    }, []);

    const updateRoom = useCallback(data => {
        return actions.updateRoom(room.id, data)
            .then(() => {
                setRoom();
                toggleFormOpen(false);
            });
    }, [room]);

    const deleteRoom = useCallback(() => {
        return actions.deleteRoom(room.id)
            .then(() => {
                setRoom();
                toggleConfirmDialogOpen(false);
            });
    }, [room]);

    const toggleRoomActive = useCallback(room => {
        return actions.updateRoom(room.id, { active: !room.active });
    }, []);

    const handleCreate = useCallback(() => {
        setRoom();
        toggleFormOpen(true);
    }, []);

    const handleEdit = useCallback(room => {
        setRoom(room);
        toggleFormOpen(true);
    }, []);

    const handleDelete = useCallback(room => {
        setRoom(room);
        toggleConfirmDialogOpen(true);
    }, []);

    if (!rooms) return <LoadingIndicator />;

    return (
        <PageSection
            title="Аудитории"
            actions={[{
                key: 'add',
                icon: 'add',
                content: 'Добавить аудиторию',
                variant: 'solid',
                color: 'primary',
                onClick: handleCreate
            }]}
            plain
            compact
        >
            <Surface variant="outlined">
                <RoomsTable
                    rooms={rooms}
                    onEdit={handleEdit}
                    onToggleActive={toggleRoomActive}
                    onDelete={handleDelete}
                />
            </Surface>

            <FormDialog
                title={room ? 'Редактирование аудитории' : 'Новая аудитория'}
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <RoomForm
                    id="room-form"
                    room={room}
                    onSubmit={room ? updateRoom : createRoom}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Подтвердите действие"
                message={'Вы действительно хотите удалить комнату?'}
                open={isConfirmDialogOpen}
                onConfirm={deleteRoom}
                onClose={toggleConfirmDialogOpen}
            />
        </PageSection>
    );
}
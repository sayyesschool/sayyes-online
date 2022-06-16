import { useCallback, useEffect, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import IconButton from 'shared/components/icon-button';
import LoadingIndicator from 'shared/components/loading-indicator';
import PageSection from 'shared/components/page-section';

import { useStore } from 'app/hooks/store';
import RoomForm from 'app/components/rooms/room-form';
import RoomsTable from 'app/components/rooms/rooms-table';

export default function Rooms() {
    const [rooms, actions] = useStore('rooms.list');
    const [room, setRoom] = useState();

    const [isFormOpen, toggleFormOpen] = useBoolean(false);
    const [isConfirmDialogOpen, toggleConfirmDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getRooms();
    }, []);

    const createRoom = useCallback(data => {
        actions.createRoom(data)
            .then(() => toggleFormOpen(false));
    }, []);

    const updateRoom = useCallback(data => {
        actions.updateRoom(room.id, data)
            .then(() => {
                setRoom();
                toggleFormOpen(false);
            });
    }, [room]);

    const deleteRoom = useCallback(() => {
        actions.deleteRoom(room.id)
            .then(() => {
                setRoom();
                toggleConfirmDialogOpen(false);
            });
    }, [room]);

    const toggleRoomActive = useCallback((room) => {
        actions.updateRoom(room.id, { active: !room.active });
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
            title="Комнаты"
            actions={
                <IconButton
                    title="Создать"
                    icon="add"
                    flat
                    onClick={handleCreate}
                />
            }
            compact
        >
            <RoomsTable
                rooms={rooms}
                onEdit={handleEdit}
                onToggleActive={toggleRoomActive}
                onDelete={handleDelete}
            />

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
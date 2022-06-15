import {
    Button,
    Icon,
    Dialog, DialogTitle, DialogContent, DialogActions,
    List, ListItem, ListItemGraphic, ListItemText,
    Typography
} from 'mdc-react';

import './index.scss';

export default function MeetingLevelDialog({ onClose, ...props }) {
    return (
        <Dialog
            id="meeting-level-dialog"
            onClose={onClose}
            {...props}
        >
            <DialogTitle>Уровни встреч</DialogTitle>

            <DialogContent>
                <Typography>Для всех студентов, обучающихся по курсу "Touchstone" или "Viewpoint" приводим соответствие:</Typography>

                <List>
                    <ListItem className="meeting-level meeting-level--beginner">
                        <ListItemGraphic>
                            <Icon>star</Icon>
                        </ListItemGraphic>

                        <ListItemText
                            primary="Beginner"
                            secondary="Touchstone 1"
                        />
                    </ListItem>

                    <ListItem className="meeting-level meeting-level--elementary">
                        <ListItemGraphic>
                            <Icon>star</Icon>
                        </ListItemGraphic>

                        <ListItemText
                            primary="Elementary"
                            secondary="Touchstone 2"
                        />
                    </ListItem>

                    <ListItem className="meeting-level meeting-level--pre-intermediate">
                        <ListItemGraphic>
                            <Icon>star</Icon>
                        </ListItemGraphic>

                        <ListItemText
                            primary="Pre-Intermediate"
                            secondary="Touchstone 3"
                        />
                    </ListItem>

                    <ListItem className="meeting-level meeting-level--intermediate">
                        <ListItemGraphic>
                            <Icon>star</Icon>
                        </ListItemGraphic>

                        <ListItemText
                            primary="Intermediate"
                            secondary="Touchstone 4"
                        />
                    </ListItem>

                    <ListItem className="meeting-level meeting-level--upper-intermediate">
                        <ListItemGraphic>
                            <Icon>star</Icon>
                        </ListItemGraphic>

                        <ListItemText
                            primary="Upper-Intermediate"
                            secondary="Viewpoint 1"
                        />
                    </ListItem>

                    <ListItem className="meeting-level meeting-level--advanced">
                        <ListItemGraphic>
                            <Icon>star</Icon>
                        </ListItemGraphic>

                        <ListItemText
                            primary="Advanced"
                            secondary="Viewpoint 2"
                        />
                    </ListItem>
                </List>

                <Typography>Если вы не знаете, какой у вас уровень по представленной шкале, уточните у вашего преподавателя.</Typography>
            </DialogContent>

            <DialogActions>
                <Button type="button" onClick={onClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
}
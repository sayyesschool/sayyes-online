import { FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core';

import { useAppState } from '../../../state';

const MAX_PARTICIPANT_OPTIONS = [6, 12, 24];

export default function MaxGalleryViewParticipants() {
    const { maxGalleryViewParticipants, setMaxGalleryViewParticipants } = useAppState();

    return (
        <div>
            <Typography variant="subtitle2" gutterBottom>
        Max Gallery View Participants
            </Typography>

            <Grid alignItems="center" justifyContent="space-between" container>
                <div className="inputSelect">
                    <FormControl fullWidth>
                        <Select
                            value={maxGalleryViewParticipants}
                            variant="outlined"
                            onChange={e => setMaxGalleryViewParticipants(parseInt(e.target.value))}
                        >
                            {MAX_PARTICIPANT_OPTIONS.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </Grid>
        </div>
    );
}

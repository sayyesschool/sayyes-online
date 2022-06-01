import { useCallback } from 'react';
import { Dialog, Input, Text } from '@fluentui/react-northstar';

import { inputLabels, RenderDimensions } from 'app/data/settings';
import useAppState from 'app/hooks/useAppState';
import useRoomState from 'app/hooks/useRoomState';

const withDefault = (val) => (typeof val === 'undefined' ? 'default' : val);

function FormControl(props) {
    return (
        <div className="form-control" {...props} />
    );
}

const RenderDimensionItems = RenderDimensions.map(({ label, value }) => ({
    key: value,
    value,
    text: label
}));

export default function ConnectionOptionsDialog({ open, onClose }) {
    const { settings, dispatchSetting } = useAppState();
    const roomState = useRoomState();

    const handleChange = useCallback(event => {
        dispatchSetting({ name: event.target.name, value: event.target.value });
    }, [dispatchSetting]);

    const handleNumberChange = useCallback(event => {
        if (!/[^\d]/.test(e.target.value)) handleChange(e);
    }, [handleChange]);

    const isDisabled = roomState !== 'disconnected';

    return (
        <Dialog
            open={open} onClose={onClose}
            header="Connection Settings"
            content={<>
                <Text hidden={!isDisabled}>These settings cannot be changed when connected to a room.</Text>

                <FormControl>
                    <Text id={inputLabels.dominantSpeakerPriority}>Dominant Speaker Priority:</Text>

                    <Select
                        name={inputLabels.dominantSpeakerPriority}
                        value={withDefault(settings.dominantSpeakerPriority)}
                        label={inputLabels.dominantSpeakerPriority}
                        disabled={isDisabled}
                        onChange={handleChange}
                    >
                        <Select.Option value="low">Low</Select.Option>
                        <Select.Option value="standard">Standard</Select.Option>
                        <Select.Option value="high">High</Select.Option>
                        <Select.Option value="default">Server Default</Select.Option>
                    </Select>
                </FormControl>

                <FormControl>
                    <Text id={inputLabels.trackSwitchOffMode}>Track Switch Off Mode:</Text>

                    <Select
                        name={inputLabels.trackSwitchOffMode}
                        value={withDefault(settings.trackSwitchOffMode)}
                        label={inputLabels.trackSwitchOffMode}
                        disabled={isDisabled}
                        onChange={handleChange}
                    >
                        <Select.Option value="predicted">Predicted</Select.Option>
                        <Select.Option value="detected">Detected</Select.Option>
                        <Select.Option value="disabled">Disabled</Select.Option>
                        <Select.Option value="default">Server Default</Select.Option>
                    </Select>
                </FormControl>

                <FormControl>
                    <Text id={inputLabels.bandwidthProfileMode}>Mode:</Text>

                    <Select
                        name={inputLabels.bandwidthProfileMode}
                        label={inputLabels.bandwidthProfileMode}
                        value={withDefault(settings.bandwidthProfileMode)}
                        disabled={isDisabled}
                        onChange={handleChange}
                    >
                        <Select.Option value="grid">Grid</Select.Option>
                        <Select.Option value="collaboration">Collaboration</Select.Option>
                        <Select.Option value="presentation">Presentation</Select.Option>
                        <Select.Option value="default">Server Default</Select.Option>
                    </Select>
                </FormControl>

                <FormControl>
                    <Input
                        id={inputLabels.maxTracks}
                        name={inputLabels.maxTracks}
                        value={withDefault(settings.maxTracks)}
                        label="Max Tracks"
                        placeholder="Leave blank for no limit"
                        disabled={isDisabled}
                        onChange={handleNumberChange}
                    />
                </FormControl>

                <FormControl>
                    <Input
                        id={inputLabels.maxAudioBitrate}
                        name={inputLabels.maxAudioBitrate}
                        value={withDefault(settings.maxAudioBitrate)}
                        label="Max Audio Bitrate"
                        placeholder="Leave blank for no limit"
                        disabled={isDisabled}
                        onChange={handleNumberChange}
                    />
                </FormControl>

                <FormControl>
                    <Text id={inputLabels.renderDimensionLow} className={classes.label}>Render Dimension (Low Priority):</Text>

                    <Select
                        name={inputLabels.renderDimensionLow}
                        value={withDefault(settings.renderDimensionLow)}
                        label={inputLabels.renderDimensionLow}
                        disabled={isDisabled}
                        onChange={handleChange}
                    >
                        {RenderDimensionItems}
                    </Select>
                </FormControl>

                <FormControl>
                    <Text id={inputLabels.renderDimensionStandard} className={classes.label}>Render Dimension (Standard Priority):</Text>

                    <Select
                        name={inputLabels.renderDimensionStandard}
                        value={withDefault(settings.renderDimensionStandard)}
                        label={inputLabels.renderDimensionStandard}
                        disabled={isDisabled}
                        onChange={handleChange}
                    >
                        {RenderDimensionItems}
                    </Select>
                </FormControl>

                <FormControl>
                    <Text id={inputLabels.renderDimensionHigh} className={classes.label}>Render Dimension (High Priority):</Text>

                    <Select
                        name={inputLabels.renderDimensionHigh}
                        value={withDefault(settings.renderDimensionHigh)}
                        label={inputLabels.renderDimensionHigh}
                        disabled={isDisabled}
                        onChange={handleChange}
                    >
                        {RenderDimensionItems}
                    </Select>
                </FormControl>
            </>}
            confirmButton={{
                content: 'Применить',
                onClick: onClose
            }}
        />
    );
}
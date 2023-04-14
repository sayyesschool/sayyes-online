const STEP = 3;
const VALUES = [0, 1, 2, 3, 4];

export default function NetworkQualityIndicator({ networkQualityLevel }) {
    return (
        <div className="NetworkQualityIndicator">
            {VALUES.map(value => (
                <div
                    key={value}
                    style={{
                        height: `${STEP * (value + 1)}px`,
                        background: networkQualityLevel > value ? 'white' : 'rgba(255, 255, 255, 0.2)',
                    }}
                />
            ))}
        </div>
    );
}
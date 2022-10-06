import './index.scss';

export default function MaterialContent({ material, item, props }) {
    return (
        <div className="material-content" outlined {...props}>
            {item ?
                <iframe src={item.documentUrl} />
                :
                <img src={material.imageUrl} />
            }
        </div>
    );
}
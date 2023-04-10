export default function ImageRemoveEventCallbackPlugin(editor) {
    const configuration = editor.config.get('imageRemoveEvent');

    if (!configuration) {
        console.error('CKEditor5 Image Remove Event Plugin : Configuration is not defined.');
        return;
    }

    if (typeof configuration !== 'object') {
        console.error('CKEditor5 Image Remove Event Plugin: Configuration should be an object.');
        return;
    }

    if (typeof configuration.callback !== 'function') {
        console.error('CKEditor5 Image Remove Event Plugin: Callback property is not valid function.');
        return;
    }

    return new ImageRemoveEvent(editor, configuration);
}

// export default class ImageRemoveEventCallbackPlugin extends Plugin {
//     static get requires() {
//         return [Image];
//     }

//     init() {
//         const editor = this.editor;
//         const configuration = this.editor.config.get('imageRemoveEvent');

//         if (!configuration) {
//             console.error('CKEditor5 Image Remove Event Plugin : Configuration is not defined.');
//             return;
//         }

//         if (typeof configuration !== 'object') {
//             console.error('CKEditor5 Image Remove Event Plugin: Configuration should be an object.');
//             return;
//         }

//         if (typeof configuration.callback !== 'function') {
//             console.error('CKEditor5 Image Remove Event Plugin: Callback property is not valid function.');
//             return;
//         }

//         return new ImageRemoveEvent(editor, configuration);
//     }
// }

class ImageRemoveEvent {
    constructor(editor, configuration) {
        this.editor = editor;
        this.configuration = configuration;
        this.handleChange = this.handleChange.bind(this);
        this.editor.model.document.on('change:data', this.handleChange);
    }

    handleChange(event) {
        const { callback } = this.configuration;
        const differ = event.source.differ;

        if (differ.isEmpty) return;

        const changes = differ.getChanges({
            includeChangesInGraveyard: true
        });

        if (changes.length === 0) return;

        const removeImageChanges = changes.filter(change => change.type === 'remove' && change.name === 'imageBlock');

        if (removeImageChanges.length === 0) return;

        const removedNodes = changes.filter(change => change.type === 'insert' && change.name === 'imageBlock');
        const removedImagesSrc = [];
        const removedImageNodes = [];

        for (const node of removedNodes) {
            const removedNode = node.position.nodeAfter;
            removedImageNodes.push(removedNode);
            removedImagesSrc.push(removedNode.getAttribute('src'));
        }

        return callback(removedImagesSrc, removedImageNodes).then(results => {
            console.log(this.editor);
            console.log(results);
        });
    }
}
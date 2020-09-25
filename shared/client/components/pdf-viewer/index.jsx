import React, { useState, useCallback } from 'react';
import { Document, Page } from 'react-pdf';
import { IconButton } from 'mdc-react';

import './index.scss';

export default function PDFViewer({ file }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = useCallback(({ numPages }) => {
        setNumPages(numPages);
    }, []);

    const handlePrevPageClick = useCallback(() => {
        setPageNumber(n => n - 1);
    }, [numPages]);

    const handleNextPageClick = useCallback(() => {
        setPageNumber(n => n + 1);
    }, [numPages]);

    return (
        <article className="pdf-viewer">
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page
                    pageNumber={pageNumber}
                    width={640}
                />
            </Document>

            <footer className="pdf-viewer__footer">
                <IconButton disabled={pageNumber === 1} onClick={handlePrevPageClick}>chevron_left</IconButton>
                <span className="pdf-viewer__pages_label"><input value={pageNumber} /> из {numPages}</span>
                <IconButton disabled={pageNumber === numPages} onClick={handleNextPageClick}>chevron_right</IconButton>
            </footer>
        </article>
    );
}
import axios from 'axios';
import pdfjs from 'pdfjs-dist';
import React, { useEffect, useRef } from 'react';

interface PdfViewerProps {
  url: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadPdf = async () => {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const pdf = await pdfjs.getDocument(url).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });

      const canvas = canvasRef.current!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: canvas.getContext('2d')!,
        viewport: viewport
      };
      await page.render(renderContext).promise;
    };

    loadPdf();
  }, [url]);

  return (
    <canvas ref={canvasRef} />
  );
};

export default PdfViewer;

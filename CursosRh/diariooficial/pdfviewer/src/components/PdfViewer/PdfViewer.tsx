import axios from 'axios';
import * as pdfjs from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min.js';
GlobalWorkerOptions.workerSrc = 'pdf.worker.js';



import React, { useEffect, useRef } from 'react';

interface PdfViewerProps {
  url: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
  
        const loadingTask = pdfjs.getDocument({ data: response.data });
        pdfjs.GlobalWorkerOptions.workerSrc = `pdf.worker.min.js`;

        const pdf = await loadingTask.promise;
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
      } catch (error) {
        console.error(error);
      }
    };

    loadPdf();
  }, [url]);

  return (
    <canvas ref={canvasRef} />
  );
};

export default PdfViewer;

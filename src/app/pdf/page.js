
'use client'; 

import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; 
import 'react-pdf/dist/esm/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [scale, setScale] = useState(1.0); 
  const [jumpPage, setJumpPage] = useState(''); 
  const containerRef = useRef(null); 

  // 加载 PDF 成功后的回调
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // 缩放控制
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  // 翻页控制
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, numPages));

  // 跳转到指定页
  const handleJumpPage = () => {
    const pageNum = parseInt(jumpPage, 10);
    if (pageNum > 0 && pageNum <= numPages) {
      setCurrentPage(pageNum);
      setJumpPage('');
    } else {
      alert(`请输入有效的页码 (1-${numPages})`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 控制栏 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          padding: '10px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <button onClick={zoomOut} disabled={scale <= 0.5}>
          缩小
        </button>
        <span>缩放: {(scale * 100).toFixed(0)}%</span>
        <button onClick={zoomIn} disabled={scale >= 3.0}>
          放大
        </button>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          上一页
        </button>
        <span>
          第 {currentPage} 页 / 共 {numPages || '--'} 页
        </span>
        <button onClick={goToNextPage} disabled={currentPage === numPages}>
          下一页
        </button>
        <input
          type="number"
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          placeholder="跳转到页"
          style={{ width: '100px' }}
        />
        <button onClick={handleJumpPage}>跳转</button>
      </div>

      {/* PDF */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflow: 'auto', 
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#e0e0e0',
        }}
      >
        <Document
          file="/source/fastapi.pdf" 
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error('PDF 加载失败:', error)}
        >
          <Page
            pageNumber={currentPage}
            scale={scale}
            renderTextLayer={true} // 渲染文本层以支持选择文本
            renderAnnotationLayer={true} // 渲染注释层
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
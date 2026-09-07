'use client';

import React, { useRef, useState } from 'react';

export interface FileUploadProps {
  label?: string;
  hint?: string;
  multiple?: boolean;
  onFilesSelected?: (files: FileList) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label = 'اسحب الملفات هنا أو اضغط للاختيار',
  hint = 'يدعم مختلف الصيغ الشائعة حتى 25 ميجابايت',
  multiple = true,
  onFilesSelected
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onFilesSelected) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <div
      className={`qhr-file-upload ${isDragOver ? 'qhr-file-upload--dragover' : ''}`}
      role="region"
      aria-label={label}
      onClick={handleClick}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && onFilesSelected) {
          onFilesSelected(e.dataTransfer.files);
        }
      }}
    >
      <input 
        ref={inputRef}
        type="file" 
        className="qhr-file-upload-input" 
        multiple={multiple} 
        onChange={handleChange} 
      />
      <svg className="qhr-file-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
      <div className="qhr-file-upload-label">{label}</div>
      <div className="qhr-file-upload-hint">{hint}</div>
    </div>
  );
};

import React, { useRef, useState } from 'react';
import styles from './DataUpload.module.css';

interface DataUploadProps {
  onData: (data: string) => void;
  onLoadExample?: () => void;
  accept?: string;
  placeholder?: string;
  label?: string;
}

export const DataUpload: React.FC<DataUploadProps> = ({
  onData,
  onLoadExample,
  accept = '.csv,.json,.txt',
  placeholder = 'CSV 또는 JSON 데이터를 붙여넣으세요...',
  label = '데이터 입력',
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target?.result as string;
      setText(content);
      onData(content);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onData(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        <div className={styles.actions}>
          <button
            className={styles.btn}
            onClick={() => fileRef.current?.click()}
            type="button"
          >
            파일 업로드
          </button>
          {onLoadExample && (
            <button
              className={`${styles.btn} ${styles.btnExample}`}
              onClick={() => {
                onLoadExample();
              }}
              type="button"
            >
              예시 데이터 불러오기
            </button>
          )}
        </div>
      </div>
      <div
        className={`${styles.dropZone} ${dragOver ? styles.dragOver : ''}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <textarea
          className={styles.textarea}
          value={text}
          onChange={handleTextChange}
          placeholder={placeholder}
          rows={6}
        />
      </div>
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
};

/** Simple CSV parser: returns array of objects */
export function parseCSV(csv: string): Record<string, string>[] {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = vals[i] ?? ''; });
    return obj;
  });
}

/** Simple JSON parser with error handling */
export function parseJSONSafe<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

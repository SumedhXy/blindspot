import { useId, useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";

export interface FileUploadProps {
  accept?: string[];
  maxSizeMB?: number;
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
  label?: string;
}

export function FileUpload({ accept = [], maxSizeMB, onFileSelect, disabled = false, label = "Upload file" }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputId = useId();

  const validate = (nextFile: File) => {
    if (accept.length > 0 && !accept.some((type) => nextFile.type === type || nextFile.name.toLowerCase().endsWith(type.split("/")[1] || ""))) {
      return "Unsupported file type.";
    }

    if (typeof maxSizeMB === "number" && nextFile.size > maxSizeMB * 1024 * 1024) {
      return `File exceeds ${maxSizeMB} MB.`;
    }

    return null;
  };

  const handleFile = (nextFile: File | null) => {
    if (!nextFile) {
      setFile(null);
      setError(null);
      onFileSelect(null);
      return;
    }

    const validationError = validate(nextFile);
    if (validationError) {
      setError(validationError);
      onFileSelect(null);
      return;
    }

    setFile(nextFile);
    setError(null);
    onFileSelect(nextFile);
  };

  const acceptString = accept.join(",");

  return (
    <div className="ui-field">
      <label className="ui-label" htmlFor={inputId}>
        {label}
      </label>

      <div
        className={[
          "ui-file-upload",
          dragActive ? "ui-file-upload--active" : "",
          disabled ? "ui-file-upload--disabled" : "",
          error ? "ui-file-upload--error" : "",
        ].filter(Boolean).join(" ")}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragActive(false);
          if (!disabled) {
            const dropped = event.dataTransfer.files?.[0] ?? null;
            handleFile(dropped);
          }
        }}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="ui-file-upload__input"
          accept={acceptString}
          disabled={disabled}
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
        />

        <UploadCloud size={22} aria-hidden="true" />
        <div>
          <strong>{file ? file.name : "Drag and drop or click to upload"}</strong>
          <span>
            {accept.length > 0 ? accept.join(", ") : "Any file type"}
            {typeof maxSizeMB === "number" ? ` • Max ${maxSizeMB}MB` : ""}
          </span>
        </div>
      </div>

      {file && (
        <div className="ui-file-upload__selected">
          <span>{file.name}</span>
          <button
            type="button"
            className="ui-file-upload__remove"
            onClick={() => handleFile(null)}
            aria-label="Remove uploaded file"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      )}

      {error && <div className="ui-field__message ui-field__message--error">{error}</div>}
    </div>
  );
}

export default FileUpload;

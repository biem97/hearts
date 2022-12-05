import FileUpload from "../components/FileUpload";

interface uploadProps {}

export default function UploadPage({}: uploadProps) {
  return (
    <div>
      <FileUpload />
    </div>
  );
}

// Import React FilePond
import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import { useAuth } from "./AuthProvider";

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const { handleNotAuthenticated } = useAuth();

  return (
    <FilePond
      required={true}
      name='tweetjs'
      maxFileSize='100MB'
      files={files}
      acceptedFileTypes={["text/javascript"]}
      fileValidateTypeLabelExpectedTypes='Expects a .js file'
      allowPaste={false}
      onupdatefiles={setFiles}
      maxFiles={1}
      dropOnPage={true}
      dropOnElement={false}
      server={{
        process: "./tweets/upload-tweet-js",
        fetch: null,
        revert: null,
        withCredentials: true,
      }}
      labelIdle='Drag & Drop your tweet.js file here or <span class="filepond--label-action">Browse</span> to find it'
      onerror={(e) => {
        if (e.code === 401) {
          handleNotAuthenticated();
        }
      }}
    />
  );
};

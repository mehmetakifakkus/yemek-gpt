"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

import { PacmanLoader } from "react-spinners";
import { HiMiniInboxArrowDown } from "react-icons/hi2";
import { uploadToS3 } from "@/lib/s3";

type Props = {};

const FileUpload = (props: Props) => {
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      setIsLoading(true);
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      setIsLoading(false);
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      if (acceptedFiles.length === 0) {
        return;
      }
      const file = acceptedFiles[0];
      if (file.size > 5 * 1024 * 1024) {
        // bigger than 5mb!
        toast.error("File too large");
        return;
      }

      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
          toast.error("Something went wrong");
          return;
        }
        mutate(data, {
          onSuccess: ({ chat_id }: { chat_id: string }) => {
            toast.success("Chat created!");
            router.refresh();
            // router.push(`/chat/${chat_id}`);
          },
          onError: (err) => {
            toast.error("Error creating chat");
            console.error(err);
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {uploading || isLoading || isPending ? (
          <>
            {/* loading state */}
            <PacmanLoader color="#36d7b7" />
            <p className="mt-2 text-base text-slate-400">
              Processing data, tasting zeros and ones...
            </p>
          </>
        ) : (
          <>
            <HiMiniInboxArrowDown className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-base text-slate-400">Drop PDF Here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

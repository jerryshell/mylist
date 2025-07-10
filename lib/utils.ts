import { appwriteConfig } from "./appwrite/config";

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} Bytes`;
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return `${sizeInKB.toFixed(digits || 1)} KB`;
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return `${sizeInMB.toFixed(digits || 1)} MB`;
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return `${sizeInGB.toFixed(digits || 1)} GB`;
  }
};

// 2 GB
export const totalSizeInBytes = 2 * 1024 * 1024 * 1024;

// 20 MB
// export const totalSizeInBytes = 20 * 1024 * 1024;

export const calculatePercentage = (sizeInBytes: number) => {
  const percentage = sizeInBytes / totalSizeInBytes;
  return Number(percentage.toFixed(2));
};

const documentExtensionList = [
  "pdf",
  "doc",
  "docx",
  "txt",
  "xls",
  "xlsx",
  "csv",
  "rtf",
  "ods",
  "ppt",
  "odp",
  "md",
  "html",
  "htm",
  "epub",
  "pages",
  "fig",
  "psd",
  "ai",
  "indd",
  "xd",
  "sketch",
  "afdesign",
  "afphoto",
  "afphoto",
];
const imageExtensionList = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
const videoExtensionList = ["mp4", "avi", "mov", "mkv", "webm"];
const audioExtensionList = ["mp3", "wav", "ogg", "flac"];

export const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  if (!extension) {
    return { type: "other", extension: "" };
  }

  if (documentExtensionList.includes(extension)) {
    return { type: "document", extension };
  }
  if (imageExtensionList.includes(extension)) {
    return { type: "image", extension };
  }
  if (videoExtensionList.includes(extension)) {
    return { type: "video", extension };
  }
  if (audioExtensionList.includes(extension)) {
    return { type: "audio", extension };
  }

  return { type: "other", extension };
};

export const getFileIcon = (extension: string | undefined, type: string) => {
  switch (extension) {
    // Document
    case "pdf":
      return "/icons/file-pdf.svg";
    case "doc":
      return "/icons/file-doc.svg";
    case "docx":
      return "/icons/file-docx.svg";
    case "csv":
      return "/icons/file-csv.svg";
    case "txt":
      return "/icons/file-txt.svg";
    case "xls":
    case "xlsx":
      return "/icons/file-document.svg";
    // Image
    case "svg":
      return "/icons/file-image.svg";
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/icons/file-video.svg";
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/icons/file-audio.svg";
    default:
      switch (type) {
        case "image":
          return "/icons/file-image.svg";
        case "document":
          return "/icons/file-document.svg";
        case "video":
          return "/icons/file-video.svg";
        case "audio":
          return "/icons/file-audio.svg";
        default:
          return "/icons/file-other.svg";
      }
  }
};

export const buildFileUrl = (bucketFileId: string) => {
  return `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${bucketFileId}/view?project=${appwriteConfig.projectId}`;
};

export const buildDownloadUrl = (bucketFileId: string) => {
  return `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${bucketFileId}/download?project=${appwriteConfig.projectId}`;
};

export const getUsageSummary = (totalSpace: {
  document: { size: number; latestDate: string };
  image: { size: number; latestDate: string };
  video: { size: number; latestDate: string };
  audio: { size: number; latestDate: string };
  other: { size: number; latestDate: string };
}) => {
  return [
    {
      title: "文档",
      size: totalSpace.document.size,
      latestDate: totalSpace.document.latestDate,
      icon: "/icons/file-document-light.svg",
      url: "/document",
    },
    {
      title: "图片",
      size: totalSpace.image.size,
      latestDate: totalSpace.image.latestDate,
      icon: "/icons/file-image-light.svg",
      url: "/image",
    },
    {
      title: "视频",
      size: totalSpace.video.size,
      latestDate: totalSpace.video.latestDate,
      icon: "/icons/file-video-light.svg",
      url: "/video",
    },
    {
      title: "音频",
      size: totalSpace.audio.size,
      latestDate: totalSpace.audio.latestDate,
      icon: "/icons/file-video-light.svg",
      url: "/audio",
    },
    {
      title: "其他",
      size: totalSpace.other.size,
      latestDate: totalSpace.other.latestDate,
      icon: "/icons/file-other-light.svg",
      url: "/other",
    },
  ];
};

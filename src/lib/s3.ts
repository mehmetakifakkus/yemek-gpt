import { PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3";

export const uploadToS3 = async (file: File): Promise<{ file_key: string; file_name: string }> => {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        region: "eu-west-3",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
        },
      });

      const file_key =
        'uploads/' + Date.now().toString() + file.name.replace(" ", "-");

      const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
        Key: file_key,
        Body: file,
      };
      s3.putObject(
        params,
        (err: any, data: PutObjectCommandOutput | undefined) => {
          return resolve({
            file_key,
            file_name: file.name,
          });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.eu-west-3.amazonaws.com/${file_key}`;
  return url;
}

// https://chatpdftetx.s3.eu-west-3.amazonaws.com/BI%CC%87LI%CC%87M%20GENC%CC%A7-Popu%CC%88ler%20Bilim%20I%CC%87c%CC%A7erig%CC%86i%20Haz%C4%B1rlama%20Yo%CC%88nergesi.pdf

// frontend/src/lib/upload-helper.ts
export async function uploadFileToR2(file: File): Promise<string> {
  const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';

  // ১. ব্যাকএন্ড থেকে অনুমোদিত আপলোড লিংক নেওয়া
  const res = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation GetUploadUrl($filename: String!, $contentType: String!) {
          getPresignedUrl(filename: $filename, contentType: $contentType) {
            uploadUrl
            publicUrl
          }
        }
      `,
      variables: {
        filename: file.name,
        contentType: file.type,
      },
    }),
  });

  const { data } = await res.json();
  const { uploadUrl, publicUrl } = data.getPresignedUrl;

  // ২. ব্রাউজার থেকে সরাসরি Cloudflare R2-তে পুট করা (বাইপাসিং ব্যাকএন্ড মেমোরি)
  await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  return publicUrl;
}
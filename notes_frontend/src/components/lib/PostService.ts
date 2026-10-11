export async function PostService(values: any,endPath:string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/${endPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    credentials: "include",
  });
  if (!response.ok) {
    console.log("error",response.json())
    const errData = await response.json();
    throw new Error(errData.message);
  }
  return response.json();
}

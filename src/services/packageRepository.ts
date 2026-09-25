import type { TourPackage } from "../types";
import { packages as localPackages, sortPackages } from "../data/packages";

const apiUrl = import.meta.env.VITE_CONTENT_API_URL?.replace(/\/$/, "");

export type PackageMutation = {
  data: TourPackage | null;
  commitSha: string;
};
export type DeploymentStatus = {
  state: "pending" | "running" | "success" | "failure";
  url?: string;
  conclusion?: string | null;
  createdAt?: string;
};

const mutationRequest = async <T>(
  path: string,
  options: RequestInit,
): Promise<{ data: T; commitSha: string }> => {
  const result = await request<T>(path, options);
  if (!result.commitSha)
    throw new Error("The content API did not return a GitHub commit.");
  return { data: result.data, commitSha: result.commitSha };
};

const request = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<{ data: T; commitSha?: string }> => {
  if (!apiUrl) throw new Error("The content API is not configured.");
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const result = (await response.json().catch(() => ({}))) as {
    error?: string;
    data?: T;
  };
  if (!response.ok) throw new Error(result.error || "The request failed.");
  return result as { data: T; commitSha?: string };
};

export const getPackages = async (): Promise<TourPackage[]> => {
  if (!apiUrl) return sortPackages(localPackages);
  return sortPackages((await request<TourPackage[]>("/packages")).data);
};

export const getPackage = async (id: string): Promise<TourPackage> =>
  request<TourPackage>(`/packages/${encodeURIComponent(id)}`).then(
    ({ data }) => data,
  );

export const createPackage = async (
  data: TourPackage,
  image?: File,
): Promise<PackageMutation> =>
  mutationRequest<TourPackage>("/packages", {
    method: "POST",
    body: JSON.stringify({ package: data, image: await encodeImage(image) }),
  });

export const updatePackage = async (
  id: string,
  data: TourPackage,
  image?: File,
): Promise<PackageMutation> =>
  mutationRequest<TourPackage>(`/packages/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify({ package: data, image: await encodeImage(image) }),
  });

export const deletePackage = async (id: string): Promise<PackageMutation> =>
  mutationRequest<TourPackage | null>(`/packages/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

export const getDeploymentStatus = async (
  sha: string,
): Promise<DeploymentStatus> =>
  (
    await request<DeploymentStatus>(
      `/deploy/status?sha=${encodeURIComponent(sha)}`,
    )
  ).data;

export const login = async (password: string): Promise<void> => {
  await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
};

export const logout = async (): Promise<void> => {
  await request("/auth/logout", { method: "POST", body: "{}" });
};

export const getSession = async (): Promise<boolean> => {
  try {
    return (await request<boolean>("/auth/session")).data;
  } catch {
    return false;
  }
};

const encodeImage = async (image?: File) => {
  if (!image) return undefined;
  const bytes = new Uint8Array(await image.arrayBuffer());
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return { name: image.name, type: image.type, base64: btoa(binary) };
};

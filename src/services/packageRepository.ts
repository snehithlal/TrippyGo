import type { TourPackage } from "../types";
import { packages as localPackages, sortPackages } from "../data/packages";

const apiUrl = import.meta.env.VITE_CONTENT_API_URL?.replace(/\/$/, "");
const localAdminMode = import.meta.env.VITE_LOCAL_ADMIN === "true";
const localAdminPassword = import.meta.env.VITE_LOCAL_ADMIN_PASSWORD || "admin";
const localPackagesKey = "trippygo.local-packages";
const localSessionKey = "trippygo.local-admin-session";

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

const readLocalPackages = (): TourPackage[] => {
  try {
    const stored = localStorage.getItem(localPackagesKey);
    return sortPackages(stored ? (JSON.parse(stored) as TourPackage[]) : localPackages);
  } catch {
    return sortPackages(localPackages);
  }
};

const writeLocalPackages = (items: TourPackage[]) => {
  localStorage.setItem(localPackagesKey, JSON.stringify(items));
};

const localMutation = <T>(data: T) => ({
  data,
  commitSha: `local-dev-${Date.now()}`,
});

const localImageData = async (image?: File) => {
  if (!image) return undefined;
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(image);
  });
};

export const getPackages = async (): Promise<TourPackage[]> => {
  if (localAdminMode) return readLocalPackages();
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
): Promise<PackageMutation> => {
  if (localAdminMode) {
    const next = {
      ...data,
      image: (await localImageData(image)) || data.image,
    };
    const items = [...readLocalPackages(), next];
    writeLocalPackages(items);
    return localMutation(next);
  }
  return mutationRequest<TourPackage>("/packages", {
    method: "POST",
    body: JSON.stringify({ package: data, image: await encodeImage(image) }),
  });
};

export const updatePackage = async (
  id: string,
  data: TourPackage,
  image?: File,
): Promise<PackageMutation> => {
  if (localAdminMode) {
    const localImage = await localImageData(image);
    const items = readLocalPackages().map((item) =>
      item.id === id
        ? { ...data, image: localImage || data.image }
        : item,
    );
    const updated = items.find((item) => item.id === id) || null;
    if (!updated) throw new Error("Package not found.");
    writeLocalPackages(items);
    return localMutation(updated);
  }
  return mutationRequest<TourPackage>(`/packages/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify({ package: data, image: await encodeImage(image) }),
  });
};

export const deletePackage = async (id: string): Promise<PackageMutation> => {
  if (localAdminMode) {
    const items = readLocalPackages().filter((item) => item.id !== id);
    writeLocalPackages(items);
    return localMutation(null);
  }
  return mutationRequest<TourPackage | null>(`/packages/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
};

export const updatePackageOrder = async (
  packageIds: string[],
): Promise<{ data: TourPackage[]; commitSha: string }> => {
  if (localAdminMode) {
    const current = readLocalPackages();
    const byId = new Map(current.map((item) => [item.id, item]));
    const ordered: TourPackage[] = [];
    packageIds.forEach((id, index) => {
      const item = byId.get(id);
      if (item) ordered.push({ ...item, displayOrder: index + 1 });
    });
    writeLocalPackages(ordered);
    return localMutation(sortPackages(ordered));
  }
  return mutationRequest<TourPackage[]>("/packages/order", {
    method: "POST",
    body: JSON.stringify({ packageIds }),
  });
};

export const getDeploymentStatus = async (
  sha: string,
): Promise<DeploymentStatus> => {
  if (localAdminMode)
    return { state: "success", url: undefined, createdAt: new Date().toISOString() };
  return (
    await request<DeploymentStatus>(
      `/deploy/status?sha=${encodeURIComponent(sha)}`,
    )
  ).data;
};

export const login = async (password: string): Promise<void> => {
  if (localAdminMode) {
    if (password !== localAdminPassword) throw new Error("Incorrect local admin password.");
    localStorage.setItem(localSessionKey, "true");
    return;
  }
  await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
};

export const logout = async (): Promise<void> => {
  if (localAdminMode) {
    localStorage.removeItem(localSessionKey);
    return;
  }
  await request("/auth/logout", { method: "POST", body: "{}" });
};

export const getSession = async (): Promise<boolean> => {
  if (localAdminMode) return localStorage.getItem(localSessionKey) === "true";
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

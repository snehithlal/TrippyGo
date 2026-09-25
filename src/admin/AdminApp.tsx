import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ImagePlus,
  LogOut,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cx } from "../styles";
import {
  createPackage,
  deletePackage,
  getDeploymentStatus,
  getPackages,
  getSession,
  login,
  logout,
  updatePackage,
  type DeploymentStatus,
} from "../services/packageRepository";
import { formatPrice } from "../data/packages";
import type { TourPackage } from "../types";
import "./admin.css";

const blankPackage = (): TourPackage => ({
  id: "",
  title: "",
  destination: "",
  category: "Nature",
  days: 1,
  nights: 0,
  displayOrder: 1,
  badge: "",
  route: "",
  price: 0,
  image: "",
  alt: "",
  description: "",
  features: [],
  itinerary: [],
});

const AdminApp = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [items, setItems] = useState<TourPackage[]>([]);
  const [editing, setEditing] = useState<TourPackage | null>(null);
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [deploymentCommit, setDeploymentCommit] = useState("");
  const [deployment, setDeployment] = useState<DeploymentStatus | null>(null);
  const [deploymentError, setDeploymentError] = useState("");

  const refresh = async () => setItems(await getPackages());

  useEffect(() => {
    getSession().then((active) => {
      setAuthenticated(active);
      if (active) refresh().catch((reason: Error) => setError(reason.message));
      setChecking(false);
    });
  }, []);

  useEffect(() => {
    if (!deploymentCommit) return;
    let active = true;
    let timer: ReturnType<typeof setInterval>;
    const poll = async () => {
      try {
        const status = await getDeploymentStatus(deploymentCommit);
        if (!active) return;
        setDeployment(status);
        setDeploymentError("");
        if (status.state === "success" || status.state === "failure")
          clearInterval(timer);
      } catch (reason) {
        if (active)
          setDeploymentError(
            reason instanceof Error
              ? reason.message
              : "Could not read deployment status.",
          );
      }
    };
    void poll();
    timer = setInterval(() => void poll(), 5000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [deploymentCommit]);

  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }
    const preview = URL.createObjectURL(image);
    setImagePreview(preview);
    return () => URL.revokeObjectURL(preview);
  }, [image]);

  const followCommit = (sha: string) => {
    setDeploymentCommit(sha);
    setDeployment({ state: "pending" });
    setDeploymentError("");
  };

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(password);
      setPassword("");
      setAuthenticated(true);
      await refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      if (!editing.image && !image)
        throw new Error("Choose a cover image before saving.");
      if (image) {
        if (!["image/jpeg", "image/png", "image/webp"].includes(image.type))
          throw new Error("Use a JPEG, PNG or WebP image.");
        if (image.size > 3 * 1024 * 1024)
          throw new Error("Images must be 3 MB or smaller.");
      }
      if (!editing.title.trim() || !editing.destination.trim())
        throw new Error("Enter a package name and location.");
      if (!editing.description.trim())
        throw new Error("Enter a short description.");
      if (
        !editing.category.trim() ||
        !editing.route.trim() ||
        !editing.alt.trim()
      )
        throw new Error("Complete the package details before saving.");
      if (!Number.isInteger(editing.price) || editing.price < 0)
        throw new Error("Enter a valid price.");
      if (!Number.isInteger(editing.days) || editing.days < 1)
        throw new Error("Enter a valid duration.");
      const displayOrder = editing.displayOrder;
      if (
        typeof displayOrder !== "number" ||
        !Number.isInteger(displayOrder) ||
        displayOrder < 1 ||
        displayOrder > 9999
      )
        throw new Error("Enter a listing priority from 1 to 9999.");
      if (editing.features.some((feature) => !feature.trim()))
        throw new Error("Complete or remove each highlight.");
      if (
        editing.itinerary.length === 0 ||
        editing.itinerary.some((day) => !day.title.trim() || !day.text.trim())
      )
        throw new Error("Add and complete at least one itinerary day.");
      const payload = {
        ...editing,
        id:
          editing.id ||
          editing.title
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
        image: image ? "./images/pending-upload.webp" : editing.image,
      };
      const saved = editing.id
        ? await updatePackage(editing.id, payload, image)
        : await createPackage(payload, image);
      setEditing(null);
      setImage(undefined);
      followCommit(saved.commitSha);
      setMessage(`Saved “${saved.data?.title ?? editing.title}”.`);
      await refresh();
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Unable to save package.",
      );
    } finally {
      setBusy(false);
    }
  };

  const remove = async (item: TourPackage) => {
    if (
      !window.confirm(
        `Delete “${item.title}”? This change will be committed to GitHub.`,
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      const result = await deletePackage(item.id);
      followCommit(result.commitSha);
      setMessage(`Deleted “${item.title}”.`);
      await refresh();
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Unable to delete package.",
      );
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    await logout().catch(() => undefined);
    setAuthenticated(false);
    setItems([]);
  };

  const change = (
    key: keyof TourPackage,
    value: TourPackage[keyof TourPackage],
  ) => setEditing((current) => current && { ...current, [key]: value });

  if (checking) return <main className="admin-shell">Checking session…</main>;
  if (!authenticated)
    return (
      <main className="admin-shell">
        <section className="admin-login">
          <Link to="/" className="admin-back">
            <ArrowLeft size={17} /> TrippyGo
          </Link>
          <span className="eyebrow">TRAVEL MANAGEMENT</span>
          <h1>Welcome back.</h1>
          <p>Sign in to manage your travel packages.</p>
          <form onSubmit={signIn} className="admin-form">
            <label>
              Administrator password
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {error && (
              <p className="admin-error" role="alert">
                {error}
              </p>
            )}
            <button className={cx("button", "button-green")} disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </section>
      </main>
    );

  return (
    <main className="admin-shell">
      <div className="admin-container">
        <header className="admin-header">
          <div>
            <span className="eyebrow">TRAVEL MANAGEMENT</span>
            <h1>Packages</h1>
            <p>Manage the trips shown on your website.</p>
          </div>
          <button className="admin-logout" onClick={signOut}>
            <LogOut size={17} /> Log out
          </button>
        </header>
        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="admin-success" role="status">
            {message}
          </p>
        )}
        {deployment && (
          <section
            className={
              deployment.state === "failure"
                ? "admin-deploy admin-deploy-failed"
                : "admin-deploy"
            }
            role="status"
            aria-live="polite"
          >
            <div>
              <strong>
                {deployment.state === "pending" &&
                  "Waiting for Pages deployment…"}
                {deployment.state === "running" && "GitHub Pages is deploying…"}
                {deployment.state === "success" &&
                  "GitHub Pages deployment succeeded."}
                {deployment.state === "failure" &&
                  "GitHub Pages deployment failed."}
              </strong>
              {deploymentError && <p>{deploymentError}</p>}
            </div>
            {deployment.url && (
              <a href={deployment.url} target="_blank" rel="noreferrer">
                View workflow run
              </a>
            )}
          </section>
        )}
        {editing ? (
          <form className="admin-editor" onSubmit={save}>
            <div className="admin-editor-heading">
              <h2>{editing.id ? "Edit package" : "Add package"}</h2>
              <button
                type="button"
                className="admin-logout"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
            <div className="admin-fields">
              <label>
                Package name
                <input
                  required
                  maxLength={100}
                  value={editing.title}
                  onChange={(event) => change("title", event.target.value)}
                />
              </label>
              <label>
                Location
                <input
                  required
                  maxLength={100}
                  value={editing.destination}
                  onChange={(event) =>
                    change("destination", event.target.value)
                  }
                />
              </label>
              <label>
                Category
                <input
                  required
                  maxLength={40}
                  value={editing.category}
                  onChange={(event) => change("category", event.target.value)}
                />
              </label>
              <label>
                Price (INR)
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={editing.price}
                  onChange={(event) =>
                    change("price", Number(event.target.value))
                  }
                />
              </label>
              <label>
                Days
                <input
                  required
                  type="number"
                  min="1"
                  max="60"
                  value={editing.days}
                  onChange={(event) =>
                    change("days", Number(event.target.value))
                  }
                />
              </label>
              <label>
                Nights
                <input
                  required
                  type="number"
                  min="0"
                  max="59"
                  value={editing.nights}
                  onChange={(event) =>
                    change("nights", Number(event.target.value))
                  }
                />
              </label>
              <label>
                Listing priority
                <input
                  required
                  type="number"
                  min="1"
                  max="9999"
                  step="1"
                  value={editing.displayOrder ?? 9999}
                  onChange={(event) =>
                    change("displayOrder", Number(event.target.value))
                  }
                />
                <span className="admin-hint">Lower numbers appear first</span>
              </label>
              <label className="admin-wide">
                Route
                <input
                  required
                  value={editing.route}
                  onChange={(event) => change("route", event.target.value)}
                />
              </label>
              <label className="admin-wide">
                Short description
                <textarea
                  required
                  maxLength={240}
                  rows={2}
                  value={editing.description}
                  onChange={(event) =>
                    change("description", event.target.value)
                  }
                />
              </label>
              <label className="admin-wide">
                Full description
                <textarea
                  rows={5}
                  value={editing.fullDescription ?? ""}
                  onChange={(event) =>
                    change("fullDescription", event.target.value)
                  }
                />
              </label>
              <label>
                Badge
                <input
                  value={editing.badge}
                  onChange={(event) => change("badge", event.target.value)}
                />
              </label>
              <label>
                Image alt text
                <input
                  required
                  value={editing.alt}
                  onChange={(event) => change("alt", event.target.value)}
                />
              </label>
              <label className="admin-wide">
                Highlights
                <div className="admin-repeaters">
                  {editing.features.map((feature, index) => (
                    <div
                      className="admin-repeater-row"
                      key={`feature-${index}`}
                    >
                      <input
                        value={feature}
                        aria-label={`Highlight ${index + 1}`}
                        onChange={(event) =>
                          change(
                            "features",
                            editing.features.map((item, itemIndex) =>
                              itemIndex === index ? event.target.value : item,
                            ),
                          )
                        }
                      />
                      <button
                        type="button"
                        className="admin-remove"
                        onClick={() =>
                          change(
                            "features",
                            editing.features.filter(
                              (_, itemIndex) => itemIndex !== index,
                            ),
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="admin-add-row"
                    onClick={() =>
                      change("features", [...editing.features, ""])
                    }
                  >
                    Add highlight
                  </button>
                </div>
              </label>
              <label className="admin-wide">
                Day-by-day itinerary
                <div className="admin-repeaters">
                  {editing.itinerary.map((day, index) => (
                    <div className="admin-itinerary-row" key={`day-${index}`}>
                      <span className="admin-day-number">Day {index + 1}</span>
                      <input
                        placeholder="Day title"
                        aria-label={`Day ${index + 1} title`}
                        value={day.title}
                        onChange={(event) =>
                          change(
                            "itinerary",
                            editing.itinerary.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, title: event.target.value }
                                : item,
                            ),
                          )
                        }
                      />
                      <textarea
                        placeholder="What happens this day?"
                        aria-label={`Day ${index + 1} details`}
                        rows={2}
                        value={day.text}
                        onChange={(event) =>
                          change(
                            "itinerary",
                            editing.itinerary.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, text: event.target.value }
                                : item,
                            ),
                          )
                        }
                      />
                      <button
                        type="button"
                        className="admin-remove"
                        onClick={() =>
                          change(
                            "itinerary",
                            editing.itinerary.filter(
                              (_, itemIndex) => itemIndex !== index,
                            ),
                          )
                        }
                      >
                        Remove day
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="admin-add-row"
                    onClick={() =>
                      change("itinerary", [
                        ...editing.itinerary,
                        { title: "", text: "" },
                      ])
                    }
                  >
                    Add day
                  </button>
                </div>
              </label>
              <label className="admin-wide">
                Cover image{" "}
                <span className="admin-hint">
                  JPEG, PNG or WebP, up to 3 MB
                </span>
                <span className="admin-upload">
                  <ImagePlus size={19} />{" "}
                  {image?.name ?? (editing.image || "Choose an image")}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => setImage(event.target.files?.[0])}
                  />
                </span>
                {(imagePreview || editing.image) && (
                  <img
                    className="admin-image-preview"
                    src={imagePreview || editing.image}
                    alt="Cover preview"
                  />
                )}
              </label>
            </div>
            {error && (
              <p className="admin-error" role="alert">
                {error}
              </p>
            )}
            <button className={cx("button", "button-green")} disabled={busy}>
              {busy ? "Saving package…" : "Save package"}
            </button>
          </form>
        ) : (
          <>
            <div className="admin-list-heading">
              <h2>
                {items.length} {items.length === 1 ? "package" : "packages"}
              </h2>
              <button
                className={cx("button", "button-green")}
                onClick={() => {
                  setError("");
                  setImage(undefined);
                  setEditing(blankPackage());
                }}
              >
                <Plus size={18} /> Add package
              </button>
            </div>
            <div className="admin-list">
              {items.map((item) => (
                <article className="admin-card" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="admin-card-copy">
                    <h3>{item.title}</h3>
                    <p>
                      {item.destination} · {formatPrice(item.price)} ·{" "}
                      {item.days} days / {item.nights} nights
                    </p>
                  </div>
                  <div className="admin-card-actions">
                    <button
                      aria-label={`Edit ${item.title}`}
                      onClick={() => {
                        setError("");
                        setImage(undefined);
                        setEditing({ ...item });
                      }}
                    >
                      <Pencil size={17} /> Edit
                    </button>
                    <button
                      aria-label={`Delete ${item.title}`}
                      onClick={() => remove(item)}
                      disabled={busy}
                    >
                      <Trash2 size={17} /> Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default AdminApp;

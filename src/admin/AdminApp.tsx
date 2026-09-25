import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  GripVertical,
  ImagePlus,
  LogOut,
  Pencil,
  Plus,
  Save,
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
  updatePackageOrder,
  updatePackage,
  type DeploymentStatus,
} from "../services/packageRepository";
import { formatPrice, sortPackages } from "../data/packages";
import type { TourPackage } from "../types";
import {
  validatePackageDraft,
  type PackageValidationErrors,
} from "./packageValidation";
import "./admin.css";

const blankPackage = (displayOrder: number): TourPackage => ({
  id: "",
  title: "",
  destination: "",
  category: "Nature",
  days: 1,
  nights: 0,
  displayOrder,
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
  const [pendingDelete, setPendingDelete] = useState<TourPackage | null>(null);
  const [draggedPackageId, setDraggedPackageId] = useState<string | null>(null);
  const [dragOverPackageId, setDragOverPackageId] = useState<string | null>(
    null,
  );
  const [settlingPackageId, setSettlingPackageId] = useState<string | null>(
    null,
  );
  const [fieldErrors, setFieldErrors] = useState<PackageValidationErrors>({});

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

  useEffect(() => {
    if (!pendingDelete) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [pendingDelete]);

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
      const validationErrors = validatePackageDraft(editing, image);
      setFieldErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) {
        setError("Review the highlighted package fields before saving.");
        return;
      }
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
      setFieldErrors({});
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
    setBusy(true);
    setPendingDelete(null);
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

  const movePackage = (packageId: string, targetId: string) => {
    if (packageId === targetId) return;
    setItems((current) => {
      const fromIndex = current.findIndex((item) => item.id === packageId);
      const targetIndex = current.findIndex((item) => item.id === targetId);
      if (fromIndex < 0 || targetIndex < 0) return current;
      const next = [...current];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setSettlingPackageId(packageId);
    window.setTimeout(() => setSettlingPackageId(null), 280);
  };

  const movePackageBy = (packageId: string, direction: -1 | 1) => {
    const currentIndex = items.findIndex((item) => item.id === packageId);
    const target = items[currentIndex + direction];
    if (target) movePackage(packageId, target.id);
  };

  const savePackageOrder = async () => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const result = await updatePackageOrder(items.map((item) => item.id));
      setItems(sortPackages(result.data));
      followCommit(result.commitSha);
      setMessage("Package order saved.");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Unable to save package order.",
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
  ) => {
    setEditing((current) => current && { ...current, [key]: value });
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const orderChanged = items.some(
    (item, index) => item.displayOrder !== index + 1,
  );

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
            {Object.keys(fieldErrors).length > 0 && (
              <div className="admin-validation-summary" role="alert">
                <strong>Complete these fields:</strong>
                <ul>
                  {Object.entries(fieldErrors).map(([field, message]) => (
                    <li key={field}>{message}</li>
                  ))}
                </ul>
              </div>
            )}
            <section
              className="admin-editor-guide"
              aria-label="Package writing guide"
            >
              <div>
                <span className="eyebrow">QUICK CONTENT GUIDE</span>
                <h3>Make the trip easy to picture.</h3>
                <p>
                  The card uses the name, route, short description, badge, and
                  highlights. The detail view adds the full description and
                  day-by-day itinerary.
                </p>
              </div>
              <div className="admin-example-card">
                <strong>Example</strong>
                <b>Saltwater state of mind</b>
                <span>Goa · Beaches · Colourful lanes</span>
                <small>
                  Beach mornings, colourful neighbourhoods, and evenings with
                  nowhere else to be.
                </small>
              </div>
            </section>
            <div className="admin-fields">
              <label
                className={fieldErrors.title ? "admin-invalid" : undefined}
              >
                Package name
                <input
                  required
                  maxLength={100}
                  placeholder="Saltwater state of mind"
                  value={editing.title}
                  onChange={(event) => change("title", event.target.value)}
                />
              </label>
              <label
                className={
                  fieldErrors.destination ? "admin-invalid" : undefined
                }
              >
                Location
                <input
                  required
                  maxLength={100}
                  placeholder="Goa"
                  value={editing.destination}
                  onChange={(event) =>
                    change("destination", event.target.value)
                  }
                />
              </label>
              <label
                className={fieldErrors.category ? "admin-invalid" : undefined}
              >
                Category
                <input
                  required
                  maxLength={40}
                  placeholder="Beach"
                  value={editing.category}
                  onChange={(event) => change("category", event.target.value)}
                />
              </label>
              <label
                className={fieldErrors.price ? "admin-invalid" : undefined}
              >
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
              <label className={fieldErrors.days ? "admin-invalid" : undefined}>
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
              <label
                className={fieldErrors.nights ? "admin-invalid" : undefined}
              >
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
              <label
                className={
                  fieldErrors.displayOrder ? "admin-invalid" : undefined
                }
              >
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
              <label
                className={`admin-wide${fieldErrors.route ? " admin-invalid" : ""}`}
              >
                Route
                <input
                  required
                  value={editing.route}
                  placeholder="Goa · Beaches · Colourful lanes"
                  onChange={(event) => change("route", event.target.value)}
                />
              </label>
              <label
                className={`admin-wide${fieldErrors.description ? " admin-invalid" : ""}`}
              >
                Short description
                <textarea
                  required
                  maxLength={240}
                  rows={2}
                  placeholder="Describe the feeling of this trip in one or two sentences."
                  value={editing.description}
                  onChange={(event) =>
                    change("description", event.target.value)
                  }
                />
              </label>
              <label
                className={`admin-wide${fieldErrors.fullDescription ? " admin-invalid" : ""}`}
              >
                Full description
                <textarea
                  rows={5}
                  placeholder="Add the fuller story guests see when they open the package."
                  value={editing.fullDescription ?? ""}
                  onChange={(event) =>
                    change("fullDescription", event.target.value)
                  }
                />
              </label>
              <label
                className={fieldErrors.badge ? "admin-invalid" : undefined}
              >
                Badge
                <span className="admin-hint">
                  A short phrase shown over the image
                </span>
                <input
                  placeholder="For the sunset seekers"
                  value={editing.badge}
                  onChange={(event) => change("badge", event.target.value)}
                />
              </label>
              <span className="admin-hint">
                Describe what is visible, not the package name
              </span>
              <label className={fieldErrors.alt ? "admin-invalid" : undefined}>
                Image alt text placeholder="Clear ocean water and a sunlit
                beach"
                <input
                  required
                  value={editing.alt}
                  onChange={(event) => change("alt", event.target.value)}
                />
              </label>
              <label
                className={`admin-wide${fieldErrors.features ? " admin-invalid" : ""}`}
              >
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
              <label
                className={`admin-wide${fieldErrors.itinerary ? " admin-invalid" : ""}`}
              >
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
              <label
                className={`admin-wide${fieldErrors.image ? " admin-invalid" : ""}`}
              >
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
                    onChange={(event) => {
                      setImage(event.target.files?.[0]);
                      setFieldErrors((current) => {
                        const next = { ...current };
                        delete next.image;
                        return next;
                      });
                    }}
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
              <div>
                <h2>
                  {items.length} {items.length === 1 ? "package" : "packages"}
                </h2>
                <p className="admin-order-hint">
                  Drag packages into position, then save the order.
                </p>
              </div>
              <div className="admin-list-controls">
                <button
                  className={cx("button", "button-green")}
                  onClick={() => void savePackageOrder()}
                  disabled={busy || !orderChanged}
                >
                  <Save size={18} /> Save order
                </button>
                <button
                  className={cx("button", "button-green")}
                  onClick={() => {
                    setError("");
                    setImage(undefined);
                    setFieldErrors({});
                    setEditing(blankPackage(items.length + 1));
                  }}
                >
                  <Plus size={18} /> Add package
                </button>
              </div>
            </div>
            <div className="admin-list">
              {items.map((item, index) => (
                <article
                  className={`admin-card${draggedPackageId === item.id ? " is-dragging" : ""}${dragOverPackageId === item.id && draggedPackageId !== item.id ? " is-drop-target" : ""}${settlingPackageId === item.id ? " is-settling" : ""}`}
                  key={item.id}
                  onDragOver={(event) => {
                    event.preventDefault();
                    if (draggedPackageId !== item.id)
                      setDragOverPackageId(item.id);
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (draggedPackageId)
                      movePackage(draggedPackageId, item.id);
                    setDraggedPackageId(null);
                    setDragOverPackageId(null);
                  }}
                >
                  <span
                    className="admin-drag-handle"
                    draggable
                    role="button"
                    aria-label={`Drag ${item.title} to change its position`}
                    onDragStart={() => {
                      setDraggedPackageId(item.id);
                      setDragOverPackageId(null);
                    }}
                    onDragEnd={() => {
                      setDraggedPackageId(null);
                      setDragOverPackageId(null);
                    }}
                  >
                    <GripVertical size={19} />
                  </span>
                  <img src={item.image} alt="" />
                  <div className="admin-card-copy">
                    <h3>{item.title}</h3>
                    <p>
                      #{index + 1} · {item.destination} ·{" "}
                      {formatPrice(item.price)} · {item.days} days /{" "}
                      {item.nights} nights
                    </p>
                  </div>
                  <div className="admin-card-actions">
                    <button
                      aria-label={`Move ${item.title} up`}
                      onClick={() => movePackageBy(item.id, -1)}
                      disabled={index === 0 || busy}
                    >
                      <ChevronUp size={17} /> Move up
                    </button>
                    <button
                      aria-label={`Move ${item.title} down`}
                      onClick={() => movePackageBy(item.id, 1)}
                      disabled={index === items.length - 1 || busy}
                    >
                      <ChevronDown size={17} /> Move down
                    </button>
                    <button
                      aria-label={`Edit ${item.title}`}
                      onClick={() => {
                        setError("");
                        setImage(undefined);
                        setFieldErrors({});
                        setEditing({ ...item });
                      }}
                    >
                      <Pencil size={17} /> Edit
                    </button>
                    <button
                      aria-label={`Delete ${item.title}`}
                      onClick={() => setPendingDelete(item)}
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
        {pendingDelete && (
          <div
            className="admin-modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setPendingDelete(null);
            }}
          >
            <section
              className="admin-confirm-modal"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-package-title"
              aria-describedby="delete-package-description"
            >
              <div className="admin-confirm-icon" aria-hidden="true">
                <Trash2 size={22} />
              </div>
              <span className="eyebrow">PERMANENT CHANGE</span>
              <h2 id="delete-package-title">Delete this package?</h2>
              <p id="delete-package-description">
                <strong>{pendingDelete.title}</strong> will be removed from the
                website and committed to GitHub. This cannot be undone from the
                admin page.
              </p>
              <div className="admin-confirm-actions">
                <button
                  type="button"
                  className="admin-confirm-cancel"
                  onClick={() => setPendingDelete(null)}
                  disabled={busy}
                  autoFocus
                >
                  Keep package
                </button>
                <button
                  type="button"
                  className="admin-confirm-delete"
                  onClick={() => void remove(pendingDelete)}
                  disabled={busy}
                >
                  <Trash2 size={17} />
                  {busy ? "Deleting…" : "Delete package"}
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminApp;

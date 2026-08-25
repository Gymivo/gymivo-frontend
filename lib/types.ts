export interface FieldError {
  field: string;
  message: string;
}

export interface ApiErrorBody {
  code: number;
  name: string;
  message: string;
  details?: FieldError[];
}

/** The single envelope every backend endpoint returns, on success and on failure. */
export interface ApiEnvelope<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiErrorBody;
}

/** Returned by signup, signin and refresh. Expiry timestamps are ISO-8601 UTC. */
export interface AuthTokens {
  tokenType: "Bearer";
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

/**
 * A renderable image: the preferred URL plus every rendition keyed by variant name
 * ("thumb" | "small" | "medium" | "large" | "original"). `id` is null for static
 * catalogue assets served from the app's own public folder.
 */
export interface MediaResponse {
  id: string | null;
  url: string;
  variants: Record<string, string>;
  width: number;
  height: number;
}

/** GET/PUT /api/profile payload (Figma profile 782:4297). */
export interface ProfileResponse {
  id: string;
  phone: string;
  role: string;
  isComplete: boolean;
  completionPercent: number;
  fullName: string | null;
  username: string | null;
  birthDate: string | null; // Gregorian ISO yyyy-MM-dd; render as Jalali.
  age: number | null;
  gender: string | null; // "male" | "female"
  heightCm: number | null;
  weightKg: number | null;
  initialWeightKg: number | null;
  isPremium: boolean;
  avatar: MediaResponse | null;
}

/** PUT /api/profile body — full replacement, every field required. */
export interface UpdateProfileRequest {
  fullName: string;
  phone: string;
  username: string;
  birthDate: string; // Gregorian ISO yyyy-MM-dd.
  gender: string;
  heightCm: number;
  weightKg: number;
}

/** PUT /api/profile result: the saved profile plus a rotated token pair. */
export interface UpdateProfileResponse {
  profile: ProfileResponse;
  tokens: AuthTokens;
}

/** GET /api/profile/username-available — 200 always; unavailable is `available: false`. */
export interface UsernameAvailability {
  username: string;
  available: boolean;
}

/** GET/PUT /api/settings. */
export interface SettingsResponse {
  language: string; // "fa" | "en" | "tr" | "ar"
}

/** One row of the language screen (Figma 805:882). */
export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flagUrl: string;
  isActive: boolean;
}

export interface CoachSummary {
  id: string;
  displayName: string;
  avatar: MediaResponse | null;
}

/**
 * The dashboard plan card's payload. `daysLeft` drives the card states client-side;
 * a null plan (GET /api/plans/latest `data: null`) is the never-had-one state.
 */
export interface TrainingPlan {
  id: string;
  planType: string;
  weeks: number;
  sessionCount: number;
  startsAt: string;
  expiresAt: string; // ISO-8601 UTC.
  daysLeft: number;
  isExpired: boolean;
  progressPercent: number;
  coach: CoachSummary | null;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  iconUrl: string | null;
}

export interface Move {
  id: string;
  slug: string;
  name: string;
  muscles: string[];
  categoryId: string | null;
  categoryName: string | null;
  image: MediaResponse | null;
}

export interface ReadyPlan {
  id: string;
  slug: string;
  title: string;
  difficulty: string; // stable key: "easy" | "medium" | "hard"
  difficultyLabel: string; // localized word («آسان» / «متوسط» / «دشوار»)
  starCount: number;
  durationMinutes: number;
  weeks: number;
  features: string[];
  coach: CoachSummary | null;
  image: MediaResponse | null;
}

/** Envelope of the paged list endpoints. */
export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
}

/** GET /api/dashboard — the whole screen in one call. */
export interface DashboardResponse {
  user: {
    id: string;
    displayName: string;
    avatar: MediaResponse | null;
    isPremium: boolean;
  };
  profileCompletion: {
    percent: number;
    isComplete: boolean;
    missingFields: string[];
  };
  latestPlan: TrainingPlan | null;
  categories: Category[];
  popularMoves: Move[];
  readyPlans: ReadyPlan[];
}

/** POST /api/contact — 201 on success. */
export interface ContactResponse {
  id: string;
  message: string;
}

/**
 * A backend error (or a synthesized client-side one like network_error).
 * `message` is Persian and safe to render as-is.
 */
export class ApiError extends Error {
  readonly code: number;
  readonly status?: number;
  readonly details?: FieldError[];

  constructor(body: ApiErrorBody, status?: number) {
    super(body.message);
    this.name = body.name ?? "ApiError";
    this.code = body.code;
    this.status = status;
    this.details = body.details;
  }

  /** Returns the Persian message for a specific field on 422 errors, if present. */
  getFieldError(field: string): string | undefined {
    return this.details?.find((d) => d.field === field)?.message;
  }
}

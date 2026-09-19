"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { services, vehicleClasses } from "@/data/services";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "sent" | "error";
type Errors = Partial<Record<"name" | "phone" | "email" | "service", string>>;

const field =
  "h-12 w-full border border-hairline bg-graphite px-4 text-sm text-bone " +
  "placeholder:text-smoke transition-colors duration-200 " +
  "hover:border-ash focus:border-champagne focus:outline-none";

/**
 * Transport is a prefilled email, so the form works on day one with no third
 * party. To send server side instead, POST `payload` to an API route from
 * `submit` and keep the same status handling.
 */
export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      service: String(data.get("service") ?? ""),
      vehicle: String(data.get("vehicle") ?? ""),
      make: String(data.get("make") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const next: Errors = {};
    if (!payload.name) next.name = "Please tell us your name.";
    if (!payload.phone) next.phone = "A phone number lets us confirm a time.";
    if (payload.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email))
      next.email = "That email address does not look right.";
    if (!payload.service) next.service = "Choose the service you are after.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const body = [
        `Name: ${payload.name}`,
        `Phone: ${payload.phone}`,
        payload.email && `Email: ${payload.email}`,
        `Service: ${payload.service}`,
        payload.vehicle && `Vehicle class: ${payload.vehicle}`,
        payload.make && `Vehicle: ${payload.make}`,
        "",
        payload.message,
      ]
        .filter(Boolean)
        .join("\n");

      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        `Booking enquiry: ${payload.service}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        role="status"
        className="border border-hairline bg-graphite p-8 text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-champagne text-champagne">
          <Check className="size-5" strokeWidth={1.5} aria-hidden />
        </span>
        <h3 className="display mt-6 text-[1.5rem] text-bone">Enquiry ready to send</h3>
        <p className="mx-auto mt-3 max-w-[42ch] text-sm leading-relaxed text-ash">
          Your email app should have opened with the details filled in. If nothing happened, call{" "}
          <a href={siteConfig.phone.href} className="text-bone underline underline-offset-4">
            {siteConfig.phone.display}
          </a>{" "}
          and we will book you in.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors hover:text-bone"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field label="Name" error={errors.name} required>
        <input
          className={cn(field, errors.name && "border-red-400/70")}
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
      </Field>

      <Field label="Phone" error={errors.phone} required>
        <input
          className={cn(field, errors.phone && "border-red-400/70")}
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="04XX XXX XXX"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
      </Field>

      <Field label="Email" error={errors.email} hint="Optional" className="sm:col-span-2">
        <input
          className={cn(field, errors.email && "border-red-400/70")}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
      </Field>

      <Field label="Service" error={errors.service} required>
        <select
          className={cn(field, "appearance-none", errors.service && "border-red-400/70")}
          id="service"
          name="service"
          defaultValue=""
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "service-error" : undefined}
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.shortName}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </Field>

      <Field label="Vehicle size" hint="Optional">
        <select className={cn(field, "appearance-none")} id="vehicle" name="vehicle" defaultValue="">
          <option value="">Select a size</option>
          {vehicleClasses.map((v) => (
            <option key={v.id} value={v.label}>
              {v.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Make and model" hint="Optional" className="sm:col-span-2">
        <input className={field} id="make" name="make" placeholder="For example, Mazda CX-5" />
      </Field>

      <Field label="Anything we should know" hint="Optional" className="sm:col-span-2">
        <textarea
          className={cn(field, "h-32 resize-y py-3 leading-relaxed")}
          id="message"
          name="message"
          placeholder="Condition, stains, pet hair, preferred days"
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400 sm:col-span-2">
          Something went wrong. Please call {siteConfig.phone.display} instead.
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-14 w-full items-center justify-center gap-3 bg-bone px-8 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-champagne disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" && <Loader2 className="size-4 animate-spin" strokeWidth={1.75} aria-hidden />}
          Send enquiry
        </button>
        <p className="mt-4 text-xs leading-relaxed text-smoke">
          We reply during workshop hours. For same day availability, calling is quickest.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactElement<{ id?: string }>;
}) {
  const id = children.props.id;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3">
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-bone">
          {label}
          {required && <span className="ml-1 text-champagne">*</span>}
        </span>
        {hint && <span className="text-[0.6875rem] text-smoke">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FormEvent, useState } from "react";
import { DecorationImage } from "@/components/decorations/DecorationImage";
import { Pearl } from "@/components/ui/Pearl";
import { TextReveal } from "@/components/ui/TextReveal";
import { DECORATIONS } from "@/lib/decorations";
import { cn } from "@/lib/utils";

type RsvpFormData = {
  fullName: string;
  side: "bride" | "groom" | "";
  attendance: "yes" | "no" | "";
  guestCount: string;
};

const initialForm: RsvpFormData = {
  fullName: "",
  side: "",
  attendance: "",
  guestCount: "1",
};

type SelectCardProps = {
  selected: boolean;
  onClick: () => void;
  label: string;
  className?: string;
};

function SelectCard({ selected, onClick, label, className }: SelectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full border px-4 py-3.5 text-left text-sm transition-all duration-300",
        selected
          ? "border-gold/60 bg-gold/[0.06] text-foreground"
          : "border-gold/15 bg-transparent text-foreground-secondary hover:border-gold/30",
        className
      )}
    >
      {selected && (
        <Pearl size={5} className="absolute right-3 top-1/2 -translate-y-1/2" />
      )}
      <span className={cn(selected && "pr-6")}>{label}</span>
    </button>
  );
}

export function RsvpSection() {
  const [form, setForm] = useState<RsvpFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    if (!form.fullName.trim() || !form.side || !form.attendance) return;
    if (form.attendance === "yes" && Number(form.guestCount) < 1) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          side: form.side,
          attendance: form.attendance,
          guestCount: form.attendance === "yes" ? Number(form.guestCount) : 0,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Չհաջողվեց ուղարկել։");
      }

      setSubmitted(true);
    } catch {
      setError("Չհաջողվեց ուղարկել։ Խնդրում ենք կրկին փորձել։");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="relative overflow-hidden bg-background-alt px-6 py-24 md:py-32">
        <motion.div
          className="relative z-10 mx-auto max-w-lg text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <DecorationImage
            src={DECORATIONS.pearlDropsSet}
            width={100}
            height={40}
            className="mx-auto mb-8 w-16 opacity-50"
          />
          <p className="font-serif text-2xl leading-relaxed text-gold">
            Շնորհակալ ենք։
          </p>
          <p className="mt-4 text-foreground-secondary">
            Սիրով սպասում ենք Ձեզ։
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#fbf8f1] px-6 pt-24 pb-5 md:pt-32 md:pb-6">
      <div
        className="pointer-events-none absolute -top-2 right-3 z-[1] w-[clamp(120px,35vw,185px)] opacity-[0.82] md:right-5 md:w-[220px]"
        aria-hidden="true"
      >
        <DecorationImage
          src={DECORATIONS.pearlFloralGarland}
          width={1129}
          height={447}
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-lg">
        <TextReveal className="relative z-10 text-center">
          <h2 className="font-serif text-2xl tracking-[0.12em] text-gold md:text-3xl">
            Կլինե՞ք մեզ հետ
          </h2>
        </TextReveal>

        <TextReveal className="relative z-10 mt-6 text-center" delay={0.1}>
          <p className="text-sm text-foreground-secondary">
            Խնդրում ենք հաստատել Ձեր մասնակցությունը մինչև սեպտեմբերի 25-ը։
          </p>
        </TextReveal>

        <motion.form
          onSubmit={handleSubmit}
          className="relative mt-12 space-y-9 rounded-sm bg-pearl/50 px-5 pt-9 pb-1 sm:px-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 1. Name */}
          <div className="relative z-10">
            <label
              htmlFor="fullName"
              className="mb-2.5 block text-lg font-medium tracking-[0.18em] text-foreground-secondary uppercase md:text-xl"
            >
              Անուն Ազգանուն
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              onFocus={() => setFocusedField("fullName")}
              onBlur={() => setFocusedField(null)}
              className="w-full border-b border-gold/20 bg-transparent py-3 text-foreground outline-none transition-colors focus:border-gold/50"
            />
            <motion.span
              className="absolute bottom-0 left-0 h-px bg-gold"
              initial={{ width: "0%" }}
              animate={{ width: focusedField === "fullName" ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* 2. Side */}
          <fieldset className="relative z-10">
            <legend className="mb-2.5 text-lg font-medium tracking-[0.18em] text-foreground-secondary uppercase md:text-xl">
              Ու՞մ կողմից եք
            </legend>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <SelectCard
                selected={form.side === "bride"}
                onClick={() => setForm({ ...form, side: "bride" })}
                label="Հարսի կողմից"
              />
              <SelectCard
                selected={form.side === "groom"}
                onClick={() => setForm({ ...form, side: "groom" })}
                label="Փեսայի կողմից"
              />
            </div>
          </fieldset>

          {/* 3. Attendance */}
          <fieldset className="relative z-10">
            <legend className="mb-2.5 text-lg font-medium tracking-[0.18em] text-foreground-secondary uppercase md:text-xl">
              Մասնակցություն
            </legend>
            <div className="space-y-2.5">
              <SelectCard
                selected={form.attendance === "yes"}
                onClick={() =>
                  setForm({
                    ...form,
                    attendance: "yes",
                    guestCount: form.guestCount === "0" ? "1" : form.guestCount,
                  })
                }
                label="Սիրով կմասնակցեմ"
              />
              <SelectCard
                selected={form.attendance === "no"}
                onClick={() =>
                  setForm({ ...form, attendance: "no", guestCount: "0" })
                }
                label="Ցավոք, չեմ կարող մասնակցել"
              />
            </div>
          </fieldset>

          {/* 4. Guests — hidden when not attending */}
          <AnimatePresence>
            {form.attendance === "yes" && (
              <motion.div
                className="relative z-10 overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="relative pt-1">
                <label
                  htmlFor="guestCount"
                  className="mb-2 block text-[0.65rem] tracking-[0.18em] text-foreground-secondary uppercase"
                >
                  Հյուրերի քանակ
                </label>
                <input
                  id="guestCount"
                  name="guestCount"
                  type="number"
                  min={1}
                  max={10}
                  required
                  value={form.guestCount}
                  onChange={(e) =>
                    setForm({ ...form, guestCount: e.target.value })
                  }
                  onFocus={() => setFocusedField("guestCount")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full border-b border-gold/20 bg-transparent py-3 text-foreground outline-none transition-colors focus:border-gold/50"
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-px bg-gold"
                  initial={{ width: "0%" }}
                  animate={{
                    width: focusedField === "guestCount" ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.4 }}
                />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 5. Submit */}
          {error && (
            <p className="relative z-10 text-center text-sm text-[#9a4b3c]">
              {error}
            </p>
          )}

          <div className="relative z-10">
            <button
              type="submit"
              disabled={submitting || !form.fullName.trim() || !form.side || !form.attendance}
              className="w-full border border-gold/35 bg-background/60 py-4 text-[0.7rem] tracking-[0.25em] text-gold transition-all hover:border-gold/60 hover:bg-gold/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Ուղարկվում է..." : "Հաստատել մասնակցությունը"}
            </button>

            <motion.div
              className="mt-3.5 flex justify-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.78, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <DecorationImage
                src={DECORATIONS.floatingPetals}
                width={261}
                height={206}
                className="h-auto w-[clamp(85px,24vw,125px)] object-contain md:w-[135px]"
              />
            </motion.div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

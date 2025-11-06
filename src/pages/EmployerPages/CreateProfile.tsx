import React, { useState, ChangeEvent, FormEvent } from "react";
import { z } from "zod";

type OrganizationProfile = {
    website: string;
    size?: string;
    linkedin?: string;
    subscribe?: boolean;
};

const initialState: OrganizationProfile = {
    website: "",
    size: "",
    linkedin: "",
    subscribe: false,
};

const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(:\d+)?(\/.*)?$/i;

const schema = z.object({
    website: z.string().refine((v) => v === "" || urlRegex.test(v), "Website must be a valid URL"),
    size: z.string().optional(),
    linkedin: z.string().refine((v) => v === "" || urlRegex.test(v), "LinkedIn must be a valid URL"),
    subscribe: z.boolean().optional(),
});

const CreateProfile: React.FC = () => {
    const [form, setForm] = useState<OrganizationProfile>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof OrganizationProfile, string>>>({});
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    function validate(): boolean {
        setErrors({});
        const parsed = schema.safeParse(form);
        const e: typeof errors = {};
        if (!parsed.success) {
            for (const issue of parsed.error.issues) {
                const key = issue.path[0] as keyof OrganizationProfile | undefined;
                if (key) e[key] = issue.message;
            }
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function handleChange<K extends keyof OrganizationProfile>(key: K, value: OrganizationProfile[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setSuccessMessage(null);
        if (!validate()) return;
        setSubmitting(true);

        try {
            const payload = new FormData();
            payload.append("website", form.website || "");
            payload.append("size", form.size || "");
            payload.append("linkedin", form.linkedin || "");
            payload.append("subscribe", String(!!form.subscribe));

            const res = await fetch("/api/employer/profile", {
                method: "POST",
                body: payload,
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to create profile");
            }

            setSuccessMessage("Profile created successfully.");
            setForm(initialState);
        } catch (err: any) {
            setErrors((prev) => ({ ...prev, website: err?.message || "Submission failed" }));
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div style={{ maxWidth: 780, margin: "24px auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
            <h2>Create Organization Profile</h2>

            <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: "flex", gap: 12 }}>
                    <label style={{ flex: 1 }}>
                        Website
                        <input
                            value={form.website}
                            onChange={(e) => handleChange("website", e.target.value)}
                            style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                            placeholder="https://acme.example"
                        />
                        {errors.website && <div style={{ color: "crimson" }}>{errors.website}</div>}
                    </label>

                    <label style={{ width: 200 }}>
                        Company size
                        <select
                            value={form.size}
                            onChange={(e) => handleChange("size", e.target.value)}
                            style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                        >
                            <option value="">Select</option>
                            <option value="1-10">1-10</option>
                            <option value="11-50">11-50</option>
                            <option value="51-200">51-200</option>
                            <option value="201-1000">201-1000</option>
                            <option value="1000+">1000+</option>
                        </select>
                    </label>
                </div>

                <label style={{ display: "block", marginTop: 12 }}>
                    LinkedIn / Social
                    <input
                        value={form.linkedin}
                        onChange={(e) => handleChange("linkedin", e.target.value)}
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                        placeholder="https://www.linkedin.com/company/acme"
                    />
                    {errors.linkedin && <div style={{ color: "crimson" }}>{errors.linkedin}</div>}
                </label>

                <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input
                            type="checkbox"
                            checked={!!form.subscribe}
                            onChange={(e) => handleChange("subscribe", e.target.checked)}
                        />
                        Subscribe to candidate updates
                    </label>
                    <a href="/subscribe" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}></a>
                        Subscription options
                    </a>
                </div>

                <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
                    <button type="submit" disabled={submitting} style={{ padding: "8px 14px" }}>
                        {submitting ? "Submitting..." : "Create Profile"}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setForm(initialState);
                            setErrors({});
                            setSuccessMessage(null);
                        }}
                        style={{ padding: "8px 14px" }}
                    >
                        Reset
                    </button>
                </div>

                {successMessage && <div style={{ color: "green", marginTop: 12 }}>{successMessage}</div>}
            </form>
        </div>
    );
};

export default CreateProfile;

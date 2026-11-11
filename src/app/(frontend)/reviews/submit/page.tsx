"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Star,
  CheckCircle2,
  Camera,
  ShieldCheck,
  ArrowLeft,
  Send,
  MessageSquare,
  Sparkles,
  UploadCloud,
  FileCheck2,
  User,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

// Responsive location suggestions ("Kakod" instead of "Kakod Mandi")
const QUICK_LOCATIONS = [
  "Kakod",
  "Jahangirpur",
  "Dankaur",
  "Sikandrabad",
  "Bulandshahr",
  "Chhatari",
  "Jewar",
];

const POPULAR_PHONES = [
  "Apple iPhone 16 (128GB)",
  "Apple iPhone 16 Pro",
  "Samsung Galaxy S24 Ultra",
  "Vivo V40 Pro ZEISS",
  "OnePlus Nord 4 5G",
  "Realme 13 Pro+ 5G",
  "Redmi Note 13 Pro+ 5G",
  "iQOO Z9s Pro 5G",
];

// Client-side image compression: reduces any photo to under 1MB (<900KB)
async function compressImageToUnder1MB(file: File): Promise<{ dataUrl: string; sizeKb: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        const maxDim = 1200;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve({
            dataUrl: img.src,
            sizeKb: Math.round(file.size / 1024),
          });
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Quality stepping down to guarantee < 900KB
        let quality = 0.82;
        let dataUrl = canvas.toDataURL("image/jpeg", quality);

        // Approximate base64 byte size
        const getByteSize = (str: string) => Math.round((str.length * 3) / 4);

        while (getByteSize(dataUrl) > 900 * 1024 && quality > 0.3) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }

        const finalSizeKb = Math.round(getByteSize(dataUrl) / 1024);
        resolve({ dataUrl, sizeKb: finalSizeKb });
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

export default function SubmitReviewPage() {
  const [googleReviewUrl, setGoogleReviewUrl] = useState("https://share.google/8qhHVs7TmFxegJl1N");
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [phoneBought, setPhoneBought] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState("");
  const [photoSizeKb, setPhotoSizeKb] = useState<number | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useState(() => {
    fetch("/api/site-settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.googleReviewUrl) setGoogleReviewUrl(data.googleReviewUrl);
        else if (data?.googleBusinessUrl) setGoogleReviewUrl(data.googleBusinessUrl);
      })
      .catch(() => {});
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      setErrorMessage("");
      const result = await compressImageToUnder1MB(file);
      setPhotoDataUrl(result.dataUrl);
      setPhotoSizeKb(result.sizeKb);
    } catch {
      setErrorMessage("Could not process this photo. Please try a different photo.");
    } finally {
      setIsCompressing(false);
    }
  };

  const removePhoto = () => {
    setPhotoDataUrl("");
    setPhotoSizeKb(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!author.trim() || !location.trim() || !phoneBought.trim() || !comment.trim()) {
      setErrorMessage("Please fill in all required fields (Name, Location, Phone, and Review).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author,
          location,
          phoneBought,
          rating,
          comment,
          invoiceNumber,
          customerPhone,
          photoUrl: photoDataUrl,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Failed to submit review. Please check all fields.");
        setLoading(false);
        return;
      }

      setSubmittedData({
        author,
        location,
        phoneBought,
        rating,
        comment,
        photoUrl: data.photoUrl || photoDataUrl,
        invoiceNumber,
        isVerified: data.isVerified,
      });
      setSubmitted(true);
    } catch {
      setErrorMessage("Network error occurred. Please try again or share via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/reviews"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Customer Reviews</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-[#a3e635] text-xs font-black uppercase">
          <Camera className="w-3.5 h-3.5" />
          <span>Real Unboxings & Testimonials in Kakod</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl text-zinc-950 dark:text-white tracking-tight">
          Share Your Store Experience & Unboxing Photo
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Help your neighbours in Kakod, Jahangirpur, and Dankaur make confident tech choices. Share your sealed-pack purchase, 0% EMI experience, or free gift story!
        </p>
      </div>

      {/* Anti-Fake Review Trust Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#151926] border border-zinc-200 dark:border-white/10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <p className="font-extrabold text-xs sm:text-sm text-zinc-950 dark:text-white">
              100% Anti-Fake Review Protection
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We verify real store bills. Adding your <strong>GST Bill / Invoice No.</strong> gives you the official <strong>&ldquo;GST Bill Verified Buyer&rdquo;</strong> badge!
            </p>
          </div>
        </div>

        <a
          href={googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/15 px-3 py-2 rounded-xl transition inline-flex items-center gap-1.5"
        >
          <span>Write on Google Maps ↗</span>
        </a>
      </div>

      {/* Submission Success View */}
      {submitted && submittedData ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151926] border-2 border-emerald-500/40 shadow-xl text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-[#a3e635] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-black text-2xl text-zinc-950 dark:text-white">
              Thank You, {submittedData.author}!
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto">
              Your genuine experience has been recorded.
              {submittedData.isVerified
                ? " Your GST Bill was recognized and your review is verified live!"
                : " Our store team will quickly verify your bill to award the Verified Buyer badge."}
            </p>
          </div>

          {/* Preview of Submitted Testimonial Card with Profile Avatar & Unboxing Photo */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-gradient-to-b from-[#1b3824] to-[#0f1f15] text-white border border-emerald-500/30 text-left space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {/* Profile Avatar Icon Preview */}
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400/50 bg-emerald-800/40 shrink-0 flex items-center justify-center">
                  {submittedData.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={submittedData.photoUrl}
                      alt={submittedData.author}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white/80" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm text-white">{submittedData.author}</p>
                  <p className="text-[10px] text-emerald-300/80">📍 {submittedData.location}</p>
                </div>
              </div>

              <div className="flex text-amber-400">
                {Array.from({ length: submittedData.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-xs text-emerald-50 leading-relaxed italic">
              &ldquo;{submittedData.comment}&rdquo;
            </p>

            {submittedData.photoUrl && (
              <div className="relative rounded-xl overflow-hidden border border-white/20 h-44 w-full bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={submittedData.photoUrl}
                  alt="Customer photo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 text-[10px] font-bold text-white border border-white/20">
                  📸 Customer Showroom Photo
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-emerald-300/70 font-semibold">Bought: {submittedData.phoneBought}</span>
              {submittedData.isVerified && (
                <span className="text-[10px] bg-emerald-500/20 text-[#a3e635] px-2 py-0.5 rounded-full font-bold">
                  ✓ GST Bill Verified
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-xs"
            >
              Return to Store Homepage
            </Link>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                `Namaste Vishal bhai! I just submitted my review for ${submittedData.phoneBought} on your website.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-extrabold text-xs inline-flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      ) : (
        /* Submission Form */
        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#151926] border border-zinc-200 dark:border-white/10 shadow-lg space-y-6"
        >
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold">
              {errorMessage}
            </div>
          )}

          {/* Hidden Honeypot bot trap */}
          <input
            type="text"
            name="honeypot"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Star Rating Picker */}
          <div className="space-y-2 text-center pb-2 border-b border-zinc-100 dark:border-white/10">
            <label className="block text-xs font-black uppercase text-zinc-600 dark:text-zinc-400">
              Your Overall Rating
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                  aria-label={`${star} star rating`}
                >
                  <Star
                    className={`w-7 h-7 sm:w-8 sm:h-8 ${
                      star <= rating ? "fill-amber-400" : "text-zinc-300 dark:text-zinc-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-extrabold text-zinc-900 dark:text-white">
              {rating === 5
                ? "★★★★★ 5.0 - Outstanding Experience!"
                : rating === 4
                ? "★★★★☆ 4.0 - Very Good"
                : `${rating}.0 Stars`}
            </p>
          </div>

          {/* Photo Upload Section: Native file upload with profile avatar preview & < 1MB auto-compression */}
          <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#ff5a1f]" />
                <label className="text-xs font-bold text-zinc-900 dark:text-white">
                  Add Your Photo / Unboxing Picture (Optional)
                </label>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-[#a3e635] font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Auto-compressed &lt; 1MB
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Can be your selfie with your new phone, unboxing the sealed box in the showroom, or any photo you like!
            </p>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Interactive Upload Box with Profile Avatar Icon Preview */}
            {!photoDataUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border-2 border-dashed border-zinc-300 dark:border-white/20 hover:border-[#ff5a1f] dark:hover:border-[#ff5a1f] bg-white dark:bg-black/20 cursor-pointer transition group text-center sm:text-left"
              >
                {/* Profile Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-white/10 border-2 border-zinc-200 dark:border-white/15 flex items-center justify-center text-zinc-400 group-hover:text-[#ff5a1f] group-hover:border-[#ff5a1f]/40 transition shrink-0">
                  {isCompressing ? (
                    <Sparkles className="w-7 h-7 animate-spin text-[#ff5a1f]" />
                  ) : (
                    <User className="w-8 h-8" />
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-white group-hover:text-[#ff5a1f] transition">
                    {isCompressing
                      ? "Optimizing & Compressing photo (< 1MB)..."
                      : "Tap to Choose Photo from Gallery or Camera"}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    JPG, PNG, WebP supported • Direct upload from mobile or computer
                  </p>
                </div>
              </div>
            ) : (
              /* Photo Uploaded Preview: Profile avatar icon + Full preview + size badge */
              <div className="p-3.5 rounded-xl bg-white dark:bg-black/30 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Circular Profile Avatar Preview */}
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500 ring-2 ring-emerald-500/20 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoDataUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-extrabold text-xs text-zinc-950 dark:text-white truncate">
                          Photo Uploaded & Ready
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        ✓ Compressed to {photoSizeKb} KB (under 1 MB limit)
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={removePhoto}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition shrink-0 cursor-pointer"
                    title="Remove photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Showroom preview image */}
                <div className="relative h-40 sm:h-48 w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-white/10 bg-black/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoDataUrl}
                    alt="Customer full preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] text-white font-bold border border-white/20 hover:bg-black transition cursor-pointer"
                  >
                    Change Photo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Author Name & Town */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
                Your Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma / Amit Bhati"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff5a1f]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
                Your Town / Area <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kakod, Jahangirpur, Dankaur"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff5a1f]"
              />
            </div>
          </div>

          {/* Responsive Quick Location Pills ("Kakod" only, no "Kakod Mandi") */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-zinc-400 font-bold block">
              Quick Suggestions (Tap to select):
            </span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {QUICK_LOCATIONS.map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`text-[11px] px-3 py-1 rounded-full border transition cursor-pointer ${
                    location === loc
                      ? "bg-[#ff5a1f] text-white border-[#ff5a1f] font-bold"
                      : "bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 border-zinc-200/80 dark:border-white/10 text-zinc-700 dark:text-zinc-300 font-medium"
                  }`}
                >
                  📍 {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Smartphone Purchased */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Smartphone Purchased at The Mobile Lounge <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. iPhone 16 (128GB Teal) / Samsung S24 Ultra"
              value={phoneBought}
              onChange={(e) => setPhoneBought(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff5a1f]"
            />
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {POPULAR_PHONES.slice(0, 5).map((phone) => (
                <button
                  type="button"
                  key={phone}
                  onClick={() => setPhoneBought(phone)}
                  className="text-[10px] px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
                >
                  {phone}
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Your Review / Experience <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Tell us about the price vs online, 0% EMI process, WhatsApp chat transfer, or free gift smartwatch..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff5a1f] leading-relaxed"
            />
          </div>

          {/* Anti-Fake Review Fields: GST Invoice & Customer Phone */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-[#a3e635]" />
              <p className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300 uppercase tracking-wide">
                Anti-Fake Verification & Official GST Badge
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                  GST Invoice / Bill Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. TML-2026-XXXX (on your bill)"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-xs text-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                  ★ Grants official &ldquo;GST Bill Verified Buyer&rdquo; badge
                </span>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                  Mobile / WhatsApp Number
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-xs text-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-zinc-400 block">
                  Never made public. Used strictly to verify store purchase.
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isCompressing}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#ff5a1f] hover:bg-[#e04810] text-white font-extrabold text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <span>Verifying & Submitting...</span>
            ) : isCompressing ? (
              <span>Compressing photo under 1MB...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Real Customer Review</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

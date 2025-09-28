"use client";

export function ThreeBackground({ className = "" }) {
  return (
    <div
      className={`fixed inset-0 -z-10 ${className}`}
      style={{
        backgroundImage: "url(/wardrobe.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay for text visibility */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: 0.4,
        }}
      />
    </div>
  );
}

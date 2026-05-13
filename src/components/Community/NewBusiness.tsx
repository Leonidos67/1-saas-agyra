// BusinessPage.tsx

import React, { useState } from "react";

const BusinessPage: React.FC = () => {
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [hasWebsite, setHasWebsite] = useState(false);
  const [website, setWebsite] = useState("");
  const [communityType, setCommunityType] = useState<
    "private" | "public"
  >("private");

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-10 px-6">
      <div className="max-w-[760px] mx-auto">
        <div className="mb-10">
          <span className="text-sm text-[#666] font-medium">
            BUSINESS COMMUNITY
          </span>

          <h1 className="text-[52px] leading-none tracking-[-0.05em] font-semibold mt-3">
            Launch your business hub
          </h1>

          <p className="text-[#666] text-[17px] leading-[1.7] mt-5 max-w-[620px]">
            Create a branded space for your audience, products and educational
            content. Manage everything in one ecosystem.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-[15px] font-medium mb-3">
              Business name
            </label>

            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Nova Labs"
              className="w-full h-[64px] px-5 rounded-2xl border border-[#e5e5e5] bg-white focus:outline-none focus:border-black text-[16px]"
            />
          </div>

          <div>
            <label className="block text-[15px] font-medium mb-3">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your business or community..."
              className="w-full min-h-[160px] p-5 rounded-2xl border border-[#e5e5e5] bg-white focus:outline-none focus:border-black resize-none text-[16px]"
            />
          </div>

          <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasWebsite}
                onChange={() => setHasWebsite(!hasWebsite)}
                className="w-5 h-5"
              />

              <span className="font-medium text-[15px]">
                I already have a website
              </span>
            </label>

            {hasWebsite && (
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://"
                className="w-full h-[60px] px-5 rounded-2xl border border-[#e5e5e5] bg-[#fafafa] focus:outline-none focus:border-black text-[16px] mt-5"
              />
            )}
          </div>

          <div>
            <label className="block text-[15px] font-medium mb-4">
              Community type
            </label>

            <div className="grid grid-cols-2 gap-5">
              <button
                type="button"
                onClick={() => setCommunityType("private")}
                className={`relative rounded-3xl p-6 border text-left transition-all bg-white
                  ${
                    communityType === "private"
                      ? "border-black"
                      : "border-[#e5e5e5] hover:border-[#cfcfcf]"
                  }
                `}
              >
                {communityType === "private" && (
                  <div className="absolute top-4 right-4 px-3 h-7 rounded-full bg-black text-white text-xs font-medium flex items-center">
                    Selected
                  </div>
                )}

                <h3 className="font-semibold text-[18px] text-black">
                  Private Business Hub
                </h3>

                <p className="text-[15px] leading-[1.6] mt-3 text-[#666]">
                  Paid access, premium members and exclusive business content.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setCommunityType("public")}
                className={`relative rounded-3xl p-6 border text-left transition-all bg-white
                  ${
                    communityType === "public"
                      ? "border-black"
                      : "border-[#e5e5e5] hover:border-[#cfcfcf]"
                  }
                `}
              >
                {communityType === "public" && (
                  <div className="absolute top-4 right-4 px-3 h-7 rounded-full bg-black text-white text-xs font-medium flex items-center">
                    Selected
                  </div>
                )}

                <h3 className="font-semibold text-[18px] text-black">
                  Public Business Hub
                </h3>

                <p className="text-[15px] leading-[1.6] mt-3 text-[#666]">
                  Public-facing space to grow audience and showcase your brand.
                </p>
              </button>
            </div>
          </div>

          <button className="w-full h-[64px] rounded-2xl bg-black text-white font-semibold text-[16px] hover:opacity-90 transition-all">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
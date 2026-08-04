"use client";

import { useMemo } from "react";
import { MapPin } from "lucide-react";
import { nepalProvinces } from "@/lib/nepal-admin";

export interface AddressValue {
  province: string;
  district: string;
  localBody: string;
  address: string;
}

interface AddressFieldsProps {
  value: AddressValue;
  onChange: (value: AddressValue) => void;
  lang?: string;
  showAddress?: boolean;
  required?: boolean;
  className?: string;
}

export default function AddressFields({
  value,
  onChange,
  lang = "en",
  showAddress = true,
  required = false,
  className = "",
}: AddressFieldsProps) {
  const isNp = lang === "np";

  const provinces = nepalProvinces;
  const selectedProvince = provinces.find((p) => p.name === value.province);

  const districts = useMemo(
    () => (selectedProvince ? selectedProvince.districts : []),
    [selectedProvince]
  );
  const selectedDistrict = districts.find((d) => d.name === value.district);
  const localBodies = useMemo(
    () => (selectedDistrict ? selectedDistrict.localBodies : []),
    [selectedDistrict]
  );

  const set = (patch: Partial<AddressValue>) => onChange({ ...value, ...patch });

  const inputCls =
    "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary-500";
  const labelCls = "mb-1 block text-sm font-medium text-gray-700";

  return (
    <div className={className}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className={labelCls}>
            {isNp ? "प्रदेश *" : "Province *"}
          </label>
          <select
            value={value.province}
            onChange={(e) => set({ province: e.target.value, district: "", localBody: "" })}
            className={inputCls}
            required={required}
          >
            <option value="">{isNp ? "प्रदेश चयन गर्नुहोस्" : "Select Province"}</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.name}>
                {isNp ? provinceNp(p.name) : p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>
            {isNp ? "जिल्ला *" : "District *"}
          </label>
          <select
            value={value.district}
            onChange={(e) => set({ district: e.target.value, localBody: "" })}
            className={inputCls}
            required={required}
            disabled={!value.province}
          >
            <option value="">
              {!value.province
                ? (isNp ? "पहिले प्रदेश छान्नुहोस्" : "Select province first")
                : (isNp ? "जिल्ला चयन गर्नुहोस्" : "Select District")}
            </option>
            {districts.map((d) => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>
            {isNp ? "स्थानीय तह *" : "Local Body *"}
          </label>
          <select
            value={value.localBody}
            onChange={(e) => set({ localBody: e.target.value })}
            className={inputCls}
            required={required}
            disabled={!value.district}
          >
            <option value="">
              {!value.district
                ? (isNp ? "पहिले जिल्ला छान्नुहोस्" : "Select district first")
                : (isNp ? "स्थानीय तह चयन गर्नुहोस्" : "Select Local Body")}
            </option>
            {localBodies.map((lb) => (
              <option key={lb} value={lb}>{lb}</option>
            ))}
          </select>
        </div>
      </div>

      {showAddress && (
        <div className="mt-3">
          <label className={labelCls}>
            {isNp ? "थप ठेगाना / सडक" : "Address / Landmark"}
          </label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={value.address}
              onChange={(e) => set({ address: e.target.value })}
              placeholder={isNp ? "जस्तै: टोल, चोक, वडा नं." : "e.g. Ward No., Tole, Landmark"}
              className={`${inputCls} pl-9`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Nepali province names
function provinceNp(name: string): string {
  const map: Record<string, string> = {
    Koshi: "कोशी प्रदेश",
    Madhesh: "मधेश प्रदेश",
    Bagmati: "बागमती प्रदेश",
    Gandaki: "गण्डकी प्रदेश",
    Lumbini: "लुम्बिनी प्रदेश",
    Karnali: "कर्णाली प्रदेश",
    Sudurpashchim: "सुदूरपश्चिम प्रदेश",
  };
  return map[name] || name;
}

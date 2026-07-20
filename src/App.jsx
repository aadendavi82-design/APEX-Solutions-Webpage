import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Download, Copy, Check } from 'lucide-react';

// ========================================
// 🎨 CONFIGURATION - EDIT THIS SECTION!
// ========================================
const CONFIG = {
  // Your basic info
  name: "APEX Standard",
  headline: "Creative Professional & Problem Solver",
  tagline: "I help businesses achieve their goals through thoughtful design, strategic thinking, and meticulous execution.",
  email: "AadenDavi82@gmail.com",
  phone: "559-770-7756",
  
  // Hero CTA text
  heroButtonText: "View My Work",
  heroSecondaryText: "Get In Touch",

  // Footer bio
  bio: "Creating exceptional work for amazing clients.",
  
  // YouTube / social links
  youtubeUrl: "https://youtube.com/@apex_standard",
  instagramUrl: "https://www.instagram.com/apex_standard_clovis",

  // Availability Schedule - CUSTOMIZE THIS!
  // Times should be in 24-hour format (e.g., "09:00", "18:00")
  availability: [
    { day: "Monday", start: "09:00", end: "18:00", available: true },
    { day: "Tuesday", start: "09:00", end: "18:00", available: true },
    { day: "Wednesday", start: "09:00", end: "18:00", available: true },
    { day: "Thursday", start: "09:00", end: "18:00", available: true },
    { day: "Friday", start: "09:00", end: "18:00", available: true },
    { day: "Saturday", start: "10:00", end: "14:00", available: true },
    { day: "Sunday", start: "00:00", end: "00:00", available: false }
  ]
};

// ========================================
// Solar Panel Calculator Component
// ========================================
function SolarCalculator({ onBack, onNavigate }) {
  const [panelRange, setPanelRange] = useState("20-25"); // Panel range
  const [stories, setStories] = useState(1);
  const [tileRoof, setTileRoof] = useState(false);
  const [visits, setVisits] = useState(1);

  // Panel range base pricing
  const panelRanges = {
    "1-10": { min: 120, max: 140, label: "1-10 panels" },
    "10-14": { min: 140, max: 160, label: "10-14 panels" },
    "15-19": { min: 160, max: 180, label: "15-19 panels" },
    "20-25": { min: 160, max: 200, label: "20-25 panels (Average)" },
    "26-30": { min: 180, max: 220, label: "26-30 panels" },
    "31-35": { min: 200, max: 250, label: "31-35 panels" },
    "36-40": { min: 220, max: 280, label: "36-40 panels" },
    "40+": { min: 250, max: 400, label: "40+ panels" }
  };

  const basePricing = panelRanges[panelRange];

  // Story multiplier
  const storyMultiplier = {
    1: 1,
    2: 1.25,
    3: 1.5
  };

  // Tile roof adjustment
  const roofAdjustment = tileRoof ? 1.2 : 1;

  // Calculate price ranges
  let minPrice = basePricing.min * storyMultiplier[stories] * roofAdjustment;
  let maxPrice = basePricing.max * storyMultiplier[stories] * roofAdjustment;

  // Apply visit discounts
  let firstVisitMin = minPrice;
  let firstVisitMax = maxPrice;
  let additionalVisitMin = minPrice * 0.6;
  let additionalVisitMax = maxPrice * 0.6;

  // Total calculations
  let totalMinPrice = firstVisitMin;
  let totalMaxPrice = firstVisitMax;

  if (visits > 1) {
    // 2nd visit: 50% off
    let visit2Min = minPrice * 0.5;
    let visit2Max = maxPrice * 0.5;
    totalMinPrice += visit2Min;
    totalMaxPrice += visit2Max;
  }

  if (visits > 2) {
    // 3rd visit: 60% off
    let visit3Min = minPrice * 0.4;
    let visit3Max = maxPrice * 0.4;
    totalMinPrice += visit3Min;
    totalMaxPrice += visit3Max;
  }

  if (visits > 3) {
    // 4th visit: 70% off
    let visit4Min = minPrice * 0.3;
    let visit4Max = maxPrice * 0.3;
    totalMinPrice += visit4Min;
    totalMaxPrice += visit4Max;
  }

  const roundPrice = (price) => {
    return Math.round(price / 10) * 10;
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 text-red-600 hover:text-red-500 transition font-medium"
        >
          ← Back to Services
        </button>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
          <h1 className="text-4xl font-bold mb-2 text-white">Solar Panel Cleaning</h1>
          <p className="text-gray-400 mb-8">Enter your home specs to get an estimate</p>

          <div className="space-y-8">
            {/* Panel Range */}
            <div>
              <label className="block text-white font-medium mb-4">Number of Panels</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.keys(panelRanges).map((range) => (
                  <button
                    key={range}
                    onClick={() => setPanelRange(range)}
                    className={`px-3 py-2 rounded-lg transition text-sm font-medium ${
                      panelRange === range
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-3">
                {panelRanges[panelRange].label}
              </p>
            </div>

            {/* Stories */}
            <div>
              <label className="block text-white font-medium mb-3">Number of Stories</label>
              <div className="flex gap-3">
                {[1, 2, 3].map((story) => (
                  <button
                    key={story}
                    onClick={() => setStories(story)}
                    className={`px-6 py-2 rounded-lg transition font-medium ${
                      stories === story
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {story} {story === 1 ? 'Story' : 'Stories'}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {stories === 1 && 'Single level - standard access'}
                {stories === 2 && 'Two levels - requires ladders/lifts'}
                {stories === 3 && 'Three or more - complex access'}
              </p>
            </div>

            {/* Roof Type */}
            <div>
              <label className="block text-white font-medium mb-3">Roof Type</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setTileRoof(false)}
                  className={`px-6 py-2 rounded-lg transition font-medium flex-1 ${
                    !tileRoof
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Regular Roofing
                </button>
                <button
                  onClick={() => setTileRoof(true)}
                  className={`px-6 py-2 rounded-lg transition font-medium flex-1 ${
                    tileRoof
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Tile Roof
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {tileRoof && 'Tile requires extra care - slight cost increase'}
                {!tileRoof && 'Standard asphalt or metal roofing'}
              </p>
            </div>

            {/* Annual Visits */}
            <div>
              <label className="block text-white font-medium mb-3">Service Schedule</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((visit) => (
                  <button
                    key={visit}
                    onClick={() => setVisits(visit)}
                    className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                      visits === visit
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {visit}x/yr
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {visits === 1 && 'One-time cleaning'}
                {visits === 2 && 'Twice yearly (recommended for Clovis climate)'}
                {visits === 3 && 'Quarterly maintenance'}
                {visits === 4 && 'Monthly service'}
              </p>
            </div>

            {/* Price Estimate */}
            <div className="bg-black rounded-lg p-6 border-2 border-red-600">
              <p className="text-gray-400 text-sm mb-4">Estimated Price Range:</p>
              
              <div className="mb-6">
                {visits === 1 ? (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Single Visit:</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-red-600">
                        ${roundPrice(firstVisitMin)}
                      </span>
                      <span className="text-3xl font-bold text-gray-500">-</span>
                      <span className="text-5xl font-bold text-red-600">
                        ${roundPrice(firstVisitMax)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">1st Visit:</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-red-600">
                          ${roundPrice(firstVisitMin)}
                        </span>
                        <span className="text-2xl font-bold text-gray-500">-</span>
                        <span className="text-4xl font-bold text-red-600">
                          ${roundPrice(firstVisitMax)}
                        </span>
                      </div>
                    </div>
                    {visits > 1 && (
                      <div className="bg-gray-900 p-3 rounded border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">2nd Visit (50% off):</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-green-400">
                            ${roundPrice(minPrice * 0.5)}
                          </span>
                          <span className="text-xl font-bold text-gray-500">-</span>
                          <span className="text-3xl font-bold text-green-400">
                            ${roundPrice(maxPrice * 0.5)}
                          </span>
                        </div>
                      </div>
                    )}
                    {visits > 2 && (
                      <div className="bg-gray-900 p-3 rounded border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">3rd Visit (60% off):</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-green-400">
                            ${roundPrice(minPrice * 0.4)}
                          </span>
                          <span className="text-xl font-bold text-gray-500">-</span>
                          <span className="text-3xl font-bold text-green-400">
                            ${roundPrice(maxPrice * 0.4)}
                          </span>
                        </div>
                      </div>
                    )}
                    {visits > 3 && (
                      <div className="bg-gray-900 p-3 rounded border border-gray-700">
                        <p className="text-gray-400 text-sm mb-2">4th Visit (70% off):</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-green-400">
                            ${roundPrice(minPrice * 0.3)}
                          </span>
                          <span className="text-xl font-bold text-gray-500">-</span>
                          <span className="text-3xl font-bold text-green-400">
                            ${roundPrice(maxPrice * 0.3)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="bg-red-900 bg-opacity-30 p-3 rounded border border-red-700">
                      <p className="text-gray-300 text-sm mb-2">Annual Total ({visits}x/year):</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-red-600">
                          ${roundPrice(totalMinPrice)}
                        </span>
                        <span className="text-2xl font-bold text-gray-500">-</span>
                        <span className="text-4xl font-bold text-red-600">
                          ${roundPrice(totalMaxPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-gray-500 text-xs">*Exact price determined after site inspection</p>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => onNavigate("contact")}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Contact APEX Standard
              </button>
              <p className="text-gray-500 text-xs mt-3 text-center">View our availability and schedule your service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Gutter Calculator Component
// ========================================
function GutterCalculator({ onBack, onNavigate }) {
  const [gutterSize, setGutterSize] = useState("average");
  const [stories, setStories] = useState(1);
  const [thickMud, setThickMud] = useState(false);

  // Gutter size base pricing (includes downspout cleaning)
  const gutterSizes = {
    "below-average": { min: 80, max: 95, label: "Below Average", sqft: "< 100 sq ft" },
    "average": { min: 125, max: 140, label: "Average", sqft: "100-150 sq ft" },
    "above-average": { min: 150, max: 175, label: "Above Average", sqft: "> 150 sq ft" }
  };

  const basePricing = gutterSizes[gutterSize];

  // Story multiplier
  const storyMultiplier = {
    1: 1,
    2: 1.2
  };

  // Thick mud surcharge (years of neglect)
  const mudSurcharge = thickMud ? { min: 50, max: 75 } : { min: 0, max: 0 };

  // Calculate price ranges
  let minPrice = basePricing.min * storyMultiplier[stories] + mudSurcharge.min;
  let maxPrice = basePricing.max * storyMultiplier[stories] + mudSurcharge.max;

  const roundPrice = (price) => {
    return Math.round(price / 10) * 10;
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 text-red-600 hover:text-red-500 transition font-medium"
        >
          ← Back to Services
        </button>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
          <h1 className="text-4xl font-bold mb-2 text-white">Gutter Cleaning</h1>
          <p className="text-gray-400 mb-8">Tell us about your gutters to get an estimate</p>

          <div className="space-y-8">
            {/* Gutter Size */}
            <div>
              <label className="block text-white font-medium mb-4">Gutter System Size</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.keys(gutterSizes).map((size) => (
                  <button
                    key={size}
                    onClick={() => setGutterSize(size)}
                    className={`px-4 py-3 rounded-lg transition text-sm font-medium ${
                      gutterSize === size
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <div>{gutterSizes[size].label}</div>
                    <div className="text-xs opacity-80">{gutterSizes[size].sqft}</div>
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-3">
                {gutterSize === "below-average" && "Smaller home with less gutter coverage"}
                {gutterSize === "average" && "Standard residential home - most common"}
                {gutterSize === "above-average" && "Large home or extensive gutter system"}
              </p>
            </div>

            {/* Stories */}
            <div>
              <label className="block text-white font-medium mb-3">Number of Stories</label>
              <div className="flex gap-3">
                {[1, 2].map((story) => (
                  <button
                    key={story}
                    onClick={() => setStories(story)}
                    className={`px-6 py-2 rounded-lg transition font-medium flex-1 ${
                      stories === story
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {story} {story === 1 ? 'Story' : 'Stories'}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {stories === 1 && 'Single level - standard ladder access'}
                {stories === 2 && 'Two levels - requires extension ladders or lift equipment'}
              </p>
            </div>

            {/* Exceptional Condition */}
            <div>
              <label className="block text-white font-medium mb-3">Gutter Condition</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    checked={!thickMud}
                    onChange={() => setThickMud(false)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-300">Normal Debris & Leaves (Included)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    checked={thickMud}
                    onChange={() => setThickMud(true)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-300">Heavy Mud/Years of Neglect (+$50-$75)</span>
                </label>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Regular debris like leaves, twigs, and dirt is included in our standard service. We only charge extra for exceptional buildup.
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-white font-medium mb-3">✓ What's Included:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Complete gutter cleaning & debris removal</li>
                <li>• Downspout cleaning & flushing</li>
                <li>• Visual inspection for damage</li>
              </ul>
            </div>

            {/* Price Estimate */}
            <div className="bg-black rounded-lg p-6 border-2 border-red-600">
              <p className="text-gray-400 text-sm mb-4">Estimated Price:</p>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-red-600">
                  ${roundPrice(minPrice)}
                </span>
                <span className="text-3xl font-bold text-gray-500">-</span>
                <span className="text-5xl font-bold text-red-600">
                  ${roundPrice(maxPrice)}
                </span>
              </div>

              {thickMud && (
                <div className="bg-red-900 bg-opacity-30 p-3 rounded border border-red-700 mb-4">
                  <p className="text-gray-300 text-sm">
                    <span className="text-red-400 font-medium">Heavy Condition Surcharge: </span>
                    +${mudSurcharge.min}-${mudSurcharge.max}
                  </p>
                </div>
              )}

              <p className="text-gray-500 text-xs">*Exact price determined after site inspection</p>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => onNavigate("contact")}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Contact APEX Standard
              </button>
              <p className="text-gray-500 text-xs mt-3 text-center">View our availability and schedule your service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Car Detailing Calculator Component
// ========================================
function CarDetailingCalculator({ onBack, onNavigate }) {
  const [quality, setQuality] = useState("basic");
  const [vehicleType, setVehicleType] = useState("regular-car");
  const [deepBedCleaning, setDeepBedCleaning] = useState(false);
  const [petHairDetail, setPetHairDetail] = useState(false);
  const [engineBayDetail, setEngineBayDetail] = useState(false);
  const [polishDetail, setPolishDetail] = useState(false);

  // Polish pricing by vehicle type (Premium tier add-on only)
  const polishPricing = {
    "small-car": { min: 35, max: 35 },
    "small-truck": { min: 35, max: 35 },
    "regular-car": { min: 40, max: 40 },
    "truck": { min: 45, max: 45 },
    "family-car": { min: 55, max: 55 },
    "rv": { min: 0, max: 0 },
    "boat": { min: 0, max: 0 },
    "sports-car": { min: 0, max: 0 }
  };
  const qualityTiers = {
    basic: {
      label: "Basic Detail",
      description: "Basic interior & exterior cleaning",
      baseMin: 35,
      baseMax: 50
    },
    standard: {
      label: "Standard Detail",
      description: "Deep cleaning, carpet spray, interior feels new",
      baseMin: 70,
      baseMax: 100
    },
    premium: {
      label: "Premium Detail",
      description: "Complete detail, deep clean, premium wax & protection",
      baseMin: 140,
      baseMax: 210
    }
  };

  // Vehicle types with pricing per quality tier
  const vehicleTypes = {
    "small-car": {
      label: "Small Car",
      examples: "Dodge Dart, Mini Cooper, Mazda Miata",
      pricing: {
        basic: { min: 35, max: 50 },
        standard: { min: 55, max: 80 },
        premium: { min: 120, max: 180 }
      },
      petHair: {
        basic: { min: 20, max: 40 },
        standard: { min: 30, max: 60 },
        premium: { min: 40, max: 80 }
      },
      showAddOns: true,
      contactForQuote: false
    },
    "small-truck": {
      label: "Small Truck",
      examples: "Single Cabs",
      pricing: {
        basic: { min: 35, max: 50 },
        standard: { min: 55, max: 80 },
        premium: { min: 120, max: 180 }
      },
      petHair: {
        basic: { min: 20, max: 40 },
        standard: { min: 30, max: 60 },
        premium: { min: 40, max: 80 }
      },
      bedCleaning: { min: 20, max: 50 },
      showAddOns: true,
      contactForQuote: false
    },
    "regular-car": {
      label: "Regular Car",
      examples: "Honda Accord, Chevy Blazer, Mazda CX-30",
      pricing: {
        basic: { min: 40, max: 60 },
        standard: { min: 65, max: 100 },
        premium: { min: 140, max: 220 }
      },
      petHair: {
        basic: { min: 30, max: 60 },
        standard: { min: 40, max: 80 },
        premium: { min: 60, max: 120 }
      },
      showAddOns: true,
      contactForQuote: false
    },
    "truck": {
      label: "Truck",
      examples: "Super Cab or Crew Cab",
      pricing: {
        basic: { min: 45, max: 65 },
        standard: { min: 70, max: 105 },
        premium: { min: 160, max: 250 }
      },
      petHair: {
        basic: { min: 20, max: 50 },
        standard: { min: 35, max: 75 },
        premium: { min: 50, max: 100 }
      },
      bedCleaning: { min: 20, max: 50 },
      showAddOns: true,
      contactForQuote: false
    },
    "family-car": {
      label: "Family Car / SUV",
      examples: "Honda Odyssey, Toyota Sienna, Chevy Suburban XL",
      pricing: {
        basic: { min: 50, max: 100 },
        standard: { min: 90, max: 150 },
        premium: { min: 200, max: 350 }
      },
      petHair: {
        basic: { min: 40, max: 80 },
        standard: { min: 60, max: 120 },
        premium: { min: 100, max: 180 }
      },
      showAddOns: true,
      contactForQuote: false
    },
    "rv": {
      label: "RV",
      examples: "Motorhomes, Travel Trailers",
      contactForQuote: true,
      showAddOns: false
    },
    "boat": {
      label: "Boat",
      examples: "All boat types",
      contactForQuote: true,
      showAddOns: false
    },
    "sports-car": {
      label: "Sports Car",
      examples: "Porsche 911, C8 Corvette, Lamborghini",
      contactForQuote: true,
      showAddOns: false
    }
  };

  const currentQuality = qualityTiers[quality];
  const currentVehicle = vehicleTypes[vehicleType];

  // Calculate base price from quality tier pricing
  let minPrice = (currentVehicle.pricing && currentVehicle.pricing[quality]?.min) || 0;
  let maxPrice = (currentVehicle.pricing && currentVehicle.pricing[quality]?.max) || 0;

  // Add-ons
  const bedCleaningPrice = deepBedCleaning && ["small-truck", "truck"].includes(vehicleType) && currentVehicle.bedCleaning ? { min: currentVehicle.bedCleaning.min, max: currentVehicle.bedCleaning.max } : { min: 0, max: 0 };
  const petHairPrice = petHairDetail && currentVehicle.petHair && currentVehicle.petHair[quality] ? { min: currentVehicle.petHair[quality].min, max: currentVehicle.petHair[quality].max } : { min: 0, max: 0 };
  
  // Engine bay adds $40 to max price only
  const engineBayPrice = engineBayDetail ? { min: 0, max: 40 } : { min: 0, max: 0 };

  // Polish pricing (only for premium, and varies by vehicle) - wax is included free with Premium
  const polishPrice = polishDetail && quality === "premium" && polishPricing[vehicleType] ? { min: polishPricing[vehicleType].min, max: polishPricing[vehicleType].max } : { min: 0, max: 0 };

  const totalMin = minPrice + bedCleaningPrice.min + petHairPrice.min + engineBayPrice.min + polishPrice.min;
  const totalMax = maxPrice + bedCleaningPrice.max + petHairPrice.max + engineBayPrice.max + polishPrice.max;

  const roundPrice = (price) => {
    return Math.round(price / 5) * 5;
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 text-red-600 hover:text-red-500 transition font-medium"
        >
          ← Back to Services
        </button>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
          <h1 className="text-4xl font-bold mb-2 text-white">Car Detailing</h1>
          <p className="text-gray-400 mb-2">Select your vehicle and service level to get an estimate</p>
          <p className="text-red-400 text-sm mb-8">Note: extreme cases will require a quote</p>

          <div className="space-y-8">
            {/* Quality Tier */}
            <div>
              <label className="block text-white font-medium mb-4">Service Level</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.keys(qualityTiers).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setQuality(tier)}
                    className={`px-4 py-3 rounded-lg transition text-sm font-medium text-left ${
                      quality === tier
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-bold">{qualityTiers[tier].label}</div>
                    <div className="text-xs opacity-80">{qualityTiers[tier].description}</div>
                  </button>
                ))}
              </div>
              {quality === "basic" && (
                <p className="text-gray-400 text-sm mt-3">
                  Note: unless you're scheduling two services together, Basic Detail is not available as a mobile appointment.
                </p>
              )}
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-white font-medium mb-4">Vehicle Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.keys(vehicleTypes).map((type) => (
                  <button
                    key={type}
                    onClick={() => setVehicleType(type)}
                    className={`px-4 py-3 rounded-lg transition text-sm font-medium text-left ${
                      vehicleType === type
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-bold">{vehicleTypes[type].label}</div>
                    <div className="text-xs opacity-80">{vehicleTypes[type].examples}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            {currentVehicle.showAddOns && (
              <div className="border-t border-gray-700 pt-6">
                <p className="text-white font-medium mb-4">Add-ons</p>
                <div className="space-y-3">
                  {["small-truck", "truck"].includes(vehicleType) && (
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={deepBedCleaning}
                        onChange={(e) => setDeepBedCleaning(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-300">
                        Deep Bed Cleaning (+${currentVehicle.bedCleaning.min}-${currentVehicle.bedCleaning.max})
                      </span>
                    </label>
                  )}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={petHairDetail}
                      onChange={(e) => setPetHairDetail(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300">Pet Hair Detail - Perfect Finish (+${currentVehicle.petHair[quality]?.min}-${currentVehicle.petHair[quality]?.max})</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={engineBayDetail}
                      onChange={(e) => setEngineBayDetail(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300">Engine Bay Cleaning (Quote)</span>
                  </label>
                </div>
                <p className="text-gray-500 text-sm mt-3 italic">
                  *Pet hair detail recommended if your vehicle has dog or cat hair
                </p>
              </div>
            )}

            {/* Premium Wax Protection & Polish */}
            {quality === "premium" && currentVehicle.showAddOns && (
              <div className="space-y-4">
                {/* Wax Protection Info */}
                <div className="bg-red-900 bg-opacity-20 rounded-lg p-4 border border-red-700">
                  <p className="text-red-200 font-bold mb-2">🛡️ Wax Protection Included</p>
                  <p className="text-gray-300 text-sm">Premium wax coating for superior protection and lasting shine. Hydrophobic and UV-protected finish.</p>
                </div>

                {/* Polish Add-on */}
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
                  <input
                    type="checkbox"
                    checked={polishDetail}
                    onChange={(e) => setPolishDetail(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <div>
                    <span className="text-gray-300">
                      Premium Polish Finish {currentVehicle.contactForQuote ? "(Quote)" : `(+$${polishPricing[vehicleType]?.min || "?"})` }
                    </span>
                    <p className="text-gray-500 text-xs">Enhanced polish for maximum shine and perfection</p>
                  </div>
                </label>
              </div>
            )}

            {/* What's Included */}
            {currentVehicle.showAddOns && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <p className="text-white font-medium mb-3">✓ Included in {qualityTiers[quality].label}:</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                {quality === "basic" && (
                  <>
                    <li>• Basic exterior wash & dry</li>
                    <li>• Interior vacuum & wipe down</li>
                    <li>• Window cleaning</li>
                  </>
                )}
                {quality === "standard" && (
                  <>
                    <li>• Deep interior cleaning & vacuuming</li>
                    <li>• Carpet spray treatment</li>
                    <li>• Seat & fabric deep cleaning</li>
                    <li>• Dashboard & trim conditioning</li>
                    <li>• Window & mirror cleaning</li>
                    <li>• Complete exterior wash & dry</li>
                  </>
                )}
                {quality === "premium" && (
                  <>
                    <li>• Complete exterior wash & dry</li>
                    <li>• Premium wax application</li>
                    <li>• Deep interior cleaning & detailing</li>
                    <li>• Leather/fabric conditioning</li>
                    <li>• Engine detailing</li>
                  </>
                )}
              </ul>
            </div>
            )}

            {/* Price Estimate */}
            <div className="bg-black rounded-lg p-6 border-2 border-red-600">
              {currentVehicle.contactForQuote ? (
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600 mb-4">Contact for Quote</p>
                  <p className="text-gray-300 mb-4">
                    Each {currentVehicle.label} is unique. We'll provide a detailed, personalized estimate after discussing your specific needs.
                  </p>
                  <button
                    onClick={() => onNavigate("contact")}
                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    Contact APEX Standard
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-400 text-sm mb-4">Estimated Price:</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-bold text-red-600">
                        ${roundPrice(totalMin)}
                      </span>
                      <span className="text-3xl font-bold text-gray-500">-</span>
                      <span className="text-5xl font-bold text-red-600">
                        ${roundPrice(totalMax)}
                      </span>
                    </div>
                    {(deepBedCleaning || petHairDetail || engineBayDetail || polishDetail) && (
                      <div className="space-y-2 text-sm mt-4 pt-4 border-t border-gray-700">
                        {deepBedCleaning && currentVehicle.bedCleaning && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Deep Bed Cleaning:</span>
                            <span className="text-green-400">+${currentVehicle.bedCleaning.min}-${currentVehicle.bedCleaning.max}</span>
                          </div>
                        )}
                        {petHairDetail && currentVehicle.petHair && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Pet Hair Detail:</span>
                            <span className="text-green-400">+${currentVehicle.petHair[quality]?.min}-${currentVehicle.petHair[quality]?.max}</span>
                          </div>
                        )}
                        {engineBayDetail && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Engine Bay Cleaning:</span>
                            <span className="text-yellow-400 font-medium">Quote</span>
                          </div>
                        )}
                        {polishDetail && quality === "premium" && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Premium Polish Finish:</span>
                            <span className="text-green-400">
                              {currentVehicle.contactForQuote ? "Quote" : `+$${polishPricing[vehicleType]?.min}`}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-500 text-xs">*Exact price determined after vehicle inspection</p>
                </>
              )}
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => onNavigate("contact")}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Contact APEX Standard
              </button>
              <p className="text-gray-500 text-xs mt-3 text-center">View our availability and schedule your service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Window Cleaning Calculator Component
// ========================================
function WindowCalculator({ onBack, onNavigate }) {
  const [windowCount, setWindowCount] = useState("11-20");
  const [serviceType, setServiceType] = useState("exterior");
  const [stories, setStories] = useState(1);
  const [screenCleaning, setScreenCleaning] = useState(false);
  const [hardWaterTreatment, setHardWaterTreatment] = useState(false);

  const windowRanges = {
    "1-10": {
      label: "1-10 Windows",
      exterior: { min: 60, max: 90 },
      both: { min: 100, max: 140 }
    },
    "11-20": {
      label: "11-20 Windows",
      exterior: { min: 100, max: 150 },
      both: { min: 160, max: 220 }
    },
    "21-30": {
      label: "21-30 Windows",
      exterior: { min: 150, max: 210 },
      both: { min: 230, max: 300 }
    },
    "31+": {
      label: "31+ Windows",
      quote: true
    }
  };

  const currentRange = windowRanges[windowCount];
  const isQuote = currentRange.quote === true;

  // Two-story is priced flat, regardless of window count
  const twoStoryFlat = {
    exterior: { min: 150, max: 200 },
    both: { min: 210, max: 280 }
  };

  const screenPrice = screenCleaning ? { min: 20, max: 40 } : { min: 0, max: 0 };
  const hardWaterPrice = hardWaterTreatment ? { min: 15, max: 100 } : { min: 0, max: 0 };

  let minPrice = 0;
  let maxPrice = 0;
  if (!isQuote) {
    if (stories === 2) {
      const base = twoStoryFlat[serviceType];
      minPrice = base.min + screenPrice.min + hardWaterPrice.min;
      maxPrice = base.max + screenPrice.max + hardWaterPrice.max;
    } else {
      const base = serviceType === "exterior" ? currentRange.exterior : currentRange.both;
      minPrice = base.min + screenPrice.min + hardWaterPrice.min;
      maxPrice = base.max + screenPrice.max + hardWaterPrice.max;
    }
  }

  const roundPrice = (price) => Math.round(price / 5) * 5;

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 text-red-600 hover:text-red-500 transition font-medium"
        >
          ← Back to Services
        </button>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
          <h1 className="text-4xl font-bold mb-2 text-white">Window Cleaning</h1>
          <p className="text-gray-400 mb-8">Crystal-clear, streak-free windows inside and out</p>

          <div className="space-y-8">
            {/* Window Count */}
            <div>
              <label className="block text-white font-medium mb-4">How Many Windows?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(windowRanges).map((range) => (
                  <button
                    key={range}
                    onClick={() => setWindowCount(range)}
                    className={`px-4 py-3 rounded-lg transition text-sm font-medium ${
                      windowCount === range
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {windowRanges[range].label}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-3">
                Count every window pane you want cleaned - not sure? We'll count during the visit.
              </p>
            </div>

            {!isQuote && (
              <>
                {/* Service Type */}
                <div>
                  <label className="block text-white font-medium mb-4">Service Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      onClick={() => setServiceType("exterior")}
                      className={`px-4 py-3 rounded-lg transition text-sm font-medium ${
                        serviceType === "exterior"
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      Exterior Only
                    </button>
                    <button
                      onClick={() => setServiceType("both")}
                      className={`px-4 py-3 rounded-lg transition text-sm font-medium ${
                        serviceType === "both"
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      Interior + Exterior
                    </button>
                  </div>
                </div>

                {/* Stories */}
                <div>
                  <label className="block text-white font-medium mb-4">Number of Stories</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStories(s)}
                        className={`px-4 py-3 rounded-lg transition font-medium ${
                          stories === s
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {s} Story{s > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                  {stories === 2 && (
                    <p className="text-gray-400 text-sm mt-3">
                      2-story homes are priced flat due to the extra equipment and safety precautions needed - not per window.
                    </p>
                  )}
                </div>

                {/* Add-ons */}
                <div className="border-t border-gray-700 pt-6">
                  <p className="text-white font-medium mb-4">Add-ons</p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={screenCleaning}
                        onChange={(e) => setScreenCleaning(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-300">Screen Cleaning (+$20-$40)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hardWaterTreatment}
                        onChange={(e) => setHardWaterTreatment(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-300">Hard Water Spot Removal (+$15-$100)</span>
                    </label>
                  </div>
                  <p className="text-gray-400 text-sm mt-3">
                    Clovis has extremely hard water - if your windows have white mineral spots that won't wipe off, this treatment restores the glass.
                  </p>
                </div>
              </>
            )}

            {/* What's Included */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-white font-medium mb-3">✓ What's Included:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Pure water cleaning - zero spots, zero streaks</li>
                <li>• Window sills & frames wiped down</li>
                <li>• Track detailing on accessible windows</li>
                {serviceType === "both" && !isQuote && <li>• Interior glass hand-detailed</li>}
              </ul>
            </div>

            {/* Price Estimate */}
            <div className="bg-black rounded-lg p-6 border-2 border-red-600">
              <p className="text-gray-400 text-sm mb-4">Estimated Price:</p>

              {isQuote ? (
                <div className="mb-4">
                  <span className="text-4xl font-bold text-red-600">Contact for Quote</span>
                  <p className="text-gray-400 text-sm mt-3">
                    Larger homes deserve an accurate price - we'll do a quick walkthrough and give you an exact number.
                  </p>
                </div>
              ) : (
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-red-600">
                    ${roundPrice(minPrice)}
                  </span>
                  <span className="text-3xl font-bold text-gray-500">-</span>
                  <span className="text-5xl font-bold text-red-600">
                    ${roundPrice(maxPrice)}
                  </span>
                </div>
              )}

              <p className="text-gray-500 text-xs">*Exact price determined after site inspection</p>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => onNavigate("contact")}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Contact APEX Standard
              </button>
              <p className="text-gray-500 text-xs mt-3 text-center">View our availability and schedule your service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Turf Cleaning Calculator Component
// ========================================
function TurfCalculator({ onBack, onNavigate }) {
  const [turfSize, setTurfSize] = useState("medium");
  const [petTreatment, setPetTreatment] = useState(false);

  const turfSizes = {
    "small": { min: 75, max: 100, label: "Small", sqft: "< 500 sq ft" },
    "medium": { min: 110, max: 160, label: "Medium", sqft: "500-1,000 sq ft" },
    "large": { min: 160, max: 220, label: "Large", sqft: "1,000-1,500 sq ft" },
    "xl": { quote: true, label: "Extra Large", sqft: "1,500+ sq ft" }
  };

  const currentSize = turfSizes[turfSize];
  const isQuote = currentSize.quote === true;

  const petPrice = petTreatment ? { min: 40, max: 75 } : { min: 0, max: 0 };

  let minPrice = 0;
  let maxPrice = 0;
  if (!isQuote) {
    minPrice = currentSize.min + petPrice.min;
    maxPrice = currentSize.max + petPrice.max;
  }

  const roundPrice = (price) => Math.round(price / 5) * 5;

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 text-red-600 hover:text-red-500 transition font-medium"
        >
          ← Back to Services
        </button>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
          <h1 className="text-4xl font-bold mb-2 text-white">Artificial Turf Cleaning</h1>
          <p className="text-gray-400 mb-8">Bring your turf back to life - fresh, clean, and odor-free</p>

          <div className="space-y-8">
            {/* Turf Size */}
            <div>
              <label className="block text-white font-medium mb-4">Turf Area Size</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(turfSizes).map((size) => (
                  <button
                    key={size}
                    onClick={() => setTurfSize(size)}
                    className={`px-4 py-3 rounded-lg transition text-sm font-medium ${
                      turfSize === size
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <div>{turfSizes[size].label}</div>
                    <div className="text-xs opacity-80">{turfSizes[size].sqft}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pet Treatment */}
            {!isQuote && (
              <div className="border-t border-gray-700 pt-6">
                <p className="text-white font-medium mb-4">Add-ons</p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={petTreatment}
                    onChange={(e) => setPetTreatment(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-300">Pet Odor Deep Treatment (+$40-$75)</span>
                </label>
                <p className="text-gray-400 text-sm mt-3">
                  Enzyme-based treatment that neutralizes pet urine odor at the source - highly recommended for homes with dogs.
                </p>
              </div>
            )}

            {/* What's Included */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-white font-medium mb-3">✓ What's Included:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Debris & leaf removal</li>
                <li>• Power brushing to restore blade height</li>
                <li>• Full rinse & sanitizing wash</li>
                <li>• Light deodorizing treatment</li>
              </ul>
            </div>

            {/* Price Estimate */}
            <div className="bg-black rounded-lg p-6 border-2 border-red-600">
              <p className="text-gray-400 text-sm mb-4">Estimated Price:</p>

              {isQuote ? (
                <div className="mb-4">
                  <span className="text-4xl font-bold text-red-600">Contact for Quote</span>
                  <p className="text-gray-400 text-sm mt-3">
                    Large turf installations vary - we'll measure and give you an exact price.
                  </p>
                </div>
              ) : (
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-red-600">
                    ${roundPrice(minPrice)}
                  </span>
                  <span className="text-3xl font-bold text-gray-500">-</span>
                  <span className="text-5xl font-bold text-red-600">
                    ${roundPrice(maxPrice)}
                  </span>
                </div>
              )}

              <p className="text-gray-500 text-xs">*Exact price determined after site inspection</p>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => onNavigate("contact")}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Contact APEX Standard
              </button>
              <p className="text-gray-500 text-xs mt-3 text-center">View our availability and schedule your service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Garage Floor Cleaning Calculator Component
// ========================================
function GarageCalculator({ onBack, onNavigate }) {
  const [garageSize, setGarageSize] = useState("2-car");
  const [degreasing, setDegreasing] = useState(false);

  const garageSizes = {
    "1-car": { min: 80, max: 110, label: "1-Car Garage" },
    "2-car": { min: 110, max: 160, label: "2-Car Garage" },
    "3-car": { min: 150, max: 220, label: "3-Car Garage" }
  };

  const currentSize = garageSizes[garageSize];
  const degreasingPrice = degreasing ? { min: 30, max: 60 } : { min: 0, max: 0 };

  const minPrice = currentSize.min + degreasingPrice.min;
  const maxPrice = currentSize.max + degreasingPrice.max;

  const roundPrice = (price) => Math.round(price / 5) * 5;

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 text-red-600 hover:text-red-500 transition font-medium"
        >
          ← Back to Services
        </button>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
          <h1 className="text-4xl font-bold mb-2 text-white">Garage Floor Cleaning</h1>
          <p className="text-gray-400 mb-8">Deep-cleaned concrete that looks like new</p>

          <div className="space-y-8">
            {/* Garage Size */}
            <div>
              <label className="block text-white font-medium mb-4">Garage Size</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.keys(garageSizes).map((size) => (
                  <button
                    key={size}
                    onClick={() => setGarageSize(size)}
                    className={`px-4 py-3 rounded-lg transition text-sm font-medium ${
                      garageSize === size
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {garageSizes[size].label}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-3">
                Note: Garage must be cleared of vehicles and belongings before service (we can work around large shelving).
              </p>
            </div>

            {/* Add-ons */}
            <div className="border-t border-gray-700 pt-6">
              <p className="text-white font-medium mb-4">Add-ons</p>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={degreasing}
                  onChange={(e) => setDegreasing(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-gray-300">Oil Stain & Degreasing Treatment (+$30-$60)</span>
              </label>
              <p className="text-gray-400 text-sm mt-3">
                Heavy-duty degreaser applied to oil spots and stains before pressure washing - dramatically improves results on stained concrete.
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-white font-medium mb-3">✓ What's Included:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Full sweep & blow-out</li>
                <li>• Surface cleaner pressure wash</li>
                <li>• Edge & corner detailing</li>
                <li>• Squeegee & dry finish</li>
              </ul>
            </div>

            {/* Price Estimate */}
            <div className="bg-black rounded-lg p-6 border-2 border-red-600">
              <p className="text-gray-400 text-sm mb-4">Estimated Price:</p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-red-600">
                  ${roundPrice(minPrice)}
                </span>
                <span className="text-3xl font-bold text-gray-500">-</span>
                <span className="text-5xl font-bold text-red-600">
                  ${roundPrice(maxPrice)}
                </span>
              </div>

              <p className="text-gray-500 text-xs">*Exact price determined after site inspection</p>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => onNavigate("contact")}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Contact APEX Standard
              </button>
              <p className="text-gray-500 text-xs mt-3 text-center">View our availability and schedule your service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Concrete Pressure Washing Calculator Component
// ========================================
function ConcreteCalculator({ onBack, onNavigate }) {
  const [surfaceType, setSurfaceType] = useState("driveway");
  const [surfaceSize, setSurfaceSize] = useState("1-car");
  const [heavyStains, setHeavyStains] = useState(false);

  const surfacePricing = {
    "driveway": {
      label: "Driveway",
      "1-car": { min: 50, max: 70, desc: "Fits 1 car" },
      "2-car": { min: 100, max: 130, desc: "Fits 2 cars" },
      "3-car": { min: 150, max: 170, desc: "Fits 3 cars" },
      "4-plus": { quote: true, desc: "4+ cars" }
    },
    "patio": {
      label: "Patio",
      small: { min: 80, max: 110 },
      average: { min: 110, max: 150 },
      large: { min: 150, max: 200 }
    }
  };

  const drivewaySizes = ["1-car", "2-car", "3-car", "4-plus"];
  const patioSizes = ["small", "average", "large"];
  const sizeLabels = {
    small: { label: "Small", desc: "Compact area" },
    average: { label: "Average", desc: "Standard size" },
    large: { label: "Large", desc: "Oversized area" },
    "1-car": { label: "1-Car", desc: "Fits 1 car" },
    "2-car": { label: "2-Car", desc: "Fits 2 cars" },
    "3-car": { label: "3-Car", desc: "Fits 3 cars" },
    "4-plus": { label: "4+ Cars", desc: "Fits 4+ cars" }
  };

  const currentSurface = surfacePricing[surfaceType];
  const isQuote = currentSurface[surfaceSize]?.quote === true;

  const stainPrice = heavyStains ? { min: 20, max: 80 } : { min: 0, max: 0 };

  let minPrice = 0;
  let maxPrice = 0;
  if (!isQuote && currentSurface[surfaceSize]) {
    minPrice = currentSurface[surfaceSize].min + stainPrice.min;
    maxPrice = currentSurface[surfaceSize].max + stainPrice.max;
  }

  const roundPrice = (price) => Math.round(price / 5) * 5;

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 text-red-600 hover:text-red-500 transition font-medium"
        >
          ← Back to Services
        </button>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
          <h1 className="text-4xl font-bold mb-2 text-white">Concrete Pressure Washing</h1>
          <p className="text-gray-400 mb-8">Blast away years of dirt, stains, and grime</p>

          <div className="space-y-8">
            {/* Surface Type */}
            <div>
              <label className="block text-white font-medium mb-4">What Are We Cleaning?</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(surfacePricing).map((surface) => (
                  <button
                    key={surface}
                    onClick={() => {
                      setSurfaceType(surface);
                      setSurfaceSize(surface === "driveway" ? "1-car" : "small");
                    }}
                    className={`px-4 py-3 rounded-lg transition text-sm font-medium ${
                      surfaceType === surface
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {surfacePricing[surface].label}
                  </button>
                ))}
              </div>
            </div>

            {!isQuote && (
              <>
                {/* Size */}
                <div>
                  <label className="block text-white font-medium mb-4">
                    {surfaceType === "driveway" ? "How many cars fit?" : "Area Size"}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(surfaceType === "driveway" ? drivewaySizes : patioSizes).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSurfaceSize(size)}
                        className={`px-4 py-3 rounded-lg transition text-sm font-medium ${
                          surfaceSize === size
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        <div>{sizeLabels[size].label}</div>
                        <div className="text-xs opacity-80">{sizeLabels[size].desc}</div>
                      </button>
                    ))}
                  </div>
                  {surfaceType === "driveway" && (
                    <p className="text-gray-400 text-sm mt-3">
                      For larger driveways with 4+ car capacity, we'll need to bring significant amounts of water - let's get a custom quote.
                    </p>
                  )}
                  {surfaceType === "patio" && (
                    <p className="text-gray-400 text-sm mt-3">
                      Patio pricing includes sidewalks and walkways adjacent to the patio.
                    </p>
                  )}
                </div>

                {/* Add-ons */}
                <div className="border-t border-gray-700 pt-6">
                  <p className="text-white font-medium mb-4">Add-ons</p>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={heavyStains}
                      onChange={(e) => setHeavyStains(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-300">Heavy Stain Treatment - Oil, Rust, Gum (+$20-$80)</span>
                  </label>
                  <p className="text-gray-400 text-sm mt-3">
                    Pre-treatment for stubborn stains that pressure alone won't remove.
                  </p>
                </div>
              </>
            )}

            {/* What's Included */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-white font-medium mb-3">✓ What's Included:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Professional surface cleaner - even, streak-free finish</li>
                <li>• Edge & detail work along borders</li>
                <li>• Post-wash rinse down of surrounding areas</li>
              </ul>
            </div>

            {/* Price Estimate */}
            <div className="bg-black rounded-lg p-6 border-2 border-red-600">
              <p className="text-gray-400 text-sm mb-4">Estimated Price:</p>

              {isQuote ? (
                <div className="mb-4">
                  <span className="text-4xl font-bold text-red-600">Contact for Quote</span>
                  <p className="text-gray-400 text-sm mt-3">
                    For driveways that fit 4+ cars, we need to bring intense amounts of water. Let's discuss your driveway and provide a custom rate.
                  </p>
                </div>
              ) : (
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-red-600">
                    ${roundPrice(minPrice)}
                  </span>
                  <span className="text-3xl font-bold text-gray-500">-</span>
                  <span className="text-5xl font-bold text-red-600">
                    ${roundPrice(maxPrice)}
                  </span>
                </div>
              )}

              <p className="text-gray-500 text-xs">*Exact price determined after site inspection</p>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => onNavigate("contact")}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Contact APEX Standard
              </button>
              <p className="text-gray-500 text-xs mt-3 text-center">View our availability and schedule your service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Trash Can Cleaning Calculator Component
// ========================================
function TrashCanCalculator({ onBack, onNavigate }) {
  const [canCount, setCanCount] = useState("2");
  const [extraCans, setExtraCans] = useState(4);

  const pricing = {
    "1": { min: 25, max: 35 },
    "2": { min: 40, max: 45 },
    "3": { min: 50, max: 50 }
  };

  const canOptions = ["1", "2", "3", "4+", "Industrial"];
  const isQuote = canCount === "Industrial";
  const isExtra = canCount === "4+";

  let minPrice = 0;
  let maxPrice = 0;
  if (isExtra) {
    minPrice = extraCans * 15;
    maxPrice = extraCans * 15;
  } else if (!isQuote) {
    minPrice = pricing[canCount].min;
    maxPrice = pricing[canCount].max;
  }

  const roundPrice = (price) => Math.round(price);

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 text-red-600 hover:text-red-500 transition font-medium"
        >
          ← Back to Services
        </button>

        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
          <h1 className="text-4xl font-bold mb-2 text-white">Trash Can Cleaning</h1>
          <p className="text-gray-400 mb-8">Say goodbye to the smell - sanitized, deodorized bins at your curb</p>

          <div className="space-y-8">
            {/* Can Count */}
            <div>
              <label className="block text-white font-medium mb-4">How Many Cans?</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {canOptions.map((count) => (
                  <button
                    key={count}
                    onClick={() => setCanCount(count)}
                    className={`px-4 py-3 rounded-lg transition font-medium text-sm ${
                      canCount === count
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-3">
                Trash, recycling, and green waste bins all count.
              </p>
            </div>

            {/* Extra Cans Stepper */}
            {isExtra && (
              <div>
                <label className="block text-white font-medium mb-4">How Many Cans Total?</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setExtraCans(Math.max(4, extraCans - 1))}
                    className="bg-gray-800 hover:bg-gray-700 text-white w-12 h-12 rounded-lg text-xl font-bold transition"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-white w-12 text-center">{extraCans}</span>
                  <button
                    onClick={() => setExtraCans(extraCans + 1)}
                    className="bg-gray-800 hover:bg-gray-700 text-white w-12 h-12 rounded-lg text-xl font-bold transition"
                  >
                    +
                  </button>
                  <span className="text-gray-400 text-sm ml-2">cans × $15 each</span>
                </div>
              </div>
            )}

            {/* What's Included */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-white font-medium mb-3">✓ What's Included:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• High-pressure hot wash - inside & out</li>
                <li>• Sanitizing treatment kills odor-causing bacteria</li>
                <li>• Fresh deodorizing finish</li>
                <li>• Curbside service - cans returned where we found them</li>
              </ul>
            </div>

            {/* Price Estimate */}
            <div className="bg-black rounded-lg p-6 border-2 border-red-600">
              <p className="text-gray-400 text-sm mb-4">Estimated Price:</p>

              {isQuote ? (
                <div className="mb-4">
                  <span className="text-4xl font-bold text-red-600">Contact for Quote</span>
                  <p className="text-gray-400 text-sm mt-3">
                    Got a large industrial account, HOA, or commercial property? We'll build you a custom rate.
                  </p>
                </div>
              ) : (
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-red-600">
                    ${roundPrice(minPrice)}
                  </span>
                  {minPrice !== maxPrice && (
                    <>
                      <span className="text-3xl font-bold text-gray-500">-</span>
                      <span className="text-5xl font-bold text-red-600">
                        ${roundPrice(maxPrice)}
                      </span>
                    </>
                  )}
                </div>
              )}

              <p className="text-gray-500 text-xs">*Price varies mainly based on distance needed to travel</p>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => onNavigate("contact")}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Contact APEX Standard
              </button>
              <p className="text-gray-500 text-xs mt-3 text-center">View our availability and schedule your service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// QR Code Generator Component
// ========================================
function QRCodeGenerator() {
  const websiteUrl = typeof window !== 'undefined' ? window.location.href : "https://example.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(websiteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Share Your Website</h1>
        <p className="text-gray-600 mb-12">Scan this QR code or share the link below</p>
        
        {/* QR Code */}
        <div className="bg-white border-4 border-red-600 p-8 inline-block mb-8 rounded-lg">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(websiteUrl)}`}
            alt="QR Code"
            className="w-80 h-80"
          />
        </div>

        {/* Website URL */}
        <div className="bg-gray-50 rounded-lg p-6 max-w-md">
          <p className="text-sm text-gray-600 mb-3">Website URL:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={websiteUrl}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded bg-white text-sm"
            />
            <button
              onClick={handleCopy}
              className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
              title="Copy URL"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        {/* Email QR Code */}
        <div className="mt-12">
          <p className="text-sm text-gray-600 mb-4">Or send via email:</p>
          <a
            href={`mailto:?body=Check%20out%20my%20portfolio%20at%20${encodeURIComponent(websiteUrl)}`}
            className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Email Link
          </a>
        </div>
      </div>
    </div>
  );
}

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [currentPage, setCurrentPage] = useState("home"); // "home", "solar", "gutter"

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Show calculator pages
  // Calculator page routing
  const calculatorPages = {
    "solar": SolarCalculator,
    "gutter": GutterCalculator,
    "detailing": CarDetailingCalculator,
    "window": WindowCalculator,
    "turf": TurfCalculator,
    "garage": GarageCalculator,
    "concrete": ConcreteCalculator,
    "trash": TrashCanCalculator
  };

  if (calculatorPages[currentPage]) {
    const CalculatorComponent = calculatorPages[currentPage];
    return <CalculatorComponent onBack={() => setCurrentPage("home")} onNavigate={(page) => {
      setCurrentPage(page);
      if (page === "contact") {
        setTimeout(() => scrollToSection("contact"), 100);
      }
    }} />;
  }

  // Show QR modal instead of main page
  if (showQR) {
    return (
      <div>
        <button
          onClick={() => setShowQR(false)}
          className="fixed top-6 left-6 z-50 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          ← Back to Portfolio
        </button>
        <QRCodeGenerator />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold tracking-tight">
            {CONFIG.name}
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('our-work')} className="hover:text-red-600 transition">
              Our Work
            </button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-red-600 transition">
              Pricing
            </button>
            <button onClick={() => setShowQR(true)} className="hover:text-red-600 transition">
              QR Code
            </button>
            <button onClick={() => scrollToSection('contact')} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-6 py-4 space-y-3">
              <button onClick={() => scrollToSection('our-work')} className="block w-full text-left hover:text-red-600 py-2">
                Our Work
              </button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left hover:text-red-600 py-2">
                Pricing
              </button>
              <button onClick={() => setShowQR(true)} className="block w-full text-left hover:text-red-600 py-2">
                QR Code
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 text-center">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Intro Banner */}
      <section className="pt-32 pb-16 px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">Clovis, CA · Exterior Cleaning & Detailing</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Clean That <span className="text-red-600">Speaks</span> For Itself
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Spot-free windows, solar panels, and vehicles powered by pure water technology. Instant online estimates, honest pricing, local service.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('pricing')}
              className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition font-bold text-lg"
            >
              Get an Instant Estimate
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-transparent border-2 border-gray-700 text-white px-8 py-4 rounded-lg hover:border-red-600 transition font-bold text-lg"
            >
              Contact Us
            </button>
          </div>

          {/* Trust strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-gray-800">
            <div>
              <p className="text-2xl mb-1">📍</p>
              <p className="text-white font-semibold text-sm">Locally Owned</p>
              <p className="text-gray-500 text-xs">Buchanan school district area</p>
            </div>
            <div>
              <p className="text-2xl mb-1">💧</p>
              <p className="text-white font-semibold text-sm">Pure Water Tech</p>
              <p className="text-gray-500 text-xs">Zero spots, zero streaks</p>
            </div>
            <div>
              <p className="text-2xl mb-1">💵</p>
              <p className="text-white font-semibold text-sm">Upfront Pricing</p>
              <p className="text-gray-500 text-xs">Instant online estimates</p>
            </div>
            <div>
              <p className="text-2xl mb-1">🏠</p>
              <p className="text-white font-semibold text-sm">Home & Business</p>
              <p className="text-gray-500 text-xs">Residential & commercial</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section id="our-work" className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-10">
            <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-3">Proof In The Results</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">See Our Work</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-400">Real before-and-after transformations on our social pages</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={CONFIG.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 hover:shadow-lg hover:shadow-red-900/30 transition font-bold text-lg"
            >
              <ExternalLink size={22} />
              Watch on YouTube
            </a>
            <a
              href={CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-200 transition font-bold text-lg"
            >
              <ExternalLink size={22} />
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-3">Instant Estimates</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Services</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-400">Tap any service for an instant price estimate - no phone call required</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                page: "detailing",
                icon: "🚗",
                title: "Car Detailing",
                desc: "Basic to standard details for every vehicle - pet hair specialists"
              },
              {
                page: "solar",
                icon: "☀️",
                title: "Solar Panel Cleaning",
                desc: "Restore lost energy output with spot-free pure water washing"
              },
              {
                page: "window",
                icon: "🪟",
                title: "Window Cleaning",
                desc: "Streak-free glass with pure water - hard water spot removal available"
              },
              {
                page: "gutter",
                icon: "🍂",
                title: "Gutter Cleaning",
                desc: "Full gutter & downspout clean-out to protect your roof and foundation"
              },
              {
                page: "concrete",
                icon: "💦",
                title: "Concrete Pressure Washing",
                desc: "Driveways and patios blasted clean of dirt and stains"
              },
              {
                page: "garage",
                icon: "🧰",
                title: "Garage Floor Cleaning",
                desc: "Deep-cleaned, degreased concrete floors that look brand new"
              },
              {
                page: "turf",
                icon: "🌱",
                title: "Artificial Turf Cleaning",
                desc: "Refresh, sanitize & deodorize your turf - pet odor treatment available"
              },
              {
                page: "trash",
                icon: "🗑️",
                title: "Trash Can Cleaning",
                desc: "Hot-washed, sanitized & deodorized bins - one-time or recurring service"
              },
              {
                page: "misc",
                icon: "💪",
                title: "Miscellaneous Jobs",
                desc: "Need extra muscle? Hauling, heavy lifting, odd jobs - if you need it done, ask us",
                contactCard: true
              }
            ].map((service) => (
              <button
                key={service.page}
                onClick={() => service.contactCard ? scrollToSection('contact') : setCurrentPage(service.page)}
                className="rounded-xl p-7 bg-black border border-gray-800 text-left group hover:border-red-600 hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-lg bg-red-600/10 border border-red-600/30 flex items-center justify-center text-3xl mb-5 group-hover:bg-red-600/20 transition">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{service.desc}</p>
                <div className="text-sm font-medium text-red-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                  {service.contactCard ? "Contact for Quote" : "Get Instant Estimate"} <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            ))}

            {/* Bundle & Save card */}
            <div className="rounded-xl p-7 bg-gradient-to-br from-red-600 to-red-800 text-left flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-2 text-white">Bundle & Save 💰</h3>
              <p className="text-red-100 text-sm mb-5 leading-relaxed">
                Booking two or more services on the same visit? Ask about our bundle discounts - the more we do, the more you save.
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-white text-red-700 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-red-50 transition w-fit"
              >
                Ask About Bundles
              </button>
            </div>

            {/* Referral card */}
            <div className="rounded-xl p-7 bg-gradient-to-br from-gray-800 to-black border border-red-600 text-left flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-2 text-white">Refer & Get Refunded 🤝</h3>
              <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                Refer us to a friend and get refunded 25% of your service - up to $50 back in your pocket when their job is complete.
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-red-700 transition w-fit"
              >
                Refer a Friend
              </button>
            </div>

            {/* Instagram discount card */}
            <div className="rounded-xl p-7 bg-gradient-to-br from-gray-800 to-black border border-red-600 text-left flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-2 text-white">Follow & Save 5% 📸</h3>
              <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                Follow us on Instagram and show us at your appointment - we'll knock 5% off your service, just for keeping up with our work.
              </p>
              <a
                href={CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-red-700 transition w-fit"
              >
                Follow on Instagram
              </a>
            </div>
          </div>

          <p className="text-center text-gray-400 mt-12 text-sm">
            💡 Get an instant estimate above, then call or text us to lock in your spot!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-3">Get Scheduled</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Let's Talk</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-400">Got your estimate? Call or text and we'll get you on the schedule.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <div className="space-y-8">
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
                
                {/* Phone */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">Call or Text</p>
                  <a 
                    href={`tel:${CONFIG.phone}`}
                    className="text-2xl font-bold text-red-600 hover:text-red-500 transition"
                  >
                    {CONFIG.phone}
                  </a>
                  <p className="text-gray-500 text-sm mt-2">Available during listed hours</p>
                </div>

                {/* Text/Message */}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-2">Text Message</p>
                  <a 
                    href={`sms:${CONFIG.phone}?body=Hi%20APEX%20Standard!%20I%20just%20got%20an%20estimate%20on%20your%20site%20and%20I'd%20like%20to%20schedule%20a%20service.`}
                    className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    Send Text Message
                  </a>
                  <p className="text-gray-500 text-sm mt-2">Fastest way to reach us - send photos of the job for an accurate quote</p>
                </div>

                {/* Email */}
                <div>
                  <p className="text-gray-400 text-sm mb-2">Email</p>
                  <a 
                    href={`mailto:${CONFIG.email}`}
                    className="text-red-600 hover:text-red-500 transition"
                  >
                    {CONFIG.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Schedule */}
            <div className="bg-black rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">My Availability</h3>
              <div className="space-y-3">
                {CONFIG.availability.map((slot, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      slot.available 
                        ? 'bg-red-900 bg-opacity-20 border border-red-700' 
                        : 'bg-gray-800 border border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        slot.available ? 'bg-red-600' : 'bg-gray-500'
                      }`}></div>
                      <span className="font-medium text-white">{slot.day}</span>
                    </div>
                    <span className={`text-sm ${
                      slot.available 
                        ? 'text-gray-300' 
                        : 'text-gray-500 italic'
                    }`}>
                      {slot.available 
                        ? `${slot.start} - ${slot.end}` 
                        : 'Closed'}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-6 italic">
                Don't see your preferred time? Reach out anyway - I'm flexible!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">{CONFIG.name}</h4>
              <p className="text-gray-600">{CONFIG.bio}</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button onClick={() => scrollToSection('our-work')} className="hover:text-black transition">Our Work</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-black transition">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Get In Touch</h4>
              <a href={`mailto:${CONFIG.email}`} className="text-gray-600 hover:text-black transition">
                {CONFIG.email}
              </a>
              <p className="text-gray-600 mt-2">{CONFIG.phone}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>&copy; 2024 {CONFIG.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;

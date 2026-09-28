export interface Treatment {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  glowColor: string;
  duration: string;
  anesthesia: string;
  image?: string;
  steps: {
    number: string;
    title: string;
    description: string;
    duration: string;
  }[];
  technologyUsed: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  qualification: string;
  experience: string;
  focus: string[];
  bio: string;
  availability: string;
  quote: string;
  awards: string[];
  image?: string;
}

export interface PatientStory {
  id: string;
  name: string;
  city: string;
  treatment: string;
  category: string;
  rating: number;
  highlight: string;
  story: string;
  duration: string;
  date: string;
  avatar?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  timeline: string;
  challenge: string;
  solution: string;
  result: string;
  patientAge: string;
  teethInvolved: string;
  tag: string;
  image?: string;
}

export interface Article {
  id: string;
  title: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  image?: string;
}

export const CLINIC_INFO = {
  name: "AVA DENTAL & IMPLANT STUDIO",
  shortName: "AVA DENTAL",
  tagline: "Precision for a better smile.",
  secondaryLine: "Modern dentistry, thoughtfully planned around you.",
  address: "Medical Road, Civil Lines, Aligarh, Uttar Pradesh 202002, India",
  phone: "+91 98970 12345",
  whatsappUrl: "https://wa.me/919897012345?text=Hello%20AVA%20Dental%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20a%20consultation.",
  email: "care@avadentalstudio.in",
  hours: "Monday – Saturday: 9:30 AM – 8:00 PM | Sunday: By Appointment",
  coordinates: "27.8974° N, 78.0880° E",
  city: "Aligarh, Uttar Pradesh",
};

export const CLINIC_STATS = [
  { value: "08+", label: "YEARS", detail: "Surgical & Aesthetic Precision" },
  { value: "8,500+", label: "CONSULTATIONS", detail: "Carefully Mapped Treatment Plans" },
  { value: "4.9/5", label: "PATIENT RATING", detail: "Verified Studio Feedback" },
  { value: "01", label: "DIGITAL WORKFLOW", detail: "End-to-End Guided Protocol" },
];

export const TREATMENTS: Treatment[] = [
  {
    id: "implants",
    number: "01",
    name: "Dental Implants",
    tagline: "Computer-guided titanium & zirconia root restoration",
    description: "Re-engineer lost teeth with biological precision. Using 3D CBCT scans and customized 3D-printed surgical drill guides, our implants fuse seamlessly with bone structure for permanent aesthetic and masticatory stability.",
    accentColor: "#7C5CFF",
    glowColor: "rgba(124, 92, 255, 0.4)",
    duration: "1 to 2 visits for surgical placement",
    anesthesia: "Micro-local with gentle sedation",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
    steps: [
      { number: "01", title: "Volumetric 3D Diagnostics", description: "High-resolution CBCT captures cortical bone density and nerve canals in sub-millimeter slices.", duration: "30 Mins" },
      { number: "02", title: "Virtual Surgical Pre-Planning", description: "Implant trajectory, angle, and emergence profile are simulated in 3D CAD software.", duration: "Digital" },
      { number: "03", title: "Guided Fixture Placement", description: "Titanium or zirconia fixture is placed with a stereolithographic guide without flap incising.", duration: "45 Mins" },
      { number: "04", title: "Osseointegration Phase", description: "Natural bone osteoblasts weave into the porous microscopic titanium lattice.", duration: "8-12 Weeks" },
      { number: "05", title: "Custom Zirconia Crown", description: "Individually milled crown matches exact shade, translucency, and natural adjacent bite.", duration: "Final Visit" }
    ],
    technologyUsed: ["CBCT 3D Tomography", "3D Printed Surgical Stents", "Dynamic Computer Navigation", "Zirconia Milling"],
    faqs: [
      { question: "Is guided dental implant placement painful?", answer: "Because we use 3D keyhole computer guides, surgical incisions are virtually non-existent, causing minimal tissue trauma and significantly faster recovery with minimal discomfort." },
      { question: "How long do dental implants last?", answer: "With good oral hygiene and routine maintenance, modern titanium implants integrate permanently and routinely last decades or a lifetime." }
    ]
  },
  {
    id: "smile-design",
    number: "02",
    name: "Digital Smile Design",
    tagline: "Biometric facial harmony and custom aesthetic analysis",
    description: "Your smile is measured relative to your pupillary line, lip mobility, and facial symmetry. We test-drive your new smile in 3D before touching a single tooth enamel surface.",
    accentColor: "#B69CFF",
    glowColor: "rgba(182, 156, 255, 0.4)",
    duration: "2 to 3 consultations",
    anesthesia: "Non-invasive analysis",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80",
    steps: [
      { number: "01", title: "Facial Proportion Mapping", description: "Studio photography and dynamic 4K video record your natural speech and unforced smile dynamics.", duration: "45 Mins" },
      { number: "02", title: "Optical Intraoral Scan", description: "A high-speed optical scanner captures every contour with zero messy impression paste.", duration: "15 Mins" },
      { number: "03", title: "3D Digital Mock-Up", description: "Architectural proportions are adjusted in real-time to match ideal tooth-to-lip ratios.", duration: "Digital" },
      { number: "04", title: "Intraoral Trial Smile", description: "A temporary resin model is placed directly in your mouth so you can preview the real result.", duration: "30 Mins" },
      { number: "05", title: "Refinement & Finalization", description: "Precise custom veneers, alignment, or whitening plans are initiated based on your approved prototype.", duration: "Ongoing" }
    ],
    technologyUsed: ["Digital Smile Design (DSD) CAD", "Intraoral Optical Scanner", "Direct Resin Mock-Up", "3D Resin Printer"],
    faqs: [
      { question: "Can I see what I will look like before committing?", answer: "Yes! Our direct intraoral mock-up lets you stand in front of a mirror and see the exact shape and proportion changes in your own mouth before any treatment begins." }
    ]
  },
  {
    id: "clear-aligners",
    number: "03",
    name: "Clear Aligners",
    tagline: "Virtually invisible, computerized tooth micro-movements",
    description: "Gentle orthodontic realignment engineered with multi-layer smart polymers. Aligners apply calculated sequential forces, moving each tooth along a mathematically optimized trajectory.",
    accentColor: "#65D8FF",
    glowColor: "rgba(101, 216, 255, 0.4)",
    duration: "6 to 14 months typical",
    anesthesia: "None required",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
    steps: [
      { number: "01", title: "Intraoral 3D Capture", description: "Zero radiation optical laser scan calculates exact dental arch relationships.", duration: "20 Mins" },
      { number: "02", title: "Orthodontic Simulation", description: "Every weekly stage of movement is rendered in a 3D video progression you can watch.", duration: "Digital" },
      { number: "03", title: "Custom Polymer Fabrication", description: "A complete set of medical-grade aligners is precision thermoformed and hand-trimmed.", duration: "10 Days" },
      { number: "04", title: "Sequential Tray Wear", description: "Trays are switched every 7-10 days, gradually adjusting crowding, spacing, or rotation.", duration: "Home" },
      { number: "05", title: "Post-Treatment Retainers", description: "Ultra-thin clear retention maintains your new smile permanently without relapse.", duration: "Final" }
    ],
    technologyUsed: ["Continuous Optical Scanning", "Orthodontic Movement CAD", "Multi-Layer Elastomeric Polymers"],
    faqs: [
      { question: "Are clear aligners noticeable during conversations?", answer: "They are crystal clear and fit intimately over your teeth, making them virtually imperceptible in day-to-day meetings, social events, and photography." }
    ]
  },
  {
    id: "veneers",
    number: "04",
    name: "Porcelain Veneers",
    tagline: "Hand-layered ceramic laminates with biological translucency",
    description: "Ultra-thin (0.3mm–0.5mm) custom feldspathic or lithium disilicate (E.max) ceramic shells bonded to anterior enamel. Hand-characterized to mimic natural light refraction, opalescence, and micro-texture.",
    accentColor: "#FF8E87",
    glowColor: "rgba(255, 142, 135, 0.4)",
    duration: "2 visits over 7 to 10 days",
    anesthesia: "Gentle local",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    steps: [
      { number: "01", title: "Diagnostic Wax-Up Evaluation", description: "Proportions are verified against your approved Digital Smile Design mock-up.", duration: "30 Mins" },
      { number: "02", title: "Micro-Invasive Preparation", description: "Only tenths of a millimeter of enamel are prepared, preserving biological tooth structure.", duration: "60 Mins" },
      { number: "03", title: "Optical Impression & Temps", description: "Digital scan is transmitted to the master ceramist while you wear aesthetic temporary veneers.", duration: "30 Mins" },
      { number: "04", title: "Master Ceramist Layering", description: "Ceramic powders are furnace-baked with multi-shade opalescence and internal warmth.", duration: "Lab" },
      { number: "05", title: "Adhesive Silane Bonding", description: "Veneers are microscopically bonded with dual-cure adhesive resins for a permanent union.", duration: "90 Mins" }
    ],
    technologyUsed: ["Lithium Disilicate (E.max)", "Microscope-Guided Preparation", "Dual-Cure Adhesive Bonding"],
    faqs: [
      { question: "Do porcelain veneers stain over time from coffee or tea?", answer: "No. High-fired dental porcelain is non-porous glass ceramic and is completely impervious to staining from tea, turmeric, coffee, or red wine." }
    ]
  },
  {
    id: "root-canal",
    number: "05",
    name: "Microscope Endodontics",
    tagline: "Single-sitting root canal treatment under dental magnification",
    description: "Root canal therapy conducted under high-power dental operating microscopes with titanium rotary files and 3D warm vertical obturation. We eliminate infection while saving your natural tooth crown.",
    accentColor: "#8DE8C1",
    glowColor: "rgba(141, 232, 193, 0.4)",
    duration: "Single sitting (approx. 50-70 mins)",
    anesthesia: "Painless computerized local anesthesia",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    steps: [
      { number: "01", title: "Digital Radiographic Diagnosis", description: "Cone-beam localization identifies hidden auxiliary canals and curved root apices.", duration: "15 Mins" },
      { number: "02", title: "Magnified Access", description: "Dental operating microscope illuminates the root pulp chamber under 20x magnification.", duration: "20 Mins" },
      { number: "03", title: "Rotary Canal Shaping", description: "Heat-treated nickel-titanium instruments gently debride and clean the canal system.", duration: "20 Mins" },
      { number: "04", title: "Ultrasonic Disinfection", description: "Acoustic micro-streaming eliminates bacterial biofilm from microscopic lateral tubuli.", duration: "10 Mins" },
      { number: "05", title: "Hermetic 3D Sealing", description: "Warm gutta-percha seals the entire root anatomy down to the physiological terminus.", duration: "15 Mins" }
    ],
    technologyUsed: ["Dental Operating Microscope", "NiTi Flexible Rotary Systems", "Warm Vertical Condensation", "Electronic Apex Locators"],
    faqs: [
      { question: "Can a root canal be done in one sitting?", answer: "Yes, more than 90% of our cases are completed comfortably in a single calm appointment using our high-precision microscope protocol." }
    ]
  },
  {
    id: "restorative",
    number: "06",
    name: "Restorative Dentistry",
    tagline: "Biomimetic inlays, onlays & full-mouth rehabilitation",
    description: "Restoring worn, cracked, or fractured teeth according to biomimetic principles. Instead of aggressive crown filing, we preserve remaining healthy tooth substrate using ceramic overlays and composite bonding.",
    accentColor: "#FFC69C",
    glowColor: "rgba(255, 198, 156, 0.4)",
    duration: "1 to 2 sessions",
    anesthesia: "Targeted local",
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80",
    steps: [
      { number: "01", title: "Structural Assessment", description: "Caries detection dyes and transillumination reveal micro-fractures in dentin.", duration: "20 Mins" },
      { number: "02", title: "Selective Caries Removal", description: "Healthy peripheral enamel and stress-bearing areas are meticulously preserved.", duration: "30 Mins" },
      { number: "03", title: "Immediate Dentin Sealing", description: "Freshly cut dentin tubules are sealed immediately to eliminate sensitivity permanently.", duration: "15 Mins" },
      { number: "04", title: "Computer-Milled Restoration", description: "Custom ceramic inlay/onlay is precision milled to restore natural cusp anatomy.", duration: "Digital" },
      { number: "05", title: "Biomimetic Cohesive Bond", description: "Stress-relieved polymer bonding restores natural tooth flexure and chewing strength.", duration: "30 Mins" }
    ],
    technologyUsed: ["Biomimetic Adhesive Dentistry", "CAD/CAM Ceramic Inlays", "Immediate Dentin Sealing (IDS)"],
    faqs: [
      { question: "Why choose an inlay/onlay over a traditional full crown?", answer: "Inlays and onlays preserve up to 70% more of your natural healthy tooth compared to traditional crowns, preventing unnecessary root canal treatments in the future." }
    ]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "aarav-mehta",
    name: "Dr. Aarav Mehta",
    role: "Clinical Director & Senior Implantologist",
    qualification: "MDS, Prosthodontics & Oral Implantology",
    experience: "14+ Years Clinical Experience",
    focus: ["Computer-Guided Implants", "Full Arch Immediate Rehabilitation", "Digital Occlusal Analysis"],
    bio: "Dr. Aarav Mehta completed his post-graduate residency in Prosthodontics with top honors. Over the past 14 years, he has successfully restored over 3,000 implants utilizing customized computer-guided surgical protocols. He regularly lectures on digital dentistry workflows across northern India and is committed to minimal-intervention implant surgery.",
    availability: "Monday, Wednesday, Friday, Saturday",
    quote: "Precision in implantology isn't merely about placing a fixture; it's about honoring the biology of the patient so the restoration feels completely natural.",
    awards: ["Fellow, International Congress of Oral Implantologists (ICOI)", "Certified Digital Smile Design Master"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rhea-kapoor",
    name: "Dr. Rhea Kapoor",
    role: "Aesthetic Specialist & Orthodontist",
    qualification: "MDS, Orthodontics & Dentofacial Orthopaedics",
    experience: "9+ Years Clinical Experience",
    focus: ["Clear Aligner Therapy", "Digital Smile Design", "Adolescent & Adult Arch Alignment"],
    bio: "Dr. Rhea Kapoor specializes in discreet modern orthodontic alignments and facial aesthetic balance. Her clinical methodology blends 3D digital tooth movements with profile soft-tissue analysis, ensuring each patient achieves ideal smile symmetry without conspicuous metal brackets.",
    availability: "Tuesday, Thursday, Saturday",
    quote: "A beautiful smile should highlight someone's individuality, never look stamped out from a cookie cutter.",
    awards: ["Elite Clear Aligner Provider", "Indian Orthodontic Society Lifetime Member"],
    image: "https://images.unsplash.com/photo-1594824813589-21b6d92ec173?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kabir-shah",
    name: "Dr. Kabir Shah",
    role: "Microscope Endodontist & Restorative Surgeon",
    qualification: "BDS, Micro-Endodontics & Restorative Dentistry",
    experience: "7+ Years Clinical Experience",
    focus: ["Microscope Root Canal Therapy", "Painless Single-Visit Endodontics", "Complex Retreatment"],
    bio: "Dr. Kabir Shah brings meticulous visual acuity to microscope-guided endodontics. Utilizing 20x surgical magnification, he specializes in finding hidden micro-canals and saving severely compromised teeth that would otherwise require extraction.",
    availability: "Monday through Friday",
    quote: "Nothing artificial can truly rival a healthy natural tooth. My objective every single day is saving natural dental biology.",
    awards: ["Advanced Microscope Endodontics Certification", "Academy of General Dentistry"],
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ananya-rao",
    name: "Dr. Ananya Rao",
    role: "Cosmetic & Biomimetic Restorative Clinician",
    qualification: "BDS, Aesthetic Dentistry & Biomimetic Principles",
    experience: "6+ Years Clinical Experience",
    focus: ["Porcelain Laminate Veneers", "Ultra-Conservative Enamel Bonding", "Opalescent Characterization"],
    bio: "Dr. Ananya Rao combines artistic hand-layering techniques with scientific biomimetic adhesive chemistry. Her delicate focus on natural tooth opalescence, light refraction, and subtle hue gradients gives her restorations unmatched vitality.",
    availability: "Monday, Tuesday, Thursday, Friday",
    quote: "The highest compliment our work can receive is when nobody can tell that cosmetic dentistry was ever done.",
    awards: ["Certified Aesthetic Dentistry Fellow", "Biomimetic Masterclass Alumnus"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  }
];

export const PATIENT_STORIES: PatientStory[] = [
  {
    id: "story-1",
    name: "Priya Sharma",
    city: "Civil Lines, Aligarh",
    treatment: "Dental Implant Journey",
    category: "Implant Precision",
    rating: 5,
    highlight: "Zero pain, clear computer planning, and my front tooth feels completely original.",
    story: "I had fractured an anterior front tooth and was terrified of the traditional implant procedure. At AVA Studio, Dr. Aarav Mehta showed me the exact 3D plan on the digital screen before anything was touched. The 3D guided surgery took less than 40 minutes and I experienced virtually zero swelling. Six months later, I bite into apples without a second thought.",
    duration: "Treatment completed in 2 digital sessions",
    date: "August 2025",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "story-2",
    name: "Aditya Verma",
    city: "Swarna Jayanti Nagar, Aligarh",
    treatment: "Smile Transformation",
    category: "Porcelain Veneers",
    rating: 5,
    highlight: "The trial smile mock-up gave me 100% confidence before touching my enamel.",
    story: "I had tetracycline discoloration and uneven edges that made me conscious during client presentations. What set AVA apart was their test-drive phase—I walked around with a temporary 3D mock-up for 2 days to get feedback from my family before committing to porcelain veneers. The final hand-crafted ceramic matches my natural skin tone perfectly.",
    duration: "Completed over 10 days",
    date: "October 2025",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "story-3",
    name: "Dr. Sneha Mathur",
    city: "AMU Campus, Aligarh",
    treatment: "Clear Aligner Experience",
    category: "Orthodontics",
    rating: 5,
    highlight: "Discreet aligners that fit seamlessly into a demanding surgical hospital schedule.",
    story: "As a practicing physician myself, I was very particular about hygiene and avoiding metal brackets. Dr. Rhea designed an 8-month aligner progression. Every tray was smooth, comfortable, and virtually unnoticeable to my patients and colleagues. The precision tracking at each monthly checkup was remarkable.",
    duration: "8 months total alignment",
    date: "December 2025",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "story-4",
    name: "Vikramaditya Singhania",
    city: "Ramghat Road, Aligarh",
    treatment: "Cosmetic Dentistry Experience",
    category: "Full Arch Restoration",
    rating: 5,
    highlight: "Thoughtfully planned around my bite. My persistent jaw fatigue vanished.",
    story: "Decades of night grinding had worn down my posterior molars and shortened my smile. The team at AVA didn't just propose cosmetic covers; they measured my jaw muscles and restored my natural chewing height with biomimetic ceramic onlays. The clinical standard here matches any clinic in Munich or Zurich.",
    duration: "Phased over 6 weeks",
    date: "January 2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "story-5",
    name: "Meenakshi Rao",
    city: "GT Road, Aligarh",
    treatment: "Microscope Root Canal",
    category: "Endodontics",
    rating: 5,
    highlight: "I fell asleep during the root canal. That tells you everything about their gentle touch.",
    story: "I arrived with severe throbbing tooth pain that kept me awake all night. Dr. Kabir used a dental microscope and computerized local numbing that I literally did not feel. The entire infection was cleaned and sealed in one calm 60-minute session with zero post-operative ache.",
    duration: "Single calm 60-minute visit",
    date: "February 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    title: "Minimal-Prep Porcelain Veneers",
    category: "SMILE RESTORATION",
    timeline: "8 Days · 2 Appointments",
    challenge: "Uneven enamel incisal wear, micro-chipping, and dark interdental shadow lines in an executive patient.",
    solution: "Digital Smile Design facial mapping followed by 6 anterior hand-layered E.max ceramic veneers with 0.4mm conservative reduction.",
    result: "Natural opalescent light transmission, balanced golden proportion ratios, and restored confidence in high-definition public speaking.",
    patientAge: "34 Years",
    teethInvolved: "Teeth #13 to #23 (Upper Anterior Arch)",
    tag: "Aesthetic Porcelain",
    image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "case-2",
    title: "Guided Anterior Dental Implant",
    category: "IMPLANT REHABILITATION",
    timeline: "3 Months (Immediate Load)",
    challenge: "Traumatically fractured central incisor with thin labial cortical bone plate requiring immediate replacement.",
    solution: "Sub-millimeter CBCT computer planned keyhole fixture placement with simultaneous PRF bone grafting and screw-retained custom zirconia temporary crown.",
    result: "Full pink papilla preservation, zero gingival recession, and indistinguishable emergence profile compared to the natural contralateral tooth.",
    patientAge: "28 Years",
    teethInvolved: "Tooth #11 (Upper Right Central Incisor)",
    tag: "3D Guided Surgery",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "case-3",
    title: "Digital Aligner Arch Symmetrization",
    category: "CLEAR ALIGNER JOURNEY",
    timeline: "7.5 Months · 22 Aligners",
    challenge: "Class I anterior crossbite with 4mm lower anterior crowding and asymmetric smile arch line.",
    solution: "Sequential computerized arch expansion with custom clear aligners; no extraction of premolars needed.",
    result: "Harmonious arch width, centered dental midlines, and effortless smile symmetry with zero bracket irritation.",
    patientAge: "26 Years",
    teethInvolved: "Full Upper & Lower Arches",
    tag: "Invisible Movement",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
  }
];

export const CLINIC_SPACES = [
  {
    id: "studio-lounge",
    name: "The Studio Lounge",
    label: "THE STUDIO",
    description: "A calming sanctuary designed with natural travertine plaster, soft acoustic felt, and curated warm illumination to reset your senses before your appointment.",
    accent: "Warm Ivory & Travertine",
    tech: "HEPA 14 Air Filtration, Acoustic Privacy Isolation",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "digital-suite",
    name: "Digital Diagnostics Suite",
    label: "DIGITAL SUITE",
    description: "Equipped with real-time optical intraoral scanners and volumetric CBCT stations where you view your teeth in high-definition 3D side-by-side with your doctor.",
    accent: "Electric Violet & Glass",
    tech: "0.01mm Optical Laser Scanners, 3D Facial Simulators",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "treatment-lounge",
    name: "Clinical Treatment Theater",
    label: "CONSULTATION ROOM",
    description: "Engineered around custom memory-foam ergonomic lounge chairs, shadowless surgical LED fields, and ceiling displays showing soothing ambient nature panoramas.",
    accent: "Mint & Polished Aluminum",
    tech: "KaVo Ergonomic Lounges, Zeiss Surgical Optics",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "cad-lab",
    name: "In-House 3D Precision Lab",
    label: "PATIENT EXPERIENCE",
    description: "Our dedicated 3D printing and digital milling suite ensures surgical guides and provisional restorations are fabricated on-site within hours.",
    accent: "Aqua & Titanium",
    tech: "5-Axis Micro-Milling, Biocompatible 3D Resin Printing",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80",
  }
];

export const CLINIC_TIMELINE = [
  { year: "2017", title: "Studio Founded", detail: "Established in Aligarh with a clear thesis: eliminate dental anxiety through calm environments and rigorous medical precision." },
  { year: "2019", title: "100% Digital Workflow", detail: "Completely retired physical impression trays in favor of high-speed 3D optical oral scanners and virtual wax-ups." },
  { year: "2022", title: "Guided Surgical Implant Suite", detail: "Integrated dedicated cone-beam CT diagnostics and 3D-printed surgical template fabrication directly inside the studio." },
  { year: "2024", title: "Cosmetic & Biomimetic Suite", detail: "Launched our specialized minimally invasive aesthetic wing focused on micro-thin porcelain veneers and tooth preservation." },
  { year: "2026", title: "Next-Generation Digital Navigation", detail: "Pioneering real-time computer navigation and dynamic jaw tracking for complex smile rehabilitations." },
];

export const KNOWLEDGE_ARTICLES: Article[] = [
  {
    id: "implant-planning",
    title: "How dental implants are planned with sub-millimeter 3D diagnostics",
    readTime: "4 min read",
    category: "Implantology",
    excerpt: "Understand how cone-beam CT imaging and virtual drill guides protect adjacent nerve structures and ensure your implant lasts decades.",
    content: [
      "In conventional dentistry, implants were often positioned relying heavily on two-dimensional X-rays and tactile manual sensation. While functional, this carried inherent margins of error in bone density estimation.",
      "Modern guided implantology at AVA Studio begins with a low-dose 3D Cone Beam Computed Tomography (CBCT) scan. This generates an exact digital twin of your alveolar jaw bone, nerve pathways, and maxillary sinus floor.",
      "Using CAD planning software, we position the virtual titanium fixture to an accuracy of 0.1 millimeter. A customized 3D surgical stent is printed with precision titanium sleeves. During surgery, the implant follows this exact pre-programmed trajectory, eliminating flap cuts, sutures, and prolonged bleeding."
    ],
    keyTakeaways: [
      "Sub-millimeter 3D trajectory prevents nerve impingement",
      "Keyhole guided placement means negligible swelling and minimal recovery time",
      "Immediate loading protocols allow temporary aesthetic crowns on the same visit in suitable cases"
    ],
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "smile-consultation",
    title: "What actually happens during a Digital Smile Design consultation?",
    readTime: "5 min read",
    category: "Cosmetic Dentistry",
    excerpt: "Why the modern cosmetic dental appointment feels more like an architectural atelier than a clinical check-up.",
    content: [
      "The greatest source of hesitation for people considering cosmetic smile enhancements is fear of the unknown: 'Will it look fake? Will my teeth look too big or too starkly white?'",
      "A Digital Smile Design (DSD) consultation is designed specifically to eliminate that fear. We begin with dynamic studio video recordings of your face in conversation, laughter, and repose. Your smile does not exist in a vacuum; it is framed by your lower lip curvature and facial midline.",
      "We design your new smile on 3D software and physically transfer this blueprint into your mouth using a reversible trial mock-up. You stand in front of a full-length mirror and see your prospective smile in your own face before deciding to proceed."
    ],
    keyTakeaways: [
      "No enamel is touched before you test-drive your smile prototype",
      "Proportions are calibrated to your unique facial geometry and skin undertones",
      "Collaborative decision-making ensures you control the final aesthetic outcome"
    ],
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "clear-aligners-biomechanics",
    title: "How clear aligners move teeth safely: The biomechanical difference",
    readTime: "3 min read",
    category: "Orthodontics",
    excerpt: "How multi-layer smart polymers exert calibrated, biologically safe micro-forces to align crowded teeth comfortably.",
    content: [
      "Unlike traditional fixed metal brackets which rely on manual wire tightening, clear aligners use sequential digital tooth movement calculated in fractions of a millimeter per stage.",
      "Each aligner is engineered from a specialized medical-grade polyurethane composite that maintains continuous gentle elasticity. When worn 20–22 hours daily, this steady force stimulates osteoclasts and osteoblasts—the body's natural bone-remodeling cells—to gently reshape the socket without root resorption.",
      "Because aligners are removable, you eat whatever you like, brush and floss with complete freedom, and enjoy a completely unobstructed smile throughout your treatment."
    ],
    keyTakeaways: [
      "Controlled weekly micro-forces protect delicate root vascularity",
      "Zero dietary restrictions and effortless oral hygiene maintenance",
      "Fewer emergency clinic visits compared to broken metal wires or loose brackets"
    ],
    image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "veneers-enamel-truth",
    title: "Porcelain veneers: Debunking enamel reduction myths",
    readTime: "4 min read",
    category: "Aesthetic Dentistry",
    excerpt: "The truth about modern minimal-prep veneers and why your teeth don't need to be ground down into pegs.",
    content: [
      "Internet memes frequently portray aggressive tooth grinding labeled as 'veneers'. In truth, those are full dental crowns. True porcelain laminate veneers are delicate contact-lens-thin facings.",
      "Using optical magnification and high-strength lithium disilicate ceramics, modern cosmetic dentists shave only 0.3mm to 0.5mm of outer surface enamel—often strictly confined to the enamel layer where adhesive bonding is strongest.",
      "When bonded directly to enamel using modern silane coupling agents, the ceramic and tooth fuse into a single monolithic structure with natural fracture resistance comparable to virgin natural teeth."
    ],
    keyTakeaways: [
      "Modern veneers require micro-enamel reduction (often 0.3mm–0.5mm)",
      "Enamel preservation ensures maximum bond strength and eliminates tooth sensitivity",
      "High-fired glazed ceramics never stain from spices, coffee, or wine"
    ],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
  }
];

export const LAB_PRODUCTS = [
  {
    id: "implant-fixture",
    name: "Grade-IV Titanium Osteo-Implant",
    category: "Implantology",
    material: "Cold-Worked Grade IV Titanium + SLA Sandblasted Acid-Etched Surface",
    precision: "± 5 Microns",
    description: "Micro-grooved coronal collar promotes bone preservation and rapid osteoblast attachment.",
    specs: ["Sub-gingival Morse Taper Connection", "Self-Tapping Double Lead Thread", "100% Biocompatible Matrix"]
  },
  {
    id: "zirconia-crown",
    name: "Multi-Translucent Zirconia Crown",
    category: "Prosthetics",
    material: "Yttria-Stabilized Polycrystalline Zirconia (5Y-PSZ)",
    precision: "1,100 MPa Flexural Strength",
    description: "Gradient optical layer blends high incisal translucency with dentin opacity for natural light dispersion.",
    specs: ["Monolithic Fracture Resistance", "Zero Metal Margin Discoloration", "Diamond-Polished Enamel Glaze"]
  },
  {
    id: "emax-veneer",
    name: "Ultra-Thin E.max Ceramic Veneer",
    category: "Aesthetic Restoration",
    material: "Lithium Disilicate Glass Ceramic (0.3mm Profile)",
    precision: "500 MPa Biaxial Strength",
    description: "Reflects and refracts natural ambient light with biological fluorescence indistinguishable from tooth enamel.",
    specs: ["Micro-Invasive 0.3mm Preparation", "Custom Hand-Layered Staining", "Silane Adhesive Fusion"]
  },
  {
    id: "clear-tray",
    name: "High-Clarity Smart Aligner",
    category: "Orthodontics",
    material: "Multi-Layer Thermoplastic Elastomer",
    precision: "0.2mm Target Movement Per Tray",
    description: "Engineered with sustained force retention that reduces soreness while maintaining continuous tooth tracking.",
    specs: ["Laser-Scalloped Gingival Margin", "BPA & Phthalate Free", "Crystal Clear Invisible Profile"]
  }
];
